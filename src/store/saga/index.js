import { all, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  getAllApplication,
  fetchData,
  getAllReportsData,
  updateStatusData,
  samplePayloadData,
  addNotificationAPI,
  channelListAPI,
  notificationListAPI,
  getTemplateDetailAPI,
  updateTemplateAPI,
  categoryListAPI
} from "../../api/endpoints";
import actions from "../actions";

function* getAllApplications() {
  console.log("Get all application is called...");
  try {
    const data = yield getAllApplication().then(
      dataFromApi => dataFromApi.data
    );
    yield put(actions.setAllApplication(data));
    yield put(actions.setAllTempData([]));
    yield put(actions.setAllNotificationData([]));
    yield put(actions.setAllReports([]));
  } catch (error) {
    console.log(error);
  }
}

function* getAllNotificationTemplateData(payload) {
  try {
    const data = yield fetchData(payload).then(dataFromApi => dataFromApi.data);
    if (payload.payload.tab === "notification") {
      yield put(actions.setAllNotificationData(data));
    } else {
      yield put(actions.setAllTempData(data));
    }
  } catch (error) {
    if (payload.payload.tab === "notification") {
      yield put(actions.setAllNotificationData([]));
    } else {
      yield put(actions.setAllTempData([]));
    }
  }
}

function* getAllReports(payload) {
  try {
    const data = yield getAllReportsData(payload).then(
      dataFromApi => dataFromApi.data
    );
    yield put(actions.setAllReports(data));
  } catch (error) {
    yield put(actions.setAllReports([]));
  }
}

function* updateStatus(payload) {
  yield put(actions.statusUpdateSuccess(""));

  try {
    const data = yield updateStatusData(payload).then(
      dataFromApi => dataFromApi.data
    );
    console.log(data)
    yield put(actions.statusUpdateSuccess(true));
  } catch (error) {
    yield put(actions.statusUpdateSuccess(false));
    alert(
      "Notiification can not be deactivated as it is associated with one or more active template(s)"
    );
  }
}

function* getPAyload(payload) {
  try {
    const data = yield samplePayloadData(payload).then(
      dataFromApi => dataFromApi.data
    );
    yield put(actions.setSamplePayload(data));
  } catch (error) {
    yield put(actions.setSamplePayload([]));
    alert(error.message);
  }
}
function* addNotification(payload) {
  // yield put(actions.loader(true));
  // yield put(actions.postSucess(false));


  try {
    const data = yield addNotificationAPI(payload).then(
      dataFromApi => dataFromApi.data
    );
    console.log(data);
    // yield put(actions.setLoader(data.false));
    yield put(actions.postSucess(data.success));

  } catch (error) {
    alert(error.message);
  }
}

function* getChannelList(payload) {
  try {
    const data = yield channelListAPI(payload).then(
      dataFromApi => dataFromApi.data
    );
    yield put(actions.setChannelList(data));
  } catch (error) {
    alert(error.message);
  }
}
function* getCategoryList(payload) {
  try {
    const data = yield categoryListAPI(payload).then(
      dataFromApi => dataFromApi.data
    );
    yield put(actions.setCategoryList(data));

  } catch (error) {
  }
}

function* getNotificationList(payload) {
  try {
    const data = yield notificationListAPI(payload).then(
      dataFromApi => dataFromApi.data
    );
    yield put(actions.setNotificationList(data));
  } catch (error) {
    alert(error.message);
  }
}
function* getListValues(payload) {
  try {
    try {
      const data = yield notificationListAPI(payload).then(
        dataFromApi => dataFromApi.data
      );
      yield put(actions.setNotificationList(data));
    } catch (error) {
      alert(error.message);
    }
    try {
      const data = yield categoryListAPI(payload).then(
        dataFromApi => dataFromApi.data
      );
      yield put(actions.setCategoryList(data));
    } catch (error) {
      alert(error.message);
    }
    try {
      const data = yield channelListAPI(payload).then(
        dataFromApi => dataFromApi.data
      );
      yield put(actions.setChannelList(data));
    } catch (error) {
      alert(error.message);
    }
  }catch(error){

  }
  
}

function* getTemplateDetail(payload) {
  try {
    const data = yield getTemplateDetailAPI(payload).then(
      dataFromApi => dataFromApi.data
    );
    yield put(actions.setTemplateDetail(data));
  } catch (error) {
    alert(error.message);
  }
}

function* updateTemplate(payload) {
  try {
    const data = yield updateTemplateAPI(payload).then(
      dataFromApi => dataFromApi.data
    );
    yield put(actions.postSucess(data.success));

  } catch (error) {
    alert(error.message);
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery("GET_ALL_APPLICATION", getAllApplications),
    takeEvery("GET_ALL_REPORTS", getAllReports),
    takeEvery("GET_ALL_NOT_TMP_DATA", getAllNotificationTemplateData),
    takeLatest("STATUS_UPDATE", updateStatus),
    takeEvery("GET_SAMPLE_PAYLOAD", getPAyload),
    takeEvery("ADD_NOTIFICATION", addNotification),
    takeEvery("EDIT_NOTIFICATION", addNotification),
    takeEvery("GET_ALL_CHANNEL", getChannelList),
    takeEvery("GET_CATEGORY_LIST", getCategoryList),
    takeEvery("GET_NOTIFICATION_LIST", getNotificationList),
    takeEvery("GET_TEMPLATE_DETAIL", getTemplateDetail),
    takeEvery("UPDATE_NOTIFICATION", updateTemplate)

    
  ]);
}
