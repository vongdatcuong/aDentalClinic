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
import AuthService from '../../../api/authentication/auth.service';


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
  form: {
      
    "& $fieldset": {
        borderColor: theme.inputDisabledColor + "!important",
    },
    "& .MuiOutlinedInput-root": {
        color: theme.textColor,
    },
    "& .MuiFormLabel-root": {
        color: theme.inputDisabledColor,
    },
  }
}));

const Account = () => {
  const classes = useStyles();
  const {t, i18next} = useTranslation();
  const { loadingState, dispatchLoading } = useContext(loadingStore);

  const user = AuthService.getCurrentUser();

  // States
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);
  const [homePhone, setHomePhone] = useState(user.home_phone);
  const [mobilePhone, setMobilePhone] = useState(user.mobile_phone);
  const [address, setAddress] = useState(user.address);

  // Error Messages
  const [firstNameErrMsg, setFirstNameErrMsg] = useState("");
  const [lastNameErrMsg, setLastNameErrMsg] = useState("");
  const [emailErrMsg, setEmailErrMsg] = useState("");
  const [homePhoneErrMsg, setHomePhoneErrMsg] = useState("");
  const [mobilePhoneErrMsg, setMobilePhoneErrMsg] = useState("");
  const [addressErrMsg, setAddressErrMsg] = useState("");
  
  const [isSuccess, setIsSuccess] = useState(true);
  const [resultMsg, setResultMsg] = useState("");

  const handleChangeFirstName = (evt) => {
    setFirstName(evt.target.value);
  }

  const handleChangeLastName = (evt) => {
    setLastName(evt.target.value);
  }

  const handleChangeEmail = (evt) => {
    setEmail(evt.target.value);
  }

  const handleChangeHomePhone = (evt) => {
    setHomePhone(evt.target.value);
  }

  const handleChangeMobilePhone = (evt) => {
    setMobilePhone(evt.target.value);
  }

  const handleChangeAddress = (evt) => {
    setAddress(evt.target.value);
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    let isValid = true;
    // First name
    if (!isPropValid(validators.properties.firstName, firstName)){
      setFirstNameErrMsg(t(strings.firstNameErrMsg));
      isValid = false;
    } else {
      setFirstNameErrMsg("");
    }

    // Last name
    if (!isPropValid(validators.properties.lastName, lastName)){
      setLastNameErrMsg(t(strings.lastNameErrMsg));
      isValid = false;
    } else {
      setLastNameErrMsg("");
    }

    // Email
    if (!isPropValid(validators.properties.email, email)){
      setEmailErrMsg(t(strings.emailErrMsg));
      isValid = false;
    } else {
      setEmailErrMsg("");
    }

    // Home Phone
    if (!isPropValid(validators.properties.phone, homePhone)){
      setHomePhoneErrMsg(t(strings.phoneErrMsg));
      isValid = false;
    } else {
      setHomePhoneErrMsg("");
    }

    // Mobile Phone
    if (!isPropValid(validators.properties.phone, mobilePhone)){
      setMobilePhoneErrMsg(t(strings.phoneErrMsg));
      isValid = false;
    } else {
      setMobilePhoneErrMsg("");
    }

    // Address
    if (!isPropValid(validators.properties.address, address)){
      setAddressErrMsg(t(strings.addressErrMsg));
      isValid = false;
    } else {
      setAddressErrMsg("");
    }
    if (isValid){
      try {
        dispatchLoading({type: strings.setLoading, isLoading: true});
        const result = await api.httpPatch({
          url: apiPath.staff.staff + '/' + user.staff_id,
          body: {
            first_name: firstName,
            last_name: lastName,
            email: email,
            home_phone: homePhone,
            mobile_phone: mobilePhone,
            address: address
          }
        })
        if (result.success){
          user.first_name = firstName;
          user.last_name = lastName;
          user.email = email;
          user.home_phone = homePhone;
          user.mobile_phone = mobilePhone;
          user.address = address;
          AuthService.updateCurrentUser(user);
          setIsSuccess(true);
          setResultMsg(t(strings.updateAccountSuccess));
        } else {
          setIsSuccess(false);
          setResultMsg(result.message);
        }
      } catch(err){
        setIsSuccess(false);
        setResultMsg(t(strings.updateAccountFail));
      } finally {
        dispatchLoading({type: strings.setLoading, isLoading: false});
      }
    }
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Grid container justify="center" alignItems="center" spacing={2}>
        {/* First Name */}
        <Grid className={classes.gridRow} container justify="flex-start" alignItems="center" item xs={12} md={12} spacing={4}>
          <Grid item md={2} sm={2} xs={2} className={classes.textFieldLabel}>
            <FormLabel>{t(strings.firstName)}</FormLabel>
          </Grid>
          <Grid item md={8} sm={10} xs={10}>
            <TextField
              size="small"
              name="firstName"
              variant="outlined"
              required
              fullWidth
              id="firstName"
              label={t(strings.firstName)}
              autoFocus
              value={firstName}
              onChange={(evt) => handleChangeFirstName(evt)}
              className={classes.textField}
              error={firstNameErrMsg !== ""}
              helperText={firstNameErrMsg}
            />
          </Grid>
        </Grid>
        {/* Last Name */}
        <Grid className={classes.gridRow} container justify="flex-start" alignItems="center" item xs={12} md={12} spacing={4}>
          <Grid item md={2} sm={2} xs={2} className={classes.textFieldLabel}>
            <FormLabel>{t(strings.lastName)}</FormLabel>
          </Grid>
          <Grid item md={8} sm={10} xs={10}>
            <TextField
              size="small"
              name="lastName"
              variant="outlined"
              required
              fullWidth
              id="lastName"
              label={t(strings.lastName)}
              value={lastName}
              onChange={(evt) => handleChangeLastName(evt)}
              className={classes.textField}
              error={lastNameErrMsg !== ""}
              helperText={lastNameErrMsg}
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
        {/* Home Phone */}
        <Grid className={classes.gridRow} container justify="flex-start" alignItems="center" item md={12} spacing={4}>
          <Grid item md={2} sm={2} xs={2} className={classes.textFieldLabel}>
            <FormLabel>{t(strings.homePhone)}</FormLabel>
          </Grid>
          <Grid item md={8} sm={10} xs={10}>
            <TextField
              size="small"
              name="homePhone"
              variant="outlined"
              required
              fullWidth
              id="homePhone"
              label={t(strings.homePhone)}
              value={homePhone}
              onChange={(evt) => handleChangeHomePhone(evt)}
              className={classes.textField}
              error={homePhoneErrMsg !== ""}
              helperText={homePhoneErrMsg}
            />
          </Grid>
        </Grid>
        {/* Mobile Phone */}
        <Grid className={classes.gridRow} container justify="flex-start" alignItems="center" item md={12} spacing={4}>
          <Grid item md={2} sm={2} xs={2} className={classes.textFieldLabel}>
            <FormLabel>{t(strings.mobilePhone)}</FormLabel>
          </Grid>
          <Grid item md={8} sm={10} xs={10}>
            <TextField
              size="small"
              name="phone"
              variant="outlined"
              required
              fullWidth
              id="phone"
              label={t(strings.mobilePhone)}
              value={mobilePhone}
              onChange={(evt) => handleChangeMobilePhone(evt)}
              className={classes.textField}
              error={mobilePhoneErrMsg !== ""}
              helperText={mobilePhoneErrMsg}
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