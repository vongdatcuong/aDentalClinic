import React, {useState} from 'react';
import { makeStyles, useTheme  } from "@material-ui/core/styles";
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
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormLabel from '@material-ui/core/FormLabel';

// Component


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

const Account = () => {
  const classes = useStyles();
  const {t, i18next} = useTranslation();

  // States
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // Error Messages
  const [fullNameErrMsg, setFullNameErrMsg] = useState("");
  const [emailErrMsg, setEmailErrMsg] = useState("");
  const [phoneErrMsg, setPhoneErrMsg] = useState("");
  const [addressErrMsg, setAddressErrMsg] = useState("");
  
  const [isSuccess, setIsSuccess] = useState(true);
  const [resultMsg, setResultMsg] = useState("");

  const handleChangeFullName = (evt) => {
    setFullName(evt.target.value);
  }

  const handleChangeEmail = (evt) => {
    setEmail(evt.target.value);
  }

  const handleChangePhone = (evt) => {
    setPhone(evt.target.value);
  }

  const handleChangeAddress = (evt) => {
    setAddress(evt.target.value);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    // Full name
    if (!isPropValid(validators.properties.fullName, fullName)){
      setFullNameErrMsg(t(strings.fullNameErrMsg));
    } else {
      setFullNameErrMsg("");
    }

    // Email
    if (!isPropValid(validators.properties.email, email)){
      setEmailErrMsg(t(strings.emailErrMsg));
    } else {
      setEmailErrMsg("");
    }

    // Phone
    if (!isPropValid(validators.properties.phone, phone)){
      setPhoneErrMsg(t(strings.phoneErrMsg));
    } else {
      setPhoneErrMsg("");
    }

    // Address
    if (!isPropValid(validators.properties.address, address)){
      setAddressErrMsg(t(strings.addressErrMsg));
    } else {
      setAddressErrMsg("");
    }
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Grid container justify="center" alignItems="center" spacing={2}>
        {/* Full Name */}
        <Grid className={classes.gridRow} container justify="flex-start" alignItems="center" item xs={12} md={12} spacing={4}>
          <Grid item md={2} sm={2} xs={2} className={classes.textFieldLabel}>
            <FormLabel>{t(strings.fullName)}</FormLabel>
          </Grid>
          <Grid item md={8} sm={10} xs={10}>
            <TextField
              size="small"
              name="fullName"
              variant="outlined"
              required
              fullWidth
              id="fullName"
              label={t(strings.fullName)}
              autoFocus
              value={fullName}
              onChange={(evt) => handleChangeFullName(evt)}
              className={classes.textField}
              error={fullNameErrMsg !== ""}
              helperText={fullNameErrMsg}
            />
          </Grid>
        </Grid>
        {/* Email */}
        <Grid className={classes.gridRow} container justify="flex-start" alignItems="center" item xs={12} md={12} spacing={4}>
          <Grid item md={2} sm={2} xs={2} className={classes.textFieldLabel}>
            <FormLabel>{t(strings.email)}</FormLabel>
          </Grid>
          <Grid item md={8} sm={10} xs={10}>
            <TextField
              size="small"
              name="email"
              variant="outlined"
              required
              fullWidth
              id="email"
              label={t(strings.email)}
              value={email}
              onChange={(evt) => handleChangeEmail(evt)}
              className={classes.textField}
              error={emailErrMsg !== ""}
              helperText={emailErrMsg}
            />
          </Grid>
        </Grid>
        {/* Phone */}
        <Grid className={classes.gridRow} container justify="flex-start" alignItems="center" item md={12} spacing={4}>
          <Grid item md={2} sm={2} xs={2} className={classes.textFieldLabel}>
            <FormLabel>{t(strings.phone)}</FormLabel>
          </Grid>
          <Grid item md={8} sm={10} xs={10}>
            <TextField
              size="small"
              name="phone"
              variant="outlined"
              required
              fullWidth
              id="phone"
              label={t(strings.phone)}
              value={phone}
              onChange={(evt) => handleChangePhone(evt)}
              className={classes.textField}
              error={phoneErrMsg !== ""}
              helperText={phoneErrMsg}
            />
          </Grid>
        </Grid>
        {/* Address */}
        <Grid className={classes.gridRow} container justify="flex-start" alignItems="center" item md={12} spacing={4}>
          <Grid item md={2} sm={2} xs={2} className={classes.textFieldLabel}>
            <FormLabel>{t(strings.address)}</FormLabel>
          </Grid>
          <Grid item md={8} sm={10} xs={10}>
            <TextField
              size="small"
              name="address"
              variant="outlined"
              required
              fullWidth
              id="address"
              label={t(strings.address)}
              value={address}
              onChange={(evt) => handleChangeAddress(evt)}
              className={classes.textField}
              error={addressErrMsg !== ""}
              helperText={addressErrMsg}
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

export default Account;