import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme  } from "@material-ui/core/styles";
import strings from '../../../../configs/strings';
import figures from '../../../../configs/figures';

// i18next
import { useTranslation } from 'react-i18next';

// Toast
import { toast } from 'react-toastify';

// @material-ui/core Component
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import styles from "./jss";

// Components

// Icons
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

// Utils
import ConvertDateTimes from '../../../../utils/datetimes/convertDateTimes';

const useStyles = makeStyles(styles);

const AppointmentTab = ({onClose}) => {
    const classes = useStyles();
    const [t, i18n] = useTranslation();

    // States

    return (
        <Paper p={2} className={classes.paper}>
            <IconButton aria-label="back" className={classes.margin} onClick={onClose}>
                <ArrowBackIcon fontSize="large" />
            </IconButton>
        </Paper>
    )
}

export default AppointmentTab;