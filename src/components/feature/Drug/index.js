import React,{useState,useEffect} from 'react';
import { makeStyles  } from "@material-ui/core/styles";
//api
import AuthService from "../../../api/authentication/auth.service";
import DrugService from "../../../api/drug/drug.service";
//translation
import { useTranslation } from 'react-i18next';

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
    Button,
    DialogContent,
    DialogContentText,
    DialogActions,
 } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';


import styles from "./jss";
import darkTheme from "../../../themes/darkTheme";
import { toast } from 'react-toastify';

//import configs
import strings from "../../../configs/strings";
//import image

//import icons
import SearchIcon from '@material-ui/icons/Search';
// import FilterList from '@material-ui/icons/FilterList';
import AddBox from '@material-ui/icons/AddBox';
import DeleteIcon from '@material-ui/icons/Delete';
//import component
import TableCustom from "../../common/TableCustom";
import InsertDrug from "../InsertDrug";
import UpdateDrug from "../UpdateDrug";
import LoadingPage from '../../../layouts/LoadingPage';

const useStyles = makeStyles(styles);
const createData=(id,name,dispensed,quantity,descripton,note)=>{
    return {id,name,dispensed,quantity,descripton,note};
};
const dataColumnsName=["index","name","dispensed","quantity","descripton","note"]

const Drug = () => {
    const {t, i18n } = useTranslation();

    const classes = useStyles();
    const [insertDrug,setInsertDrug]=useState(false);
    const [openDialog,setOpenDialog]=useState(false);
    
    const [searchText,setSearchText]=useState(null);
    const [editable,setEditable]=useState(false);
    const [isEdited,setIsEdited]=useState(false);
    const [rows,setRows]=useState([]);
    const [selectedRow,setSelectedRow]=useState(-1);
    const [selectedRowData,setSelectedRowData]=useState(null);
    const [isDelete,setIsDelete]=useState(false);
    const [isInsert,setIsInsert]=useState(false);
    const [isUpdate,setIsUpdate]=useState(false);
    const [user,setUser]=useState(null);
    const [isLoading,setIsLoading]=useState(true);
    
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
        setInsertDrug(false);
        setIsEdited(false);
        setEditable(false);
    }
    
    const handleChangeSearchText = (event) => {
        setSearchText(event.target.value);
    };
    const handleChangeInsertDrug=(e)=>{
        setInsertDrug(!insertDrug);
    }
    const handleChangeEditable=(e)=>{
        setEditable(!editable);
        setIsDelete(false);
    }
    const handleChangeSelectedRow=(value)=>{
        setSelectedRow(value);
    }
    const handleGoBack=(e)=>{
        setInsertDrug(false);
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
        t(strings.dispensed),
        t(strings.quantity),
        t(strings.description),
        t(strings.note),

    ];
    const changeData=(data)=>{
        let temp=[];
        data.map((a,index)=>{
            
            let newData=createData(a._id,a.name,a.dispensed,a.quantity,a.description,a.note);
            temp=temp.concat(newData);

        })
        setRows(temp);
    }
    const deleteRow=(e)=>{
        handleCloseDialog();
        const deleteDrug=async()=>{
            const res=await DrugService.delete(selectedRowData.id);
            if(res.success)
            {
                toast.success(t(strings.deleteSuccess));
                let temp=rows;
                temp.splice(selectedRow,1);
                setRows(temp);
                setSelectedRowData(null);
                setSelectedRowData(-1);
            }
            else
            {
                toast.error(t(strings.deleteFail));
            }
        };
        deleteDrug();
       
    }
    const getDrug=async()=>{
        const result=await DrugService.getDrug();
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
            
            getDrug();
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
        if(isInsert===true)
        {
            getDrug();
            setIsInsert(false);
        }
        if(isUpdate===true)
        {
            getDrug();
            setIsUpdate(false);
        }
        
    })
    return (
        <div className={classes.container}>
            
            <div >
                <Grid container>
                    <Grid item xs={8}>
                        <Typography className={classes.title} variant="h4">
                            {t(strings.drug)}
                        </Typography>
                    </Grid>
                    {insertDrug===true || isEdited===true ?

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
                                <IconButton onClick={handleChangeInsertDrug}>
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
                {insertDrug===true && isEdited=== false  ?
                    <InsertDrug 
                                    handleChangeIsInsert={handleChangeIsInsert}
                    />
                    : isEdited===true &&selectedRowData!==null && isDelete===false?
                    <UpdateDrug
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
                        <Button variant="outlined" onClick={handleCloseDialog} color="secondary" >
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

export default Drug;