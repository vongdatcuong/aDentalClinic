
import React, {memo}  from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { 
  TableRow, 
  Typography
} from '@material-ui/core';
import {
    DateNavigator,
} from '@devexpress/dx-react-scheduler-material-ui';
// Material UI Icons
import EventSeatIcon from '@material-ui/icons/EventSeat';

const useStyles = makeStyles((theme) => ({
  openBtn: {
    color: theme.whiteColor,
    fontSize: '1.2em'
  },
}));

const CustomDateNavigatorOpenButton = memo(({ ...restProps }) => {
  const classes = useStyles();
  return (
    <DateNavigator.OpenButton
      className={classes.openBtn}
      {...restProps}
    >
    </DateNavigator.OpenButton>
  );
});

export default CustomDateNavigatorOpenButton