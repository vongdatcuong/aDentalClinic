import React, { useState, useEffect, useContext, useCallback, useRef } from 'react';
import { makeStyles, useTheme  } from "@material-ui/core/styles";
import strings from '../../../configs/strings';
import figures from '../../../configs/figures';
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
import styles from "./jss";

// Components
import Schedulerr from "./Scheduler";
import LoadingPage from '../../../layouts/LoadingPage';
import RightSidebar from '../../../layouts/RightSidebar';
import UpdateAppointmentTab from './UpdateAppointmentTab';

// API
import api from '../../../api/base-api';
import apiPath from '../../../api/path';

// Utils
import ConvertDateTimes from '../../../utils/datetimes/convertDateTimes';

// Context
import { loadingStore } from '../../../contexts/loading-context';

const useStyles = makeStyles(styles);

const DashBoard = () => {
    const classes = useStyles();
    const [t, i18n] = useTranslation();
    const history = useHistory();

    // Context
    const {loadingState, dispatchLoading} = useContext(loadingStore);

    // Ref
    const calendarRef = useRef(null);

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

    // Filter Patient
    const [patientDisplayObj, setPatientDisplayObj] = useState({});


    const [isWillMount, setIsWillMount] = useState(true);

    // Appointment tooltip popover
   const [openAppointTooltip, setOpenAppointTooltip] = useState(false);
   const [appointPatientObj, setAppointPatientObj] = useState(Object.create(null));

    // Update appointment
    const [selectedAppointID, setSelectedAppointmentID] = useState("");
    const [selectedAppoint, setSelectedAppoint] = useState(null);

    // Will mount
    const handleWillMount = useCallback(async () => {
        try {
            const promiseAll = [
                api.httpGet({
                    url: apiPath.appointment.appointment + apiPath.appointment.chair,
                    query: {
                        
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
                        backgroundColor: appointment.chair.color,
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
                    holidayss.push({})
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
                        backgroundColor: appointment.chair.color
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
        } catch(err){
            dispatchLoading({type: strings.setLoading, isLoading: false});
            toast.error(t(strings.loadAppointmentFailMsg));
        }
    }, [selectedDate]);

    // Use effect
    useEffect(async () => {
        try {
            if (isWillMount){
                handleWillMount();
                setIsWillMount(false);
            } else {
                handleDidUpdate();
            }   
        } catch (err){

        }
    }, [selectedDate]);

    // Time Table Cell
    const handleTimeTableCellClick = useCallback((chairID, startDate) => {
        
    }, []);

    const handleTimeTableCellSelect = useCallback((chairID, startDate, endDate) => {
        
    }, []);


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

    // Right sidebar
    const handleSelectDateRightSidebar = (date) => {
        calendarRef.current.getApi().gotoDate(date);
    }

    const handleUpdatePatientProfile = useCallback((appointID) => {
        const patientID = appointPatientObj[appointID];
        if (patientID){
            history.push(path.patientPathNoS + '/' + patientID  + path.profilePath);
        }
    }, [appointPatientObj]);

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
                            backgroundColor: appointment.chair.color
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
    }, [selectedAppointID, appointments]);

    // To Patient Profile
    const handleToPatientProfile = useCallback((appointID) => {
        const patientID = appointPatientObj[appointID];
        if (patientID){
            history.push(path.patientPathNoS + '/' + patientID  + path.profilePath);
        }
    }, [appointPatientObj]);

    return (
        <React.Fragment>
            <Container className={classes.container}>
                {(isLoadingPage)? 
                    <LoadingPage/>
                    :
                    <React.Fragment>
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
                                    isEditAppointAllowed={false}
                                />
                            </Box>
                        </Fade>
                        <Fade in={displayTab == 0}>
                            <Box p={0} m={0} style={{display: (displayTab == 0)? "block" : "none"}}>
                                <Schedulerr
                                    isImmutable={true}
                                    calendarRef={calendarRef}
                                    appointments={appointments}
                                    blocks={blocks}
                                    chairs={chairs}
                                    selectedDate={selectedDate}
                                    cellDuration={cellDuration}
                                    startDayHour={startDayHour}
                                    endDayHour={endDayHour}
                                    patientDisplayObj={patientDisplayObj}
                                    holidays={holidays}
                                    tableCellClick={handleTimeTableCellClick}
                                    tableCellSelect={handleTimeTableCellSelect}
                                    onSelectChair={handleSelectChair}
                                    onSelectPatient={handleSelectPatient}
                                    onSelectDate={handleSelectDate}
                                    onDeleteAppointment={() => {}}
                                    onUpdateAppointment={handleOpenUpdateAppointTab}
                                    openAppointTooltip={openAppointTooltip}
                                    setOpenAppointTooltip={setOpenAppointTooltip}
                                    onToPatientProfile={handleToPatientProfile}
                                />
                            </Box>
                        </Fade>
                    </React.Fragment>
                }
            </Container>
            <RightSidebar handleSelectDate={handleSelectDateRightSidebar}/>
        </React.Fragment>
    )
}

export default DashBoard;