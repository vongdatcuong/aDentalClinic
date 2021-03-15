import React, {useState, useEffect} from 'react';
import {
  useParams,
  useHistory
} from "react-router-dom";
import { makeStyles, useTheme  } from "@material-ui/core/styles";
import styles from "./jss";
import strings from '../../../configs/strings';
import routePaths from '../../../routes/path';
// use i18next
import { useTranslation } from 'react-i18next';

// @material-ui/core Component
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

// Component
import General from './General';
import Account from './Account';
import Password from './Password';
import TermPrivacy from './TermPrivacy';
import Notifications from './Notifications';
import Location from './Location';

const useStyles = makeStyles(styles);

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box px={4} style={{height: '100%'}}>
            {children}
          </Box>
        )}
      </div>
    );
}

const a11yProps = (index) => {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}


const Settings = () => {
    const classes = useStyles();
    const {t, i18n } = useTranslation();
    const history = useHistory();
    const { section } = useParams();

    useEffect(() => {
      if (!section){
        history.push(routePaths.settingsPath + "/general");
      }
    })

    const sections = ["general", "account", "password", "termPrivacy", "notifications", "location"];
    let curSection = sections.indexOf(section);
    if (curSection == -1){
      history.push(routePaths.settingsPath + "/general");
      curSection = 0;
    }

    // States
    const [tabValue, setTabValue] = useState(curSection);

    const handleChangeTab = (event, newValue) => {
      history.push(routePaths.settingsPath + "/" + sections[newValue]);
      setTabValue(newValue);
    };

    const tabs = [t(strings.general), t(strings.account), t(strings.password), t(strings.termPolicy), t(strings.notifications), t(strings.location)];
    const tablePanels = [
      <General/>,
      <Account/>,
      <Password/>,
      <TermPrivacy/>,
      <Notifications/>,
      <Location/>,
    ]

    return (
        <Container className={classes.container}>
            <Typography className={classes.title} variant="h5" component="h5">{t(strings.settings)}</Typography>
            <Grid className={classes.tabsWrapper}>
              <Grid item md={3} sm={4} xs={5}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={tabValue}
                    onChange={(evt) => handleChangeTab}
                    aria-label="Vertical tabs settings"
                    className={classes.tabs}
                >
                    {(tabs.map((tab, index) => {
                        return <Tab key={index} className={classes.tab} label={tab} {...a11yProps(index)}/>
                    }))}
                </Tabs>
              </Grid>
              <Grid item md={9} sm={8} xs={7}>
                {(tablePanels).map((tPanel, index) => {
                  return <TabPanel key={index} value={tabValue} index={index}>
                            {tPanel}
                        </TabPanel>
                })}
              </Grid>
            </Grid>
        </Container>
    )
}

export default Settings;