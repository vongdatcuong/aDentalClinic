import React,{useState,useEffect} from 'react';
import { makeStyles  } from "@material-ui/core/styles";
//api
import TemplateService from "../../../api/template/template.service";
//validators
import validators, {isPropValid} from '../../../utils/validators';

//translation
import { useTranslation } from 'react-i18next';

// @material-ui/core Component
import { 
    Button,
    TextField,
    Select,
    MenuItem,
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




const InsertTemplate = (props) => {
    const {t, i18n } = useTranslation();
    const classes = useStyles();
    
    //state
   
    const [content,setContent]=useState(null);
    const [noteType,setNoteType]=useState(null);
    const [listTypeTemplate,setListTypeTemplate]=useState([
        "TREATMENT",
        "MEDICAL ALERT",
        "PROGRESS",
    ]);

    const handleChangeContent=(e)=>{
        setContent(e.target.value);
    }
    const handleChangeNoteType=(e)=>{
        setNoteType(e.target.value);
    }
    
    
    const insertTemplate=async(e)=>{
        if(content!==null && content!=='' && noteType!==null)
        {
            const data={
                content:content,
                note_type:noteType
              
            };
            const result=await TemplateService.insert(data);
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
                            <TextField className={classes.inputControlBig} 
                                         
                                        placeholder={t(strings.content)}  
                                        variant="outlined" 
                                        onChange={handleChangeContent}
                                        value={content}
                                        multiline
                                        /> 
                        </div>
                        <div className={classes.item}>
                        
                            {listTypeTemplate.length!==0 ?

                            <Select
                                value={noteType}
                                onChange={handleChangeNoteType}
                                disableUnderline 
                                displayEmpty
                                className={classes.inputCombobox}
                                
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
                    <Button variant="contained" color="primary" className={classes.insertButton} onClick={insertTemplate} >
                        {t(strings.insert)}
                    </Button>
                </div>
        </div>
    </div>
    )
}

export default InsertTemplate;