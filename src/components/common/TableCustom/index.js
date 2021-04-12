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
    Paper,
    
} from '@material-ui/core';
import styles from "./jss";
//import configs
import strings from "../../../configs/strings";
import figures from '../../../configs/figures';

//import component
import TablePaginationActions from "../../../layouts/TablePaginationActions";
import TableRowItemCustom from "./TableRowItemCustom";
const useStyles = makeStyles(styles);

const TableCustom=(props)=>{
    const {t, i18n } = useTranslation();
    const classes = useStyles();

    const rows=props.data;
    const titles=props.titles;
    const dataColumnsName=props.dataColumnsName;
    

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(props.rowsPerPage || figures.defaultRowsPerPage);
    // const [editable,setEditable]=useState(props.editable);
    // const [handleChangeIsEdited,setHandleChangeIsEdited]=useState(props.handleChangeIsEdited);
    // const [changeToEditPage,setChangeToEditPage]=useState(props.changeToEditPage);
    // let editable=props.editable;
    // let handleChangeIsEdited=props.handleChangeIsEdited;
    // let changeToEditPage=props.changeToEditPage;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    
    
    return(
        <TableContainer component={Paper}>
           
                <Table className={classes.table} aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>

                            {titles.map((title,index)=>(
                                <TableCell key={index} className={classes.titleColumn} align={index===0 ? 'center':'left'} >
                                    {title}
                                </TableCell>
                            ))}
                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : rows
                        ).map((row,index) => (
                        
                            <TableRowItemCustom 
                                                key={index+page*rowsPerPage}
                                                propsKey={index+page*rowsPerPage}
                                                index={index}
                                                titles={titles}
                                                row={row}
                                                dataColumnsName={dataColumnsName}
                                                page={page}
                                                rowsPerPage={rowsPerPage}
                                                editable={props.editable}
                                                handleChangeIsEdited={props.handleChangeIsEdited}
                                                changeToEditPage={props.changeToEditPage}
                                                handleChangeSelectedRow={props.handleChangeSelectedRow}
                                                numberColumn={props.numberColumn}
                                                />
                        ))}

                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                            </TableRow>
          )}
                    </TableBody>
                    <TableFooter className={classes.footer}>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[...figures.rowsPerPageOption, { label: 'All', value: -1 }]}
                                        count={rows.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onChangePage={handleChangePage}
                                        onChangeRowsPerPage={handleChangeRowsPerPage}
                                        ActionsComponent={TablePaginationActions}
                                        labelRowsPerPage={t(strings.rowsPerPage)}
                                    />
                                </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        
    )
}

export default TableCustom;