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
    const row=rows[0];
    console.log("Data column :",row[`${dataColumnsName[1]}`]);
    console.log("column name:",dataColumnsName[0]);


    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const check=()=>{
        
        return titles.map((title,index)=>{
            <div key={index}>{title}</div>
        })
    }
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
                        
                            <TableRowItemCustom key={row[`${dataColumnsName[1]}`]}
                                                index={index}
                                                titles={titles}
                                                row={row}
                                                dataColumnsName={dataColumnsName}
                                                page={page}
                                                rowsPerPage={rowsPerPage}
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