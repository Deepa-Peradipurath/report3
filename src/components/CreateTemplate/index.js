import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import actions from "../../store/actions";
import FormHeader from "../FormHeader/index";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import AddBoxRoundedIcon from "@material-ui/icons/AddBoxRounded";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ControlPointSharpIcon from "@material-ui/icons/ControlPointSharp";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import CustomButton from "../Button";
import FormTextBox from "../formTextBox";
import InlineFormTextBox from "../inlineFormTextBox/index";
import Label from "../label";
import "./CreateTemplate.scss";

const CreateTemplateForm = ({
  setShowCopy,
  tag,
  editInfo,
  channelList,
  notificationListData,
  appId
}) => {
  // const info = {"tempID":tempID, "type":type, "channel":channel, "name":name, }
  const [newParameter, setNewParameter] = useState();
  const [parameterList, setParameterList] = useState([]);
  const [name, setName] = useState("");
  const [channel, setChannel] = useState("");
  const [type, setType] = useState("");
  const [content, setContent] = useState("");
  const [subject, setSubject] = useState("");
  const [sucessFlag, setSuccessFlag] = useState("");

  const data = useSelector(state => state.notification);
  const templateData = !!data ? data.templateDetails : "";
  const templateDescription = !!templateData ? templateData.description : "";
  const templateContent = !!templateData ? templateData.content : "";
  const templateParametersString = !!templateData
    ? templateData.templateParameters
    : "";
  const templateParametersArray = templateParametersString
    ? JSON.parse(templateParametersString)
    : "";
    const postSuccess = !!data ? data.apiSuccessFlag : "";

  useEffect(() => {
    setName(editInfo.name);
    setType(editInfo.type);
    setChannel(editInfo.channel);
    setContent(templateContent);
    setSubject(templateDescription);
    setParameterList(templateParametersArray);
    setSuccessFlag(postSuccess);
    dispatch(actions.addBreadCrumb({label:`${tag === "edit" ? "Edit Template" : "Create Template"}`}));

  }, [
    editInfo,
    channelList,
    tag,
    templateContent,
    templateDescription,
    templateParametersString,
    postSuccess
  ]);

  const getParameter = parameter => {
    setNewParameter(parameter);
  };
  const addParameterList = () => {
    const tempParameterList = [...parameterList];
    if (newParameter) {
      tempParameterList.push(newParameter);
    }
    setParameterList(tempParameterList);
    setNewParameter("");
  };

  const changeSubject = event => {
    setSubject(event.target.value);
  };
  const changeContent = event => {
    setContent(event.target.value);
  };

  const changeName = event => {
    setName(event.target.value);
  };
  const dispatch = useDispatch();

  const updateTemplate = () => {
    let tempParam = parameterList.toString();
    let info;
    if (tag === "edit") {
      info = {
        name: name,
        description: subject,
        content: content,
        appId: appId,
        templateParameters: tempParam,
        templateId: editInfo.tempID
      };
    } else if (tag === "create") {
      info = {
        name: name,
        description: subject,
        content: content,
        appId: appId,
        channelId: channel,
        typeId: type,
        // templateParameters: tempParam
        templateParameters: []
      };
    }
    dispatch(actions.updateNotification({ info: info, tag: tag }));
  };
  return (
    <div className="create-template-form-container">
      <Grid container item xs={12}>
        <FormHeader
          title={tag === "edit" ? "Edit Template" : "Create Template"}
          icon={tag === "edit" ? "edit" : "file"}
          setShowCopy={setShowCopy}
          flag = {sucessFlag}

        />
        <Grid container item xs={12} className={sucessFlag ? "inactive-container channel-type-container" :"channel-type-container"} >
          <Grid container item xs={12} md={8}>
            <Grid item xs={12} md={4}>
              <InlineFormTextBox
                label={<Label label="Channel" />}
                dropdown={tag === "edit" ? false : true}
                listData={channelList}
                selectedData={channel}
                setData={setChannel}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <InlineFormTextBox
                label={<Label label="Notification Type" />}
                dropdown={tag === "edit" ? false : true}
                listData={notificationListData}
                selectedData={type}
                setData={setType}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={12}
          spacing="3"
          className={sucessFlag ? "inactive-container template-name-container" : "template-name-container"}
        >
          <Grid item xs={12} md={6}>
            <FormTextBox
              label={<Label label="Template Name" />}
              helperTxt="0 out of 100 characters"
            />
            <TextField
              size="small"
              variant="outlined"
              className="input-field"
              value={name}
              onChange={changeName}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormTextBox
              label={<Label label="Subject" />}
              helperTxt="0 out of 100 characters"
            />
            <TextField
              size="small"
              variant="outlined"
              className="input-field"
              value={subject}
              onChange={changeSubject}
            />
          </Grid>
        </Grid>
        <Grid container item xs={12} className={sucessFlag ? "inactive-container content-container" : "content-container"}>
          <Grid item xs={12}>
            <FormTextBox label={<Label label="Content" />} />
          </Grid>
          <Grid item xs={12} md={8}>
            <TextField
              value={content}
              onChange={changeContent}
              size="small"
              variant="outlined"
              className="content-input-field"
              multiline={true}
              rows={30}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <div className="parameter-container">
              <div className="parameter-input-container">
                <div className="parameter-content">List of Parameters</div>
                <TextField
                  size="small"
                  variant="outlined"
                  className="parameter-input-field"
                  onChange={e => getParameter(e.target.value)}
                  value={newParameter}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <AddBoxRoundedIcon
                          fontSize="large"
                          htmlColor="#4FB218"
                          style={{ cursor: "pointer" }}
                          onClick={addParameterList}
                        />
                      </InputAdornment>
                    )
                  }}
                />
                <RadioGroup
                  aria-label="parameter"
                  name="parameter-lists"
                  className="radio-list-container"
                >
                  {parameterList &&
                    parameterList.map(parameter => {
                      return (
                        <div className="parameter-radio-container">
                          <FormControlLabel
                            value={parameter}
                            className="parameter-radio-list"
                            control={<Radio size="small" />}
                            label={parameter}
                          />
                          <span className="icon-container">
                            <ControlPointSharpIcon size="small" />
                            <DeleteOutlineIcon size="small" />
                          </span>
                        </div>
                      );
                    })}
                </RadioGroup>
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid container className={sucessFlag ? "inactive-container buttonWrapper " : "buttonWrapper" }>
          <CustomButton
            text="Cancel"
            type="secondary"
            action={() => {
              setShowCopy(false);
              dispatch(actions.toggleHeader(true));
            }}
          />
          <CustomButton text="Submit" type="primary" action={updateTemplate} />
        </Grid>
      </Grid>
      {/* <FormHeader title = {tag === "edit" ?"Edit Template":"Create Template"} icon = {tag === "edit" ? "edit":"file" }setShowCopy = {setShowCopy}/>
            <Grid container>
                <Grid container item xs={12} className="channel-type-container">
                    <Grid item xs={1}>
                        <div className="channel-content">Channel</div>
                    </Grid>
                    <Grid item xs={2}>
                        <FormControl variant="outlined" margin="dense" className="channel-drop-down">
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                className="template-drop-down-content"

                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Email</MenuItem>
                                <MenuItem value={20}>SMS</MenuItem>
                                <MenuItem value={30}>Push Notification</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                        <div className="notification-type-content">Notification Type</div>
                    </Grid>
                    <Grid item xs={2}>
                        <FormControl variant="outlined" margin="dense" className="notification-type-drop-down">
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                className="template-drop-down-content"

                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Type 1</MenuItem>
                                <MenuItem value={20}>Type 2</MenuItem>
                                <MenuItem value={30}>Type 3</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container item xs={12} className="template-name-container">
                    <Grid item xs={6}>
                        <div className="template-name-content-div">
                            <div className="content">Template Name</div>
                            <div className="content-helper ">0 out of 100 characters</div>
                        </div>
                        <TextField id="outlined-basic" variant="outlined" className="input-field" />
                    </Grid>
                    <Grid item xs={6}>
                        <div className="subject-content-div">
                            <div className="content">Subject</div>
                            <div className="content-helper ">0 out of 100 characters</div>
                        </div>
                        <TextField id="outlined-basic" variant="outlined" className="input-field" />
                    </Grid>
                </Grid>
                <Grid container item xs={12} className="content-container">
                    <Grid item xs={8}>
                        <div>Content</div>
                        <TextField id="outlined-basic" variant="outlined" className="content-input-field" multiline={true} rows={30} />
                    </Grid>
                    <Grid item xs={4}>
                        <div className="parameter-container">
                            <div className="parameter-input-container">
                                <div className="parameter-content">List of Parameters</div>
                                <TextField
                                    id="input-with-icon-textfield"
                                    variant="outlined"
                                    className="parameter-input-field"
                                    onChange={(e) => getParameter(e.target.value)}
                                    value={newParameter}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position='end'>
                                                <AddBoxRoundedIcon fontSize='large' htmlColor='#4FB218' style={{ cursor: 'pointer' }} onClick={addParameterList} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <RadioGroup aria-label="parameter" name="parameter-lists" className="radio-list-container">
                                    {parameterList && parameterList.map((parameter) => {
                                        return (
                                            <div className="parameter-radio-container">
                                                <FormControlLabel value={parameter} className="parameter-radio-list" control={<Radio size='small' />} label={parameter} />
                                                <span className="icon-container">
                                                    <ControlPointSharpIcon size='small' />
                                                    <DeleteOutlineIcon size='small' />
                                                </span>
                                            </div>
                                        )
                                    })}
                                </RadioGroup>
                            </div>
                        </div>
                    </Grid>
                </Grid>
                <Grid container item xs={12} spacing={3}>
                    <Grid item xs={12}>
                        <div className="create-template-action-container">
                            <CustomButton text="Cancel" type="secondary" />
                            <CustomButton text="Submit" type="primary" />
                        </div>

                    </Grid>
                </Grid>
            </Grid> */}
    </div>
  );
};

export default CreateTemplateForm;
