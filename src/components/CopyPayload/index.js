import React, { Fragment } from "react";
import {useDispatch } from "react-redux";
import actions  from "../../store/actions";
import { useSelector } from "react-redux";
import FormHeader from "../FormHeader/index";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core";
import CustomButton from "../Button";
import "./payload.scss";
const CopyPayload = ({ tempID, setShowCopy }) => {
  const dispatch = useDispatch();

  const data = useSelector(state => state.notification);
  const payLoadData = JSON.stringify(!!data ? data.samplePayload : "", null,4 );
  return (
    <Fragment>
    <div className="create-template-form-container payload-container">
      <FormHeader title="Pay Load" icon="file" setShowCopy={setShowCopy} />
      {/* <Grid container item xs={12} className="content-container"> */}
      <div className="payload-title">Sample Payload</div>
      <Grid container item xs={10} className="payload-sample">
        <pre>{payLoadData}</pre>
        {/* <TextField  variant="outlined" className="content-input-field" multiline={true} rows={20} >
          {payLoadData}
        </TextField> */}
        {/* <TextField id="outlined-basic" variant="outlined" className="content-input-field" multiline={true} rows={20} /> */}
        {/* </Grid> */}
      </Grid>
      <Grid item xs={10} className="payload-button">
        <div className="create-template-action-container">
          <CustomButton text="Cancel" type="secondary" action = {() => {
            setShowCopy(false)
            dispatch(actions.toggleHeader(true));
            }}/>
          <CustomButton text="Test" type="primary" action = {() =>{alert("Yet to implement")}} />
        </div>
      </Grid>
      
    </div>
    </Fragment>
  );
};

export default CopyPayload;
