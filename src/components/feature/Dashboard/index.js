import React, { useState, useEffect, useContext, useCallback, useRef } from 'react';
import { makeStyles, useTheme  } from "@material-ui/core/styles";
import strings from '../../../configs/strings';
import figures from '../../../configs/figures';

// Route
import path from '../../../routes/path';

import {
    useHistory
} from "react-router-dom";

// moment
import moment from 'moment';

// i18next
import { useTranslation } from 'react-i18next';

// Toast
import { toast } from 'react-toastify';

// @material-ui/core Component
import Container from '@material-ui/core/Container';
import Fade from '@material-ui/core/Fade';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';

import styles from "./jss";

// Components
import Schedulerr from "./Scheduler";
import LoadingPage from '../../../layouts/LoadingPage';
import RightSidebar from '../../../layouts/RightSidebar';
import AppoinmentTab from './AppointmentTab';
import UpdateAppointmentTab from './UpdateAppointmentTab';
import ConfirmDialog from '../../dialogs/ConfirmDialog';
import AppointmentRequestPopover from './AppointmentRequestPopover';

// API
import api from '../../../api/base-api';
import apiPath from '../../../api/path';

// Utils
import ConvertDateTimes from '../../../utils/datetimes/convertDateTimes';

// Context
import { loadingStore } from '../../../contexts/loading-context';
import { socketStore } from '../../../contexts/socket-context';

// Socket
import {
    notifyAppointReqRes,
    notifyAppointReqResOff,
    notifyUpdateAppointReqRes,
    notifyUpdateAppointReqResOff,
    notifyDeleteAppointReqRes,
    notifyDeleteAppointReqResOff
} from '../../../socket/appointment-socket';

const useStyles = makeStyles(styles);

const DashBoard = () => {
    const classes = useStyles();
    const [t, i18n] = useTranslation();
    const history = useHistory();

    // Context
    const {loadingState, dispatchLoading} = useContext(loadingStore);
    const {socketState, dispatchSocket} = useContext(socketStore);

    // Ref
    const calendarRef = useRef(null);
    const previousDateRef = useRef();

    // States
    const [isLoadingPage, setIsLoadingPage] = useState(true);
    const [appointments, setAppointments] = useState([]);
    const [blocks, setBlocks] = useState([]);

    const [chairs, setChairs] = useState([]);
    const [holidays, setHolidays] = useState([]);

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [cellDuration, setCellDuration] = useState(figures.defaultCellDuration);
    const [startDayHour, setStartDayHour] = useState(figures.defaultStartDayHour);
    const [endDayHour, setEndDayHour] = useState(figures.defaultEndDayHour);

    // Slide
    const [displayTab, setDisplayTab] = useState(0);    //0: Scheduler, 1: Add Appointment Tab, 2: Update Appointment Tab
    const [selectedChairId, setSelectedChairId] = useState(null);
    const [selectedAppointStart, setSelectedAppointStart] = useState(null);
    const [selectedDuration, setSelectedDuration] = useState(figures.defaultCellDuration);

    // Filter Patient
    const [patientDisplayObj, setPatientDisplayObj] = useState(Object.create(null));

    // Dialogs
    const [selectedAppoint, setSelectedAppoint] = useState(null);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [confirmType, setConfirmType] = useState(0);  // 0: Delete appointment, 1: Reject Appointment Request
    const [confirmDialogMsg, setConfirmDialogMsg] = useState("");

    const [isWillMount, setIsWillMount] = useState(true);

    // Appointment tooltip popover
   const [openAppointTooltip, setOpenAppointTooltip] = useState(false);
   const [appointPatientObj, setAppointPatientObj] = useState(Object.create(null));

   // Update appointment
   const [selectedAppointID, setSelectedAppointmentID] = useState("");

   // Appoint Request Popover
   const [appointReqAnchor, setAppointReqAnchor] = useState(null);
   const [appointRequests, setAppointRequests] = useState([]);
   const [selectedAppointReqIdx, setSelectedAppointReqIdx] = useState(-1);

    // Will mount
    const handleWillMount = useCallback(async () => {
        try {
            const promiseAll = [
                api.httpGet({
                    url: apiPath.appointment.appointment + apiPath.appointment.chair,
                    query: {
                        active: true
                    },
                }),
                api.httpGet({
                    url: apiPath.appointment.appointment,
                    query: {
                        date: ConvertDateTimes.formatDate(selectedDate, strings.apiDateFormat),
                        active_chair_only: true
                    },
                }),
                api.httpGet({
                    url: apiPath.appointment.appointment + apiPath.appointment.block,
                    query: {
                        date: ConvertDateTimes.formatDate(selectedDate, strings.apiDateFormat),
                        active_chair_only: true
                    },
                }),
                api.httpGet({
                    url: apiPath.practice.practice,
                    query: {

                    }
                }),
                api.httpGet({
                    url: apiPath.holiday.holiday,
                    query: {

                    }
                }),
                api.httpGet({
                    url: apiPath.appointment.appointRequest,
                })
            ];
            const result = await Promise.all(promiseAll);
            if (result[0].success && result[1].success && result[2].success && result[3].success && result[4].success){
                let aDate, aTime, newAppointPatientObj = Object.create(null);
                // Chairs
                const chairss = result[0].payload.map((chair, index) => Object.assign({}, chair, {
                    id: chair._id,
                    title: `${t(strings.chair)} (${chair.name})`,
                    isDisplay: true,
                }));
                setChairs(chairss);
                // Appointments
                const appointmentss = result[1].payload.map((appointment) => {
                    aDate = new Date(appointment.appointment_date);
                    aTime = appointment.appointment_time;
                    aDate.setHours(aTime.slice(0, 2));
                    aDate.setMinutes(aTime.slice(2));
                    const endDate = moment(aDate).add(Number(appointment.duration), "minutes");

                    // Appointment Patient Object
                    newAppointPatientObj[appointment._id] = appointment.patient._id;
                    return {
                        id: appointment._id,
                        title: (appointment.patient?.user?.first_name + " " + appointment.patient?.user?.last_name) || appointment.note || "",
                        resourceId: appointment.chair._id,
                        start: aDate,
                        end: (endDate.isValid())? endDate._d : aDate,
                        patientGender: appointment.patient?.gender || "",
                        chair: appointment.chair,
                        status: appointment.status,
                        note: appointment.note,
                        assistantDisplay: (appointment.assistant)? 
                                        appointment.assistant.user.first_name + " " + appointment.assistant.user.last_name + " (" + appointment.assistant.display_id + ")"
                                        : t(strings.no),
                        providerDisplay: (appointment.provider)? 
                                        appointment.provider.user.first_name + " " + appointment.provider.user.last_name + " (" + appointment.provider.display_id + ")"
                                        : t(strings.no),
                        backgroundColor: (appointment.provider)? appointment.provider.provider_color : appointment.chair.color,
                    }
                });
                setAppointments(appointmentss);
                setAppointPatientObj(newAppointPatientObj);
                // Blocks
                const blockss = result[2].payload.map((block) => {
                    aDate = new Date(block.block_date);
                    aTime = block.block_time;
                    aDate.setHours(aTime.slice(0, 2));
                    aDate.setMinutes(aTime.slice(2));
                    const endDate = moment(aDate).add(Number(block.duration), "minutes");
                    return {
                        id: block._id,
                        resourceId: block.chair,
                        start: aDate,
                        end: (endDate.isValid())? endDate : aDate,
                        block: true
                    }
                });
                setBlocks(blockss);
                // Practice
                const practice = result[3].payload;
                const startSlices = [practice.start_time.slice(0, 2), practice.start_time.slice(2)]
                const endSlices = [practice.end_time.slice(0, 2), practice.end_time.slice(2)]
                const startTime = Number(startSlices[0]) + Number(startSlices[1]) / 60;
                const endTime = Number(endSlices[0]) + Number(endSlices[1]) / 60;
                if (startTime >= 0 && startTime <= 24 && endTime >= 0 && endTime <= 24){
                    setStartDayHour(startSlices.join(":"));
                    setEndDayHour(endSlices.join(":"));
                };
                // Holiday
                const holidayss = [];
                for (let i = 0; i <= 12; i++){
                    holidayss.push(Object.create(null));
                }
                result[4].payload.forEach((day) => {
                    let startDate = Number(day.start_date.slice(0, 2));
                    let startMonth = Number(day.start_date.slice(3));
                    let endDate = Number(day.end_date.slice(0, 2));
                    let endMonth = Number(day.end_date.slice(3));
                    if (startMonth === endMonth){
                        for (let i = startDate; i <= endDate; i++){
                            if (!holidayss[startMonth][i]){
                                holidayss[startMonth][i] = [];
                            }
                            holidayss[startMonth][i].push(day.description);
                        }
                    } else {
                        let daysInMonth = 0;
                        while (startMonth <= endMonth){
                            daysInMonth = moment(selectedDate.getFullYear().toString() + " " + startMonth).daysInMonth();
                            for (let i = startDate; i <= daysInMonth; i++){
                                if (holidayss[startMonth][i]){
                                    holidayss[startMonth][i].push(day.description);
                                } else {
                                    holidayss[startMonth][i] = [day.description];
                                }
                            }
                            startDate = 0;
                            startMonth++;
                        }
                    }
                })
                setHolidays(holidayss);

                // Appointment request
                if (result[5].success){
                    setAppointRequests(result[5].payload);
                }
                setIsLoadingPage(false);
            } else {
                toast.error(t(strings.loadAppointmentFailMsg));    
            }
        } catch(err){
            toast.error(t(strings.loadAppointmentFailMsg));
        }
    }, [selectedDate]);

    const handleDidUpdate = useCallback(async () => {
        try {
            dispatchLoading({type: strings.setLoading, isLoading: true});
            const promiseAll = [
                api.httpGet({
                    url: apiPath.appointment.appointment,
                    query: {
                        date: ConvertDateTimes.formatDate(selectedDate, strings.apiDateFormat),
                        active_chair_only: true
                    },
                }),
                api.httpGet({
                    url: apiPath.appointment.appointment + apiPath.appointment.block,
                    query: {
                        date: ConvertDateTimes.formatDate(selectedDate, strings.apiDateFormat),
                        active_chair_only: true
                    },
                }),
            ];
            const result = await Promise.all(promiseAll);
            if (result[0].success && result[1].success){
                let aDate, aTime, newAppointPatientObj = Object.create(null);
                // Appointments
                const appointmentss = result[0].payload.map((appointment) => {
                    aDate = new Date(appointment.appointment_date);
                    aTime = appointment.appointment_time;
                    aDate.setHours(aTime.slice(0, 2));
                    aDate.setMinutes(aTime.slice(2));
                    const endDate = moment(aDate).add(Number(appointment.duration), "minutes");

                    // Appointment Patient Object
                    newAppointPatientObj[appointment._id] = appointment.patient._id;
                    return {
                        id: appointment._id,
                        title: (appointment.patient?.user?.first_name + " " + appointment.patient?.user?.last_name) || appointment.note || "",
                        resourceId: appointment.chair._id,
                        start: aDate,
                        end: (endDate.isValid())? endDate._d : aDate,
                        patientGender: appointment.patient?.gender || "",
                        chair: appointment.chair,
                        status: appointment.status,
                        note: appointment.note,
                        assistantDisplay: (appointment.assistant)? 
                                        appointment.assistant.user.first_name + " " + appointment.assistant.user.last_name + " (" + appointment.assistant.display_id + ")"
                                        : t(strings.no),
                        providerDisplay: (appointment.provider)? 
                                        appointment.provider.user.first_name + " " + appointment.provider.user.last_name + " (" + appointment.provider.display_id + ")"
                                        : t(strings.no),
                        backgroundColor: (appointment.provider)? appointment.provider.provider_color : appointment.chair.color,
                    }
                });
                setAppointments(appointmentss);
                setAppointPatientObj(newAppointPatientObj);

                // Blocks
                const blockss = result[1].payload.map((block) => {
                    aDate = new Date(block.block_date);
                    aTime = block.block_time;
                    aDate.setHours(aTime.slice(0, 2));
                    aDate.setMinutes(aTime.slice(2));
                    const endDate = moment(aDate).add(Number(block.duration), "minutes");
                    return {
                        id: block._id,
                        resourceId: block.chair,
                        start: aDate,
                        end: (endDate.isValid())? endDate : aDate,
                        block: true
                    }
                })
                setBlocks(blockss);
                dispatchLoading({type: strings.setLoading, isLoading: false});
            } else {
                dispatchLoading({type: strings.setLoading, isLoading: false});
                toast.error(t(strings.loadAppointmentFailMsg));    
            }
            resetFilter();
        } catch(err){
            dispatchLoading({type: strings.setLoading, isLoading: false});
            toast.error(t(strings.loadAppointmentFailMsg));
            resetFilter();
        }
    }, [selectedDate]);

    const handleLoadAppointRequests = useCallback(async () => {
        try {
            const result = await api.httpGet({
                url: apiPath.appointment.appointRequest,
            });
            if (result.success){
                setAppointRequests(result.payload);
            } else {
                toast.error(result.message);
            }
        } catch {

        } finally {

        }
    }, []);

    // Use effect
    useEffect(async () => {
        if (!previousDateRef.current || previousDateRef.current.getTime() !== selectedDate.getTime()){
            try {
                if (isWillMount){
                    handleWillMount();
                    setIsWillMount(false);
                } else {
                    handleDidUpdate();
                }   
                // Inverval Appointment Request
            } catch (err){
    
            }
            previousDateRef.current = selectedDate;
        }
        /*const interval = setInterval(() => {
            handleLoadAppointRequests();
        }, figures.loadAppointReqIntervalTime)*/
        // Get appointment requests socket
        if (socketState.socket){
            // Add
            notifyAppointReqResOff(socketState.socket);
            notifyAppointReqRes(socketState.socket, appointRequests, setAppointRequests);
            // Update
            notifyUpdateAppointReqResOff(socketState.socket);
            notifyUpdateAppointReqRes(socketState.socket, appointRequests, setAppointRequests);
            // Delete
            notifyDeleteAppointReqResOff(socketState.socket);
            notifyDeleteAppointReqRes(socketState.socket, appointRequests, setAppointRequests);
        }
        return () => {
            if (socketState.socket){
                notifyAppointReqResOff(socketState.socket);
                notifyUpdateAppointReqResOff(socketState.socket);
                notifyDeleteAppointReqResOff(socketState.socket);
            }
        }
    }, [selectedDate, appointRequests]);

    // Time Table Cell
    const handleTimeTableCellClick = useCallback((chairID, startDate) => {
        setDisplayTab(1);
        setSelectedChairId(chairID);
        setSelectedAppointStart(new Date(startDate));
        setSelectedDuration(cellDuration);
    }, [cellDuration]);

    const handleTimeTableCellSelect = useCallback((chairID, startDate, endDate) => {
        const momentStart = moment(startDate);
        const momentEnd = moment(endDate);
        if (momentStart.isValid() && momentEnd.isValid()){
            const duration = moment.duration(momentEnd.diff(momentStart)).asMinutes();
            if (duration >= cellDuration && duration <= figures.maxAppointmentDuration){
                setDisplayTab(1);
                setSelectedChairId(chairID);
                setSelectedAppointStart(new Date(startDate));
                setSelectedDuration(duration);
            } else {
                toast.error(t(strings.appointDurationErrMsg));
            }
        } else {
            toast.error(t(strings.dateRangeInvalid));
        }
    }, [cellDuration]);

    const handleCloseAppointmentTab = useCallback(() => {
        setDisplayTab(0);
        setSelectedChairId(null);
        setSelectedAppointReqIdx(-1);
    },[]);

    // Appointment Tab
    const handleOnAppointTabSelectChair = (evt) => {
        setSelectedChairId(evt.target.value);
    }

    const handleOnAppointTabSelectDate = (type, value) => {
        setSelectedAppointStart(value);
    }

    const handleSelectDate = useCallback((date) => {
        const newDate = date.start;
        //newDate.setHours(0);
        if (newDate){
            setSelectedDate(newDate);
        } else {
            toast.error(t(strings.dateRangeInvalid));
        }
    }, []);

    // Toolbar
    // Filter chair
    const handleSelectChair = useCallback((chairsDisplay) => {
        const newChairs = [...chairs];
        chairsDisplay.forEach((display, index) => {
            newChairs[index].isDisplay = display;
        });
        setChairs(newChairs);
    }, [chairs]);

    const handleSelectPatient = (patientDisplayObj) => {
        setPatientDisplayObj(patientDisplayObj);
    }

    const resetFilter = () => {
        setPatientDisplayObj(Object.create(null));
    }

    // Right sidebar
    const handleSelectDateRightSidebar = (date) => {
        calendarRef.current.getApi().gotoDate(date)
    }

    // DELETE
    const handleOpenConfirmDeleteAppoint = (appointID) => {
        setOpenConfirmDialog(true);
        setSelectedAppoint(appointID);
        setConfirmDialogMsg(t(strings.appointment));
        setConfirmType(0);
    }

    const handleOpenConfirmRejectReq = (requestID) => {
        setOpenConfirmDialog(true);
        // Action Type
        // Make use of selectedAppoint useState
        setSelectedAppoint(requestID);
        setConfirmType(1);
        setConfirmDialogMsg(t(strings.request));
    }

    const handleCloseConfirmDialog = () => {
        setOpenConfirmDialog(false);
    }

    const handleConfirmDialogAction = () => {
        if (confirmType === 0){
            handleDeleteAppointment();
        } else {
            handleRejectAppointReq();
        }
    }
    // Make use of selectedAppoint useState
    const handleRejectAppointReq = useCallback(async () => {
        try {
            dispatchLoading({ type: strings.setLoading, isLoading: true});
            const promises = [
                api.httpDelete({
                    // Make use of selectedAppoint useState
                    url: apiPath.appointment.appointRequest + '/' + selectedAppoint
                }),
            ];
            const result = await Promise.all(promises);
            if (result[0].success){
                //
                const newAppointmentReqs = appointRequests.filter((request) => request._id != selectedAppoint);
                setAppointRequests(newAppointmentReqs);
                setSelectedAppoint(null);
                setSelectedAppointReqIdx(-1);
            } else {
                toast.error(result.message);
            }
        } catch(err){
            toast.error(t(strings.deleteAppointReqErrMsg));
        } finally {
            dispatchLoading({ type: strings.setLoading, isLoading: false});
        }
        setOpenConfirmDialog(false);
    }, [selectedAppoint, appointRequests]);

    const handleDeleteAppointment = useCallback(async () => {
        try {
            dispatchLoading({ type: strings.setLoading, isLoading: true});
            const promises = [
                api.httpDelete({
                    url: apiPath.appointment.appointment + '/' + selectedAppoint
                }),
            ];
            const result = await Promise.all(promises);
            if (result[0].success){
                setOpenAppointTooltip(false);
                //
                const newAppointments = appointments.filter((appoint) => appoint.id != selectedAppoint);
                setAppointments(newAppointments);
                setSelectedAppoint(null);
                toast.success(t(strings.deleteAppointmentSuccess));
            } else {
                toast.error(result.message);
            }
        } catch(err){
            toast.error(t(strings.deleteAppointmentErrMsg));
        } finally {
            dispatchLoading({ type: strings.setLoading, isLoading: false});
        }
        setOpenConfirmDialog(false);
    }, [selectedAppoint, appointments]);

    // Add appointment
    const handleAddAppointment = useCallback(async (isNewPatient, patientData, appointData, resetFieldsFunc) => {
        try {
            dispatchLoading({type: strings.setLoading, isLoading: true});
            if (isNewPatient){
                const resultPatient = await api.httpPost({
                    url: apiPath.patient.patient,
                    body: patientData
                });
                // Add New Patient before add new appointment
                if (resultPatient.success){
                    appointData.patient = resultPatient.payload._id;
                } else {
                    toast.error(t(strings.addAppointmentErrMsg));
                    return false;
                }
            } else {
                if (!appointData.patient){
                    toast.error(t(strings.addAppointmentErrMsg));
                    return false;
                }
            }

            // Appointment Request
            const appointRequest = (selectedAppointReqIdx != -1)? appointRequests[selectedAppointReqIdx] : null;
            if (appointRequest){
                appointData.request_id = appointRequest._id;
            }

            const promiseAll = [
                api.httpPost({
                    url: apiPath.appointment.appointment,
                    body: appointData
                }),
            ];
            const result = await Promise.all(promiseAll);
            if (result[0].success){
                toast.success(t(strings.addAppointmentSuccess));
                // Set new Appointment
                const appointment = result[0].payload;
                const newAppointments = [...appointments];
                let aDate, aTime;
                aDate = new Date(appointment.appointment_date);
                aTime = appointment.appointment_time;
                aDate.setHours(aTime.slice(0, 2));
                aDate.setMinutes(aTime.slice(2));
                const endDate = moment(aDate).add(Number(appointment.duration), "minutes");
                newAppointments.push({
                    id: appointment._id,
                    title: (patientData.first_name + " " + patientData.last_name) || appointment.note || "",
                    resourceId: appointment.chair._id,
                    start: aDate,
                    end: (endDate.isValid())? endDate._d : aDate,
                    patientGender: appointment.patient?.gender || "",
                    chair: appointment.chair,
                    status: appointment.status,
                    note: appointment.note,
                    assistantDisplay: (appointment.assistant)? 
                                    appointment.assistant.user.first_name + " " + appointment.assistant.user.last_name + " (" + appointment.assistant.display_id + ")"
                                    : t(strings.no),
                    providerDisplay: (appointment.provider)? 
                                    appointment.provider.user.first_name + " " + appointment.provider.user.last_name + " (" + appointment.provider.display_id + ")"
                                    : t(strings.no),
                    backgroundColor: (appointment.provider)? appointment.provider.provider_color : appointment.chair.color,
                });

                // Appointment Request
                if (appointRequest){
                    setAppointRequests([...appointRequests.slice(0, selectedAppointReqIdx), ...appointRequests.slice(selectedAppointReqIdx + 1)])
                }
                setAppointments(newAppointments);
                resetFieldsFunc();
                handleCloseAppointmentTab();
            } else {
                toast.error(result[0].message);
                return false;
            }
        } catch(err){
            toast.error(t(strings.addAppointmentErrMsg));
            return false;
        } finally {
            dispatchLoading({type: strings.setLoading, isLoading: false});
        }
    }, [appointments, selectedAppointReqIdx, appointRequests]);
    
    // Update appointment
    const handleOpenUpdateAppointTab = (appointID) => {
        setSelectedAppointmentID(appointID);
        setDisplayTab(2);
    }

    const handleCloseUpdateAppointTab = () => {
        setSelectedAppointmentID("");
        setDisplayTab(0);
    }

    const handleUpdateAppointment = useCallback(async (appointID, patientData, appointData, resetFieldsFunc) => {
        try {
            dispatchLoading({type: strings.setLoading, isLoading: true});
            const promiseAll = [
                api.httpPatch({
                    url: apiPath.appointment.appointment + '/' + appointID,
                    body: appointData
                }),
            ];
            const result = await Promise.all(promiseAll);
            if (result[0].success){
                toast.success(t(strings.updateAppointmentSuccess));
                // Set new Appointment
                const appointment = result[0].payload;
                let aDate, aTime;
                aDate = new Date(appointment.appointment_date);
                aTime = appointment.appointment_time;
                aDate.setHours(aTime.slice(0, 2));
                aDate.setMinutes(aTime.slice(2));
                const endDate = moment(aDate).add(Number(appointment.duration), "minutes");
                const newAppointments = [];
                appointments.forEach((appoint) => {
                    if (appoint.id != appointID){
                        newAppointments.push(appoint);
                    } else {
                        newAppointments.push({
                            id: appointment._id,
                            title: (patientData.first_name + " " + patientData.last_name) || appointment.note || "",
                            resourceId: appointment.chair._id,
                            start: aDate,
                            end: (endDate.isValid())? endDate._d : aDate,
                            patientGender: appointment.patient?.gender || "",
                            chair: appointment.chair,
                            status: appointment.status,
                            note: appointment.note,
                            assistantDisplay: (appointment.assistant)? 
                                            appointment.assistant.user.first_name + " " + appointment.assistant.user.last_name + " (" + appointment.assistant.display_id + ")"
                                            : t(strings.no),
                            providerDisplay: (appointment.provider)? 
                                            appointment.provider.user.first_name + " " + appointment.provider.user.last_name + " (" + appointment.provider.display_id + ")"
                                            : t(strings.no),
                            backgroundColor: (appointment.provider)? appointment.provider.provider_color : appointment.chair.color,
                        });
                    }
                })
                setAppointments(newAppointments);
                resetFieldsFunc();
                handleCloseUpdateAppointTab();
            } else {
                toast.error(result[0].message);
                return false;
            }
        } catch(err){
            toast.error(t(strings.updateAppointmentErrMsg));
            return false;
        } finally {
            dispatchLoading({type: strings.setLoading, isLoading: false});
        }
    }, [selectedAppoint, appointments]);

    const handleToPatientProfile = useCallback((appointID) => {
        const patientID = appointPatientObj[appointID];
        if (patientID){
            history.push(path.patientPathNoS + '/' + patientID  + path.profilePath);
        }
    }, [appointPatientObj]);

    // Appoint Request Popover
    const handleOpenAppointReqPop = useCallback((evt) => {
        setAppointReqAnchor(evt.currentTarget);
    }, []);

    const handleCloseAppointReqPop = useCallback(() => {
        setAppointReqAnchor(null);
    }, []);

    const handleSelectAppointReq = useCallback((index) => {
        if (displayTab != 1){
            return;
        }
        if (index === selectedAppointReqIdx){
            setSelectedAppointReqIdx(-1);
        } else {
            setSelectedAppointReqIdx(index);
        }
    }, [selectedAppointReqIdx, displayTab]);

    return (
        <React.Fragment>
            <Container className={classes.container}>
                {(isLoadingPage)? 
                    <LoadingPage/>
                    :
                    <React.Fragment>
                        <Fade in={displayTab == 1}>
                            <Box p={0} m={0} className={classes.appointmentTabBox} style={{display: (displayTab == 1)? "block" : "none"}}>
                                <AppoinmentTab
                                    selectedChairId={selectedChairId}
                                    selectedAppointStart={selectedAppointStart}
                                    selectedDuration={selectedDuration}
                                    chairs={chairs}
                                    cellDuration={cellDuration}
                                    startDayHour={startDayHour}
                                    endDayHour={endDayHour}
                                    holidays={holidays}
                                    appointRequest={(selectedAppointReqIdx !== -1)? appointRequests[selectedAppointReqIdx] : null}
                                    onClose={handleCloseAppointmentTab}
                                    onSelectChair={handleOnAppointTabSelectChair}
                                    onSelectDate={handleOnAppointTabSelectDate}
                                    onAddAppointment={handleAddAppointment}
                                    setSelectedAppointReqIdx={setSelectedAppointReqIdx}
                                    onSelectDuration={setSelectedDuration}
                                />
                            </Box>
                        </Fade>
                        <Fade in={displayTab == 2}>
                            <Box p={0} m={0} className={classes.appointmentTabBox} style={{display: (displayTab == 2)? "block" : "none"}}>
                                <UpdateAppointmentTab
                                    selectedAppointID={selectedAppointID}
                                    chairs={chairs}
                                    cellDuration={cellDuration}
                                    startDayHour={startDayHour}
                                    endDayHour={endDayHour}
                                    holidays={holidays}
                                    onClose={handleCloseUpdateAppointTab}
                                    onUpdateAppointment={handleUpdateAppointment}
                                    isEditAppointAllowed={true}
                                />
                            </Box>
                        </Fade>
                        <Fade  in={displayTab == 0} >
                            <Box p={0} m={0} style={{display: (displayTab == 0)? "block" : "none"}}>
                                <Schedulerr
                                    user={{}}
                                    isImmutable={false}
                                    calendarRef={calendarRef}
                                    appointments={appointments}
                                    blocks={blocks}
                                    chairs={chairs}
                                    selectedDate={selectedDate}
                                    cellDuration={cellDuration}
                                    startDayHour={startDayHour}
                                    endDayHour={endDayHour}
                                    patientDisplayObj={patientDisplayObj}
                                    onlyMine={false}
                                    holidays={holidays}
                                    tableCellClick={handleTimeTableCellClick}
                                    tableCellSelect={handleTimeTableCellSelect}
                                    onSelectChair={handleSelectChair}
                                    onSelectPatient={handleSelectPatient}
                                    onSelectDate={handleSelectDate}
                                    onDeleteAppointment={handleOpenConfirmDeleteAppoint}
                                    openAppointTooltip={openAppointTooltip}
                                    setOpenAppointTooltip={setOpenAppointTooltip}
                                    onUpdateAppointment={handleOpenUpdateAppointTab}
                                    onToPatientProfile={handleToPatientProfile}
                                />
                            </Box>
                        </Fade>
                    </React.Fragment>
                }
            </Container>
            {/* FAB: Appointment Request */}
            <Fab
                variant="extended"
                size="small"
                color="secondary"
                aria-label="open-appointment-request-popover"
                className={classes.fabAppointRequest}
                onClick={handleOpenAppointReqPop}
            >
                <Badge badgeContent={appointRequests.length} color="secondary">
                    <NotificationsIcon/>
                </Badge>
                &nbsp;{t(strings.request)}
            </Fab>
            <AppointmentRequestPopover
                selectedAppointReqIdx={selectedAppointReqIdx}
                anchorEl={appointReqAnchor}
                appointRequest={appointRequests}
                onClose={handleCloseAppointReqPop}
                onSelect={handleSelectAppointReq}
                onRejectReq={handleOpenConfirmRejectReq}
            />
            {/* Confirm Delete appointment */}
            <ConfirmDialog
                open={openConfirmDialog}
                onClose={handleCloseConfirmDialog}
                action={handleConfirmDialogAction}
            >
                {t(strings.areYouSureWantTo) + " " + t(strings.btnDelete) + " " + confirmDialogMsg} 
            </ConfirmDialog>
            <RightSidebar handleSelectDate={handleSelectDateRightSidebar}/>
        </React.Fragment>
    )
}

export default DashBoard;