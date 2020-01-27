import actionTypes from "./type"

const actions = {
    getAllApplication : data => ({type : actionTypes.GET_ALL_APPLICATION ,payload : data}),
    setAllApplication : data => ({type : actionTypes.SET_ALL_APPLICATION ,payload : data}),

		getChannelList :  data => ({type : actionTypes.GET_ALL_CHANNEL ,payload : data}),
		setChannelList :  data => ({type : actionTypes.SET_ALL_CHANNEL ,payload : data}),

		getNotificationList :  data => ({type : actionTypes.GET_NOTIFICATION_LIST ,payload : data}),
    setNotificationList :  data => ({type : actionTypes.SET_NOTIFICATION_LIST ,payload : data}),
    
    getCategoryList : data => ({type : actionTypes.GET_CATEGORY_LIST ,payload : data}),
    setCategoryList :  data => ({type : actionTypes.SET_CATEGORY_LIST ,payload : data}),


    getSelectedApp : data => ({ type: actionTypes.GET_SELECTED_APP, selectedAppInfo: data}),
    setSelectedApp : data => ({ type: actionTypes.SET_SELECTED_APP, payload: data}),

    getAllReports: data => ({ type: actionTypes.GET_ALL_REPORTS, payload: data }),
    setAllReports: data => ({ type: actionTypes.SET_ALL_REPORTS, payload: data }),

    setAllNotTempData : data => ({ type: actionTypes.SET_ALL_NOT_TMP_DATA, payload: data }),
    getAllNotTempData : data => ({ type: actionTypes.GET_ALL_NOT_TMP_DATA, payload: data }),

    setAllTempData: data => ({ type: actionTypes.SET_ALL_TMP_DATA, payload: data }),
    setAllNotificationData: data => ({ type: actionTypes.SET_ALL_NOT_DATA, payload: data }),


    statusUpdate:data => ({ type: actionTypes.STATUS_UPDATE, payload: data }),
    statusUpdateSuccess:data => ({ type: actionTypes.STATUS_UPDATE_SUCCESS, payload: data }),

    getSamplePayload:data => ({ type: actionTypes.GET_SAMPLE_PAYLOAD, payload: data }),
    setSamplePayload:data => ({ type: actionTypes.SET_SAMPLE_PAYLOAD, payload: data }),

    createNewNotification:data => ({ type: actionTypes.ADD_NOTIFICATION, payload: data }),
    editNotification:data => ({ type: actionTypes.EDIT_NOTIFICATION, payload: data }),
    setLoader:data => ({ type: actionTypes.SET_LOADER, payload: data }),
    postSucess :data => ({ type: actionTypes.POST_SUCCESS, payload: data }),

    getTemplateDetail: data => ({ type: actionTypes.GET_TEMPLATE_DETAIL, payload: data }),
    setTemplateDetail: data => ({ type: actionTypes.SET_TEMPLATE_DETAIL, payload: data }),
    clearTemplateDetail: data => ({ type: actionTypes.CLEAR_TEMPLATE_DETAIL, payload: data }),

    updateNotification:data => ({ type: actionTypes.UPDATE_NOTIFICATION, payload: data }),
    toggleHeader: data => ({ type: actionTypes.TOGGLE_HEADER, payload: data }),

    addBreadCrumb:data => ({type: actionTypes.ADD_BREADCRUMB , payload : data}),
    removeBreadCrumb:data => ({type: actionTypes.REMOVE_BREADCRUMB , payload: data}),
    getBreadCrumbs:data => ({type:actionTypes.GET_BREADCRUMBS, payload: data}),
    removeAllBreadCrumbs:data => ({type: actionTypes.REMOVE_ALL_BREADCRUMBS , payload: data}),

}

export default actions