import React,{useState,useEffect} from 'react';
import { makeStyles, useTheme  } from "@material-ui/core/styles";
//api
import {secretKey, initializeAPIService, httpPost,httpGet} from '../../../api/base-api';
import apiPath from '../../../api/path';
import ProcedureService from "../../../api/procedure/procedure.service";
//translation
import { useTranslation, Trans } from 'react-i18next';

// @material-ui/core Component
import Container from '@material-ui/core/Container';
import { Typography,
    Divider,
    TextField,
    InputLabel ,
    InputAdornment,
    FormControl,
    FilledInput,
    OutlinedInput,
    Select,
    MenuItem
 } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import PropTypes from 'prop-types';

import styles from "./jss";
import darkTheme from "../../../themes/darkTheme";
//import configs
import strings from "../../../configs/strings";
//import image

//import icons
import SearchIcon from '@material-ui/icons/Search';
import FilterList from '@material-ui/icons/FilterList';
import AddBox from '@material-ui/icons/AddBox';

//import component
import TableCustom from "../../common/TableCustom";
import InsertProcedure from "../InsertProcedure";
import UpdateProcedure from "../UpdateProcedure";

const useStyles = makeStyles(styles);
const createData=(id,abbreviation,code,description,toothSelect,toothType)=>{
    return {id,abbreviation,code,description,toothSelect,toothType};
};
const dataColumnsName=["index","abbreviation","code","description","toothSelect","toothType"];


const Procedure = () => {
    const classes = useStyles();
    const {t, i18n } = useTranslation();

    //state
    const [insertProcedure,setInsertProcedure]=useState(false);
    const [rows,setRows]=useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchText,setSearchText]=useState(null);
    const [editable,setEditable]=useState(false);
    const [isEdited,setIsEdited]=useState(false);
    const [selectedRow,setSelectedRow]=useState(-1);
    const [selectedRowData,setSelectedRowData]=useState(null);
    const [isInsert,setIsInsert]=useState(false);
    const [isUpdate,setIsUpdate]=useState(false);
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    
    //handle
    const handleChangeIsInsert=()=>{
        setIsInsert(!isInsert);
    };
    const handleChangeIsUpdate=()=>{
        setIsUpdate(!isUpdate);
    }
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleChangeSearchText = (event) => {
        setSearchText(event.target.value);
    };
    
    const handleChangeInsertProcedure=(e)=>{
        setInsertProcedure(!insertProcedure);
    }
    const handleChangeSelectedRow=(value)=>{
        setSelectedRow(value);
    }
    const handleChangeEditable=(e)=>{
        setEditable(!editable);
    }

    const handleChangeIsEdited=(e)=>{
        console.log("Handle change edit");
        setIsEdited(!isEdited);
    }
    const handleGoBack=(e)=>{
        setInsertProcedure(false);
        setIsEdited(false);
        setSelectedRow(-1);
        setSelectedRowData(null);
    }
    const titles=[
        t(strings.index),
        t(strings.abbreviation),
        t(strings.code),
        t(strings.description),
        // t(strings.category),
        t(strings.toothSelect),
        t(strings.toothType),
    ];
    const changeData=(data)=>{
        let temp=[];
        //let categoryName;
        data.map((a,index)=>{
            // const searchCategory=async()=>{
            //     const res=await ProcedureService.searchCategory(a.category);
            //     categoryName=res.data.name;
            //     console.log("Check search procedure category:",categoryName);

                
            // }
            // searchCategory();
            let newData=createData(a._id,a.abbreviation,a.code,a.description,a.tooth_select,a.tooth_type);
            temp=temp.concat(newData);
            
        })
        console.log("Check rows in change data:",temp);
        setRows(temp);
       
    }
    const getProcedure=async()=>{
        const result=await ProcedureService.getProcedure();
        console.log("Get procedure in useEffect:",result.data);
        if(result.success)
        {
            changeData(result.data);

        }
        

    };
    useEffect(()=>{
        if(rows.length===0)
        {
            
            getProcedure();
            
        }
        if(selectedRow!==-1)
        {
            if(selectedRowData!==rows[selectedRow] && isEdited===false)
            {
                handleChangeIsEdited();

                setSelectedRowData(rows[selectedRow])
                console.log("Check selected row data:",rows[selectedRow]);
            }

        }
        if(isInsert===true)
        {
            getProcedure();
            setIsInsert(false);
        }
        if(isUpdate===true)
        {
            getProcedure();
            setIsUpdate(false);
        }
        
    })
    return (
        <div className={classes.container}>            
            <div className={classes.content}>
                <Grid container>
                    <Grid item xs={8}>
                        <Typography className={classes.title} variant="h4">
                            {t(strings.procedure)}
                        </Typography>
                    </Grid>
                    {insertProcedure===true || isEdited===true ?
                        <Grid item xs={4}>
                        <Typography variant="h6" onClick={handleGoBack} className={classes.goBack}>
                            {t(strings.goBack)}
                        </Typography>
                    </Grid>
                    :
                    <Grid item xs={4} className={classes.serviceControl}>
                    
                        <FormControl variant="filled">

                            <OutlinedInput
                                className={classes.searchControl}
                                id="outlined-adornment-password"
                                type={'text'}
                                value={searchText}
                                placeholder={t(strings.search)}
                                onChange={handleChangeSearchText}
                                endAdornment={
                                <InputAdornment position="end">
                                    <SearchIcon className={classes.iconButton} />

                                </InputAdornment>
                                }
                            />
                        </FormControl>
                        <Select
                        
                            value={editable}
                            onChange={handleChangeEditable}
                            disableUnderline 
                            className={classes.status}
                        >
                        
                            <MenuItem value={false}>{t(strings.read)}</MenuItem>
                            <MenuItem value={true}>{t(strings.edit)}</MenuItem>

                        </Select>
                        <IconButton onClick={handleChangeInsertProcedure}>
                            <AddBox />            

                        </IconButton>
                    </Grid>
                
                    }
                    
                </Grid>
                <Divider className={classes.titleDivider}/>
                <Container className={classes.containerTable}>
                    {insertProcedure===true  ?
                        <InsertProcedure 
                        handleChangeIsInsert={handleChangeIsInsert}
                        />
                        : isEdited===true &&selectedRowData!==null ?
                        <UpdateProcedure 
                            id={selectedRowData.id}
                            editable={editable}
                            handleChangeIsUpdate={handleChangeIsUpdate}
                        />
                        :
                        
                            <TableCustom titles={titles}
                                    data={rows}
                                    dataColumnsName={dataColumnsName}
                                    editable={editable}
                                    handleChangeIsEdited={handleChangeIsEdited}
                                    changeToEditPage={true}
                                    handleChangeSelectedRow={handleChangeSelectedRow}
                                    numberColumn={dataColumnsName.length}
                                    
                                    />
                    }
                </Container>
                
                
            </div>
            
        </div>
    )
}

export default Procedure;