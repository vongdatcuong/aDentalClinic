import React,{useState,useEffect} from 'react';
import { makeStyles  } from "@material-ui/core/styles";
//translation
import { useTranslation } from 'react-i18next';
//api
import AuthService from "../../../api/authentication/auth.service";
import ReferralSourceService from "../../../api/referralSource/referralSource.service";

// @material-ui/core Component
import Container from '@material-ui/core/Container';
import { Typography,
    Divider,
    InputAdornment,
    FormControl,
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


import styles from "./jss";
// import darkTheme from "../../../themes/darkTheme";
import { toast } from 'react-toastify';

//import configs
import strings from "../../../configs/strings";
//import image

//import icons
import SearchIcon from '@material-ui/icons/Search';
import AddBox from '@material-ui/icons/AddBox';
import DeleteIcon from '@material-ui/icons/Delete';

//import component
import TableCustom from "../../common/TableCustom";
import InsertReferralSource from "../InsertReferralSource";
import UpdateReferralSource from "../UpdateReferralSource";
import LoadingPage from '../../../layouts/LoadingPage';
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
    const [isInsert,setIsInsert]=useState(false);
    const [isUpdate,setIsUpdate]=useState(false);
    const [user,setUser]=useState(null);
    const [isLoading,setIsLoading]=useState(true);
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    
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
        setRows(temp);
    }
    const deleteRow=(e)=>{
        handleCloseDialog();
        const deleteReferralSource=async()=>{
            const res=await ReferralSourceService.delete(selectedRowData.id);
            if(res.success)
            {
                toast.success(t(strings.deleteSuccess));
                let temp=rows;
                temp.splice(selectedRow,1);
                setRows(temp);
                setSelectedRow(-1);
                setSelectedRowData(null);
            }
            else
            {
                toast.error(t(strings.deleteFail));
            }
        };
        deleteReferralSource();
       
    }
    const getReferralSource=async()=>{
        const result=await ReferralSourceService.getReferralSource();
        if(result.success)
        {
            changeData(result.data);

        }
        

    };
    const getUser=async()=>{
        const result=await AuthService.getCurrentUser();
        setUser(result);
    }
    useEffect(()=>{
        if(rows.length===0)
        {
            
            getReferralSource();
            getUser();
            setIsLoading(false);
        }
        if(selectedRow!==-1)
        {
            if(selectedRowData!==rows[selectedRow] && isEdited===false && isDelete===false )
            {
                handleChangeIsEdited();

                setSelectedRowData(rows[selectedRow])
            }
            if(selectedRowData!==rows[selectedRow] && isDelete===true  )
            {

                setSelectedRowData(rows[selectedRow])
            }

        }
        if(isInsert)
        {
            getReferralSource();
            setIsInsert(false);

        }
        if(isUpdate)
        {
            getReferralSource();
            setIsUpdate(false);
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
                        {user!==null && user.user_type==="ADMIN" ? 
                            <div>
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
                            </div>
                            :
                            <div></div>
                            }
                    </Grid>

                    }
                    
                    
                </Grid>
                <Divider className={classes.titleDivider}/>
                {isLoading === false ?
                    <Container className={classes.containerTable}>
                    {insertReferralSource===true && isEdited=== false  ?
                        <InsertReferralSource
                                handleChangeIsInsert={handleChangeIsInsert}

                        />
                        
                        : isEdited===true &&selectedRowData!==null && isDelete===false?
                        <UpdateReferralSource
                                        editable={editable}
                                        id={selectedRowData.id}
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
                                    isDelete={isDelete}
                                    handleOpenDialog={handleOpenDialog}
                                    handleCloseDialog={handleCloseDialog}
                                    />
                    }
                   
                   
                </Container>
                :
                <LoadingPage/>
                }
                
                
                
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