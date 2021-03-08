
import React, {memo}  from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { 

} from '@material-ui/core';
import {
    AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui';
// Material UI Icons

const useStyles = makeStyles((theme) => ({
  
}));

const CustomAppointmentTooltipContent = memo(({...restProps }) => {
  const classes = useStyles();
  return (
    <AppointmentTooltip.Content
      {...restProps}
    >
    </AppointmentTooltip.Content>
  );
});

export default CustomAppointmentTooltipContent