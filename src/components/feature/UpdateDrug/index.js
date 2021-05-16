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
    TextField
 } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
// import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';

import styles from "./jss";
// import darkTheme from "../../../themes/darkTheme";
//import configs
import strings from "../../../configs/strings";
import { toast } from 'react-toastify';
//import image

//import icons


//import component

const useStyles = makeStyles(styles);




const UpdateDrug = (props) => {
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
    


    const onClickUpdate=async()=>{
        if(name!==null && name!=='' &&
            description!==null && description!=='' &&
            dispensed!==null && dispensed!=='' &&
            note!==null && note!=='' &&
            refill!==null && refill!=='' &&
            quantity!==null && quantity!=='' && props.editable===true
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
            const result=await DrugService.update(props.id,data);
            if(result.success)
            {
                toast.success(t(strings.updateSuccess));
                props.handleChangeIsUpdate();
            }
            else
            {
                toast.error(t(strings.updateFail));
            }
        }
        else
        {
            toast.error(t(strings.errorInput))
        }
       
        
        
        
    }
    useEffect(()=>{
        const searchDrug=async()=>{
            const result=await DrugService.search(props.id);
            if(result.success)
            {
                setName(result.data.payload.name);
                setDescription(result.data.payload.description);
                setQuantity(result.data.payload.quantity);
                setNote(result.data.payload.note);
                setRefill(result.data.payload.refill);
                setDispensed(result.data.payload.dispensed);
            }
        }
        if(props.id && name===null)
        {
            searchDrug();

        }
       
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
                                        inputProps={{ readOnly: !props.editable }}
                                        /> 
                        </div>
                        <div className={classes.item}>
                            <TextField className={classes.inputControl} 
                                        
                                        placeholder={t(strings.description)}  
                                        variant="outlined" 
                                        onChange={handleChangeDescription}
                                        value={description}
                                        inputProps={{ readOnly: !props.editable }}

                                        /> 
                        </div>
                        <div className={classes.item}>
                            <TextField className={classes.inputControl} 
                                        required 
                                        placeholder={t(strings.refill)}  
                                        variant="outlined" 
                                        onChange={handleChangeRefill}
                                        value={refill}
                                        inputProps={{ readOnly: !props.editable }}

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
                                        inputProps={{ readOnly: !props.editable }}

                                        /> 
                        </div>
                        <div className={classes.item}>
                            <TextField className={classes.inputControl} 
                                        placeholder={t(strings.quantity)}  
                                        variant="outlined" 
                                        onChange={handleChangeQuantity}
                                        value={quantity}
                                        inputProps={{ readOnly: !props.editable }}

                                        /> 
                        </div>
                        <div className={classes.item}>
                            <TextField className={classes.inputControl} 
                                        placeholder={t(strings.note)}  
                                        variant="outlined" 
                                        onChange={handleChangeNote}
                                        value={note}
                                        inputProps={{ readOnly: !props.editable }}

                                        /> 
                        </div>
                       
                    </Grid>
                </Grid>
                {props.editable ?
                <div>
                    <Button variant="contained" color="primary" className={classes.updateButton} onClick={onClickUpdate} disabled={!props.editable}>
                        {t(strings.update)}
                    </Button>
                </div>
                :
                <div/>
                }
                
        </div>
    </div>
    )
}

export default UpdateDrug;