import React,{useEffect, useState} from 'react';
import { makeStyles, useTheme  } from "@material-ui/core/styles";
//api
import {secretKey, initializeAPIService, httpPost,httpGet} from '../../../api/base-api';
import apiPath from '../../../api/path';
import PatientRecallService from "../../../api/patientRecall/patientRecall.service";
//translation
import { useTranslation, Trans } from 'react-i18next';

// @material-ui/core Component
import Container from '@material-ui/core/Container';
import { Typography,
    Divider,
    TextField,
    InputLabel ,
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
import AccessAlarm from '@material-ui/icons/AccessAlarm';
import PropTypes from 'prop-types';

import styles from "./jss";
import darkTheme from "../../../themes/darkTheme";
import { toast } from 'react-toastify';
import moment from 'moment';
//import configs
import strings from "../../../configs/strings";
//import image

//import icons
import SearchIcon from '@material-ui/icons/Search';
import FilterList from '@material-ui/icons/FilterList';
import AddBox from '@material-ui/icons/AddBox';

//import component
import TableCustom from "../../common/TableCustom";
import InsertPatientRecall from "../InsertPatientRecall";
import UpdatePatientRecall from "../UpdatePatientRecall";
const useStyles = makeStyles(styles);



const PatientRecall = () => {
    const {t, i18n } = useTranslation();
    const classes = useStyles();
    //
    const createData=(id,patient, treatment, appointment, procedure,recallDate,note)=>{
        return {id,patient, treatment, appointment, procedure,recallDate,note};
    };
    
    const dataColumnsName=["index","patient","treatment",
        "appointment","procedure","recallDate","note"];
    const titles=[
        t(strings.index),
        t(strings.patient),
        t(strings.treatment),
        t(strings.appointment),
        t(strings.procedure),
        t(strings.recallDate),
        t(strings.note),
    ];
    
    //state
    const [insertPatientRecall,setInsertPatientRecall]=useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchText,setSearchText]=useState(null);
    const [rows,setRows]=useState([]);
    const [editable,setEditable]=useState(false);
    const [isEdited,setIsEdited]=useState(false);
    const [selectedRow,setSelectedRow]=useState(-1);
    const [selectedRowData,setSelectedRowData]=useState(null);
    const [isInsert,setIsInsert]=useState(false);
    const [isUpdate,setIsUpdate]=useState(false);
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    
    const handleChangeSelectedRow=(value)=>{
        setSelectedRow(value);
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

    const handleChangeInsertPatientRecall=(e)=>{
        setInsertPatientRecall(!insertPatientRecall);
    }

    const handleChangeEditable=(e)=>{
        setEditable(!editable);
    }

    const handleChangeIsEdited=(e)=>{
        console.log("Handle change edit");
        setIsEdited(!isEdited);
    }

    const handleGoBack=(e)=>{
        setInsertPatientRecall(false);
        setIsEdited(false);
        setSelectedRow(-1);
        setSelectedRowData(null);
    }
    const handleChangeIsInsert=(e)=>{
        setIsInsert(!isInsert);
    }
    const handleChangeIsUpdate=(e)=>{
        setIsUpdate(!isUpdate);
    }
    const changeData=(data)=>{
        let temp=[];
        data.map((a,index)=>{
            
            let newData=createData(a._id,a.patient.user.first_name+" "+a.patient.user.last_name,a.treatment,a.appointment,a.procedure,moment(a.recall_date).format("DD/MM/YYYY"),a.note);
            temp=temp.concat(newData);
        })
        console.log("Check rows in change data:",temp);
        setRows(temp);
    }
    const getPatientRecall=async()=>{
        const result=await PatientRecallService.getPatientRecall();
        console.log("Get recall in useEffect:",result.data);
        if(result.success)
        {
            changeData(result.data);

        }
    };
    useEffect(()=>{
        
        if(rows.length===0)
        {
            
            getPatientRecall();
            
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
        if(isInsert===true)
        {
            getPatientRecall();
            setIsInsert(false);
        }
        if(isUpdate===true)
        {
            getPatientRecall();
            setIsUpdate(false);
        }
    })
    return (
        <div className={classes.container}>
            
            <div className={classes.content}>
                <Grid container>
                    <Grid item xs={8}>
                        <Typography className={classes.title} variant="h4">
                            {t(strings.recall)}
                        </Typography>
                    </Grid>
                    {insertPatientRecall===true || isEdited===true ?

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
                            <IconButton onClick={handleChangeInsertPatientRecall}>
                                <AddBox />            

                            </IconButton>
                        </Grid>
                    
                    }

                </Grid>

                <Divider className={classes.titleDivider}/>

                    
                    
                
                <Container style={{marginLeft:"10px"}}>
                    {insertPatientRecall===true && isEdited=== false ?
                        <InsertPatientRecall
                                handleChangeIsInsert={handleChangeIsInsert}


                        />
                        : isEdited===true &&selectedRowData!==null ?
                        <UpdatePatientRecall
                                        editable={editable}
                                        id={selectedRowData.id}
                                        handleChangeIsUpdate={handleChangeIsUpdate}

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
            
        </div>
    )
}

export default PatientRecall;