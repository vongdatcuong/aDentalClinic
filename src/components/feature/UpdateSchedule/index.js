import React,{useState,useEffect} from 'react';
import { makeStyles, useTheme  } from "@material-ui/core/styles";

//import configs
import strings from "../../../configs/strings";

//api
import ProviderService from "../../../api/provider/provider.service";
//validators
import validators, {isPropValid} from '../../../utils/validators';

//translation
import { useTranslation, Trans } from 'react-i18next';

// @material-ui/core Component
import { 
    Paper,
    Typography,
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

//import image

//import icons


//import component

const useStyles = makeStyles(styles);




const UpdateSchedule = (props) => {
    const {t, i18n } = useTranslation();
    const classes = useStyles();
    
    //state
    const [firstName,setFirstName]=useState(null);

    const handleChangeActive=(e)=>{
        
    }

    useEffect(()=>{
    })
    
    return (
        <Paper className={classes.paper}>
            sadsad
        </Paper>
    )
}

export default UpdateSchedule;