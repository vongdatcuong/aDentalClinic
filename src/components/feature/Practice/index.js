import React,{useState} from 'react';
import { makeStyles, useTheme  } from "@material-ui/core/styles";
//translation
import { useTranslation, Trans } from 'react-i18next';
//import icon
import {AccountBox,
        LocationCity,
        LocationOn,
        Assignment,
        ContactPhone,
} from "@material-ui/icons";
//import image
import Logo from "../../../assets/images/logo_iDental.png";
import {Grid,
    Typography,
    FormControl,
    OutlinedInput,
    InputAdornment,
    Button,
    Divider
} from '@material-ui/core';

import styles from "./jss";
import darkTheme from "../../../themes/darkTheme";
//import configs
import strings from "../../../configs/strings";
//import component
import TableCustom from "../../common/TableCustom";

const useStyles = makeStyles(styles);

const Practice = () => {
    const {t, i18n } = useTranslation();

    const classes = useStyles();
    const [name,setName]=useState(null);
    const [organization,setOrganization]=useState(null);
    const [location,setLocation]=useState(null);
    const [hotline,setHotline]=useState(null);
    const [description,setDescription]=useState(null);

    const handleChangeLocation=(e)=>{
        setLocation(e.target.value);
    }
    const handleChangeHotline=(e)=>{
        setHotline(e.target.value);
    }
    const handleChangeDescription=(e)=>{
        setDescription(e.target.value);
    }
    const handleChangeOrganization=(e)=>{
        setOrganization(e.target.value);
    }
    const handleChangeName=(e)=>{
        setName(e.target.value);
    }
    return (
        <div className={classes.container}>
            <div className={classes.content}>
                <Grid container>
                    <Grid item>
                        <Typography className={classes.title} variant="h4">
                            {t(strings.practices)}
                        </Typography>
                    </Grid>
                    
                </Grid>
                <div className={classes.logo}>
                    <img src={Logo} />
                </div>
                <Grid container>
                    <Grid item xs={6} className={classes.leftContent}>
                        <Typography className={classes.title} variant="h5">
                            {t(strings.general)}
                        </Typography>
                        <div>
                            <FormControl variant="filled">
                                    <OutlinedInput
                                        className={classes.inputControl}
                                        id="outlined-adornment-password"
                                        type={'text'}
                                        value={name}
                                        placeholder={t(strings.name)}
                                        onChange={handleChangeName}
                                        startAdornment={
                                        <InputAdornment position="start">
                                            <AccountBox className={classes.iconButton} />

                                        </InputAdornment>
                                        }
                                    />
                                    
                            </FormControl>   
                        </div>

                        <div>
                            <FormControl variant="filled">
                                <OutlinedInput
                                    className={classes.inputControl}
                                    id="outlined-adornment-password"
                                    type={'text'}
                                    value={organization}
                                    placeholder={t(strings.organization)}
                                    onChange={handleChangeOrganization}
                                    startAdornment={
                                    <InputAdornment position="start">
                                        <LocationCity className={classes.iconButton} />

                                    </InputAdornment>
                                    }
                                />
                                
                            </FormControl>
                            
                    
                        </div>
                        <div>
                            <FormControl variant="filled">
                                    <OutlinedInput
                                        className={classes.inputControl}
                                        id="outlined-adornment-password"
                                        type={'text'}
                                        value={location}
                                        placeholder={t(strings.location)}
                                        onChange={handleChangeLocation}
                                        startAdornment={
                                        <InputAdornment position="start">
                                            <LocationOn className={classes.iconButton} />

                                        </InputAdornment>
                                        }
                                    />
                                
                            </FormControl>
                            
                            
                        </div>
                        <div>
                            <FormControl variant="filled">
                                <OutlinedInput
                                    className={classes.inputControl}
                                    id="outlined-adornment-password"
                                    type={'text'}
                                    value={hotline}
                                    placeholder={t(strings.hotline)}
                                    onChange={handleChangeHotline}
                                    startAdornment={
                                    <InputAdornment position="start">
                                        <ContactPhone className={classes.iconButton} />

                                    </InputAdornment>
                                    }
                                />
                                
                            </FormControl>
                        
                        </div>
                        <div>
                            <FormControl variant="filled">
                                <OutlinedInput
                                    className={classes.inputControl}
                                    id="outlined-adornment-password"
                                    type={'text'}
                                    value={description}
                                    placeholder={t(strings.description)}
                                    onChange={handleChangeDescription}
                                    startAdornment={
                                    <InputAdornment position="start">
                                        <Assignment className={classes.iconButton} />

                                    </InputAdornment>
                                    }
                                />
                                
                            </FormControl>
                            
                        </div>
                        <div>
                            <Button variant="contained" color="primary" className={classes.saveButton}>
                                    {t(strings.save)}
                            </Button>
                        </div>
                        
                        
                    </Grid>
                    <Grid item xs={6} className={classes.rightContent}>
                        <Typography className={classes.rightContentTitle} variant="h5">
                            {t(strings.aboutUs)}
                        </Typography>
                        <Typography className={classes.rightContentText} variant="subtitle2">
                            {t(strings.aboutUsContent)}
                        </Typography>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Practice;