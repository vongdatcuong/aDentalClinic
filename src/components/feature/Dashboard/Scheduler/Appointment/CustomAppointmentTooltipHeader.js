
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

const CustomAppointmentTooltipHeader = memo(({ onEdit, onDelete, appointmentData, onHide, ...restProps }) => {
  const classes = useStyles();
  return (
    <AppointmentTooltip.Header
      {...restProps}
      onHide={onHide}
      onOpenButtonClick={() => {
        onEdit({
          id: appointmentData.id,
          chairId: appointmentData.chairId,
        },
        appointmentData.startDate.toString(),
        appointmentData.endDate.toString()
        )
      }}
      onDeleteButtonClick={() => {
        onDelete();
        onHide();
      }}
    >
    </AppointmentTooltip.Header>
  );
});

export default CustomAppointmentTooltipHeader