import React,{useState,useEffect} from 'react';
import { makeStyles  } from "@material-ui/core/styles";
import {
    useParams,
    useHistory
  } from "react-router-dom";

//translation
import { useTranslation } from 'react-i18next';

// @material-ui/core Component
import { 
    Tabs,
    Tab,

 } from '@material-ui/core';


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

//import route
import routePaths from '../../../routes/path';

//import components

import Authentication from "../Authentication";
import Chair from "../Chair";
import Drug from "../Drug";
import Procedure from "../Procedure";
import Providers from "../Providers";
import Referral from "../Referral";
import Schedule from "../Schedule";
import Staffs from "../Staffs";
import Practice from "../Practice";
import Template from "../Template"; 
import TabPanel from "../../../layouts/TabPanel";
import Footer from "../../../layouts/Footer";

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