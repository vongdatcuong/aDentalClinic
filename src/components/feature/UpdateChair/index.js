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
    TextField,
    FormControl,
    InputLabel,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import ColorPicker from 'material-ui-color-picker'

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
        if(props.editable===true)
        {
            setIsDeleted(!isDeleted);
        }
        
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
                
               
               
                        <FormControl className={classes.item}>
                            <InputLabel shrink>
                                {t(strings.name)}
                            </InputLabel>
                            <TextField className={classes.inputControl} 
                                        variant="outlined" 
                                        onChange={handleChangeName}
                                        value={name}
                                        inputProps={{ readOnly: !props.editable }}
                                        /> 
                        </FormControl>
                        <FormControl className={classes.item}>
                            <InputLabel shrink>
                                {t(strings.order)}
                            </InputLabel>
                            <TextField className={classes.inputControl} 
                                        variant="outlined" 
                                        onChange={handleChangeOrder}
                                        value={order}
                                        inputProps={{ readOnly: !props.editable }}

                                        /> 
                        </FormControl>
                        <FormControl className={classes.itemColor}>
                            <InputLabel shrink>
                                {t(strings.color)}
                            </InputLabel>
                            <div className={classes.inputControlColor} >
                                <ColorPicker  
                                        name="color"
                                        InputProps={{ disableUnderline: true }}
                                        style={{width:'100%',backgroundColor:color}}
                                        onChange={color => setColor(color)}
                                        value={color}
                                        /> 
                            </div>
                        </FormControl>
                        <FormControl className={classes.itemSmall}>
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
                        </FormControl>
                    
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