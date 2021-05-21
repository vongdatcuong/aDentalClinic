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
import NoDataIcon from '../../common/NoDataIcon';
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
    
    const [searchText,setSearchText]=useState(null);
    const [editable,setEditable]=useState(false);
    const [isEdited,setIsEdited]=useState(false);
    const [rows,setRows]=useState([]);
    const [originalData,setOriginalData]=useState([]);
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
    const [isEmpty,setIsEmpty]=useState(null);
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
    }
    const handleChangeIsDelete=(e)=>{
        setIsDelete(!isDelete);
        setInsertPatientReferral(false);
        setIsEdited(false);
        setEditable(false);
    }

 
    const handleChangeSearchText = (event) => {
        let value=event.target.value.toLowerCase();
        setSearchText(value);
        const newData = originalData.filter((row) =>row.name !==null && row.name.toLowerCase().indexOf(value) !== -1);
        setRows(newData);
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
        setRows(temp);
        setOriginalData(temp);
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
                setRows(temp);
                setOriginalData(temp);
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
        if(temp.length!==0)
        {
            setReferredBy(temp);
            setIsEmpty(false);
            if(props.type==="FROM")
            {
                changeData(temp);
    
            }
        }
        else
        {
            setIsEmpty(true);
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
        if(temp.length!==0)
        {
            setReferredTo(temp);
            setIsEmpty(false);

            if(props.type==="TO")
            {
                changeData(temp);
    
            }

        }
        else
        {
            setIsEmpty(true);
        }
    }
    const searchPatientReferral=async()=>{
        const res=await PatientReferralService.searchByPatient(props.patientID);
        if(res.data)
        {
            getReferredBy(res.data);
            getReferredTo(res.data);
        }
        
        

    }
    useEffect(()=>{
        if(rows.length===0 && isEmpty===null)
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
        if(searchText==="")
        {
            setSearchText(null);
            setRows(originalData);
        }
    })
    return (
        <Dialog onClose={props.close} open={props.isOpen} className={props.type==="TO" &&
             ((insertPatientReferral===true && isEdited=== false)||
             (isEdited===true &&selectedRowData!==null && isDelete===false))  ? 
             classes.dialogContainerSmall :
              classes.dialogContainer}>
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
                                        
                                />
                                
                                : isEdited===true &&selectedRowData!==null && isDelete===false?
                                <DialogReferralUpdate
                                                editable={editable}
                                                id={selectedRowData.id}
                                                handleChangeIsUpdate={handleChangeIsUpdate}
                                                patientID={props.patientID}
                                                type={props.type}
                                               
                                />
                                :
                                rows.length>0 ?

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
                                
                                <div style={{justifyContent:'center',alignItems:'center',display:'flex'}}>
                                    <NoDataIcon/>

                                </div>
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