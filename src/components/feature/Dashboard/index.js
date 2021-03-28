import React, { useState, useEffect } from 'react';
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
import Slide from '@material-ui/core/Slide';
import Box from '@material-ui/core/Box';
import styles from "./jss";

// Components
import Schedulerr from "./Scheduler";
import LoadingPage from '../../../layouts/LoadingPage';
import RightSidebar from '../../../layouts/RightSidebar';
import AppoinmentTab from './AppointmentTab';

// API
import api from '../../../api/base-api';
import apiPath from '../../../api/path';

// Utils
import ConvertDateTimes from '../../../utils/datetimes/convertDateTimes';

const useStyles = makeStyles(styles);

const DashBoard = () => {
    const classes = useStyles();
    const [t, i18n] = useTranslation();

    // States
    const [isLoadingPage, setIsLoadingPage] = useState(true);
    const [appointments, setAppointments] = useState([]);
    const [blocks, setBlocks] = useState([]);

    const [chairs, setChairs] = useState(
        [
            { text: `${t(strings.chair)} 1`, id: 1 },
        ]
    );

    const [selectedDate, setSelectedDate] = useState(new Date("2021-03-07"));
    const [cellDuration, setCellDuration] = useState(figures.defaultCellDuration);
    const [startDayHour, setStartDayHour] = useState(figures.defaultStartDayHour);
    const [endDayHour, setEndDayHour] = useState(figures.defaultEndDayHour);

    // Slide
    const [checkedScheduler, setCheckedScheduler] = useState(true);

    useEffect(async () => {
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
                    },
                }),
                api.httpGet({
                    url: apiPath.appointment.appointment + apiPath.appointment.block,
                    query: {
                        date: ConvertDateTimes.formatDate(new Date(), strings.apiDateFormat)
                    },
                }),
            ];
            const result = await Promise.all(promiseAll);
            if (result[0].success && result[1].success && result[2].success || 1){
                setIsLoadingPage(false);
                // Chairs
                const chairss = result[0].payload.map((chair, index) => Object.assign({}, chair, {
                    id: chair._id,
                    text: `${t(strings.chair)} ${chair.order} (${chair.name})`,
                }));
                setChairs(chairss);
                // Appointments
                const appointmentss = result[1].payload.map((appointment) => {
                    const aDate = new Date(appointment.appointment_date);
                    const aTime = appointment.appointment_time;
                    aDate.setHours(aTime.slice(0, 2));
                    aDate.setMinutes(aTime.slice(2));
                    const endDate = moment(aDate).add(Number(appointment.duration), "minutes")
                    return {
                        id: appointment._id,
                        title: appointment.note,
                        chairId: appointment.chair._id,
                        startDate: aDate,
                        endDate: endDate
                    }
                });
                setAppointments(appointmentss);
                // Blocks
                setBlocks(
                    [{
                        block: true,
                        chairId: 1,
                        startDate: new Date(2017, 4, 29, 11, 30),
                        endDate: new Date(2017, 4, 29, 12, 30),
                      }, {
                        block: true,
                        chairId: 2,
                        startDate: new Date(2017, 4, 29, 15, 30),
                        endDate: new Date(2017, 4, 29, 16, 30),
                      },
                    ]  
                );
            } else {
                toast.error(t(strings.loadAppointmentFailMsg));    
            }
        } catch(err){
            toast.error(t(strings.loadAppointmentFailMsg));
        }
    }, []);

    // Time Table Cell
    const handleTimeTableCellClick = (info, startDate, endDate) => {
        setCheckedScheduler(false);
    }

    const handleCloseAppointmentTab = () => {
        setCheckedScheduler(true);
    }

    // Toolbar
    // Filter chair
    const handleSelectChair = () => {
        alert('qwe');
    }

    // Right sidebar
    const handleSelectDateRightSidebar = (date) => {
        setSelectedDate(date);
    }

    return (
        <React.Fragment>
            <Container className={classes.container}>
                {(isLoadingPage)? 
                    <LoadingPage/>
                    :
                    <React.Fragment>
                        <Slide direction="left" in={!checkedScheduler}>
                            <Box p={0} m={0} className={classes.appointmentTabBox}>
                                <AppoinmentTab 
                                    onClose={handleCloseAppointmentTab}
                                />qweqweqweqwe
                            </Box>
                        </Slide>
                        <Slide direction="right" in={checkedScheduler} mountOnEnter unmountOnExit>
                            <Box p={0} m={0}>
                                <Schedulerr
                                    appointments={appointments}
                                    blocks={blocks}
                                    chairs={chairs}
                                    selectedDate={selectedDate}
                                    cellDuration={cellDuration}
                                    startDayHour={startDayHour}
                                    endDayHour={endDayHour}
                                    tableCellClick={handleTimeTableCellClick}
                                    onSelectChair={handleSelectChair}
                                />
                            </Box>
                        </Slide>
                    </React.Fragment>
                }
            </Container>
            <RightSidebar handleSelectDate={handleSelectDateRightSidebar}/>
        </React.Fragment>
    )
}

export default DashBoard;