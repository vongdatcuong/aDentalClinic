import React,{useState} from 'react';
import { makeStyles, useTheme  } from "@material-ui/core/styles";
//translation
import { useTranslation, Trans } from 'react-i18next';

// @material-ui/core Component
import Container from '@material-ui/core/Container';
import { Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TablePagination,
    TableRow,
    TableHead,
    Paper,
    TextField,
    InputLabel ,
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
import MenuBar from "../../../layouts/MenuBar";
import TablePaginationActions from "../../../layouts/TablePaginationActions";

const useStyles = makeStyles(styles);
const createData=(id,name,quantity,date,patient)=>{
    return {id,name,quantity,date,patient};
};
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

    const classes = useStyles(darkTheme);
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
    return (
        <div className={classes.container}>
            {/* <MenuBar/> */}
            
            <div className={classes.content}>
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
                                defaultValue={t(strings.search)}
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
                
                <Container style={{marginLeft:"10px"}}>
                
               
                <TableContainer component={Paper}>
                
                <Table className={classes.table} aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.titleColumn} align="center">
                                {t(strings.index)}
                            </TableCell>
                            <TableCell className={classes.titleColumn} align="center">
                                {t(strings.id)}
                            </TableCell>
                            <TableCell className={classes.titleColumn}>
                                {t(strings.name)}
                            </TableCell>
                            <TableCell className={classes.titleColumn} >
                                {t(strings.quantity)}
                            </TableCell>
                            <TableCell className={classes.titleColumn} >
                                {t(strings.date)}
                            </TableCell>
                            <TableCell className={classes.titleColumn}>
                                {t(strings.patient)}
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : rows
                        ).map((row,index) => (
                            <TableRow key={row.id}>
                                
                                <TableCell align="center">
                                    {index+1+page*rowsPerPage}

                                </TableCell>
                                <TableCell align="center">
                                    {row.id}
                                </TableCell>
                                <TableCell >
                                    {row.name}
                                </TableCell>
                                <TableCell >
                                    {row.quantity}
                                </TableCell>
                                <TableCell >
                                    {row.date}
                                </TableCell>
                                <TableCell >
                                    {row.patient}
                            </TableCell>
                            </TableRow>
                        ))}

                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                            </TableRow>
          )}
                    </TableBody>
            <TableFooter style={{marginLeft:"300px"}}>
                <TableRow>
              
                    <TablePagination
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    colSpan={3}
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                        inputProps: { 'aria-label': 'rows per page' },
                        native: true,
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                    labelRowsPerPage={t(strings.rowsPerPage)}

                    />
                </TableRow>
                
            </TableFooter>
                </Table>
            </TableContainer>
        
                </Container>
                
                
            </div>
            
        </div>
    )
}

export default Drug;