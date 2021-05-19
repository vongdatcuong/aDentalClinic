import React,{useState,useEffect} from 'react';
import { makeStyles  } from "@material-ui/core/styles";
//api
import StaffService from '../../../api/staff/staff.service';
import PatientService from "../../../api/patient/patient.service";
import PatientReferralService from "../../../api/patientReferral/patientReferral.service";
import ReferralSourceService from "../../../api/referralSource/referralSource.service";
//validators

//translation
import { useTranslation } from 'react-i18next';

// @material-ui/core Component
import { 
    InputLabel,
    FormControl,
    FormControlLabel,
    Button,
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




const DialogReferralUpdate = (props) => {
    const {t, i18n } = useTranslation();
    const classes = useStyles();
    
    //state
    const [referral,setReferral]=useState(null);
    const [type,setType]=useState(null);
    const [listPatient,setListPatient]=useState([]);
    const [listStaff,setListStaff]=useState([]);
    const [listReferral,setListReferral]=useState([]);
    const [date,setDate]=useState(null);

    

    const handleChangeDate=(e,value)=>{
        setDate(value);
    }
    
    const handleChangeType=(e)=>{
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
            
            return <MenuItem value={a.id} key={index}>{a.name}</MenuItem>

        })
    }
    const onClickUpdate=async()=>{
        if(props.editable===true && referral!==null && date!==null && date!=="")
        {
            let dataForUpdate;
            if(type===t(strings.patient))
            {
                
                dataForUpdate={
                    referral_date:date,
                    ref_patient:referral,
                    ref_staff:null,
                    referral_source:null,
                }
            }
            if(type===t(strings.staffs))
            {
                
                dataForUpdate={
                    referral_date:date,
                    ref_patient:null,
                    ref_staff:referral,
                    referral_source:null,
                }
            }
            if(type===t(strings.existedReferral))
            {
               
                dataForUpdate={
                    referral_date:date,
                    ref_patient:null,
                    ref_staff:null,
                    referral_source:referral,
                }
            }

            
            const result=await PatientReferralService.update(props.id,dataForUpdate);
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
        if(date==="" || date===null)
        {
            toast.error(t(strings.errorInput));
        }
        
        
    }
    const searchPatientReferral=async()=>{
        const result=await PatientReferralService.search(props.id);
        if(result.success)
        {
            setDate(result.data.payload.referral_date);
            if(result.data.payload.ref_patient)
            {
                setReferral(result.data.payload.ref_patient.id);
                setType(t(strings.patient));
            }
            if(result.data.payload.ref_staff)
            {
                
                setReferral(result.data.payload.ref_staff.id);
                setType(t(strings.staffs));
            }
            if(result.data.payload.referral_source)
            {
                setReferral(result.data.payload.referral_source.id);
                setType(t(strings.existedReferral));
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
        
        if(props.id && referral===null)
        {
            searchPatientReferral();

        }
       
    })
    if(listPatient.length!==0 && listStaff.length!==0 && listReferral.length!==0 && referral!==null)
    {
        return (
            <div className={classes.container}>
                
                <div className={classes.content}>

                    {props.type==="FROM" ? 
                    <Grid container spacing={5} className={classes.input}>

                        <Grid item  className={classes.leftContent}>
                        <FormControl>
                            <InputLabel shrink>
                                {type===t(strings.existedReferral) ? 
                                t(strings.referral)
                                :
                                type===t(strings.patient) ?
                                t(strings.patient)
                                :
                                type===t(strings.staffs) &&
                                t(strings.staffs)
                                }      
                            </InputLabel>
                            <Select 
                                value={referral}
                                onChange={handleChangeReferral}
                                disableUnderline 
                                className={classes.status}
                            >
                                
                                {type===t(strings.existedReferral) ? 
                                renderListReferral()
                                :
                                type===t(strings.patient) ?
                                renderListPatient()
                                :
                                renderListStaff()
                                }        
                            </Select>
                        
                        </FormControl>
                        
                        </Grid>
                        <Grid item  className={classes.rightContent}>
                            <div style={{marginTop:'20px'}}>
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
                        
                            </div>
                       </Grid>
                    </Grid>
                    :
                    <Grid container spacing={5} className={classes.input}>
                        <Grid item  className={classes.leftContent}>
                        <FormControl>
                            <InputLabel>
                                {t(strings.referral)}
                            </InputLabel>
                            <Select 
                            value={referral}
                            onChange={handleChangeReferral}
                            disableUnderline 
                            className={classes.status}
                    >                            
                            {renderListReferral()}

    
                        </Select>
                        </FormControl>
                       
                        </Grid>
                        <Grid item  className={classes.rightContent}>
                        <div style={{marginTop:'20px'}}>

                        <FormControlLabel value={t(strings.existedReferral)} 
                                        control={<Radio 
                                                    checked={type === t(strings.existedReferral)}
                                                    onChange={handleChangeType}
                                                    value={t(strings.existedReferral)}
                                                    inputProps={{ 'aria-label': 'A' }}
                                                />} 
                                        label={t(strings.existedReferral)}  />
                        </div>
                        </Grid>
                        </Grid>
                    }
                    {props.type==="FROM" ? 
                        <Grid container spacing={5} className={classes.input}>
                            <Grid item  className={classes.leftContent}>
                               
                                
                                
                                <FormControl className={classes.item}>
                                    <KeyboardDatePicker
                                        margin="normal"
                                        id="date-picker-dialog"
                                        label={t(strings.date)}
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
                                </FormControl>
                                
                            </Grid>
                            <Grid item  className={classes.rightContent}>
                            
                            
                            
                   
              
                        </Grid>
                        </Grid>
                        :
                        <Grid container spacing={5} className={classes.input}>
                            <Grid item  className={classes.leftContent}>
                                <FormControl className={classes.item}>
                                        <KeyboardDatePicker
                                            margin="normal"
                                            id="date-picker-dialog"
                                            label={t(strings.date)}
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
                                </FormControl>
                            </Grid>
                              
                        </Grid>

                        }
                    {props.editable === true ?
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
    else
    {
        return(
            <LoadingPage/>

        )

    }
}

export default DialogReferralUpdate;