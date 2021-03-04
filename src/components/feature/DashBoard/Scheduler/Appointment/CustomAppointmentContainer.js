
import React, {memo}  from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { 

} from '@material-ui/core';
import {
    Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';
// Material UI Icons

const useStyles = (width) => makeStyles((theme) => ({
    container: {
        width: `${width}% !important`
    }
}));

const CustomAppointmentContainer = memo(({width, ...restProps }) => {
  const classes = useStyles(width)();
  return (
    <Appointments.Container
        className={classes.container}
        {...restProps}
    >
    </Appointments.Container>
  );
});

export default CustomAppointmentContainer