
import React, {memo}  from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { 

} from '@material-ui/core';
import {
    Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';
// Material UI Icons

const useStyles = makeStyles((theme) => ({
    appointment: {
        
    }
}));

const CustomAppointment = memo(({...restProps }) => {
  const classes = useStyles();
  return (
    <Appointments.Appointment
        className={classes.appointment}
        {...restProps}
    >
    </Appointments.Appointment>
  );
});

export default CustomAppointment