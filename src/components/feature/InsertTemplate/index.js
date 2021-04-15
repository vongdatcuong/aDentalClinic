import React,{useState,useEffect} from 'react';
import { makeStyles, useTheme  } from "@material-ui/core/styles";
//api
import TemplateService from "../../../api/template/template.service";
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
    TextField,
    Select,
    MenuItem,
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




const InsertTemplate = (props) => {
    const {t, i18n } = useTranslation();
    const classes = useStyles();
    
    //state
   
    const [content,setContent]=useState(null);
    const [noteType,setNoteType]=useState(null);
    const [listTypeTemplate,setListTypeTemplate]=useState([
        "TREATMENT",
        "MEDICAL_ALERT",
        "PROGRESS",
    ]);

    const handleChangeContent=(e)=>{
        setContent(e.target.value);
    }
    const handleChangeNoteType=(e)=>{
        setNoteType(e.target.value);
    }
    
    
    const insertTemplate=async(e)=>{
        
        const data={
            content:content,
            note_type:noteType
          
        };
        const result=await TemplateService.insert(data);
        if(result.success)
        {
            alert(t(strings.insertSuccess));
        }
        else
        {
            alert(t(strings.insertFail));
        }

    }
    const renderListTypeTemplate=()=>{
        return listTypeTemplate.map((item,index)=>{
            return  <MenuItem value={item}>{item}</MenuItem>

        })
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
                                         
                                        placeholder={t(strings.content)}  
                                        variant="outlined" 
                                        onChange={handleChangeContent}
                                        value={content}
                                       
                                        /> 
                        </div>
                        <div className={classes.item}>
                            {/* <TextField className={classes.inputControl} 
                                        
                                        placeholder={t(strings.noteType)}  
                                        variant="outlined" 
                                        onChange={handleChangeNoteType}
                                        value={noteType}
                                        
                                        />  */}
                            {listTypeTemplate.length!==0 ?

                            <Select
                                value={noteType}
                                onChange={handleChangeNoteType}
                                disableUnderline 
                                displayEmpty
                                className={classes.inputCombobox}
                                //defaultValue={listCategory[0]._id}
                                //placeholder={t(strings.category)}
                                >
                                <MenuItem value={noteType}>{t(strings.noteType)}</MenuItem>
                                {renderListTypeTemplate()}
                            </Select>
                            :
                            <div></div>
                            }
                        </div>
                       
                        
                    </Grid>
                    <Grid item xs={6} className={classes.rightContent}>
                    
                        
                    </Grid>
                </Grid>
                <div>
                    <Button variant="contained" color="primary" className={classes.insertButton} onClick={insertTemplate}>
                        {t(strings.insert)}
                    </Button>
                </div>
        </div>
    </div>
    )
}

export default InsertTemplate;