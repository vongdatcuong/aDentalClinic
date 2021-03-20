import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

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
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

// Component
import PopupChat from "../../../common/Messenger/PopupChat";
import TabPanel from "../../../common/TabPanel";

const useStyles = makeStyles(styles);

const ToothOverviewInfoTab = (props) => {
  const { t, i18n } = useTranslation();
  const classes = useStyles();

  return (
    <TabPanel value={props.value} index={props.index} className={classes.toothTabContainer}>
      <Grid container>
        <Grid item xs={2} sm={2} md={2} className={classes.toothImgContainer}>
          {props.toothSvgString}
        </Grid>
        <Grid container xs={10} sm={10} md={10} className={classes.toothInfoContainer}>
          Right
        </Grid>
      </Grid>
    </TabPanel>
  );
};

export default ToothOverviewInfoTab;
