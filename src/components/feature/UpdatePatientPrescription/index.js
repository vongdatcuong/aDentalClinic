import React,{useState,useEffect} from 'react';
import { makeStyles  } from "@material-ui/core/styles";
//api
import DrugService from "../../../api/drug/drug.service";
import ProviderService from "../../../api/provider/provider.service";
import PrescriptionService from "../../../api/prescription/prescription.service";
//validators

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
    FormControl,
    InputLabel,
 } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
// import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import moment from "moment";
import styles from "./jss";
// import darkTheme from "../../../themes/darkTheme";
import { toast } from 'react-toastify';
import {
    KeyboardDatePicker
} from '@material-ui/pickers';
//import configs
import strings from "../../../configs/strings";
//import image

//import icons
// import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";


//import component
// import Footer from "../../../layouts/Footer";
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
    
    const handleChangeCurrentDrug=(e)=>{
        setCurrentDrug(e.target.value);
        
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
    
    const updateDrug=(e)=>{
      
        let temp= [...drug];
        const data = createData(selectedRowData.id,selectedRowData.name,
            dispensed,quantity,description,refill,expired);
        const index = drug.findIndex(n => n.id == selectedRowData.id);
        if (index == -1) {
            return;
        }
        temp = drug.slice(0, index);
        temp.push(data);
        temp = temp.concat(drug.slice(index + 1, drug.length));

        setDrug(temp);
        setRefresh(!refresh)
        handleCloseDialog();
        
    }
    
    
    const changeDataForDisplay=(data)=>{
        let temp=[];
        data.map((a,index)=>{
            let newData=createData(a.drug._id,a.drug.name,a.dispensed,a.quantity,a.description ,
                                    a.refill,moment(a.expiry_date).format(t(strings.apiDateFormat)));
            temp=temp.concat(newData);
        });
        setDrug(temp);
    }
    const changeDataDrug=(data)=>{
        let temp=[];
        data.map((a,index)=>{
            
            let newData=createData(a._id,a.name,a.dispensed,a.quantity,a.description,a.note);
            temp=temp.concat(newData);

        })
        setListDrug(temp);
    }
    const updatePrescription=async(e)=>{
        if(props.editable===true)
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
            details.map((detail,index)=>{
                const updateDetail=async()=>{
                    const res=await PrescriptionService.updateDetail(listDetail[index]._id,detail);
                        
                    }
                updateDetail();
            })
            const data={
                patient:props.patientID,
                provider:provider,
            };
            const result=await PrescriptionService.update(props.id,data);
            if(result.success===true )
            {
                    
                toast.success(t(strings.updateSuccess));
                props.handleChangeIsUpdate();
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
                        <FormControl className={classes.item}>
                            <InputLabel shrink >
                                {t(strings.description)}
                            </InputLabel>
                            <TextField className={classes.inputControl}        
                            variant="outlined" 
                            onChange={handleChangeDescription}
                            value={description}
                            inputProps={{ readOnly: !props.editable }}
                            />
                         
                            
                             
                        </FormControl>
                        <FormControl className={classes.item}>
                            <InputLabel shrink >
                                {t(strings.refill)}
                            </InputLabel>
                            <TextField 
                                className={classes.inputControl} 
                                variant="outlined" 
                                onChange={handleChangeRefill}
                                value={refill}
                                inputProps={{ readOnly: !props.editable }}
                            />   
                        </FormControl>
                        
                        
                    </Grid>
                    <Grid item xs={6} className={classes.rightContent}>
                   

                    <FormControl className={classes.item}>
                        <InputLabel shrink >
                                {t(strings.dispensed)}
                        </InputLabel>
                        <TextField className={classes.inputControl} 
                        variant="outlined" 
                        onChange={handleChangeDispensed}
                        value={dispensed}
                        inputProps={{ readOnly: !props.editable }}
                        /> 
                            
                        </FormControl>
                        <FormControl className={classes.item}>
                            <InputLabel shrink >
                                {t(strings.quantity)}
                            </InputLabel>
                            <TextField className={classes.inputControl} 
                                variant="outlined" 
                                onChange={handleChangeQuantity}
                                value={quantity}
                                inputProps={{ readOnly: !props.editable }}
                            /> 
                            
                        </FormControl>
                        <FormControl className={classes.itemDate}>
                            <InputLabel shrink >
                                {t(strings.expired)}
                            </InputLabel>
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                format={t(strings.apiDateFormat)}
                                value={expired}
                                onChange={handleChangeExpired}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                className={classes.inputControlDate} 
                                inputProps={{ readOnly: !props.editable }}
                            />
                            
                        </FormControl>
                       
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
     
    </div>
    )
}

export default UpdatePatientPrescription;