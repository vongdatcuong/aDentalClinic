import React, { useState, useEffect, useContext, useCallback } from 'react';
import { makeStyles, useTheme  } from "@material-ui/core/styles";
import strings from '../../../configs/strings';
import figures from '../../../configs/figures';

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
import AppoinmentTab from './AppointmentTab';
import ConfirmDialog from '../../dialogs/ConfirmDialog';

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

    // Context
    const {loadingState, dispatchLoading} = useContext(loadingStore);

    // States
    const [isLoadingPage, setIsLoadingPage] = useState(true);
    const [appointments, setAppointments] = useState([]);
    const [blocks, setBlocks] = useState([]);

    const [chairs, setChairs] = useState(
        [
            { text: `${t(strings.chair)} 1`, _id: 1, isDisplay: false },
        ]
    );
    const [holidays, setHolidays] = useState([]);

    const [selectedDate, setSelectedDate] = useState(new Date(2021, 2, 7, 0, 0, 0));
    const [cellDuration, setCellDuration] = useState(figures.defaultCellDuration);
    const [startDayHour, setStartDayHour] = useState(figures.defaultStartDayHour);
    const [endDayHour, setEndDayHour] = useState(figures.defaultEndDayHour);

    // Slide
    const [checkedScheduler, setCheckedScheduler] = useState(true);
    const [selectedChairId, setSelectedChairId] = useState(null);
    const [selectedAppointStart, setSelectedAppointStart] = useState(null);

    // Filter Patient
    const [patientDisplayObj, setPatientDisplayObj] = useState({});

    // Dialogs
    const [selectedAppoint, setSelectedAppoint] = useState(null);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

    const [isWillMount, setIsWillMount] = useState(true);
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
            if (result[0].success && result[1].success && result[2].success && result[3].success && result[4]){
                setIsLoadingPage(false);
                let aDate, aTime;
                // Chairs
                const chairss = result[0].payload.map((chair, index) => Object.assign({}, chair, {
                    id: chair._id,
                    text: `${t(strings.chair)} (${chair.name})`,
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
                    return {
                        id: appointment._id,
                        title: (appointment.patient?.user?.first_name + " " + appointment.patient?.user?.last_name) || appointment.note || "",
                        chairId: appointment.chair._id,
                        startDate: aDate,
                        endDate: (endDate.isValid())? endDate : aDate,
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
                    }
                });
                setAppointments(appointmentss);
                // Blocks
                const blockss = result[2].payload.map((block) => {
                    aDate = new Date(block.block_date);
                    aTime = block.block_time;
                    aDate.setHours(aTime.slice(0, 2));
                    aDate.setMinutes(aTime.slice(2));
                    const endDate = moment(aDate).add(Number(block.duration), "minutes");
                    return {
                        id: block._id,
                        chairId: block.chair,
                        startDate: aDate,
                        endDate: (endDate.isValid())? endDate : aDate,
                        block: true
                    }
                });
                setBlocks(blockss);
                // Practice
                const practice = result[3].payload;
                const startTime = Number(practice.start_time.slice(0, 2)) + Number(practice.start_time.slice(2)) / 60;
                const endTime = Number(practice.end_time.slice(0, 2)) + Number(practice.end_time.slice(2)) / 60;
                if (startTime >= 0 && startTime <= 24 && endTime >= 0 && endTime <= 24){
                    setStartDayHour(startTime);
                    setEndDayHour(endTime);
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
                let aDate, aTime;
                // Appointments
                const appointmentss = result[0].payload.map((appointment) => {
                    aDate = new Date(appointment.appointment_date);
                    aTime = appointment.appointment_time;
                    aDate.setHours(aTime.slice(0, 2));
                    aDate.setMinutes(aTime.slice(2));
                    const endDate = moment(aDate).add(Number(appointment.duration), "minutes");
                    return {
                        id: appointment._id,
                        title: (appointment.patient?.user?.first_name + " " + appointment.patient?.user?.last_name) || appointment.note || "",
                        chairId: appointment.chair._id,
                        startDate: aDate,
                        endDate: (endDate.isValid())? endDate : aDate,
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
                    }
                });
                setAppointments(appointmentss);
                // Blocks
                const blockss = result[1].payload.map((block) => {
                    aDate = new Date(block.block_date);
                    aTime = block.block_time;
                    aDate.setHours(aTime.slice(0, 2));
                    aDate.setMinutes(aTime.slice(2));
                    const endDate = moment(aDate).add(Number(block.duration), "minutes");
                    return {
                        id: block._id,
                        chairId: block.chair,
                        startDate: aDate,
                        endDate: (endDate.isValid())? endDate : aDate,
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
    const handleTimeTableCellClick = useCallback((chair, startDate, endDate) => {
        setCheckedScheduler(false);
        setSelectedChairId(chair.id);
        setSelectedAppointStart(new Date(startDate));
    }, []);

    const handleCloseAppointmentTab = useCallback(() => {
        setCheckedScheduler(true);
        setSelectedChairId(null);
    },[]);

    // Appointment Tab
    const handleOnAppointTabSelectChair = (evt) => {
        setSelectedChairId(evt.target.value);
    }

    const handleOnAppointTabSelectDate = (type, value) => {
        setSelectedAppointStart(value);
    }

    const handleSelectDate = useCallback((date) => {
        const newDate = new Date(date);
        newDate.setHours(0);
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
        setPatientDisplayObj({});
    }

    // Right sidebar
    const handleSelectDateRightSidebar = (date) => {
        setSelectedDate(date);
    }

    // DELETE
    const handleOpenConfirmDelete = (appointID) => {
        setSelectedAppoint(appointID);
        setOpenConfirmDialog(true);
    }

    const handleCloseConfirmDialog = () => {
        setOpenConfirmDialog(false);
    }
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

    return (
        <React.Fragment>
            <Container className={classes.container}>
                {(isLoadingPage)? 
                    <LoadingPage/>
                    :
                    <React.Fragment>
                        <Fade in={!checkedScheduler}>
                            <Box p={0} m={0} className={classes.appointmentTabBox} style={{display: (!checkedScheduler)? "block" : "none"}}>
                                <AppoinmentTab
                                    selectedChairId={selectedChairId}
                                    selectedAppointStart={selectedAppointStart}
                                    chairs={chairs}
                                    cellDuration={cellDuration}
                                    startDayHour={startDayHour}
                                    endDayHour={endDayHour}
                                    holidays={holidays}
                                    onClose={handleCloseAppointmentTab}
                                    onSelectChair={handleOnAppointTabSelectChair}
                                    onSelectDate={handleOnAppointTabSelectDate}
                                />
                            </Box>
                        </Fade>
                        <Fade  in={checkedScheduler} style={{display: (checkedScheduler)? "block" : "none"}}>
                            <Box p={0} m={0}>
                                <Schedulerr
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
                                    onSelectChair={handleSelectChair}
                                    onSelectPatient={handleSelectPatient}
                                    onSelectDate={handleSelectDate}
                                    onDeleteAppointment={handleOpenConfirmDelete}
                                />
                            </Box>
                        </Fade>
                    </React.Fragment>
                }
            </Container>
            {/* Confirm Delete appointment */}
            <ConfirmDialog
                open={openConfirmDialog}
                onClose={handleCloseConfirmDialog}
                action={handleDeleteAppointment}
            >
                {t(strings.areYouSureWantTo) + " " + t(strings.btnDelete) + " " + t(strings.appointment)} 
            </ConfirmDialog>
            <RightSidebar handleSelectDate={handleSelectDateRightSidebar}/>
        </React.Fragment>
    )
}

export default DashBoard;