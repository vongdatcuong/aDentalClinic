import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
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

// @material-ui/core Icons
import PersonIcon from '@material-ui/icons/Person';

// Theme
import {
  notificationPopoverWidth,
  notificationPopoverMaxHeight,
  grayColor,
  primaryColor,
} from '../../../themes/theme1';

// Utils
import ConvertDateTimeUtils from '../../../utils/datetimes/convertDateTimes';

const useStyles = makeStyles((theme) => ({
  root: {
    width: notificationPopoverWidth + 'px',
    '& .MuiSvgIcon-root': {
      fontSize: '1.5em !important'
    },
    maxHeight: notificationPopoverMaxHeight + 'px'
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
      backgroundColor: grayColor[11]
    }
  },
  listItemTextNotRead: {
    '& .MuiListItemText-secondary': {
      color: primaryColor[0]
    }
  }
}));

const NotificationPopover = ({id, open, onClose, anchorEl, notifications, onNotificationClick}) => {
  const classes = useStyles();
  const {t, i18n } = useTranslation();

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
          {notifications.map((notification, index) => {
            return (
              <React.Fragment>
                <ListItem alignItems="flex-start" className={classes.listItem} onClick={(evt) => onNotificationClick(index)}>
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
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            )
          })}
        </List>
    </Popover>
  );
}

export default NotificationPopover;