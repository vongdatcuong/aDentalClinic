import React,{useState,useEffect} from 'react';
import { makeStyles  } from "@material-ui/core/styles";
//api
import AuthService from "../../../api/authentication/auth.service";
import ProcedureService from "../../../api/procedure/procedure.service";
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
    MenuItem
 } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

import styles from "./jss";
//import configs
import strings from "../../../configs/strings";
//import image

//import icons
import SearchIcon from '@material-ui/icons/Search';
// import FilterList from '@material-ui/icons/FilterList';
import AddBox from '@material-ui/icons/AddBox';

//import component
import TableCustom from "../../common/TableCustom";
import InsertProcedure from "../InsertProcedure";
import UpdateProcedure from "../UpdateProcedure";
import LoadingPage from '../../../layouts/LoadingPage';
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
    
    const [searchText,setSearchText]=useState(null);
    const [editable,setEditable]=useState(false);
    const [isEdited,setIsEdited]=useState(false);
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
        t(strings.toothSelect),
        t(strings.toothType),
    ];
    const changeData=(data)=>{
        let temp=[];
        data.map((a,index)=>{
            
            let newData=createData(a._id,a.abbreviation,a.code,a.description,a.tooth_select,a.tooth_type);
            temp=temp.concat(newData);
            
        })
        setRows(temp);
       
    }
    const getProcedure=async()=>{
        const result=await ProcedureService.getProcedure();
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
            
            getProcedure();
            getUser();
            setIsLoading(false);
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
                                <IconButton onClick={handleChangeInsertProcedure}>
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
                :
                <LoadingPage/>
                }
                
                
            </div>
            
        </div>
    )
}

export default Procedure;