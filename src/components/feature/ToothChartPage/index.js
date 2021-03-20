import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {useParams, useHistory} from "react-router-dom";
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
import { MdSettingsBackupRestore } from "react-icons/md";

// Component
import PopupChat from "../../common/Messenger/PopupChat";
import Fab from "@material-ui/core/Fab";
import Grow from '@material-ui/core/Grow';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TabPanel from "../../common/TabPanel";
import Slide from '@material-ui/core/Slide';
import NavPills from "../../common/NavPills/NavPills.js";
import AdultToothChart from "../../common/ToothChart/AdultToothChart.js";
import path from "../../../routes/path";

const useStyles = makeStyles(styles);

const ToothChartPage = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const history = useHistory();
  const [showQuickselectMenu, setShowQuickselectMenu] = React.useState(false);
  const [disabledOverviewUndoBtn, setDisabledOverviewUndoBtn] = React.useState(true);

//   const [curTab, setCurTab] = React.useState(0);

//   const handleChangeTab = (event, newTab) => {
//     setCurTab(newTab);
//   };

  const handleClickToothOverview = (toothID) => {
    history.push(path.toothOverviewInfoPath + `?toothID=${toothID}`);
    setDisabledOverviewUndoBtn(false);
  }

  const handleClickToothQuickselect = (toothID) => {
    setShowQuickselectMenu(!showQuickselectMenu);
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
                tabButton: <b>{t(strings.overView)}</b>,
                tabContent: (
                  <React.Fragment>
                    <span className={classes.toothChartContainer}>
                      <AdultToothChart onClickTooth={handleClickToothOverview} viewType="overview"></AdultToothChart>
                    </span>
                    <Fab aria-label="Undo" className={classes.fabUndo} disabled={disabledOverviewUndoBtn}>
                      <MdSettingsBackupRestore />
                    </Fab>
                  </React.Fragment>
                ),
              },
              {
                tabButton: <b>{t(strings.quickSelect)}</b>,
                tabContent: (
                  <React.Fragment>
                    <span className={classes.toothChartContainer}>
                      <AdultToothChart onClickTooth={handleClickToothQuickselect} viewType="quickselect"></AdultToothChart>
                    </span>
                    <span className={classes.quickselectMenuContainer}>
                        <Grow in={showQuickselectMenu}>
                            <ButtonGroup size="large" color="primary" aria-label="large outlined primary button group" className={classes.quickselectMenu}>
                                <Button><b>{t(strings.missing)}</b></Button>
                                <Button><b>{t(strings.veneer)}</b></Button>
                                <Button><b>{t(strings.pontics)}</b></Button>
                                <Button><b>{t(strings.crown)}</b></Button>
                                <Button><b>{t(strings.endoTests)}</b></Button>
                            </ButtonGroup>
                        </Grow>
                    </span>
                  </React.Fragment>
                ),
              },
            ]}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ToothChartPage;
