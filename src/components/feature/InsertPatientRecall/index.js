import React,{useState,useEffect} from 'react';
import { makeStyles  } from "@material-ui/core/styles";
//api
import PatientRecallService from "../../../api/patientRecall/patientRecall.service";
import PatientService from "../../../api/patient/patient.service";
import ProcedureService from "../../../api/procedure/procedure.service";
import AppointmentService from "../../../api/appointment/appointment.service";

//validators
import validators, {isPropValid} from '../../../utils/validators';

//translation
import { useTranslation } from 'react-i18next';

// @material-ui/core Component
import {
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




const InsertPatientRecall = (props) => {
    const {t, i18n } = useTranslation();
    const classes = useStyles();
    
    //state
   
    const [recallDate,setRecallDate]=useState(new Date());
    const [note,setNote]=useState(null);

  
    //handle change
  
    const handleChangeRecallDate=(e,date)=>{
        setRecallDate(date);
    }
    const handleChangeNote=(e)=>{
        setNote(e.target.value);
    }

    
    const insertPatientRecall=async(e)=>{
        if(note!==null && note!=="")
        {
            const data={
                patient:props.patientID,
            
                recall_date:recallDate,
                note:note,
                is_active:true,
    
             };
            const result=await PatientRecallService.insert(data);
            if(result.success)
            {
                toast.success(t(strings.insertSuccess));
                props.handleChangeIsInsert();
            }
            else
            {
                toast.error(t(strings.insertFail));
            }     
            setRecallDate(new Date());
            setNote("");
        }
        else
        {
            toast.error(t(strings.errorInput))
        }
           
            
        

    }
    
   
    useEffect(()=>{
       
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
                                        // readOnly: !editable
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
                                        multiline
                                        /> 
                        </div>
                    </Grid>
                </Grid>
                <div>
                    <Button variant="contained" color="primary" className={classes.insertButton} onClick={insertPatientRecall}>
                        {t(strings.insert)}
                    </Button>
                </div>
            </div>
        </div>
    )
   
}

export default InsertPatientRecall;