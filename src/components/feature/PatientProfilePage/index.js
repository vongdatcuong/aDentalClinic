import React,{useState,useEffect} from 'react';
import { makeStyles, useTheme  } from "@material-ui/core/styles";

// @material-ui/core Component
import Container from '@material-ui/core/Container';
import styles from "./jss";
import strings from '../../../configs/strings';
import logoADC from '../../../assets/images/logoADC.png'
// use i18next
import { useTranslation, Trans } from 'react-i18next';
import {toast} from 'react-toastify';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { Tabs, Tab, TextareaAutosize, TextField } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import LinearProgress from '@material-ui/core/LinearProgress';

// Component
import PopupChat from '../../common/Messenger/PopupChat';
import TabPanel from '../../common/TabPanel';
import TreatmentHistory from './TreatmentHistory.js';
import TreatmentMenu from '../../../layouts/TreatmentMenu';

// utils
import ConvertDateTimes from '../../../utils/datetimes/convertDateTimes';
import PatientService from "../../../api/patient/patient.service";

const useStyles = makeStyles(styles);

const PatientProfilePage = ({ patientID }) => {
    const {t, i18n } = useTranslation();
    const classes = useStyles();

    const [curTab, setCurTab] = React.useState(0);
    const [fullname, setFullname] = useState("unknown");
    const [gender, setGender] = useState("unknown");
    const [age, setAge] = useState("unknown");
    const [medicalIssues, setMedicalIssues] = useState("");
    const [plaqueIndex, setPlaqueIndex] = useState(0);
    const [bleedingIndex, setBleedingIndex] = useState(0);
    const [halitosis, setHalitosis] = useState(0);
    const [editMedicalIssues, setEditMedicalIssues] = useState(false);
    const [editOralHeath, setEditOralHeath] = useState(false);

    const handleChangeTab = (event, newTab) => {
        setCurTab(newTab);
    };

    function a11yProps(index) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
      };

    useEffect(()=>{
    
        const getPatientProfile=async()=>{
            try {
                const result=await PatientService.getPatientProfile(patientID);
                if (result.success){
                    setFullname(result.data.payload.user.first_name + " " + result.data.payload.user.last_name);
                    setGender(result.data.payload.gender);
                    const currentYear = new Date().getFullYear();
                    setAge(currentYear - ConvertDateTimes.formatDate(result.data.payload.dob, "YYYY"));
                    setMedicalIssues(result.data.payload.medical_alert);
                    setPlaqueIndex(result.data.payload.plaque_index);
                    setBleedingIndex(result.data.payload.bleeding_index);
                    setHalitosis(result.data.payload.halitosis);
                    return true;
                }
                toast.error(result.message);
                return false;
            } 
            catch(err)  {
                toast.error(t(strings.errorLoadData));    
                return false;
            }
        };
        getPatientProfile();
    }, []);

    const handleClickEditMedicalIssues=(e)=>{
        if (editMedicalIssues) {
            const updatePatientProfile=async()=>{
                try {
                    const data = { medical_alert: medicalIssues }
                    const result = await PatientService.update(patientID,data);
                    if (result.success){
                        return true;
                    }
                    toast.error(result.message);
                    return false;
                } 
                catch(err)  {
                    toast.error(t(strings.updateFail));    
                    return false;
                }
            };
            updatePatientProfile();
        }
        setEditMedicalIssues(!editMedicalIssues);
    };
    const handleClickEditOralHeath=(e)=>{
        if (editOralHeath) {
            const updatePatientProfile=async()=>{
                try {
                    const data = { plaque_index: parseInt(plaqueIndex), bleeding_index: parseInt(bleedingIndex), halitosis: parseInt(halitosis) }
                    const result = await PatientService.update(patientID,data);
                    if (result.success){
                        return true;
                    }
                    toast.error(result.message);
                    return false;
                } 
                catch(err)  {
                    toast.error(t(strings.updateFail));    
                    return false;
                }
            };
            updatePatientProfile();
        }
        setEditOralHeath(!editOralHeath);
    };
    const handleChangeMedicalIssues = (event) => {
        setMedicalIssues(event.target.value);
    }
    const handleChangePlaqueIndex = (event) => {
        setPlaqueIndex(event.target.value);
    }
    const handleChangeBleedingIndex = (event) => {
        setBleedingIndex(event.target.value);
    }

    const handleChangeHalitosis = (event) => {
        setHalitosis(event.target.value);
    }


    return (  <React.Fragment>
        <TreatmentMenu patientID = { patientID }/>
        <Container className={classes.container}>
            <PopupChat></PopupChat>
            <Grid container>
                <Grid item xs={9} sm={9} md={9} className={classes.leftGrid}>
                    <Grid container className={classes.headerInfo}>
                        <Typography component="h1" variant="h5" className={classes.patientName}>
                            {fullname}
                        </Typography>
                        <div className={classes.patientAgeGender}>
                            {gender}, {age}y
                        </div>
                    </Grid>
                    <Grid container className={classes.detailProfileContainer}>
                        <Grid item>
                            <Tabs value={curTab} onChange={handleChangeTab} indicatorColor="primary" textColor="primary">
                                    <Tab label={t(strings.treatmentPlan).toUpperCase()} {...a11yProps(0)} />
                                    <Tab label={t(strings.history).toUpperCase()} {...a11yProps(1)} />
                            </Tabs>
                            <Grid item>
                                <TabPanel value={curTab} index={0}>
                                    {t(strings.noTreatmentsPending)}
                                </TabPanel>
                                <TabPanel value={curTab} index={1}>
                                    <TreatmentHistory></TreatmentHistory>
                                </TabPanel>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={3} sm={3} md={3} className={classes.rightGrid}>
                    <Grid container className={classes.oralHeathContainer}>
                        <Typography component="h1" variant="h6" className={classes.oralHeathHeader}>
                            {t(strings.oralHealth)} 
                            <Button color="primary" onClick={handleClickEditOralHeath} className={classes.btnEdit} simple>{editOralHeath ? t(strings.save) : t(strings.edit)}</Button>
                        </Typography>
                        <span>{t(strings.plaqueIndex).toUpperCase()}: 
                            <input type="number" min="0" max="5" className={classes.inputOralHeath} value={plaqueIndex} onChange={handleChangePlaqueIndex} disabled={!editOralHeath} /></span>
                        <br></br>
                        <span className={classes.linearProgressBarContainer}>
                            <LinearProgress variant="determinate" value={plaqueIndex*20} className={classes.linearProgressBar}></LinearProgress>
                        </span>
                        
                        <span>{t(strings.bleedingIndex).toUpperCase()}: 
                            <input type="number" min="0" max="5" className={classes.inputOralHeath} value={bleedingIndex} onChange={handleChangeBleedingIndex} disabled={!editOralHeath} /></span>
                        <br></br>
                        <span className={classes.linearProgressBarContainer}>
                            <LinearProgress variant="determinate" value={bleedingIndex*20} className={classes.linearProgressBar}></LinearProgress>
                        </span>
                        
                        <span>{t(strings.halitosis).toUpperCase()}: 
                            <input type="number" min="0" max="5" className={classes.inputOralHeath} value={halitosis} onChange={handleChangeHalitosis} disabled={!editOralHeath} /></span>
                        <br></br>
                        <span className={classes.linearProgressBarContainer}>
                            <LinearProgress variant="determinate" value={halitosis*20} className={classes.linearProgressBar}></LinearProgress>
                        </span>
                    </Grid>
                    <Grid container className={classes.medicalIssuesContainer}>
                        <Typography component="h1" variant="h6" className={classes.medicalIssuesHeader}>
                            {t(strings.medicalIssues)} <Button color="primary" onClick={handleClickEditMedicalIssues} className={classes.btnEdit} simple>{editMedicalIssues ? t(strings.save) : t(strings.edit)}</Button>
                        </Typography>
                        <TextField
                            id="outlined-multiline-static"
                            multiline
                            rows={15}
                            value={medicalIssues}
                            onChange={handleChangeMedicalIssues}
                            variant="outlined"
                            disabled={!editMedicalIssues}
                            />
                    </Grid>
                </Grid>
            </Grid>
        </Container></React.Fragment>
    )
}

export default PatientProfilePage;