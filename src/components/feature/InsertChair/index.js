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
import ColorPicker from 'material-ui-color-picker'

import styles from "./jss";
import { toast } from 'react-toastify';

//import configs
import strings from "../../../configs/strings";
//import image

//import icons


//import component

const useStyles = makeStyles(styles);




const InsertChair = (props) => {
    const {t, i18n } = useTranslation();
    const classes = useStyles();
    
    //state
    const [name,setName]=useState(null);
    const [order,setOrder]=useState(null);
    const [color,setColor]=useState("#000");
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

    
    const insertChair=async(e)=>{
        if(name===''|| order==='' || color==='')
        {
            toast.error(t(strings.errorInput));

        }
        else
        {
            if(name!==null && order!==null && color!==null)
            {
                const data={
                    name:name,
                    order:order,
                    color:color,
                    is_deleted:isDeleted,
                };
                const result=await ChairService.insert(data);
                console.log("Check result insert chair:",result);
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
            setName("");
            setColor("#000");
            setOrder("");
            setIsDeleted(false);
        }
        
        
        

    }
    useEffect(()=>{
        
    })
    return (
        <div className={classes.container}>
            <div className={classes.content}>
                        <FormControl className={classes.item}>
                            <TextField className={classes.inputControl} 
                                         
                                        label={t(strings.name)}  
                                        variant="outlined" 
                                        onChange={handleChangeName}
                                        value={name}
                                        
                                        /> 
                        </FormControl>
                        <FormControl className={classes.item}>
                            <TextField className={classes.inputControl} 
                                         
                                        label={t(strings.order)}  
                                        variant="outlined" 
                                        onChange={handleChangeOrder}
                                        value={order}
                                        
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

                                />
                                }
                                label={t(strings.inactive)}
                            />
                        </FormControl>

                <div>
                    <Button variant="contained" color="primary" className={classes.insertButton} onClick={insertChair}>
                        {t(strings.insert)}
                    </Button>
                </div>
        </div>
        
        </div>
    )
}

export default InsertChair;