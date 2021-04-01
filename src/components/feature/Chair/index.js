import React,{useState} from 'react';
import { makeStyles, useTheme  } from "@material-ui/core/styles";
//translation
import { useTranslation, Trans } from 'react-i18next';

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
const useStyles = makeStyles(styles);
const createData=(id,provider,number,room,description)=>{
    return {id,provider,number,room,description};
};


const Chairs = () => {
    const {t, i18n } = useTranslation();

    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchText,setSearchText]=useState(null);
    const [editable,setEditable]=useState(false);
    const [isEdited,setIsEdited]=useState(false);

    const rows = [
        createData('1712320', "Dat", "3", "1", "HCM sadfasdf ads fsda fasd fads fasd fa asd asdas das dasdasdasdasdsadasdsadasdasdas"),
        createData('1712321', "Doan", "4", "1", "HCM"),
        createData('1712322', "Thai", "5", "1", "HCM"),
        createData('1712323', "Dan", "6", "1", "HCM"),
        createData('1712324', "Cuong", "11", "1", "HCM"),
        createData('1712325', "Vong", "13", "1", "HCM"),
        createData('1712326', "Hung", "22", "1", "HCM"),
        createData('1712327', "The", "333", "1", "HCM"),
        createData('1712328', "Anh", "11", "2", "HCM"),
        createData('1712329', "Nguyen", "222", "3", "HCM"),
        createData('1712330', "Tang", "333", "33", "HCM"),
        createData('1712331', "Vu", "11", "44", "HCM"),


    ];
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    
    const handleChangeEditable=(e)=>{
        setEditable(!editable);
    }

    const handleChangeIsEdited=(e)=>{
        console.log("Handle change edit");
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

    const dataColumnsName=["index","id","provider","number","room","description"];

    
    const titles=[
        t(strings.index),
        t(strings.id),
        t(strings.provider),
        t(strings.number),
        t(strings.room),
        t(strings.description),
    ]
    return (
        <div className={classes.container}>
            
            <div >
                <Grid container>
                    <Grid item xs={8}>
                        <Typography className={classes.title} variant="h4">
                            {t(strings.chair)}
                        </Typography>
                    </Grid>
                    <Grid item xs={4} className={classes.serviceControl}>
                        <FormControl variant="filled">

                            <OutlinedInput
                                className={classes.searchControl}
                                id="outlined-adornment-password"
                                type={'text'}
                                placeholder={t(strings.search)}
                                value={searchText}
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
                        <IconButton >
                            <AddBox />            

                        </IconButton>
                    </Grid>
                    
                    
                </Grid>
                <Divider className={classes.titleDivider}/>
                <Container style={{marginLeft:"10px"}}>
                    
                    <TableCustom titles={titles}
                                data={rows}
                                dataColumnsName={dataColumnsName}
                                editable={editable}
                                changeToEditPage={false}

                                />
               
                </Container>
                
                
            </div>
            
        </div>
    )
}

export default Chairs;