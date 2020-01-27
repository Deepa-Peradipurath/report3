import React, { useState } from "react";
import { useDispatch } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import InputAdornment from "@material-ui/core/InputAdornment";
import CustomButton from "../Button";
import DropDown from "../dropDown";
import actions from "../../store/actions";
import DatePickerKey from "../datepicker";
import "./filter.scss";

const Filter = ({
  dropDownLabel,
  channel,
  category,
  textBoxLabel,
  ButtonLabel,
  createAction,
  DateRangeLabel,
  filter,
  setFilter,
  search,
  setSearch,
  start,
  setStart,
  setPage,
  setDateCount
}) => {
  const categoryFields = [
    { id: -1, name: "All" },
    { id: 104, name: "Announcements" },
    { id: 103, name: "Tasks" },
    { id: 101, name: "Subscription" }
  ];
  //const categoryFieldsChannel = ["All", "Email", "SMS", "Push Notification"];
  //  const [start, setStart] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  //  const [page, setPage] = React.useState(0);

  const inputChange = e => {
    setPage(0);
    setStart(0);
    setSearch(e.target.value);
  };
  const dispatch = useDispatch();
  const inputSubmit = e => {
    e.preventDefault();
    dispatch(
      actions.getAllNotTempData({
        info: {
          name: search,
          categoryId: filter,
          appId: 101,
          startNum: start,
          pageSize: pageSize
        },
        tab: "notification"
      })
    );
  };
  return (
    <div className="template-container">
      <Grid container spacing={3}>
        <Grid item xs={12} md={DateRangeLabel ? 12 : 9}>
          <form className="customForm" onSubmit={inputSubmit}>
            <Grid container spacing={0}>
              <Grid item xs={12} md={DateRangeLabel ? 3 : 4}>
                <List className="inlineList">
                  <ListItem className="listItemLeft">
                    <label className="label-name">{dropDownLabel}</label>
                  </ListItem>
                  <ListItem className="listItemRight">
                    <DropDown
                      className="listItemRight"
                      title={dropDownLabel}
                      fields={
                        dropDownLabel === "Channel" ? channel : category
                      }
                      setFilter={setFilter}
                      inputSubmit={inputSubmit}
                      setStart={setStart}
                      setPage={setPage}
                      section={
                        dropDownLabel === "Channel"
                          ? "template"
                          : "notification"
                      }
                    />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12} md={DateRangeLabel ? 5 : 8}>
                <List className="inlineList">
                  <ListItem className="listItemLeft">
                    <label className="label-name">{textBoxLabel}</label>
                  </ListItem>
                  <ListItem className="listItemRight">
                    <TextField
                      id="outlined-size-small"
                      variant="outlined"
                      size="small"
                      placeholder="Search Name"
                      value={search}
                      onChange={inputChange}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <SearchIcon />
                          </InputAdornment>
                        )
                      }}
                    />
                  </ListItem>
                </List>
              </Grid>
              {DateRangeLabel && (
                <Grid item xs={12} md={4}>
                  <List className="inlineList">
                    <ListItem className="listItemLeft">
                      <label className="label-name">{DateRangeLabel}</label>
                    </ListItem>
                    <ListItem className="listItemRight">
                      {/* <TextField
                            id="outlined-size-small"
                            variant="outlined"
                            size="small" placeholder=""
                            />
                        </ListItem> */}
                      <DatePickerKey
                        setDateCount={setDateCount}
                        setStart={setStart}
                        setPage={setPage}
                      />
                    </ListItem>
                  </List>
                </Grid>
              )}
            </Grid>
          </form>
        </Grid>
        {!DateRangeLabel && (
          <Grid item xs={12} md={3} className="buttonWrapper">
            <CustomButton
              type="primary"
              text={ButtonLabel}
              action={createAction}
            />
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default Filter;
