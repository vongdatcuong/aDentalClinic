import React,{useState,useEffect} from 'react';
import { makeStyles, useTheme  } from "@material-ui/core/styles";
//api
import {secretKey, initializeAPIService, httpPost,httpGet} from '../../../api/base-api';
import apiPath from '../../../api/path';
import DrugService from "../../../api/drug/drug.service";
import ProviderService from "../../../api/provider/provider.service";

import PrescriptionService from "../../../api/prescription/prescription.service";
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
    Select,
    MenuItem,
    Dialog,
    Button,
    DialogContent,
    DialogContentText,
    DialogActions,
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
import { toast } from 'react-toastify';
// moment
import moment from 'moment';
//import configs
import strings from "../../../configs/strings";
//import image

//import icons
import SearchIcon from '@material-ui/icons/Search';
import FilterList from '@material-ui/icons/FilterList';
import AddBox from '@material-ui/icons/AddBox';
import DeleteIcon from '@material-ui/icons/Delete';
//import component
import TableCustom from "../../common/TableCustom";
import InsertPatientPrescription from "../InsertPatientPrescription";
import UpdatePatientPrescription from "../UpdatePatientPrescription";
import PopupChat from '../../common/Messenger/PopupChat';
import TreatmentMenu from '../../../layouts/TreatmentMenu';
import Footer from "../../../layouts/Footer";

const useStyles = makeStyles(styles);
const createData=(id,date)=>{
    return {id,date};
};
const dataColumnsName=["index","date"]

const PatientPrescriptionPage = ({patientID}) => {
    const {t, i18n } = useTranslation();

    const classes = useStyles();
    const [insertPatientPrescription,setInsertPatientPrescription]=useState(false);
    const [openDialog,setOpenDialog]=useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchText,setSearchText]=useState(null);
    const [editable,setEditable]=useState(false);
    const [isEdited,setIsEdited]=useState(false);
    const [rows,setRows]=useState([]);
    const [providers,setProviders]=useState([]);
    const [prescriptions,setPrescriptions]=useState([]);
    const [selectedRow,setSelectedRow]=useState(-1);
    const [selectedRowData,setSelectedRowData]=useState(null);
    const [isDelete,setIsDelete]=useState(false);
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    
    const handleOpenDialog=(e)=>{
        setOpenDialog(true);
    }
    const handleCloseDialog=(e)=>{
        setOpenDialog(false);
        console.log("Close dialog");
    }
    const handleChangeIsDelete=(e)=>{
        setIsDelete(!isDelete);
        setInsertPatientPrescription(false);
        setIsEdited(false);
        setEditable(false);
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
    const handleChangeInsertPrescription=(e)=>{
        setInsertPatientPrescription(!insertPatientPrescription);
    }
    const handleChangeEditable=(e)=>{
        setEditable(!editable);
    }
    const handleChangeSelectedRow=(value)=>{
        setSelectedRow(value);
    }
    const handleGoBack=(e)=>{
        setInsertPatientPrescription(false);
        setIsEdited(false);
        setSelectedRow(-1);
        setSelectedRowData(null);
    }
    const handleChangeIsEdited=(e)=>{
        console.log("Handle change edit");
        setIsEdited(!isEdited);
    }
    const titles=[
        t(strings.index),
        // t(strings.provider),
        t(strings.date),
        

    ];

    
    const changeData=(data)=>{
        let temp=[];
        
        data.map((a,index)=>{
            let date=moment(a.prescription_date).format('DD/MM/YYYY');
            let newData=createData(a._id,date);
            temp=temp.concat(newData);

        })
        console.log("Check rows in change data:",temp);
        setRows(temp);
    }
   
    const deleteRow=(e)=>{
        handleCloseDialog();
        console.log("Delete now:",selectedRowData);
        const deletePrescription=async()=>{
            const res=await PrescriptionService.delete(selectedRowData.id);
            console.log("Delete prescription:",res);
            if(res.success)
            {
                toast.success(t(strings.deleteSuccess));
                rows.splice(selectedRow,1);
            }
            else
            {
                toast.error(t(strings.deleteFail));
            }
        };
        deletePrescription();
       
    }
    useEffect(()=>{
        
        if(rows.length===0)
        {
           
            const getPrescription=async()=>{
                console.log("Check patient ID:",patientID);
                const result1=await PrescriptionService.searchByPatient(patientID);
                console.log("result1:",result1.data);
                if(result1.success && result1.data.payload.length!==0)
                {
                    changeData(result1.data.payload);
                }
               
            };
            
            getPrescription();
            
        }
        if(selectedRow!==-1)
        {
            if(selectedRowData!==rows[selectedRow] && isEdited===false )
            {
                handleChangeIsEdited();

                setSelectedRowData(rows[selectedRow])
                console.log("Check selected row data:",rows[selectedRow]);
            }

        }
  
    })
    return (  <React.Fragment>
        <TreatmentMenu patientID = { patientID }/>
        <Container className={classes.container}>
          
            <div>
            <div >
                <Grid container>
                    <Grid item xs={8}>
                        <Typography className={classes.title} variant="h4">
                            {t(strings.prescription)}
                        </Typography>
                    </Grid>
                    {insertPatientPrescription===true || isEdited===true ?

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
                            <IconButton onClick={handleChangeInsertPrescription}>
                                <AddBox />            

                            </IconButton>
                            <IconButton onClick={handleChangeIsDelete}>
                                <DeleteIcon />            

                            </IconButton>
                        </Grid>

                    }
                </Grid>
                <Divider className={classes.titleDivider}/>
                <Container style={{marginLeft:"10px"}}>
                    {insertPatientPrescription===true && isEdited=== false  ?
                        <InsertPatientPrescription
                                     patientID={patientID}
                        />
                        : isEdited===true &&selectedRowData!==null && isDelete===false?
                        <UpdatePatientPrescription
                                        id={selectedRowData.id}
                                        patientID={patientID}


                        />
                        :
                        rows.length!==0 ?
                            <TableCustom titles={titles}
                                    data={rows}
                                    dataColumnsName={dataColumnsName}
                                    editable={editable}
                                    handleChangeIsEdited={handleChangeIsEdited}
                                    changeToEditPage={true}
                                    handleChangeSelectedRow={handleChangeSelectedRow}
                                    numberColumn={dataColumnsName.length}
                                    isDelete={isDelete}
                                    handleOpenDialog={handleOpenDialog}
                                    handleCloseDialog={handleCloseDialog}
                                    />
                        :
                        <div></div>
                    }
                   
                   
                </Container>
                
                
                
                <Dialog onClose={handleCloseDialog} open={openDialog} className={classes.dialog}>
                    
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                        {t(strings.deleteConfirmMessage)}

                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} color="secondary">
                            {t(strings.no)}
                        </Button>
                        <Button onClick={deleteRow} color="primary" autoFocus>
                            {t(strings.yes)}

                        </Button>
                    </DialogActions>
                    
                </Dialog>
            
            </div>
            

          </div>
          <Footer/>

        </Container>
        </React.Fragment>
    );
   
}

export default PatientPrescriptionPage;