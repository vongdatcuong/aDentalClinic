import React,{useState,useEffect} from 'react';
import { makeStyles  } from "@material-ui/core/styles";
//translation
import { useTranslation } from 'react-i18next';
//api
import AuthService from "../../../api/authentication/auth.service";
import ChairService from "../../../api/chair/chair.service";

// @material-ui/core Component
import Container from '@material-ui/core/Container';
import { Typography,
   
    InputAdornment,
    FormControl,
    OutlinedInput,
    Divider,
    Select,
    MenuItem,
 } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

import styles from "./jss";
//import configs
import strings from "../../../configs/strings";
//import image

//import icons
import SearchIcon from '@material-ui/icons/Search';
import AddBox from '@material-ui/icons/AddBox';

//import component
import TableCustom from "../../common/TableCustom";
import InsertChair from "../InsertChair";
import UpdateChair from "../UpdateChair";
import LoadingPage from '../../../layouts/LoadingPage';
const useStyles = makeStyles(styles);
const createData=(id,name,order,status)=>{
    return {id,name,order,status};
};


const Chairs = () => {
    const {t, i18n } = useTranslation();

    const classes = useStyles();
    const [insertChair,setInsertChair]=useState(false);

    
    const [searchText,setSearchText]=useState(null);
    const [editable,setEditable]=useState(false);
    const [isEdited,setIsEdited]=useState(false);
    const [rows,setRows]=useState([]);
    const [originalData,setOriginalData]=useState([]);
    const [selectedRow,setSelectedRow]=useState(-1);
    const [selectedRowData,setSelectedRowData]=useState(null);
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
    const handleChangeInsertChair=(e)=>{
        setInsertChair(!insertChair);
    }
    const handleChangeEditable=(e)=>{
        setEditable(!editable);
    }

    const handleChangeIsEdited=(e)=>{
        setIsEdited(!isEdited);
    }
    
    const handleChangeSearchText = (event) => {
        let value=event.target.value.toLowerCase();
        setSearchText(value);
        const newData = originalData.filter((row) =>row.name.toLowerCase().indexOf(value) !== -1);
        setRows(newData);
    };
    const handleChangeSelectedRow=(value)=>{
        setSelectedRow(value);
    }
    const handleGoBack=(e)=>{
        setInsertChair(false);
        setIsEdited(false);
        setSelectedRow(-1);
        setSelectedRowData(null);
    }
    const dataColumnsName=["index","name","order","status"];

    
    const titles=[
        t(strings.index),
        t(strings.name),
        t(strings.order),
        t(strings.status),
    ]
    const changeData=(data)=>{
        let temp=[];
        data.map((a,index)=>{
            let status;
            if(a.is_deleted===false)
            {
                status=t(strings.active);
            }
            else
            {
                status=t(strings.inactive);
            }
            let newData=createData(a._id,a.name,a.order,status);
            temp=temp.concat(newData);

        })
        setRows(temp);
        setOriginalData(temp);
        setIsLoading(false);
    }
    const getChair=async()=>{
        const result=await ChairService.getChair();
        console.log("CHeck chair:",result);
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
        if(rows.length===0 && searchText===null)
        {
            
            getChair();
            getUser();
        }
        if(selectedRow!==-1)
        {
            if(selectedRowData!==rows[selectedRow] && isEdited===false)
            {
                handleChangeIsEdited();

                setSelectedRowData(rows[selectedRow])
            }
            
        }
        if(isInsert===true)
        {
            getChair();
            setIsInsert(false);
        }
        if(isUpdate===true)
        {
            getChair();
            setIsUpdate(false);
        }
    })
    return (
        <div className={classes.container}>
            
            <div >
                <Grid container>
                    <Grid item xs={8}>
                        <Typography className={classes.title} variant="h4">
                            {t(strings.chair)}
                        </Typography>
                    </Grid>
                    {insertChair===true || isEdited===true ?

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
                                <IconButton onClick={handleChangeInsertChair}>
                                    <AddBox />            
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
                    {insertChair===true && isEdited=== false ?
                        <InsertChair 
                                    handleChangeIsInsert={handleChangeIsInsert}
                        />
                        : isEdited===true &&selectedRowData!==null ?
                        <UpdateChair
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
                :
                <LoadingPage/>
                }
                
                
                
            </div>
            
        </div>
    )
}

export default Chairs;