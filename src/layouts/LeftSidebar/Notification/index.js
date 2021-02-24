import React, {useState, useRef} from "react";
import clsx from "clsx";
import { useTranslation } from 'react-i18next';
import strings from '../../../configs/strings';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import Badge from "@material-ui/core/Badge";

// @material-ui/core Icons
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';

// Components

// Utils

import {
    primaryColor,
    whiteColor,
    hoverBrightColor,
  } from "../../../themes/theme1";

const useStyles = makeStyles((theme) => ({
    listItemBtn: {
        width: '60px',
        height: '60px',
        color: whiteColor,
        borderRadius: '5px',
        backgroundColor: primaryColor[2],
        '& .MuiIconButton-label': {
          '& .MuiSvgIcon-root': {
            fontSize: '1.2em'
          }
        },
        '&:hover': {
          backgroundColor: hoverBrightColor[0]
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