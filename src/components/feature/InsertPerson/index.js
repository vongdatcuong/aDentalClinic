import React,{useState} from 'react';
import { makeStyles, useTheme  } from "@material-ui/core/styles";
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




const InsertPerson = () => {
    const {t, i18n } = useTranslation();
    const classes = useStyles();
    
    //state
    const [fullname,setFullname]=useState(null);
    const [idCard,setIDCard]=useState(null);
    const [date,setDate]=useState(null);
    const [publisher,setPublisher]=useState(null);
    const [email,setEmail]=useState(null);
    const [address,setAddress]=useState(null);
    const [country,setCountry]=useState(null);
    const [city,setCity]=useState(null);
    const [postalCode,setPostalCode]=useState(null);
    const [phone,setPhone]=useState(null);
    const [birth,setBirth]=useState(null);
    const [male,setMale]=useState(true);
    const [female,setFemale]=useState(false);
    const [gender,setGender]=useState(true);

    const [selectedFile,setSelectedFile]=useState(null);

    const handleChangeGender=(e)=>{
        setGender(!gender);
    }
    const handleChangeMale=(e)=>{
        setMale(e.target.value);
    };

    const handleChangeFemale=(e)=>{
        setFemale(e.target.value);
    }
    const handleChangeFullname=(e)=>{
        setFullname(e.target.value);
    }
    const handleChangeIDCard=(e)=>{
        setIDCard(e.target.value);
    }
    const handleChangeDate=(e)=>{
        setDate(e.target.value);
    }
    const handleChangePublisher=(e)=>{
        setPublisher(e.target.value);
    }
    const handleChangeEmail=(e)=>{
        setEmail(e.target.value);
    }
    const handleChangeAddress=(e)=>{
        setAddress(e.target.value);
    }
    const handleChangeCountry=(e)=>{
        setCountry(e.target.value);
    }
    const handleChangeCity=(e)=>{
        setCity(e.target.value);
    }
    const handleChangePostalCode=(e)=>{
        setPostalCode(e.target.value);
    }
    const handleChangePhone=(e)=>{
        setPhone(e.target.value);
    }
    const handleChangeBirth=(e)=>{
        setBirth(e.target.value);
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
                                        label={t(strings.fullName)}  
                                        variant="outlined" 
                                        onChange={handleChangeFullname}
                                        value={fullname}
                                        /> 
                        </div>
                        <div className={classes.itemSmall}>
                            <TextField className={classes.inputControlSmall}
                                        label={t(strings.idCard)}  
                                        variant="outlined"
                                        onChange={handleChangeIDCard}
                                        value={idCard}/> 

                            <TextField className={classes.inputControlSmall}
                                        label={t(strings.date)}  
                                        variant="outlined"
                                        onChange={handleChangeDate}
                                        value={date}/>

                            <TextField className={classes.inputControlSmall}
                                        label={t(strings.publisher)}  
                                        variant="outlined"
                                        onChange={handleChangePublisher}
                                        value={publisher}/>
                        </div>
                         
                        <div className={classes.item}>
                            <TextField className={classes.inputControl}
                                        label={t(strings.email)}  
                                        variant="outlined"
                                        onChange={handleChangeEmail}
                                        value={email}/>
                             
                        </div>
                        <div className={classes.item}>
                            <TextField className={classes.inputControl}
                                        label={t(strings.address)}  
                                        variant="outlined"
                                        onChange={handleChangeAddress}
                                        value={address}/>
                             
                        </div>
                        <div className={classes.itemSmall}>
                            <TextField className={classes.inputControlSmall}
                                        label={t(strings.country)}  
                                        variant="outlined"
                                        onChange={handleChangeCountry}
                                        value={country}/> 

                            <TextField className={classes.inputControlSmall}
                                        label={t(strings.city)}  
                                        variant="outlined"
                                        onChange={handleChangeCity}
                                        value={city}/>

                            <TextField className={classes.inputControlSmall}
                                        label={t(strings.postalCode)}  
                                        variant="outlined"
                                        onChange={handleChangePostalCode}
                                        value={postalCode}/>
                        </div>
                        
                    </Grid>
                    <Grid item xs={6} className={classes.rightContent}>
                        
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
                        <div className={classes.item}>
                            <TextField className={classes.inputControl}
                                        label={t(strings.phone)}  
                                        variant="outlined"
                                        onChange={handleChangePhone}
                                        value={phone}/>
                             
                        </div>
                        <div className={classes.item}>
                            <TextField className={classes.inputControl}
                                        label={t(strings.birth)}  
                                        variant="outlined"
                                        onChange={handleChangeBirth}
                                        value={birth}/>
                             
                        </div>
                        
                    </Grid>
                </Grid>
                <div>
                    <Button variant="contained" color="primary" className={classes.insertButton}>
                        {t(strings.insert)}
                    </Button>
                </div>
        </div>
    </div>
)
}

export default InsertPerson;