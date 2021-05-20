import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

// @material-ui/core Component
import Container from "@material-ui/core/Container";
import {
  Typography,
  Fab,
  FormControlLabel,
  Checkbox,
  Button,
  TextField,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import styles from "./jss";
import darkTheme from "../../../themes/darkTheme";
import { toast } from "react-toastify";
// use i18next
import { useTranslation, Trans } from "react-i18next";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  TableHead,
  TableFooter,
  Paper,
  InputAdornment,
  FormControl,
  OutlinedInput,
  Divider,
  Tooltip,
  Select,
  MenuItem,
  InputLabel
} from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import EditIcon from '@material-ui/icons/Edit';

// Component
import PopupChat from "../../common/Messenger/PopupChat";
import TreatmentMenu from "../../../layouts/TreatmentMenu";
import DialogReferral from '../DialogReferral';

// utils
import ConvertDateTimes from "../../../utils/datetimes/convertDateTimes";
import strings from "../../../configs/strings";
//api
import PatientReferralService from "../../../api/patientReferral/patientReferral.service";
import PatientService from "../../../api/patient/patient.service";
//validators
import validators, { isPropValid } from "../../../utils/validators";

const useStyles = makeStyles(styles);

const PatientInfoPage = ({ patientID }) => {
  const { t, i18n } = useTranslation();
  const classes = useStyles();

  const [editInfo, setEditInfo] = useState(false);

  const [userData, setUserData] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [firstNameError, setFirstNameError] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [lastNameError, setLastNameError] = useState(null);
  const [username, setUsername] = useState(null);
  const [usernameError, setUsernameError] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [email, setEmail] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [facebook, setFacebook] = useState(null);
  const [fax, setFax] = useState(null);
  const [mobile, setMobile] = useState(null);
  const [homePhone, setHomePhone] = useState(null);
  const [address, setAddress] = useState(null);
  const [gender, setGender] = useState(true);
  const [active, setActive] = useState(true);
  const [staffPhoto, setStaffPhoto] = useState(null);
  const [referredBy,setReferredBy]=useState(null);
  const [referredTo,setReferredTo]=useState(null);
  const [displayBy,setDisplayBy]=useState(null);
  const [displayTo,setDisplayTo]=useState(null);
  const [referralType,setReferralType]=useState(null);
  const [openDialog,setOpenDialog]=useState(false);
  const [isInsert,setIsInsert]=useState(false);
  const [isUpdate,setIsUpdate]=useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  //handle
  const handleChangeOpenReferredBy=(e)=>{
    if(editInfo)
    {
        setReferralType("FROM");
        setOpenDialog(true);
    }
  }
  const handleChangeOpenReferredTo=(e)=>{
    if(editInfo)
    {
        setReferralType("TO");
        setOpenDialog(true);
    }  
  }
  const handleChangeCloseDialog=(e)=>{
    setReferralType(null);
    setOpenDialog(false);
  }
  const handleChangeOpenDialog=(e)=>{
    setOpenDialog(true);
  }
  const handleChangeIsInsert=()=>{
    setIsInsert(!isInsert);
  }
  const handleChangeIsUpdate=()=>{
    setIsUpdate(!isUpdate);
  }
  const handleChangeActive = (e) => {
    setActive(!active);
  };
  const handleChangeAddress = (e) => {
    setAddress(e.target.value);
  };
  const handleChangeFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const handleChangeLastName = (e) => {
    setLastName(e.target.value);
  };
  
  const handleChangeFacebook = (e) => {
    setFacebook(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangeFax = (e) => {
    setFax(e.target.value);
  };
  const handleChangeMobile = (e) => {
    setMobile(e.target.value);
  };
  const handleChangeHomePhone = (e) => {
    setHomePhone(e.target.value);
  };
  const handleChangeGender = (e) => {
    setGender(!gender);
  };

  const handleUploadClick = (event) => {
    var file = event.target.files[0];
    const reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = (e) => {
      setSelectedFile([reader.result]);
    };

    setSelectedFile(event.target.files[0]);
  };
  const onClickEdit = async () => {
    setEditInfo(true);
  };
  const getReferredBy=(data)=>{
    let temp=[];
    data.map((a,index)=>{
        if(a.referral_type==="FROM")
        {
            temp=temp.concat(a);
        }
    })

    if(temp.length>0)
    {
        if(temp[temp.length-1].ref_patient!==null)
        {
            setDisplayBy(temp[temp.length-1].ref_patient.user.first_name + " " + temp[temp.length-1].ref_patient.user.last_name)
        }
        if(temp[temp.length-1].ref_staff!==null)
        {
            setDisplayBy(temp[temp.length-1].ref_staff.user.first_name + " " + temp[temp.length-1].ref_staff.user.last_name)
        }
        if(temp[temp.length-1].referral_source!==null)
        {
            setDisplayBy(temp[temp.length-1].referral_source.name)
        }
        setReferredBy(temp);
    }
    
  }
  const getReferredTo=(data)=>{
    let temp=[];
    data.map((a,index)=>{
        if(a.referral_type==="TO")
        {
            temp=temp.concat(a);
        }
    })
    if(temp.length>0)
    {
        if(temp[temp.length-1].ref_patient!==null)
        {
            setDisplayTo(temp[temp.length-1].ref_patient.user.first_name + " " + temp[temp.length-1].ref_patient.user.last_name)
        }
        if(temp[temp.length-1].ref_staff!==null)
        {
            setDisplayTo(temp[temp.length-1].ref_staff.user.first_name + " " + temp[temp.length-1].ref_staff.user.last_name)
        }
        if(temp[temp.length-1].referral_source!==null)
        {
            setDisplayTo(temp[temp.length-1].referral_source.name)
        }
        setReferredTo(temp);
    }
    
  }
  const searchPatientReferral=async()=>{
    const res=await PatientReferralService.searchByPatient(userData.id);
    getReferredBy(res.data);
    getReferredTo(res.data);

  }
  const onClickUpdate = async () => {
    if (firstNameError === null && lastNameError === null) {
      let genderData;
      if (gender === true) {
        genderData = "MALE";
      } else {
        genderData = "FEMALE";
      }
      const data = {
        //change
        gender: genderData,
        facebook: facebook,
        email: email,
        fax: fax,
        mobile_phone: mobile,
        home_phone: homePhone,
        //staff_photo: staffPhoto,
        address: address,
        is_active: active,

        //yeu cau
        first_name: firstName,
        last_name: lastName,
        // username: username,
        // password: password,
      };
      const update = await PatientService.update(patientID, data);
      if (update.success) {
        toast.success(t(strings.updateSuccess));
        setEditInfo(false);
      } else {
        toast.error(t(strings.updateFail));
      }
    }
  };
  useEffect(() => {
    const searchPatient = async () => {
      const result = await PatientService.search(patientID);
      if (result.success) {
        setUserData(result.data.payload);
        setFirstName(result.data.payload.user.first_name);
        setLastName(result.data.payload.user.last_name);
        setUsername(result.data.payload.user.username);
        setPassword(result.data.payload.user.password);
        setFacebook(result.data.payload.user.facebook);
        setEmail(result.data.payload.user.email);
        setFax(result.data.payload.user.fax);
        setActive(result.data.payload.is_active);
        setAddress(result.data.payload.user.address);
        setMobile(result.data.payload.user.mobile_phone);
        setHomePhone(result.data.payload.user.home_phone);
        if (result.data.payload.gender === "FEMALE") {
          setGender(false);
        } else {
          setGender(true);
        }
      }
    };
    if(referredBy===null && referredTo===null && userData!==null)
    {
        searchPatientReferral();
    }
    if (patientID && username === null) {
      searchPatient();
    }
    if (!isPropValid(validators.properties.username, username)) {
      setUsernameError(t(strings.usernameErrMsg));
    }
    if (
      usernameError !== null &&
      isPropValid(validators.properties.username, username)
    ) {
      setUsernameError(null);
    }
    if (!isPropValid(validators.properties.password, password)) {
      setPasswordError(t(strings.passwordErrMsg));
    }
    if (
      passwordError !== null &&
      isPropValid(validators.properties.password, password)
    ) {
      setPasswordError(null);
    }
    if (!isPropValid(validators.properties.firstName, firstName)) {
      setFirstNameError(t(strings.firstNameErrMsg));
    }
    if (
      firstNameError !== null &&
      isPropValid(validators.properties.firstName, firstName)
    ) {
      setFirstNameError(null);
    }
    if (!isPropValid(validators.properties.lastName, lastName)) {
      setLastNameError(t(strings.lastNameErrMsg));
    }
    if (
      lastNameError !== null &&
      isPropValid(validators.properties.lastName, lastName)
    ) {
      setLastNameError(null);
    }
    if (!isPropValid(validators.properties.email, email)) {
      setEmailError(t(strings.emailErrMsg));
    }
    if (
      emailError !== null &&
      isPropValid(validators.properties.email, email)
    ) {
      setEmailError(null);
    }
    if(isInsert===true)
    {
      setIsInsert(false);
      searchPatientReferral();
    }
    if(isUpdate===true)
    {
      setIsUpdate(false);
      searchPatientReferral();
    }
  });

  return (
    <React.Fragment>
      <TreatmentMenu patientID={patientID} />
      <Container className={classes.container}>
        <PopupChat></PopupChat>
        <Grid container></Grid>
        <div className={classes.containerContent}>
          <div className={classes.content}>
            <label className={classes.inputAvatar}>
              <input
                accept="image/*"
                className={classes.inputAvatarDisplay}
                // id="contained-button-file"
                multiple
                type="file"
                onChange={handleUploadClick}
              />
              {selectedFile !== null ? (
                <img
                  width="100%"
                  className={classes.avatar}
                  src={selectedFile}
                />
              ) : (
                <AccountCircleRoundedIcon className={classes.avatar} />
              )}
            </label>

            <Grid container className={classes.input}>
              <Grid item xs={6} className={classes.leftContent}>
                <FormControl className={classes.item}>
                  <InputLabel shrink>
                    {t(strings.firstName)}
                  </InputLabel>
                  <TextField
                    disabled={!editInfo}
                    className={classes.inputControl}
                    required
                    variant="outlined"
                    onChange={handleChangeFirstName}
                    value={firstName}
                    error={firstNameError !== null}
                    helperText={firstNameError}
                  />
                </FormControl>
                <FormControl className={classes.item}>
                  <InputLabel shrink>
                    {t(strings.lastName)}
                  </InputLabel>
                  <TextField
                    disabled={!editInfo}
                    className={classes.inputControl}
                    required
                    variant="outlined"
                    onChange={handleChangeLastName}
                    value={lastName}
                    error={lastNameError !== null}
                    helperText={lastNameError}
                  />
                </FormControl>
                <FormControl className={classes.item}>
                  <InputLabel shrink>
                    {t(strings.fax)}
                  </InputLabel>
                  <TextField
                    disabled={!editInfo}
                    className={classes.inputControl}
                    variant="outlined"
                    onChange={handleChangeFax}
                    value={fax}
                  />
                </FormControl>
                <FormControl className={classes.item}>
                  <InputLabel shrink>
                    {t(strings.email)}
                  </InputLabel>
                  <TextField
                    disabled={!editInfo}
                    className={classes.inputControl}
                    variant="outlined"
                    onChange={handleChangeEmail}
                    value={email}
                    error={emailError !== null}
                    helperText={emailError}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6} className={classes.rightContent}>
                <FormControl className={classes.item}>
                  <InputLabel shrink>
                    {t(strings.facebook)}
                  </InputLabel>
                  <TextField
                    disabled={!editInfo}
                    className={classes.inputControl}
                    variant="outlined"
                    onChange={handleChangeFacebook}
                    value={facebook}
                  />
                </FormControl>
                <FormControl className={classes.item}>
                  <InputLabel shrink>
                    {t(strings.mobilePhone)}
                  </InputLabel>
                  <TextField
                    disabled={!editInfo}
                    className={classes.inputControl}
                    variant="outlined"
                    onChange={handleChangeMobile}
                    value={mobile}
                    type="number"
                  />
                </FormControl>
                <FormControl className={classes.item}>
                  <InputLabel shrink>
                    {t(strings.homePhone)}
                  </InputLabel>
                  <TextField
                    disabled={!editInfo}
                    className={classes.inputControl}
                    variant="outlined"
                    onChange={handleChangeHomePhone}
                    value={homePhone}
                    type="number"
                  />
                </FormControl>

                <FormControl className={classes.itemSmall}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        disabled={!editInfo}
                        checked={gender}
                        onChange={handleChangeGender}
                        name={t(strings.male)}
                        color="primary"
                        className={classes.checkbox}
                      />
                    }
                    label={t(strings.male)}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        disabled={!editInfo}
                        checked={!gender}
                        onChange={handleChangeGender}
                        name={t(strings.female)}
                        color="primary"
                        className={classes.checkbox}
                      />
                    }
                    label={t(strings.female)}
                  />
                </FormControl>

                <FormControl className={classes.itemSmall}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        disabled={!editInfo}
                        checked={active}
                        onChange={handleChangeActive}
                        name={t(strings.active)}
                        color="primary"
                        className={classes.checkbox}
                      />
                    }
                    label={t(strings.active)}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        disabled={!editInfo}
                        checked={!active}
                        onChange={handleChangeActive}
                        name={t(strings.inactive)}
                        color="primary"
                        className={classes.checkbox}
                      />
                    }
                    label={t(strings.inactive)}
                  />
                </FormControl>
                <FormControl variant="filled" className={classes.itemOutline}>
                                    <InputLabel shrink>
                                        {t(strings.referredBy)}
                                    </InputLabel>
                                    <OutlinedInput
                                        className={classes.inputControlOutline}
                                        type={'text'}
                                        value={displayBy}
                                        readOnly={true}
                                        endAdornment={
                                        <InputAdornment position="start" >
                                            <EditIcon className={classes.iconButton} onClick={handleChangeOpenReferredBy}/>

                                        </InputAdornment>
                                        }
                                        
                                        
                                    />
                                  
                                   
                            </FormControl>   
                        
                        <FormControl variant="filled" className={classes.itemOutline}>
                                    <InputLabel shrink>
                                        {t(strings.referredTo)}
                                    </InputLabel>
                                    <OutlinedInput
                                        className={classes.inputControlOutline}
                                        type={'text'}
                                        value={displayTo}
                                        readOnly={true}
                                        endAdornment={
                                        <InputAdornment position="start" >
                                            <EditIcon className={classes.iconButton} onClick={handleChangeOpenReferredTo}/>

                                        </InputAdornment>
                                        }
                                        
                                        
                                    />
                                    
                            </FormControl>   
                       
                    
              </Grid>
            </Grid>
            {referralType!==null ? 
                <DialogReferral 
                    isOpen={openDialog}
                    close={handleChangeCloseDialog}
                    open={handleChangeOpenDialog}
                    type={referralType}
                    patientID={patientID}
                    referredBy={referredBy}
                    referredTo={referredTo}
                    handleChangeIsInsert={handleChangeIsInsert}
                    handleChangeIsUpdate={handleChangeIsUpdate}
                    editable={editInfo}
                    
                />
                :
                <FormControl></FormControl>
            }
            <div>
              {editInfo ? (
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.updateButton}
                  onClick={onClickUpdate}
                >
                  {t(strings.update)}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  className={classes.editButton}
                  onClick={onClickEdit}
                >
                  {t(strings.edit)}
                </Button>
              )}
            </div>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default PatientInfoPage;
