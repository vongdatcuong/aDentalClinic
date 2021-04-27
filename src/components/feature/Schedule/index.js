import React,{useState, useEffect} from 'react';
import { makeStyles, useTheme  } from "@material-ui/core/styles";
//translation
import { useTranslation, Trans } from 'react-i18next';

// Toast
import { toast } from 'react-toastify';

// @material-ui/core Component
import Container from '@material-ui/core/Container';
import { Typography,
    Divider,
    InputAdornment,
    FormControl,
    Paper,
    OutlinedInput,
    Select,
    MenuItem,
    Button,
 } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

import styles from "./jss";
//import configs
import strings from "../../../configs/strings";
//import image

//import icons
import SearchIcon from '@material-ui/icons/Search';
import FilterList from '@material-ui/icons/FilterList';
import AddBox from '@material-ui/icons/AddBox';

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
const createData=(id, provider, startDate, endDate, note)=>{
    return {id, provider, startDate, endDate, note};
};

const originalDataa = [
    createData('123', "Doanasd", "01/02/2021", "02/01/1999",  "092140214921059u\n21905u21095u90215u09215u0912q\nweqweqweqweqweqwewqeqweqweqwewqeqweqwe"),
    createData('123', "Doanasd", "01/02/2021", "02/01/1999",  "092140214921059u\n21905u21095u90215u09215u0912q\nweqweqweqweqweqwewqeqweqweqwewqeqweqwe"),
    createData('123', "Doanasd", "01/02/2021", "02/01/1999",  "092140214921059u\n21905u21095u90215u09215u0912q\nweqweqweqweqweqwewqeqweqweqwewqeqweqwe"),
    createData('123', "Doanasd", "01/02/2021", "02/01/1999",  "092140214921059u\n21905u21095u90215u09215u0912q\nweqweqweqweqweqwewqeqweqweqwewqeqweqwe"),
    createData('123', "Doanasd", "01/02/2021", "02/01/1999",  "092140214921059u\n21905u21095u90215u09215u0912q\nweqweqweqweqweqwewqeqweqweqwewqeqweqwe"),
    createData('123', "Doanasd", "01/02/2021", "02/01/1999",  "092140214921059u\n21905u21095u90215u09215u0912q\nweqweqweqweqweqwewqeqweqweqwewqeqweqwe"),
    createData('123', "Doanasd", "01/02/2021", "02/01/1999",  "092140214921059u\n21905u21095u90215u09215u0912q\nweqweqweqweqweqwewqeqweqweqwewqeqweqwe"),
    createData('123', "Doanasd", "01/02/2021", "02/01/1999",  "092140214921059u\n21905u21095u90215u09215u0912q\nweqweqweqweqweqwewqeqweqweqwewqeqweqwe"),
    createData('123', "Doanasd", "01/02/2021", "02/01/1999",  "092140214921059u\n21905u21095u90215u09215u0912q\nweqweqweqweqweqwewqeqweqweqwewqeqweqwe"),
    createData('123', "Doanasd", "01/02/2021", "02/01/1999",  "092140214921059u\n21905u21095u90215u09215u0912q\nweqweqweqweqweqwewqeqweqweqwewqeqweqwe"),
    createData('123', "Doanasd", "01/02/2021", "02/01/1999",  "092140214921059u\n21905u21095u90215u09215u0912q\nweqweqweqweqweqwewqeqweqweqwewqeqweqwe"),
    createData('123', "Doanasd", "01/02/2021", "02/01/1999",  "092140214921059u\n21905u21095u90215u09215u0912q\nweqweqweqweqweqwewqeqweqweqwewqeqweqwe"),
];


const Schedule = () => {
    const {t, i18n } = useTranslation();
    const classes = useStyles();

    const dataColumnsName=["index","id","provider","startDate","endDate", "mode", "note"];
    const titles=[
        t(strings.index),
        t(strings.id),
        t(strings.provider),
        t(strings.startDate),
        t(strings.endDate),
        t(strings.mode),
        t(strings.note),
    ];

    // States
    const [isLoadingPage, setIsLoadingPage] = useState(true);
    const [searchText,setSearchText]=useState(null);
    const [editable,setEditable]=useState(false);

    const [originalData, setOriginalData] = useState([]);
    const [data, setData] = useState(originalData);

    // Change Tab
    const [selectedRow,setSelectedRow]=useState(-1);
    const [selectedRowData,setSelectedRowData]=useState(null);

    useEffect(async() => {
        try {
            const promises = [
                api.httpGet({
                    url: apiPath.staff.staff + apiPath.staff.provider,
                    query: {
                      get_schedule: true
                    }
                }),
            ];
            const result = await Promise.all(promises);
            if (result[0].success){
                const newData = result[0].payload.map((provider) => {
                    const providerUser = provider.user || {};
                    const providerSchedule = provider.schedule || {};
                    const scheduleObj = {
                        startDate: "...",
                        endDate: "...",
                        mode: "...",
                        note: "..."
                    };
                    // If Provider has schedule
                    if (providerSchedule.length > 0){
                        const schedule = providerSchedule[0];
                        scheduleObj.startDate = (schedule.start_date)? ConvertDateTimes.formatDate(schedule.start_date, strings.defaultDateFormat) : "...";
                        scheduleObj.endDate = (schedule.end_date)? ConvertDateTimes.formatDate(schedule.endate, strings.defaultDateFormat) : "...";
                        scheduleObj.mode = schedule.mode || "";
                        scheduleObj.note = ConvertSchedule.formatScheduleMode(schedule.mode, schedule.value || "");
                    }
                    return {
                        _id: provider._id,
                        id: provider.display_id,
                        provider: providerUser.first_name + " " + providerUser.last_name,
                        ...scheduleObj
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
        if (editable){
            setSelectedRow(value);
        }
    }
    
    const handleChangeSearchText = (event) => {
        let value = event.target.value.toLowerCase();
        setSearchText(value);

        const searchRegex = new RegExp(value, "gi");

        const newData = originalData.filter((row) => row.provider.toLowerCase().indexOf(value) != -1);
        setData(newData);
    };

    const handleChangeEditable=(e)=>{
        setEditable(!editable);
    }
    
    return (
        <Paper className={classes.container}>
            {(isLoadingPage)? 
                <LoadingPage/> :
                <Paper>
                    <Grid container>
                        <Grid item xs={8}>
                            <Typography className={classes.title} variant="h4">
                                {t(strings.schedule)}
                            </Typography>
                        </Grid>
                        <Grid item xs={4} className={classes.serviceControl}>
                            <FormControl variant="filled">
                                <OutlinedInput
                                    className={classes.searchControl}
                                    id="outlined-adornment-password"
                                    type={'text'}
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
                            <Select
                                value={editable}
                                onChange={handleChangeEditable}
                                disableUnderline 
                                className={classes.status}
                            >
                                <MenuItem value={false}>{t(strings.read)}</MenuItem>
                                <MenuItem value={true}>{t(strings.edit)}</MenuItem>
                            </Select>
                        </Grid>
                    </Grid>
                    <Divider className={classes.titleDivider}/>
                    <Container style={{marginLeft:"10px"}}>
                        {(editable && selectedRow != -1)?
                            <UpdateSchedule 
                                editable={editable}
                                id={"606ffb4ac0d3f91754328db5"}
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
                        {data.map((d) => d.provider + " " + d.id)}
                    </Container>
                </Paper>
            }
        </Paper>
    )
}

export default Schedule;