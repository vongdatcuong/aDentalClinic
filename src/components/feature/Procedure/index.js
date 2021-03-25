import React,{useState} from 'react';
import { makeStyles, useTheme  } from "@material-ui/core/styles";
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
import InsertProcedure from "../InsertProcedure";

const useStyles = makeStyles(styles);
const createData=(code,fee,ins,duration,type,abbr,description)=>{
    return {code,fee,ins,duration,type,abbr,description};
};
const dataColumnsName=["index","code","fee","ins","duration","type","abbr","description"];
const rows = [
    createData('1712320', "1000", "ins asdasd asd asdas dsa das dasd asdsa", "30", "1","ABBR","Description Description"),
    createData('1712321', "2000", "ins", "40", "1","ABBR","Description"),
    createData('1712322', "3000", "ins", "50", "1","ABBR","Description"),
    createData('1712323', "4000", "ins", "60", "1","ABBR","Description"),
    createData('1712324', "5000", "ins", "70", "1","ABBR","Description"),
    createData('1712325', "6000", "ins", "80", "1","ABBR","Description"),
    createData('1712326', "7000", "ins", "90", "1","ABBR","Description"),
    createData('1712327', "8000", "ins", "11", "1","ABBR","Description"),
    createData('1712328', "9000", "ins", "33", "1","ABBR","Description"),
    createData('1712329', "10000", "ins", "22", "1","ABBR","Description"),
    createData('1712330', "11100", "ins", "1111", "1","ABBR","Description"),
    createData('1712331', "12200", "ins", "99", "1","ABBR","Description"),


];

const Procedure = () => {
    const classes = useStyles();
    const {t, i18n } = useTranslation();

    //state
    const [insertProcedure,setInsertProcedure]=useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchText,setSearchText]=useState(null);
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    
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
    
    const handleChangeInsertProcedure=(e)=>{
        setInsertProcedure(!insertProcedure);
    }
    const titles=[
        t(strings.index),
        t(strings.code),
        t(strings.fee),
        t(strings.ins),
        t(strings.duration),
        t(strings.type),
        t(strings.abbr),
        t(strings.description),
    ];
    return (
        <div className={classes.container}>            
            <div className={classes.content}>
                <Grid container>
                    <Grid item xs={8}>
                        <Typography className={classes.title} variant="h4">
                            {t(strings.procedure)}
                        </Typography>
                    </Grid>
                    {insertProcedure===false ?
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
                            <IconButton  >
                                <FilterList />

                            </IconButton>
                            <IconButton onClick={handleChangeInsertProcedure}>
                                <AddBox />            

                            </IconButton>
                        </Grid>
                
                        :
                        <Grid item xs={4} className={classes.serviceControl}>
                            <Typography variant="h6" onClick={handleChangeInsertProcedure} className={classes.goBack}>
                                {t(strings.goBack)}
                            </Typography>
                        </Grid>
                    }
                    
                </Grid>
                <Divider className={classes.titleDivider}/>
                <Container >
                    {insertProcedure===false ?
                        <TableCustom titles={titles} dataColumnsName={dataColumnsName} data={rows}/>
                        :
                        <InsertProcedure />
                    }
                </Container>
                
                
            </div>
            
        </div>
    )
}

export default Procedure;