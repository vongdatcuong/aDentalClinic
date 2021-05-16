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
    


    const onClickUpdate=async()=>{
        if(props.editable===true && nameErrorMessage===null && emailErrorMessage===null)
        {
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
        const searchReferralSource=async()=>{
            const result=await ReferralSourceService.search(props.id);
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
                        <div className={classes.item}>
                            <TextField className={classes.inputControl} 
                                         
                                        placeholder={t(strings.name)}  
                                        variant="outlined" 
                                        onChange={handleChangeName}
                                        value={name}
                                        inputProps={{ readOnly: !props.editable }}
                                        error={nameErrorMessage !== null}
                                        helperText={nameErrorMessage}
                                        /> 
                        </div>
                        <div className={classes.item}>
                            <TextField className={classes.inputControl} 
                                        
                                        placeholder={t(strings.address)}  
                                        variant="outlined" 
                                        onChange={handleChangeAddress}
                                        value={address}
                                        inputProps={{ readOnly: !props.editable }}

                                        /> 
                        </div>
                        <div className={classes.item}>
                            <TextField className={classes.inputControl} 
                                        required 
                                        placeholder={t(strings.phone)}  
                                        variant="outlined" 
                                        onChange={handleChangePhone}
                                        value={phone}
                                        inputProps={{ readOnly: !props.editable }}
                                        
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
                                        inputProps={{ readOnly: !props.editable }}
                                        error={emailErrorMessage !== null}
                                        helperText={emailErrorMessage}
                                        /> 
                        </div>
                        <div className={classes.item}>
                            <TextField className={classes.inputControl} 
                                        placeholder={t(strings.fax)}  
                                        variant="outlined" 
                                        onChange={handleChangeFax}
                                        value={fax}
                                        inputProps={{ readOnly: !props.editable }}

                                        /> 
                        </div>
                        <div className={classes.item}>
                            <TextField className={classes.inputControlBig} 
                                        placeholder={t(strings.additionalInfo)}  
                                        variant="outlined" 
                                        onChange={handleChangeAdditionalInfo}
                                        value={additionalInfo}
                                        inputProps={{ readOnly: !props.editable }}
                                        multiline
                                        /> 
                        </div>
                       
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
                
        </div>
    </div>
    )
}

export default UpdateReferralSource;