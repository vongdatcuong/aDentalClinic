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
import Grid from '@material-ui/core/Grid';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import { KeyboardDatePicker } from '@material-ui/pickers';
import ColorPicker from 'material-ui-color-picker'

import styles from "./jss";
import darkTheme from "../../../themes/darkTheme";
import { toast } from 'react-toastify';

//import configs
import strings from "../../../configs/strings";
//import image

//import icons


//import component

const useStyles = makeStyles(styles);




const UpdateChair = (props) => {
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
    const [staffPhoto,setStaffPhoto]=useState(null);
    const [displayId,setDisplayId]=useState(null);
    const [providerColor,setProviderColor]=useState("#000");
    const [drugLic,setDrugLic]=useState(null);
    const [startDate,setStartDate]=useState(new Date());
    const [npi,setNpi]=useState(null);
    const [biography,setBiography]=useState(null);

    const [selectedFile,setSelectedFile]=useState(null);

    const handleChangeActive=(e)=>{
        if(props.editable===true)
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
        if(props.editable)
        {
            setStartDate(date);

        }
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

    const onClickUpdate=async()=>{
        if(firstNameError===null && lastNameError===null && emailError===null && props.editable===true)
        {
            const data={
                display_id: displayId,
                drug_lic: drugLic,
                npi: npi,
                provider_color:providerColor,
                start_date:startDate,
                biography:biography,            
                //change
                facebook: facebook,
                email: email,
                fax: fax,
                mobile_phone: mobile,
                home_phone: homePhone,
                address: address,
                is_active:active, 
    
                //yeu cau
                first_name: firstName,
                last_name: lastName,
             
    
            };
            const update=await ProviderService.update(props.id,data);
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
    useEffect(()=>{
        const searchProvider=async()=>{
            const result=await ProviderService.search(props.id);
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
                setDisplayId(result.data.payload.display_id);
                setDrugLic(result.data.payload.drug_lic);
                setProviderColor(result.data.payload.provider_color);
                setStartDate(result.data.payload.start_date);
                setBiography(result.data.payload.biography);
                setNpi(result.data.payload.npi);
            }
        }
        if(props.id && username===null)
        {
            searchProvider();

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

                                        /> 
                        </FormControl>
                        <FormControl className={classes.item}>
                            <InputLabel shrink>
                                {t(strings.email)}
                            </InputLabel>
                            <TextField className={classes.inputControl} 
                                        required
                                        variant="outlined" 
                                        onChange={handleChangeEmail}
                                        value={email}
                                        error={emailError !== null}
                                        helperText={emailError}
                                        inputProps={{ readOnly: !props.editable }}
                                        /> 
                        </FormControl>
                        
                        <FormControl className={classes.item}>
                            <InputLabel shrink>
                                {t(strings.biography)}
                            </InputLabel>
                            <TextField className={classes.inputControlBig} 
                                        variant="outlined" 
                                        onChange={handleChangeBiography}
                                        value={biography}
                                        multiline
                                        inputProps={{ readOnly: !props.editable }}
                                        /> 
                        </FormControl>
                        {props.staffType===t(strings.staffTypeProvider) ? 
                        <FormControl className={classes.item}>
                            <InputLabel shrink>
                                {t(strings.drugLic)}
                            </InputLabel>
                            <TextField className={classes.inputControl} 
                                    variant="outlined" 
                                    onChange={handleChangeDrugLic}
                                    value={drugLic}
                                    inputProps={{ readOnly: !props.editable }}
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
                                    onChange={color => {
                                        if(props.editable)
                                        {
                                            setProviderColor(color)

                                        }
                                    }}
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
                            <InputLabel shrink>
                                {t(strings.displayId)}
                            </InputLabel>
                            <TextField className={classes.inputControl} 
                                        variant="outlined" 
                                        onChange={handleChangeDisplayId}
                                        value={displayId}
                                        inputProps={{ readOnly: !props.editable }}
                                        /> 
                        </FormControl>
                        <FormControl className={classes.item}>
                            <InputLabel shrink>
                                {t(strings.facebook)}
                            </InputLabel>
                            <TextField className={classes.inputControl} 
                                        variant="outlined" 
                                        onChange={handleChangeFacebook}
                                        value={facebook}
                                        inputProps={{ readOnly: !props.editable }}
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
                                        inputProps={{ readOnly: !props.editable }}
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
                                        /> 
                        </FormControl>
                        <FormControl className={classes.item}>
                            <InputLabel shrink>
                                {t(strings.address)}
                            </InputLabel>
                            <TextField className={classes.inputControl}  
                                        variant="outlined" 
                                        onChange={handleChangeAddress}
                                        value={address}
                                        inputProps={{ readOnly: !props.editable }}
                                        /> 
                        </FormControl>
                        <FormControl className={classes.item}>
                            <InputLabel shrink>
                                {t(strings.npi)}
                            </InputLabel>
                            <TextField className={classes.inputControl} 
                                        variant="outlined" 
                                        onChange={handleChangeNpi}
                                        value={npi}
                                        inputProps={{ readOnly: !props.editable }}
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
                {props.editable===true ?
                <div>
                    <Button variant="contained" color="primary" className={classes.updateButton} onClick={onClickUpdate}>
                        {t(strings.update)}
                    </Button>
                </div>
                :
                <div/>
                }

        </div>
    </div>
    )
}

export default UpdateChair;