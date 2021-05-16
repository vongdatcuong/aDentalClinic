import React,{useState,useEffect} from 'react';
import { makeStyles  } from "@material-ui/core/styles";
//api
import PatientService from "../../../api/patient/patient.service";
import PatientReferralService from "../../../api/patientReferral/patientReferral.service";

//validators
import validators, {isPropValid} from '../../../utils/validators';

//translation
import { useTranslation } from 'react-i18next';

// @material-ui/core Component
// import Container from '@material-ui/core/Container';
import { 
    FormControlLabel,
    Checkbox,
    Button,
    TextField,
    
    InputAdornment,
  
    FormControl,
    OutlinedInput,
 } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import EditIcon from '@material-ui/icons/Edit';

import styles from "./jss";
// import darkTheme from "../../../themes/darkTheme";
import { toast } from 'react-toastify';

//import configs
import strings from "../../../configs/strings";
//import image

//import icons


//import component
import DialogReferral from '../DialogReferral';

const useStyles = makeStyles(styles);




const UpdatePatient = (props) => {
    const {t, i18n } = useTranslation();
    const classes = useStyles();
    
    //state
   

    const [userData,setUserData]=useState(null);
    const [firstName,setFirstName]=useState(null);
    const [firstNameError,setFirstNameError]=useState(null);
    const [lastName,setLastName]=useState(null);
    const [lastNameError,setLastNameError]=useState(null);
    const [username,setUsername]=useState(null);
    const [usernameError,setUsernameError]=useState(null);
    const [password,setPassword]=useState(null);
    const [passwordError,setPasswordError]=useState(null);
    const [email,setEmail]=useState(null);
    const [emailError,setEmailError]=useState(null);
    const [facebook,setFacebook]=useState(null);
    const [fax,setFax]=useState(null);
    const [mobile,setMobile]=useState(null);
    const [homePhone,setHomePhone]=useState(null);
    const [address,setAddress]=useState(null);
    const [gender,setGender]=useState(true);
    const [active,setActive]=useState(true);
    // const [staffPhoto,setStaffPhoto]=useState(null);
    const [otherInfo,setOtherInfo]=useState(null);
    const [referredBy,setReferredBy]=useState(null);
    const [referredTo,setReferredTo]=useState(null);
    const [displayBy,setDisplayBy]=useState(null);
    const [displayTo,setDisplayTo]=useState(null);
    const [referralType,setReferralType]=useState(null);
    const [openDialog,setOpenDialog]=useState(false);
    const [isInsert,setIsInsert]=useState(false);
    const [isUpdate,setIsUpdate]=useState(false);
    const [selectedFile,setSelectedFile]=useState(null);
    //handle change
    
    const handleChangeCloseDialog=(e)=>{
        setReferralType(null);
        setOpenDialog(false);
    }
    const handleChangeOpenDialog=(e)=>{
        setOpenDialog(true);
    }
    const handleChangeActive=(e)=>{
        setActive(!active);
    }
    const handleChangeAddress=(e)=>{
        setAddress(e.target.value);
    }
    const handleChangeFirstName=(e)=>{
        setFirstName(e.target.value);
    };
    const handleChangeLastName=(e)=>{
        setLastName(e.target.value);
    }
    const handleChangeUsername=(e)=>{
        setUsername(e.target.value);
    }
    const handleChangePassword=(e)=>{
        setPassword(e.target.value);
    }
    const handleChangeFacebook=(e)=>{
        setFacebook(e.target.value);
    }
    const handleChangeEmail=(e)=>{
        setEmail(e.target.value);
    }
    const handleChangeFax=(e)=>{
        setFax(e.target.value);
    }
    const handleChangeMobile=(e)=>{
        setMobile(e.target.value);
    }
    const handleChangeHomePhone=(e)=>{
        setHomePhone(e.target.value);
    }
    const handleChangeGender=(e)=>{
        setGender(!gender);
    }
    const handleChangeOtherInfo=(e)=>{
        setOtherInfo(e.target.value);
    }
    
    const handleChangeOpenReferredBy=(e)=>{
        if(props.editable)
        {
            setReferralType("FROM");
            setOpenDialog(true);
        }
        
    }
    const handleChangeOpenReferredTo=(e)=>{
        if(props.editable)
        {
            setReferralType("TO");
            setOpenDialog(true);
        }
        
    }
    const handleChangeIsInsert=()=>{
        setIsInsert(!isInsert);
    }
    const handleChangeIsUpdate=()=>{
        setIsUpdate(!isUpdate);
    }
    
    const handleUploadClick = event => {
        var file = event.target.files[0];
        const reader = new FileReader();
        var url = reader.readAsDataURL(file);
    
        reader.onloadend=(e)=>{
            setSelectedFile([reader.result]);

        }
        
    
        setSelectedFile(event.target.files[0]);

    };

    const onClickUpdate=async()=>{
        if(firstNameError===null && lastNameError===null )
        {
            let genderData;
            if(gender===true)
            {
                genderData="MALE";
            }
            else
            {
                genderData="FEMALE";
            }
            const data={
                //change
                gender:genderData,
                facebook: facebook,
                email: email,
                fax: fax,
                mobile_phone: mobile,
                home_phone: homePhone,
                address: address,
                is_active:active, 
                other_info:otherInfo,
                //yeu cau
                first_name: firstName,
                last_name: lastName,
                

            };
            const update=await PatientService.update(props.id,data);
            if(update.success)
            {
                toast.success(t(strings.updateSuccess));
                props.handleChangeIsUpdate();
            }
            else
            {
                toast.error(t(strings.updateFail));

            }
        }
        
        
    }
    const searchPatient=async()=>{
        const result=await PatientService.search(props.id);
        if(result.success)
        {
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
            setOtherInfo(result.data.payload.user.other_info);
            if(result.data.payload.gender==="FEMALE")
            {
                setGender(false);
            }
            else
            {
                setGender(true);
            }
        }
    }
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
    
    useEffect(()=>{
        if(referredBy===null && referredTo===null && userData!==null)
        {
            searchPatientReferral();
        }
        if(props.id && username===null)
        {
            searchPatient();

        }
        if(!isPropValid(validators.properties.username, username))
        {
            setUsernameError(t(strings.usernameErrMsg))
        }
        if(usernameError!==null && isPropValid(validators.properties.username, username))
        {
            setUsernameError(null)
        }
        if(!isPropValid(validators.properties.password, password))
        {
            setPasswordError(t(strings.passwordErrMsg))
        }
        if(passwordError!==null && isPropValid(validators.properties.password, password))
        {
            setPasswordError(null)
        }
        if(!isPropValid(validators.properties.firstName, firstName))
        {
            setFirstNameError(t(strings.firstNameErrMsg))
        }
        if(firstNameError!==null && isPropValid(validators.properties.firstName, firstName))
        {
            setFirstNameError(null)
        }
        if(!isPropValid(validators.properties.lastName, lastName))
        {
            setLastNameError(t(strings.lastNameErrMsg))
        }
        if(lastNameError!==null && isPropValid(validators.properties.lastName, lastName))
        {
            setLastNameError(null)
        }
        if(!isPropValid(validators.properties.email, email))
        {
            setEmailError(t(strings.emailErrMsg))
        }
        if(emailError!==null && isPropValid(validators.properties.email, email))
        {
            setEmailError(null)
        }
        if(isInsert===true)
        {
            searchPatientReferral();
            setIsInsert(false);
        }
        if(isUpdate===true)
        {
            searchPatientReferral();
            setIsUpdate(false);
        }
    })
    
    return (
        <div className={classes.container}>
            <div className={classes.content}>
                    <label className={classes.inputAvatar}>
                    <input
                        accept="image/*"
                        className={classes.inputAvatarDisplay}
                        multiple
                        type="file"
                        onChange={handleUploadClick}
                    />
                    {selectedFile!==null ? 
                        <img
                        width="100%"
                        className={classes.avatar}
                        src={selectedFile}
                        />
                        :
                        <AccountCircleRoundedIcon className={classes.avatar}/>
                    }
                
                    
                    </label>
                

                <Grid container className={classes.input}>
                    <Grid item xs={6} className={classes.leftContent}>
                        
                    
                   
                    <div className={classes.item}>
                        <TextField className={classes.inputControl} 
                                        required 
                                        placeholder={t(strings.firstName)}  
                                        variant="outlined" 
                                        onChange={handleChangeFirstName}
                                        value={firstName}
                                        error={firstNameError !== null}
                                        helperText={firstNameError}
                                        inputProps={{ readOnly: !props.editable }}

                                        /> 
                    </div>
                    <div className={classes.item}>
                        <TextField className={classes.inputControl} 
                                        required 
                                        placeholder={t(strings.lastName)}  
                                        variant="outlined" 
                                        onChange={handleChangeLastName}
                                        value={lastName}
                                        error={lastNameError !== null}
                                        helperText={lastNameError}
                                        inputProps={{ readOnly: !props.editable }}

                                        /> 
                    </div>
                    <div className={classes.item}>
                            <TextField className={classes.inputControl}  
                                        placeholder={t(strings.fax)}  
                                        variant="outlined" 
                                        onChange={handleChangeFax}
                                        value={fax}
                                        inputProps={{ readOnly: !props.editable }}
                                        /> 
                    </div>
                    <div className={classes.item}>
                        <TextField className={classes.inputControl} 
                                        placeholder={t(strings.email)}  
                                        variant="outlined" 
                                        onChange={handleChangeEmail}
                                        value={email}
                                        error={emailError !== null}
                                        helperText={emailError}
                                        inputProps={{ readOnly: !props.editable }}


                                        /> 
                    </div>
                    <div className={classes.itemSmall}>
                            <FormControlLabel
                                control={
                                <Checkbox
                                    checked={active}
                                    onChange={handleChangeActive}
                                    name={t(strings.active)}
                                    color="primary"
                                    className={classes.checkbox}
                                    inputProps={{ readOnly: !props.editable }}

                                />
                                }
                                label={t(strings.active)}
                            />
                            <FormControlLabel
                                control={
                                <Checkbox
                                    checked={!active}
                                    onChange={handleChangeActive}
                                    name={t(strings.inactive)}
                                    color="primary"
                                    className={classes.checkbox}
                                    inputProps={{ readOnly: !props.editable }}

                                />
                                }
                                label={t(strings.inactive)}
                            />
                        </div>
                        
                        <div className={classes.itemSmall}>
                            <FormControlLabel
                                control={
                                <Checkbox
                                    checked={gender}
                                    onChange={handleChangeGender}
                                    name={t(strings.male)}
                                    color="primary"
                                    className={classes.checkbox}
                                    inputProps={{ readOnly: !props.editable }}

                                />
                                }
                                label={t(strings.male)}
                            />
                            <FormControlLabel
                                control={
                                <Checkbox
                                    checked={!gender}
                                    onChange={handleChangeGender}
                                    name={t(strings.female)}
                                    color="primary"
                                    className={classes.checkbox}
                                    inputProps={{ readOnly: !props.editable }}

                                />
                                }
                                label={t(strings.female)}
                            />
                        </div>
                    
                    </Grid>
                    <Grid item xs={6} className={classes.rightContent}>
                        <div className={classes.item}>
                            <TextField className={classes.inputControl} 
                                        placeholder={t(strings.facebook)}  
                                        variant="outlined" 
                                        onChange={handleChangeFacebook}
                                        value={facebook}
                                        inputProps={{ readOnly: !props.editable }}

                                        /> 
                        </div>
                        <div className={classes.item}>
                            <TextField className={classes.inputControl} 
                                        placeholder={t(strings.mobilePhone)}  
                                        variant="outlined" 
                                        onChange={handleChangeMobile}
                                        value={mobile}
                                        type="number"
                                        inputProps={{ readOnly: !props.editable }}

                                        /> 
                        </div>
                        <div className={classes.item}>
                            <TextField className={classes.inputControl} 
                                        placeholder={t(strings.homePhone)}  
                                        variant="outlined" 
                                        onChange={handleChangeHomePhone}
                                        value={homePhone}
                                        type="number"
                                        inputProps={{ readOnly: !props.editable }}

                                        /> 
                        </div>
                        <div className={classes.item}>
                            <TextField className={classes.inputControlBig} 
                                         
                                        placeholder={t(strings.additionalInfo)}  
                                        variant="outlined" 
                                        onChange={handleChangeOtherInfo}
                                        value={otherInfo}
                                        multiline
                                        /> 
                        </div>
                        <div className={classes.item}>
                            <FormControl variant="filled">
                                    <OutlinedInput
                                        className={classes.inputControl}
                                        type={'text'}
                                        value={displayBy}
                                        placeholder={t(strings.referredBy)}
                                        readOnly={true}
                                        endAdornment={
                                        <InputAdornment position="start" >
                                            <EditIcon className={classes.iconButton} onClick={handleChangeOpenReferredBy}/>

                                        </InputAdornment>
                                        }
                                        
                                        
                                    />
                                  
                                   
                            </FormControl>   
                        
                        </div>
                        <div >
                            <FormControl variant="filled">
                                    <OutlinedInput
                                        className={classes.inputControl}
                                        type={'text'}
                                        value={displayTo}
                                        placeholder={t(strings.referredTo)}
                                        readOnly={true}
                                        endAdornment={
                                        <InputAdornment position="start" >
                                            <EditIcon className={classes.iconButton} onClick={handleChangeOpenReferredTo}/>

                                        </InputAdornment>
                                        }
                                        
                                        
                                    />
                                    
                            </FormControl>   
                        
                       
                        </div>
                    
                    </Grid>
                </Grid>
                    {props.editable ?
                    <div>
                        <Button variant="contained" color="primary" className={classes.updateButton} onClick={onClickUpdate}>
                            {t(strings.update)}
                        </Button>
                    </div>
                    :
                    <div></div>                   
                    }
                {referralType!==null ? 
                <DialogReferral 
                    isOpen={openDialog}
                    close={handleChangeCloseDialog}
                    open={handleChangeOpenDialog}
                    type={referralType}
                    patientID={props.id}
                    referredBy={referredBy}
                    referredTo={referredTo}
                    handleChangeIsInsert={handleChangeIsInsert}
                    handleChangeIsUpdate={handleChangeIsUpdate}
                    editable={props.editable}
                    
                />
                :
                <div></div>
                }

                
        </div>  
    </div>
    )
}

export default UpdatePatient;