import React,{useState} from 'react';
import { makeStyles, useTheme  } from "@material-ui/core/styles";
import { useParams, useHistory } from "react-router-dom";
import path from '../../../routes/path';
import clsx from 'clsx';
//import configs
import strings from '../../../configs/strings';
import figures from '../../../configs/figures';

//translation
import { useTranslation, Trans } from 'react-i18next';

// @material-ui/core Component
import Container from '@material-ui/core/Container';
import { Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableRow,
    TableHead,
    TableFooter,
    Paper,
    InputAdornment,
    FormControl,
    OutlinedInput,
    Divider,
    Tooltip
 } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import PropTypes from 'prop-types';

import styles from "./jss";

//import image

//import icons
import SearchIcon from '@material-ui/icons/Search';
import FilterList from '@material-ui/icons/FilterList';
import AddBox from '@material-ui/icons/AddBox';

//import component
import Footer from '../../../layouts/Footer';

const useStyles = makeStyles(styles);
const createData=(id,fullname,birth,gender,address)=>{
    return {id,fullname,birth,gender,address};
};
const rows = [
    createData('1712320', "Dat", "01/01/1999", "Male", "HCM sadfasdf ads fsda fasd fads fasd fa asd asdas das dasdasdasdasdsadasdsadasdasdas"),
    createData('1712321', "Doan", "02/01/1999", "Male", "HCM"),
    createData('1712322', "Thai", "03/01/1999", "Male", "HCM"),
    createData('1712323', "Dan", "04/01/1999", "Male", "HCM"),
    createData('1712324', "CuoqweqweqweqCuoqweqweqweqwengCuoqweqweqweqwengCuoqweqweqweqwengCuoqweqweqweqwengCuoqweqweqweqwengCuoqweqweqweqwengweng", "05/01/1999", "Male", "HCM"),
    createData('1712325', "Vong", "06/01/1999", "Male", "HCM"),
    createData('1712326', "Hung", "07/01/1999", "Male", "HCM"),
    createData('1712327', "The", "08/01/1999", "Male", "HCM"),
    createData('1712328', "Anh", "09/01/1999", "Male", "HCM"),
    createData('1712329', "Nguyen", "10/01/1999", "Female", "HCM"),
    createData('1712330', "Tang", "11/01/1999", "Female", "HCM"),
    createData('1712331', "Vu", "12/01/1999", "Female", "HCM"),


];
const useStyles1 = makeStyles((theme) => ({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
}));
const TablePaginationActions=(props)=> {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;
  
    const handleFirstPageButtonClick = (event) => {
      onChangePage(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onChangePage(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onChangePage(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <div className={classes.root}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
}
TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

const Patients = () => {
    const history = useHistory();
    const {t, i18n } = useTranslation();

    const classes = useStyles();

    // States
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(figures.defaultRowsPerPage);
    const [searchText,setSearchText]=useState("");
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
            <Grid container spacing={0}>
                <Grid item md={7} xs={4}>
                    <Typography className={classes.title} variant="h5" component="h5">{t(strings.patient)}</Typography>
                </Grid>
                <Grid item md={3} xs={5} className={classes.serviceControl}>
                    <FormControl variant="filled">
                        <OutlinedInput
                            className={classes.searchControl}
                            type='text'
                            value={searchText}
                            fullWidth
                            placeholder={t(strings.search)}
                            onChange={handleChangeSearchText}
                            endAdornment={
                            <InputAdornment position="end">
                                <SearchIcon className={classes.iconButton} />
                            </InputAdornment>
                            }
                            color="primary"
                        />
                    </FormControl>
                </Grid>
                <Grid item md={2} xs={3}>
                    <Tooltip title={t(strings.filter)}>
                        <IconButton className={classes.serviceIconBtn}>
                            <FilterList fontSize="large" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={t(strings.add)}>
                        <IconButton className={classes.serviceIconBtn}>
                            <AddBox fontSize="large" />          
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>
            <Divider className={classes.titleDivider}/>
            <div className={classes.content}>
                <Container className={classes.tableContainer}>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="custom pagination table">
                            <TableHead>
                                <TableRow onClick={() => history.push(path.patientProfilePath)}>
                                    <TableCell align="center" className={clsx(classes.titleColumn, classes.tableCell)} width="5%">
                                        {t(strings.index)}
                                    </TableCell>
                                    <TableCell algin="center" className={clsx(classes.titleColumn, classes.tableCe)} width="15%">
                                        {t(strings.id)}
                                    </TableCell>
                                    <TableCell align="left" className={clsx(classes.titleColumn, classes.tableCe)} width="20%">
                                        {t(strings.fullname)}
                                    </TableCell>
                                    <TableCell align="left" className={clsx(classes.titleColumn, classes.tableCe)} width="10%">
                                        {t(strings.birth)}
                                    </TableCell>
                                    <TableCell align="center" className={clsx(classes.titleColumn, classes.tableCe)} width="10%">
                                        {t(strings.gender)}
                                    </TableCell>
                                    <TableCell align="left" className={clsx(classes.titleColumn, classes.tableCe)} width="50%">
                                        {t(strings.address)}
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(rowsPerPage > 0
                                    ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : rows
                                ).map((row,index) => (
                                    <TableRow key={row.id} onClick={() => history.push(path.patientProfilePath)}>
                                        <TableCell align="center" width="5%" className={classes.tableCell}>
                                            {page * rowsPerPage + index + 1}
                                        </TableCell>
                                        <TableCell algin="left" width="15%" className={classes.tableCell}>
                                            {row.id}
                                        </TableCell>
                                        <TableCell align="left" width="20%" className={classes.tableCell}>
                                            {row.fullname}
                                        </TableCell>
                                        <TableCell align="left" width="10%" className={classes.tableCell}>
                                            {row.birth}
                                        </TableCell>
                                        <TableCell align="center" width="10%" className={classes.tableCell}>
                                            {row.gender}
                                        </TableCell>
                                        <TableCell align="left" width="50%" className={classes.tableCell}>
                                            {row.address}
                                    </TableCell>
                                    </TableRow>
                                ))}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[...figures.rowsPerPageOption, { label: 'All', value: -1 }]}
                                        count={rows.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
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
            <Footer/>
        </div>
    )
}

export default Patients;