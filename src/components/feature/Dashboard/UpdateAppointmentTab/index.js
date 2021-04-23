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

// @material-ui/core Datepicker
import { DatePicker, TimePicker  } from "@material-ui/pickers";

// React-select
import AsyncSelect from 'react-select/async';

import styles from "./jss";

// Components
import RecallDialog from './RecallDialog';
import TreatmentDialog from './TreatmentDialog';
//import AddTreatmentDialog from './AddTreatmentDialog';

// Icons
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
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

const UpdateAppointmentTab = ({
    selectedAppointID, chairs, cellDuration, startDayHour, endDayHour, holidays,
    onClose, onUpdateAppointment
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
    let noneStr = t(strings.none);
    let currencyStr = t(strings.CURRENCY_PRE);

    // States

    const [patient, setPatient] = useState(noneOption);
    const [assistant, setAssistant] = useState(null);
    const [provider, setProvider] = useState(null);
    const [staging, setStaging] = useState(lists.appointment.staging.new);
    const [duration, setDuration] = useState(cellDuration);
    const [note, setNote] = useState("");

    const [chairID, setChairID] = useState("");
    const [date, setDate] = useState(new Date());

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


    // Duration options
    const durationOptions = [];
    for (let i = cellDuration; i <= figures.maxAppointmentDuration; i+=cellDuration){
        durationOptions.push(<MenuItem key={i} value={i}>{i}</MenuItem>);
    }
    // Recalls
    const [oriRecalls, setOriRecalls] = useState([]);
    const [recalls, setRecalls] = useState([]);

    // Treatments
    const [oriTreatments, setOriTreatments] = useState([]);
    const [treatments, setTreatments] = useState([]);
    //const [addedTreatments, setAddedTreatments] = useState([]);

    // Dialogs
    const [openRecallDialog, setOpenRecallDialog] = useState(false);
    const [openTreatmentDialog, setOpenTreatmentDialog] = useState(false);
    //const [openAddTreatmentDialog, setOpenAddTreatmentDialog] = useState(false);

    useEffect(async () => {
        if (selectedAppointID){
            try {
                dispatchLoading({type: strings.setLoading, isLoading: true});
                const promiseAll = [
                    api.httpGet({
                        url: apiPath.appointment.appointment + '/' + selectedAppointID,
                        query: {
                            get_treatments: true,
                            get_recalls: true
                        },
                    }),
                ];
                const result = await Promise.all(promiseAll);
                if (result[0].success){
                    const appointment = result[0].payload;
                    const patient = appointment?.patient;
                    const patientUser = patient?.user;
                    const appointAssistant = appointment.assistant;
                    const appointProvider = appointment.provider;

                    setPatient({
                        value: patient._id,
                        label: ""
                    });
                    patientIDRef.current.value = patient.patient_id;
                    firstNameRef.current.value = patientUser.first_name;
                    lastNameRef.current.value = patientUser.last_name;
                    homePhoneRef.current.value = patientUser.home_phone;
                    mobileRef.current.value = patientUser.mobile_phone;
                    emailRef.current.value = patientUser.email;

                    if (appointAssistant){
                        setAssistant({
                            value: appointAssistant._id,
                            label: `${appointAssistant?.user.first_name} ${appointAssistant?.user.last_name} (${appointAssistant.display_id})`
                        });
                    }

                    if (appointProvider){
                        setProvider({
                            value: appointProvider._id,
                            label: `${appointProvider?.user.first_name} ${appointProvider?.user.last_name} (${appointProvider.display_id})`
                        });
                    }
                    // Date Time
                    const newDate = new Date(appointment.appointment_date);
                    const appointTime = appointment.appointment_time;
                    newDate.setHours(Number(appointTime.slice(0, 2)));
                    newDate.setMinutes(Number(appointTime.slice(2)));
                    setDate(newDate);

                    // Chair
                    setChairID(appointment.chair._id);
                    setStaging(appointment.status);
                    setDuration(Number(appointment.duration));
                    setNote(appointment.note);
                    noteRef.current.value = appointment.note;

                    // Recalls
                    const recallss = appointment.recalls.map((recall) => {
                        return ({
                            id: recall._id,
                            date: (recall.recall_date)? ConvertDateTimes.formatDate(new Date(recall.recall_date), strings.defaultDateFormat) : noneStr,
                            code: recall.procedure || noneStr,
                            note: recall.note || noneStr
                    })});
                    setOriRecalls([...recallss]);
                    setRecalls(recallss);

                    // Treatments
                    const treatmentss = appointment.treatments.map((treatment) => {
                        return ({
                            id: treatment._id,
                            date: (treatment.treatment_date)? ConvertDateTimes.formatDate(new Date(treatment.treatment_date), strings.defaultDateFormat) : noneStr,
                            code: treatment.ada_code || noneStr,
                            tooth: treatment.tooth || noneStr,
                            surface: treatment.surface || noneStr,
                            provider: (provider)? (provider.first_name + " " + provider.last_name) : noneStr,
                            assistant: (assistant)? (assistant.first_name + " " + assistant.last_name) : noneStr,
                            status: treatment.status || noneStr,
                            fee: (treatment.fee.$numberDecimal)? `${currencyStr}${Number(treatment.fee.$numberDecimal)}` : 0,
                            description: treatment.description || noneStr
                    })});
                    setOriTreatments([...treatmentss]);
                    setTreatments(treatmentss);
                } else {
                    toast.error(t(strings.loadAppointmentFailMsg));    
                }
            } catch(err){
                toast.error(t(strings.loadAppointmentFailMsg));
            } finally {
                dispatchLoading({type: strings.setLoading, isLoading: false});
            }
        }
    }, [selectedAppointID]);

    const handleOnAssistantChange = (option) => {
        setAssistant(option);
    }

    const handleOnProviderChange = (option) => {
        setProvider(option);
    }

    const handleOnChairChange = (evt) => {
        setChairID(evt.target.value);
    }

    const handleOnStagingChange = (evt) => {
        setStaging(evt.target.value);
    }

    const handleOnDateChange = (date) => {
        setDate(date._d);
        setRecalls([]);
        setTreatments([]);
    }

    const handleOnTimeChange = (date) => {
        setDate(date._d);
    }

    const handleOnDurationChange = (evt) => {
        setDuration(evt.target.value);
    }

    const handleOnNoteChange = (evt) => {
        setNote(evt.target.value);
    }

    // Update appointment
    const handleUpdateAppointment = async (evt) => {
        evt.preventDefault();

        let isValid = true;

        // Provider
        if (!isPropValid(validators.properties.provider, provider?.value || "")){
            setProviderErrMsg(t(strings.appointProviderErrMsg));
            isValid = false;
        } else {
            setProviderErrMsg("");
        }

        // Holiday
        if (holidays[date.getMonth() + 1][date.getDate()]){
            setDateErrMsg(t(strings.appointHolidayErrMsg));
            isValid = false;
        } else {
            setDateErrMsg("");
        }

        // Time
        const selectedTime = (date)? date.getHours() * 60 + date.getMinutes() : 0;
        if (selectedTime < startDayHourMins|| selectedTime > endDayHourMins){
            setTimeErrMsg(t(strings.appointTimeErrMsg));
            isValid = false;
        } else {
            setTimeErrMsg("");
        }

        if (isValid){
            // Update appointment
            const selectedAppointStartMoment = moment(date);
            if (selectedAppointStartMoment.isValid()){
                // Patient Dât
                const patientData = {
                    first_name: firstNameRef.current.value,
                    last_name: lastNameRef.current.value,
                };
                const appointTime = selectedAppointStartMoment.format("HHmm"); 
                const startOfSelectedDate = selectedAppointStartMoment.utc().startOf('day');
                let startDayNum = Number(startDayHour.slice(0, 2)) + Number(startDayHour.slice(3)) / 60,
                    endDayNum = Number(endDayHour.slice(0, 2)) + Number(endDayHour.slice(3)) / 60,
                    appointTimeNum = Number(appointTime.slice(0, 2)) + Number(appointTime.slice(2)) / 60;
                    appointTimeNum+= duration/60;
                // Links
                let recallLinks = [], recallUnlinks = [], treatmentLinks =[], treatmentUnlinks = [];
                let recallObj = Object.create(null), treatmentObj = Object.create(null);
                recalls.forEach((recall) => {
                    recallLinks.push(recall.id);
                    recallObj[recall.id] = true;
                });
                oriRecalls.forEach((recall) => {
                    if (!recallObj[recall.id]){
                        recallUnlinks.push(recall.id);
                    }
                });

                treatments.forEach((treatment) => {
                    treatmentLinks.push(treatment.id);
                    treatmentObj[treatment.id] = true;
                })
                oriTreatments.forEach((treatment) => {
                    if (!treatmentObj[treatment.id]){
                        treatmentUnlinks.push(treatment.id);
                    }
                })
                
                if (appointTimeNum >= startDayNum && appointTimeNum <= endDayNum){
                    const appointData = {
                        provider: provider?.value || "",
                        assistant: assistant?.value || "",
                        chair: chairID,
                        appointment_date:  startOfSelectedDate._d,
                        appointment_time: appointTime,
                        duration: duration,
                        note: note,
                        status: staging,
                        recall_link: recallLinks,
                        recall_unlink: recallUnlinks,
                        treatment_link: treatmentLinks,
                        treatment_unlink: treatmentUnlinks,
                    };
                    await onUpdateAppointment(selectedAppointID, patientData, appointData, resetAllFields);
                } else {
                    toast.error(t(strings.dateRangeInvalid));
                }
            } else {
                toast.error(t(strings.dateRangeInvalid));
            }
        }
    }

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

    /*
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
      }*/

    const resetAllFields = () => {
        setPatient(noneOption);
        setAssistant(null);
        setProvider(null);
        setStaging(lists.appointment.staging.new);
        setDuration(cellDuration);
        setNote("");
        setProviderErrMsg("");
        setDateErrMsg("");
        setTimeErrMsg("");
        setRecalls([]);
        setTreatments([]);
        //setAddedTreatments([]);
        setOpenRecallDialog(false);
        setOpenTreatmentDialog(false);
        //setOpenAddTreatmentDialog(false);
        setOriRecalls([]);
        setOriTreatments([]);

        // Ref
        patientIDRef.current.value = "";
        firstNameRef.current.value = "";
        lastNameRef.current.value = "";
        homePhoneRef.current.value = "";
        mobileRef.current.value = "";
        emailRef.current.value = "";
        noteRef.current.value = "";
    }

    return (
        <Paper p={2} className={classes.paper}>
            <IconButton aria-label="back" className={classes.backBtn} onClick={handleOnCloseTab}>
                <ArrowBackIcon fontSize="small" />
            </IconButton>
            <Typography className={classes.title} variant="h4" component="h4">{t(strings.update)} {t(strings.appointment)}</Typography>
            <Grid container className={classes.gridContainer} spacing={2}>
                <Grid container item md={6} sm={12} xs={12} spacing={0}>
                    {/* Patient information */}
                    <Grid container item md={12} sm={12} xs={12} spacing={1} className={classes.formGroup}>
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
                                    disabled
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
                                    disabled
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
                                    disabled
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
                                    disabled
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
                                    disabled
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
                    <Grid container item md={12} sm={12} xs={12} spacing={1} className={classes.formGroup}>
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
                                    value={chairID || ""}
                                    onChange={handleOnChairChange}
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
                                    value={date}
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
                                    value={date}
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
                                InputLabelProps={{
                                    shrink: true,
                                }}
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
                        onClick={handleUpdateAppointment}
                    >
                        {t(strings.update)}
                    </Button>
                </Grid>
            </Grid>
            <RecallDialog
                patientID={patient.value}
                loadedRecalls={recalls}
                open={openRecallDialog}
                onClose={handleCloseRecallDialog}
                onSelect={setRecalls}
                selectedDate={date}
            />
            <TreatmentDialog
                patientID={patient.value}
                loadedTreatments={treatments}
                open={openTreatmentDialog}
                onClose={handleCloseTreatmentDialog}
                onSelect={setTreatments}
                selectedDate={date}
            />
        </Paper>
    )
}

export default UpdateAppointmentTab;