import React, { useEffect, useState } from "react";
import { useDispatch , useSelector} from "react-redux";
import actions from "../../store/actions";
import FormHeader from "../FormHeader/index";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import CustomButton from "../Button";
import FormTextBox from "../formTextBox";
import Label from '../label'
import "./CreateNotification.scss";

// const Label = ({ label }) => {
//   return <Fragment>{label} <span className = "required-sign">*</span></Fragment>;
// };
const CreateNotificationForm = ({
  setShowEdit,
  tag,
  editInfo,
  appId,
  categoryList
}) => {
  //const [edit, setEdit] = useState("");
  const [dropdown, setDropdown] = useState("");
  const [description, setDescription] = useState("");
  const [ntType, setNtType] = useState("");
  const [typeId, setTypeId] = useState("");
  const [sucessFlag, setSuccessFlag] = useState("");

  const dispatch = useDispatch();
  const data = useSelector(state => state.notification);
  const postSuccess = !!data ? data.apiSuccessFlag : "";
  useEffect(() => {
    //setEdit(editInfo);
    setDropdown(editInfo.categoryId);
    setDescription(editInfo.description);
    setNtType(editInfo.type);
    setTypeId(editInfo.typeId);
    setSuccessFlag(postSuccess);
    dispatch(actions.addBreadCrumb({label:`${tag === "edit" ? "Edit Notification" : "Create Notification"}`}));
  }, [editInfo,postSuccess]);

  const changeID = event => {
    setDropdown(event.target.value);
  };
  const changeType = event => {
    setNtType(event.target.value);
  };
  const changeDescription = event => {
    setDescription(event.target.value);
  };

  const createNotification = () => {
    dispatch(
      actions.createNewNotification({
        name: ntType,
        description: description,
        categoryId: 100,
        appId: appId
      })
    );
  };
  const editNotification = () => {
    dispatch(
      actions.editNotification({
        name: ntType,
        description: description,
        categoryId: 100,
        typeId: typeId,
        appId: appId
      })
    );
  };

  return (
    <div className="create-notification-form-container">
      <Grid container item xs={12}>
        <FormHeader
          title={tag === "edit" ? "Edit Notification" : "Create Notification"}
          icon={tag === "edit" ? "edit" : "file"}
          setShowCopy={setShowEdit}
          flag = {sucessFlag}
        />
        <Grid container item xs={12} className={sucessFlag ?"category-container inactive-container" : "category-container"}>
          <Grid item xs={4} md={1}>
            <div className="category-Label"><Label label = "Category"></Label></div>
          </Grid>
          <Grid item xs={8} md={2} >
            <FormControl
              size="small"
              variant="outlined"
              className="drop-down-wrapper"
              onSubmit = {createNotification}
            >
              <Select
                labelId="demo-simple-select-outlined-label"
                className="drop-down-content"
                value={dropdown || ""}
                onChange={changeID}
              >
                {categoryList &&
                  categoryList.map((value, index) => {
                    return <MenuItem value={value.id}>{value.name}</MenuItem>;
                  })}

                {/* <MenuItem value="Announcements">Announcements</MenuItem>
                <MenuItem value="Tasks">Tasks</MenuItem>
                <MenuItem value={101}>Subscription</MenuItem>
                <MenuItem value={100}>Others</MenuItem> */}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container item xs={12} className={sucessFlag ?"type-container inactive-container":"type-container"} >
          <Grid item xs={12} md={6}>
            <FormTextBox
              label={<Label label = "Notification Type"/>}
              helperTxt="0 to 100 Characters"
            />
            <TextField
              required
              size="small"
              variant="outlined"
              className="type-input-field"
              value={ntType}
              onChange={changeType}
            />
          </Grid>
        </Grid>
        <Grid container item xs={12} className={sucessFlag ?"inactive-container desc-container":"desc-container"}>
          <Grid item xs={12}>
            <FormTextBox
              label={<Label label="Description" />}
              helperTxt="0 to 300 Characters"
              onSubmit={createNotification}
            />
            <TextField
              size="small"
              variant="outlined"
              className="desc-input-field"
              multiline={true}
              onChange={changeDescription}
              rows={9}
              value={description}
              required
            ></TextField>
          </Grid>
          <Grid container item xs={12}>
            <CustomButton
              text="Cancel"
              type="secondary"
              action={() => {
                setShowEdit(false);
                dispatch(actions.toggleHeader(true));
              }}
            />
            <CustomButton
              text="Submit"
              type="primary"
              action={tag === "create" ? createNotification : editNotification}
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default CreateNotificationForm;
