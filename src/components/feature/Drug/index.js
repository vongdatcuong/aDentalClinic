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
const createData=(id,name,quantity,date,patient)=>{
    return {id,name,quantity,date,patient};
};
const dataColumnsName=["index","id","name","quantity","date","patient"]
const rows = [
    createData('1712320', "Drug 01", "Good", "02/01/2020", "Dat"),
    createData('1712321', "Drug 02", "Good", "03/01/2020", "Doan"),
    createData('1712322', "Drug 03", "Good", "04/01/2020", "Vu"),
    createData('1712323', "Drug 04", "Good", "05/01/2020", "Tien"),
    createData('1712324', "Drug 05", "Good", "06/01/2020", "Ho"),
    createData('1712325', "Drug 06", "Good", "07/01/2020", "Sy"),
    createData('1712326', "Drug 07", "Good", "08/01/2020", "Thai"),
    createData('1712327', "Drug 08", "Good", "09/01/2020", "Cuong"),
    createData('1712328', "Drug 09", "Good", "10/01/2020", "Vong"),
    createData('1712329', "Drug 10", "Good", "11/01/2020", "Tang"),
    createData('1712330', "Drug 11", "Good", "12/01/2020", "Hung"),
    createData('1712331', "Drug 12", "Good", "13/01/2020", "Dan"),


];



const Drug = () => {
    const {t, i18n } = useTranslation();

    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchText,setSearchText]=useState(null);
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

    const titles=[
        t(strings.index),
        t(strings.id),
        t(strings.fullname),
        t(strings.quantity),
        t(strings.date),
        t(strings.patient),
    ];
    return (
        <div className={classes.container}>
            
            <div >
                <Grid container>
                    <Grid item xs={8}>
                        <Typography className={classes.title} variant="h4">
                            {t(strings.drug)}
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
                        <IconButton  >
                            <FilterList />

                        </IconButton>
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

export default Drug;