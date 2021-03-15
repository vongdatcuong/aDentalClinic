import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

// @material-ui/core Component
import Container from "@material-ui/core/Container";
import styles from "./jss";
import strings from "../../../configs/strings";
import logoADC from "../../../assets/images/logoADC.png";
// use i18next
import { useTranslation, Trans } from "react-i18next";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";
import CustomInput from "../../common/CustomInput/CustomInput.js";
import People from "@material-ui/icons/People";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import AccountBox from "@material-ui/icons/AccountBox";
import Lock from "@material-ui/icons/Lock";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

// Component
import PopupChat from "../../common/Messenger/PopupChat";
import TabPanel from "../../common/TabPanel";
import NavPills from "../../common/NavPills/NavPills.js";

const useStyles = makeStyles(styles);

const ToothChartPage = () => {
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [curTab, setCurTab] = React.useState(0);

  const handleChangeTab = (event, newTab) => {
    setCurTab(newTab);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <Container className={classes.container}>
      <PopupChat></PopupChat>
      <Grid
        container
        xs={12}
        sm={12}
        md={12}
        className={classes.detailProfileContainer}
      >
        <Grid item className={classes.navPillsContainer}>
          {/* <Tabs value={curTab} onChange={handleChangeTab} indicatorColor="primary" textColor="primary">
                            <Tab label={t(strings.treatmentPlan).toUpperCase()} {...a11yProps(0)} />
                            <Tab label={t(strings.history).toUpperCase()} {...a11yProps(1)} />
                    </Tabs>
                    <Grid item>
                        <TabPanel value={curTab} index={0}>
                            {t(strings.noTreatmentsPending)}
                        </TabPanel>
                        <TabPanel value={curTab} index={1}>
                            <Button color="twitter" simple>
                                {t(strings.addRecord)}
                            </Button>
                        </TabPanel>
                    </Grid> */}
          <NavPills
            color="primary"
            tabs={[
              {
                tabButton: (<b>{t(strings.overView)}</b>),
                tabContent: (
                  <span>
                    <p>
                      Collaboratively administrate empowered markets via
                      plug-and-play networks. Dynamically procrastinate B2C
                      users after installed base benefits.
                    </p>
                    <br />
                    <p>
                      Dramatically visualize customer directed convergence
                      without revolutionary ROI. Collaboratively administrate
                      empowered markets via plug-and-play networks. Dynamically
                      procrastinate B2C users after installed base benefits.
                    </p>
                    <br />
                    <p>This is very nice.</p>
                  </span>
                ),
              },
              {
                tabButton: (<b>{t(strings.quickSelect)}</b>),
                tabContent: (
                  <span>
                    <p>
                      Efficiently unleash cross-media information without
                      cross-media value. Quickly maximize timely deliverables
                      for real-time schemas.
                    </p>
                    <br />
                    <p>
                      Dramatically maintain clicks-and-mortar solutions without
                      functional solutions.
                    </p>
                  </span>
                ),
              }
            ]}
            />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ToothChartPage;
