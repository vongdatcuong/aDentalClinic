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
const useStyles = makeStyles(styles);
const createData=(id,provider,number,room,description)=>{
    return {id,provider,number,room,description};
};
const rows = [
    createData('1712320', "Dat", "3", "1", "HCM sadfasdf ads fsda fasd fads fasd fa asd asdas das dasdasdasdasdsadasdsadasdasdas"),
    createData('1712321', "Doan", "4", "1", "HCM"),
    createData('1712322', "Thai", "5", "1", "HCM"),
    createData('1712323', "Dan", "6", "1", "HCM"),
    createData('1712324', "Cuong", "11", "1", "HCM"),
    createData('1712325', "Vong", "13", "1", "HCM"),
    createData('1712326', "Hung", "22", "1", "HCM"),
    createData('1712327', "The", "333", "1", "HCM"),
    createData('1712328', "Anh", "11", "2", "HCM"),
    createData('1712329', "Nguyen", "222", "3", "HCM"),
    createData('1712330', "Tang", "333", "33", "HCM"),
    createData('1712331', "Vu", "11", "44", "HCM"),


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
const Chairs = () => {
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
            <MenuBar/>
            
            <div className={classes.content}>
                <Grid container>
                    <Grid item xs={8}>
                        <Typography className={classes.title} variant="h4">
                            {t(strings.chair)}
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
                            <TableCell className={classes.titleColumn} >
                                {t(strings.index)}
                            </TableCell>
                            <TableCell className={classes.titleColumn} >
                                {t(strings.id)}
                            </TableCell>
                            <TableCell className={classes.titleColumn}>
                                {t(strings.provider)}
                            </TableCell>
                            <TableCell className={classes.titleColumn} >
                                {t(strings.number)}
                            </TableCell>
                            <TableCell className={classes.titleColumn} >
                                {t(strings.room)}
                            </TableCell>
                            <TableCell className={classes.titleColumn}>
                                {t(strings.description)}
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : rows
                        ).map((row,index) => (
                            <TableRow key={row.id}>
                                
                                <TableCell >
                                    {index+1}
                                </TableCell>
                                <TableCell >
                                    {row.id}
                                </TableCell>
                                <TableCell >
                                    {row.provider}
                                </TableCell>
                                <TableCell >
                                    {row.number}
                                </TableCell>
                                <TableCell >
                                    {row.room}
                                </TableCell>
                                <TableCell >
                                    {row.description}
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

export default Chairs;