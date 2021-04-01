
import React, {memo}  from 'react';
import { makeStyles } from "@material-ui/core/styles";
import strings from '../../../../../configs/strings';
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

const CustomDateNavigatorOpenButton = memo(({ onClick, ...restProps }) => {
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