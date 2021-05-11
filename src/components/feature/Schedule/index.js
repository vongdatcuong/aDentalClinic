import React,{useState, useEffect} from 'react';
import { makeStyles } from "@material-ui/core/styles";

//translation
import { useTranslation } from 'react-i18next';

// Toast
import { toast } from 'react-toastify';

// @material-ui/core Component
import Container from '@material-ui/core/Container';
import { Typography,
    Divider,
    InputAdornment,
    FormControl,
    OutlinedInput,
    Select,
    MenuItem,
 } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import styles from "./jss";
//import configs
import strings from "../../../configs/strings";
import lists from "../../../configs/lists";
//import image

//import icons
import SearchIcon from '@material-ui/icons/Search';

//import component
import TableCustom from "../../common/TableCustom";
import UpdateSchedule from "../UpdateSchedule";
import LoadingPage from '../../../layouts/LoadingPage';

// API
import api from '../../../api/base-api';
import apiPath from '../../../api/path';
import AuthService from '../../../api/authentication/auth.service';

// Utils
import ConvertDateTimes from '../../../utils/datetimes/convertDateTimes';
import ConvertSchedule from '../../../utils/datetimes/convertSchedule';


const useStyles = makeStyles(styles);

const Schedule = () => {
    const {t, i18n } = useTranslation();
    const classes = useStyles();

    const user = AuthService.getCurrentUser();
    const isAdmin = (user?.user_type === lists.staff.staffType.admin);

    const dataColumnsName=["index","id","provider", "note"];
    const titles=[
        t(strings.index),
        t(strings.id),
        t(strings.provider),
        t(strings.note),
    ];

    const days = lists.date.dates.map((day) => t(day));
    const emptyRow = {
        schedule: {
            monthly: [],
            weekly: [],
            auto: [],
        }
    }

    // States
    const [isLoadingPage, setIsLoadingPage] = useState(true);
    const [searchText,setSearchText]=useState(null);
    const [editable,setEditable]=useState(false);

    const [originalData, setOriginalData] = useState([]);
    const [data, setData] = useState(originalData);

    // Change Tab
    const [selectedRow,setSelectedRow]=useState(-1);
    const [selectedRowData,setSelectedRowData]=useState(emptyRow);

    useEffect(async() => {
        try {
            const promises = [
                api.httpGet({
                    url: apiPath.staff.staff + apiPath.staff.provider,
                    query: {
                      get_schedule: true,
                      //date: ConvertDateTimes.formatDate(new Date(), strings.apiDateFormat)
                    }
                }),
            ];
            const result = await Promise.all(promises);
            if (result[0].success){
                const newData = result[0].payload.map((provider) => {
                    const providerUser = provider.user || {};
                    const providerSchedule = provider.schedule || {};
                    const scheduleObj = {
                        monthly: [],
                        weekly: [],
                        auto: [],
                        autoID: "",
                    }
                    let val = null;
                    // If Provider has schedule
                    if (typeof providerSchedule === "object" && providerSchedule.length > 0){
                        providerSchedule.forEach((schedule) => {
                            val = ConvertSchedule.formatScheduleMode(schedule.mode, schedule.value, days);
                            // Auto
                            if (schedule.mode === lists.schedule.mode.auto){
                                val.forEach((va) => {
                                    scheduleObj.auto.push({
                                        value: va,
                                        valueStr: ConvertDateTimes.formatDate(va, strings.defaultDateFormat)
                                    });
                                });
                                scheduleObj.autoID = schedule._id;
                            } 
                            // Monthly
                            else if (schedule.mode === lists.schedule.mode.monthly){
                                scheduleObj.monthly.push({
                                    _id: schedule._id,
                                    startDate: ConvertDateTimes.formatDate(schedule.start_date, strings.defaultDateFormat),
                                    endDate: schedule.end_date? ConvertDateTimes.formatDate(schedule.end_date, strings.defaultDateFormat) : null,
                                    value: val,
                                    valueStr: val.join(", "),
                                    startDateVal: schedule.start_date? new Date(schedule.start_date) : null
                                });
                            } 
                            // Weekly
                            else if (schedule.mode === lists.schedule.mode.weekly){
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
                                scheduleObj.weekly.push({
                                    _id: schedule._id,
                                    startDate: ConvertDateTimes.formatDate(schedule.start_date, strings.defaultDateFormat),
                                    endDate: schedule.end_date? ConvertDateTimes.formatDate(schedule.end_date, strings.defaultDateFormat) : null,
                                    value: val,
                                    valueStr: valueStr,
                                    startDateVal: schedule.start_date? new Date(schedule.start_date) : null
                                });
                            }
                        })
                    }
                    return {
                        _id: provider._id,
                        id: provider.display_id,
                        provider: providerUser.first_name + " " + providerUser.last_name,
                        note: ConvertSchedule.generateNoteForSchedule(scheduleObj) || "...",
                        schedule: scheduleObj
                    }
                });
                setOriginalData([...newData]);
                setData(newData);
            }
        } catch(err){
            toast.error(t(strings.loadProviderErrMsg));
        } finally {
            setIsLoadingPage(false);
        }
    }, [])

    const handleChangeSelectedRow=(value)=>{
        setSelectedRow(value);
        setSelectedRowData(data[value]);
    }
    
    const handleChangeSearchText = (event) => {
        let value = event.target.value.toLowerCase();
        setSearchText(value);

        const newData = originalData.filter((row) => row.provider.toLowerCase().indexOf(value) !== -1);
        setData(newData);
    };

    const handleChangeEditable=(e)=>{
        setEditable(!editable);
    }

    // Go back
    const handleGoBack=(e)=>{
        // Update data
        const newData = [];
        data.forEach((provi) => {
            if (provi._id === selectedRowData._id){
                selectedRowData.note = ConvertSchedule.generateNoteForSchedule(selectedRowData.schedule) || "...";
                newData.push(selectedRowData);

                // Original Data
                for (let i = 0; i < originalData.length; i++){
                    if (originalData[i]._id === selectedRowData._id){
                        originalData[i] = selectedRowData;
                    }
                }
            } else {
                newData.push(provi);
            }
        })
        setData(newData);

        setSelectedRow(-1);
        setSelectedRowData(emptyRow);
    }
    
    return (
        <div className={classes.container}>
            {(isLoadingPage)? 
                <LoadingPage/> :
                <div>
                    <Grid container>
                        <Grid item xs={8}>
                            <Typography className={classes.title} variant="h4">
                                {t(strings.schedule)}
                            </Typography>
                        </Grid>
                        
                        {(selectedRow !== -1)?
                            <Grid item xs={4}>
                                <Typography variant="h6" onClick={handleGoBack} className={classes.goBack}>
                                    {t(strings.goBack)}
                                </Typography>
                            </Grid>
                            :
                            <Grid item xs={4} className={classes.serviceControl}>
                                <FormControl variant="filled">
                                    <OutlinedInput
                                        className={classes.searchControl}
                                        id="outlined-adornment-password"
                                        type='text'
                                        value={searchText}
                                        placeholder={t(strings.search)}
                                        onChange={handleChangeSearchText}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <SearchIcon className={classes.iconButton} />
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                                {(isAdmin) && 
                                    <Select
                                        value={editable}
                                        onChange={handleChangeEditable}
                                        disableUnderline 
                                        className={classes.status}
                                    >
                                        <MenuItem value={false}>{t(strings.read)}</MenuItem>
                                        <MenuItem value={true}>{t(strings.edit)}</MenuItem>
                                    </Select>
                                }
                            </Grid>
                        }
                    </Grid>
                    <Divider className={classes.titleDivider}/>
                    <Container className={classes.tableContainer}>
                        {(selectedRow !== -1)?
                            <UpdateSchedule 
                                data={selectedRowData}
                                setData={setSelectedRowData}
                                editable={editable}
                            /> :
                            <TableCustom 
                                titles={titles} 
                                data={data}
                                dataColumnsName={dataColumnsName}
                                editable={editable}
                                changeToEditPage={true}
                                handleChangeSelectedRow={handleChangeSelectedRow}
                                numberColumn={dataColumnsName.length}
                            />
                        }
                    </Container>
                </div>
            }
        </div>
    )
}

export default Schedule;