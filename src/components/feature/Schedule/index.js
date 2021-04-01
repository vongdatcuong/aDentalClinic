import React,{useState} from 'react';
import { makeStyles, useTheme  } from "@material-ui/core/styles";
//translation
import { useTranslation, Trans } from 'react-i18next';

// @material-ui/core Component
import Container from '@material-ui/core/Container';
import { Typography,
    Divider,
    InputAdornment,
    FormControl,
    FilledInput,
    OutlinedInput,
    Select,
    MenuItem,
 } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import PropTypes from 'prop-types';

import styles from "./jss";
import darkTheme from "../../../themes/darkTheme";
//import configs
import strings from "../../../configs/strings";
//import image

//import icons
import SearchIcon from '@material-ui/icons/Search';
import FilterList from '@material-ui/icons/FilterList';
import AddBox from '@material-ui/icons/AddBox';

//import component
import TableCustom from "../../common/TableCustom";

const useStyles = makeStyles(styles);
const createData=(id,provider,date,workTime,note)=>{
    return {id,provider,date,workTime,note};
};

const dataColumnsName=["index","id","provider","date","workTime","note"];

const rows = [
    createData('1712321', "Doan", "02/01/1999", "7:00", "Fulltime"),
    createData('1712322', "Thai", "03/01/1999", "7:00", "Fulltime"),
    createData('1712323', "Dan", "02/01/1999", "7:00", "Fulltime"),
    createData('1712324', "Cuong", "02/01/1999", "7:00", "Fulltime"),
    createData('1712325', "Vong", "02/01/1999", "7:00", "Fulltime"),
    createData('1712326', "Hung", "02/01/1999", "7:00", "Part-time"),
    createData('1712327', "The", "04/01/1999", "7:00", "Part-time"),
    createData('1712328', "Anh", "05/01/1999", "7:00", "Part-time"),
    createData('1712329', "Nguyen", "06/01/1999", "7:00", "Part-time"),
    createData('1712330', "Tang", "02/01/1999", "7:00", "Part-time"),
    createData('1712331', "Vu", "02/01/1999", "7:00", "Part-time"),


];

const Schedule = () => {
    const {t, i18n } = useTranslation();

    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchText,setSearchText]=useState(null);
    const [editable,setEditable]=useState(false);
    const [isEdited,setIsEdited]=useState(false);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleChangeSearchText = (event) => {
        setSearchText(event.target.value);
    };
    const handleChangeEditable=(e)=>{
        setEditable(!editable);
    }

    const handleChangeIsEdited=(e)=>{
        console.log("Handle change edit");
        setIsEdited(!isEdited);
    }
    const titles=[
        t(strings.index),
        t(strings.id),
        t(strings.provider),
        t(strings.date),
        t(strings.workTime),
        t(strings.note),
    ];
    return (
        <div className={classes.container}>
            
            <div >
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
                        <IconButton >
                            <AddBox />            

                        </IconButton>
                    </Grid>
                    
                    
                </Grid>
                <Divider className={classes.titleDivider}/>
                <Container style={{marginLeft:"10px"}}>
                    <TableCustom titles={titles} data={rows} dataColumnsName={dataColumnsName}/>
                </Container>
                
                
            </div>
            
        </div>
    )
}

export default Schedule;