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
const createData=(id,fullname,birth,gender,address)=>{
    return {id,fullname,birth,gender,address};
};
const rows = [
    createData('1712320', "Dat", "01/01/1999", "Male", "HCM sadfasdf ads fsda fasd fads fasd fa asd asdas das dasdasdasdasdsadasdsadasdasdas"),
    createData('1712321', "Doan", "02/01/1999", "Male", "HCM"),
    createData('1712322', "Thai", "03/01/1999", "Male", "HCM"),
    createData('1712323', "Dan", "04/01/1999", "Male", "HCM"),
    createData('1712324', "Cuong", "05/01/1999", "Male", "HCM"),
    createData('1712325', "Vong", "06/01/1999", "Male", "HCM"),
    createData('1712326', "Hung", "07/01/1999", "Male", "HCM"),
    createData('1712327', "The", "08/01/1999", "Male", "HCM"),
    createData('1712328', "Anh", "09/01/1999", "Male", "HCM"),
    createData('1712329', "Nguyen", "10/01/1999", "Female", "HCM"),
    createData('1712330', "Tang", "11/01/1999", "Female", "HCM"),
    createData('1712331', "Vu", "12/01/1999", "Female", "HCM"),


];

const Providers = () => {
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
                            {t(strings.providers)}
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
                                {t(strings.fullname)}
                            </TableCell>
                            <TableCell className={classes.titleColumn} >
                                {t(strings.birth)}
                            </TableCell>
                            <TableCell className={classes.titleColumn} >
                                {t(strings.gender)}
                            </TableCell>
                            <TableCell className={classes.titleColumn}>
                                {t(strings.address)}
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
                                    {index+1+page * rowsPerPage}
                                </TableCell>
                                <TableCell align="center">
                                    {row.id}
                                </TableCell>
                                <TableCell >
                                    {row.fullname}
                                </TableCell>
                                <TableCell >
                                    {row.birth}
                                </TableCell>
                                <TableCell >
                                    {row.gender}
                                </TableCell>
                                <TableCell >
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

export default Providers;