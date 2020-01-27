import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import actions from "../../store/actions"
import StickyHeadTable from "../table/index";
import SwitchesSize from "../switch";
import EditIcon from '@material-ui/icons/EditOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Filter from '../Filter/index'
import CreateNotificationForm from "../CreateNotification";


const Notification = () => {
  const [filter, setFilter] = useState(-1);
  const [search, setSearch] = useState("");
  const [start, setStart] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [page, setPage] = React.useState(0);
  const [showEdit, setShowEdit] = useState(false);
  const [tag, setTag] = useState("");
  const [editInfo, setEditInfo] = useState({});
  const [channel, setChannel] = useState({});


  const data = useSelector(state => state.notification);
  const notificationData = !!data
    ? data.notData
      ? data.notData.records
      : ""
    : "";
  const totalCount = !!data
    ? data.notData
      ? data.notData.count
      : 0
    : 0;
    const appId = !!data
    ? data.selectedApp
      ? data.selectedApp.appId
      : 0
    : 0;
    const channelList = !!data
    ? data.channelList
      ? data.channelList.notificationChannels
      : "" :""
      const categoryList = !!data
      ? data.categoryList
        ? data.categoryList.notificationCategories
        : "" :""

  const columns = [
    { id: "type", label: "Notification Type", minWidth: 250 },
    {
      id: "category",
      label: "Category",
      minWidth: 150,
      align: "left",
      format: value => value.toLocaleString()
    },
    {
      id: "date",
      label: "Updated Date",
      minWidth: 150,
      align: "left",
    //   format: value => new Date(value)
    },

    {
      id: "statusData",
      label: "Status",
      minWidth: 20,
      align: "left"
    },

    {
      id: "edit",
      label: "",
      minWidth: 40,
      align: "center"
    }
  ];

  const editNotification = (
    category,
    type,
    description,
    categoryId,
    typeId
  ) => {
    dispatch(actions.toggleHeader(false));
    setShowEdit(true);
    setTag("edit");
    const info = {
      category: category,
      type: type,
      description: description,
      categoryId: categoryId,
      typeId: typeId
    };
    setEditInfo(info);
  };
  const createNotification =() => {
    dispatch(actions.toggleHeader(false));
    setShowEdit(true);
    setTag("create");
    setEditInfo({});
  }

  function createData(type, category, newDate, status, typeId, categoryId,
    description) {
    const edit = <EditIcon   onClick={() => {
      editNotification(category, type, description, categoryId, typeId);
    }}/>;
    const notificationId = typeId;
    const dateFormat = new Date(newDate)
    const date = dateFormat.getDate() + '/' + (dateFormat.getMonth()+1) + '/' + dateFormat.getFullYear()

    const statusData = (
      <SwitchesSize
        status={status === 1 ? "Active" : "Inactive"}
        type="notification"
        typeId={notificationId}
        changeStatus={changeStatus}
      />
    );
    return { type, category, date, statusData, edit };
  }

  const dispatch = useDispatch();
  const changeStatus = () => {
    dispatch(
      actions.getAllNotTempData({"info":{
        name: search,
        categoryId: filter,
        appId: appId,
        startNum: start,
        pageSize: pageSize
      },"tab":"notification"})
    );
  };
  useEffect(() => {
    setChannel(channelList)
    console.log(" Notifications disaptch.....");
    dispatch(
        actions.getAllNotTempData({"info":{
          name: search,
          categoryId: filter,
          appId: appId,
          startNum: start,
          pageSize: pageSize
        },"tab":"notification"})
      );
  }, [search, filter, start, page, pageSize]);

  return (
    <div className="template">
       {!showEdit && (
        <Fragment>
        <Filter dropDownLabel ='Category' category = {categoryList} textBoxLabel = 'Notification Type' ButtonLabel ='Create Notification' createAction = {createNotification}filter = {filter} setFilter = {setFilter} search = {search} setSearch ={setSearch} start = {start} setStart = {setStart} setPage ={setPage}/>
        <StickyHeadTable
          type="notification"
          tableData={notificationData}
          start={start}
          setStart={setStart}
          columns={columns}
          createData={createData}
          pageSize={pageSize}
          setPageSize={setPageSize}
          totalCount={totalCount}
          page={page}
          setPage={setPage}
        />
        </Fragment>     
         )}
        {showEdit && (
        <CreateNotificationForm
          setShowEdit={setShowEdit}
          tag={tag}
          editInfo={editInfo}
          appId = {appId}
          categoryList = {categoryList}
        />
      )}
    </div>
  );
};

export default Notification;
