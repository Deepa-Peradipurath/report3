import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PersonIcon from '@material-ui/icons/Person';
import actions from "../../store/actions"
import  StickyHeadTable from "../table/index";
import Filter from '../Filter/index';

const Report = () => {
  
  // const categoryFields = ["All", "Email", "SMS", "Push Notification"];
  const [filter, setFilter] = React.useState(101);
  const [search, setSearch] = React.useState("");
  const [start, setStart] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = useState(2);
  const [channel, setChannel] = useState({});
  const [dateCount, setDateCount] = useState(0);

  const data = useSelector(state => state.notification);
  const reportData = !!data
    ? data.allReport
      ? data.allReport.notifications
      : []
    : [];
    const totalCount = !!data
    ? data.allReport
      ? data.allReport.count
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

  const columns = [
    { id: "type", label: "Notification Type", minWidth: 180 },
    {
      id: "name",
      label: "Template Name",
      minWidth: 120,
      align: "left",
      format: value => value.toLocaleString()
    },
    {
      id: "id",
      label: "Content ID",
      minWidth: 150,
      align: "left",
      format: value => value.toLocaleString()
    },

    {
      id: "channel",
      label: "Channel",
      minWidth: 20,
      align: "left"
    },

    {
      id: "recipients",
      label: "Recipients",
      minWidth: 30,
      align: "center"
    },
    {
      id: "date",
      label: "Notification Date",
      minWidth: 130,
      align: "left"
    },
    {
      id: "count",
      label: "No of Notifications",
      minWidth: 40,
      align: "center"
    }
  ];
  function createData(type, name, id, channel, date, count) {
    const recipients = <PersonIcon />
    return { type, name, id, channel, recipients, date, count };
  }

  const dispatch = useDispatch();

  useEffect(() => {
    setChannel(channelList)

    dispatch(
      actions.getAllReports({ 
        notificationName:search,
        channelId:filter,
        appId:appId,
        dateRange:dateCount,
        start: start,
        pageSize: pageSize
      })
    );
  }, [search, filter, start, page, pageSize, channelList,dateCount]);

  // const inputChange = e => {
  //   setPage(0);
  //   setStart(0) 
  //   setSearch(e.target.value);
  // };
  // const inputSubmit = e => {
  //   e.preventDefault();
  //   dispatch(
  //     actions.getAllReports({ 
  //       notificationName:search,
  //       channelId:filter,
  //       appId:appId,
  //       dateRange:100,
  //       start: 1,
  //       pagesize: pageSize
  //     })
  //   );
  // };

 
  return (
    <div className="template">
    <Filter dropDownLabel ='Channel' channel = {channel} textBoxLabel = 'Notification Type' DateRangeLabel ='Date Range'  filter = {filter} setFilter = {setFilter} search = {search} setSearch ={setSearch} start = {start} setStart = {setStart} setPage ={setPage} setDateCount = {setDateCount}/>
    <StickyHeadTable
          type="reports"
          tableData={reportData}
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
    </div> 
  );
};

export default Report;
