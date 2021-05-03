import React,{useState,useEffect, useContext, useCallback} from 'react';
import { makeStyles, useTheme  } from "@material-ui/core/styles";
import strings from '../../../configs/strings';
import lists from '../../../configs/lists';

import clsx from 'clsx';

//translation
import { useTranslation, Trans } from 'react-i18next';

// Toast
import { toast } from 'react-toastify';

//api
import api from "../../../api/base-api";
import apiPath from "../../../api/path";

// Utils
import ConvertDateTimes from '../../../utils/datetimes/convertDateTimes';
import ConvertSchedule from '../../../utils/datetimes/convertSchedule';

// contexts
import { loadingStore } from '../../../contexts/loading-context';

// @material-ui/core Component
import { 
    Paper,
    Typography,
    Container,
    Grid,
    Divider,
    Button,
    List,
    ListItem
 } from '@material-ui/core';

import styles from "./jss";

//import icons
import CreateIcon from '@material-ui/icons/Create';
import BackspaceIcon from "@material-ui/icons/Backspace";
import AlbumIcon from '@material-ui/icons/Album';
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import NoDataIcon from '../../common/NoDataIcon';

//import component
import AddScheduleMonthlyDialog from './AddScheduleMonthlyDialog';
import AddScheduleWeeklyDialog from './AddScheduleWeeklyDialog';
import AddScheduleAutoDialog from './AddScheduleAutoDialog';
import ConfirmDialog from '../../dialogs/ConfirmDialog';

const useStyles = makeStyles(styles);


const UpdateSchedule = ({
    editable, data, setData
}) => {
    const {t, i18n } = useTranslation();
    const classes = useStyles();

    const {loadingState, dispatchLoading} = useContext(loadingStore);

    const days = lists.date.dates.map((day) => t(day));
    
    // States
    const [scheduleMonthlyAnc, setScheduleMonthlyAnc] = useState(null);
    const [scheduleWeeklyAnc, setScheduleWeeklyAnc] = useState(null);
    const [scheduleAutoAnc, setScheduleAutoAnc] = useState(null);
    const [selectedScheduleID, setSelectedScheduleID] = useState(null);
    const [selectedDate, setSelectedDate] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    // Delete
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [deleteMode, setDeleteMode] = useState("");
    const [autoDateToDel, setAutoDateToDel] = useState(null);

    useEffect(()=>{
    }, []);

    const handleOpenScheduleMonthly = (evt) => {
        setSelectedScheduleID(null);
        setSelectedDate([]);
        setStartDate(null);
        setEndDate(null);
        setScheduleMonthlyAnc(evt.currentTarget);
    }

    const handleCloseScheduleMonthly = () => {
        setScheduleMonthlyAnc(null);
    }

    const handleOpenScheduleMonthlyUpdate = (evt, schedule, startDate, endDate, value) => {
        setSelectedScheduleID(schedule);
        setSelectedDate(value);
        setStartDate((startDate)? new Date(ConvertDateTimes.formatDateStr(startDate, strings.defaultDateFormat, "YYYY/MM-DD")) : null);
        setEndDate((endDate)? new Date(ConvertDateTimes.formatDateStr(endDate, strings.defaultDateFormat, "YYYY/MM-DD")) : null);
        setScheduleMonthlyAnc(evt.currentTarget);
    }

    // Add schedule
    const handleAddSchedule = useCallback(async (dataa) => {
        dispatchLoading({type: strings.setLoading, isLoading: true});
        try {
            const promises = [
                api.httpPost({
                    url: apiPath.staff.schedule,
                    body: {provider: data._id, ...dataa}
                }),
            ];
            const result = await Promise.all(promises);
            if (result[0].success){
                const newData = {...data};
                const newSchedule = result[0].payload;
                let val = ConvertSchedule.formatScheduleMode(newSchedule.mode, newSchedule.value, days);

                // Monthly
                if (dataa.mode === lists.schedule.mode.monthly){
                    newData.schedule.monthly.push({
                        _id: newSchedule._id,
                        startDate: ConvertDateTimes.formatDate(newSchedule.start_date, strings.defaultDateFormat),
                        endDate: newSchedule.end_date? ConvertDateTimes.formatDate(newSchedule.end_date, strings.defaultDateFormat) : null,
                        value: val,
                        valueStr: val.join(", "),
                        startDateVal: newSchedule.start_date? new Date(newSchedule.start_date) : null
                    });
                    newData.schedule.monthly.sort((a, b) => a.startDateVal - b.startDateVal);
                    setData(newData);
                    handleCloseScheduleMonthly();
                } 
                // Weekly
                else if (dataa.mode === lists.schedule.mode.weekly){
                    let valueStr = "";
                    if (val){
                        let len = val.length;
                        val.forEach((dayVal, index) =>{
                            valueStr+= days[dayVal];
                            if (index < len - 1){
                                valueStr+= ", ";
                            }
                        });
                    }
                    newData.schedule.weekly.push({
                        _id: newSchedule._id,
                        startDate: ConvertDateTimes.formatDate(newSchedule.start_date, strings.defaultDateFormat),
                        endDate: newSchedule.end_date? ConvertDateTimes.formatDate(newSchedule.end_date, strings.defaultDateFormat) : null,
                        value: val,
                        valueStr: valueStr,
                        startDateVal: newSchedule.start_date? new Date(newSchedule.start_date) : null
                    });
                    newData.schedule.weekly.sort((a, b) => a.startDateVal - b.startDateVal);
                    setData(newData);
                    handleCloseScheduleWeekly();
                }
                // Auto
                else {
                    newData.schedule.auto = [];
                    val.forEach((va) => {
                        newData.schedule.auto.push({
                            value: va,
                            valueStr: ConvertDateTimes.formatDate(va, strings.defaultDateFormat)
                        });
                    });
                    newData.schedule.autoID = newSchedule._id;
                    setData(newData);
                    handleCloseScheduleAuto();
                }
            } else {
                toast.error(result[0].message);
            }
        } catch(err){
            toast.error(t(strings.addScheduleErrMsg));
        } finally {
            dispatchLoading({type: strings.setLoading, isLoading: false});
        }
    }, []);

    // Update schedule
    const handleUpdateSchedule = useCallback(async (scheduleID, dataa) => {
        dispatchLoading({type: strings.setLoading, isLoading: true});
        try {
            const promises = [
                api.httpPatch({
                    url: apiPath.staff.schedule + '/' + scheduleID,
                    body: {provider: data._id, ...dataa}
                }),
            ];
            const result = await Promise.all(promises);
            if (result[0].success){
                const newData = {...data};
                const newSchedule = result[0].payload;
                let val = ConvertSchedule.formatScheduleMode(newSchedule.mode, newSchedule.value, days);

                if (dataa.mode === lists.schedule.mode.monthly){
                    for (let i = 0; i < newData.schedule.monthly.length; i++){
                        if (newData.schedule.monthly[i]._id === scheduleID){
                            newData.schedule.monthly[i] = {
                                _id: newSchedule._id,
                                startDate: ConvertDateTimes.formatDate(newSchedule.start_date, strings.defaultDateFormat),
                                endDate: newSchedule.end_date? ConvertDateTimes.formatDate(newSchedule.end_date, strings.defaultDateFormat) : null,
                                value: val,
                                valueStr: val? val.join(", ") : "",
                                startDateVal: newSchedule.start_date? new Date(newSchedule.start_date) : null
                            };
                        }
                    }
                    newData.schedule.monthly.sort((a, b) => a.startDateVal - b.startDateVal);
                    setData(newData);
                    handleCloseScheduleMonthly();
                } else if (dataa.mode === lists.schedule.mode.weekly){
                    for (let i = 0; i < newData.schedule.weekly.length; i++){
                        if (newData.schedule.weekly[i]._id === scheduleID){
                            let valueStr = "";
                            if (val){
                                let len = val.length;
                                val.forEach((dayVal, index) =>{
                                    valueStr+= days[dayVal];
                                    if (index < len - 1){
                                        valueStr+= ", ";
                                    }
                                });
                            }
                            newData.schedule.weekly[i] = {
                                _id: newSchedule._id,
                                startDate: ConvertDateTimes.formatDate(newSchedule.start_date, strings.defaultDateFormat),
                                endDate: newSchedule.end_date? ConvertDateTimes.formatDate(newSchedule.end_date, strings.defaultDateFormat) : null,
                                value: val,
                                valueStr: valueStr,
                                startDateVal: newSchedule.start_date? new Date(newSchedule.start_date) : null
                            };
                        }
                    }
                    newData.schedule.weekly.sort((a, b) => a.startDateVal - b.startDateVal);
                    setData(newData);
                    handleCloseScheduleWeekly();
                } else if (dataa.mode === lists.schedule.mode.auto){
                    newData.schedule.auto = [];
                    val.forEach((va) => {
                        newData.schedule.auto.push({
                            value: va,
                            valueStr: ConvertDateTimes.formatDate(va, strings.defaultDateFormat)
                        });
                    });
                    newData.schedule.autoID = newSchedule._id;
                    setData(newData);
                    handleCloseScheduleAuto();
                }
            } else {
                toast.error(result[0].message);
            }
        } catch(err){
            toast.error(t(strings.updateScheduleErrMsg));
        } finally {
            dispatchLoading({type: strings.setLoading, isLoading: false});
        }
    }, []);

    const handleOpenDeleteConfirm = (scheduleID, mode, date) => {
        setOpenConfirmDialog(true);
        setSelectedScheduleID(scheduleID);
        setDeleteMode(mode);
        if (mode === lists.schedule.mode.auto){
            setAutoDateToDel(date);
        }
    }

    const handleCloseDeleteConfirm = () => {
        setOpenConfirmDialog(false);
        setSelectedScheduleID(null);
        setDeleteMode("");
    }

    const handleDeleteSchedule = useCallback(async () => {
        // Delete auto schedule = update new value
        if (deleteMode === lists.schedule.mode.auto){
            const newAuto = data.schedule.auto.filter((date) => date.value - autoDateToDel != 0);
            if (newAuto.length > 0){
                let val = "";
                newAuto.forEach((date, index) => {
                    if (index != 0){
                        val+= ",";
                    };
                    val+= ConvertDateTimes.formatDate(date.value, strings.apiDateFormat);
                })
                const dataa = {
                    startDate: new Date(),
                    mode: lists.schedule.mode.auto,
                    value: val
                }
                handleUpdateSchedule(data.schedule.autoID, dataa);
                return;
            }
        }
        try {
            dispatchLoading({ type: strings.setLoading, isLoading: true});
            const promises = [
                api.httpDelete({
                    url: apiPath.staff.schedule + '/' + selectedScheduleID
                }),
            ];
            const result = await Promise.all(promises);
            if (result[0].success){
                //
                let newData = {...data};
                if (deleteMode === lists.schedule.mode.monthly){
                    newData.schedule.monthly = newData.schedule.monthly.filter((sche) => sche._id != selectedScheduleID);
                } else if (deleteMode === lists.schedule.mode.weekly){
                    newData.schedule.weekly = newData.schedule.weekly.filter((sche) => sche._id != selectedScheduleID);
                } else if (deleteMode === lists.schedule.mode.auto){    // Delete entirely auto schedule
                    newData.schedule.auto = [];
                    newData.schedule.autoID = "";
                }
                setData(newData);
                handleCloseDeleteConfirm();
            } else {
                toast.error(result[0].message);
            }
        } catch(err){
            toast.error(t(strings.deleteAppointmentErrMsg));
        } finally {
            dispatchLoading({ type: strings.setLoading, isLoading: false});
            setOpenConfirmDialog(false);
        }
    }, [selectedScheduleID, deleteMode]);

    // Schedule Weekly
    const handleOpenScheduleWeekly = (evt) => {
        setSelectedScheduleID(null);
        setSelectedDate([]);
        setStartDate(null);
        setEndDate(null);
        setScheduleWeeklyAnc(evt.currentTarget);
    }

    const handleCloseScheduleWeekly = () => {
        setScheduleWeeklyAnc(null);
    }

    const handleOpenScheduleWeeklyUpdate = (evt, schedule, startDate, endDate, value) => {
        setSelectedScheduleID(schedule);
        setSelectedDate(value);
        setStartDate((startDate)? new Date(ConvertDateTimes.formatDateStr(startDate, strings.defaultDateFormat, "YYYY/MM-DD")) : null);
        setEndDate((endDate)? new Date(ConvertDateTimes.formatDateStr(endDate, strings.defaultDateFormat, "YYYY/MM-DD")) : null);
        setScheduleWeeklyAnc(evt.currentTarget);
    }

    // Schedule Auto
    const handleOpenScheduleAuto = (evt) => {
        setSelectedScheduleID(data.schedule.autoID);
        setSelectedDate(data.schedule.auto);
        setScheduleAutoAnc(evt.currentTarget);
    }

    const handleCloseScheduleAuto = () => {
        setScheduleAutoAnc(null);
    }

    
    return (
        <Container className={classes.container}>
            <div className={classes.providerInfo}>
                <b>{t(strings.id)}</b>: {data.id} <br/>
                <b>{t(strings.provider)}</b>: {data.provider}
            </div>
            {/* MONTHLY */}
            <div className={classes.headerContainer}>
                <Typography className={classes.title} variant="h5" component="h5">{t(strings.monthly)}</Typography>
                {editable && 
                    <Button
                        className={classes.addRecordBtn}
                        onClick={handleOpenScheduleMonthly}
                    >
                        <AddCircleOutlineIcon></AddCircleOutlineIcon> {t(strings.addRecord)}
                    </Button>
                }
            </div>
            <Divider/>            
            <List>
                {(data.schedule?.monthly.length > 0)? 
                    data.schedule?.monthly.map((schedule, index) => {
                        return (
                            <ListItem key={index} className={clsx(classes.itemContainer, classes.monthlyItem)}>
                                <Grid container>
                                    <Grid item md={3} sm={4}>
                                        <span className={classes.itemDate}>
                                            <AlbumIcon/>
                                            <span>{schedule.startDate} - {schedule.endDate || ". . ."}</span>
                                        </span>
                                    </Grid>
                                    <Grid item md={7} sm={5}>
                                        <span className={classes.itemContent}>
                                            {schedule.valueStr}
                                        </span>
                                    </Grid>
                                    <Grid item md={2} sm={3} align="right">
                                        {editable && 
                                            <React.Fragment>
                                                <Button 
                                                    className={classes.updateBtn}
                                                    onClick={(evt) => handleOpenScheduleMonthlyUpdate(evt, schedule._id, schedule.startDate, schedule.endDate, schedule.value)}
                                                >
                                                    <CreateIcon/>
                                                </Button>
                                                <Button 
                                                    className={classes.deleteBtn}
                                                    onClick={() => handleOpenDeleteConfirm(schedule._id, lists.schedule.mode.monthly)}
                                                >
                                                    <BackspaceIcon/>
                                                </Button>
                                            </React.Fragment>
                                        }
                                    </Grid>
                                </Grid>

                            </ListItem>
                        );
                    }) :
                    <div className={classes.noDataContainer}>
                        <NoDataIcon/>
                    </div>
                }
            </List>
            {/* WEEKLY */}
            <div className={classes.headerContainer}>
                <Typography className={classes.title} variant="h5" component="h5">{t(strings.weekly)}</Typography>
                {editable && 
                    <Button
                        className={classes.addRecordBtn}
                        onClick={handleOpenScheduleWeekly}
                    >
                        <AddCircleOutlineIcon></AddCircleOutlineIcon> {t(strings.addRecord)}
                    </Button>
                }
            </div>
            <Divider/>            
            <List>
                {(data.schedule?.weekly.length > 0)? 
                    data.schedule?.weekly.map((schedule, index) => {
                        return (
                            <ListItem key={index} className={clsx(classes.itemContainer, classes.weeklyItem)}>
                                <Grid container>
                                    <Grid item md={3} sm={4}>
                                        <span className={classes.itemDate}>
                                            <AlbumIcon/>
                                            <span>{schedule.startDate} - {schedule.endDate || ". . ."}</span>
                                        </span>
                                    </Grid>
                                    <Grid item md={7} sm={5}>
                                        <span className={classes.itemContent}>
                                            {schedule.valueStr}
                                        </span>
                                    </Grid>
                                    <Grid item md={2} sm={3} align="right">
                                        {editable && 
                                            <React.Fragment>
                                                <Button 
                                                    className={classes.updateBtn}
                                                    onClick={(evt) => handleOpenScheduleWeeklyUpdate(evt, schedule._id, schedule.startDate, schedule.endDate, schedule.value)}
                                                >
                                                    <CreateIcon/>
                                                </Button>
                                                <Button 
                                                    className={classes.deleteBtn}
                                                    onClick={() => handleOpenDeleteConfirm(schedule._id, lists.schedule.mode.weekly)}
                                                >
                                                    <BackspaceIcon/>
                                                </Button>
                                            </React.Fragment>
                                        }
                                    </Grid>
                                </Grid>
    
                            </ListItem>
                        );
                    })
                    : 
                    <div className={classes.noDataContainer}>
                        <NoDataIcon/>
                    </div>
                }
            </List>
            {/* Auto */}
            <div className={classes.headerContainer}>
                <Typography className={classes.title} variant="h5" component="h5">{t(strings.auto)}</Typography>
                {editable && 
                    <Button
                        className={classes.addRecordBtn}
                        onClick={handleOpenScheduleAuto}
                    >
                        <AddCircleOutlineIcon></AddCircleOutlineIcon> {t(strings.addRecord)}
                    </Button>
                }
            </div>
            <Divider/>            
            <div>
                {(data.schedule?.auto.length > 0)? 
                    data.schedule?.auto.map((schedule, index) => {
                        return (
                            <span key={index} className={clsx(classes.itemContainer, classes.autoItem)}>
                                <Grid container>
                                    <Grid item md={1} sm={1} xs={1}></Grid>
                                    <Grid item md={7} sm={7} xs={7}>
                                        <span className={classes.itemContent}>
                                            {schedule.valueStr}
                                        </span>
                                    </Grid>
                                    <Grid item md={3} sm={3} xs={3} align="right">
                                        {editable && 
                                            <Button 
                                                className={clsx(classes.deleteBtn, classes.autoItemDeleteBtn)}
                                                onClick={() => handleOpenDeleteConfirm(data.schedule?.autoID, lists.schedule.mode.auto, schedule.value)}
                                            >
                                                <BackspaceIcon/>
                                            </Button>
                                        }
                                    </Grid>
                                </Grid>
                            </span>
                        );
                    })
                    : 
                    <div className={classes.noDataContainer}>
                        <NoDataIcon/>
                    </div>
                }
            </div>
            {/* Dialogs */}
            {/* Confirm Delete appointment */}
            <ConfirmDialog
                open={openConfirmDialog}
                onClose={handleCloseDeleteConfirm}
                action={handleDeleteSchedule}
            >
                {t(strings.areYouSureWantTo) + " " + t(strings.btnDelete) + " " + t(strings.schedule)} 
            </ConfirmDialog>

            {/* Add Schdule Monthly */}
            <AddScheduleMonthlyDialog
                open={Boolean(scheduleMonthlyAnc)}
                schedule={selectedScheduleID}
                dates={selectedDate}
                startDate={startDate}
                endDate={endDate}
                onClose={handleCloseScheduleMonthly}
                onAddSchedule={handleAddSchedule}
                onUpdateSchedule={handleUpdateSchedule}
            />

            {/* Add Schdule Weekly */}
            <AddScheduleWeeklyDialog
                open={Boolean(scheduleWeeklyAnc)}
                schedule={selectedScheduleID}
                dates={selectedDate}
                startDate={startDate}
                endDate={endDate}
                onClose={handleCloseScheduleWeekly}
                onAddSchedule={handleAddSchedule}
                onUpdateSchedule={handleUpdateSchedule}
                days={days}
            />

            {/* Add Schdule Auto */}
            <AddScheduleAutoDialog
                open={Boolean(scheduleAutoAnc)}
                schedule={selectedScheduleID}
                dates={selectedDate}
                onClose={handleCloseScheduleAuto}
                onAddSchedule={handleAddSchedule}
                onUpdateSchedule={handleUpdateSchedule}
            />
        </Container>
    )
}

export default UpdateSchedule;