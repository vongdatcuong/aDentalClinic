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
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

// Components
import NotificationFuncPopover from './NotificationFuncPopover';

// @material-ui/core Icons
import PersonIcon from '@material-ui/icons/Person';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddAlertIcon from '@material-ui/icons/AddAlert';

// Utils
import ConvertDateTimeUtils from '../../../utils/datetimes/convertDateTimes';

const useStyles = makeStyles((theme) => ({
  root: {
    width: theme.notificationPopoverWidth + 'px',
    minHeight: theme.notificationPopoverMinHeight + 'px',
    maxHeight: theme.notificationPopoverMaxHeight + 'px',
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
  listItemFunction: {
    '& .MuiSvgIcon-root': {
      fontSize: '1em',
      visibility: 'hidden',
    },
  },
  noNotiDisplayWrapper: {
    padding: theme.spacing(3),
    fontStyle: 'italic',
    textAlign: 'center',
    '& .MuiSvgIcon-root': {
      fontSize: '2.5em',
    },
  }
}));

const NotificationPopover = ({id, open, onClose, anchorEl, notifications, onNotificationClick, onRemoveNotification}) => {
  const classes = useStyles();
  const {t, i18n } = useTranslation();

  const [openNotiFuncPopover, setOpenNotiFuncPopover] = useState(false);
  const [notiFuncPopAnchorEl, setNotiFuncopAnchorEl] = useState(null);
  const notiFuncRefs = [];
  const popOverId = openNotiFuncPopover? "notification-function-popover" : undefined;

  // Notification to display Popover
  const [chosenNotiFunc, setChosenNotiFunc] = useState(-1);

  // Notifications Function Popover
  const handleOpenNotiFuncPopover = (index, notiId) => {
    setNotiFuncopAnchorEl(notiFuncRefs[index]);
    setChosenNotiFunc(notiId);
    setOpenNotiFuncPopover(true);
  }

  const handleCloseNotiFuncPopover = () => {
    setNotiFuncopAnchorEl(null);
    setChosenNotiFunc(-1);
    setOpenNotiFuncPopover(false);
  }

  const handleRemoveNotification = () => {
    onRemoveNotification(chosenNotiFunc);
    handleCloseNotiFuncPopover();
  }

  return (
    <Popover
        id={id}
        open={open}
        onClose={onClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        className={classes.root}
    >
        <Typography
          variant="h5"
          component="h5"
          className={classes.title}
          >
          {t(strings.notifications)}
        </Typography>
        <List className={classes.list}>
          {(notifications.length > 0)? 
            notifications.map((notification, index) => {
              return (
                <React.Fragment  key={index}>
                  <ListItem alignItems="flex-start" className={classes.listItem} onClick={(evt) => onNotificationClick(notification.id)}>
                    <ListItemAvatar>
                      <Avatar>
                        <PersonIcon/>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText 
                      className={clsx(!notification.isRead && classes.listItemTextNotRead)}
                      primary={
                        <Typography
                          component="span"
                          variant="body2"
                          color="textPrimary"
                        >
                          {notification.content}
                        </Typography>
                      } 
                      secondary={ConvertDateTimeUtils.formatDate(notification.date, "MMMM DD, YYYY") || '...'} />
                      <Typography className={classes.listItemFunction}>
                        <IconButton ref={(el) => notiFuncRefs.push(el)} onClick={(evt) => handleOpenNotiFuncPopover(index, notification.id)}>
                          <MoreVertIcon/>
                        </IconButton>
                      </Typography>
                  </ListItem>
                  <Divider component="li" />
                </React.Fragment>
              )
            })
           : 
           <div className={classes.noNotiDisplayWrapper}>
            <Typography variant="h6" component="h6" color="textSecondary">
              <AddAlertIcon/> <br/>
              {t(strings.noNotificationToDisplay)} ...
            </Typography>
           </div>
          }
        </List>
        <NotificationFuncPopover
          id={popOverId}
          open={openNotiFuncPopover}
          onClose={handleCloseNotiFuncPopover}
          anchorEl={notiFuncPopAnchorEl}
          onRemoveNotification={handleRemoveNotification}
        />
    </Popover>
  );
}

export default NotificationPopover;