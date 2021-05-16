import React,{useState,useEffect} from 'react';
import { makeStyles  } from "@material-ui/core/styles";
//api
import TemplateService from "../../../api/template/template.service";
//validators

//translation
import { useTranslation } from 'react-i18next';

// @material-ui/core Component
import { 
    
    Button,
    TextField,
   
 } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import styles from "./jss";
import { toast } from 'react-toastify';

//import configs
import strings from "../../../configs/strings";
//import image

//import icons


//import component

const useStyles = makeStyles(styles);




const UpdateTemplate = (props) => {
    const {t, i18n } = useTranslation();
    const classes = useStyles();
    
    //state
   
    const [content,setContent]=useState(null);
   
    const handleChangeContent=(e)=>{
        setContent(e.target.value);
    }
  
    const onClickUpdate=async()=>{
        if(props.editable===true && content!==null && content !=='' )
        {
            const data={
                content:content,
              
            };
            const result=await TemplateService.update(props.id,data);
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
    useEffect(()=>{
        const searchTemplate=async()=>{
            const result=await TemplateService.search(props.id);
            if(result.success)
            {
                setContent(result.data.payload.content);
            }
        }
        if(props.id && content===null)
        {
            searchTemplate();

        }
       
    })
    
    return (
        <div className={classes.container}>
            
            <div className={classes.content}>
                
              
                <Grid container className={classes.input}>
                    <Grid item xs={6} className={classes.leftContent}>
                        <div className={classes.item}>
                            <TextField className={props.contentBig===true ? classes.inputControlBig : classes.inputControl} 
                                         
                                        placeholder={t(strings.content)}  
                                        variant="outlined" 
                                        onChange={handleChangeContent}
                                        value={content}
                                        inputProps={{ readOnly: !props.editable }}
                                        multiline={props.contentBig}
                                        /> 
                        </div>
                        <div className={classes.item}>
                         
                        
                        </div>
                       
                        
                    </Grid>
                    <Grid item xs={6} className={classes.rightContent}>
                    
                        
                    </Grid>
                </Grid>
                {props.editable ?
                <div>
                    <Button variant="contained" color="primary" className={classes.updateButton} onClick={onClickUpdate} disabled={!props.editable}>
                        {t(strings.update)}
                    </Button>
                </div>
                :
                <div></div>
                }
                
        </div>
    </div>
    )
}

export default UpdateTemplate;