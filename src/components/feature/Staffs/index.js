import React,{useState,useEffect} from 'react';
import { makeStyles  } from "@material-ui/core/styles";
//api
import StaffService from "../../../api/staff/staff.service";
import AuthService from "../../../api/authentication/auth.service";
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
 } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
// import FirstPageIcon from '@material-ui/icons/FirstPage';
// import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
// import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
// import LastPageIcon from '@material-ui/icons/LastPage';
// import PropTypes from 'prop-types';

import styles from "./jss";
// import darkTheme from "../../../themes/darkTheme";
// import { toast } from 'react-toastify';

//import configs
import strings from "../../../configs/strings";
//import image

//import icons
import SearchIcon from '@material-ui/icons/Search';
// import FilterList from '@material-ui/icons/FilterList';
import AddBox from '@material-ui/icons/AddBox';

//import component
import TableCustom from "../../common/TableCustom";
import InsertPerson from "../InsertPerson";
import UpdatePerson from "../UpdatePerson";
import LoadingPage from '../../../layouts/LoadingPage';

const useStyles = makeStyles(styles);
const createData=(id,fullname, email, phone, status)=>{
    return {id,fullname, email, phone, status};
};

const dataColumnsName=["index","fullname","email",
        "phone","status"];


const Staffs = () => {
    const {t, i18n } = useTranslation();

    const classes = useStyles();

    //state
    const [rows,setRows]=useState([]);

    const [insertPerson,setInsertPerson]=useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchText,setSearchText]=useState(null);
    const [editable,setEditable]=useState(false);
    const [isEdited,setIsEdited]=useState(false);
    const [selectedRow,setSelectedRow]=useState(-1);
    const [selectedRowData,setSelectedRowData]=useState(null);
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
    const handleChangeSelectedRow=(value)=>{
        setSelectedRow(value);
    }
    const handleChangeEditable=(e)=>{
        setEditable(!editable);
    }

    const handleChangeIsEdited=(e)=>{
        //console.log("Handle change edit");
        setIsEdited(!isEdited);
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
    const handleChangeInsertPerson=(e)=>{
        setInsertPerson(!insertPerson);
    }
    const handleGoBack=(e)=>{
        setInsertPerson(false);
        setIsEdited(false);
        setSelectedRow(-1);
        setSelectedRowData(null);
    }
    
    const changeData=(data)=>{
        let temp=[];
        data.map((a,index)=>{
            let status;
            if(a.is_active===true)
            {
                status=t(strings.active);

            }
            else
            {
                status=t(strings.inactive);
            }
            let newData=createData(a._id,a.user.first_name+" "+a.user.last_name,a.user.email,a.user.mobile_phone,status);
            temp=temp.concat(newData);

        })
        //console.log("Check rows in change data:",temp);
        setRows(temp);
    }
    const titles=[
        t(strings.index),
        t(strings.fullname),
        t(strings.email),
        t(strings.phone),
        t(strings.status),
    ];

    const getStaff=async()=>{
        const result=await StaffService.getStaff();
        //console.log("Get staff in useEffect:",result.data);
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
            
            getStaff();
            getUser();
            setIsLoading(false);
        }

        if(selectedRow!==-1)
        {
            if(selectedRowData!==rows[selectedRow] && isEdited===false)
            {
                handleChangeIsEdited();

                setSelectedRowData(rows[selectedRow])
                //console.log("Check selected row data:",rows[selectedRow]);
            }

        }
        if(isInsert)
        {
            getStaff();
            setIsInsert(false);
        }
        if(isUpdate)
        {
            getStaff();
            setIsUpdate(false);
        }
    })
    return (
        <div className={classes.container} >
            
            <div className={classes.content}>
                <Grid container>
                    <Grid item xs={8}>
                        <Typography className={classes.title} variant="h4">
                            {t(strings.staffs)}
                        </Typography>
                    </Grid>
                    {insertPerson===true || isEdited===true ?

                        <Grid item xs={4} >
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
                                <IconButton onClick={handleChangeInsertPerson}>
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
                    {insertPerson===true && isEdited=== false ?
                        <InsertPerson staffType={t(strings.staffTypeStaff)}
                                        userType={t(strings.userTypeStaff)}
                                        handleChangeIsInsert={handleChangeIsInsert}

                        />
                        : isEdited===true &&selectedRowData!==null ?
                        <UpdatePerson  id={selectedRowData.id}
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

export default Staffs;