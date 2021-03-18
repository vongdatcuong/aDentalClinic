import React,{useEffect,useState} from 'react';
import {
  useParams,
  useHistory
} from "react-router-dom";
import routePaths from '../../routes/path';

import { makeStyles, useTheme  } from "@material-ui/core/styles";
import { NavLink, withRouter } from "react-router-dom";
import ScrollMenu from 'react-horizontal-scrolling-menu';
//translation
import { useTranslation, Trans } from 'react-i18next';

// @material-ui/core Component
import Container from '@material-ui/core/Container';
import { Typography,
    Grid,
    AppBar,
    Tabs,
    Tab,
    Link 
} from '@material-ui/core';

//import image
import DentalProvider from "../../assets/images/dentalProvider.png";
import DentalPractice from "../../assets/images/dentalPractice.png";
import DentalStaff from "../../assets/images/dentalStaff.png";
import DentalProcedure from "../../assets/images/dentalProcedure.png";
import DentalChair from "../../assets/images/dentalChair.png";
import DentalReferral from "../../assets/images/dentalReferral.png";
import DentalSchedule from "../../assets/images/calendar.png";
import Authentication from "../../assets/images/authentication.png";
import Document from "../../assets/images/document.png";
import Templates from "../../assets/images/templates.png";
import Drug from "../../assets/images/drug.png";
import Portal from "../../assets/images/portal.png";

import MenuBarItem from "./MenuBarItem";
import darkTheme from "../../themes/darkTheme";
import strings from "../../configs/strings";
//import components
import Arrow from "./Arrow";
import styles from "./jss";
import TabPanel from "./TabPanel";
// import Providers from "../../components/feature/Providers";
// import Staffs from "../../components/feature/Staffs";
// import Schedule from "../../components/feature/Schedule";
// import Procedure from "../../components/feature/Procedure";
// import Chairs from "../../components/feature/Chair";
// import Referral from "../../components/feature/Referral";
// import Practices from "../../components/feature/Practice";
// import Authentication from "../../components/feature/Authentication";
// import Templates from "../../components/feature/Template";
// import Drug from "../../components/feature/Drug";
// import Portal from "../../components/feature/Portal";

const useStyles = makeStyles(styles);

const renderMenu = (list) =>
  list.map( (item,index) => {
    

    return <MenuBarItem name={item.name} index={index} path={item.path} src={item.src}/>;
});
function a11yProps(index) {
    return {
      id: `scrollable-force-tab-${index}`,
      'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
}

const MenuBar=()=>{
    const {t, i18n } = useTranslation();
    const classes = useStyles();
    
    const ArrowLeft = Arrow({ text: '<', className: classes.arrowLeft });
    const ArrowRight = Arrow({ text: '>', className: classes.arrowRight });
    // const history = useHistory();
    // const { management } = useParams();

    // useEffect(() => {
    //   if (!management){
    //     history.push(routePaths.managements + "/providers");
    //   }
    // })
    // const managements = ["providers", "staffs", "schedule", "procedure", "chairs", "referral",
    //                   "practices","authentication",
    //                   "templates","drug","portal"];

    // let curManagement = managements.indexOf(management);
    // if (curManagement == -1){
    //   history.push(routePaths.managementsPath + "/providers");
    //   curManagement = 0;
    // }

    //state
    // const [value, setValue] = useState(0);
    // const [tabValue, setTabValue] = useState(curManagement);
    // const handleChangeTab = (event, newValue) => {
    //   history.push(routePaths.managementsPath + "/" + managements[newValue]);
    //   setTabValue(newValue);
    // };
    // const handleChange = (event, newValue) => {
    //   setValue(newValue);
    // };
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
                  t(strings.portal)];
    // const tablePanels = [
    //   <Providers/>,
    //   <Staffs/>,
    //   <Schedule/>,
    //   <Procedure/>,
    //   <Chairs/>,
    //   <Referral/>,
    //   <Practices/>,
    //   <Authentication/>,
    //   <Templates/>,
    //   <Drug/>,
    //   <Portal/>,
      
    // ]
    const list=[
        {name:t(strings.providers),path:'/providers',src:DentalProvider,index:0},
        {name:t(strings.staffs),path:'/staffs',src:DentalStaff,index:1},
        {name:t(strings.schedule),path:'/schedule',src:DentalSchedule,index:2},
        {name:t(strings.procedure),path:'/procedure',src:DentalProcedure,index:3},
        {name:t(strings.chairs),path:'/chairs',src:DentalChair,index:4},
        {name:t(strings.referral),path:'/referral',src:DentalReferral,index:5},
        {name:t(strings.practices),path:'/practices',src:DentalPractice,index:6},
        {name:t(strings.authentication),path:'/authentication',src:Authentication,index:7},
        {name:t(strings.templates),path:'/templates',src:Templates,index:8},
        {name:t(strings.drug),path:'/drug',src:Drug,index:9},
        {name:t(strings.portal),path:'/portal',src:Portal,index:10},
    ]
        

    // ]
    // const itemOne=()=>{
    //     return <MenuBarItem name={t(strings.providers)} index={1} path='/providers' src={DentalProvider}/>;
    // }
    // const itemTwo=()=>{
    //     return <MenuBarItem name={t(strings.staffs)} index={2} path='/staffs' src={DentalStaff}/>;
    // }
    // const itemFour=()=>{
    //     return <MenuBarItem name={t(strings.procedure)} index={4} path='/procedure' src={DentalProcedure}/>;
    // }
    const menuItems=renderMenu(list);
    return(
        <div className={classes.container}>
                
               
       
                <ScrollMenu
                    data={menuItems}    
                    // arrowLeft={ArrowLeft}
                    // arrowRight={ArrowRight}

                >

                </ScrollMenu>
        </div>
            
    )
}

export default withRouter(MenuBar);