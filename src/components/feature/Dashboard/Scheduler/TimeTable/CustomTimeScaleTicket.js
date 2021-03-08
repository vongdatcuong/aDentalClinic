
import React, {memo}  from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { 

} from '@material-ui/core';
import {
    DayView,
} from '@devexpress/dx-react-scheduler-material-ui';
// Material UI Icons

const useStyles = makeStyles((theme) => ({
    timeScaleTickCell: {
        
    }
}));

const CustomTimeScaleTickCell = memo(({ cellHeight, ...restProps }) => {
  const classes = useStyles();
  const cellTickStyle = {
    height: `${cellHeight}px`,
  };
  return (
    <DayView.TimeScaleTickCell
        className={classes.timeScaleTickCell}
        style={cellTickStyle}
        {...restProps}
    >
    </DayView.TimeScaleTickCell>
  );
});

export default CustomTimeScaleTickCell