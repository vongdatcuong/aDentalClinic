import React,{useState,useEffect} from 'react';
import { makeStyles, useTheme  } from "@material-ui/core/styles";
//api
import PatientRecallService from "../../../api/patientRecall/patientRecall.service";
import PatientService from "../../../api/patient/patient.service";
import ProcedureService from "../../../api/procedure/procedure.service";

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
    TextField,
    Select,
    MenuItem,
 } from '@material-ui/core';
import {
    KeyboardDatePicker
} from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';

import styles from "./jss";
import darkTheme from "../../../themes/darkTheme";
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
    const [patient,setPatient]=useState(t(strings.patient));
    const [treatment,setTreatment]=useState(t(strings.treatment));
    const [appointment,setAppointment]=useState(t(strings.appointment));
    const [procedure,setProcedure]=useState(t(strings.procedure));
    const [recallDate,setRecallDate]=useState(new Date());
    const [note,setNote]=useState(null);

    const [listPatient,setListPatient]=useState([]);
    const [listProcedure,setListProcedure]=useState([]);
    //handle change
    const handleChangePatient=(e)=>{
        setPatient(e.target.value);
    }
    const handleChangeTreatment=(e)=>{
        setTreatment(e.target.value);
    }
    const handleChangeAppointment=(e)=>{
        setAppointment(e.target.value);
    }
    const handleChangeProcedure=(e)=>{
        setProcedure(e.target.value);
    }
    const handleChangeRecallDate=(e,date)=>{
        setRecallDate(date);
    }
    const handleChangeNote=(e)=>{
        setNote(e.target.value);
    }

    
    const insertPatientRecall=async(e)=>{
        console.log("Insert recall");
            const data={
               patient:patient,
               treatment:treatment,
               appointment:appointment,
               procedure:procedure,
               recall_date:recallDate,
               note:note
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
        

    }
    const renderListPatient=()=>{
        return listPatient.map((patient,index)=>{
            return <MenuItem key={index} value={patient._id}>{patient.user.first_name} {patient.user.last_name}</MenuItem>
        })
    }
    const renderListProcedure=()=>{
        return listProcedure.map((procedure,index)=>{
            return <MenuItem key={index} value={procedure._id}>{procedure.description}</MenuItem>
        })
    }
    const getListPatient=async()=>{
        const res=await PatientService.getPatient();
        if(res.success)
        {
            setListPatient(res.data);
        }
    }
    const getListProcedure=async()=>{
        const res=await ProcedureService.getProcedure();
        if(res.success)
        {
            setListProcedure(res.data);
        }
    }
    useEffect(()=>{
        if(listPatient.length===0)
        {
            getListPatient();
        }
        if(listProcedure.length===0)
        {
            getListProcedure();
        }
    })
    return (
        <div className={classes.container}>  
            <div className={classes.content}>
                <Grid container className={classes.input}>
                    <Grid item xs={6} className={classes.leftContent}>
                        {listPatient.length!==0 ?
                        <div className={classes.itemSelect}>
                            <Select
                                
                                value={patient}
                                onChange={handleChangePatient}
                                disableUnderline 
                                className={classes.status}
                                >
                                <MenuItem value={t(strings.patient)}>{t(strings.patient)}</MenuItem>
                                {renderListPatient()}

                            </Select>
                    
                        </div>
                        :
                        <div></div>
                        }
                        <div className={classes.itemSelect}>
                            <Select
                                
                                value={appointment}
                                onChange={handleChangeAppointment}
                                disableUnderline 
                                className={classes.status}
                                >
                                <MenuItem value={t(strings.appointment)}>{t(strings.appointment)}</MenuItem>

                            </Select>
                    
                        </div>
                        
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
                            {/* <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                placeholder={t(strings.recallDate)}
                                format={t(strings.apiDateFormat)}
                                value={recallDate}
                                onChange={handleChangeRecallDate}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                className={classes.inputControl} 
                            /> */}
                        </div>
                       
                        
                        </Grid>
                    <Grid item xs={6} className={classes.rightContent}>
                        <div className={classes.itemSelect}>
                            <Select
                                
                                value={treatment}
                                onChange={handleChangeTreatment}
                                disableUnderline 
                                className={classes.status}
                                >
                                <MenuItem value={t(strings.treatment)}>{t(strings.treatment)}</MenuItem>

                            </Select>
                    
                        </div>
                        {listProcedure.length!==0 ?
                        <div className={classes.itemSelect}>
                            <Select
                                
                                value={procedure}
                                onChange={handleChangeProcedure}
                                disableUnderline 
                                className={classes.status}
                                >
                                <MenuItem value={t(strings.procedure)}>{t(strings.procedure)}</MenuItem>
                                {renderListProcedure()}
                            </Select>
                    
                        </div>
                        :
                        <div></div>
                        }
                        <div className={classes.item}>
                            <TextField className={classes.inputControl} 
                                        
                                        placeholder={t(strings.note)}  
                                        variant="outlined" 
                                        onChange={handleChangeNote}
                                        value={note}
                                        
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