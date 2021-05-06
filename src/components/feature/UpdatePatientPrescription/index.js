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
    FormControl,
    InputLabel,
 } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import moment from "moment";
import styles from "./jss";
import darkTheme from "../../../themes/darkTheme";
import { toast } from 'react-toastify';
import {
    KeyboardDatePicker
} from '@material-ui/pickers';
//import configs
import strings from "../../../configs/strings";
//import image

//import icons
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";


//import component
import Footer from "../../../layouts/Footer";
import TableCustom from "../../common/TableCustom";

const useStyles = makeStyles(styles);

const createData=(id,name,dispensed,quantity,description,refill,expired)=>{
    return {id,name,dispensed,quantity,description,refill,expired};
};
const dataColumnsName=["index","name","dispensed","quantity","description","refill","expired"]


const UpdatePatientPrescription = (props) => {
    const {t, i18n } = useTranslation();
    const classes = useStyles();
    //state
   
    const [drug,setDrug]=useState([]);
    const [listDetail,setListDetail]=useState(null);
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

    const titles=[
        t(strings.index),
        t(strings.name),
        t(strings.dispensed),
        t(strings.quantity),
        t(strings.description),
        t(strings.refill),
        t(strings.expired),

    ];

    const [refresh, setRefresh] = useState(true);
    const handleOpenDialog=(e)=>{
        setOpenDialog(true);
    };
    const handleCloseDialog=(e)=>{
        setOpenDialog(false);
        setSelectedRow(-1);
        setSelectedRowData(null);
        setDescription(null);
        setDispensed(null);
        setExpired(null);
        setQuantity(null);
        setRefill(null);
        setCurrentDrug(t(strings.drug));
    }
    const handleOpenDialog2=(e)=>{
        setOpenDialog2(true);
    };
    const handleCloseDialog2=(e)=>{
        setOpenDialog2(false);
    }
    const handleChangeCurrentDrug=(e)=>{
        setCurrentDrug(e.target.value);
        //console.log("Check current drug:",e.target.value);
        
    }
    const handleChangeProvider=(e)=>{
        //console.log("Check provider handle change:",e.target.value);
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
        //console.log("Handle change expired:",date);
        setExpired(date);
    }

    const handleChangeSelectedRow=(value)=>{
        setSelectedRow(value);
    }
    
    const updateDrug=(e)=>{
        //console.log("Check drug before update:",drug);
        //console.log("Selected row data:",selectedRowData);
        let temp= [...drug];
        const data = createData(selectedRowData.id,selectedRowData.name,
            dispensed,quantity,description,refill,expired);
            //console.log(selectedRow);
        const index = drug.findIndex(n => n.id == selectedRowData.id);
        if (index == -1) {
            //console.log("index -1");//index -1 roi 
            return;
        }
        temp = drug.slice(0, index);
        temp.push(data);
        temp = temp.concat(drug.slice(index + 1, drug.length));

        setDrug(temp);
        setRefresh(!refresh)
        //console.log("Check after update row:",temp);
        handleCloseDialog();
        
    }
    
    
    const changeDataForDisplay=(data)=>{
        let temp=[];
        data.map((a,index)=>{
            let newData=createData(a.drug._id,a.drug.name,a.dispensed,a.quantity,a.description ,
                                    a.refill,moment(a.expiry_date).format(t(strings.apiDateFormat)));
            temp=temp.concat(newData);

        })
        //console.log("Check data for display:",temp);
        setDrug(temp);
    }
    const changeDataDrug=(data)=>{
        let temp=[];
        data.map((a,index)=>{
            
            let newData=createData(a._id,a.name,a.dispensed,a.quantity,a.description,a.note);
            temp=temp.concat(newData);

        })
        //console.log("Check rows in change data:",temp);
        setListDrug(temp);
    }
    const updatePrescription=async(e)=>{
        if(props.editable===true)
        {
            //console.log("Check list detail:",listDetail[0]._id);
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
            //console.log("Check detail before update to db:",details);
            details.map((detail,index)=>{
                const updateDetail=async()=>{
                    //console.log("Check list detail index:",listDetail[index]);
                    const res=await PrescriptionService.updateDetail(listDetail[index]._id,detail);
                        
                    }
                updateDetail();
            })
            const data={
                patient:props.patientID,
                provider:provider,
                    // details:details,
            };
            //console.log("Check before update:",data);
            const result=await PrescriptionService.update(props.id,data);
            if(result.success===true )
            {
                    
                toast.success(t(strings.updateSuccess));
            }
            else
            {
                toast.error(t(strings.updateFail));
            }            
        }
        
        
        
    }
    const renderListProvider=()=>{
        return listProvider.map((provider,index)=>{
            return <MenuItem key={index} 
                            value={provider._id}
                    >
                        {provider.user.first_name} {provider.user.last_name}
                    </MenuItem>
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
                //console.log("Check provider list:",result.data);
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
                //console.log("Check drug list:",result.data);
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
                //console.log("Check selected drug data:",drug[selectedRow]);

                setDescription(drug[selectedRow].description);
                setDispensed(drug[selectedRow].dispensed);
                setExpired(drug[selectedRow].expired);
                setQuantity(drug[selectedRow].quantity);
                setRefill(drug[selectedRow].refill);
                setCurrentDrug(selectedRow);
                handleOpenDialog();
            }

        }
        if(provider===t(strings.provider))
        {
            const getDetailPrescription=async()=>{
                const result=await PrescriptionService.detail(props.id);
                //console.log("Check result search in update:",result.data);
                if(result.success)
                {
                    setListDetail(result.data.payload.details);
                    changeDataForDisplay(result.data.payload.details);
                    setProvider(result.data.payload.provider._id);

                }
                
            }
            getDetailPrescription();
        }
    })

    return (
        <div className={classes.container}>
            
            <div className={classes.content}>
                
              
                <Grid container className={classes.input}>
                    <Grid item xs={6} className={classes.leftContent}>
                        {listProvider.length!==0 ?
                        <FormControl className={classes.itemSelect}>
                            <InputLabel id={t(strings.provider)}>{t(strings.provider)}</InputLabel>

                            <Select
                                labelId={t(strings.provider)}
                                value={provider}
                                onChange={handleChangeProvider}
                                disableUnderline 
                                className={classes.status}
                                inputProps={{ readOnly: !props.editable }}
                                >
                            {renderListProvider()}

                        </Select>
                        
                        </FormControl>
                        :
                        <div></div>

                        }
                      
                  
                    </Grid>
                    <Grid item xs={6} className={classes.rightContent}>
                    
                   
                     
                       
                    </Grid>
                </Grid>
                
                
                {drug.length!==0 ?
                
                    <TableCustom
                        titles={titles}
                        data={drug}
                        dataColumnsName={dataColumnsName}
                        isDelete={false}
                        editable={props.editable}
                        changeToEditPage={true}
                        handleChangeSelectedRow={handleChangeSelectedRow}
                        handleOpenDialog={handleOpenDialog}
                        handleCloseDialog={handleCloseDialog}
                        refresh={refresh}
                    />
                    :
                    <div></div>
                }
                
                {props.editable ?
                <div>
                    <Button variant="contained" color="primary" className={classes.updateButton} onClick={updatePrescription}>
                        {t(strings.update)}
                    </Button>
                </div>
                :
                <div></div>
                }
                

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
                            <InputLabel id={t(strings.drug)} className={classes.inputItem}>{t(strings.drug)}</InputLabel>

                            <Select
                                labelId={t(strings.drug)}
                                value={currentDrug}
                                onChange={handleChangeCurrentDrug}
                                className={classes.status}
                                label={t(strings.provider)}
                                inputProps={{ readOnly: !props.editable }}
                            >
                                {renderListDrug()}
                            </Select>
                        </FormControl>
                        <div className={classes.item}>
                            {description ?
                            <TextField className={classes.inputControl} 
                                        
                            label={t(strings.description)}  
                            variant="outlined" 
                            onChange={handleChangeDescription}
                            value={description}
                            inputProps={{ readOnly: !props.editable }}
                            />
                            :
                            <TextField className={classes.inputControl} 
                                        
                                        placeholder={t(strings.description)}  
                                        variant="outlined" 
                                        onChange={handleChangeDescription}
                                        value={description}
                                        inputProps={{ readOnly: !props.editable }}
                                        />
                            }
                             
                        </div>
                        <div className={classes.item}>
                            {refill ?
                            <TextField 
                                className={classes.inputControl} 
                                label={t(strings.refill)}  
                                variant="outlined" 
                                onChange={handleChangeRefill}
                                value={refill}
                                inputProps={{ readOnly: !props.editable }}
                            />                     
                            :
                            <TextField 
                                        className={classes.inputControl} 
                                        placeholder={t(strings.refill)}  
                                        variant="outlined" 
                                        onChange={handleChangeRefill}
                                        value={refill}
                                        inputProps={{ readOnly: !props.editable }}
                                        />        
                            }

                        </div>
                        
                        
                    </Grid>
                    <Grid item xs={6} className={classes.rightContent}>
                   

                    <div className={classes.item}>
                        {dispensed ?
                        <TextField className={classes.inputControl} 
                        label={t(strings.dispensed)}  
                        variant="outlined" 
                        onChange={handleChangeDispensed}
                        value={dispensed}
                        inputProps={{ readOnly: !props.editable }}
                        /> 
                        :
                        <TextField className={classes.inputControl} 
                                        placeholder={t(strings.dispensed)}  
                                        variant="outlined" 
                                        onChange={handleChangeDispensed}
                                        value={dispensed}
                                        inputProps={{ readOnly: !props.editable }}
                                        /> 
                        }
                            
                        </div>
                        <div className={classes.item}>
                            {quantity ?
                            <TextField className={classes.inputControl} 
                                variant="outlined" 
                                onChange={handleChangeQuantity}
                                value={quantity}
                                inputProps={{ readOnly: !props.editable }}
                                label={t(strings.quantity)}
                            /> 
                            :
                            <TextField className={classes.inputControl} 
                                        variant="outlined" 
                                        onChange={handleChangeQuantity}
                                        value={quantity}
                                        inputProps={{ readOnly: !props.editable }}
                                        placeholder={t(strings.quantity)}
                                        /> 
                            }
                            
                        </div>
                        <div className={classes.itemDate}>
                            {expired ? 
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
                                className={classes.inputControlDate} 
                                inputProps={{ readOnly: !props.editable }}
                            />
                            :
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
                                className={classes.inputControlDate} 
                                inputProps={{ readOnly: !props.editable }}
                            />
                            }
                            
                        </div>
                       
                    </Grid>
                </Grid>
                
            </DialogContent>
            <DialogActions>
            <Button variant="outlined" onClick={handleCloseDialog} color="secondary">
                {t(strings.cancel)}
            </Button>
            <Button variant="contained" onClick={updateDrug} color="primary">
                {t(strings.agree)}
            </Button>
            </DialogActions>
      </Dialog>
      {/* <Dialog onClose={handleCloseDialog2} open={openDialog2} className={classes.dialog}>
                    
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
          */}
    </div>
    )
}

export default UpdatePatientPrescription;