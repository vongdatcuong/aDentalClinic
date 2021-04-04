
import React, {memo}  from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { 

} from '@material-ui/core';
import strings from '../../../../../configs/strings';
import {
    DayView,
    AllDayPanel,
    AllDay
} from '@devexpress/dx-react-scheduler-material-ui';
// Material UI Icons
import { MdInfo } from "react-icons/md";

// utils
import ConvertDateTimes from '../../../../../utils/datetimes/convertDateTimes';

const useStyles = makeStyles((theme) => ({
    message: {
      textAlign: 'center',
      color: theme.dangerColor[0]
    },
    icon: {
      fontSize: '1.5em',
      verticalAlign: 'text-bottom'
    }
}));

const CustomTimeTableRow = memo(({message, ...restProps}) => {
  const classes = useStyles();
  
  return (
    <DayView.TimeTableRow    
        className={classes.timeTableCell}
    >
      <h2 className={classes.message}><MdInfo className={classes.icon}/> {message}</h2>
    </DayView.TimeTableRow>
  );
});

export default CustomTimeTableRow