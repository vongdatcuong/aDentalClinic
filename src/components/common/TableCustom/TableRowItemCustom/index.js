import React,{useState,useEffect} from 'react';
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

    // const [editable,setEditable]=useState(props.editable);
    // const [handleChangeIsEdited,setHandleChangeIsEdited]=useState(props.handleChangeIsEdited);
    // const [changeToEditPage,setChangeToEditPage]=useState(props.changeToEditPage);
    const [first,setFirst]=useState(true);

    const handleChangeOnClick=(e)=>{
        // if(props.editable===true && props.changeToEditPage===true)
        // {
        //     console.log("Selected Row:",props.index+props.page*props.rowsPerPage);
        //     props.handleChangeIsEdited();
        //     props.handleChangeSelectedRow(props.index+props.page*props.rowsPerPage);
        // }
        if(props.isDelete===true )
        {
            // console.log("Selected Row:",props.index+props.page*props.rowsPerPage);
            // // props.handleChangeIsEdited();
            // props.handleChangeSelectedRow(props.index+props.page*props.rowsPerPage);
            props.handleOpenDialog();
        }
        // console.log("Selected Row:",props.index+props.page*props.rowsPerPage);
        // props.handleChangeIsEdited();
        props.handleChangeSelectedRow(props.index+props.page*props.rowsPerPage);
    }
    
    
    return(
        <TableRow 
                    className={props.editable===true && props.changeToEditPage===true ? classes.tableRowEditChangePage : 
                        props.editable===true && props.changeToEditPage===false ? classes.tableRowEdit : 
                        props.isDelete===true && props.editable===false? classes.tableRowDelete :
                        classes.tableRow}
                    onClick={handleChangeOnClick}
                    >
            {props.titles.map((title,index2)=>(                            
                    <TableCellCustom  
                            key={index2+props.propsKey}
                            //key={props.row[props.dataColumnsName[1]]}
                            title={title}
                            index={index2}
                            value={index2===0 ? props.index+1+props.page*props.rowsPerPage  : props.row[`${props.dataColumnsName[index2]}`]
                                    }
                            editable={props.editable}
                            handleChangeIsEdited={props.handleChangeIsEdited}
                            changeToEditPage={props.changeToEditPage}
                            handleChangeSelectedRow={props.handleChangeSelectedRow}
                            numberColumn={props.numberColumn}

                />
            ))}
                               
        </TableRow>
        
    )
}

export default TableRowItemCustom;


