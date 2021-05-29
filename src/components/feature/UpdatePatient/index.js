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
    InputLabel,
    Checkbox,
    Button,
    TextField,
    InputAdornment,
    FormControl,
    OutlinedInput,
    Select,
    MenuItem,
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
    const [gender,setGender]=useState(t(strings.notSpecify));
    const [listGender,setListGender]=useState([
        t(strings.notSpecify),
        t(strings.MALE),
        t(strings.FEMALE),
    ]);
    const [maritalStatus,setMaritalStatus]=useState(t(strings.notSpecify));
    const [listMaritalStatus,setListMaritalStatus]=useState([
        t(strings.notSpecify),
        t(strings.married),
        t(strings.divorced),
        t(strings.single),
        t(strings.widowed),
    ]);
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
    const [patientNote,setPatientNote]=useState(null);
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
        if(props.editable)
        {
            setActive(!active);
        }
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
        setGender(e.target.value);
    }
    const handleChangeMaritalStatus=(e)=>{
        setMaritalStatus(e.target.value);
    }
    const handleChangeOtherInfo=(e)=>{
        setOtherInfo(e.target.value);
    }
    const handleChangePatientNote=(e)=>{
        setPatientNote(e.target.value);
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
    const renderListGender=()=>{
        return listGender.map((gend,index)=>{
            return <MenuItem key={index} value={gend}>{gend}</MenuItem>
        })
    }
    const renderListMaritalStatus=()=>{
        return listMaritalStatus.map((mar,index)=>{
            return <MenuItem key={index} value={mar}>{mar}</MenuItem>
        })
    }
    const onClickUpdate=async()=>{
        if(firstNameError===null && lastNameError === null && emailError===null)
        {
            let genderData;
            let maritalData;

            if(maritalStatus===t(strings.notSpecify))
            {
                maritalData="NOT_SPECIFY";
            }
            if(maritalStatus===t(strings.married))
            {
                maritalData="MARRIED";
            }
            if(maritalStatus===t(strings.divorced))
            {
                maritalData="DIVORCED";
            }
            if(maritalStatus===t(strings.single))
            {
                maritalData="SINGLE";
            }
            if(maritalStatus===t(strings.widowed))
            {
                maritalData="WIDOWED";
            }
            if(gender===t(strings.notSpecify))
            {
                genderData="NOT_SPECIFY";
            }
            if(gender===t(strings.MALE))
            {
                genderData="MALE";
            }
            if(gender===t(strings.FEMALE))
            {
                genderData="FEMALE";
            }
            const data={
                //change
                gender:genderData,
                marital_status:maritalData,
                facebook: facebook,
                email: email,
                fax: fax,
                mobile_phone: mobile,
                home_phone: homePhone,
                address: address,
                is_active:active, 
                other_info:otherInfo,
                patient_note:patientNote,
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
            let marital=result.data.payload.marital_status;
            let genderData=result.data.payload.gender;
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
            setPatientNote(result.data.payload.user.patient_note);
            if(marital==="NOT_SPECIFY")
            {
                setMaritalStatus(t(strings.notSpecify));
            }
            if(marital==="MARRIED")
            {
                setMaritalStatus(t(strings.married));
            }
            if(marital==="DIVORCED")
            {
                setMaritalStatus(t(strings.divorced));
            }
            if(marital==="SINGLE")
            {
                setMaritalStatus(t(strings.single));
            }
            if(marital==="WIDOWED")
            {
                setMaritalStatus(t(strings.widowed));
            }
            if(genderData==="NOT_SPECIFY")
            {
                setGender(t(strings.notSpecify));
            }
            if(genderData==="MALE")
            {
                setGender(t(strings.MALE));
            }
            if(genderData==="FEMALE")
            {
                setGender(t(strings.FEMALE));
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

                    <FormControl className={classes.item}>
                        <InputLabel shrink>
                            {t(strings.firstName)}
                        </InputLabel>
                        <TextField className={classes.inputControl} 
                                        required 
                                        variant="outlined" 
                                        onChange={handleChangeFirstName}
                                        value={firstName}
                                        error={firstNameError !== null}
                                        helperText={firstNameError}
                                        inputProps={{ readOnly: !props.editable }}
                                        InputLabelProps={{ shrink: true }}
                                        /> 
                    </FormControl>
                    <FormControl className={classes.item}>
                        <InputLabel shrink>
                            {t(strings.lastName)}
                        </InputLabel>
                        <TextField className={classes.inputControl} 
                                        required 
                                        variant="outlined" 
                                        onChange={handleChangeLastName}
                                        value={lastName}
                                        error={lastNameError !== null}
                                        helperText={lastNameError}
                                        inputProps={{ readOnly: !props.editable }}
                                        InputLabelProps={{ shrink: true }}
                                        /> 
                    </FormControl>
                    <FormControl className={classes.item}>
                            <InputLabel shrink>
                                {t(strings.fax)}
                            </InputLabel>
                            <TextField className={classes.inputControl}  
                                        variant="outlined" 
                                        onChange={handleChangeFax}
                                        value={fax}
                                        inputProps={{ readOnly: !props.editable }}
                                        InputLabelProps={{ shrink: true }}
                                        /> 
                    </FormControl>
                    <FormControl className={classes.item}>
                        <InputLabel shrink>
                            {t(strings.email)}
                        </InputLabel>
                        <TextField className={classes.inputControl} 
                                        variant="outlined" 
                                        onChange={handleChangeEmail}
                                        value={email}
                                        error={emailError !== null}
                                        helperText={emailError}
                                        inputProps={{ readOnly: !props.editable }}
                                        InputLabelProps={{ shrink: true }}
                                        /> 
                    </FormControl>

                    <FormControl className={classes.itemSmall}>
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
                        </FormControl>
                        <FormControl className={classes.itemSelect}>
                            <InputLabel id="gender">
                                {t(strings.gender)}
                            </InputLabel>
                            <Select
                                value={gender}
                                onChange={handleChangeGender}
                                disableUnderline 
                                className={classes.status}
                                disabled={!props.editable}
                                >
                            
                                {renderListGender()}
                            </Select>
                        </FormControl>
                        <FormControl className={classes.itemSelect}>
                            <InputLabel id="maritalStatus">
                                {t(strings.maritalStatus)}
                            </InputLabel>
                            <Select
                                value={maritalStatus}
                                onChange={handleChangeMaritalStatus}
                                disableUnderline 
                                className={classes.status}
                                disabled={!props.editable}
                                >
                            
                                {renderListMaritalStatus()}
                            </Select>
                        </FormControl>
                        
                    
                    </Grid>
                    <Grid item xs={6} className={classes.rightContent}>
                        <FormControl className={classes.item}>
                            <InputLabel shrink>
                                {t(strings.facebook)}
                            </InputLabel>
                            <TextField className={classes.inputControl} 
                                        variant="outlined" 
                                        onChange={handleChangeFacebook}
                                        value={facebook}
                                        inputProps={{ readOnly: !props.editable }}
                                        InputLabelProps={{ shrink: true }}
                                        /> 
                        </FormControl>
                        <FormControl className={classes.item}>
                            <InputLabel shrink>
                                {t(strings.mobilePhone)}
                            </InputLabel>
                            <TextField className={classes.inputControl} 
                                        variant="outlined" 
                                        onChange={handleChangeMobile}
                                        value={mobile}
                                        type="number"
                                        inputProps={{ readOnly: !props.editable }}
                                        InputLabelProps={{ shrink: true }}
                                        /> 
                        </FormControl>
                        <FormControl className={classes.item}>
                            <InputLabel shrink>
                                {t(strings.homePhone)}
                            </InputLabel>
                            <TextField className={classes.inputControl} 
                                        variant="outlined" 
                                        onChange={handleChangeHomePhone}
                                        value={homePhone}
                                        type="number"
                                        inputProps={{ readOnly: !props.editable }}
                                        InputLabelProps={{ shrink: true }}
                                        /> 
                        </FormControl>
                        <FormControl className={classes.item}>
                            <InputLabel shrink>
                                {t(strings.note)}
                            </InputLabel>
                            <TextField className={classes.inputControlBig} 
                                        variant="outlined" 
                                        onChange={handleChangePatientNote}
                                        value={patientNote}
                                        multiline
                                        rows={4}
                                        InputLabelProps={{ shrink: true }}
                                        inputProps={{ readOnly: !props.editable }}
                                        /> 
                        </FormControl>
                        <FormControl className={classes.item}>
                            <InputLabel shrink>
                                {t(strings.additionalInfo)}
                            </InputLabel>
                            <TextField className={classes.inputControlBig} 
                                        variant="outlined" 
                                        onChange={handleChangeOtherInfo}
                                        value={otherInfo}
                                        multiline
                                        rows={4}
                                        InputLabelProps={{ shrink: true }}
                                        inputProps={{ readOnly: !props.editable }}
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