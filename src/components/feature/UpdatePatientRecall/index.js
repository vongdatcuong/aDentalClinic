import React,{useState,useEffect} from 'react';
import { makeStyles  } from "@material-ui/core/styles";
//api
import PatientRecallService from "../../../api/patientRecall/patientRecall.service";


//validators
// import validators, {isPropValid} from '../../../utils/validators';

//translation
import { useTranslation } from 'react-i18next';

// @material-ui/core Component
import { 
    FormControlLabel,
    Checkbox,
    Button,
    TextField,
    
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
//import image

//import icons


//import component

const useStyles = makeStyles(styles);




const UpdatePatientRecall = (props) => {
    const {t, i18n } = useTranslation();
    const classes = useStyles();
    
    //state
    // const [patient,setPatient]=useState(t(strings.patient));
    // const [treatment,setTreatment]=useState(t(strings.treatment));
    // const [appointment,setAppointment]=useState(t(strings.appointment));
    // const [procedure,setProcedure]=useState(t(strings.procedure));
    const [recallDate,setRecallDate]=useState(new Date());
    const [note,setNote]=useState(null);
    const [isActive,setIsActive]=useState(true);
    // const [listPatient,setListPatient]=useState([]);
    //handle change
    // const handleChangePatient=(e)=>{
    //     setPatient(e.target.value);
    // }
    // const handleChangeTreatment=(e)=>{
    //     setTreatment(e.target.value);
    // }
    // const handleChangeAppointment=(e)=>{
    //     setAppointment(e.target.value);
    // }
    // const handleChangeProcedure=(e)=>{
    //     setProcedure(e.target.value);
    // }
    const handleChangeRecallDate=(e,date)=>{
        setRecallDate(date);
    }
    const handleChangeNote=(e)=>{
        setNote(e.target.value);
    }
    const handleChangeIsActive=(e)=>{
        setIsActive(!isActive);
    }
    
    const updatePatientRecall=async(e)=>{
        if(note!==null && note!=="")
        {
            const data={
                patient:props.patientID,
             //    treatment:treatment,
             //    appointment:appointment,
             //    procedure:procedure,
                recall_date:recallDate,
                note:note,
                is_active:isActive,
             };
             const result=await PatientRecallService.update(props.id,data);
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
        else
        {
            toast.error(t(strings.errorInput));
        }
            
        

    }
    
    const getRecall=async()=>{
        const res=await PatientRecallService.search(props.id);
        if(res.success)
        {
            setIsActive(res.data.payload.is_active);
            // setPatient(res.data.payload.patient);
            setNote(res.data.payload.note);
            setRecallDate(res.data.payload.recall_date);
        }
    }
    useEffect(()=>{
        
        if(note===null)
        {
            getRecall();
        }
    })
    return (
        <div className={classes.container}>  
            <div className={classes.content}>
                <Grid container className={classes.input}>
                    <Grid item xs={6} className={classes.leftContent}>
                       
                        
                        <div className={classes.itemDate}>
                            <KeyboardDatePicker
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label={t(strings.recallDate)}
                                    format={t(strings.apiDateFormat)}
                                    value={recallDate}
                                    onChange={handleChangeRecallDate}
                                    InputProps={{
                                        disableUnderline: true,
                                        readOnly: !props.editable
                                    }}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                    
                                    className={classes.inputControlDate} 
                            />
                            
                        </div>
                       
                        
                        </Grid>
                    <Grid item xs={6} className={classes.rightContent}>
                        
                      
                        <div className={classes.item}>
                            <TextField className={classes.inputControlBig} 
                                        
                                        placeholder={t(strings.note)}  
                                        variant="outlined" 
                                        onChange={handleChangeNote}
                                        value={note}
                                        inputProps={{ readOnly: !props.editable }}
                                        multiline
                                        /> 
                        </div>
                        <div className={classes.itemSmall}>
                            <FormControlLabel
                                control={
                                <Checkbox
                                    checked={isActive}
                                    onChange={handleChangeIsActive}
                                    name={t(strings.active)}
                                    color="primary"
                                    className={classes.checkbox}
                                    inputProps={{ readOnly: !props.editable }}
                                    />
                                }
                                label={t(strings.active)}
                            />
                            <FormControlLabel
                                control={
                                <Checkbox
                                    checked={!isActive}
                                    onChange={handleChangeIsActive}
                                    name={t(strings.inactive)}
                                    color="primary"
                                    className={classes.checkbox}
                                    inputProps={{ readOnly: !props.editable }}

                                />
                                }
                                label={t(strings.inactive)}
                            />
                        </div>
                        
                       
                    </Grid>
                </Grid>
                <div>
                    <Button variant="contained" color="primary" className={classes.updateButton} onClick={updatePatientRecall}>
                        {t(strings.update)}
                    </Button>
                </div>
            </div>
        </div>
    )
   
}

export default UpdatePatientRecall;