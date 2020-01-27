import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import actions from "../store/actions";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const SwitchesSize = ({ status, type, typeId, changeStatus }) => {
  const data = useSelector(state => state.notification);
  const statusChangedSucess = !!data ? data.statusChanged : "";
  const appId = !!data ? data.selectedApp ? data.selectedApp.appId : "" : "";

  console.log(statusChangedSucess);
  const [checked, setChecked] = useState(false);
  const [statusValue, setStatusValue] = useState(status);
  const [statusChange, setStatusChange] = useState("");
  const [clicked, setClicked] = useState();


  const dispatch = useDispatch();

  const toggleChecked = (event) => {
    console.log(event.target.value)
    setClicked(event.target.value)
    dispatch(
      actions.statusUpdate({
        tab: type,
        status: status,
        appId: appId,
        typeId: typeId
      })
    );
    setChecked(prev => !prev);
    setStatusValue(statusValue === "Active" ? "Inactive" : "Active");
  };
  React.useEffect(() => {
    const checkedStatus = status === "Active" ? true : false;
    setChecked(checkedStatus);
    setStatusValue(status);
  }, [status]);
  React.useEffect(() => {

    if (statusChangedSucess === false && typeId == clicked ) {
      setChecked(prev => !prev);
      setStatusValue(statusValue === "Active" ? "Inactive" : "Active");
      setClicked("")
    }

  }, [statusChangedSucess]);
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch
            color="secondary"
            size="small"
            checked={checked}
            onChange={toggleChecked}
            value={typeId}
          />
        }
        label={statusValue}
      />
    </FormGroup>
  );
};

export default SwitchesSize;
