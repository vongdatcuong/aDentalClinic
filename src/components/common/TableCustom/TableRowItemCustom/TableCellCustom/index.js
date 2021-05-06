import React,{useState} from 'react';
import { makeStyles  } from "@material-ui/core/styles";
//translation
import { useTranslation } from 'react-i18next';

// @material-ui/core Component
import { 
  
    TableCell,
   
    TextField,
    InputAdornment,
    Grid,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CreateIcon from "@material-ui/icons/Create";

import styles from "./jss";
//import configs
const useStyles = makeStyles(styles);

const TableCellCustom=(props)=>{
    const {t, i18n } = useTranslation();
    const classes = useStyles();

    const [editable,setEditable]=useState(false);
    const [value,setValue]=useState(props.value);

    const handleChangeValue=(e)=>{
        setValue(e.target.value);
    }
    const handleChangeEditable=(e)=>{
        if(props.index!==0)
        {
            setEditable(!editable);
        }

    }
    
    const clickTick=(e)=>{
        setEditable(false);
    }
    return(
        <TableCell  className={classes.tableCell} align={props.index===0 ? "center":'left'} >
            {editable===true ? 
                <TextField
                    onChange={handleChangeValue}
                    //id={fieldName}
                    defaultValue={props.value}
                    value={value ? value : '...'}
                    InputProps={{
                        endAdornment: (
                          <InputAdornment position="start" onClick={clickTick} className={classes.checkIcon}>
                            <CheckIcon />
                          </InputAdornment>
                        ),
                    }}
                />
                :
                <Grid container>
                    <Grid item xs={10} >
                        {value ? value: '...'}
                    </Grid>
                    <Grid item xs={2} onClick={handleChangeEditable}>
                        {props.changeToEditPage===false &&props.editable===true && props.index!==0? 
                            <CreateIcon className={classes.updateIcon} color="disabled"/>
                            :
                            <div></div>
                        }
                    </Grid>

                </Grid>
            }
            
        </TableCell>
    )
}

export default TableCellCustom;


