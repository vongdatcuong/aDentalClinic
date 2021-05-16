import React,{useState,useEffect} from 'react';
import { makeStyles  } from "@material-ui/core/styles";
//api
import PatientService from "../../../api/patient/patient.service";
//validators
import validators, {isPropValid} from '../../../utils/validators';

//translation
import { useTranslation } from 'react-i18next';

// @material-ui/core Component
// import Container from '@material-ui/core/Container';
import { 
    FormControl,
    InputLabel,
    FormControlLabel,
    Checkbox,
    Button,
    TextField,
    
    Select,
    MenuItem,
 } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import styles from "./jss";
// import darkTheme from "../../../themes/darkTheme";
import { toast } from 'react-toastify';

//import configs
import strings from "../../../configs/strings";
//import image

//import icons


//import component
const useStyles = makeStyles(styles);




const InsertPatient = (props) => {
    const {t, i18n } = useTranslation();
    const classes = useStyles();
    
    //state
    const [firstName,setFirstName]=useState(null);
    const [lastName,setLastName]=useState(null);
    const [username,setUsername]=useState(null);
    const [password,setPassword]=useState(null);
    const [email,setEmail]=useState(null);
    const [facebook,setFacebook]=useState(null);
    const [fax,setFax]=useState(null);
    const [mobile,setMobile]=useState(null);
    const [homePhone,setHomePhone]=useState(null);
    const [address,setAddress]=useState(null);
    const [gender,setGender]=useState(t(strings.notSpecify));
    const [listGender,setListGender]=useState([
        t(strings.notSpecify),
        t(strings.male),
        t(strings.female),
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
    const [staffPhoto,setStaffPhoto]=useState(null);
    const [otherInfo,setOtherInfo]=useState(null);
    const [firstNameError,setFirstNameError]=useState(null);
    const [lastNameError,setLastNameError]=useState(null);
    const [usernameError,setUsernameError]=useState(null);
    const [passwordError,setPasswordError]=useState(null);
    const [emailError,setEmailError]=useState(null);
    const [referredBy,setReferredBy]=useState(null);
    const [referredTo,setReferredTo]=useState(null);
    const [referralType,setReferralType]=useState(null);
    const [openDialog,setOpenDialog]=useState(false);
    const [selectedFile,setSelectedFile]=useState(null);

    //handle
    
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
        setGender(e.target.value);
    }
    const handleChangeMaritalStatus=(e)=>{
        setMaritalStatus(e.target.value);
    }
    const handleChangeOtherInfo=(e)=>{
        setOtherInfo(e.target.value);
    }
    
    const handleChangeReferredTo=(e)=>{
        setReferredTo(e.target.value);
    }
    const handleChangeReferredBy=(e)=>{
        setReferredBy(e.target.value);
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
    const insertPerson=async(e)=>{
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
            display_id: "",
		    is_active:active, 
            
            drug_lic: "",
            npi: "",
            specialty: null, 
            access_group: null, 
		
            notify_staff_msg: true, 
            notify_patient_msg: true, 
            notify_meeting: true,
            user_type: props.userType,
            theme:"",
            language:"EN",
            
            gender:genderData,
            facebook: facebook,
            email: email,
            fax: fax,
            mobile_phone: mobile,
            home_phone: homePhone,
            staff_photo: staffPhoto,
            address: address,
            other_info:otherInfo,
		    //yeu cau
            first_name: firstName,
            last_name: lastName,
            username: username,
            password: password,

        };
        const result=await PatientService.insert(data);
        if(result.success)
        {
            toast.success(t(strings.insertSuccess));
            props.handleChangeIsInsert();
        }
        else
        {
            toast.error(t(strings.insertFail));
        }

    }
    useEffect(()=>{
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
    })
    return (
        <div className={classes.container}>
            
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
                            <InputLabel shrink id="username">
                                {t(strings.username)}
                            </InputLabel>
                            <TextField className={classes.inputControl} 
                                        required 
                                        // placeholder={t(strings.username)}  
                                        variant="outlined" 
                                        onChange={handleChangeUsername}
                                        value={username}
                                        error={usernameError !== null}
                                        helperText={usernameError}
                                        /> 
                        </FormControl>
                        <FormControl className={classes.item}>
                            <InputLabel id="password">
                                {t(strings.password)}
                            </InputLabel>
                            <TextField className={classes.inputControl} 
                                        required 
                                        type="password"
                                        variant="outlined" 
                                        onChange={handleChangePassword}
                                        value={password}
                                        error={passwordError !== null}
                                        helperText={passwordError}
                                        /> 
                        </FormControl>
                        <FormControl className={classes.item}>
                            <InputLabel id="firstName">
                                {t(strings.firstName)}
                            </InputLabel>
                            <TextField className={classes.inputControl} 
                                        required 
                                        variant="outlined" 
                                        onChange={handleChangeFirstName}
                                        value={firstName}
                                        error={firstNameError !== null}
                                        helperText={firstNameError}
                                        /> 
                        </FormControl>
                        <FormControl className={classes.item}>
                            <TextField className={classes.inputControl} 
                                        required 
                                        placeholder={t(strings.lastName)}  
                                        variant="outlined" 
                                        onChange={handleChangeLastName}
                                        value={lastName}
                                        error={lastNameError !== null}
                                        helperText={lastNameError}
                                        /> 
                        </FormControl>
                        <FormControl className={classes.item}>
                            <TextField className={classes.inputControl} 
                                        placeholder={t(strings.email)}  
                                        variant="outlined" 
                                        onChange={handleChangeEmail}
                                        value={email}
                                        error={emailError !== null}
                                        helperText={emailError}
                                        /> 
                        </FormControl>
                        <FormControl className={classes.item}>
                            <InputLabel id="gender">
                                {t(strings.gender)}
                            </InputLabel>
                            <Select
                                labelId="gender"
                                value={gender}
                                onChange={handleChangeGender}
                                disableUnderline 
                                className={classes.status}
                                >
                            
                                {renderListGender()}
                            </Select>
                        </FormControl>
                        <div className={classes.item}>
                            <Select
                            
                                value={maritalStatus}
                                onChange={handleChangeMaritalStatus}
                                disableUnderline 
                                className={classes.status}
                                >
                            
                                <MenuItem value={null}>{t(strings.maritalStatus)}</MenuItem>
                                {renderListMaritalStatus()}
                            </Select>
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

                                />
                                }
                                label={t(strings.female)}
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

                                />
                                }
                                label={t(strings.inactive)}
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
                                        /> 
                        </div>
                        <div className={classes.item}>
                            <TextField className={classes.inputControl} 
                                        placeholder={t(strings.mobilePhone)}  
                                        variant="outlined" 
                                        onChange={handleChangeMobile}
                                        value={mobile}
                                        type="number"

                                        /> 
                        </div>
                        <div className={classes.item}>
                            <TextField className={classes.inputControl} 
                                        placeholder={t(strings.homePhone)}  
                                        variant="outlined" 
                                        onChange={handleChangeHomePhone}
                                        value={homePhone}
                                        /> 
                        </div>
                        <div className={classes.item}>
                            <TextField className={classes.inputControl}  
                                        placeholder={t(strings.fax)}  
                                        variant="outlined" 
                                        onChange={handleChangeFax}
                                        value={fax}
                                        /> 
                        </div>
                        <div className={classes.item}>
                            <TextField className={classes.inputControl}  
                                        placeholder={t(strings.address)}  
                                        variant="outlined" 
                                        onChange={handleChangeAddress}
                                        value={address}
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
                        
                    </Grid>
                </Grid>
                
                
                <div>
                    <Button variant="contained" color="primary" className={classes.insertButton} onClick={insertPerson}>
                        {t(strings.insert)}
                    </Button>
                </div>
        </div>
    </div>
    )
}

export default InsertPatient;