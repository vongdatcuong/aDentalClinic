import React,{useState,useEffect} from 'react';
import { makeStyles  } from "@material-ui/core/styles";
//api
import DrugService from "../../../api/drug/drug.service";
import ProviderService from "../../../api/provider/provider.service";
import PrescriptionService from "../../../api/prescription/prescription.service";
//validators
// import validators, {isPropValid} from '../../../utils/validators';

//translation
import { useTranslation } from 'react-i18next';

// @material-ui/core Component
import { 
    Button,
    TextField,
    Select,
    MenuItem,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    FormControl,
    InputLabel,
 } from '@material-ui/core';
import {
    KeyboardDatePicker
} from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
// import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';

import styles from "./jss";
// import darkTheme from "../../../themes/darkTheme";
import { toast } from 'react-toastify';

//import configs
import strings from "../../../configs/strings";
//import image

//import icons
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import NoDataIcon from '../../common/NoDataIcon';

//import component
import TableCustom from "../../common/TableCustom";
import moment from 'moment'
// import Footer from "../../../layouts/Footer";
const useStyles = makeStyles(styles);

const createData=(id,name,dispensed,quantity,description,refill,expired)=>{
    return {id,name,dispensed,quantity,description,refill,expired};
};
const dataColumnsName=["index","name","dispensed","quantity","description","refill","expired"]


const InsertPatientPrescription = (props) => {
    const {t, i18n } = useTranslation();
    const classes = useStyles();
    
    //state
   
    const [drug,setDrug]=useState([]);
    const [currentDrug,setCurrentDrug]=useState(t(strings.drug));
    const [openDialog,setOpenDialog]=useState(false);
    const [openDialog2,setOpenDialog2]=useState(false);

    const [refill,setRefill]=useState(null);
    const [quantity,setQuantity]=useState(null);
    const [dispensed,setDispensed]=useState(null);
    const [description,setDescription]=useState(null);
    const [expired,setExpired]=useState(new Date());
    const [provider,setProvider]=useState(t(strings.provider));
    const [listProvider,setListProvider]=useState([]);
    const [listDrug,setListDrug]=useState([]);
    const [selectedRow,setSelectedRow]=useState(-1);
    const [selectedRowData,setSelectedRowData]=useState(null);

    const titles=[
        t(strings.index),
        t(strings.name),
        t(strings.dispensed),
        t(strings.quantity),
        t(strings.description),
        t(strings.refill),
        t(strings.expired),

    ];

    const handleOpenDialog=(e)=>{
        setOpenDialog(true);
    };
    const handleCloseDialog=(e)=>{
        setOpenDialog(false);
    }
    const handleOpenDialog2=(e)=>{
        setOpenDialog2(true);
    };
    const handleCloseDialog2=(e)=>{
        setOpenDialog2(false);
    }
    const handleChangeCurrentDrug=(e)=>{
        let index=e.target.value;
        setCurrentDrug(index);
        setDescription(listDrug[index].description);
        setDispensed(listDrug[index].dispensed);
        
        setQuantity(listDrug[index].quantity);
        setRefill(listDrug[index].refill);
    }
    const handleChangeProvider=(e)=>{
        setProvider(e.target.value);
    }
    
    const handleChangeDescription=(e)=>{
        setDescription(e.target.value);
    }
    
    const handleChangeRefill=(e)=>{
        setRefill(e.target.value);
    }
    const handleChangeQuantity=(e)=>{
        setQuantity(e.target.value);
    }
    const handleChangeDispensed=(e)=>{
        setDispensed(e.target.value);
    }
    const handleChangeExpired=(e,date)=>{
        setExpired(date);
    }

    const handleChangeSelectedRow=(value)=>{
        setSelectedRow(value);
    }
    const insertDrug=(e)=>{
        if(currentDrug!==t(strings.drug) && dispensed!==null && dispensed!=="" &&
            quantity!==null && quantity!=="" &&
            description!==null && description!=="" &&
            refill!==null && refill!=="" &&
            expired!==null && expired!=="")
        {
            handleCloseDialog();
            let temp=drug;
            temp=temp.concat(createData(listDrug[currentDrug].id,listDrug[currentDrug].name,dispensed,
                                        quantity,description,refill,moment(expired).format(t(strings.apiDateFormat))
                ));
            console.log("Check date insert drug:",moment(expired).format(t(strings.apiDateFormat)))
            
            setDrug(temp);
            setDescription(null);
            setDispensed(null);
            setExpired(new Date());
            setQuantity(null);
            setRefill(null);
            setCurrentDrug(t(strings.drug));
        }
        else
        {
            toast.error(t(strings.errorInput))
        }
        
    }
    const deleteRow=(e)=>{
        handleCloseDialog2();
        
        drug.splice(selectedRow,1);
    }
    const changeDataDrug=(data)=>{
        let temp=[];
        data.map((a,index)=>{
            
            let newData=createData(a._id,a.name,a.dispensed,a.quantity,a.description,a.note);
            temp=temp.concat(newData);

        })
        setListDrug(temp);
    }

    const insertPrescription=async(e)=>{
        if(provider!==t(strings.provider) && drug.length!==0)
        {
            let details=[];
            drug.map((a,index)=>{
                let temp=details;
                temp=temp.concat({
                    drug:a.id,
                    expiry_date:new Date(a.expired),
                    description:a.description,
                    dispensed:a.dispensed,
                    refill:a.refill,
                    quantity:a.quantity,
                })
                details=temp;
            });

            const data={
                patient:props.patientID,
                provider:provider,
                details:details,
            };
            const result=await PrescriptionService.insert(data);
            if(result.success)
            {
                toast.success(t(strings.insertSuccess));
                props.handleChangeIsInsert();
            }
            else
            {
                toast.error(t(strings.insertFail));
            }
        }
        if(drug.length===0)
        {
            toast.error(t(strings.errorNoDrug))
        }

    }
    const renderListProvider=()=>{
        return listProvider.map((provider,index)=>{
            return <MenuItem key={index} value={provider._id}>{provider.user.first_name} {provider.user.last_name}</MenuItem>
        })
    }
    const renderListDrug=()=>{
        return listDrug.map((drug,index)=>{
            return <MenuItem key={index} value={index}>{drug.name}</MenuItem>
        })
    }
    useEffect(()=>{
        if(listProvider.length===0)
        {
            const getListProvider=async()=>{
                const result=await ProviderService.getProvider();
                if(result.success)
                {
                    setListProvider(result.data);

                }
            }
            getListProvider();
        }
        if(listDrug.length===0)
        {
            const getListDrug=async()=>{
                const result=await DrugService.getDrug();
                if(result.success)
                {
                    changeDataDrug(result.data);
                }
            }
            getListDrug();
        }
        if(selectedRow!==-1)
        {
            if(selectedRowData!==drug[selectedRow]  )
            {

                setSelectedRowData(drug[selectedRow])
            }

        }
    })
    return (
        <div className={classes.container}>
            
            <div className={classes.content}>
                
              
                <Grid container className={classes.input}>
                    <Grid item xs={6} className={classes.leftContent}>
                        {listProvider.length!==0 ?
                        <FormControl className={classes.itemSelect}>
                            <InputLabel>
                                {t(strings.provider)}
                            </InputLabel>

                            <Select
                                
                                value={provider}
                                onChange={handleChangeProvider}
                                disableUnderline 
                                className={classes.status}
                                >
                            {renderListProvider()}

                        </Select>
                        
                        </FormControl>
                        :
                        <div></div>

                        }
                      
                  
                    </Grid>
                    <Grid item xs={6} className={classes.rightContent}>
                    
                    {listDrug.length!==0?
                    <FormControl className={classes.containerAddRecord}>
                        <Button simple className={classes.btnAddRecord} onClick={handleOpenDialog}>
                            <AddCircleOutlineIcon></AddCircleOutlineIcon>{" "}
                            {t(strings.addMoreDrug)}
                        </Button>
                    </FormControl>
                    :
                    <div></div>
                    }
                     
                       
                    </Grid>
                </Grid>
                
                
                {drug.length!==0 ?
                
                    <TableCustom
                        titles={titles}
                        data={drug}
                        dataColumnsName={dataColumnsName}
                        isDelete={true}
                        editable={false}
                        handleChangeSelectedRow={handleChangeSelectedRow}
                        handleOpenDialog={handleOpenDialog2}
                        handleCloseDialog={handleCloseDialog2}
                    />
                    :
                    <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <NoDataIcon/>

                    </div>
                }
                
                
                <div>
                    <Button variant="contained" color="primary" className={classes.insertButton} onClick={insertPrescription}>
                        {t(strings.insert)}
                    </Button>
                </div>

        </div>
           
        <Dialog
            open={openDialog}
            onClose={handleCloseDialog} 
            className={classes.drugDialog}
            fullWidth={true}
            maxWidth='lg'
        >
            <DialogContent>
                
                <Grid container className={classes.input}>
                    <Grid item xs={6} className={classes.leftContent}>
                        <FormControl className={classes.itemSelect}>
                            <InputLabel>
                                {t(strings.drug)}
                            </InputLabel>
                            <Select
                                value={currentDrug}
                                onChange={handleChangeCurrentDrug}
                                className={classes.menu}
                                disableUnderline

                            >
                                {renderListDrug()}
                            </Select>
                        </FormControl>
                        <FormControl className={classes.item}>
                            <TextField className={classes.inputControl} 
                                        
                                        placeholder={t(strings.description)}  
                                        variant="outlined" 
                                        onChange={handleChangeDescription}
                                        value={description}
                                        
                                        /> 
                        </FormControl>
                        <FormControl className={classes.item}>
                            <TextField className={classes.inputControl} 
                                        required 
                                        placeholder={t(strings.refill)}  
                                        variant="outlined" 
                                        onChange={handleChangeRefill}
                                        value={refill}
                                        
                                        /> 
                        </FormControl>
                        
                        
                    </Grid>
                    <Grid item xs={6} className={classes.rightContent}>
                    <FormControl className={classes.item}>
                            
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                label={t(strings.expired)}
                                format={t(strings.apiDateFormat)}
                                value={expired}
                                onChange={handleChangeExpired}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                InputProps={{
                                    disableUnderline:true
                                }}
                                className={classes.inputControlDate} 
                            />
                        </FormControl>
                    <FormControl className={classes.item}>
                            <TextField className={classes.inputControl} 
                                        required 
                                        placeholder={t(strings.dispensed)}  
                                        variant="outlined" 
                                        onChange={handleChangeDispensed}
                                        value={dispensed}
                                        
                                        /> 
                        </FormControl>
                        <FormControl className={classes.item}>
                            <TextField className={classes.inputControl} 
                                        placeholder={t(strings.quantity)}  
                                        variant="outlined" 
                                        onChange={handleChangeQuantity}
                                        value={quantity}
                                        
                                        /> 
                        </FormControl>
                        
                       
                    </Grid>
                </Grid>
                
            </DialogContent>
            <DialogActions>
            <Button variant="outlined" onClick={handleCloseDialog} color="secondary">
                {t(strings.cancel)}
            </Button>
            <Button variant="contained" onClick={insertDrug} color="primary">
                {t(strings.agree)}
            </Button>
            </DialogActions>
      </Dialog>
      <Dialog onClose={handleCloseDialog2} open={openDialog2} className={classes.dialog}>
                    
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                        {t(strings.deleteConfirmMessage)}

                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" onClick={handleCloseDialog2} color="secondary">
                            {t(strings.no)}
                        </Button>
                        <Button variant="contained" onClick={deleteRow} color="primary" autoFocus>
                            {t(strings.yes)}

                        </Button>
                    </DialogActions>
                    
        </Dialog>
         
    </div>
    )
}

export default InsertPatientPrescription;