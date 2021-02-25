import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import strings from '../../../configs/strings';
// @material-ui/core 
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemAvatar';

// @material-ui/core Icons
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';

// Theme
import {
  
} from '../../../themes/theme1';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiSvgIcon-root': {
        fontSize: '2em'
    }
  }
}));

const NotificationPopover = ({id, open, onClose, anchorEl, onRemoveNotification}) => {
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
            horizontal: 'left',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        className={classes.root}
    >
        <List className={classes.list}>
            <ListItem button onClick={() => onRemoveNotification()}>
                <ListItemIcon>
                    <CancelPresentationIcon />
                </ListItemIcon>
                <ListItemText primary={t(strings.removeNotification)} />
            </ListItem>
        </List>
    </Popover>
  );
}

export default NotificationPopover;