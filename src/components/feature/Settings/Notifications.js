import React, {useState} from 'react';
import { makeStyles, useTheme  } from "@material-ui/core/styles";
import strings from '../../../configs/strings';
// use i18next
import { useTranslation } from 'react-i18next';

// @material-ui/core Component
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

// Component


const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

const Notifications = () => {
  const classes = useStyles();
  const {t, i18next} = useTranslation();

  // States
  const [state, setState] = React.useState({
    notifyStaffMessage: true,
    notifyPatientMessage: false,
    notifyHavingMeeting: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  return (
      <FormControl component="fieldset">
        <FormLabel component="legend">{t(strings.notifications)}</FormLabel>
        <FormGroup>
          <FormControlLabel
            className={classes.formControl}
            control={<Switch checked={state.notifyStaffMessage} onChange={handleChange} name="notifyStaffMessage" color="primary"/>}
            label={t(strings.notifyStaffMessage)}
          />
          <FormControlLabel
            className={classes.formControl}
            control={<Switch checked={state.notifyPatientMessage} onChange={handleChange} name="notifyPatientMessage" color="primary"/>}
            label={t(strings.notifyPatientMessage)}
          />
          <FormControlLabel
            className={classes.formControl}
            control={<Switch checked={state.notifyHavingMeeting} onChange={handleChange} name="notifyHavingMeeting" color="primary"/>}
            label={t(strings.notifyHavingMeeting)}
          />
        </FormGroup>
      </FormControl>
    )
}

export default Notifications;