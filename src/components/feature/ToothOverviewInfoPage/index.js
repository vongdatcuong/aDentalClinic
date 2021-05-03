import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

// @material-ui/core Component
import Container from "@material-ui/core/Container";
import styles from "./jss";
import strings from "../../../configs/strings";
// use i18next
import { useTranslation, Trans } from "react-i18next";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import TabPanel from "../../common/TabPanel";

// Component
import PopupChat from "../../common/Messenger/PopupChat";
import ToothOverviewInfoTab from "./ToothOverviewInfoTab/ToothOverviewInfoTab";
import AdultToothData from "../../common/ToothChart/AdultToothData";
import TreatmentMenu from '../../../layouts/TreatmentMenu';

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}
const useStyles = makeStyles(styles);

const ToothOverviewInfoPage = ({ patientID }) => {
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (  <React.Fragment>
    <TreatmentMenu patientID = { patientID }/>
    <div className={classes.container}>
      <PopupChat></PopupChat>
      <Grid container>
        <Grid item className={classes.tabsContainer}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            className={classes.tabs}
          >
            <Tab label="1" {...a11yProps(0)} />
            <Tab label="2" {...a11yProps(1)} />
            <Tab label="3" {...a11yProps(2)} />
            <Tab label="4" {...a11yProps(3)} />
            <Tab label="5" {...a11yProps(4)} />
            <Tab label="6" {...a11yProps(5)} />
            <Tab label="7" {...a11yProps(6)} />
            <Tab label="8" {...a11yProps(7)} />
            <Tab label="9" {...a11yProps(8)} />
            <Tab label="10" {...a11yProps(9)} />
            <Tab label="11" {...a11yProps(10)} />
            <Tab label="12" {...a11yProps(11)} />
            <Tab label="13" {...a11yProps(12)} />
            <Tab label="14" {...a11yProps(13)} />
            <Tab label="15" {...a11yProps(14)} />
            <Tab label="16" {...a11yProps(15)} />
            <Tab label="17" {...a11yProps(16)} />
            <Tab label="18" {...a11yProps(17)} />
            <Tab label="19" {...a11yProps(18)} />
            <Tab label="20" {...a11yProps(19)} />
            <Tab label="21" {...a11yProps(20)} />
            <Tab label="22" {...a11yProps(21)} />
            <Tab label="23" {...a11yProps(22)} />
            <Tab label="24" {...a11yProps(23)} />
            <Tab label="25" {...a11yProps(24)} />
            <Tab label="26" {...a11yProps(25)} />
            <Tab label="27" {...a11yProps(26)} />
            <Tab label="28" {...a11yProps(27)} />
            <Tab label="29" {...a11yProps(28)} />
            <Tab label="30" {...a11yProps(29)} />
            <Tab label="31" {...a11yProps(30)} />
            <Tab label="32" {...a11yProps(31)} />
          </Tabs>
        </Grid>
        <Grid item className={classes.toothInfoContainer}>
          {AdultToothData.adultToothList.upperJaw.concat(AdultToothData.adultToothList.lowerJaw).slice().map((tooth, index) => {
            return (
              <ToothOverviewInfoTab
                // jaw="upperJaw"
                // viewType={props.viewType}
                value={value}
                index={index}
                key={index}
                toothID={tooth.fullTooth.id}
                patientID={patientID}
                // onSelectTooth={props.onSelectTooth}
                toothSvgString={tooth.fullTooth.svgString}
              ></ToothOverviewInfoTab>
            );
          })}
        </Grid>
      </Grid>
    </div></React.Fragment>
  );
};

export default ToothOverviewInfoPage;
