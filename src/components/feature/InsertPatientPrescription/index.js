import React,{useState,useEffect} from 'react';
import { makeStyles, useTheme  } from "@material-ui/core/styles";
//api
import DrugService from "../../../api/drug/drug.service";
import ProviderService from "../../../api/provider/provider.service";
import PrescriptionService from "../../../api/prescription/prescription.service";
//validators
import validators, {isPropValid} from '../../../utils/validators';

//translation
import { useTranslation, Trans } from 'react-i18next';

// @material-ui/core Component
import Container from '@material-ui/core/Container';
import { Typography,
    Fab,
    FormControlLabel,
    Checkbox,
    Button,
    TextField,
    Select,
    MenuItem,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
 } from '@material-ui/core';
import {
    KeyboardDatePicker
} from '@material-ui/pickers';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';

import styles from "./jss";
import darkTheme from "../../../themes/darkTheme";
import { toast } from 'react-toastify';

//import configs
import strings from "../../../configs/strings";
//import image

//import icons
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";


//import component
import TableCustom from "../../common/TableCustom";
import Footer from "../../../layouts/Footer";
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
    const [expired,setExpired]=useState(null);
    const [provider,setProvider]=useState(t(strings.provider));
    const [listProvider,setListProvider]=useState([]);
    const [listDrug,setListDrug]=useState([]);
    const [selectedRow,setSelectedRow]=useState(-1);
    const [selectedRowData,setSelectedRowData]=useState(null);
    const [isDelete,setIsDelete]=useState(false);

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
        setCurrentDrug(e.target.value);
        console.log("Check current drug:",e.target.value);
        
    }
    const handleChangeProvider=(e)=>{
        console.log("Check provider handle change:",e.target.value);
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
        console.log("Handle change expired:",date);
        setExpired(date);
    }

    const handleChangeSelectedRow=(value)=>{
        setSelectedRow(value);
    }
    const insertDrug=(e)=>{
        if(currentDrug!==t(strings.drug))
        {
            handleCloseDialog();
            let temp=drug;
            temp=temp.concat(createData(listDrug[currentDrug].id,listDrug[currentDrug].name,dispensed,
                                        quantity,description,refill,expired
                ));

           
            setDrug(temp);
            console.log("Check after add drug:",temp);
            setDescription(null);
            setDispensed(null);
            setExpired(new Date());
            setQuantity(null);
            setRefill(null);
            setCurrentDrug(t(strings.drug));
        }
        
    }
    const deleteRow=(e)=>{
        handleCloseDialog2();
        console.log("Delete now:",selectedRowData);
        
        drug.splice(selectedRow,1);
    }
    const changeDataDrug=(data)=>{
        let temp=[];
        data.map((a,index)=>{
            
            let newData=createData(a._id,a.name,a.dispensed,a.quantity,a.description,a.note);
            temp=temp.concat(newData);

        })
        console.log("Check rows in change data:",temp);
        setListDrug(temp);
    }

    const insertPrescription=async(e)=>{
        console.log("Drug :",drug);
        if(provider!==t(strings.provider) && drug.length!==0)
        {
            let details=[];
            drug.map((a,index)=>{
                let temp=details;
                temp=temp.concat({
                    drug:a.id,
                    expiry_date:a.expired,
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
            console.log("Check data for insert pres:",data);
            const result=await PrescriptionService.insert(data);
            console.log("Check result insert pres:",result);
            if(result.success)
            {
                toast.success(t(strings.insertSuccess));
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
                console.log("Check provider list:",result.data);
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
                console.log("Check drug list:",result.data);
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
                console.log("Check selected drug data:",drug[selectedRow]);
            }

        }
    })
    return (
        <div className={classes.container}>
            
            <div className={classes.content}>
                
              
                <Grid container className={classes.input}>
                    <Grid item xs={6} className={classes.leftContent}>
                        {listProvider.length!==0 ?
                        <div className={classes.itemSelect}>
                            <Select
                                
                                value={provider}
                                onChange={handleChangeProvider}
                                disableUnderline 
                                className={classes.status}
                                >
                            <MenuItem value={t(strings.provider)}>{t(strings.provider)}</MenuItem>
                            {renderListProvider()}

                        </Select>
                        
                        </div>
                        :
                        <div></div>

                        }
                      
                  
                    </Grid>
                    <Grid item xs={6} className={classes.rightContent}>
                    
                    {listDrug.length!==0?
                    <div className={classes.containerAddRecord}>
                        <Button simple className={classes.btnAddRecord} onClick={handleOpenDialog}>
                            <AddCircleOutlineIcon></AddCircleOutlineIcon>{" "}
                            {t(strings.addMoreDrug)}
                        </Button>
                    </div>
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
                    <div></div>
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
                        <div className={classes.item}>
                            <Select
                                value={currentDrug}
                                onChange={handleChangeCurrentDrug}
                                className={classes.menu}
                            >
                                <MenuItem value={t(strings.drug)}>{t(strings.drug)}</MenuItem>
                                {renderListDrug()}
                            </Select>
                        </div>
                        <div className={classes.item}>
                            <TextField className={classes.inputControl} 
                                        
                                        placeholder={t(strings.description)}  
                                        variant="outlined" 
                                        onChange={handleChangeDescription}
                                        value={description}
                                        
                                        /> 
                        </div>
                        <div className={classes.item}>
                            <TextField className={classes.inputControl} 
                                        required 
                                        placeholder={t(strings.refill)}  
                                        variant="outlined" 
                                        onChange={handleChangeRefill}
                                        value={refill}
                                        
                                        /> 
                        </div>
                        
                        
                    </Grid>
                    <Grid item xs={6} className={classes.rightContent}>
                    <div className={classes.item}>
                            <TextField className={classes.inputControl} 
                                        required 
                                        placeholder={t(strings.dispensed)}  
                                        variant="outlined" 
                                        onChange={handleChangeDispensed}
                                        value={dispensed}
                                        
                                        /> 
                        </div>
                        <div className={classes.item}>
                            <TextField className={classes.inputControl} 
                                        placeholder={t(strings.quantity)}  
                                        variant="outlined" 
                                        onChange={handleChangeQuantity}
                                        value={quantity}
                                        
                                        /> 
                        </div>
                        <div className={classes.item}>
                            {/* <TextField className={classes.inputControl} 
                                        placeholder={t(strings.expired)}  
                                        variant="outlined" 
                                        onChange={handleChangeExpired}
                                        value={expired}
                                        
                                        />  */}
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                placeholder={t(strings.expired)}
                                format={t(strings.apiDateFormat)}
                                value={expired}
                                onChange={handleChangeExpired}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                className={classes.inputControl} 
                            />
                        </div>
                       
                    </Grid>
                </Grid>
                
            </DialogContent>
            <DialogActions>
            <Button onClick={handleCloseDialog} color="secondary">
                {t(strings.cancel)}
            </Button>
            <Button onClick={insertDrug} color="primary">
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
                        <Button onClick={handleCloseDialog2} color="secondary">
                            {t(strings.no)}
                        </Button>
                        <Button onClick={deleteRow} color="primary" autoFocus>
                            {t(strings.yes)}

                        </Button>
                    </DialogActions>
                    
        </Dialog>
         
    </div>
    )
}

export default InsertPatientPrescription;