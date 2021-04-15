import React,{useEffect, useState} from 'react';
import { makeStyles, useTheme  } from "@material-ui/core/styles";
//api
import {secretKey, initializeAPIService, httpPost,httpGet} from '../../../api/base-api';
import apiPath from '../../../api/path';
import ProviderService from "../../../api/provider/provider.service";
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

//import component
import TableCustom from "../../common/TableCustom";
import InsertPerson from "../InsertPerson";
import UpdatePerson from "../UpdatePerson";
const useStyles = makeStyles(styles);



const Providers = () => {
    const {t, i18n } = useTranslation();
    const classes = useStyles();
    //
    const createData=(id,fullname, email, phone, status)=>{
        return {id,fullname, email, phone, status};
    };
    
    const dataColumnsName=["index","fullname","email",
        "phone","status"];
    const titles=[
        t(strings.index),
        t(strings.fullname),
        t(strings.email),
        t(strings.phone),
        t(strings.status),
    ];
    
    //state
    const [insertPerson,setInsertPerson]=useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchText,setSearchText]=useState(null);
    const [rows,setRows]=useState([]);
    const [editable,setEditable]=useState(false);
    const [isEdited,setIsEdited]=useState(false);
    const [selectedRow,setSelectedRow]=useState(-1);
    const [selectedRowData,setSelectedRowData]=useState(null);
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    
    const handleChangeSelectedRow=(value)=>{
        setSelectedRow(value);
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

    const handleChangeEditable=(e)=>{
        setEditable(!editable);
    }

    const handleChangeIsEdited=(e)=>{
        console.log("Handle change edit");
        setIsEdited(!isEdited);
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
        console.log("Check rows in change data:",temp);
        setRows(temp);
    }
    useEffect(()=>{
        
        if(rows.length===0)
        {
            const getProvider=async()=>{
                const result=await ProviderService.getProvider();
                console.log("Get provider in useEffect:",result.data);
                if(result.success)
                {
                    changeData(result.data);
    
                }
            };
            getProvider();
            
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
            
            <div className={classes.content}>
                <Grid container>
                    <Grid item xs={8}>
                        <Typography className={classes.title} variant="h4">
                            {t(strings.providers)}
                        </Typography>
                    </Grid>
                    {insertPerson===true || isEdited===true ?

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
                            <IconButton onClick={handleChangeInsertPerson}>
                                <AddBox />            

                            </IconButton>
                        </Grid>
                    
                    }

                </Grid>

                <Divider className={classes.titleDivider}/>

                    
                    
                
                <Container style={{marginLeft:"10px"}}>
                    {insertPerson===true && isEdited=== false ?
                        <InsertPerson 
                                        staffType={t(strings.staffTypeProvider)}
                                        userType={t(strings.userTypePatient)}
                        />
                        : isEdited===true &&selectedRowData!==null ?
                        <UpdatePerson 
                                        id={selectedRowData.id}
                                        // last_name={selectedRowData.last_name}
                                        // username={selectedRowData.username}
                                        // password={selectedRowData.password}
                                        // facebook={selectedRowData.facebook}
                                        // fax={selectedRowData.fax}
                                        // mobile_phone={selectedRowData.mobile_phone}
                                        // home_phone={selectedRowData.home_phone}
                                        // staff_photo={selectedRowData.staff_photo}
                                        // email={selectedRowData.email}
                                        // address={selectedRowData.address}
                                        
                                        // is_active={selectedRowData.is_active}

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

export default Providers;