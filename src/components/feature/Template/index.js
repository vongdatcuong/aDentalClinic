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
import darkTheme from "../../../themes/darkTheme";
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
    const [selectedRow,setSelectedRow]=useState(-1);
    const [selectedRowData,setSelectedRowData]=useState(null);
    const [openDialog,setOpenDialog]=useState(false);
    const [insertTemplate,setInsertTemplate]=useState(false);
    const [isDelete,setIsDelete]=useState(false);

    const titles=[
        t(strings.index),
        t(strings.content),
        t(strings.noteType),

    ];
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
    }
    const handleChangeSelectedRow=(value)=>{
        setSelectedRow(value);
    }
    const handleGoBack=(e)=>{
        setInsertTemplate(false);
        setIsEdited(false);
        setSelectedRow(-1);
        setSelectedRowData(null);
    }
    const handleChangeIsEdited=(e)=>{
        console.log("Handle change edit");
        setIsEdited(!isEdited);
    }
    const deleteRow=(e)=>{
        handleCloseDialog();
        console.log("Delete now:",selectedRowData);
        const deleteDrug=async()=>{
            const res=await TemplateService.delete(selectedRowData.id);
            console.log("Delete template:",res);
            if(res.success)
            {
                alert(t(strings.deleteSuccess))
            }
            else
            {
                alert(t(strings.deleteFail));
            }
        };
        deleteDrug();
       
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
    }
    useEffect(()=>{
        if(rows.length===0)
        {
            const getTemplate=async()=>{
                const result=await TemplateService.getTemplate();
                console.log("Get template in useEffect",result.data);
                if(result.success)
                {
                    changeData(result.data);
        
                }
            }
            getTemplate();  
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
        
    })

    return (
        <div className={classes.container}>
            
            <div >
                <Grid container>
                    <Grid item xs={8}>
                        <Typography className={classes.title} variant="h4">
                            {t(strings.template)}
                        </Typography>
                    </Grid>
                    {insertTemplate===true || isEdited===true ?

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
                            <IconButton onClick={handleChangeInsertTemplate}>
                                <AddBox />            

                            </IconButton>
                            <IconButton onClick={handleChangeIsDelete}>
                                <DeleteIcon />            

                            </IconButton>
                        </Grid>

                    }
                </Grid>
                <Divider className={classes.titleDivider}/>
                <Container style={{marginLeft:"10px"}}>
                    {insertTemplate===true && isEdited=== false  ?
                        <InsertTemplate 
                                     
                        />
                        : isEdited===true &&selectedRowData!==null && isDelete===false?
                        <UpdateTemplate
                                        id={selectedRowData.id}
                                        

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
                                    isDelete={isDelete}
                                    handleOpenDialog={handleOpenDialog}
                                    handleCloseDialog={handleCloseDialog}
                                    />
                    }
                   
                   
                </Container>
                
                
                
                <Dialog onClose={handleCloseDialog} open={openDialog} className={classes.dialog}>
                    
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                        {t(strings.deleteConfirmMessage)}

                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} color="secondary">
                            {t(strings.no)}
                        </Button>
                        <Button onClick={deleteRow} color="primary" autoFocus>
                            {t(strings.yes)}

                        </Button>
                    </DialogActions>
                    
                </Dialog>
            
            </div>
            
        </div>
    )
    // return (
    //     <div className={classes.container}>
            
    //         <div className={classes.content}>
    //             <Grid container>
    //                 <Grid item xs={8}>
    //                     <Typography className={classes.title} variant="h4">
    //                         {t(strings.template)}
    //                     </Typography>
    //                 </Grid>
                    
    //             </Grid>
    //             <Divider className={classes.titleDivider}/>

    //             <Container style={{marginTop:'30px'}}>
    //                 <Grid container>
    //                     <Grid item xs={8}>
    //                         <Typography className={classes.titleItem} variant="h5">
    //                             {t(strings.recent)}
    //                         </Typography>
    //                     </Grid>
                        
    //                 </Grid>
    //                 <Grid container >
    //                     <Grid item className={classes.templateNewPatient}>
    //                         <FiberNewIcon/>
    //                         <Typography  variant="body1">
    //                             {t(strings.newPatient)}
    //                         </Typography>
    //                     </Grid>
    //                     <div className={classes.spaceLeft}></div>
    //                     <Grid item className={classes.templateInvoice}>
    //                         <ReceiptIcon/>
    //                         <Typography  variant="body1">
    //                             {t(strings.invoice)}
    //                         </Typography>
    //                     </Grid>

    //                 </Grid>
    //             </Container>
    //             <Container style={{marginTop:'30px'}}>
    //                 <Grid container>
    //                     <Grid item xs={8}>
    //                         <Typography className={classes.titleItem} variant="h5">
    //                             {t(strings.allTemplates)}
    //                         </Typography>
    //                     </Grid>
                        
    //                 </Grid>
    //                 <Grid container >
    //                     <Grid item className={classes.templateNewPatient}>
    //                         <FiberNewIcon/>
    //                         <Typography  variant="body1">
    //                             {t(strings.newPatient)}
    //                         </Typography>
    //                     </Grid>
    //                     <div className={classes.spaceLeft}></div>
    //                     <Grid item className={classes.templateInvoice}>
    //                         <ReceiptIcon/>
    //                         <Typography  variant="body1">
    //                             {t(strings.invoice)}
    //                         </Typography>
    //                     </Grid>
    //                     <div className={classes.spaceLeft}></div>
    //                     <Grid item className={classes.templateReport}>
    //                         <AssessmentIcon/>
    //                         <Typography  variant="body1">
    //                             {t(strings.report)}
    //                         </Typography>
    //                     </Grid>
    //                     <div className={classes.spaceLeft}></div>
    //                     <Grid item className={classes.templateResignationLetter}>
    //                         <GroupIcon/>
    //                         <Typography  variant="body1">
    //                             {t(strings.resignationLetter)}
    //                         </Typography>
    //                     </Grid>

    //                 </Grid>
    //             </Container>
                
    //         </div>
            
    //     </div>
    // )
}

export default Template;