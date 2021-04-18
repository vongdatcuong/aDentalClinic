import React,{useState,useEffect} from 'react';
import { makeStyles, useTheme  } from "@material-ui/core/styles";
//api
import ChairService from "../../../api/chair/chair.service";
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

    
    const insertChair=async(e)=>{
        const data={
            name:name,
            order:order,
            color:color,
            //is_deleted:isDeleted,
        };
        const result=await ChairService.insert(data);
        if(result.success)
        {
            alert(t(strings.insertSuccess));
        }
        else
        {
            alert(t(strings.insertFail));
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
                                         
                                        placeholder={t(strings.order)}  
                                        variant="outlined" 
                                        onChange={handleChangeOrder}
                                        value={order}
                                        
                                        /> 
                        </div>
                        <div className={classes.item}>
                            <TextField className={classes.inputControl} 
                                         
                                        placeholder={t(strings.color)}  
                                        variant="outlined" 
                                        onChange={handleChangeColor}
                                        value={color}
                                       
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
                        </div>
                        
                    </Grid>
                </Grid>
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