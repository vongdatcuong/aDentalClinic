import React,{useState} from 'react';
import { makeStyles, useTheme  } from "@material-ui/core/styles";
//translation
import { useTranslation, Trans } from 'react-i18next';

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

const useStyles = makeStyles(styles);
const createData=(id,fullname,role,gender,address,status)=>{
    return {id,fullname,role,gender,address,status};
};
const dataColumnsName=["index","id","fullname","role","gender","address","status"];
const rows = [
    createData('1712320', "Dat", "Admin", "Male", "HCM sadfasdf ads fsda fasd fads fasd fa asd asdas das dasdasdasdasdsadasdsadasdasdas","Active"),
    createData('1712321', "Doan", "Customer", "Male", "HCM","Active"),
    createData('1712322', "Thai", "Customer", "Male", "HCM","Inactive"),
    createData('1712323', "Dan", "Customer", "Male", "HCM","Active"),
    createData('1712324', "Cuong", "Customer", "Male", "HCM","Active"),
    createData('1712325', "Vong", "Customer", "Male", "HCM","Active"),
    createData('1712326', "Hung", "Customer", "Male", "HCM","Active"),
    createData('1712327', "The", "Customer", "Male", "HCM","Active"),
    createData('1712328', "Anh", "Customer", "Male", "HCM","Active"),
    createData('1712329', "Nguyen", "Customer", "Female", "HCM","Active"),
    createData('1712330', "TangsadasdsadlsakdlaskjdlkasjlkdjaskldjaskljdlkasjdlksajkdlasjTangsadasdsadlsakdlaskjdlkasjlkdjaskldjaskljdlkasjdlksajkdlasjTangsadasdsadlsakdlaskjdlkasjlkdjaskldjaskljdlkasjdlksajkdlasjTangsadasdsadlsakdlaskjdlkasjlkdjaskldjaskljdlkasjdlksajkdlasj", "Customer", "Female", "HCM","Active"),
    createData('1712331', "Vu asdsa das dasd sad sad sad asd asd asd asdsadas das  asd asdsa dasd as", "Customer", "Female", "HCM","Active"),


];


const Authentication = () => {
    const {t, i18n } = useTranslation();
    
    const classes = useStyles();

    

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchText,setSearchText]=useState(null);
    const [editable,setEditable]=useState(false);
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    
    const handleChangeEditable=(e)=>{
        setEditable(e.target.value);
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

    
    const titles=[
        t(strings.index),
        t(strings.id),
        t(strings.fullname),
        t(strings.role),
        t(strings.gender),
        t(strings.address),
        t(strings.status),
    ]

    return (
        <div className={classes.container}>
            
            <div >
                <Grid container>
                    <Grid item xs={8}>
                        <Typography className={classes.title} variant="h4">
                            {t(strings.authentication)}
                        </Typography>
                    </Grid>
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
                            
                                <MenuItem value={true}>{t(strings.read)}</MenuItem>
                                <MenuItem value={false}>{t(strings.edit)}</MenuItem>

                            </Select>
                        
                        <IconButton >
                            <AddBox className={classes.btnAddBox}/>             

                        </IconButton>
                    </Grid>
                    
                    
                </Grid>
                <Divider className={classes.titleDivider}/>

                <Container style={{marginLeft:"10px"}}>
                
                
                    <TableCustom titles={titles} data={rows} dataColumnsName={dataColumnsName} editable={editable}/>
        
                </Container>
                
                
            </div>
            
        </div>
    )
}

export default Authentication;