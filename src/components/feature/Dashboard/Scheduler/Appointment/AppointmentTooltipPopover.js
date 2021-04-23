import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import strings from '../../../../../configs/strings';

// Toast
import { toast } from 'react-toastify';

// @material-ui/core 
import Popover from '@material-ui/core/Popover';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';

// @material-ui/core Icons
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

// Components
import AppointmentTooltipContent from './AppointmentTooltipContent'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiPopover-paper': {
      width: theme.appointTooltipMaxWidth,
    }
  },
  cardActions: {
    justifyContent: 'flex-end'
  },
  cardContent: {
    padding: theme.spacing(1)
  }
}));

const AppointmentTooltipPopover = ({isImmutable, id, open, onClose, anchorPos, appointment, onUpdateAppointment, onDeleteAppointment}) => {
  const classes = useStyles();
  const {t, i18n } = useTranslation();

  // States

  return (
    <Popover
        id={id}
        open={open}
        onClose={onClose}
        anchorReference="anchorPosition"
        anchorPosition={{ top: anchorPos?.top || 0, left: anchorPos?.left || 0 }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        className={classes.root}
    >
      <Card className={classes.card}>
        <CardActions className={classes.cardActions}>
          {(!isImmutable) 
            && 
            <React.Fragment>
              <IconButton aria-label="edit-appointment" onClick={onUpdateAppointment}>
                <EditIcon />
              </IconButton>
              <IconButton aria-label="delete-appointment" onClick={onDeleteAppointment}>
                <DeleteIcon />
              </IconButton>
            </React.Fragment>
          }
        </CardActions>
        <CardContent className={classes.cardContent}>
          <AppointmentTooltipContent
            appointmentData={appointment}
          />
        </CardContent>
      </Card>
      
    </Popover>
  );
}

export default AppointmentTooltipPopover;