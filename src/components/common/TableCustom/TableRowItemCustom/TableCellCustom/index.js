import React,{useState} from 'react';
import { makeStyles, useTheme  } from "@material-ui/core/styles";
//translation
import { useTranslation, Trans } from 'react-i18next';

// @material-ui/core Component
import { 
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TablePagination,
    TableRow,
    TableHead,
    TextField,
    InputAdornment,
    Paper,
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
    const handleChangeEditbale=(e)=>{
        if(props.index!==0)
        {
            setEditable(!editable);
        }

    }

    const clickTick=(e)=>{
        setEditable(false);
    }
    return(
        <TableCell key={props.key} className={classes.tableCell} align={props.index===0 ? "center":'left'} >
            {editable===true ? 
                <TextField
                    onChange={handleChangeValue}
                    //id={fieldName}
                    defaultValue={props.value}
                    value={value}
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
                    <Grid item xs={10}>
                        {value}

                    </Grid>
                    <Grid item xs={2} onClick={handleChangeEditbale}>
                        {props.index===0 ? 
                            <div></div>
                            :
                            <CreateIcon className={classes.updateIcon} color="disabled"/>

                        }
                    </Grid>

                </Grid>
            }
            
        </TableCell>
    )
}

export default TableCellCustom;


