import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from 'clsx';

// @material-ui/core Component
import Container from "@material-ui/core/Container";
import styles from "./jss";
import strings from "../../../../configs/strings";
// use i18next
import { useTranslation, Trans } from "react-i18next";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Autorenew from "@material-ui/icons/Autorenew";
import AcUnit from "@material-ui/icons/AcUnit";
import { FaHammer, FaHandPaper, FaFireAlt } from "react-icons/fa";
import { AiFillThunderbolt } from "react-icons/ai";

// Component
import PopupChat from "../../../common/Messenger/PopupChat";
import TabPanel from "../../../common/TabPanel";

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const EndodonticItem = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.endodonticItem}>
      <span className={classes.endodonticTestIcon}>{props.icon}</span>
      <span className={classes.endodonticTestName}>{props.testName}</span>
      <span className={classes.endodonticTestStatus}>
        <span>{props.testStatus}</span>
        <span>
          <ChevronRightIcon></ChevronRightIcon>
        </span>
      </span>
    </div>
  );
};

const useStyles = makeStyles(styles);
const ToothOverviewInfoTab = (props) => {
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const endodonticList = [
    {
      testName: t(strings.cold),
      icon: <AcUnit></AcUnit>,
      testStatus: t(strings.existRootCanalTreatment),
    },
    {
      testName: t(strings.percussion),
      icon: <FaHammer></FaHammer>,
      testStatus: t(strings.test),
    },
    {
      testName: t(strings.palpation),
      icon: <FaHandPaper></FaHandPaper>,
      testStatus: t(strings.test),
    },
    {
      testName: t(strings.heat),
      icon: <FaFireAlt></FaFireAlt>,
      testStatus: t(strings.test),
    },
    {
      testName: t(strings.electricity),
      icon: <AiFillThunderbolt></AiFillThunderbolt>,
      testStatus: t(strings.test),
    },
  ];
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <TabPanel
      value={props.value}
      index={props.index}
      className={classes.toothTabContainer}
    >
      <Grid container>
        <Grid item xs={2} sm={2} md={2} className={classes.toothImgContainer}>
          {props.toothSvgString}
        </Grid>
        <Grid
          container
          xs={10}
          sm={10}
          md={10}
          className={classes.toothInfoContainer}
        >
          <Grid item direction={"row"} className={classes.dentalContainer}>
            <Grid item className={classes.dentalHeaderContainer}>
              {t(strings.dental)}
              <span className={classes.dentalButtonsContainer}>
                <Button simple>
                  <Autorenew></Autorenew>
                  {t(strings.reset)}
                </Button>
                <Button simple>
                  <AddCircleOutlineIcon></AddCircleOutlineIcon>
                  {t(strings.missing)}
                </Button>
                <Button simple>
                  <AddCircleOutlineIcon></AddCircleOutlineIcon>
                  {t(strings.pathology)}
                </Button>
                <Button simple>
                  <AddCircleOutlineIcon></AddCircleOutlineIcon>
                  {t(strings.restoration)}
                </Button>
              </span>
            </Grid>
            <Grid item className={classes.dentalBodyContainer}>
              <div className="blankMessage">
                {t(strings.noTreatmentsPending)}
              </div>
            </Grid>
          </Grid>
          <Grid container direction={"row"} className={classes.bottomContainer}>
            <Grid
              item
              xs={6}
              sm={6}
              md={6}
              className={classes.endodonticContainer}
            >
              <div className={classes.endodonticTitle}>
                {t(strings.endodontic)}
              </div>
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
              >
                {endodonticList.map((endodonticItem, index) => {
                  return (
                    <Tab
                      label=<EndodonticItem
                        icon={endodonticItem.icon}
                        testName={endodonticItem.testName}
                        testStatus={endodonticItem.testStatus}
                      />
                      {...a11yProps(index)}
                    />
                  );
                })}
                ;
              </Tabs>
            </Grid>
            <Grid item xs={6} sm={6} md={6} className={clsx(classes.testContainer, value===0 ? classes.coldTestContainer : value===1 ? classes.percussionTestContainer : value===2 ? classes.palpationTestContainer : value===3 ? classes.heatTestContainer : classes.electricityTestContainer)}>
              <TabPanel value={value} index={0}>
                <div className={classes.testTitle}>
                    <div>{t(strings.cold)} {t(strings.test)}</div>
                    <div>
                        <div><Button variant="contained" size="large" className={classes.testBtns}>
                        {t(strings.positive)}
                        </Button></div>
                        <div><Button variant="contained" size="large" className={classes.testBtns}>
                        {t(strings.uncertain)}
                        </Button></div>
                        <div><Button variant="contained" size="large" className={classes.testBtns}>
                        {t(strings.negative)}
                        </Button></div>
                        <div><Button variant="contained" size="large" className={classes.testBtns}>
                        {t(strings.notApplicable)}
                        </Button></div>
                        <div><Button size="large" className={classes.clearBtn}>
                        {t(strings.clear)}
                        </Button></div>
                    </div>
                </div>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <div className={classes.testTitle}>
                  {t(strings.percussion)} {t(strings.test)}
                  <div>
                        <div><Button variant="contained" size="large" className={classes.testBtns}>
                        {t(strings.positive)}
                        </Button></div>
                        <div><Button variant="contained" size="large" className={classes.testBtns}>
                        {t(strings.uncertain)}
                        </Button></div>
                        <div><Button variant="contained" size="large" className={classes.testBtns}>
                        {t(strings.negative)}
                        </Button></div>
                        <div><Button variant="contained" size="large" className={classes.testBtns}>
                        {t(strings.notApplicable)}
                        </Button></div>
                        <div><Button size="large" className={classes.clearBtn}>
                        {t(strings.clear)}
                        </Button></div>
                    </div>
                </div>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <div className={classes.testTitle}>
                  {t(strings.palpation)} {t(strings.test)}
                  <div>
                        <div><Button variant="contained" size="large" className={classes.testBtns}>
                        {t(strings.positive)}
                        </Button></div>
                        <div><Button variant="contained" size="large" className={classes.testBtns}>
                        {t(strings.uncertain)}
                        </Button></div>
                        <div><Button variant="contained" size="large" className={classes.testBtns}>
                        {t(strings.negative)}
                        </Button></div>
                        <div><Button variant="contained" size="large" className={classes.testBtns}>
                        {t(strings.notApplicable)}
                        </Button></div>
                        <div><Button size="large" className={classes.clearBtn}>
                        {t(strings.clear)}
                        </Button></div>
                    </div>
                </div>
              </TabPanel>
              <TabPanel value={value} index={3}>
                <div className={classes.testTitle}>
                  {t(strings.heat)} {t(strings.test)}
                  <div>
                        <div><Button variant="contained" size="large" className={classes.testBtns}>
                        {t(strings.positive)}
                        </Button></div>
                        <div><Button variant="contained" size="large" className={classes.testBtns}>
                        {t(strings.uncertain)}
                        </Button></div>
                        <div><Button variant="contained" size="large" className={classes.testBtns}>
                        {t(strings.negative)}
                        </Button></div>
                        <div><Button variant="contained" size="large" className={classes.testBtns}>
                        {t(strings.notApplicable)}
                        </Button></div>
                        <div><Button size="large" className={classes.clearBtn}>
                        {t(strings.clear)}
                        </Button></div>
                    </div>
                </div>
              </TabPanel>
              <TabPanel value={value} index={4}>
                <div className={classes.testTitle}>
                  {t(strings.electricity)} {t(strings.test)}
                  <div>
                        <div><Button variant="contained" size="large" className={classes.testBtns}>
                        {t(strings.positive)}
                        </Button></div>
                        <div><Button variant="contained" size="large" className={classes.testBtns}>
                        {t(strings.uncertain)}
                        </Button></div>
                        <div><Button variant="contained" size="large" className={classes.testBtns}>
                        {t(strings.negative)}
                        </Button></div>
                        <div><Button variant="contained" size="large" className={classes.testBtns}>
                        {t(strings.notApplicable)}
                        </Button></div>
                        <div><Button size="large" className={classes.clearBtn}>
                        {t(strings.clear)}
                        </Button></div>
                    </div>
                </div>
              </TabPanel>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </TabPanel>
  );
};

export default ToothOverviewInfoTab;
