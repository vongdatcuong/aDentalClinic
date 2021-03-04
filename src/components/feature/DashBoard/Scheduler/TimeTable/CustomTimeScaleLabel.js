
import React, {memo}  from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { 

} from '@material-ui/core';
import {
    DayView,
} from '@devexpress/dx-react-scheduler-material-ui';
// Material UI Icons

const useStyles = makeStyles((theme) => ({
    timeScaleLabel: {
        position: 'relative',
        overflow: 'visible',
        '& span': {
          fontSize: '0.8em',
          position: 'absolute',
          top: '3px',
          right: '5px'
        }
    }
}));

const CustomTimeScaleLabel = memo(({ cellHeight, time, ...restProps }) => {
  const classes = useStyles();
  let displayTime = "";
  if (time){
    const timeMinute = time.getMinutes();
    if (timeMinute == 0 || timeMinute == 30){
      displayTime = time;
    }
  }
  const timeScaleLabelStyle = {
    height: `${cellHeight}px`,
      lineHeight: `${cellHeight - 2}px`,
      "&:firstChild": {
        height: `${Math.round(cellHeight * 100000/ 2) / 100000}px`
      },
      "&:lastChild": {
        height: `${Math.round(cellHeight * 100000/ 2) / 100000}px`
    }
  }
  return (
    <DayView.TimeScaleLabel
        className={classes.timeScaleLabel}
        style={timeScaleLabelStyle}
        time={displayTime}
        {...restProps}
    >
      {(displayTime)? "" : "-"}
    </DayView.TimeScaleLabel>
  );
});

export default CustomTimeScaleLabel