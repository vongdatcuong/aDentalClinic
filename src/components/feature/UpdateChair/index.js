import React,{useState,useEffect} from 'react';
import { makeStyles  } from "@material-ui/core/styles";
//api
import ChairService from "../../../api/chair/chair.service";
//validators

//translation
import { useTranslation } from 'react-i18next';

// @material-ui/core Component
import { 
    FormControlLabel,
    Checkbox,
    Button,
    TextField
 } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';

import styles from "./jss";
// import darkTheme from "../../../themes/darkTheme";
import { toast } from 'react-toastify';

//import configs
import strings from "../../../configs/strings";
//import image

//import icons


//import component

const useStyles = makeStyles(styles);




const UpdatePerson = (props) => {
    const {t, i18n } = useTranslation();
    const classes = useStyles();
    
    //state
    const [name,setName]=useState(null);
    const [order,setOrder]=useState(null);
    const [color,setColor]=useState(null);
    const [isDeleted,setIsDeleted]=useState(false);
    const handleChangeName=(e)=>{
        setName(e.target.value);
    }
    const handleChangeOrder=(e)=>{
        setOrder(e.target.value);
    }
    const handleChangeColor=(e)=>{
        setColor(e.target.value);
    }
    const handleChangeIsDeleted=(e)=>{
        setIsDeleted(!isDeleted);
    }

   
    const onClickUpdate=async()=>{
        if(name===''|| order==='' || color==='')
        {
            toast.error(t(strings.errorInput));

        }
        else
        {
            if(props.editable===true && name!==null && order!==null && color!==null)
            {
                const data={
                    name:name,
                    order:order,
                    color:color,
                    is_deleted:isDeleted,
                };
                const result=await ChairService.update(props.id,data);
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
                toast.error(t(strings.errorInput));
            }
        }
        
        
        
    }
    useEffect(()=>{
        const searchChair=async()=>{
            const result=await ChairService.search(props.id);
            if(result.success)
            {
                setName(result.data.payload.name);
                setColor(result.data.payload.color);
                setOrder(result.data.payload.order);
                setIsDeleted(result.data.payload.is_deleted);
            }
        }
        if(props.id && name===null)
        {
            searchChair();

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
                                         
                                        placeholder={t(strings.order)}  
                                        variant="outlined" 
                                        onChange={handleChangeOrder}
                                        value={order}
                                        inputProps={{ readOnly: !props.editable }}

                                        /> 
                        </div>
                        <div className={classes.item}>
                            
                            <TextField className={classes.inputControl} 
                                         
                                        placeholder={t(strings.color)}  
                                        variant="outlined" 
                                        onChange={handleChangeColor}
                                        value={color}
                                        inputProps={{ readOnly: !props.editable }}

                                        /> 
                        </div>
                        <div className={classes.itemSmall}>
                            <FormControlLabel
                                control={
                                <Checkbox
                                    checked={!isDeleted}
                                    onChange={handleChangeIsDeleted}
                                    name={t(strings.active)}
                                    color="primary"
                                    className={classes.checkbox}
                                    inputProps={{ readOnly: !props.editable }}

                                />
                                }
                                label={t(strings.active)}
                            />
                            <FormControlLabel
                                control={
                                <Checkbox
                                    checked={isDeleted}
                                    onChange={handleChangeIsDeleted}
                                    name={t(strings.inactive)}
                                    color="primary"
                                    className={classes.checkbox}
                                    inputProps={{ readOnly: !props.editable }}

                                />
                                }
                                label={t(strings.inactive)}
                            />
                        </div>
                        
                    </Grid>
                </Grid>
                <div>
                    {props.editable ? 
                    <Button variant="contained" color="primary" className={classes.updateButton} onClick={onClickUpdate} >
                        {t(strings.update)}
                    </Button>
                    :
                    <div></div>
                    }
                    
                </div>
        </div>
        
        </div>
    )
}

export default UpdatePerson;