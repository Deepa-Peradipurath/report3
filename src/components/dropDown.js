import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles(theme => ({
  formControl: {
    //margin: theme.spacing(2),
    minWidth: 154
  },
  selectEmpty: {
    //marginTop: theme.spacing(2)
  }
}));

const DropDown = ({
  title,
  fields,
  setFilter,
  inputSubmit,
  setStart,
  setPage,
  section
}) => {
  const classes = useStyles();
  const [state, setState] = React.useState(-1);

  // const inputLabel = React.useRef(null);
  // const [labelWidth, setLabelWidth] = React.useState(0);
  // React.useEffect(() => {
  //   setLabelWidth(inputLabel.current.offsetWidth);
  // }, []);

  const handleChange = event => {
    event.preventDefault();
    setStart(1);
    setPage(0);
    setFilter(event.target.value);
    setState(event.target.value);
  };
  return (
    <FormControl
      defaultValue="Small"
      variant="outlined"
      size="small"
      className={classes.formControl}
    >
      <Select
        value={state}
        onChange={handleChange}
        id="demo-simple-select-autowidth"
        displayEmpty
        className={classes.selectEmpty}
      >
        <MenuItem value="-1">{"All"}</MenuItem>
        {!!fields.length > 0 &&
          fields.map((value, index) => {
            return (
              <MenuItem
                key={index}
                value={value.id}
                selected={index === 0 ? true : false}
              >
                {value.name}
              </MenuItem>
            );
          })}
      </Select>
    </FormControl>
  );
};

export default DropDown;
