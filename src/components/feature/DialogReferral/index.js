import React,{useState,useEffect} from 'react';
import { makeStyles  } from "@material-ui/core/styles";
//translation
import { useTranslation } from 'react-i18next';
//api
import AuthService from "../../../api/authentication/auth.service";
import PatientReferralService from "../../../api/patientReferral/patientReferral.service";

// @material-ui/core Component
import Container from '@material-ui/core/Container';
import { Typography,
    Divider,
    InputAdornment,
    FormControl,
    OutlinedInput,
    Select,
    MenuItem,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
 } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import moment from 'moment';
import styles from "./jss";
// import darkTheme from "../../../themes/darkTheme";
import { toast } from 'react-toastify';

//import configs
import strings from "../../../configs/strings";
//import image

//import icons
import SearchIcon from '@material-ui/icons/Search';
import AddBox from '@material-ui/icons/AddBox';
import DeleteIcon from '@material-ui/icons/Delete';

//import component
import TableCustom from "../../common/TableCustom";
import DialogReferralInsert from "../DialogReferralInsert";
import DialogReferralUpdate from "../DialogReferralUpdate";
import LoadingPage from '../../../layouts/LoadingPage';
const useStyles = makeStyles(styles);
const createData=(id,name,date)=>{
    return {id,name,date};
};

const dataColumnsName=["index","name","date"];


const DialogReferral = (props) => {
    const {t, i18n } = useTranslation();

    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchText,setSearchText]=useState(null);
    const [editable,setEditable]=useState(false);
    const [isEdited,setIsEdited]=useState(false);
    const [rows,setRows]=useState([]);
    const [selectedRow,setSelectedRow]=useState(-1);
    const [selectedRowData,setSelectedRowData]=useState(null);
    const [openDialog,setOpenDialog]=useState(false);
    const [insertPatientReferral,setInsertPatientReferral]=useState(false);
    const [isDelete,setIsDelete]=useState(false);
    const [isInsert,setIsInsert]=useState(false);
    const [isUpdate,setIsUpdate]=useState(false);
    const [user,setUser]=useState(null);
    const [isLoading,setIsLoading]=useState(true);
    const [referredBy,setReferredBy]=useState([]);
    const [referredTo,setReferredTo]=useState([]);
    // const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    
    //handle
    const handleChangeIsInsert=()=>{
        setIsInsert(!isInsert);
    };
    const handleChangeIsUpdate=()=>{
        setIsUpdate(!isUpdate);
    }
    const handleOpenDialog=(e)=>{
        setOpenDialog(true);
    }
    const handleCloseDialog=(e)=>{
        setOpenDialog(false);
        //console.log("Close dialog");
    }
    const handleChangeIsDelete=(e)=>{
        setIsDelete(!isDelete);
        setInsertPatientReferral(false);
        setIsEdited(false);
        setEditable(false);
    }

    // const handleChangePage = (event, newPage) => {
    //     setPage(newPage);
    // };
    // const handleChangeRowsPerPage = (event) => {
    //     setRowsPerPage(parseInt(event.target.value, 10));
    //     setPage(0);
    // };
    const handleChangeSearchText = (event) => {
        setSearchText(event.target.value);
    };
    const handleChangeInsertPatietReferral=(e)=>{
        setInsertPatientReferral(!insertPatientReferral);
    }
    const handleChangeEditable=(e)=>{
        setIsDelete(false);
        setEditable(!editable);
    }
    const handleChangeSelectedRow=(value)=>{
        setSelectedRow(value);
    }
    const handleGoBack=(e)=>{
        setInsertPatientReferral(false);
        setIsEdited(false);
        setSelectedRow(-1);
        setSelectedRowData(null);
    }
    const handleChangeIsEdited=(e)=>{
        //console.log("Handle change edit");
        setIsEdited(!isEdited);
    }
    const titles=[
        t(strings.index),
        t(strings.name),
        t(strings.date),
        
    ];
    const changeData=(data)=>{
        let temp=[];
        data.map((a,index)=>{
            let name;
            if(a.ref_patient)
            {
                name=a.ref_patient.user.first_name+" "+a.ref_patient.user.last_name;
            }
            if(a.ref_staff)
            {
                name=a.ref_staff.user.first_name+" "+a.ref_staff.user.last_name;
            }
            if(a.referral_source)
            {
                name=a.referral_source.name;
            }
            let newData=createData(a._id,name,moment(a.referral_date).format("DD/MM/YYYY"));
            temp=temp.concat(newData);

        })
        console.log("Check rows in change data:",temp);
        setRows(temp);
    }
    const deleteRow=(e)=>{
        handleCloseDialog();
        
        const deleteReferralSource=async()=>{
            const res=await PatientReferralService.delete(selectedRowData.id);
            if(res.success)
            {
                toast.success(t(strings.deleteSuccess));
                let temp=rows;
                temp.splice(selectedRow,1);
                console.log("Check temp before set for rows:",temp);
                setRows(temp);
                setSelectedRow(-1);
                setSelectedRowData(null);
                props.handleChangeIsUpdate();
            }
            else
            {
                toast.error(t(strings.deleteFail));
            }
        };
        deleteReferralSource();
       
    }
    
    const getUser=async()=>{
        const result=await AuthService.getCurrentUser();
        setUser(result);
    }
    const getReferredBy=(data)=>{
        let temp=[];
        data.map((a,index)=>{
            if(a.referral_type==="FROM")
            {
                temp=temp.concat(a);
            }
        })

        setReferredBy(temp);
        if(props.type==="FROM")
        {
            changeData(temp);

        }

    }
    const getReferredTo=(data)=>{
        let temp=[];
        data.map((a,index)=>{
            if(a.referral_type==="TO")
            {
                temp=temp.concat(a);
            }
        })
        setReferredTo(temp);
        if(props.type==="TO")
        {
            changeData(temp);

        }
    }
    const searchPatientReferral=async()=>{
        const res=await PatientReferralService.searchByPatient(props.patientID);
        console.log("Check res in dialog referra:",res);
        console.log("Check type referral:",props.type);
        getReferredBy(res.data);
        getReferredTo(res.data);
        

    }
    useEffect(()=>{
        if(rows.length===0)
        {
            searchPatientReferral();
            getUser();
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
                console.log("Selected row:",selectedRow);
                console.log("Check selected row data:",rows[selectedRow]);
            }

        }
        if(isInsert)
        {
            searchPatientReferral();
            setIsInsert(false);
            props.handleChangeIsInsert();
        }
        if(isUpdate)
        {
            searchPatientReferral();
            setIsUpdate(false);
            props.handleChangeIsUpdate();
        }
    })
    return (
        <Dialog onClose={props.close} open={props.isOpen} className={classes.dialogContainer}>
            <DialogContent>

                <div className={classes.container}>
                    
                    <div className={classes.content}>
                        <Grid container>
                            <Grid item xs={8}>
                                <Typography className={classes.title} variant="h4">
                                    {t(strings.referral)}
                                </Typography>
                            </Grid>
                            {insertPatientReferral===true || isEdited===true ?

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
                                        <IconButton onClick={handleChangeInsertPatietReferral}>
                                            <AddBox />            
                                        </IconButton>
                                        <IconButton onClick={handleChangeIsDelete}>
                                            <DeleteIcon />            
                                        </IconButton>
                                    </div>
                                    :
                                    <div></div>
                                    }
                            </Grid>

                            }
                            
                            
                        </Grid>
                        <Divider className={classes.titleDivider}/>
                        {isLoading === false ?
                            <Container className={classes.containerTable}>
                            {insertPatientReferral===true && isEdited=== false  ?
                                <DialogReferralInsert
                                        handleChangeIsInsert={handleChangeIsInsert}
                                        patientID={props.patientID}
                                        type={props.type}
                                        // handleChangeReferredBy={props.handleChangeOpenReferredBy}
                                        // handleChangeReferredTo={props.handleChangeOpenReferredTo}
                                />
                                
                                : isEdited===true &&selectedRowData!==null && isDelete===false?
                                <DialogReferralUpdate
                                                editable={editable}
                                                id={selectedRowData.id}
                                                handleChangeIsUpdate={handleChangeIsUpdate}
                                                patientID={props.patientID}
                                                type={props.type}
                                                // handleChangeReferredBy={props.handleChangeOpenReferredBy}
                                                // handleChangeReferredTo={props.handleChangeOpenReferredTo}
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
                                            isDelete={isDelete}
                                            handleOpenDialog={handleOpenDialog}
                                            handleCloseDialog={handleCloseDialog}
                                            />
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
                                <Button variant="contained"  color="primary" autoFocus onClick={deleteRow}>
                                    {t(strings.yes)}

                                </Button>
                            </DialogActions>
                            
                        </Dialog>
                    
                        
                    </div>
                    
                </div>
                
            </DialogContent>
        </Dialog>
    )
}

export default DialogReferral;