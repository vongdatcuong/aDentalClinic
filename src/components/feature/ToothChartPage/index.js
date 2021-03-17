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
import AdultToothChart from "../../common/ToothChart/AdultToothChart.js"

const useStyles = makeStyles(styles);

const ToothChartPage = () => {
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  
  const [curTab, setCurTab] = React.useState(0);

  const handleChangeTab = (event, newTab) => {
    setCurTab(newTab);
  };

  const selectTooth = (toothID) => {
    alert(toothID);
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
          <NavPills
            color="primary"
            tabs={[
              {
                tabButton: (<b>{t(strings.overView)}</b>),
                tabContent: (
                  <span>
                    {/* <p>
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
                    <p>This is very nice.</p> */}
                    <p>
                      Adult Tooth Chart
                    </p>
                    <AdultToothChart callback={selectTooth}></AdultToothChart>
                  </span>
                ),
              },
              {
                tabButton: (<b>{t(strings.quickSelect)}</b>),
                tabContent: (
                  <span>
                    <p>
                      Adult Tooth Chart
                    </p>
                    <AdultToothChart callback={selectTooth}></AdultToothChart>
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
