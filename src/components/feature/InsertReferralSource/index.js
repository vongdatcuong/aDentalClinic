import React,{useState,useEffect} from 'react';
import { makeStyles  } from "@material-ui/core/styles";
//api
import ReferralSourceService from "../../../api/referralSource/referralSource.service";
//validators
import validators, {isPropValid} from '../../../utils/validators';

//translation
import { useTranslation } from 'react-i18next';

// @material-ui/core Component
import { 
    FormControl,
    InputLabel,
    Button,
    TextField
 } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
// import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';

import styles from "./jss";
// import darkTheme from "../../../themes/darkTheme";
import { toast } from 'react-toastify';

//import configs
import strings from "../../../configs/strings";
//import image

//import icons


//import component

const useStyles = makeStyles(styles);




const InsertReferralSource = (props) => {
    const {t, i18n } = useTranslation();
    const classes = useStyles();
    
    //state
   
    
    const [name,setName]=useState(null);
    const [phone,setPhone]=useState(null);
    const [fax,setFax]=useState(null);
    const [address,setAddress]=useState(null);
    const [email,setEmail]=useState(null);
    const [additionalInfo,setAdditionalInfo]=useState(null);
    const [nameErrorMessage,setNameErrorMessage]=useState(null);
    const [emailErrorMessage,setEmailErrorMessage]=useState(null);

    const handleChangeName=(e)=>{
        setName(e.target.value);
    };
    const handleChangePhone=(e)=>{
        setPhone(e.target.value);
    }
    const handleChangeFax=(e)=>{
        setFax(e.target.value);
    }
    const handleChangeAddress=(e)=>{
        setAddress(e.target.value);
    }
    const handleChangeEmail=(e)=>{
        setEmail(e.target.value);
    }
    const handleChangeAdditionalInfo=(e)=>{
        setAdditionalInfo(e.target.value);
    }

    const insertReferralSource=async(e)=>{
        if(nameErrorMessage===null && emailErrorMessage===null)
        {
            const data={
                name:name,
                phone:phone,
                fax:fax,
                address:address,
                email:email,
                additional_info:additionalInfo
              
            };
            const result=await ReferralSourceService.insert(data);
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
        

    }
    useEffect(()=>{
        if(!isPropValid(validators.properties.name, name))
        {
            setNameErrorMessage(t(strings.nameErrMsg));
        }
        
        if(nameErrorMessage!==null && isPropValid(validators.properties.name, name))
        {
            setNameErrorMessage(null);
        }
        
        if(!isPropValid(validators.properties.email, email))
        {
            setEmailErrorMessage(t(strings.emailErrMsg));
        }
        if(emailErrorMessage!==null && isPropValid(validators.properties.email, email))
        {
            setEmailErrorMessage(null);
        }
       
    })
    return (
        <div className={classes.container}>
            
            <div className={classes.content}>
                
              
                <Grid container className={classes.input}>
                    <Grid item xs={6} className={classes.leftContent}>
                        <FormControl className={classes.item}>
                            <TextField className={classes.inputControl} 
                                        required
                                        label={t(strings.name)}  
                                        variant="outlined" 
                                        onChange={handleChangeName}
                                        value={name}
                                        error={nameErrorMessage !== null}
                                        helperText={nameErrorMessage}
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
                                        label={t(strings.phone)}  
                                        variant="outlined" 
                                        onChange={handleChangePhone}
                                        value={phone}
                                        
                                        /> 
                        </FormControl>
                        
                    </Grid>
                    <Grid item xs={6} className={classes.rightContent}>
                    <FormControl className={classes.item}>
                            <TextField className={classes.inputControl} 
                                        required 
                                        label={t(strings.email)}  
                                        variant="outlined" 
                                        onChange={handleChangeEmail}
                                        value={email}
                                        error={emailErrorMessage !== null}
                                        helperText={emailErrorMessage}
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
                            <TextField className={classes.inputControlBig} 
                                        label={t(strings.additionalInfo)}  
                                        variant="outlined" 
                                        onChange={handleChangeAdditionalInfo}
                                        value={additionalInfo}
                                        multiline
                                        /> 
                        </FormControl>
                       
                    </Grid>
                </Grid>
                <div>
                    <Button variant="contained" color="primary" className={classes.insertButton} onClick={insertReferralSource}>
                        {t(strings.insert)}
                    </Button>
                </div>
        </div>
    </div>
    )
}

export default InsertReferralSource;