import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import strings from '../../../configs/strings';
// @material-ui/core 
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Radio from '@material-ui/core/Radio';

// Components

// @material-ui/core Icons
import BackspaceIcon from "@material-ui/icons/Backspace";
import AddAlertIcon from '@material-ui/icons/AddAlert';

// Utils
import ConvertDateTimeUtils from '../../../utils/datetimes/convertDateTimes';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiPopover-paper': {
        width: theme.notificationPopoverWidth,
        minHeight: theme.notificationPopoverMinHeight,
        maxHeight: theme.notificationPopoverMaxHeight,
    }
  },
  list: {
    width: '100%'
  },
  inline: {
    display: 'inline',
  },
  title: {
    paddingLeft: theme.spacing(2),
    paddingTop: theme.spacing(2),
    fontWeight: 600
  },
  listItem: {
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: theme.grayColor[11]
    },
    '&:hover .MuiSvgIcon-root': {
      visibility: 'visible'
    },
    '& .MuiSvgIcon-root': {
      fontSize: '1.5em'
    },
  },
  listItemTextNotRead: {
    '& .MuiListItemText-secondary': {
      color: theme.primaryColor[0]
    }
  },
  noNotiDisplayWrapper: {
    padding: theme.spacing(3),
    fontStyle: 'italic',
    textAlign: 'center',
    '& .MuiSvgIcon-root': {
      fontSize: '2.5em',
    },
  },
  applyBtn: {
      '& svg': {
          fontSize: '1.2em !important'
      }
  }
}));

const AppointmentRequestPopover = ({
  selectedAppointReqIdx, anchorEl, appointRequest,
  onClose, onSelect, onRejectReq
}) => {
  const classes = useStyles();
  const {t, i18n } = useTranslation();

  const handleRejectAppointReq = (reqID) => {
    onRejectReq(reqID);    
  }

  return (
    <Popover
        id="appointment-request-popover"
        open={Boolean(anchorEl)}
        onClose={onClose}
        anchorEl={anchorEl}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        className={classes.root}
    >
        <Typography
          variant="h5"
          component="h5"
          className={classes.title}
          >
          {t(strings.appointRequest)}
        </Typography>
        <List className={classes.list}>
          {(appointRequest.length > 0)? 
            appointRequest.map((request, index) => {
              return (
                <React.Fragment key={request._id}>
                  <ListItem alignItems="flex-start" className={classes.listItem}>
                    <ListItemAvatar>
                        <Radio
                            checked={index === selectedAppointReqIdx}
                            name="appointment-request-checkbox"
                            size="small"
                            margin="dense"
                            className={classes.applyBtn}
                            onClick={() => onSelect(index)}
                        />
                    </ListItemAvatar>
                    <ListItemText 
                      className={clsx(false && classes.listItemTextNotRead)}
                      primary={
                        <Typography
                          component="span"
                          variant="body2"
                          color="textPrimary"
                        >
                          <b>{request.first_name + " " + request.last_name}</b><br/>
                          {t(strings.appointDate) + ": "}  <b>{ConvertDateTimeUtils.formatDate(request.request_date, strings.defaultDateFormat)}</b><br/>
                          {t(strings.note) + ": " + (request.note || "...")}
                        </Typography>
                      } 
                      secondary={t(strings.atTime) + ": " + ConvertDateTimeUtils.formatDate(request.createdAt, "HH:mm DD/MM/YYYY") || '...'} />
                    <ListItemSecondaryAction>
                        {/* Reject button */}
                        <IconButton 
                            edge="end"
                            aria-label="reject"
                            variant="contained"
                            color="secondary"
                            onClick={() => handleRejectAppointReq(request._id)}
                        >
                            <BackspaceIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider component="li" />
                </React.Fragment>
              )
            })
           : 
           <div className={classes.noNotiDisplayWrapper}>
            <Typography variant="h6" component="h6" color="textSecondary">
              <AddAlertIcon/> <br/>
              {t(strings.noAppointRequestToDisplay)} ...
            </Typography>
           </div>
          }
        </List>
    </Popover>
  );
}

export default AppointmentRequestPopover;