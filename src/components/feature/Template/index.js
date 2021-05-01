import React,{useState,useEffect} from 'react';
import { makeStyles, useTheme  } from "@material-ui/core/styles";
//translation
import { useTranslation, Trans } from 'react-i18next';
//api
import {secretKey, initializeAPIService, httpPost,httpGet} from '../../../api/base-api';
import apiPath from '../../../api/path';
import TemplateService from "../../../api/template/template.service";
// @material-ui/core Component
import Container from '@material-ui/core/Container';
import { Typography,
    Divider,
    InputAdornment,
    FormControl,
    FilledInput,
    OutlinedInput,
    Dialog,
    DialogContentText,
    DialogContent,
    DialogActions,
    Button,
    Select,
    MenuItem,
 } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import PropTypes from 'prop-types';

import styles from "./jss";
import darkTdarkTheme from "../../../themes/darkTheme";
import { toast } from 'react-toastify';

//import configs
import strings from "../../../configs/strings";
//import image

//import icons
import SearchIcon from '@material-ui/icons/Search';
import FilterList from '@material-ui/icons/FilterList';
import AddBox from '@material-ui/icons/AddBox';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AssessmentIcon from '@material-ui/icons/Assessment';
import GroupIcon from '@material-ui/icons/Group';
import DeleteIcon from '@material-ui/icons/Delete';

//import component

import TableCustom from "../../common/TableCustom";
import InsertTemplate from "../InsertTemplate";
import UpdateTemplate from "../UpdateTemplate";
import { indigo } from '@material-ui/core/colors';
const createData=(id,content,noteType)=>{
    return {id,content,noteType};
};

const dataColumnsName=["index","content","noteType"];

const useStyles = makeStyles(styles);
const Template = () => {
    const {t, i18n } = useTranslation();

    const classes = useStyles();
    
    //state
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchText,setSearchText]=useState(null);
    const [editable,setEditable]=useState(false);
    const [isEdited,setIsEdited]=useState(false);
    const [rows,setRows]=useState([]);
    const [rowsWithType,setRowsWithType]=useState(null);
    const [rowsTreatment,setRowsTreatment]=useState([]);
    const [rowsMedicalAlert,setRowsMedicalAlert]=useState([]);
    const [rowsProgress,setRowsProgress]=useState([]);
    const [chooseType,setChooseType]=useState(0);
    const [selectedRow,setSelectedRow]=useState(-1);
    const [selectedRowData,setSelectedRowData]=useState(null);
    const [openDialog,setOpenDialog]=useState(false);
    const [insertTemplate,setInsertTemplate]=useState(false);
    const [isDelete,setIsDelete]=useState(false);
    const [isInsert,setIsInsert]=useState(false);
    const [isUpdate,setIsUpdate]=useState(false);

    const titles=[
        t(strings.index),
        t(strings.content),

    ];

    //handle
    const handleChangeIsInsert=()=>{
        setIsInsert(!isInsert);
    };
    const handleChangeIsUpdate=()=>{
        setIsUpdate(!isUpdate);
    }
    const handleOpenDialog=(e)=>{
        setOpenDialog(true);
    }
    const handleCloseDialog=(e)=>{
        setOpenDialog(false);
        console.log("Close dialog");
    }
    const handleChangeIsDelete=(e)=>{
        setIsDelete(!isDelete);
        setInsertTemplate(false);
        setIsEdited(false);
        setEditable(false);
    }
    const handleChangeSearchText = (event) => {
        setSearchText(event.target.value);
    };
    const handleChangeInsertTemplate=(e)=>{
        setInsertTemplate(!insertTemplate);
    }
    const handleChangeEditable=(e)=>{
        setEditable(!editable);
        setIsDelete(false);
    }
    const handleChangeSelectedRow=(value)=>{
        setSelectedRow(value);
    }
    
    const handleGoBackToTable=(e)=>{
        setInsertTemplate(false);
        setIsEdited(false);
        setSelectedRow(-1);
        setSelectedRowData(null);
    }
    const handleGoBackToHome=(e)=>{
        setInsertTemplate(false);
        setIsEdited(false);
        setSelectedRow(-1);
        setSelectedRowData(null);
        setChooseType(0);
        setRowsWithType(null);
    }
    const handleChangeIsEdited=(e)=>{
        console.log("Handle change edit");
        setIsEdited(!isEdited);
    }
    const handleChangeChooseType=(value)=>{
        setChooseType(value);
    }
    
    const changeData=(data)=>{
        let temp=[];
        data.map((a,index)=>{
            console.log("Check item:",a);
            let newData=createData(a._id,a.content,a.note_type);
            temp=temp.concat(newData);

        })
        console.log("Check rows in change data:",temp);
        setRows(temp);
        if(chooseType===1)
        {
            chooseMedicalAlert(temp);
        }
        if(chooseType===2)
        {
            chooseProgress(temp);
        }
        if(chooseType===3)
        {
            chooseTreatment(temp);
        }
    }
    const chooseMedicalAlert=(data)=>{
        let temp=[];
        data.map((a,index)=>{
            if(a.noteType==="MEDICAL_ALERT")
            temp=temp.concat(a);
        })
        setRowsMedicalAlert(temp);
        setRowsWithType(temp);
        setChooseType(1);
    }
    const chooseProgress=(data)=>{
        let temp=[];
        data.map((a,index)=>{
            if(a.noteType==="PROGRESS")
            temp=temp.concat(a);
        })
        setRowsProgress(temp);
        setRowsWithType(temp);

        setChooseType(2);

    }
    const chooseTreatment=(data)=>{
        let temp=[];
        data.map((a,index)=>{
            if(a.noteType==="TREATMENT")
            temp=temp.concat(a);
        })
        setRowsTreatment(temp);
        setRowsWithType(temp);

        setChooseType(3);

    }
    const getTemplate=async()=>{
        const result=await TemplateService.getTemplate();
        console.log("Get template in useEffect",result.data);
        if(result.success)
        {
            changeData(result.data);

        }
        
    }
    const deleteRow=(e)=>{
        handleCloseDialog();
        console.log("Delete now:",selectedRowData);
        const deleteTemplate=async()=>{
            const res=await TemplateService.delete(selectedRowData.id);
            console.log("Delete template:",res);
            if(res.success)
            {
                toast.success(t(strings.deleteSuccess));
                getTemplate()
                if(chooseType===1)
                {
                    let temp=rowsMedicalAlert;
                    temp.splice(selectedRow,1);
                    setRowsMedicalAlert(temp);
                    chooseMedicalAlert(temp);
                }
                if(chooseType===2)
                {
                    let temp=rowsProgress;
                    temp.splice(selectedRow,1);
                    setRowsProgress(temp);
                    chooseProgress(temp);
                }
                if(chooseType===1)
                {
                    let temp=rowsTreatment;
                    temp.splice(selectedRow,1);
                    setRowsTreatment(temp);
                    chooseTreatment(temp);
                }
                setSelectedRow(-1);
                setSelectedRowData(null);
            }
            else
            {
                toast.error(t(strings.deleteFail));
            }
        };
        deleteTemplate();
       
    }
    useEffect(()=>{
        if(rows.length===0)
        {
            
            getTemplate();  
        }
        if(selectedRow!==-1)
        {
            if(selectedRowData!==rowsWithType[selectedRow] && isEdited===false && isDelete===false)
            {
                handleChangeIsEdited();

                setSelectedRowData(rowsWithType[selectedRow])
                console.log("Check selected row data:",rowsWithType[selectedRow]);
            }
            if(selectedRowData!==rows[selectedRow] && isDelete===true  )
            {

                setSelectedRowData(rowsWithType[selectedRow])
                console.log("Check selected row data:",rowsWithType[selectedRow]);
            }


        }
        if(isInsert)
        {
            console.log("Co vao day insert");
            getTemplate();
            
            setIsInsert(false);
        }
        if(isUpdate)
        {
            console.log("Co vao day update:");
            getTemplate();
            
            setIsUpdate(false);
        }
    })

    

    if(rows.length!==0)
    {
        return (
            <div className={classes.container}>
                
                <div className={classes.content}>
                    <Grid container>
                        <Grid item xs={10}>
                            <Typography className={classes.title} variant="h4">
                                {t(strings.template)}
                            </Typography>
                        </Grid>
                        {insertTemplate===true || isEdited===true && isDelete===false ?
    
                        <Grid item xs={2}>
                            <Typography variant="h6" onClick={handleGoBackToTable} className={classes.goBack}>
                                {t(strings.goBack)}
                            </Typography>
                        </Grid>
                        :
                        insertTemplate===true && isEdited=== false  ?
                            <div 
                                         
                            />
                            :
                            isEdited===true &&selectedRowData!==null && isDelete===false?
                            <div
                            />
                            :
                            chooseType===0 && insertTemplate===false && isEdited=== false?
                            <div>
                                
                            </div>
                            :
                            <Grid item xs={2}>
    
                                <Typography variant="h6" onClick={handleGoBackToHome} className={classes.goBack}>
                                    {t(strings.goBack)}
                                </Typography>
                            </Grid>
                        }
                    </Grid>
                    
                    <Divider className={classes.titleDivider}/>
                   
                    {chooseType!==0 && insertTemplate===false && isEdited===false ?
                        <div item xs={6} className={classes.serviceGroup}>
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
                            <IconButton onClick={handleChangeInsertTemplate}>
                            <AddBox />            
    
                            </IconButton>
                            <IconButton onClick={handleChangeIsDelete}>
                            <DeleteIcon />            
    
                            </IconButton>
                            
                            
                        </div>
                        :
                        <div/>
                    }
                    
                    
                    <Container className={classes.containerTable}>
                        {
                            insertTemplate===true && isEdited=== false  ?
                            <InsertTemplate 
                                    handleChangeIsInsert={handleChangeIsInsert}
                            />
                            :
                            isEdited===true &&selectedRowData!==null && isDelete===false?
                            <UpdateTemplate
                                id={selectedRowData.id}
                                editable={editable}
                                handleChangeIsUpdate={handleChangeIsUpdate}
                            />
                            :
    
                            chooseType===0 && insertTemplate===false && isEdited=== false?
                            <div>
                                <Grid container>
                                    <Grid item xs={8}>
                                        <Typography className={classes.titleItem} variant="h5">
                                            {t(strings.allTemplates)}
                                        </Typography>
                                    </Grid>
                            
                                 </Grid>
                                <Grid container >
                                    <Grid item className={classes.templateProgress} onClick={()=>chooseProgress(rows)}>
                                        <FiberNewIcon/>
                                        <Typography  variant="body1">
                                            {t(strings.templateProgress)}
                                        </Typography>
                                    </Grid>
                                    <div className={classes.spaceLeft}></div>
                                    <Grid item className={classes.templateMedicalAlert} onClick={()=>chooseMedicalAlert(rows)}>
                                        <ReceiptIcon/>
                                        <Typography  variant="body1">
                                            {t(strings.templateMedicalAlert)}
                                        </Typography>
                                    </Grid>
                                    <div className={classes.spaceLeft}></div>
                                    <Grid item className={classes.templateTreatment} onClick={()=>chooseTreatment(rows)}>
                                        <AssessmentIcon/>
                                        <Typography  variant="body1">
                                            {t(strings.templateTreatment)}
                                        </Typography>
                                    </Grid>
                                    <div className={classes.spaceLeft}></div>
                            
    
                                </Grid>
                    
                            </div>
                            :
                            
                            <TableCustom
                                titles={titles}
                                data={rowsWithType}
                                dataColumnsName={dataColumnsName}
                                editable={editable}
                                handleChangeIsEdited={handleChangeIsEdited}
                                changeToEditPage={true}
                                handleChangeSelectedRow={handleChangeSelectedRow}
                                numberColumn={dataColumnsName.length}
                                isDelete={isDelete}
                                handleOpenDialog={handleOpenDialog}
                                handleCloseDialog={handleCloseDialog}
                            />
                           
                            // :
                            // <div>Hello world</div>
                        }
                        
                    
                    </Container>
                    <Dialog onClose={handleCloseDialog} open={openDialog} className={classes.dialog}>
                        
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                            {t(strings.deleteConfirmMessage)}
    
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="outlined" onClick={handleCloseDialog} color="secondary">
                                {t(strings.no)}
                            </Button>
                            <Button variant="contained" onClick={deleteRow} color="primary" autoFocus>
                                {t(strings.yes)}
    
                            </Button>
                        </DialogActions>
                        
                    </Dialog>
                
                </div>
                
            </div>
        )
    }
    else
    {
        return <div></div>
    }
    
}

export default Template;