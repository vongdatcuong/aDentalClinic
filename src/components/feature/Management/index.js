import React,{useState,useEffect} from 'react';
import { makeStyles, useTheme  } from "@material-ui/core/styles";
import {
    useParams,
    useHistory
  } from "react-router-dom";

//translation
import { useTranslation, Trans } from 'react-i18next';

// @material-ui/core Component
import Container from '@material-ui/core/Container';
import { Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TablePagination,
    TableRow,
    TableHead,
    Paper,
    TextField,
    InputLabel ,
    InputAdornment,
    FormControl,
    FilledInput,
    OutlinedInput,
    Tabs,
    Tab,

 } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';


import styles from "./jss";
//import configs
import strings from "../../../configs/strings";
//import image
import DentalProvider from "../../../assets/images/dentalProvider.png";
import DentalPractice from "../../../assets/images/dentalPractice.png";
import DentalStaff from "../../../assets/images/dentalStaff.png";
import DentalProcedure from "../../../assets/images/dentalProcedure.png";
import DentalChair from "../../../assets/images/dentalChair.png";
import DentalReferral from "../../../assets/images/dentalReferral.png";
import DentalSchedule from "../../../assets/images/calendar.png";
import AuthenticationImage from "../../../assets/images/authentication.png";
import TemplatesImage from "../../../assets/images/templates.png";
import DrugImage from "../../../assets/images/drug.png";
import PortalImage from "../../../assets/images/portal.png";
//import icons
import SearchIcon from '@material-ui/icons/Search';
import FilterList from '@material-ui/icons/FilterList';
import AddBox from '@material-ui/icons/AddBox';

//import route
import routePaths from '../../../routes/path';

//import components

import Authentication from "../Authentication";
import Chair from "../Chair";
import Drug from "../Drug";
import Portal from "../Portal";
import Procedure from "../Procedure";
import Providers from "../Providers";
import Referral from "../Referral";
import Schedule from "../Schedule";
import Staffs from "../Staffs";
import Practice from "../Practice";
import Template from "../Template"; 
import TabPanel from "../../../layouts/TabPanel";
import Footer from "../../../layouts/Footer";
import InsertPerson from "../InsertPerson";

const useStyles = makeStyles(styles);
function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const Management = () => {
    const classes = useStyles();
    const {t, i18n } = useTranslation();
    const history = useHistory();
    const { management } = useParams();

    const managements = ["providers", "staffs", "schedule", "procedure", "chairs", "referral",
                      "practices","authentication",
                      "templates","drug"];
    let curManagement = managements.indexOf(management);
    if (curManagement == -1){
      history.push(routePaths.managementsPath + "/providers");
      curManagement = 0;
    }
    //states
    const [value, setValue] = useState(curManagement);
    const handleChange = (event, newValue) => {
        
        history.push(routePaths.managementsPath + "/" + managements[newValue]);

        setValue(newValue);
    };
    useEffect(() => {
      if (!management){
        history.push(routePaths.managementsPath + "/providers");
      }
    })

    
    
    const tabs = [t(strings.providers), 
        t(strings.staffs), 
        t(strings.schedule), 
        t(strings.procedure), 
        t(strings.chairs), 
        t(strings.referral),
        t(strings.practices),
        t(strings.authentication),
        t(strings.templates),
        t(strings.drug),
        //t(strings.portal),
      ];
    const srcs=[
        DentalProvider,
        DentalStaff,
        DentalSchedule,
        DentalProcedure,
        DentalChair,
        DentalReferral,
        DentalPractice,
        AuthenticationImage,
        TemplatesImage,
        DrugImage,
        //PortalImage,
    ];
    const tablePanels=[
        <Providers />,
        <Staffs />,
        <Schedule />,
        <Procedure />,
        <Chair/>,
        <Referral />,
        <Practice/>,
        <Authentication/>,
        <Template/>,
        <Drug />,
        //<Portal/>,
    ];
    return (
        <div className={classes.container}>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
            >
            {(tabs.map((tab, index) => {
                        return <Tab key={index} className={classes.tab} label={tab} {...a11yProps(index)} 
                                icon={<img src={srcs[index]} className={classes.menuItemImage}/>}   />
                                        
                                
                    }))}
          
        </Tabs>
        {(tablePanels).map((tPanel, index) => {
                  return <TabPanel key={index} value={value} index={index}>
                            {tPanel}
                        </TabPanel>
        })}
        <Footer/>
        </div>
    )
}

export default Management;