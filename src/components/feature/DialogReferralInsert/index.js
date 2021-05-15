import React,{useState,useEffect} from 'react';
import { makeStyles  } from "@material-ui/core/styles";
//api
import StaffService from '../../../api/staff/staff.service';
import PatientService from "../../../api/patient/patient.service";
import PatientReferralService from "../../../api/patientReferral/patientReferral.service";
import ReferralSourceService from "../../../api/referralSource/referralSource.service";
//validators
import validators, {isPropValid} from '../../../utils/validators';

//translation
import { useTranslation } from 'react-i18next';

// @material-ui/core Component
import { 
    
    FormControlLabel,
    Button,
    TextField,
    Radio,
    MenuItem,
    Select,

} from '@material-ui/core';
import {
    KeyboardDatePicker
} from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';

// import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';

import styles from "./jss";
// import darkTheme from "../../../themes/darkTheme";
import { toast } from 'react-toastify';

//import configs
import strings from "../../../configs/strings";
import LoadingPage from '../../../layouts/LoadingPage';

//import image

//import icons


//import component

const useStyles = makeStyles(styles);




const DialogReferralInsert = (props) => {
    const {t, i18n } = useTranslation();
    const classes = useStyles();
    
    //state
   
    const [referral,setReferral]=useState(null);
    const [type,setType]=useState(t(strings.existedReferral));
    const [listPatient,setListPatient]=useState([]);
    const [listStaff,setListStaff]=useState([]);
    const [listReferral,setListReferral]=useState([]);
    const [date,setDate]=useState(new Date());

    const [name,setName]=useState(null);
    const [phone,setPhone]=useState(null);
    const [fax,setFax]=useState(null);
    const [address,setAddress]=useState(null);
    const [email,setEmail]=useState(null);
    const [additionalInfo,setAdditionalInfo]=useState(null);
    const [nameErrorMessage,setNameErrorMessage]=useState(null);
    const [emailErrorMessage,setEmailErrorMessage]=useState(null);

    const handleChangeDate=(e,value)=>{
        setDate(value);
    }
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
    const handleChangeType=(e)=>{
        console.log("Check type:",e.target.value);
        setType(e.target.value);
    }
    const handleChangeReferral=(e)=>{
        setReferral(e.target.value);
    }
    const getPatient=async()=>{
        const res=await PatientService.getPatient();
        setListPatient(res.data);
    }
    const getReferral=async()=>{
        const res=await ReferralSourceService.getReferralSource();
        setListReferral(res.data);
    }
    const getStaff=async()=>{
        const res=await StaffService.getStaff();
        setListStaff(res.data);
    }
    const renderListPatient=(list)=>{
        return listPatient.map((a,index)=>{
            const name=a.user.first_name+" "+a.user.last_name;
            return <MenuItem value={a._id} key={index}>{name}</MenuItem>
        })
    }
    const renderListStaff=(list)=>{
        return listStaff.map((a,index)=>{
            const name=a.user.first_name+" "+a.user.last_name;
            return <MenuItem value={a._id} key={index}>{name}</MenuItem>
        })
    }
    const renderListReferral=()=>{
        return listReferral.map((a,index)=>{
            return <MenuItem value={a._id} key={index}>{a.name}</MenuItem>

        })
    }
    const insertPatientReferralClick=async()=>{
        if(referral!==null && nameErrorMessage===null && emailErrorMessage===null)
        {
            
            if(type===t(strings.patient))
            {
                const data={
                    patient:props.patientID,
                    ref_patient:referral,
                    referral_type:props.type,
                    referral_date:date,
                }
                const res=await PatientReferralService.insert(data);

                if(res.success)
                {
                    console.log("Insert patient");

                    toast.success(t(strings.insertSuccess));
                    props.handleChangeIsInsert();

                }
                else
                {
                    toast.error(t(strings.insertFail))
                }
                // if(props.type==="FROM")
                // {
                //     props.handleChangeReferredBy(res.data)
                // }
                // else
                // {
                //     props.handleChangeReferredTo(res.data)
                // }

            }
            if(type===t(strings.staffs))
            {
                const data={
                    patient:props.patientID,
                    ref_staff:referral,
                    referral_type:props.type,
                    referral_date:date,
                }
                const res=await PatientReferralService.insert(data);

                if(res.success)
                {
                    console.log("Insert staff");

                    toast.success(t(strings.insertSuccess));
                    props.handleChangeIsInsert();

                }
                else
                {
                    toast.error(t(strings.insertFail))
                }
                // if(props.type==="FROM")
                // {
                //     props.handleChangeReferredBy(res.data)
                // }
                // else
                // {
                //     props.handleChangeReferredTo(res.data)
                // }
            }
            if(type===t(strings.existedReferral))
            {
                const data={
                    patient:props.patientID,
                    referral_source:referral,
                    referral_type:props.type,
                    referral_date:date,
                }
                const res=await PatientReferralService.insert(data);

                if(res.success)
                {
                    toast.success(t(strings.insertSuccess));
                    props.handleChangeIsInsert();
                    console.log("Insert existed referral");
                }
                else
                {
                    toast.error(t(strings.insertFail))
                }
                // if(props.type==="FROM")
                // {
                //     props.handleChangeReferredBy(res.data)
                // }
                // else
                // {
                //     props.handleChangeReferredTo(res.data)
                // }
            }
        
        }
        if(referral===null &&nameErrorMessage===null && emailErrorMessage===null)
        {
            console.log("Vao day new referral:",type)
            const dataReferralSource={
                name:name,
                phone:phone,
                fax:fax,
                address:address,
                email:email,
                additional_info:additionalInfo
            }
            const insertReferralSource=await ReferralSourceService.insert(dataReferralSource);
            if(insertReferralSource.data)
            {
                const referralSourceId=insertReferralSource.data._id;
                const dataPatientReferral={
                    patient:props.patientID,
                    referral_source:referralSourceId,
                    referral_type:props.type,
                    referral_date:date,
                };
               
                const insertPatientReferral=await PatientReferralService.insert(dataPatientReferral);
                console.log("Check insert referral:",insertPatientReferral);
                if(insertPatientReferral.success)
                {
                    toast.success(t(strings.insertSuccess))
                    props.handleChangeIsInsert();
                }
                else
                {
                    toast.error(t(strings.insertFail))
                }
                // if(props.type==="FROM")
                // {
                //     props.handleChangeReferredBy(insertPatientReferral.data)
                // }
                // else
                // {
                //     props.handleChangeReferredTo(insertPatientReferral.data)
                // }
            }
        }

    }
    
    useEffect(()=>{
        if(listPatient.length===0 && listStaff.length===0 && listReferral.length===0)
        {
            getPatient();
            getStaff();
            getReferral();

        }
        if(!isPropValid(validators.properties.name, name) && type===t(strings.newReferral))
        {
            setNameErrorMessage(t(strings.nameErrMsg));
        }
        
        if(nameErrorMessage!==null && isPropValid(validators.properties.name, name))
        {
            setNameErrorMessage(null);
        }
        
        if(!isPropValid(validators.properties.email, email) && type===t(strings.newReferral))
        {
            setEmailErrorMessage(t(strings.emailErrMsg));
        }
        if(emailErrorMessage!==null && isPropValid(validators.properties.email, email))
        {
            setEmailErrorMessage(null);
        }
       
    })
    if(listPatient.length!==0 && listStaff.length!==0 && listReferral.length!==0)
    {
        return (
            <div className={classes.container}>
                
                <div className={classes.content}>
                    
                    {props.type==="FROM" ? 
                    <Grid container spacing={5} className={classes.input}>
                        <Grid item xs={6} className={classes.leftContent}>

                        <Select 
                                value={referral}
                                onChange={handleChangeReferral}
                                disableUnderline 
                                className={classes.status}
                                disabled={type===t(strings.newReferral)}
                        >
                                {type===t(strings.existedReferral) ? 
                                <MenuItem value={null}>{t(strings.referral)}</MenuItem>
                                :
                                type===t(strings.patient) ?
                                <MenuItem value={null}>{t(strings.patient)}</MenuItem>
                                :
                                type===t(strings.staffs) &&
                                <MenuItem value={null}>{t(strings.staffs)}</MenuItem>
                                }      
                                {type===t(strings.existedReferral) ? 
                                renderListReferral()
                                :
                                type===t(strings.patient) ?
                                renderListPatient()
                                :
                                renderListStaff()
                                }        
                        </Select>
                        </Grid>
                        <Grid item xs={6} className={classes.rightContent}>

                        <FormControlLabel value={t(strings.patient)} 
                                         control={<Radio 
                                                     checked={type === t(strings.patient)}
                                                     onChange={handleChangeType}
                                                     value={t(strings.patient)}
                                                     inputProps={{ 'aria-label': 'A' }}
                                                 />} 
                                         label={t(strings.patient)}  />
    
                        <FormControlLabel value={t(strings.staffs)} 
                                        control={<Radio 
                                                     checked={type === t(strings.staffs)}
                                                     onChange={handleChangeType}
                                                     value={t(strings.staffs)}
                                                     inputProps={{ 'aria-label': 'A' }}
                                            />} 
                                         label={t(strings.staffs)}  />                   
                        <FormControlLabel value={t(strings.existedReferral)} 
                                         control={<Radio 
                                                     checked={type === t(strings.existedReferral)}
                                                     onChange={handleChangeType}
                                                     value={t(strings.existedReferral)}
                                                     inputProps={{ 'aria-label': 'A' }}
                                                 />} 
                                         label={t(strings.existedReferral)}  />
                        <FormControlLabel value={t(strings.newReferral)} 
                                         control={<Radio 
                                                     checked={type === t(strings.newReferral)}
                                                     onChange={handleChangeType}
                                                     value={t(strings.newReferral)}
                                                     inputProps={{ 'aria-label': 'A' }}
                                                 />} 
                                         label={t(strings.newReferral)}  /> 
                        </Grid>
                    </Grid>
                    :
                    <Grid container spacing={5} className={classes.input}>
                        <Grid item xs={6} className={classes.leftContent}>

                        <Select 
                            value={referral}
                            onChange={handleChangeReferral}
                            disableUnderline 
                            className={classes.status}
                    >
                            <MenuItem value={t(strings.referral)}>{t(strings.referral)}</MenuItem>
                            
                            {renderListReferral()}

    
                        </Select>
                        </Grid>
                        <Grid item xs={6} className={classes.rightContent}>

                        <FormControlLabel value={t(strings.existedReferral)} 
                                        control={<Radio 
                                                    checked={type === t(strings.existedReferral)}
                                                    onChange={handleChangeType}
                                                    value={t(strings.existedReferral)}
                                                    inputProps={{ 'aria-label': 'A' }}
                                                />} 
                                        label={t(strings.existedReferral)}  />
                        
                       
                        </Grid>
                    </Grid>
                    }
                    {props.type==="FROM" ? 
                        <Grid container spacing={5} className={classes.input}>
                            <Grid item xs={6} className={classes.leftContent}>
                                <div className={classes.item}>
                                    
                                    <TextField className={classes.inputControl} 
                                                required 
                                                placeholder={t(strings.name)}  
                                                variant="outlined" 
                                                onChange={handleChangeName}
                                                value={name}
                                                disabled={type!==t(strings.newReferral)}
                                                error={nameErrorMessage !== null}
                                                helperText={nameErrorMessage}
                                                /> 
                                </div>
                                <div className={classes.item}>
                                    <TextField className={classes.inputControl} 
                                                required 
                                                placeholder={t(strings.address)}  
                                                variant="outlined" 
                                                onChange={handleChangeAddress}
                                                value={address}
                                                disabled={type!==t(strings.newReferral)}
                                                /> 
                                </div>
                                <div className={classes.item}>
                                    <TextField className={classes.inputControl} 
                                                required 
                                                placeholder={t(strings.phone)}  
                                                variant="outlined" 
                                                onChange={handleChangePhone}
                                                value={phone}
                                                disabled={type!==t(strings.newReferral)}

                                                /> 
                                </div>
                                
                                <div className={classes.item}>
                                    <KeyboardDatePicker
                                        margin="normal"
                                        id="date-picker-dialog"
                                        placeholder={t(strings.date)}
                                        format={t(strings.apiDateFormat)}
                                        value={date}
                                        onChange={handleChangeDate}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                        InputProps={{
                                            disableUnderline: true,
                                            
                                        }}
                                        className={classes.inputControlDate} 
                                    />
                                </div>
                                
                            </Grid>
                            <Grid item xs={6} className={classes.rightContent}>
                            
                            <div className={classes.item}>
                                <TextField className={classes.inputControl} 
                                            required 
                                            placeholder={t(strings.fax)}  
                                            variant="outlined" 
                                            onChange={handleChangeFax}
                                            value={fax}
                                            disabled={type!==t(strings.newReferral)}

                                            /> 
                            </div>
                            <div className={classes.item}>
                                <TextField className={classes.inputControl} 
                                            placeholder={t(strings.email)}  
                                            variant="outlined" 
                                            onChange={handleChangeEmail}
                                            value={email}
                                            disabled={type!==t(strings.newReferral)}
                                            error={emailErrorMessage !== null}
                                            helperText={emailErrorMessage}
                                            /> 
                            </div>
                            
                   
                            <div className={classes.item}>
                                <TextField className={classes.inputControlBig} 
                                            placeholder={t(strings.additionalInfo)}  
                                            variant="outlined" 
                                            onChange={handleChangeAdditionalInfo}
                                            value={additionalInfo}
                                            disabled={type!==t(strings.newReferral)}
                                            multiline
                                            /> 

                            </div>
              
                        </Grid>
                        </Grid>
                        :
                        <Grid container spacing={5} className={classes.input}>
                            <Grid item xs={6} className={classes.leftContent}>

                                <div className={classes.item}>
                                        <KeyboardDatePicker
                                            margin="normal"
                                            id="date-picker-dialog"
                                            placeholder={t(strings.date)}
                                            format={t(strings.apiDateFormat)}
                                            value={date}
                                            onChange={handleChangeDate}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                            InputProps={{
                                                disableUnderline: true,
                                                
                                            }}
                                            className={classes.inputControlDateSmall} 
                                        />
                                </div>
                            </Grid>
                              
                        </Grid>

                        }
                    <div>
                        <Button variant="contained" color="primary" className={classes.insertButton} onClick={insertPatientReferralClick}>
                            {t(strings.insert)}
                        </Button>
                    </div>
            </div>
        </div>
        )
    }
    else
    {
        return(
            <LoadingPage/>

        )

    }
    
}

export default DialogReferralInsert;