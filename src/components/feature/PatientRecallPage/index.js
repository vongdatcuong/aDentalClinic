import React,{useEffect, useState} from 'react';
import { makeStyles  } from "@material-ui/core/styles";
//api
import AuthService from "../../../api/authentication/auth.service";
import PatientRecallService from "../../../api/patientRecall/patientRecall.service";
import LoadingPage from '../../../layouts/LoadingPage';
//translation
import { useTranslation } from 'react-i18next';

// @material-ui/core Component
import Container from '@material-ui/core/Container';
import { Typography,
    Divider,
    
    InputAdornment,
    FormControl,
    OutlinedInput,
    Select,
    MenuItem,
 } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';


import styles from "./jss";
import moment from 'moment';
//import configs
import strings from "../../../configs/strings";
//import image

//import icons
import SearchIcon from '@material-ui/icons/Search';
import NoDataIcon from '../../common/NoDataIcon';

// import FilterList from '@material-ui/icons/FilterList';
import AddBox from '@material-ui/icons/AddBox';

//import component
import TableCustom from "../../common/TableCustom";
import InsertPatientRecall from "../InsertPatientRecall";
import UpdatePatientRecall from "../UpdatePatientRecall";
import TreatmentMenu from '../../../layouts/TreatmentMenu';
import Footer from "../../../layouts/Footer";
import { SignalCellularNull } from '@material-ui/icons';

const useStyles = makeStyles(styles);



const PatientRecallPage = ({patientID}) => {
    const {t, i18n } = useTranslation();
    const classes = useStyles();
    //
    const createData=(id,recallDate,appointment,note,procedure,status)=>{
        return {id,recallDate,appointment,note,procedure,status};
    };
    
    const dataColumnsName=["index","recallDate","appointment","note","procedure","status"];
    const titles=[
        t(strings.index),
        t(strings.recallDate),
        t(strings.appointment),
        t(strings.note),
        t(strings.procedure),
        t(strings.status),
    ];
    
    //state
    const [insertPatientRecall,setInsertPatientRecall]=useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchText,setSearchText]=useState(null);
    const [rows,setRows]=useState([]);
    const [originalData,setOriginalData]=useState([]);
    const [editable,setEditable]=useState(false);
    const [isEdited,setIsEdited]=useState(false);
    const [selectedRow,setSelectedRow]=useState(-1);
    const [selectedRowData,setSelectedRowData]=useState(null);
    const [isInsert,setIsInsert]=useState(false);
    const [isUpdate,setIsUpdate]=useState(false);
    const [user,setUser]=useState(null);
    const [isLoading,setIsLoading]=useState(true);
    const [isEmpty,setIsEmpty]=useState(null);
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
        let value=event.target.value;
        setSearchText(value);
        const newData = originalData.filter((row) =>row.recallDate !==null && row.recallDate.indexOf(value) !== -1);
        setRows(newData);
    };

    const handleChangeInsertPatientRecall=(e)=>{
        setInsertPatientRecall(!insertPatientRecall);
    }

    const handleChangeEditable=(e)=>{
        setEditable(!editable);
    }

    const handleChangeIsEdited=(e)=>{
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
            let status;
            if(a.is_active===true)
            {
                status=t(strings.active);
            }
            if(a.is_active===false)
            {
                status=t(strings.inactive);
            }
            let newData=createData(a._id,moment(a.recall_date).format("DD/MM/YYYY"),
            a.appointment? moment(a.appointment.appointment_date).format("DD/MM/YYYY") : null,
            a.note,
            a.procedure ? a.procedure.procedure_code : null,
            status);
            temp=temp.concat(newData);
        })
        setRows(temp);
        setOriginalData(temp);
    }
    const getPatientRecall=async()=>{
        const result=await PatientRecallService.getPatientRecallByID(patientID);
        if(result.data.length!==0 && result.success===true)
        {
            setIsEmpty(false);
            changeData(result.data);
        }
        else
        {
            setIsEmpty(true);
        }
        
    };
    const getUser=async()=>{
        const result=await AuthService.getCurrentUser();
        setUser(result);
    }
    useEffect(()=>{
        
        if(rows.length===0 && isEmpty===null)
        {
            
            getPatientRecall();
            getUser();
            setIsLoading(false);
        }

        if(selectedRow!==-1)
        {
            if(selectedRowData!==rows[selectedRow] && isEdited===false)
            {
                handleChangeIsEdited();

                setSelectedRowData(rows[selectedRow])
            }

        }
        if(searchText==="")
        {
            setSearchText(null);
            setRows(originalData);
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
        <React.Fragment>
            <TreatmentMenu patientID = { patientID }/>

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
                            {user!==null && user.user_type==="ADMIN" ? 
                            <div>
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
                            </div>
                            :
                            <div></div>
                            }
                        </Grid>
                    
                    }

                </Grid>

                <Divider className={classes.titleDivider}/>

                    
                    
                {isLoading===false ?
                <Container className={classes.containerTable}>
                {insertPatientRecall===true && isEdited=== false ?
                    <InsertPatientRecall
                            handleChangeIsInsert={handleChangeIsInsert}
                            patientID={patientID}

                    />
                    : isEdited===true &&selectedRowData!==null ?
                    <UpdatePatientRecall
                                    editable={editable}
                                    id={selectedRowData.id}
                                    handleChangeIsUpdate={handleChangeIsUpdate}
                                    patientID={patientID}

                    />
                    :
                    isEmpty===false ?
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
                    <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <NoDataIcon/>

                    </div>
                }
               
               
                </Container>
                :
                <LoadingPage/>
                }
                
            </div>
            <Footer/>

        </div>
        </React.Fragment>
    )
}

export default PatientRecallPage;