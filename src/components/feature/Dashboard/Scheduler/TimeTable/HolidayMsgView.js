import React, {} from 'react';
import { sliceEvents, createPlugin } from '@fullcalendar/react';
import strings from '../../../../../configs/strings';
import { makeStyles } from "@material-ui/core/styles";

// i18next
import { useTranslation } from 'react-i18next';

// @material-ui/core
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  paper: {
    textAlign: 'center',
    fontSize: '1.5em',
    color: theme.dangerColor[0],
    padding: theme.spacing(4)
  }
}));

const CustomView = ({}) => {
  const classes = useStyles();
  const [t, i18n] = useTranslation();

  return (
    <Paper className={classes.paper}><h4>!!! {t(strings.thisIsAHolidayErrMsg)} !!!</h4></Paper>
  );
}

export default createPlugin({
  views: {
    HolidayMsg: CustomView
  }
});