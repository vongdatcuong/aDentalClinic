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
    
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';

import styles from "./jss";
//import configs

import TableCellCustom from "./TableCellCustom";


const useStyles = makeStyles(styles);

const TableRowItemCustom=(props)=>{
    const {t, i18n } = useTranslation();
    const classes = useStyles();

    return(
        <TableRow key={props.key}>
            {props.titles.map((title,index2)=>(                            
                    <TableCellCustom  key={props.row[props.dataColumnsName[1]]}
                            index={index2}
                        value={index2===0 ? props.index+1+props.page*props.rowsPerPage  : props.row[`${props.dataColumnsName[index2]}`]}
                />
            ))}
                               
        </TableRow>
        
    )
}

export default TableRowItemCustom;


