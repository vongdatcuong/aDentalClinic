import React,{useState} from 'react';
import { makeStyles, useTheme  } from "@material-ui/core/styles";

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
import MenuBar from "../MenuBar";
const useStyles = makeStyles(styles);
const createData=(code,fee,ins,duration,type,abbr,description)=>{
    return {code,fee,ins,duration,type,abbr,description};
};
const rows = [
    createData('1712320', "1000", "ins", "30", "1","ABBR","Description"),
    createData('1712321', "2000", "ins", "40", "1","ABBR","Description"),
    createData('1712322', "3000", "ins", "50", "1","ABBR","Description"),
    createData('1712323', "4000", "ins", "60", "1","ABBR","Description"),
    createData('1712324', "5000", "ins", "70", "1","ABBR","Description"),
    createData('1712325', "6000", "ins", "80", "1","ABBR","Description"),
    createData('1712326', "7000", "ins", "90", "1","ABBR","Description"),
    createData('1712327', "8000", "ins", "11", "1","ABBR","Description"),
    createData('1712328', "9000", "ins", "33", "1","ABBR","Description"),
    createData('1712329', "10000", "ins", "22", "1","ABBR","Description"),
    createData('1712330', "11100", "ins", "1111", "1","ABBR","Description"),
    createData('1712331', "12200", "ins", "99", "1","ABBR","Description"),


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
const Procedure = () => {
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
            
            <div style={{background:darkTheme.whiteColor,marginTop:"30px"}}>
                <Grid container>
                    <Grid item xs={8}>
                        <Typography style={{marginLeft:"30px"}}variant="h4">
                            {strings.procedure}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl style={{width:"200px",height:"50px"}}variant="filled">

                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={'text'}
                                value={searchText}
                                defaultValue={strings.search}
                                onChange={handleChangeSearchText}
                                endAdornment={
                                <InputAdornment position="end">
                                    <SearchIcon style={{cursor:"pointer"}} />

                                </InputAdornment>
                                }
                            />
                        </FormControl>
                        <IconButton style={{margin:"10px"}} >
                            <FilterList />

                        </IconButton>
                        <IconButton style={{margin:"10px"}}>
                            <AddBox />            

                        </IconButton>
                    </Grid>
                    
                    
                </Grid>
                
                <Container style={{marginLeft:"10px"}}>
                
               
                <TableContainer component={Paper}>
                
                <Table className={classes.table} aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.itemIndex} align="left">
                                {strings.index}
                            </TableCell>
                            <TableCell className={classes.itemCode} align="left">
                                {strings.code}
                            </TableCell>
                            <TableCell className={classes.itemFee} align="left">
                                {strings.fee}
                            </TableCell>
                            <TableCell className={classes.itemINS} align="left">
                                {strings.ins}
                            </TableCell>
                            <TableCell className={classes.itemDuration} align="left">
                                {strings.duration}
                            </TableCell>
                            <TableCell className={classes.itemType} align="left">
                                {strings.type}
                            </TableCell>
                            <TableCell className={classes.itemABBR} align="left">
                                {strings.abbr}
                            </TableCell>
                            <TableCell className={classes.itemDescription} align="left">
                                {strings.description}
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : rows
                        ).map((row,index) => (
                            <TableRow key={row.id}>
                                
                                <TableCell className={classes.itemIndexContent} align="left">
                                    {index+1}
                                </TableCell>
                                <TableCell className={classes.itemCodeContent} align="left">
                                    {row.code}
                                </TableCell>
                                <TableCell className={classes.itemFeeContent} align="left">
                                    {row.fee}
                                </TableCell>
                                <TableCell className={classes.itemINSContent} align="left">
                                    {row.ins}
                                </TableCell>
                                <TableCell className={classes.itemDurationContent} align="left">
                                    {row.duration}
                                </TableCell>
                                <TableCell className={classes.itemTypeContent} align="left">
                                    {row.type}
                                </TableCell>
                                <TableCell className={classes.itemABBRContent} align="left">
                                    {row.abbr}
                                </TableCell>
                                <TableCell className={classes.itemDescriptionContent} align="left">
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

export default Procedure;