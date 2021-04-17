import React,{useState,useEffect} from 'react';
import { makeStyles, useTheme  } from "@material-ui/core/styles";
//api
import ReferralSourceService from "../../../api/referralSource/referralSource.service";
//validators
import validators, {isPropValid} from '../../../utils/validators';

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




const UpdateReferralSource = (props) => {
    const {t, i18n } = useTranslation();
    const classes = useStyles();
    
    //state
   
    const [name,setName]=useState(null);
    const [phone,setPhone]=useState(null);
    const [fax,setFax]=useState(null);
    const [address,setAddress]=useState(null);
    const [email,setEmail]=useState(null);
    const [additionalInfo,setAdditionalInfo]=useState(null);

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
    


    const onClickUpdate=async()=>{
        const data={
            name:name,
            phone:phone,
            fax:fax,
            address:address,
            email:email,
            additional_info:additionalInfo
          
        };
        const result=await ReferralSourceService.update(props.id,data);
        if(result.success)
        {
            alert(t(strings.updateSuccess));
        }
        else
        {
            alert(t(strings.updateFail));
        }
        
        
    }
    useEffect(()=>{
        const searchReferralSource=async()=>{
            const result=await ReferralSourceService.search(props.id);
            console.log("Search drug in useEffect:",result.data.payload._id);
            if(result.success)
            {
                setName(result.data.payload.name);
                setPhone(result.data.payload.phone);
                setAddress(result.data.payload.address);
                setFax(result.data.payload.fax);
                setEmail(result.data.payload.email);
                setAdditionalInfo(result.data.payload.additional_info);
            }
        }
        if(props.id && name===null)
        {
            searchReferralSource();

        }
       
    })
    
    return (
        <div className={classes.container}>
            
            <div className={classes.content}>
                
              
                <Grid container className={classes.input}>
                    <Grid item xs={6} className={classes.leftContent}>
                        <div className={classes.item}>
                            <TextField className={classes.inputControl} 
                                         
                                        placeholder={t(strings.name)}  
                                        variant="outlined" 
                                        onChange={handleChangeName}
                                        value={name}
                                       
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
                            <TextField className={classes.inputControl} 
                                        required 
                                        placeholder={t(strings.phone)}  
                                        variant="outlined" 
                                        onChange={handleChangePhone}
                                        value={phone}
                                        
                                        /> 
                        </div>
                        
                    </Grid>
                    <Grid item xs={6} className={classes.rightContent}>
                    <div className={classes.item}>
                            <TextField className={classes.inputControl} 
                                        required 
                                        placeholder={t(strings.email)}  
                                        variant="outlined" 
                                        onChange={handleChangeEmail}
                                        value={email}
                                        
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
                                        placeholder={t(strings.additionalInfo)}  
                                        variant="outlined" 
                                        onChange={handleChangeAdditionalInfo}
                                        value={additionalInfo}
                                        
                                        /> 
                        </div>
                       
                    </Grid>
                </Grid>
                <div>
                    <Button variant="contained" color="primary" className={classes.updateButton} onClick={onClickUpdate}>
                        {t(strings.update)}
                    </Button>
                </div>
        </div>
    </div>
    )
}

export default UpdateReferralSource;