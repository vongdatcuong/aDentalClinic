import React, { useState, useEffect, useContext, useRef, useCallback } from 'react';
import { makeStyles, useTheme  } from "@material-ui/core/styles";
import strings from '../../../../configs/strings';
import figures from '../../../../configs/figures';
import lists from '../../../../configs/lists';
import clsx from 'clsx';

// moment
import moment from 'moment';

// i18next
import { useTranslation } from 'react-i18next';

// Toast
import { toast } from 'react-toastify';

// @material-ui/core Component
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import FormHelperText from '@material-ui/core/FormHelperText';
import Tooltip from '@material-ui/core/Tooltip';

// @material-ui/core Datepicker
import { DatePicker, TimePicker  } from "@material-ui/pickers";

// React-select
import AsyncSelect from 'react-select/async';

import styles from "./jss";

// Components
import RecallDialog from './RecallDialog';
import TreatmentDialog from './TreatmentDialog';
import AddTreatmentDialog from './AddTreatmentDialog';

// Icons
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AddIcon from '@material-ui/icons/Add';
import InsertLinkIcon from '@material-ui/icons/InsertLink';
import DateRangeIcon from '@material-ui/icons/DateRange';

// Utils
import ConvertDateTimes from '../../../../utils/datetimes/convertDateTimes';

// Context
import { loadingStore } from '../../../../contexts/loading-context';

// Validate
import validators, { isPropValid } from '../../../../utils/validators';

// API
import api from '../../../../api/base-api';
import apiPath from '../../../../api/path';

const useStyles = makeStyles(styles);

const AppointmentTab = ({
    selectedChairId, selectedAppointStart, selectedDuration, chairs, cellDuration, startDayHour, endDayHour, holidays,
    onClose, onSelectChair, onSelectDate, onAddAppointment
}) => {
    const classes = useStyles();
    const [t, i18n] = useTranslation();
    const { loadingState, dispatchLoading } = useContext(loadingStore);
    
    // Select patient style
    const selectPatientStyle = {
        menu: ({...provided}, state) => ({
            ...provided,
            zIndex: 2
            
        }),
    };
    const startDayHourMins = moment.duration(startDayHour).asMinutes();
    const endDayHourMins = moment.duration(endDayHour).asMinutes();

    // None option
    const noneOption = {value: "", label: t(strings.none)};

    // States
    const [isNewPatient, setIsNewPatient] = useState(true);

    const [patient, setPatient] = useState(noneOption);
    //const [patientID, setPatientID] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [homePhone, setHomePhone] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [assistant, setAssistant] = useState(null);
    const [provider, setProvider] = useState(null);
    const [staging, setStaging] = useState(lists.appointment.staging.new);
    const [duration, setDuration] = useState(selectedDuration);
    const [note, setNote] = useState("");

    const [firstNameErrMsg, setFirstNameErrMsg] = useState("");
    const [lastNameErrMsg, setLastNameErrMsg] = useState("");
    const [homePhoneErrMsg, setHomePhoneErrMsg] = useState("");
    const [mobileErrMsg, setMobileErrMsg] = useState("");
    const [emailErrMsg, setEmailErrMsg] = useState("");
    const [providerErrMsg, setProviderErrMsg] = useState("");
    const [dateErrMsg, setDateErrMsg] = useState("");
    const [timeErrMsg, setTimeErrMsg] = useState("");

    // Ref
    const patientIDRef = useRef(null);
    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const homePhoneRef = useRef(null);
    const mobileRef = useRef(null);
    const emailRef = useRef(null);
    const noteRef = useRef(null);

    let noneStr = t(strings.none);

    // Duration options
    const durationOptions = [];
    for (let i = cellDuration; i <= figures.maxAppointmentDuration; i+=cellDuration){
        durationOptions.push(<MenuItem key={i} value={i}>{i}</MenuItem>);
    }
    // Recalls
    const [recalls, setRecalls] = useState([]);

    // Treatments
    const [treatments, setTreatments] = useState([]);
    const [addedTreatments, setAddedTreatments] = useState([]);

    // Dialogs
    const [openRecallDialog, setOpenRecallDialog] = useState(false);
    const [openTreatmentDialog, setOpenTreatmentDialog] = useState(false);
    const [openAddTreatmentDialog, setOpenAddTreatmentDialog] = useState(false);

    // Temp
    const [fakeTempProvi, setFakeTempProvi] = useState(1);

    useEffect(async () => {
        setDuration(selectedDuration);
        setFakeTempProvi(fakeTempProvi + 1);
    }, [/*treatments, addedTreatments, patient,*/ selectedDuration, selectedAppointStart]);

    const handleOnNewPatient = () => {
        setIsNewPatient(true);
        setPatient({...noneOption});
        //setPatientID("");
        setFirstName("");
        setLastName("");
        setHomePhone("");
        setMobile("");
        setEmail("");

        setAssistant(noneOption);
        setProvider(noneOption);

        setRecalls([]);
        setTreatments([]);
        setAddedTreatments([]);

        // Ref
        patientIDRef.current.value = "";
        firstNameRef.current.value = "";
        lastNameRef.current.value = "";
        homePhoneRef.current.value = "";
        mobileRef.current.value = "";
        emailRef.current.value = "";
        noteRef.current.value = "";
    }

    const handleOnSelectPatient = useCallback(async (option) => {
        if (option.value == -1){
            handleOnNewPatient();
            return;
        } else if (option.value == patient.value){
            return;
        }
        try {
            dispatchLoading({ type: strings.setLoading, isLoading: true});
            const promises = [
                api.httpGet({
                    url: apiPath.patient.patient + '/' + option.value,
                    query: {
                        get_provider: true,
                    }
                }),
            ];
            const result = await Promise.all(promises);
            if (result[0].success){
                //setPatientID(option.value);
                const patient = result[0].payload;
                const patientUser = patient?.user;
                if (patient && patientUser){
                    setIsNewPatient(false);
                    //setPatientID(patient._id || "");
                    setFirstName(patientUser.first_name || "");
                    setLastName(patientUser.last_name || "");
                    setHomePhone(patientUser.home_phone || "");
                    setMobile(patientUser.mobile_phone || "");
                    setEmail(patientUser.email || "");

                    // Ref
                    patientIDRef.current.value = patient.patient_id;
                    firstNameRef.current.value = patientUser.first_name || noneStr;
                    lastNameRef.current.value = patientUser.last_name || noneStr;
                    homePhoneRef.current.value = patientUser.home_phone || noneStr;
                    mobileRef.current.value = patientUser.mobile_phone || noneStr;
                    emailRef.current.value = patientUser.email || noneStr;

                    // Set Default Provider
                    const provi = patient.provider;
                    setPatient({...option, provider: provi._id});
                    if (provi && provi._id){
                        try {
                            const res = await api.httpGet({
                                url: apiPath.staff.schedule + apiPath.staff.provider + '/' + provi._id + '/' + ConvertDateTimes.formatDate(selectedAppointStart, strings.apiDateFormat),
                            })
                            if (res.success && res.payload){
                                const proviUser = provi.user;
                                setProvider({
                                    value: provi._id,
                                    label: `${proviUser.first_name} ${proviUser.last_name} (${provi.display_id})`
                                });
                            } else {
                                setProvider(noneOption);
                            }
                        } catch(err){
                            console.log(err);
                            setProvider(noneOption);
                        }
                    }
                }
                setRecalls([]);
                setTreatments([]);
                setAddedTreatments([]);
            } else {
                toast.error(result.message);
            }
        } catch(err){
            toast.error(t(strings.loadPatientErrMsg));
        } finally {
            dispatchLoading({ type: strings.setLoading, isLoading: false});
        }
    }, [patient, patientIDRef, firstNameRef, lastNameRef, homePhoneRef, mobileRef, emailRef, selectedAppointStart]);

    const handleOnFirstNameChange = (evt) => {
        setFirstName(evt.target.value);
    }

    const handleOnLastNameChange = (evt) => {
        setLastName(evt.target.value);
    }

    const handleOnHomePhoneChange = (evt) => {
        setHomePhone(evt.target.value);
    }

    const handleOnMobileChange = (evt) => {
        setMobile(evt.target.value);
    }

    const handleOnEmailChange = (evt) => {
        setEmail(evt.target.value);
    }

    const handleOnAssistantChange = (option) => {
        setAssistant(option);
    }

    const handleOnProviderChange = (option) => {
        setProvider(option);
    }

    const handleOnStagingChange = (evt) => {
        setStaging(evt.target.value);
    }

    const handleOnDateChange = (date) => {
        onSelectDate("date", date._d);
        setRecalls([]);
        setTreatments([]);

        // Load provider
        setFakeTempProvi(fakeTempProvi + 1);
    }

    const handleOnTimeChange = (date) => {
        onSelectDate("time", date._d);
    }

    const handleOnDurationChange = (evt) => {
        setDuration(evt.target.value);
    }

    const handleOnNoteChange = (evt) => {
        setNote(evt.target.value);
    }

    const handleAddAppointment = async (evt) => {
        evt.preventDefault();

        let isValid = true;
        // First name
        if (isNewPatient && !isPropValid(validators.properties.firstName, firstName)){
            setFirstNameErrMsg(t(strings.firstNameErrMsgShort));
            isValid = false;
        } else {
            setFirstNameErrMsg("");
        }

        // Last name
        if (isNewPatient && !isPropValid(validators.properties.lastName, lastName)){
            setLastNameErrMsg(t(strings.lastNameErrMsgShort));
            isValid = false;
        } else {
            setLastNameErrMsg("");
        }

        // Home phone
        if (isNewPatient && !isPropValid(validators.properties.phone, homePhone)){
            setHomePhoneErrMsg(t(strings.phoneErrMsg));
            isValid = false;
        } else {
            setHomePhoneErrMsg("");
        }

        // Mobile phone
        if (isNewPatient && !isPropValid(validators.properties.phone, mobile)){
            setMobileErrMsg(t(strings.phoneErrMsg));
            isValid = false;
        } else {
            setMobileErrMsg("");
        }

        // Email
        if (isNewPatient && !isPropValid(validators.properties.email, email)){
            setEmailErrMsg(t(strings.emailErrMsg));
            isValid = false;
        } else {
            setEmailErrMsg("");
        }

        // Provider
        if (!isPropValid(validators.properties.provider, provider?.value || "")){
            setProviderErrMsg(t(strings.appointProviderErrMsg));
            isValid = false;
        } else {
            setProviderErrMsg("");
        }

        // Holiday
        if (holidays[selectedAppointStart.getMonth() + 1][selectedAppointStart.getDate()]){
            setDateErrMsg(t(strings.appointHolidayErrMsg));
            isValid = false;
        } else {
            setDateErrMsg("");
        }

        // Time
        const selectedTime = (selectedAppointStart)? selectedAppointStart.getHours() * 60 + selectedAppointStart.getMinutes() : 0;
        if (selectedTime < startDayHourMins|| selectedTime > endDayHourMins){
            setTimeErrMsg(t(strings.appointTimeErrMsg));
            isValid = false;
        } else {
            setTimeErrMsg("");
        }

        if (isValid){
            // Add appointment
            const patientData = {
                first_name: firstName,
                last_name: lastName,
                home_phone: homePhone,
                mobile_phone: mobile,
                email: email,
                new_patient: true
            };
            const selectedAppointStartMoment = moment(selectedAppointStart);
            if (selectedAppointStartMoment.isValid()){
                const appointTime = selectedAppointStartMoment.format("HHmm"); 
                const startOfSelectedDate = selectedAppointStartMoment.utc().startOf('day');
                let startDayNum = Number(startDayHour.slice(0, 2)) + Number(startDayHour.slice(3)) / 60,
                    endDayNum = Number(endDayHour.slice(0, 2)) + Number(endDayHour.slice(3)) / 60,
                    appointTimeNum = Number(appointTime.slice(0, 2)) + Number(appointTime.slice(2)) / 60;
                    appointTimeNum+= duration/60;
                if (appointTimeNum >= startDayNum && appointTimeNum <= endDayNum){
                    const appointData = {
                        patient: patient?.value || "",
                        provider: provider?.value || "",
                        assistant: assistant?.value || "",
                        chair: selectedChairId,
                        appointment_date:  startOfSelectedDate._d,
                        appointment_time: appointTime,
                        duration: duration,
                        note: note,
                        status: staging,
                        recall_link: recalls.map((recall) => recall.id),
                        treatment_link: treatments.map((treatment) => treatment.id),
                    };
                    await onAddAppointment(isNewPatient, patientData, appointData, resetAllFields);
                } else {
                    toast.error(t(strings.dateRangeInvalid));
                }
            } else {
                toast.error(t(strings.dateRangeInvalid));
            }
        }
    }

    // Autocomplete Patient
    const loadPatientOptions  = (inputValue) => {
        return new Promise(async (resolve) => {
            try {
                let options = [];
                const result = await api.httpGet({
                    url: apiPath.patient.patient + apiPath.common.autocomplete,
                    query: {
                        data: inputValue,
                        limit: figures.autocomplete.limit
                    }
                });
                if (result.success){
                    options = result.payload.map((option) => ({
                        value: option._id,
                        label: option.first_name + " " + option.last_name,
                    }));
                }
                options.unshift({value: -1, label: t(strings.none)});
                resolve(options);
            } catch(err){
                toast.error(err);
            }
          });
    };

    // Autocomplete Assistant
    const loadAssistantOptions  = (inputValue) => {
        return new Promise(async (resolve) => {
            try {
                let options = [];
                const result = await api.httpGet({
                    url: apiPath.staff.staff + apiPath.common.autocomplete,
                    query: {
                        data: inputValue,
                        limit: figures.autocomplete.limit,
                        staffType: lists.staff.staffType.staff
                    }
                });
                if (result.success){
                    options = result.payload.map((option) => ({
                        value: option._id,
                        label: `${option.first_name} ${option.last_name} (${option.display_id})`
                    }));
                }
                options.unshift(noneOption);
                resolve(options);
            } catch(err){
                toast.error(err);
            }
          });
    };

    // Autocomplete Provider
    const loadProviderOptions  = (inputValue) => {
        return new Promise(async (resolve) => {
            try {
                let options = [];
                if (selectedAppointStart){
                    const result = await api.httpGet({
                        url: apiPath.staff.staff + apiPath.common.autocomplete,
                        query: {
                            data: inputValue,
                            limit: figures.autocomplete.limit,
                            staffType: lists.staff.staffType.provider,
                            date: ConvertDateTimes.formatDate(selectedAppointStart, strings.apiDateFormat)
                        }
                    });
                    if (result.success){
                        let newPatientProviderIdx = -1;
                        options = result.payload.map((option, index) => {
                            if (patient && option._id === patient.provider){
                                newPatientProviderIdx = index;
                            }
                            return {
                                value: option._id,
                                label: `${option.first_name} ${option.last_name} (${option.display_id})`
                            }
                        });
                        // Set Patient default's Provider
                        if (newPatientProviderIdx != -1){
                            setProvider({...options[newPatientProviderIdx]});
                        } else {
                            if (provider && provider.value){
                                setProvider(noneOption);
                            }
                        }
                    }
                }
                options.unshift({value: -1, label: t(strings.none)});
                resolve(options);
            } catch(err){
                toast.error(err);
            }
          });
    };

    const handleOnCloseTab = () => {
        setStaging(lists.appointment.staging.new);
        onClose();
    }

    // Recall Dialog
    const handleOpenRecalltDialog = () => {
        if (!isNewPatient){
            setOpenRecallDialog(true);
        }
    }

    const handleCloseRecallDialog = () => {
        setOpenRecallDialog(false);
    }

    // Treatment Dialog
    const handleOpenTreatmentDialog = () => {
        if (!isNewPatient){
            setOpenTreatmentDialog(true);
        }
    }

    const handleCloseTreatmentDialog = () => {
        setOpenTreatmentDialog(false);
    }

    // Add Treatment Dialog
    const handleOpenAddTreatmentDialog = () => {
        setOpenAddTreatmentDialog(true);
    }

    const handleCloseAddTreatmentDialog = () => {
        setOpenAddTreatmentDialog(false);
    }

    const handleAddNewTreatment = (procedure, surface, tooth) => {
        const newTreatment = {};
        newTreatment.procedure_code = procedure.id; // ID
        newTreatment.surface = surface || noneStr;
        newTreatment.code = procedure.procedure_code;
        newTreatment.tooth = tooth?.tooth_number || noneStr; 
        newTreatment.description = procedure?.description || noneStr;
        const addeds = [...addedTreatments];
        addeds.push(newTreatment);
        setAddedTreatments(addeds)
      }

    const resetAllFields = () => {
        setIsNewPatient(true);
        setPatient(noneOption);
        setFirstName("");
        setLastName("");
        setHomePhone("");
        setMobile("");
        setEmail("");
        setAssistant(null);
        setProvider(null);
        setStaging(lists.appointment.staging.new);
        setDuration(cellDuration);
        setNote("");
        setFirstNameErrMsg("");
        setLastNameErrMsg("");
        setHomePhoneErrMsg("");
        setMobileErrMsg("");
        setEmailErrMsg("");
        setProviderErrMsg("");
        setDateErrMsg("");
        setTimeErrMsg("");
        setRecalls([]);
        setTreatments([]);
        setAddedTreatments([]);
        setOpenRecallDialog(false);
        setOpenTreatmentDialog(false);
        setOpenAddTreatmentDialog(false);

        // Ref
        patientIDRef.current.value = "";
        firstNameRef.current.value = "";
        lastNameRef.current.value = "";
        homePhoneRef.current.value = "";
        mobileRef.current.value = "";
        emailRef.current.value = "";
        noteRef.current.value = "";
    }

    // Next available date
    const handleGetNextAvailableDate = useCallback(async () => {
        if (!patient?.provider){
            return;
        }
        try {
            dispatchLoading({ type: strings.setLoading, isLoading: true});
            const prevDate = selectedAppointStart;
            const promises = [
                api.httpGet({
                    url: apiPath.staff.schedule + apiPath.staff.provider + apiPath.staff.nextAvailableDate + '/' + patient.provider,
                    query: {
                        date: ConvertDateTimes.formatDate(selectedAppointStart || new Date(), strings.apiDateFormat)
                    }
                }),
            ];
            const result = await Promise.all(promises);
            if (result[0].success){
                if (result[0].payload){
                    const newDate = new Date(result[0].payload);
                    newDate.setHours(prevDate.getHours());
                    newDate.setMinutes(prevDate.getMinutes());
                    handleOnDateChange(moment(newDate));
                } else {
                    toast.error(t(strings.providerNotWorkingErrMsg));
                }
            } else {
                toast.error(result.message);
            }
        } catch(err){
            toast.error(t(strings.nextAvaiDateErrMsg));
        } finally {
            dispatchLoading({ type: strings.setLoading, isLoading: false});
        }
    }, [selectedAppointStart, patient]);

    return (
        <Paper p={2} className={classes.paper}>
            <IconButton aria-label="back" className={classes.backBtn} onClick={handleOnCloseTab}>
                <ArrowBackIcon fontSize="small" />
            </IconButton>
            <Typography className={classes.title} variant="h4" component="h4">{t(strings.add)} {t(strings.appointment)}</Typography>
            <Grid container className={classes.gridContainer} spacing={2}>
                <Grid container item md={6} sm={12} xs={12} spacing={0}>
                    {/* Select Patient */}
                    <Grid container item md={12} sm={12} xs={12} spacing={1} className={classes.formGroup}>
                        {/* Group title */}
                        <Grid item md={12} sm={12} xs={12}>
                            <Typography component="h6" varient="h6" className={classes.formGroupHeader}>
                                {t(strings.selectPatient + " | " + t(strings.enterNewPatient))}
                            </Typography>
                        </Grid>
                        <Grid container item md={12} sm={12} xs={12} spacing={1}>
                            <Grid item md={8} sm={12} xs={12}>
                                <AsyncSelect 
                                    item
                                    cacheOptions 
                                    defaultOptions 
                                    loadOptions={loadPatientOptions}
                                    defaultValue={noneOption}
                                    styles={selectPatientStyle}
                                    placeholder={t(strings.select) + " " + t(strings.patient)}
                                    noOptionsMessage={() => t(strings.noOptions)}
                                    onChange={handleOnSelectPatient}
                                    value={patient}
                                />
                            </Grid>
                            <Grid item md={4} sm={12} xs={12}>
                                <Button variant="contained" 
                                    color="secondary" 
                                    className={classes.newPatientBtn}
                                    onClick={handleOnNewPatient}
                                >
                                    {t(strings.newPatient)}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* Patient information */}
                    <Grid container md={12} sm={12} xs={12} spacing={1} className={classes.formGroup}>
                        {/* Group title */}
                        <Grid item md={12} sm={12} xs={12}>
                            <Typography component="h6" varient="h6" className={classes.formGroupHeader}>
                                {t(strings.patientInformation)}
                            </Typography>
                        </Grid>
                        <Grid container item md={12} sm={12} xs={12} spacing={2}>
                            {/* Patient ID */}
                            <Grid item md={4} sm={12} xs={12}>
                                <TextField
                                    label={t(strings.patient.value)}
                                    id="patient-info-id"
                                    className={classes.textField}
                                    margin="dense"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    type="text"
                                    disabled
                                    inputRef={patientIDRef}
                                    placeholoder={t(strings.patientID)}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    inputProps={{
                                        placeholder: t(strings.patientID)
                                    }}
                                />
                            </Grid>
                            {/* Patient First name */}
                            <Grid item md={4} sm={12} xs={12}>
                                <TextField
                                    label={t(strings.firstName)}
                                    id="patient-info-first-name"
                                    className={classes.textField}
                                    margin="dense"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    type="text"
                                    onBlur={handleOnFirstNameChange}
                                    error={Boolean(firstNameErrMsg)}
                                    helperText={t(firstNameErrMsg)}
                                    disabled={!isNewPatient}
                                    inputRef={firstNameRef}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        placeholder: t(strings.firstName)
                                    }}
                                />
                            </Grid>
                            {/* Patient Last name */}
                            <Grid item md={4} sm={12} xs={12}>
                                <TextField
                                    label={t(strings.lastName)}
                                    id="patient-info-last-name"
                                    className={classes.textField}
                                    margin="dense"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    type="text"
                                    onBlur={handleOnLastNameChange}
                                    error={Boolean(lastNameErrMsg)}
                                    helperText={t(lastNameErrMsg)}
                                    disabled={!isNewPatient}
                                    inputRef={lastNameRef}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    inputProps={{
                                        placeholder: t(strings.lastName)
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* Patient contact */}
                    <Grid container item md={12} sm={12} xs={12} spacing={1} className={classes.formGroup}>
                        {/* Group title */}
                        <Grid item md={12} sm={12} xs={12}>
                            <Typography component="h6" varient="h6" className={classes.formGroupHeader}>
                                {t(strings.patientContact)}
                            </Typography>
                        </Grid>
                        <Grid container item md={12} sm={12} xs={12} spacing={2}>
                            {/* Patient Home phone */}
                            <Grid item md={6} sm={6} xs={6}>
                                <TextField
                                    label={t(strings.homePhone)}
                                    id="patient-contact-home-phone"
                                    className={classes.textField}
                                    margin="dense"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    type="tel"
                                    onBlur={handleOnHomePhoneChange}
                                    error={Boolean(homePhoneErrMsg)}
                                    helperText={t(homePhoneErrMsg)}
                                    disabled={!isNewPatient}
                                    inputRef={homePhoneRef}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    inputProps={{
                                        placeholder: t(strings.homePhone)
                                    }}
                                />
                            </Grid>
                            {/* Patient Mobile phone */}
                            <Grid item md={6} sm={6} xs={6}>
                                <TextField
                                    label={t(strings.mobile)}
                                    id="patient-contact-mobile-phone"
                                    className={classes.textField}
                                    margin="dense"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    type="tel"
                                    onBlur={handleOnMobileChange}
                                    error={Boolean(mobileErrMsg)}
                                    helperText={t(mobileErrMsg)}
                                    disabled={!isNewPatient}
                                    inputRef={mobileRef}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    inputProps={{
                                        placeholder: t(strings.mobile)
                                    }}
                                />
                            </Grid>
                            {/* Patient Email */}
                            <Grid item md={12} sm={12} xs={12}>
                                <TextField
                                    label={t(strings.email)}
                                    id="patient-contact-email"
                                    className={classes.textField}
                                    margin="dense"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    type="email"
                                    onBlur={handleOnEmailChange}
                                    error={Boolean(emailErrMsg)}
                                    helperText={t(emailErrMsg)}
                                    disabled={!isNewPatient}
                                    inputRef={emailRef}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    inputProps={{
                                        placeholder: t(strings.email)
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* Schedule */}
                    <Grid container md={12} sm={12} xs={12} spacing={1} className={classes.formGroup}>
                        {/* Group title */}
                        <Grid item md={12} sm={12} xs={12}>
                            <Typography component="h6" varient="h6" className={classes.formGroupHeader}>
                                {t(strings.schedule)}
                            </Typography>
                        </Grid>
                        <Grid container item md={12} sm={12} xs={12} spacing={2}>
                            {/* Schedule Assistant */}
                            <Grid item md={6} sm={12} xs={12}>
                                <FormControl color="secondary" className={classes.formControl}>
                                    <label htmlFor="schedule-assistant" className={classes.autocompleteLabel}>{t(strings.assistant)}</label>
                                    <AsyncSelect
                                        inputId="schedule-assistant"
                                        item
                                        cacheOptions 
                                        defaultOptions 
                                        loadOptions={loadAssistantOptions}
                                        styles={selectPatientStyle}
                                        placeholder={t(strings.select) + " " + t(strings.assistant)}
                                        noOptionsMessage={() => t(strings.noOptions)}
                                        value={assistant || null}
                                        onChange={handleOnAssistantChange}
                                    />
                                </FormControl>
                            </Grid>
                            {/* Schedule Provider */}
                            <Grid item md={6} sm={12} xs={12}>
                                <FormControl color="secondary" className={classes.formControl}>
                                    <label htmlFor="schedule-provider" className={classes.autocompleteLabel}>{t(strings.provider)}</label>
                                    <AsyncSelect
                                        inputId="schedule-provider"
                                        item
                                        cacheOptions 
                                        defaultOptions 
                                        loadOptions={loadProviderOptions}
                                        styles={selectPatientStyle}
                                        placeholder={t(strings.select) + " " + t(strings.provider)}
                                        noOptionsMessage={() => t(strings.noOptions)}
                                        value={provider || null}
                                        onChange={handleOnProviderChange}
                                        key={`provider-select-${fakeTempProvi}`}
                                    />
                                    {Boolean(providerErrMsg) && 
                                        <FormHelperText
                                            className={classes.formMessageFail}
                                            error={true}
                                        >
                                            {t(providerErrMsg)}
                                        </FormHelperText>
                                    }
                                </FormControl>
                            </Grid>
                            {/* Schedule Chair */}
                            <Grid item md={6} sm={6} xs={12}>
                                <InputLabel shrink id="schedule-chair-label">
                                    {t(strings.chair)}
                                </InputLabel>
                                <Select
                                    labelId="schedule-chair-label"
                                    id="schedule-chair"
                                    className={classes.select}
                                    margin="dense"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    value={selectedChairId || 0}
                                    onChange={onSelectChair}
                                    disabled
                                >
                                {(chairs.map((chair) => {
                                    return (
                                        <MenuItem key={chair.id} value={chair.id}>{chair.title}</MenuItem>
                                    )
                                }))}
                                </Select>
                            </Grid>
                            {/* Schedule Staging */}
                            <Grid item md={6} sm={6} xs={12}>
                                <InputLabel shrink id="schedule-staging-label">
                                    {t(strings.staging)}
                                </InputLabel>
                                <Select
                                    labelId="schedule-staging-label"
                                    id="schedule-staging"
                                    className={classes.select}
                                    margin="dense"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    value={staging}
                                    onChange={handleOnStagingChange}
                                >
                                {(Object.values(lists.appointment.staging).map((staging, index) => {
                                    return (
                                        <MenuItem key={index} value={staging}>{staging}</MenuItem>
                                    )
                                }))}
                                </Select>
                            </Grid>
                            {/* Schedule Date */}
                            <Grid item md={4} sm={4} xs={4}>
                                <DatePicker
                                    label={t(strings.date)}
                                    id="schedule-date"
                                    className={classes.textField}
                                    margin="dense"
                                    inputVariant="outlined"
                                    size="small"
                                    fullWidth
                                    format={strings.defaultDateFormat}
                                    value={selectedAppointStart}
                                    onChange={() => {}}
                                    onAccept={handleOnDateChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    helperText={dateErrMsg}
                                    error={Boolean(dateErrMsg)}
                                />
                            </Grid>
                            <Grid item md={3} sm={3} xs={3}>
                                <FormControl>
                                    <Tooltip title={t(strings.nextDateProvider)} aria-label="next-date">
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            className={classes.nextBtn}
                                            endIcon={<DateRangeIcon></DateRangeIcon>}
                                            onClick={handleGetNextAvailableDate}
                                        >
                                            {t(strings.nextS)}
                                        </Button>
                                    </Tooltip>
                                </FormControl>
                            </Grid>
                            {/* Schedule Time */}
                            <Grid item md={5} sm={5} xs={5}>
                                <TimePicker 
                                    label={`${t(strings.time)} (${startDayHour}h -- ${endDayHour}h)`}
                                    id="schedule-time"
                                    className={classes.textField}
                                    margin="dense"
                                    inputVariant="outlined"
                                    size="small"
                                    fullWidth
                                    ampm={false}
                                    value={selectedAppointStart}
                                    onAccept={handleOnTimeChange}
                                    onChange={() => {}}
                                    minutesStep={cellDuration}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    helperText={timeErrMsg}
                                    error={Boolean(timeErrMsg)}
                                />
                            </Grid>
                            {/* Schedule Duration */}
                            <Grid item md={12} sm={12} xs={12}>
                                <InputLabel shrink id="schedule-duration-label">
                                    {t(strings.duration)} ({t(strings.appointDurationUnit)})
                                </InputLabel>
                                <Select
                                    labelId="schedule-duration-label"
                                    id="schedule-duration"
                                    className={classes.select}
                                    margin="dense"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    value={duration}
                                    onChange={handleOnDurationChange}
                                >
                                    {durationOptions}
                                </Select>
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* Note */}
                    <Grid container item md={12} sm={12} xs={12} spacing={1} className={classes.formGroup}>
                        {/* Group title */}
                        <Grid item md={12} sm={12} xs={12}>
                            <Typography component="h6" varient="h6" className={classes.formGroupHeader}>
                                {t(strings.note)}
                            </Typography>
                        </Grid>
                        <Grid item md={12} sm={12} xs={12}>
                            <TextField
                                label={t(strings.note)}
                                id="appointment-note"
                                className={classes.textField}
                                margin="dense"
                                variant="outlined"
                                size="small"
                                fullWidth
                                type="text"
                                multiline
                                rows={4}
                                onBlur={handleOnNoteChange}
                                inputRef={noteRef}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container item md={6} sm={12} xs={12} spacing={0}>
                    {/* Select Recall */}
                    <Grid container item md={12} sm={12} xs={12} spacing={1} className={classes.formGroup}>
                        {/* Group title */}
                        <Grid container item md={12} sm={12} xs={12} spacing={1}>
                            <Grid item md={6} sm={6} xs={6}>
                                <Typography component="h6" varient="h6" className={classes.formGroupHeader}>
                                    {t(strings.recall)}
                                </Typography>
                            </Grid>
                            <Grid item md={6} sm={6} xs={6} className={classes.tableBtnGroup}>
                                <IconButton aria-label="link-recall" 
                                    className={clsx(classes.tableIconBtn, classes.insertLinkIcon)}
                                    onClick={handleOpenRecalltDialog}
                                >
                                    <InsertLinkIcon/>
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Grid item md={12} sm={12} xs={12}>
                            <TableContainer component={Paper} className={classes.tableContainer}>
                                <Table stickyHeader  className={classes.table} size="small" aria-label="recalls-table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center" width="25%" className={clsx(classes.tableCellName, classes.tableCell)}>{t(strings.date)}</TableCell>
                                            <TableCell align="center" width="20%" className={clsx(classes.tableCellName, classes.tableCell)}>{t(strings.code)}</TableCell>
                                            <TableCell align="center" width="55%" className={clsx(classes.tableCellName, classes.tableCell)}>{t(strings.note)}</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {recalls.map((recall) => (
                                        <TableRow key={recall.id}>
                                            <TableCell align="center" width="25%" className={classes.tableCell}>{recall.date}</TableCell>
                                            <TableCell align="center" width="20%" className={classes.tableCell}>{recall.code}</TableCell>
                                            <TableCell align="left" width="55%" className={classes.tableCell}>{recall.note}</TableCell>
                                        </TableRow>
                                    ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                    {/* Select Treatment */}
                    <Grid container item md={12} sm={12} xs={12} spacing={3} className={classes.formGroup}>
                        {/* Group title */}
                        <Grid container item md={12} sm={12} xs={12} spacing={1}>
                            <Grid item md={6} sm={6} xs={6}>
                                <Typography component="h6" varient="h6" className={classes.formGroupHeader}>
                                    {t(strings.treatments)}
                                </Typography>
                            </Grid>
                            <Grid item md={6} sm={6} xs={6} className={classes.tableBtnGroup}>
                                <IconButton aria-label="link-treatment" 
                                    className={clsx(classes.tableIconBtn, classes.insertLinkIcon)}
                                    onClick={handleOpenTreatmentDialog}
                                >
                                    <InsertLinkIcon/>
                                </IconButton>
                                {/*<IconButton aria-label="add-treatment" 
                                    className={clsx(classes.tableIconBtn, classes.addIcon)}
                                    onClick={handleOpenAddTreatmentDialog}
                                >
                                    <AddIcon/>
                                </IconButton>*/}
                            </Grid>
                        </Grid>
                        <Grid item md={12} sm={12} xs={12}>
                            <TableContainer component={Paper} className={classes.tableContainer}>
                                <Table stickyHeader  className={classes.table} size="small" aria-label="recalls-table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center" width="13%" className={clsx(classes.tableCellName, classes.tableCell)}>{t(strings.code)}</TableCell>
                                            <TableCell align="center" width="15%" className={clsx(classes.tableCellName, classes.tableCell)}>{t(strings.tooth)}</TableCell>
                                            <TableCell align="left" width="15%" className={clsx(classes.tableCellName, classes.tableCell)}>{t(strings.surface)}</TableCell>
                                            <TableCell align="center" width="35%" className={clsx(classes.tableCellName, classes.tableCell)}>{t(strings.description)}</TableCell>
                                            <TableCell align="center" width="17%" className={clsx(classes.tableCellName, classes.tableCell)}>{t(strings.status)}</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {treatments.map((treatment) => (
                                        <TableRow key={treatment.id}>
                                            <TableCell align="center" width="13%" className={classes.tableCell}>{treatment.code}</TableCell>
                                            <TableCell align="center" width="15%" className={classes.tableCell}>{treatment.tooth}</TableCell>
                                            <TableCell align="left" width="15%" className={classes.tableCell}>{treatment.surface}</TableCell>
                                            <TableCell align="left" width="35%" className={classes.tableCell}>{treatment.description}</TableCell>
                                            <TableCell align="center" width="17%" className={classes.tableCell}>{treatment.status}</TableCell>
                                        </TableRow>
                                    ))}
                                    {/*addedTreatments.map((treatment, index) => (
                                        <TableRow key={index}>
                                            <TableCell align="center" width="13%" className={classes.tableCell}>{treatment.code}</TableCell>
                                            <TableCell align="center" width="15%" className={classes.tableCell}>{treatment.tooth}</TableCell>
                                            <TableCell align="left" width="15%" className={classes.tableCell}>{treatment.surface}</TableCell>
                                            <TableCell align="left" width="35%" className={classes.tableCell}>{treatment.description}</TableCell>
                                            <TableCell align="center" width="17%" className={classes.tableCell}>{treatment.status}</TableCell>
                                        </TableRow>
                                    ))*/}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </Grid>
                {/* Submit */}
                <Grid item md={12} sm={12} xs={12}>
                    <Button 
                        color="primary" 
                        variant="contained"
                        fullWidth
                        onClick={handleAddAppointment}
                    >
                        {t(strings.add)}
                    </Button>
                </Grid>
            </Grid>
            <RecallDialog
                patientID={patient.value}
                open={openRecallDialog}
                onClose={handleCloseRecallDialog}
                onSelect={setRecalls}
                selectedDate={selectedAppointStart}
            />
            <TreatmentDialog
                patientID={patient.value}
                open={openTreatmentDialog}
                onClose={handleCloseTreatmentDialog}
                onSelect={setTreatments}
                selectedDate={selectedAppointStart}
            />
            <AddTreatmentDialog
                patientID={patient.value}
                open={openAddTreatmentDialog}
                onClose={handleCloseAddTreatmentDialog}
                onAdd={handleAddNewTreatment}
                selectedDate={selectedAppointStart}
            />
        </Paper>
    )
}

export default AppointmentTab;