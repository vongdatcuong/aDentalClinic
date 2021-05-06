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
   
    InputAdornment,
    FormControl,
    OutlinedInput,
    Divider,
    Select,
    MenuItem,
    Button,
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

import PatientService from "../../../api/patient/patient.service";
//import image

//import icons
import SearchIcon from '@material-ui/icons/Search';
// import FilterList from '@material-ui/icons/FilterList';
import AddBox from '@material-ui/icons/AddBox';

//import component
import Footer from '../../../layouts/Footer';
import TableCustom from "../../common/TableCustom";
import InsertPatient from "../InsertPatient";
import UpdatePatient from "../UpdatePatient";

const useStyles = makeStyles(styles);
const createData=(id,fullname, email, phone,gender, status, action)=>{
    return {id,fullname, email, phone,gender, status, action};
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
    const [rowsAll,setRowsAll]=useState([]);
    const [rowsActive,setRowsActive]=useState([]);
    const [rowsInactive,setRowsInactive]=useState([]);

    const [editable,setEditable]=useState(false);
    const [isEdited,setIsEdited]=useState(false);
    const [selectedRow,setSelectedRow]=useState(-1);
    const [selectedRowData,setSelectedRowData]=useState(null);
    const [insertPerson,setInsertPerson]=useState(false);
    const [status,setStatus]=useState(t(strings.active));
    const listStatus=[t(strings.active),t(strings.inactive),t(strings.all)];
    const [isInsert,setIsInsert]=useState(false);
    const [isUpdate,setIsUpdate]=useState(false);
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    
    //handle
    const handleChangeIsInsert=()=>{
        setIsInsert(!isInsert);
    };
    const handleChangeIsUpdate=()=>{
        setIsUpdate(!isUpdate);
    }
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
    const handleChangeStatus=(event)=>{
        setStatus(event.target.value);
        if(event.target.value===t(strings.active))
        {
            setRows(rowsActive);
        }
        if(event.target.value===t(strings.inactive))
        {
            setRows(rowsInactive);
        }
        if(event.target.value===t(strings.all))
        {
            setRows(rowsAll);
        }
        //console.log("Check status:",event.target.value);
    }
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
        //console.log("Handle change edit");
        setIsEdited(!isEdited);
    };

    const handleGoBack=(e)=>{
        setInsertPerson(false);
        setIsEdited(false);
        setSelectedRow(-1);
        setSelectedRowData(null);
    };
    const dataColumnsName=["index","fullname","email",
    "phone","gender","status","action"];
    const titles=[
        t(strings.index),
        t(strings.fullname),
        t(strings.email),
        t(strings.phone),
        t(strings.gender),
        t(strings.status),
        t(strings.action),
    ];
    const changeData=(data)=>{
        let temp=[];
        let tempActive=[];
        let tempInactive=[];
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
            let newData=createData(a._id,a.user.first_name+" "+a.user.last_name,a.user.email,a.user.mobile_phone,gender,status,
            <Button size="small" variant="outlined" color="primary" className={classes.actionButton}
            onClick={() => history.push(path.patientProfilePath.replace(':patientID', a._id))}>{t(strings.profile)}</Button>);
            temp=temp.concat(newData);
            if(status===t(strings.active))
            {
                tempActive=tempActive.concat(newData);
            }
            else
            {
                tempInactive=tempInactive.concat(newData);
            }

        })
        //console.log("Check rows in change data:",temp);
        setRows(tempActive);
        setRowsAll(temp);
        setRowsActive(tempActive);
        setRowsInactive(tempInactive);
    }
    const getPatient=async()=>{
        const result=await PatientService.getPatient();
        //console.log("Get patient in useEffect:",result.data);
        if(result.success)
        {
            changeData(result.data);

        }
    };
    useEffect(()=>{
        
        if(rows.length===0)
        {
            
            getPatient();
            
        }

        if(selectedRow!==-1)
        {
            if(selectedRowData!==rows[selectedRow] && isEdited===false)
            {
                handleChangeIsEdited();

                setSelectedRowData(rows[selectedRow])
                //console.log("Check selected row data:",rows[selectedRow]);
            }

        }
        if(isInsert===true)
        {
            getPatient();
            setIsInsert(false);
        }
        if(isUpdate===true)
        {
            getPatient();
            setIsUpdate(false);
        }
    })
    return (
        <div className={classes.container}>
            
            <div className={classes.content}>
                <Grid container>
                    <Grid item xs={6}>
                        <Typography className={classes.title} variant="h4">
                            {t(strings.patient)}
                        </Typography>
                    </Grid>
                    {insertPerson===true || isEdited===true ?

                        <Grid item xs={6}>
                            <Typography variant="h6" onClick={handleGoBack} className={classes.goBack}>
                                {t(strings.goBack)}
                            </Typography>
                        </Grid>
                        :
                        <Grid item xs={6} className={classes.serviceControl}>
                        
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
                            
                                value={status}
                                onChange={handleChangeStatus}
                                disableUnderline 
                                className={classes.status}
                            >
                            
                                <MenuItem value={listStatus[0]}>{listStatus[0]}</MenuItem>
                                <MenuItem value={listStatus[1]}>{listStatus[1]}</MenuItem>
                                <MenuItem value={listStatus[2]}>{listStatus[2]}</MenuItem>

                            </Select>
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

                    
                    
                
                <Container className={classes.containerTable}>
                    {insertPerson===true ?
                        <InsertPatient 
                                        userType={t(strings.userTypePatient)}
                                        handleChangeIsInsert={handleChangeIsInsert}
                        />
                        : isEdited===true &&selectedRowData!==null ?
                        <UpdatePatient
                                        id={selectedRowData.id}
                                        editable={editable}
                                        handleChangeIsUpdate={handleChangeIsUpdate}
                        />
                        :
                        rows.length!==0 && dataColumnsName.length!==0?
                        <TableCustom titles={titles}
                                    data={rows}
                                    dataColumnsName={dataColumnsName}
                                    editable={editable}
                                    handleChangeIsEdited={handleChangeIsEdited}
                                    changeToEditPage={true}
                                    handleChangeSelectedRow={handleChangeSelectedRow}
                                    numberColumn={dataColumnsName.length}
                        />
                        :
                        <div></div>
                            // status===t(strings.active)?
                            // <TableCustom titles={titles}
                            //         data={rowsActive}
                            //         dataColumnsName={dataColumnsName}
                            //         editable={editable}
                            //         handleChangeIsEdited={handleChangeIsEdited}
                            //         changeToEditPage={true}
                            //         handleChangeSelectedRow={handleChangeSelectedRow}
                            //         numberColumn={dataColumnsName.length}
                                    
                            //         />
                            //         :
                            // status===t(strings.inactive)?
                            // <TableCustom titles={titles}
                            //         data={rowsInactive}
                            //         dataColumnsName={dataColumnsName}
                            //         editable={editable}
                            //         handleChangeIsEdited={handleChangeIsEdited}
                            //         changeToEditPage={true}
                            //         handleChangeSelectedRow={handleChangeSelectedRow}
                            //         numberColumn={dataColumnsName.length}
                                    
                            //         />
                            //         :
                            // <TableCustom titles={titles}
                            //         data={rows}
                            //         dataColumnsName={dataColumnsName}
                            //         editable={editable}
                            //         handleChangeIsEdited={handleChangeIsEdited}
                            //         changeToEditPage={true}
                            //         handleChangeSelectedRow={handleChangeSelectedRow}
                            //         numberColumn={dataColumnsName.length}
                                    
                            //         />        
                    }
                   
                   
                </Container>
                
            </div>
            <Footer/>

        </div>
    )

}

export default Patients;