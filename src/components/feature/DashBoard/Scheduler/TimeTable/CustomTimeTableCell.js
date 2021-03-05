
import React, {memo}  from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { 

} from '@material-ui/core';
import strings from '../../../../../configs/strings';
import {
    DayView,
} from '@devexpress/dx-react-scheduler-material-ui';
// Material UI Icons

// utils
import ConvertDateTimes from '../../../../../utils/datetimes/convertDateTimes';

const useStyles = makeStyles((theme) => ({
    timeTableCell: {
        position: 'relative',
        cursor: 'pointer',
        '&:hover span': {
          //display: 'block !important',
          visibility: 'visible',
          opacity: 0.7,
          transform: 'translate3d(0, -5px, 0)',
          transition: 'transform 0.3s linear, visibility 0s, opacity 0.3s ease-in'
        }
    },
    cellTooltipText: {
      //display: 'none',
      visibility: 'hidden',
      opacity: 0,
      position: 'absolute',
      zIndex: '10000',
      left: '40%',
      backgroundColor: theme.blackColor,
      color: theme.whiteColor,
      textAlign: 'center',
      borderRadius: '5px',
      fontSize: '0.9em',
      padding: theme.spacing(1),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    }
}));

const CustomTimeTableCell = memo(({ cellHeight, onClick, startDate, endDate, groupingInfo, onMouseEnter, onMouseLeave, indexInRow, state, ...restProps }) => {
  const classes = useStyles();
  const cellStyle = {
    height: `${cellHeight}px`,
  };
  const cellTooltipStyle = {
    top: `${-30}px`,
  }
  const startDayStr = startDate.toString();
  const endDateStr = endDate.toString();
  return (
    <DayView.TimeTableCell
        className={classes.timeTableCell}
        style={cellStyle}
        startDate={startDate}
        endDate={endDate}
        {...restProps}
        onClick={() => onClick(groupingInfo[0], startDayStr, endDateStr)}
        //onMouseEnter={() => onMouseEnter(groupingInfo[0].id, indexInRow, state)}
        //onMouseLeave={() => onMouseLeave(groupingInfo[0].id, indexInRow, state)}
    >
      <span
        className={classes.cellTooltipText}
        style={cellTooltipStyle}
        >
        {ConvertDateTimes.formatDate(startDate, strings.defaultTimeFormat)}
      </span>
    </DayView.TimeTableCell>
  );
});

export default CustomTimeTableCell