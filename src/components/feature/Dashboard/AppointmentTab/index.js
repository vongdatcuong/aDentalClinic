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
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

// React-select
import AsyncSelect from 'react-select/async';

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
    const [searchPatient, setSearchPatient] = useState("");

    const filterColors = (inputValue) => {
        return [
            { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
            { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
            { value: 'purple', label: 'Purple', color: '#5243AA' },
            { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
            { value: 'orange', label: 'Orange', color: '#FF8B00' },
            { value: 'yellow', label: 'Yellow', color: '#FFC400' },
            { value: 'green', label: 'Green', color: '#36B37E' },
            { value: 'forest', label: 'Forest', color: '#00875A' },
            { value: 'slate', label: 'Slate', color: '#253858' },
            { value: 'silver', label: 'Silver', color: '#666666' },
          ].filter(i =>
          i.label.toLowerCase().includes(searchPatient.toLowerCase())
        );
    };
    const loadOptions = (inputValue, callback) => {
        setTimeout(() => {
          callback(filterColors(inputValue));
        }, 1000);
    };

    const handleInputChange = (newValue) => {
        const newInputValue = newValue.replace(/\W/g, '');
        setSearchPatient(newInputValue);
    };

    return (
        <Paper p={2} className={classes.paper}>
            <IconButton aria-label="back" className={classes.backBtn} onClick={onClose}>
                <ArrowBackIcon fontSize="small" />
            </IconButton>
            <Typography className={classes.title} variant="h4" component="h4">{t(strings.add)} {t(strings.appointment)}</Typography>
            <Grid container className={classes.gridContainer} spacing={1}>
                <Grid container item md={6} sm={12} spacing={1}>
                    <Grid item md={12}>
                    <AsyncSelect
                        cacheOptions
                        loadOptions={loadOptions}
                        defaultOptions
                        onInputChange={handleInputChange}
                    />
                    </Grid>
                </Grid>
                <Grid container item md={6} sm={12} spacing={1}>
                    qweqwe
                </Grid>
            </Grid>
        </Paper>
    )
}

export default AppointmentTab;