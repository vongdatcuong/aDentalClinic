import React,{useState,useEffect} from 'react';
import { makeStyles  } from "@material-ui/core/styles";
//api
import DrugService from "../../../api/drug/drug.service";
//validators
// import validators, {isPropValid} from '../../../utils/validators';

//translation
import { useTranslation } from 'react-i18next';

// @material-ui/core Component
import { 
    Button,
    TextField,
    FormControl,
 } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
// import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';

import styles from "./jss";
// import darkTheme from "../../../themes/darkTheme";
import { toast } from 'react-toastify';

//import configs
import strings from "../../../configs/strings";
//import image

//import icons


//import component

const useStyles = makeStyles(styles);




const InsertPatient = (props) => {
    const {t, i18n } = useTranslation();
    const classes = useStyles();
    
    //state
   
    const [name,setName]=useState(null);
    const [description,setDescription]=useState(null);
    const [note,setNote]=useState(null);
    const [refill,setRefill]=useState(null);
    const [quantity,setQuantity]=useState(null);
    const [dispensed,setDispensed]=useState(null);

    const handleChangeName=(e)=>{
        setName(e.target.value);
    }
    const handleChangeDescription=(e)=>{
        setDescription(e.target.value);
    }
    const handleChangeNote=(e)=>{
        setNote(e.target.value);
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
    
    const insertDrug=async(e)=>{
        if(name!==null && name!=='' &&
            description!==null && description!=='' &&
            dispensed!==null && dispensed!=='' &&
            note!==null && note!=='' &&
            refill!==null && refill!=='' &&
            quantity!==null && quantity!==''
        )
        {
            const data={
                name:name,
                description:description,
                dispensed:dispensed,
                note:note,
                refill:refill,
                quantity:quantity,
              
            };
            const result=await DrugService.insert(data);
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
        else
        {
            toast.error(t(strings.errorInput));

        }
    }
    useEffect(()=>{
       
    })
    return (
        <div className={classes.container}>
            
            <div className={classes.content}>
                
              
                <Grid container className={classes.input}>
                    <Grid item xs={6} className={classes.leftContent}>
                        <FormControl className={classes.item}>
                            <TextField className={classes.inputControl} 
                                        required
                                        label={t(strings.name)}  
                                        variant="outlined" 
                                        onChange={handleChangeName}
                                        value={name}
                                       
                                        /> 
                        </FormControl>
                        <FormControl className={classes.item}>
                            <TextField className={classes.inputControl}     
                                        required
                                        label={t(strings.description)}  
                                        variant="outlined" 
                                        onChange={handleChangeDescription}
                                        value={description}
                                        
                                        /> 
                        </FormControl>
                        <FormControl className={classes.item}>
                            <TextField className={classes.inputControl} 
                                        required 
                                        label={t(strings.refill)}  
                                        variant="outlined" 
                                        onChange={handleChangeRefill}
                                        value={refill}
                                        
                                        /> 
                        </FormControl>
                        
                    </Grid>
                    <Grid item xs={6} className={classes.rightContent}>
                    <FormControl className={classes.item}>
                            <TextField className={classes.inputControl} 
                                        required 
                                        label={t(strings.dispensed)}  
                                        variant="outlined" 
                                        onChange={handleChangeDispensed}
                                        value={dispensed}
                                        
                                        /> 
                        </FormControl>
                        <FormControl className={classes.item}>
                            <TextField className={classes.inputControl}
                                        required 
                                        label={t(strings.quantity)}  
                                        variant="outlined" 
                                        onChange={handleChangeQuantity}
                                        value={quantity}
                                        
                                        /> 
                        </FormControl>
                        <FormControl className={classes.item}>
                            <TextField className={classes.inputControl} 
                                        required
                                        label={t(strings.note)}  
                                        variant="outlined" 
                                        onChange={handleChangeNote}
                                        value={note}
                                        
                                        /> 
                        </FormControl>
                       
                    </Grid>
                </Grid>
                <div>
                    <Button variant="contained" color="primary" className={classes.insertButton} onClick={insertDrug}>
                        {t(strings.insert)}
                    </Button>
                </div>
        </div>
    </div>
    )
}

export default InsertPatient;