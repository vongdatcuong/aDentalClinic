import React,{useState,useEffect} from 'react';
import { makeStyles, useTheme  } from "@material-ui/core/styles";
//translation
import { useTranslation, Trans } from 'react-i18next';
//api
import {secretKey, initializeAPIService, httpPost,httpGet} from '../../../api/base-api';
import apiPath from '../../../api/path';
import ReferralSourceService from "../../../api/referralSource/referralSource.service";
// @material-ui/core Component
import Container from '@material-ui/core/Container';
import { Typography,
    Divider,
    InputAdornment,
    FormControl,
    FilledInput,
    OutlinedInput,
    Select,
    MenuItem,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Button,
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
import { toast } from 'react-toastify';

//import configs
import strings from "../../../configs/strings";
//import image

//import icons
import SearchIcon from '@material-ui/icons/Search';
import FilterList from '@material-ui/icons/FilterList';
import AddBox from '@material-ui/icons/AddBox';
import DeleteIcon from '@material-ui/icons/Delete';

//import component
import TableCustom from "../../common/TableCustom";
import InsertReferralSource from "../InsertReferralSource";
import UpdateReferralSource from "../UpdateReferralSource";

const useStyles = makeStyles(styles);
const createData=(id,name,address,phone,fax,email,additionalInfo)=>{
    return {id,name,address,phone,fax,email,additionalInfo};
};

const dataColumnsName=["index","name","address","phone","fax","email","additionalInfo"];


const Referral = () => {
    const {t, i18n } = useTranslation();

    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchText,setSearchText]=useState(null);
    const [editable,setEditable]=useState(false);
    const [isEdited,setIsEdited]=useState(false);
    const [rows,setRows]=useState([]);
    const [selectedRow,setSelectedRow]=useState(-1);
    const [selectedRowData,setSelectedRowData]=useState(null);
    const [openDialog,setOpenDialog]=useState(false);
    const [insertReferralSource,setInsertReferralSource]=useState(false);
    const [isDelete,setIsDelete]=useState(false);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    
    const handleOpenDialog=(e)=>{
        setOpenDialog(true);
    }
    const handleCloseDialog=(e)=>{
        setOpenDialog(false);
        console.log("Close dialog");
    }
    const handleChangeIsDelete=(e)=>{
        setIsDelete(!isDelete);
        setInsertReferralSource(false);
        setIsEdited(false);
        setEditable(false);
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
    const handleChangeInsertReferralSource=(e)=>{
        setInsertReferralSource(!insertReferralSource);
    }
    const handleChangeEditable=(e)=>{
        setEditable(!editable);
    }
    const handleChangeSelectedRow=(value)=>{
        setSelectedRow(value);
    }
    const handleGoBack=(e)=>{
        setInsertReferralSource(false);
        setIsEdited(false);
        setSelectedRow(-1);
        setSelectedRowData(null);
    }
    const handleChangeIsEdited=(e)=>{
        console.log("Handle change edit");
        setIsEdited(!isEdited);
    }
    const titles=[
        t(strings.index),
        t(strings.name),
        t(strings.address),
        t(strings.phone),
        t(strings.fax),
        t(strings.email),
        t(strings.additionalInfo),
    ];
    const changeData=(data)=>{
        let temp=[];
        data.map((a,index)=>{
            
            let newData=createData(a._id,a.name,a.address,a.phone,a.fax,a.email,a.additional_info);
            temp=temp.concat(newData);

        })
        console.log("Check rows in change data:",temp);
        setRows(temp);
    }
    const deleteRow=(e)=>{
        handleCloseDialog();
        console.log("Delete now:",selectedRowData);
        const deleteReferralSource=async()=>{
            const res=await ReferralSourceService.delete(selectedRowData.id);
            console.log("Delete referral source:",res);
            if(res.success)
            {
                toast.success(t(strings.deleteSuccess));
                let temp=rows;
                temp.splice(selectedRow,1);
                setRows(temp);

            }
            else
            {
                toast.error(t(strings.deleteFail));
            }
        };
        deleteReferralSource();
       
    }
    useEffect(()=>{
        if(rows.length===0)
        {
            const getReferralSource=async()=>{
                const result=await ReferralSourceService.getReferralSource();
                console.log("Get referral source in useEffect:",result.data);
                if(result.success)
                {
                    changeData(result.data);
    
                }
                

            };
            getReferralSource();
            
        }
        if(selectedRow!==-1)
        {
            if(selectedRowData!==rows[selectedRow] && isEdited===false && isDelete===false )
            {
                handleChangeIsEdited();

                setSelectedRowData(rows[selectedRow])
                console.log("Check selected row data:",rows[selectedRow]);
            }
            if(selectedRowData!==rows[selectedRow] && isDelete===true  )
            {

                setSelectedRowData(rows[selectedRow])
                console.log("Check selected row data:",rows[selectedRow]);
            }

        }
    })
    return (
        <div className={classes.container}>
            
            <div className={classes.content}>
                <Grid container>
                    <Grid item xs={8}>
                        <Typography className={classes.title} variant="h4">
                            {t(strings.referral)}
                        </Typography>
                    </Grid>
                    {insertReferralSource===true || isEdited===true ?

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
                        <IconButton onClick={handleChangeInsertReferralSource}>
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
                    {insertReferralSource===true && isEdited=== false  ?
                        <InsertReferralSource
                                     
                        />
                        
                        : isEdited===true &&selectedRowData!==null && isDelete===false?
                        <UpdateReferralSource
                                        editable={editable}
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

export default Referral;