import React, {useState, useContext} from 'react';
import { makeStyles} from "@material-ui/core/styles";
import strings from '../../../configs/strings';
// use i18next
import { useTranslation } from 'react-i18next';

// Validate
import validators, { isPropValid } from '../../../utils/validators/index';

// @material-ui/core Component
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';

// Component

// Context
import { loadingStore } from '../../../contexts/loading-context';

// API
import api from '../../../api/base-api';
import apiPath from '../../../api/path';


const useStyles = makeStyles((theme) => ({
  gridRow: {
    paddingLeft: '0 !important',
    paddingRight: '0 !important',
    marginBottom: `${theme.spacing(1)}px !important`
  },
  textFieldLabel: {
    textAlign: 'right',
    '& .MuiFormLabel-root': {
      fontWeight: 600
    }
  },
  submitBtn: {
    display: 'block',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),
    margin: 'auto',
    color: theme.fontColor,
    backgroundColor: theme.primaryColor[0],
    '&:hover': {
      backgroundColor: theme.hoverBrightColor[1]
    }
  },
  formMessageSuccess: {
    textAlign: "center",
    fontSize: "1.1em",
    color: theme.successColor[0],
    marginBottom: theme.spacing(1)
  },
  formMessageFail: {
    textAlign: "center",
    fontSize: "1.1em",
    color: theme.dangerColor[0],
    marginBottom: theme.spacing(1)
  },
}));

const Password = () => {
  const classes = useStyles();
  const {t, i18next} = useTranslation();
  const { loadingState, dispatchLoading } = useContext(loadingStore);

  // States
  const [oldPwd, setOldPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");

  // Error Messages
  const [oldPwdErrMsg, setOldPwdErrMsg] = useState("");
  const [newPwdErrMsg, setNewPwdErrMsg] = useState("");
  const [confirmPwdErrMsg, setConfirmPwdErrMsg] = useState("");
  
  const [isSuccess, setIsSuccess] = useState(true);
  const [resultMsg, setResultMsg] = useState("");

  const handleChangeOldPwd = (evt) => {
    setOldPwd(evt.target.value);
  }

  const handleChangeNewPwd = (evt) => {
    setNewPwd(evt.target.value);
  }

  const handleChangeConfirmPwd = (evt) => {
    setConfirmPwd(evt.target.value);
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    let isValid = true;
    // Old Pwd
    if (!isPropValid(validators.properties.password, oldPwd)){
      setOldPwdErrMsg(t(strings.passwordErrMsg));
      isValid = false;
    } else {
      setOldPwdErrMsg("");
    }

    // New Pwd
    if (!isPropValid(validators.properties.password, newPwd)){
      setNewPwdErrMsg(t(strings.passwordErrMsg));
      isValid = false;
    } else {
      if (newPwd === oldPwd){
        setNewPwdErrMsg(t(strings.newPwdMatchOldPwd));
        isValid = false;
      } else {
        setNewPwdErrMsg("");
      }
    }

    // Confirm Pwd
    if (!isPropValid(validators.properties.password, confirmPwd)){
      setConfirmPwdErrMsg(t(strings.passwordErrMsg));
      isValid = false;
    } else {
      if (confirmPwd !== newPwd){
        setConfirmPwdErrMsg(t(strings.confirmPwdNotMatchErrMsg));
        isValid = false;
      } else {
        setConfirmPwdErrMsg(""); 
      }
    }
    if (isValid){
      try {
        dispatchLoading({type: strings.setLoading, isLoading: true});
        const result = await api.httpPost({
          url: apiPath.authorization.authorization + apiPath.authorization.changePassword,
          body: {
            old_password: oldPwd,
            password: newPwd,
          }
        })
        if (result.success){
          setIsSuccess(true);
          setResultMsg(t(strings.changePwdSuccess));
        } else {
          setIsSuccess(false);
          setResultMsg(result.message);
        }
      } catch(err){
        setIsSuccess(false);
        setResultMsg(t(strings.changePwdErrMsg));
      } finally {
        dispatchLoading({type: strings.setLoading, isLoading: false});
      }
    }
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Grid container justify="center" alignItems="center" spacing={2}>
        {/* Full Name */}
        <Grid className={classes.gridRow} container justify="flex-start" alignItems="center" item xs={12} md={12} spacing={4}>
          <Grid item md={2} sm={2} xs={2} className={classes.textFieldLabel}>
            <FormLabel>{t(strings.oldPassword)}</FormLabel>
          </Grid>
          <Grid item md={8} sm={10} xs={10}>
            <TextField
              size="small"
              name="oldPwd"
              variant="outlined"
              required
              fullWidth
              id="oldPwd"
              label={t(strings.oldPassword)}
              type="password"
              autoFocus
              value={oldPwd}
              onChange={(evt) => handleChangeOldPwd(evt)}
              className={classes.textField}
              error={oldPwdErrMsg !== ""}
              helperText={oldPwdErrMsg}
            />
          </Grid>
        </Grid>
        {/* Email */}
        <Grid className={classes.gridRow} container justify="flex-start" alignItems="center" item xs={12} md={12} spacing={4}>
          <Grid item md={2} sm={2} xs={2} className={classes.textFieldLabel}>
            <FormLabel>{t(strings.newPassword)}</FormLabel>
          </Grid>
          <Grid item md={8} sm={10} xs={10}>
            <TextField
              size="small"
              name="newPwd"
              variant="outlined"
              required
              fullWidth
              id="newPwd"
              label={t(strings.newPassword)}
              type="password"
              value={newPwd}
              onChange={(evt) => handleChangeNewPwd(evt)}
              className={classes.textField}
              error={newPwdErrMsg !== ""}
              helperText={newPwdErrMsg}
            />
          </Grid>
        </Grid>
        {/* Phone */}
        <Grid className={classes.gridRow} container justify="flex-start" alignItems="center" item md={12} spacing={4}>
          <Grid item md={2} sm={2} xs={2} className={classes.textFieldLabel}>
            <FormLabel>{t(strings.confirmPassword)}</FormLabel>
          </Grid>
          <Grid item md={8} sm={10} xs={10}>
            <TextField
              size="small"
              name="confirmPwd"
              variant="outlined"
              required
              fullWidth
              id="confirmPwd"
              label={t(strings.confirmPassword)}
              type="password"
              value={confirmPwd}
              onChange={(evt) => handleChangeConfirmPwd(evt)}
              className={classes.textField}
              error={confirmPwdErrMsg !== ""}
              helperText={confirmPwdErrMsg}
            />
          </Grid>
        </Grid>
      </Grid>
      <FormHelperText
        className={
          (isSuccess)? classes.formMessageSuccess : classes.formMessageFail
        }
        error={!isSuccess}
      >
        {t(resultMsg)}
      </FormHelperText>

      <Button
        type="submit"
        variant="contained"
        className={classes.submitBtn}
      >
        {t(strings.update)}
      </Button>
    </form>
  )
}

export default Password;