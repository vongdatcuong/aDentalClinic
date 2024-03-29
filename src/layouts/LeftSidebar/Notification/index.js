import React, {} from "react";
import { useTranslation } from 'react-i18next';
import strings from '../../../configs/strings';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/core Icons
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';

// Components

// Utils

const useStyles = makeStyles((theme) => ({
    listItemBtn: {
        width: '60px',
        height: '60px',
        color: theme.fontColor,
        borderRadius: '5px',
        backgroundColor: theme.primaryColor[2],
        '& .MuiIconButton-label': {
          '& .MuiSvgIcon-root': {
            fontSize: '1.2em'
          }
        },
        '&:hover': {
          backgroundColor: theme.hoverBrightColor[0]
        }
    },
}));
const Notification = ({onOpen, popOverId, notiCount}) => {
    const classes = useStyles();
    const {t, i18n } = useTranslation();

    return (
        <React.Fragment>
          <Tooltip title={t(strings.notifications)} aria-label={t(strings.notifications)}>
            <IconButton className={classes.listItemBtn} size="medium" onClick={(evt) => onOpen(evt)} aria-describedby={popOverId}>
              <Badge badgeContent={notiCount} max={999} color="secondary">
                <NotificationsActiveIcon/>
              </Badge>
            </IconButton>
          </Tooltip>
        </React.Fragment>
    );
  }

export default Notification;