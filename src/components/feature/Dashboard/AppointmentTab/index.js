import React, { useState, useEffect, useContext, useRef } from 'react';
import { makeStyles, useTheme  } from "@material-ui/core/styles";
import strings from '../../../../configs/strings';
import figures from '../../../../configs/figures';
import lists from '../../../../configs/lists';
import clsx from 'clsx';

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

// @material-ui/core Datepicker
import { DatePicker, TimePicker  } from "@material-ui/pickers";

// React-select
import AsyncSelect from 'react-select/async';

import styles from "./jss";

// Components
import RecallDialog from './RecallDialog';
import TreatmentDialog from './TreatmentDialog';

// Icons
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AddIcon from '@material-ui/icons/Add';
import InsertLinkIcon from '@material-ui/icons/InsertLink';

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
    selectedChairId, selectedAppointStart, chairs, cellDuration, startDayHour, endDayHour, holidays,
    onClose, onSelectChair, onSelectDate
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
    const [assistant, setAssistant] = useState("");
    const [provider, setProvider] = useState("");
    const [staging, setStaging] = useState(lists.appointment.staging.new);
    const [duration, setDuration] = useState(cellDuration);
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

    // Duration options
    const durationOptions = [];
    for (let i = cellDuration; i <= figures.maxAppointmentDuration; i+=cellDuration){
        durationOptions.push(<MenuItem key={i} value={i}>{i}</MenuItem>);
    }
    // Recalls
    const [recalls, setRecalls] = useState([]);

    // Treatments
    const [procedureCates, setProcedureCates] = useState([]);
    const [selectedProceduerCate, setSelectedProceduerCate] = useState(null);
    const [treatments, setTreatments] = useState([]);

    // Dialogs
    const [openRecallDialog, setOpenRecallDialog] = useState(false);
    const [openTreatmentDialog, setOpenTreatmentDialog] = useState(false);

    useEffect(async () => {
        try {
            dispatchLoading({ type: strings.setLoading, isLoading: true});
            const promises = [
                api.httpGet({
                    url: apiPath.procedure.procedure + apiPath.procedure.procedure
                }),
            ];
            const result = await Promise.all(promises);
            if (result[0].success){
                const categories = result[0].payload.map((cate) => ({
                    id: cate._id,
                    name: cate.name
                }));
                setProcedureCates(categories);
            } else {
                toast.error(result.message);
            }
        } catch(err){
            toast.error(t(strings.loadPatientErrMsg));
        } finally {
            dispatchLoading({ type: strings.setLoading, isLoading: false});
        }
    }, []);

    const handleOnNewPatient = () => {
        setIsNewPatient(true);
        setPatient({...noneOption});
        //setPatientID("");
        setFirstName("");
        setLastName("");
        setHomePhone("");
        setMobile("");
        setEmail("");

        setRecalls([]);
        setTreatments([]);

        // Ref
        patientIDRef.current.value = "";
        firstNameRef.current.value = "";
        lastNameRef.current.value = "";
        homePhoneRef.current.value = "";
        mobileRef.current.value = "";
        emailRef.current.value = "";
    }

    const handleOnSelectPatient = async (option) => {
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
                    url: apiPath.patient.patient + '/' + option.value
                }),
            ];
            const result = await Promise.all(promises);
            if (result[0].success){
                //setPatientID(option.value);
                const patient = result[0].payload;
                const patientUser = patient?.user;
                if (patient && patientUser){
                    setPatient(option);
                    setIsNewPatient(false);
                    //setPatientID(patient._id || "");
                    setFirstName(patientUser.first_name || "");
                    setLastName(patientUser.last_name || "");
                    setHomePhone(patientUser.home_phone || "");
                    setMobile(patientUser.mobile_phone || "");
                    setEmail(patientUser.email || "");

                    // Ref
                    let noneStr = t(strings.none);
                    patientIDRef.current.value = patient.patient_id;
                    firstNameRef.current.value = patientUser.first_name || noneStr;
                    lastNameRef.current.value = patientUser.last_name || noneStr;
                    homePhoneRef.current.value = patientUser.home_phone || noneStr;
                    mobileRef.current.value = patientUser.mobile_phone || noneStr;
                    emailRef.current.value = patientUser.email || noneStr;
                }
                setRecalls([]);
                setTreatments([]);
            } else {
                toast.error(result.message);
            }
        } catch(err){
            toast.error(t(strings.loadPatientErrMsg));
        } finally {
            dispatchLoading({ type: strings.setLoading, isLoading: false});
        }
    }

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
        setAssistant(option.value);
    }

    const handleOnProviderChange = (option) => {
        setProvider(option.value);
    }

    const handleOnStagingChange = (evt) => {
        setStaging(evt.target.value);
    }

    const handleOnDateChange = (date) => {
        onSelectDate("date", date._d);
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

    const handleAddAppointment = (evt) => {
        evt.preventDefault();

        // First name
        if (!isPropValid(validators.properties.firstName, firstName)){
            setFirstNameErrMsg(t(strings.firstNameErrMsgShort));
        } else {
            setFirstNameErrMsg("");
        }

        // Last name
        if (!isPropValid(validators.properties.lastName, lastName)){
            setLastNameErrMsg(t(strings.lastNameErrMsgShort));
        } else {
            setLastNameErrMsg("");
        }

        // Home phone
        if (!isPropValid(validators.properties.phone, homePhone)){
            setHomePhoneErrMsg(t(strings.phoneErrMsg));
        } else {
            setHomePhoneErrMsg("");
        }

        // Mobile phone
        if (!isPropValid(validators.properties.phone, mobile)){
            setMobileErrMsg(t(strings.phoneErrMsg));
        } else {
            setMobileErrMsg("");
        }

        // Email
        if (!isPropValid(validators.properties.email, email)){
            setEmailErrMsg(t(strings.emailErrMsg));
        } else {
            setEmailErrMsg("");
        }

        // Provider
        if (!isPropValid(validators.properties.provider, provider)){
            setProviderErrMsg(t(strings.appointProviderErrMsg));
        } else {
            setProviderErrMsg("");
        }

        // Holidate
        if (holidays[selectedAppointStart.getMonth() + 1][selectedAppointStart.getDate()]){
            setDateErrMsg(t(strings.appointHolidayErrMsg));
        } else {
            setDateErrMsg("");
        }

        // Time
        const selectedTime = (selectedAppointStart)? selectedAppointStart.getHours() * 60 + selectedAppointStart.getMinutes() : 0;
        if (selectedTime < startDayHour * 60 || selectedTime > endDayHour * 60){
            setTimeErrMsg(t(strings.appointTimeErrMsg));
        } else {
            setTimeErrMsg("");
        }
    }

    const handleOnProcedureCateChange = (evt) => {
        setSelectedProceduerCate(evt.target.value);
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
                        label: option.first_name + " " + option.last_name
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
                const result = await api.httpGet({
                    url: apiPath.staff.staff + apiPath.common.autocomplete,
                    query: {
                        data: inputValue,
                        limit: figures.autocomplete.limit,
                        staffType: lists.staff.staffType.provider
                    }
                });
                if (result.success){
                    options = result.payload.map((option) => ({
                        value: option._id,
                        label: `${option.first_name} ${option.last_name} (${option.display_id})`
                    }));
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
        setOpenRecallDialog(true);
    }

    const handleCloseRecallDialog = () => {
        setOpenRecallDialog(false);
    }

    // Treatment Dialog
    const handleOpenTreatmentDialog = () => {
        setOpenTreatmentDialog(true);
    }

    const handleCloseTreatmentDialog = () => {
        setOpenTreatmentDialog(false);
    }

    return (
        <Paper p={2} className={classes.paper}>
            <IconButton aria-label="back" className={classes.backBtn} onClick={handleOnCloseTab}>
                <ArrowBackIcon fontSize="small" />
            </IconButton>
            <Typography className={classes.title} variant="h4" component="h4">{t(strings.add)} {t(strings.appointment)}</Typography>
            <Grid container className={classes.gridContainer} spacing={2}>
                <Grid container item md={6} sm={12} xs={12} spacing={0}>
                    {/* Select Patient */}
                    <Grid container md={12} sm={12} xs={12} spacing={1} className={classes.formGroup}>
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
                    <Grid container md={12} sm={12} xs={12} spacing={1} className={classes.formGroup}>
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
                                        onChange={handleOnProviderChange}
                                    />
                                    <FormHelperText
                                        className={classes.formMessageFail}
                                        error={true}
                                        style={{display: Boolean(providerErrMsg)? 'block' : 'block'}}
                                    >
                                        {t(providerErrMsg)}
                                    </FormHelperText>
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
                                >
                                {(chairs.map((chair) => {
                                    return (
                                        <MenuItem key={chair.id} value={chair.id}>{chair.text}</MenuItem>
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
                            <Grid item md={6} sm={6} xs={6}>
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
                            {/* Schedule Time */}
                            <Grid item md={6} sm={6} xs={6}>
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
                    <Grid container md={12} sm={12} xs={12} spacing={1} className={classes.formGroup}>
                        {/* Group title */}
                        <Grid item md={12} sm={12} xs={12}>
                            <Typography component="h6" varient="h6" className={classes.formGroupHeader}>
                                {t(strings.note)}
                            </Typography>
                        </Grid>
                        <Grid item md={12} sm={12} xs={12} spacing={2}>
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
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container item md={6} sm={12} xs={12} spacing={0}>
                    {/* Select Recall */}
                    <Grid container md={12} sm={12} xs={12} spacing={1} className={classes.formGroup}>
                        {/* Group title */}
                        <Grid item md={12} sm={12} xs={12}>
                            <Typography component="h6" varient="h6" className={classes.formGroupHeader}>
                                {t(strings.recall)}
                            </Typography>
                            <div className={classes.tableBtnGroup}>
                                <IconButton aria-label="link-recall" 
                                    className={clsx(classes.tableIconBtn, classes.insertLinkIcon)}
                                    onClick={handleOpenRecalltDialog}
                                >
                                    <InsertLinkIcon/>
                                </IconButton>
                            </div>
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
                    <Grid container md={12} sm={12} xs={12} spacing={1} className={classes.formGroup}>
                        {/* Group title */}
                        <Grid item md={12} sm={12} xs={12}>
                            <Typography component="h6" varient="h6" className={classes.formGroupHeader}>
                                {t(strings.treatments)}
                            </Typography>
                        </Grid>
                        <Grid container item md={12} sm={12} xs={12} spacing={2}>
                            {/* Select Treatment */}
                            <Grid item md={5} sm={12} xs={12}>
                                <InputLabel shrink id="treatment-category">
                                    {t(strings.category)}
                                </InputLabel>
                                <Select
                                    labelId="treatment-category"
                                    id="treatment-category"
                                    className={classes.select}
                                    margin="dense"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    value={selectedProceduerCate || 0}
                                    onChange={handleOnProcedureCateChange}
                                >
                                {(procedureCates.map((cate) => {
                                    return (
                                        <MenuItem key={cate.id} value={cate.id}>{cate.name}</MenuItem>
                                    )
                                }))}
                                </Select>
                            </Grid>
                            {/* Select Procedure */}
                            <Grid item md={4} sm={12} xs={12}>
                                <InputLabel shrink id="treatment-procedure">
                                    {t(strings.procedure)}
                                </InputLabel>
                                <Select
                                    labelId="treatment-procedure"
                                    id="treatment-procedure"
                                    className={classes.select}
                                    margin="dense"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    value={selectedChairId || 0}
                                    onChange={onSelectChair}
                                >
                                {(chairs.map((chair) => {
                                    return (
                                        <MenuItem key={chair.id} value={chair.id}>{chair.text}</MenuItem>
                                    )
                                }))}
                                </Select>
                            </Grid>
                            <Grid item md={3} sm={12} xs={12} className={classes.tableBtnGroup}>
                                <IconButton aria-label="link-treatment" 
                                    className={clsx(classes.tableIconBtn, classes.insertLinkIcon)}
                                    onClick={handleOpenTreatmentDialog}
                                >
                                    <InsertLinkIcon/>
                                </IconButton>
                                <IconButton aria-label="add-treatment" className={clsx(classes.tableIconBtn, classes.addIcon)}>
                                    <AddIcon/>
                                </IconButton>
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
            />
            <TreatmentDialog
                patientID={patient.value}
                open={openTreatmentDialog}
                onClose={handleCloseTreatmentDialog}
                onSelect={setTreatments}
            />
        </Paper>
    )
}

export default AppointmentTab;