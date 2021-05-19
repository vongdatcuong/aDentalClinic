import React,{useState,useEffect} from 'react';
import { makeStyles  } from "@material-ui/core/styles";
//api
import AuthService from "../../../api/authentication/auth.service";
import PracticeService from "../../../api/practice/practice.service";
//validators
import validators, {isPropValid} from '../../../utils/validators';

//translation
import { useTranslation } from 'react-i18next';
//import icon
import {AccountBox,
        LocationCity,
        LocationOn,
        Assignment,
        Devices,
        ContactPhone,
        TrafficRounded,
} from "@material-ui/icons";
//import image
import Logo from "../../../assets/images/logo_iDental.png";
import {
    Grid,
    Typography,
    FormControl,
    OutlinedInput,
    InputAdornment,
    Button,
    Divider,
    Select,
    MenuItem,
    FormHelperText,
    InputLabel,
} from '@material-ui/core';
import {
    KeyboardTimePicker
} from '@material-ui/pickers';
import { toast } from 'react-toastify';

import styles from "./jss";
// import darkTheme from "../../../themes/darkTheme";
//import configs
import strings from "../../../configs/strings";
//import component

import moment from 'moment';
const useStyles = makeStyles(styles);

const createData=(id,name,address,phone,fax,startTime,endTime)=>{
    return {id,name,address,phone,fax,startTime,endTime};
};

const Practice = () => {
    const {t, i18n } = useTranslation();

    const classes = useStyles();
    
    const [rows,setRows]=useState(null);
  
    const [editable,setEditable]=useState(false);
    
    const [name,setName]=useState(null);
    const [address,setAddress]=useState(null);
    const [phone,setPhone]=useState(null);
    const [fax,setFax]=useState(null);
    const [startTime,setStartTime]=useState(new Date());
    const [endTime,setEndTime]=useState(new Date());
    const [nameErrorMessage,setNameErrorMessage]=useState(null);
    const [phoneErrorMessage,setPhoneErrorMessage]=useState(null);
    const [user,setUser]=useState(null);
    const [isLoading,setIsLoading]=useState(true);
    //handle
    const handleChangeName=(e)=>{
        setName(e.target.value);
    }
    const handleChangeAddress=(e)=>{
        setAddress(e.target.value);
    }
    const handleChangePhone=(e)=>{
        setPhone(e.target.value);
    }
    const handleChangeFax=(e)=>{
        setFax(e.target.value);
    }
    const handleChangeStartTime=(date)=>{
        if(editable)
        {
            setStartTime(date);
            if(moment(date).format("HH:mm")<moment(endTime).format("HH:mm"))
            {
            }
        }
    }
    const handleChangeEndTime=(date)=>{
        if(editable)
        {
            setEndTime(date);
            if(date>startTime)
            {

            }
            else
            {

            }
        }
    }

    const handleChangeEditable=(e)=>{
        setEditable(!editable);
    }
    
    const getPractice=async()=>{
        const res=await PracticeService.getPractice();
        if(res.success)
        {
            let a=res.data;
            
            let newData=createData(a._id,a.name,a.address,a.phone,a.fax,a.start_time,a.end_time);
            setName(a.name);
            setAddress(a.address);
            setPhone(a.phone);
            setFax(a.fax);
            setStartTime(a.start_time);
            setEndTime(a.end_time);
            setRows(newData);
            setIsLoading(false);

        }

    }

    const onClickUpdate=async()=>{
        let start=moment(startTime).format("HH:mm");
        let end=moment(endTime).format("HH:mm");
        if(start<end && editable===true)
        {
            const data={
                name:name,
                address:address,
                phone:phone,
                fax:fax,
                start_time:startTime,
                end_time:endTime,
    
            }
            const res=await PracticeService.update(rows.id,data);
            if(res.success)
            {
                toast.success(t(strings.updateSuccess));
            }
            else
            {
                toast.error(t(strings.updateFail));
            }
        }
        else
        {
            toast.error(t(strings.errorStartEndTime))
        }
        
    }
    const getUser=async()=>{
        const result=await AuthService.getCurrentUser();
        setUser(result);
    }
    useEffect(()=>{
        if(rows===null)
        {
            getPractice();
            getUser();
        }
        if(!isPropValid(validators.properties.name, name))
        {
            setNameErrorMessage(t(strings.nameErrMsg));
        }
        
        if(nameErrorMessage!==null && isPropValid(validators.properties.name, name))
        {
            setNameErrorMessage(null);
        }
        if(!isPropValid(validators.properties.phone, phone))
        {
            setPhoneErrorMessage(t(strings.phoneErrMsg));
        }
        
        if(phoneErrorMessage!==null && isPropValid(validators.properties.phone, phone))
        {
            setPhoneErrorMessage(null);
        }
    })
    
    return (
        <div className={classes.container}>
            <div className={classes.content}>
                <Grid container>
                    <Grid item xs={10}>
                        <Typography className={classes.title} variant="h4">
                            {t(strings.practices)}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                    {user!==null && user.user_type==="ADMIN" ? 
                            <div>
                                <Select 
                                    value={editable}
                                    onChange={handleChangeEditable}
                                    disableUnderline 
                                    className={classes.status}
                                >
                        
                                    <MenuItem value={false}>{t(strings.read)}</MenuItem>
                                    <MenuItem value={true}>{t(strings.edit)}</MenuItem>

                                </Select>
                                
                            </div>
                            :
                            <div></div>
                            }

                    </Grid>
                </Grid>
                <Divider className={classes.titleDivider}/>
                
                {rows!==null ?
                <div className={classes.information}>
                    <div className={classes.logo}>
                            <img src={Logo} />
                    </div>
                    
                    
                    <Grid container className={classes.information}>
                    
                    
                    <Grid item xs={6} className={classes.leftContent}>
                        <Typography className={classes.title} variant="h5">
                            {t(strings.general)}
                        </Typography>
                
                       
                        <FormControl>
                            <FormControl variant="filled">
                                    <OutlinedInput
                                        className={classes.inputControl}
                                        id="outlined-adornment-password"
                                        type={'text'}
                                        value={name}
                                        placeholder={t(strings.name)}
                                        readOnly={!editable}
                                        onChange={handleChangeName}
                                        startAdornment={
                                        <InputAdornment position="start">
                                            <AccountBox className={classes.iconButton} />

                                        </InputAdornment>
                                        }
                                        
                                        
                                    />
                                    <FormHelperText 
                                        error={nameErrorMessage!==null}
                                        className={classes.errorText}
                                    >
                                        {nameErrorMessage}
                                    </FormHelperText>
                                   
                            </FormControl>   
                        </FormControl>

                        <FormControl>
                            <FormControl variant="filled">
                                <OutlinedInput
                                    className={classes.inputControl}
                                    id="outlined-adornment-password"
                                    type={'text'}
                                    value={address}
                                    placeholder={t(strings.address)}
                                    onChange={handleChangeAddress}
                                    readOnly={!editable}
                                    startAdornment={
                                    <InputAdornment position="start">
                                        <LocationCity className={classes.iconButton} />

                                    </InputAdornment>
                                    }
                                />
                                
                            </FormControl>
                            
                    
                        </FormControl>
                        <FormControl>
                            <FormControl variant="filled">
                                    <OutlinedInput
                                        className={classes.inputControl}
                                        id="outlined-adornment-password"
                                        type={'text'}
                                        value={phone}
                                        placeholder={t(strings.phone)}
                                        onChange={handleChangePhone}
                                        readOnly={!editable}
                                        startAdornment={
                                        <InputAdornment position="start">
                                            <ContactPhone className={classes.iconButton} />

                                        </InputAdornment>
                                        }
                                        
                                    />
                                    <FormHelperText 
                                        error={phoneErrorMessage!==null}
                                        className={classes.errorText}
                                    >
                                        {phoneErrorMessage}
                                    </FormHelperText>
                            </FormControl>
                            
                            
                        </FormControl>
                        <FormControl>
                            <FormControl variant="filled">
                                <OutlinedInput
                                    className={classes.inputControl}
                                    id="outlined-adornment-password"
                                    type={'text'}
                                    value={fax}
                                    placeholder={t(strings.fax)}
                                    onChange={handleChangeFax}
                                    readOnly={!editable}
                                    startAdornment={
                                    <InputAdornment position="start">
                                        <Devices className={classes.iconButton} />

                                    </InputAdornment>
                                    }
                                />
                                
                            </FormControl>
                        
                        </FormControl>
                        <div className={classes.inputDate}>
                            <KeyboardTimePicker
                                margin="normal"
                                id="time-picker"
                                label={t(strings.startTime)}
                                value={startTime}
                                onChange={handleChangeStartTime}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                                InputProps={{
                                    disableUnderline: true,
                                    readOnly: !editable
                                }}
                                className={classes.inputControlSmall} 

                            />
                            <KeyboardTimePicker
                                margin="normal"
                                id="time-picker"
                                label={t(strings.endTime)}
                                value={endTime}
                                onChange={handleChangeEndTime}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                                InputProps={{
                                    disableUnderline: true,
                                    readOnly: !editable
                                }}
                                className={classes.inputControlSmall} 

                            />
                            
                        </div>
                        
                     
                        {editable===true ? 
                        <div>
                            <Button variant="contained" color="primary" className={classes.saveButton} onClick={onClickUpdate}>
                                    {t(strings.save)}
                            </Button>
                        </div>
                        :
                        <div></div>
                        }
                        
                        
                        
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
                
                :
                <div></div>
                }
                

                      
            </div>
        </div>
    )
    
}

export default Practice;