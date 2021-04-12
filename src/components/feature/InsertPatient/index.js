import React,{useState} from 'react';
import { makeStyles, useTheme  } from "@material-ui/core/styles";
//api
import PatientService from "../../../api/patient/patient.service";

//translation
import { useTranslation, Trans } from 'react-i18next';

// @material-ui/core Component
import Container from '@material-ui/core/Container';
import { Typography,
    Fab,
    FormControlLabel,
    Checkbox,
    Button,
    TextField
 } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';

import styles from "./jss";
import darkTheme from "../../../themes/darkTheme";
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
    const [gender,setGender]=useState(true);
    const [active,setActive]=useState(true);
    const [staffPhoto,setStaffPhoto]=useState(null);


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

    const handleUploadClick = event => {
        console.log();
        var file = event.target.files[0];
        const reader = new FileReader();
        var url = reader.readAsDataURL(file);
    
        reader.onloadend=(e)=>{
            setSelectedFile([reader.result]);

        }
        
    
        setSelectedFile(event.target.files[0]);
        console.log("Url:",reader); 

    };

    
    const insertPerson=async(e)=>{
        console.log("Insert person");
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
            
            // staff_type: props.staffType,
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

		    //yeu cau
            first_name: firstName,
            last_name: lastName,
            username: username,
            password: password,
        };
        const result=await PatientService.insert(data);
        if(result.success)
        {
            alert(t(strings.insertSuccess));
        }
        else
        {
            alert(t(strings.insertFail));
        }

    }
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
                        <div className={classes.item}>
                            <TextField className={classes.inputControl} 
                                        required 
                                        label={t(strings.username)}  
                                        variant="outlined" 
                                        onChange={handleChangeUsername}
                                        value={username}
                                        /> 
                        </div>
                        <div className={classes.item}>
                            <TextField className={classes.inputControl} 
                                        required 
                                        type="password"
                                        label={t(strings.password)}  
                                        variant="outlined" 
                                        onChange={handleChangePassword}
                                        value={password}
                                        /> 
                        </div>
                        <div className={classes.item}>
                            <TextField className={classes.inputControl} 
                                        required 
                                        label={t(strings.firstName)}  
                                        variant="outlined" 
                                        onChange={handleChangeFirstName}
                                        value={firstName}
                                        /> 
                        </div>
                        <div className={classes.item}>
                            <TextField className={classes.inputControl} 
                                        required 
                                        label={t(strings.lastName)}  
                                        variant="outlined" 
                                        onChange={handleChangeLastName}
                                        value={lastName}
                                        /> 
                        </div>
                        <div className={classes.item}>
                            <TextField className={classes.inputControl} 
                                        label={t(strings.email)}  
                                        variant="outlined" 
                                        onChange={handleChangeEmail}
                                        value={email}
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
                        
                    </Grid>
                    <Grid item xs={6} className={classes.rightContent}>
                        <div className={classes.item}>
                            <TextField className={classes.inputControl} 
                                        label={t(strings.facebook)}  
                                        variant="outlined" 
                                        onChange={handleChangeFacebook}
                                        value={facebook}
                                        /> 
                        </div>
                        <div className={classes.item}>
                            <TextField className={classes.inputControl} 
                                        label={t(strings.mobilePhone)}  
                                        variant="outlined" 
                                        onChange={handleChangeMobile}
                                        value={mobile}
                                        type="number"

                                        /> 
                        </div>
                        <div className={classes.item}>
                            <TextField className={classes.inputControl} 
                                        label={t(strings.homePhone)}  
                                        variant="outlined" 
                                        onChange={handleChangeHomePhone}
                                        value={homePhone}
                                        /> 
                        </div>
                        <div className={classes.item}>
                            <TextField className={classes.inputControl}  
                                        label={t(strings.fax)}  
                                        variant="outlined" 
                                        onChange={handleChangeFax}
                                        value={fax}
                                        /> 
                        </div>
                        <div className={classes.item}>
                            <TextField className={classes.inputControl}  
                                        label={t(strings.address)}  
                                        variant="outlined" 
                                        onChange={handleChangeAddress}
                                        value={address}
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