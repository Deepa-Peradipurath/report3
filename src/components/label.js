
import React ,{Fragment} from "react";

const Label = ({ label }) => {
    return <Fragment>{label} <span className = "required-sign">*</span></Fragment>;
  };

  export default Label;