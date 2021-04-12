import React,{useState,useEffect} from 'react';
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
    Tooltip,
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

//api
import {secretKey, initializeAPIService, httpPost,httpGet} from '../../../api/base-api';
import apiPath from '../../../api/path';
import PatientService from "../../../api/patient/patient.service";
//import image

//import icons
import SearchIcon from '@material-ui/icons/Search';
import FilterList from '@material-ui/icons/FilterList';
import AddBox from '@material-ui/icons/AddBox';

//import component
import Footer from '../../../layouts/Footer';
import TableCustom from "../../common/TableCustom";
import InsertPatient from "../InsertPatient";
import UpdatePatient from "../UpdatePatient";

const useStyles = makeStyles(styles);
const createData=(id,fullname, email, phone,gender, status)=>{
    return {id,fullname, email, phone,gender, status};
};

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
    const [rows,setRows]=useState([]);
    const [editable,setEditable]=useState(false);
    const [isEdited,setIsEdited]=useState(false);
    const [selectedRow,setSelectedRow]=useState(-1);
    const [selectedRowData,setSelectedRowData]=useState(null);
    const [insertPerson,setInsertPerson]=useState(false);

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
    const handleChangeSelectedRow=(value)=>{
        setSelectedRow(value);
    };
    const handleChangeInsertPerson=(e)=>{
        setInsertPerson(!insertPerson);
    };

    const handleChangeEditable=(e)=>{
        setEditable(!editable);
    };
    const handleChangeIsEdited=(e)=>{
        console.log("Handle change edit");
        setIsEdited(!isEdited);
    };

    const handleGoBack=(e)=>{
        setInsertPerson(false);
        setIsEdited(false);
        setSelectedRow(-1);
        setSelectedRowData(null);
    };
    const dataColumnsName=["index","fullname","email",
    "phone","gender","status"];
    const titles=[
        t(strings.index),
        t(strings.fullname),
        t(strings.email),
        t(strings.phone),
        t(strings.gender),
        t(strings.status),
    ];
    const changeData=(data)=>{
        let temp=[];
        data.map((a,index)=>{
            let status;
            let gender;
            if(a.is_active===true)
            {
                status=t(strings.active);

            }
            else
            {
                status=t(strings.inactive);
            }
            if(a.gender==="FEMALE")
            {
                gender=t(strings.female);
            }
            else
            {
                gender=t(strings.male);
            }
            let newData=createData(a._id,a.user.first_name+" "+a.user.last_name,a.user.email,a.user.mobile_phone,gender,status);
            temp=temp.concat(newData);

        })
        console.log("Check rows in change data:",temp);
        setRows(temp);
    }
    useEffect(()=>{
        
        if(rows.length===0)
        {
            const getPatient=async()=>{
                const result=await PatientService.getPatient();
                console.log("Get patient in useEffect:",result.data);
                if(result.success)
                {
                    changeData(result.data);
    
                }
            };
            getPatient();
            
        }

        if(selectedRow!==-1)
        {
            if(selectedRowData!==rows[selectedRow] && isEdited===false)
            {
                handleChangeIsEdited();

                setSelectedRowData(rows[selectedRow])
                console.log("Check selected row data:",rows[selectedRow]);
            }

        }
    })
    return (
        <div className={classes.container}>
            
            <div className={classes.content}>
                <Grid container>
                    <Grid item xs={8}>
                        <Typography className={classes.title} variant="h4">
                            {t(strings.patient)}
                        </Typography>
                    </Grid>
                    {insertPerson===true || isEdited===true ?

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
                            <IconButton onClick={handleChangeInsertPerson}>
                                <AddBox />            

                            </IconButton>
                        </Grid>
                    
                    }

                </Grid>

                <Divider className={classes.titleDivider}/>

                    
                    
                
                <Container style={{marginLeft:"10px"}}>
                    {insertPerson===true ?
                        <InsertPatient 
                                        userType={t(strings.userTypePatient)}
                        />
                        : isEdited===true &&selectedRowData!==null ?
                        <UpdatePatient
                                        id={selectedRowData.id}
                                        // last_name={selectedRowData.last_name}
                                        // username={selectedRowData.username}
                                        // password={selectedRowData.password}
                                        // facebook={selectedRowData.facebook}
                                        // fax={selectedRowData.fax}
                                        // mobile_phone={selectedRowData.mobile_phone}
                                        // home_phone={selectedRowData.home_phone}
                                        // staff_photo={selectedRowData.staff_photo}
                                        // email={selectedRowData.email}
                                        // address={selectedRowData.address}
                                        
                                        // is_active={selectedRowData.is_active}

                        />
                        :
                            <TableCustom titles={titles}
                                    data={rows}
                                    dataColumnsName={dataColumnsName}
                                    editable={editable}
                                    handleChangeIsEdited={handleChangeIsEdited}
                                    changeToEditPage={true}
                                    handleChangeSelectedRow={handleChangeSelectedRow}
                                    numberColumn={dataColumnsName.length}
                                    
                                    />
                    }
                   
                   
                </Container>
                
            </div>
            <Footer/>

        </div>
    )
    // return (
    //     <div className={classes.container}>
    //         <Grid container spacing={0}>
    //             <Grid item md={7} xs={4}>
    //                 <Typography className={classes.title} variant="h5" component="h5">{t(strings.patient)}</Typography>
    //             </Grid>
    //             <Grid item md={3} xs={5} className={classes.serviceControl}>
    //                 <FormControl variant="filled">
    //                     <OutlinedInput
    //                         className={classes.searchControl}
    //                         type='text'
    //                         value={searchText}
    //                         fullWidth
    //                         placeholder={t(strings.search)}
    //                         onChange={handleChangeSearchText}
    //                         endAdornment={
    //                         <InputAdornment position="end">
    //                             <SearchIcon className={classes.iconButton} />
    //                         </InputAdornment>
    //                         }
    //                         color="primary"
    //                     />
    //                 </FormControl>
    //             </Grid>
    //             <Grid item md={2} xs={3}>
    //                 <Tooltip title={t(strings.filter)}>
    //                     <IconButton className={classes.serviceIconBtn}>
    //                         <FilterList fontSize="large" />
    //                     </IconButton>
    //                 </Tooltip>
    //                 <Tooltip title={t(strings.add)}>
    //                     <IconButton className={classes.serviceIconBtn}>
    //                         <AddBox fontSize="large" />          
    //                     </IconButton>
    //                 </Tooltip>
    //             </Grid>
    //         </Grid>
    //         <Divider className={classes.titleDivider}/>
    //         <div className={classes.content}>
    //             <Container className={classes.tableContainer}>
    //                 <TableContainer component={Paper}>
    //                     <Table className={classes.table} aria-label="custom pagination table">
    //                         <TableHead>
    //                             <TableRow onClick={() => history.push(path.patientProfilePath)}>
    //                                 <TableCell align="center" className={clsx(classes.titleColumn, classes.tableCell)} width="5%">
    //                                     {t(strings.index)}
    //                                 </TableCell>
    //                                 <TableCell algin="center" className={clsx(classes.titleColumn, classes.tableCe)} width="15%">
    //                                     {t(strings.id)}
    //                                 </TableCell>
    //                                 <TableCell align="left" className={clsx(classes.titleColumn, classes.tableCe)} width="20%">
    //                                     {t(strings.fullname)}
    //                                 </TableCell>
    //                                 <TableCell align="left" className={clsx(classes.titleColumn, classes.tableCe)} width="10%">
    //                                     {t(strings.birth)}
    //                                 </TableCell>
    //                                 <TableCell align="center" className={clsx(classes.titleColumn, classes.tableCe)} width="10%">
    //                                     {t(strings.gender)}
    //                                 </TableCell>
    //                                 <TableCell align="left" className={clsx(classes.titleColumn, classes.tableCe)} width="50%">
    //                                     {t(strings.address)}
    //                                 </TableCell>
    //                             </TableRow>
    //                         </TableHead>
    //                         <TableBody>
    //                             {(rowsPerPage > 0
    //                                 ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    //                                 : rows
    //                             ).map((row,index) => (
    //                                 <TableRow key={row.id} onClick={() => history.push(path.patientProfilePath)}>
    //                                     <TableCell align="center" width="5%" className={classes.tableCell}>
    //                                         {page * rowsPerPage + index + 1}
    //                                     </TableCell>
    //                                     <TableCell algin="left" width="15%" className={classes.tableCell}>
    //                                         {row.id}
    //                                     </TableCell>
    //                                     <TableCell align="left" width="20%" className={classes.tableCell}>
    //                                         {row.fullname}
    //                                     </TableCell>
    //                                     <TableCell align="left" width="10%" className={classes.tableCell}>
    //                                         {row.birth}
    //                                     </TableCell>
    //                                     <TableCell align="center" width="10%" className={classes.tableCell}>
    //                                         {row.gender}
    //                                     </TableCell>
    //                                     <TableCell align="left" width="50%" className={classes.tableCell}>
    //                                         {row.address}
    //                                 </TableCell>
    //                                 </TableRow>
    //                             ))}
    //                             {emptyRows > 0 && (
    //                                 <TableRow style={{ height: 53 * emptyRows }}>
    //                                 <TableCell colSpan={6} />
    //                                 </TableRow>
    //                             )}
    //                         </TableBody>
    //                         <TableFooter>
    //                             <TableRow>
    //                                 <TablePagination
    //                                     rowsPerPageOptions={[...figures.rowsPerPageOption, { label: 'All', value: -1 }]}
    //                                     count={rows.length}
    //                                     rowsPerPage={rowsPerPage}
    //                                     page={page}
    //                                     onChangePage={handleChangePage}
    //                                     onChangeRowsPerPage={handleChangeRowsPerPage}
    //                                     ActionsComponent={TablePaginationActions}
    //                                     labelRowsPerPage={t(strings.rowsPerPage)}
    //                                 />
    //                             </TableRow>
    //                         </TableFooter>
    //                     </Table>
    //                 </TableContainer>
    //             </Container>
    //         </div>
    //         <Footer/>
    //     </div>
    // )
}

export default Patients;