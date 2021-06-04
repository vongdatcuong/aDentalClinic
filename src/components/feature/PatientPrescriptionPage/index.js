import React,{useState,useEffect} from 'react';
import { makeStyles  } from "@material-ui/core/styles";
//api
import PrescriptionService from "../../../api/prescription/prescription.service";
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
    Dialog,
    Button,
    DialogContent,
    DialogContentText,
    DialogActions,
 } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';


import styles from "./jss";
// import darkTheme from "../../../themes/darkTheme";
import { toast } from 'react-toastify';
// moment
import moment from 'moment';
//import configs
import strings from "../../../configs/strings";
//import image

//import icons
import SearchIcon from '@material-ui/icons/Search';
// import FilterList from '@material-ui/icons/FilterList';
import AddBox from '@material-ui/icons/AddBox';
import DeleteIcon from '@material-ui/icons/Delete';
//import component
import TableCustom from "../../common/TableCustom";
import InsertPatientPrescription from "../InsertPatientPrescription";
import UpdatePatientPrescription from "../UpdatePatientPrescription";
import LoadingPage from '../../../layouts/LoadingPage';
// import PopupChat from '../../common/Messenger/PopupChat';
import TreatmentMenu from '../../../layouts/TreatmentMenu';
import Footer from "../../../layouts/Footer";
// import { TrainRounded } from '@material-ui/icons';

const useStyles = makeStyles(styles);
const createData=(id,date,status)=>{
    return {id,date,status};
};
 
const dataColumnsName=["index","date","status"]



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
    const [originalData,setOriginalData]=useState([]);
    const [providers,setProviders]=useState([]);
    const [prescriptions,setPrescriptions]=useState([]);
    const [selectedRow,setSelectedRow]=useState(-1);
    const [selectedRowData,setSelectedRowData]=useState(null);
    const [isDelete,setIsDelete]=useState(false);
    const [user,setUser]=useState(null);
    const [isLoading,setIsLoading]=useState(true);
    const [isInsert,setIsInsert]=useState(false);
    const [isUpdate,setIsUpdate]=useState(false);
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    
   
    const handleOpenDialog=(e)=>{
        setOpenDialog(true);
    }
    const handleCloseDialog=(e)=>{
        setOpenDialog(false);
        setSelectedRow(-1);
        setSelectedRowData(null);
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
        let value=event.target.value;
        setSearchText(value);
        const newData = originalData.filter((row) =>row.date !==null && row.date.indexOf(value) !== -1);
        setRows(newData);
    };
    const handleChangeInsertPrescription=(e)=>{
        setInsertPatientPrescription(!insertPatientPrescription);
        setIsDelete(false);
    }
    const handleChangeEditable=(e)=>{
        setEditable(!editable);
        setIsDelete(false);
        
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
    const handleChangeIsInsert=()=>{
        setIsInsert(!isInsert);
    }
    const handleChangeIsUpdate=()=>{
        setIsUpdate(!isUpdate);
    }
    const handleChangeIsEdited=(e)=>{
        setIsEdited(!isEdited);
    }
    const titles=[
        t(strings.index),
        t(strings.date),
        t(strings.status)

    ];

    
    const changeData=(data)=>{
        let temp=[];
        
        data.map((a,index)=>{
            let date=moment(a.prescription_date).format('DD/MM/YYYY');
            let status;
            if(a.is_delete===true)
            {
                status=t(strings.inactive);
            }
            else
            {
                status=t(strings.active);

            }
            let newData=createData(a._id,date,status);
            temp=temp.concat(newData);

        })
        setRows(temp);
    }
   
    const deleteRow=(e)=>{
        handleCloseDialog();
        const deletePrescription=async()=>{
            const data={
                is_delete:true,
            };
            const res=await PrescriptionService.update(selectedRowData.id,data);
            if(res.success)
            {
                toast.success(t(strings.deleteSuccess));
                
            }
            else
            {
                toast.error(t(strings.deleteFail));
            }
        };
        deletePrescription();
       
    }
    const getPrescription=async()=>{
        const result1=await PrescriptionService.searchByPatient(patientID);
        if(result1.success && result1.data.payload.length!==0)
        {
            changeData(result1.data.payload);
        }
       
    };
    useEffect(()=>{
        
        if(rows.length===0 && searchText===null)
        {
           
            
            
            getPrescription();
            setIsLoading(false);

        }
        if(selectedRow!==-1)
        {
            if(selectedRowData!==rows[selectedRow] && isEdited===false && isDelete===false )
            {
                handleChangeIsEdited();

                setSelectedRowData(rows[selectedRow])
            }
            if(selectedRowData!==rows[selectedRow] && isDelete===true  )
            {

                setSelectedRowData(rows[selectedRow])
            }

        }
        if(searchText==="")
        {
            setSearchText(null);
            setRows(originalData)
        }
        if(isInsert===true)
        {
            setIsInsert(false);
            getPrescription();
        }
        if(isUpdate===true)
        {
            setIsUpdate(false);
            getPrescription();
        }
    })
    return (  <React.Fragment>
        <TreatmentMenu patientID = { patientID }/>
        <Container className={classes.containerTable}>

            <div style={{marginTop:'20px'}}>
            <div >
                <Grid container>
                    <Grid item xs={7}>
                        <Typography className={classes.title} variant="h4">
                            {t(strings.prescription)}
                        </Typography>
                    </Grid>
                    {insertPatientPrescription===true || isEdited===true ?

                        <Grid item xs={5}>
                            <Typography variant="h6" onClick={handleGoBack} className={classes.goBack}>
                                {t(strings.goBack)}
                            </Typography>
                        </Grid>
                        :
                        <Grid item xs={5} className={classes.serviceControl}>

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
                                <IconButton onClick={handleChangeInsertPrescription}>
                                    <AddBox className={classes.btnAddBox}/>             
                                </IconButton>
                                <IconButton onClick={handleChangeIsDelete} style={{color: isDelete===true ? 'red':'gray'}}>
                                    <DeleteIcon />            

                                </IconButton>
                            </div>
                            

                           
                        </Grid>

                    }
                </Grid>
                <Divider className={classes.titleDivider}/>
                {isLoading === false ?
                <Container style={{marginLeft:'10px'}}>
                {insertPatientPrescription===true && isEdited=== false  ?
                    <InsertPatientPrescription
                                 patientID={patientID}
                                 handleChangeIsInsert={handleChangeIsInsert}
                    />
                    : 
                    
                    selectedRowData!==null && isDelete===false ?
                    <UpdatePatientPrescription
                                        id={selectedRowData.id}
                                        patientID={patientID}
                                        editable={editable}
                                        handleChangeIsUpdate={handleChangeIsUpdate}
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
            
                :
                <LoadingPage/>
                }
                
                
                <Dialog onClose={handleCloseDialog} open={openDialog} className={classes.dialog}>
                    
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                        {t(strings.deleteConfirmMessage)}

                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" onClick={handleCloseDialog} color="secondary">
                            {t(strings.no)}
                        </Button>
                        <Button variant="contained" onClick={deleteRow} color="primary" autoFocus>
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