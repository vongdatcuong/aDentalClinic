import React,{useState} from 'react';
import { makeStyles, useTheme  } from "@material-ui/core/styles";
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




const InsertProcedure = () => {
    const {t, i18n } = useTranslation();
    const classes = useStyles();
    
    //state
    const [code,setCode]=useState(null);
    const [fee,setFee]=useState(null);
    const [ins,setINS]=useState(null);
    const [duration,setDuration]=useState(null);
    const [type,setType]=useState(null);
    const [abbr,setABBR]=useState(null);
    const [description,setDescription]=useState(null);

    const handleChangeCode=(e)=>{
        setCode(e.target.value);
    }
    
    const handleChangeFee=(e)=>{
        setFee(e.target.value);
    }

    const handleChangeINS=(e)=>{
        setINS(e.target.value);
    }

    const handleChangeDuration=(e)=>{
        setDuration(e.target.value);
    }

    const handleChangeType=(e)=>{
        setType(e.target.value);
    }

    const handleChangeABBR=(e)=>{
        setABBR(e.target.value);
    }

    const handleChangeDescription=(e)=>{
        setDescription(e.target.value);
    }
    return (
        <div className={classes.container}>     
            <div className={classes.content}>        
                <Grid container className={classes.input}>
                    <Grid item xs={6} className={classes.leftContent}>
                        <div className={classes.item}>
                            <TextField className={classes.inputControl} 
                                        label={t(strings.code)}  
                                        variant="outlined" 
                                        onChange={handleChangeCode}
                                        value={code}
                                        /> 
                        </div>
                        
                        <div className={classes.item}>
                            <TextField className={classes.inputControl}
                                        label={t(strings.fee)}  
                                        variant="outlined"
                                        onChange={handleChangeFee}
                                        value={fee}/>
                             
                        </div>
                        <div className={classes.item}>
                            <TextField className={classes.inputControl}
                                        label={t(strings.ins)}  
                                        variant="outlined"
                                        onChange={handleChangeINS}
                                        value={ins}/>
                             
                        </div>
                        <div className={classes.item}>
                            <TextField className={classes.inputControlSmall}
                                        label={t(strings.duration)}  
                                        variant="outlined"
                                        onChange={handleChangeDuration}
                                        value={duration}/> 

                        </div>
                        
                    </Grid>
                    <Grid item xs={6} className={classes.rightContent}>
                        <div className={classes.item}>
                            <TextField className={classes.inputControl}
                                        label={t(strings.type)}  
                                        variant="outlined"
                                        onChange={handleChangeType}
                                        value={type}/>
                             
                        </div>
                        <div className={classes.item}>
                            <TextField className={classes.inputControl}
                                        label={t(strings.abbr)}  
                                        variant="outlined"
                                        onChange={handleChangeABBR}
                                        value={abbr}/>
                             
                        </div>
                        <div className={classes.item}>
                            <TextField className={classes.inputControlBig}
                                        label={t(strings.description)}  
                                        variant="outlined"
                                        onChange={handleChangeDescription}
                                        value={description}/>
                             
                        </div>
                    </Grid>
                </Grid>
                <div>
                    <Button variant="contained" color="primary" className={classes.insertButton}>
                        {t(strings.insert)}
                    </Button>
                </div>
        </div>
    </div>
)
}

export default InsertProcedure;