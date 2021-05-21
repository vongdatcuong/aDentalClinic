import React,{useState,useEffect} from 'react';
import { makeStyles  } from "@material-ui/core/styles";
//api
import ProviderService from "../../../api/provider/provider.service";
//validators
import validators, {isPropValid} from '../../../utils/validators';

//translation
import { useTranslation } from 'react-i18next';

// @material-ui/core Component
import { 
    FormControlLabel,
    Checkbox,
    Button,
    TextField,
    FormControl,
    InputLabel,
 } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';

import Grid from '@material-ui/core/Grid';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import ColorPicker from 'material-ui-color-picker'

import styles from "./jss";
// import darkTheme from "../../../themes/darkTheme";
import { toast } from 'react-toastify';

//import configs
import strings from "../../../configs/strings";
//import image

//import icons


//import component

const useStyles = makeStyles(styles);




const InsertPerson = (props) => {
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
    const [gender,setGender]=useState(true);
    const [active,setActive]=useState(true);
    const [staffPhoto,setStaffPhoto]=useState(null);
    const [firstNameError,setFirstNameError]=useState(null);
    const [lastNameError,setLastNameError]=useState(null);
    const [usernameError,setUsernameError]=useState(null);
    const [passwordError,setPasswordError]=useState(null);
    const [emailError,setEmailError]=useState(null);
    const [displayId,setDisplayId]=useState(null);
    const [providerColor,setProviderColor]=useState("#000");
    const [drugLic,setDrugLic]=useState(null);
    const [startDate,setStartDate]=useState(new Date());
    const [npi,setNpi]=useState(null);
    const [biography,setBiography]=useState(null);

    const [selectedFile,setSelectedFile]=useState(null);

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
    const handleChangeDisplayId=(e)=>{
        setDisplayId(e.target.value);
    }
    const handleChangeProviderColor=(e)=>{
        setProviderColor(e.target.value);
    }
    const handleChangeDrugLic=(e)=>{
        setDrugLic(e.target.value);
    }
    const handleChangeStartDate=(e,date)=>{
        setStartDate(date);
    }
    const handleChangeNpi=(e)=>{
        setNpi(e.target.value);
    }
    const handleChangeBiography=(e)=>{
        setBiography(e.target.value);
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

    
    const insertPerson=async(e)=>{
        if(firstNameError===null && lastNameError===null && usernameError===null && passwordError===null && emailError===null)
        {
            const data={
                display_id: displayId,
                is_active:active, 
                
                staff_type: props.staffType,
                drug_lic: drugLic,
                npi: npi,
                specialty: null, 
                access_group: null, 
            
                notify_staff_msg: true, 
                notify_patient_msg: true, 
                notify_meeting: true,
                user_type: props.userType,
                theme:"",
                language:"EN",

                provider_color:providerColor,
                start_date:startDate,
                biography:biography,
                facebook: facebook,
                email: email,
                fax: fax,
                mobile_phone: mobile,
                home_phone: homePhone,
                staff_photo: staffPhoto,
                address: address,

                //yeu cau
                first_name: firstName,
                last_name: lastName,
                username: username,
                password: password,
            };
            const result=await ProviderService.insert(data);
            if(result.success)
            {
                toast.success(t(strings.insertSuccess));
                props.handleChangeIsInsert();
            }
            else
            {
                toast.error(t(strings.insertFail));
            }
            setFirstName("");
            setLastName("");
            setUsername("");
            setPassword("");
            setEmail("");
            setBiography("");
            setProviderColor("#000");
            setDisplayId("");
            setFacebook("");
            setMobile("");
            setHomePhone("");
            setFax("");
            setAddress("");
            setDrugLic("");
            setNpi("");
            setActive(true);
            setStartDate(new Date());
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
                            <TextField className={classes.inputControl} 
                                        required 
                                        label={t(strings.username)}  
                                        variant="outlined" 
                                        onChange={handleChangeUsername}
                                        value={username}
                                        error={usernameError !== null}
                                        helperText={usernameError}
                                        /> 
                        </FormControl>
                        <FormControl className={classes.item}>
                            <TextField className={classes.inputControl} 
                                        required 
                                        type="password"
                                        label={t(strings.password)}  
                                        variant="outlined" 
                                        onChange={handleChangePassword}
                                        value={password}
                                        error={passwordError !== null}
                                        helperText={passwordError}
                                        /> 
                        </FormControl>
                        <FormControl className={classes.item}>
                            <TextField className={classes.inputControl} 
                                        required 
                                        label={t(strings.firstName)}  
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
                                        label={t(strings.lastName)}  
                                        variant="outlined" 
                                        onChange={handleChangeLastName}
                                        value={lastName}
                                        error={lastNameError !== null}
                                        helperText={lastNameError}
                                        /> 
                        </FormControl>
                        <FormControl className={classes.item}>
                            <TextField className={classes.inputControl} 
                                        label={t(strings.email)}  
                                        required
                                        variant="outlined" 
                                        onChange={handleChangeEmail}
                                        value={email}
                                        error={emailError !== null}
                                        helperText={emailError}
                                        /> 
                        </FormControl>
                        
                        <FormControl className={classes.item}>
                            <TextField className={classes.inputControlBig} 
                                        label={t(strings.biography)}  
                                        variant="outlined" 
                                        onChange={handleChangeBiography}
                                        value={biography}
                                        multiline
                                        rows={4}
                                        /> 
                        </FormControl>
                        {props.staffType===t(strings.staffTypeProvider) ? 
                        <FormControl className={classes.item}>
                            <TextField className={classes.inputControl} 
                                    label={t(strings.drugLic)}  
                                    variant="outlined" 
                                    onChange={handleChangeDrugLic}
                                    value={drugLic}
                                   
                                    /> 
                        </FormControl>
                        :
                        <div></div>
                        }
                        
                        {props.staffType===t(strings.staffTypeProvider) ?
                        <FormControl className={classes.itemColor}>
                            <InputLabel shrink id="providerColor">
                                {t(strings.providerColor)}
                            </InputLabel>
                            <div className={classes.inputControlColor} >
                                <ColorPicker
                                    name="color"
                                    InputProps={{ disableUnderline: true }}
                                    style={{width:'100%',backgroundColor:providerColor,}}
                                    onChange={color => setProviderColor(color)}
                                    value={providerColor}
                                />
                            </div>
                            
                        </FormControl>
                        :
                        <div></div>
                        }
                        
                        
                    </Grid>
                    <Grid item xs={6} className={classes.rightContent}>
                        <FormControl className={classes.item}>
                            <TextField className={classes.inputControl} 
                                        label={t(strings.displayId)}  
                                        variant="outlined" 
                                        onChange={handleChangeDisplayId}
                                        value={displayId}
                                       
                                        /> 
                        </FormControl>
                        <FormControl className={classes.item}>
                            <TextField className={classes.inputControl} 
                                        label={t(strings.facebook)}  
                                        variant="outlined" 
                                        onChange={handleChangeFacebook}
                                        value={facebook}
                                        /> 
                        </FormControl>
                        <FormControl className={classes.item}>
                            <TextField className={classes.inputControl} 
                                        label={t(strings.mobilePhone)}  
                                        variant="outlined" 
                                        onChange={handleChangeMobile}
                                        value={mobile}
                                        type="number"

                                        /> 
                        </FormControl>
                        <FormControl className={classes.item}>
                            <TextField className={classes.inputControl} 
                                        label={t(strings.homePhone)}  
                                        variant="outlined" 
                                        onChange={handleChangeHomePhone}
                                        value={homePhone}
                                        type="number"
                                        /> 
                        </FormControl>
                        <FormControl className={classes.item}>
                            <TextField className={classes.inputControl}  
                                        label={t(strings.fax)}  
                                        variant="outlined" 
                                        onChange={handleChangeFax}
                                        value={fax}
                                        /> 
                        </FormControl>
                        <FormControl className={classes.item}>
                            <TextField className={classes.inputControl}  
                                        label={t(strings.address)}  
                                        variant="outlined" 
                                        onChange={handleChangeAddress}
                                        value={address}
                                        /> 
                        </FormControl>
                        <FormControl className={classes.item}>
                            <TextField className={classes.inputControl} 
                                        label={t(strings.npi)}  
                                        variant="outlined" 
                                        onChange={handleChangeNpi}
                                        value={npi}
                                       
                                        /> 
                        </FormControl>
                        
                        <FormControl >
                            <KeyboardDatePicker
                                        margin="normal"
                                        id="date-picker-dialog"
                                        label={t(strings.startDate)}
                                        format={t(strings.apiDateFormat)}
                                        value={startDate}
                                        onChange={handleChangeStartDate}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                        InputProps={{
                                            disableUnderline: true,
                                            
                                        }}
                                        className={classes.inputControlDate} 
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
                        </FormControl>
                        
                        
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

export default InsertPerson;