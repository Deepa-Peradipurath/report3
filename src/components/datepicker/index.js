import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DatePicker from "react-datepicker"; 
import "./react-datepicker.scss";

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

const DatePickerKey = ({setDateCount, setStart,setPage}) => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleChange = date => {
    setSelectedDate(date);
    const today = new Date()
    const selectedDay = new Date(date)
    const noOfDays =  today.getTime() - selectedDay.getTime(); 
    var Difference_In_Days = noOfDays / (1000 * 3600 * 24); 
    const dateDiff = Math.round(Difference_In_Days)
    alert(dateDiff)
    setStart(1);
    setPage(0);
    setDateCount(dateDiff)
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <DatePicker className="customDatePicker"
        selected={selectedDate}
        onChange={handleChange}
      />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}

export default DatePickerKey;
