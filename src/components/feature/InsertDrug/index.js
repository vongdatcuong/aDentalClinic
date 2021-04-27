import React,{useState,useEffect} from 'react';
import { makeStyles, useTheme  } from "@material-ui/core/styles";
//api
import DrugService from "../../../api/drug/drug.service";
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
    TextField
 } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';

import styles from "./jss";
import darkTheme from "../../../themes/darkTheme";
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
    useEffect(()=>{
       
    })
    return (
        <div className={classes.container}>
            
            <div className={classes.content}>
                
              
                <Grid container className={classes.input}>
                    <Grid item xs={6} className={classes.leftContent}>
                        <div className={classes.item}>
                            <TextField className={classes.inputControl} 
                                         
                                        placeholder={t(strings.name)}  
                                        variant="outlined" 
                                        onChange={handleChangeName}
                                        value={name}
                                       
                                        /> 
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
                            <TextField className={classes.inputControl} 
                                        placeholder={t(strings.note)}  
                                        variant="outlined" 
                                        onChange={handleChangeNote}
                                        value={note}
                                        
                                        /> 
                        </div>
                       
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