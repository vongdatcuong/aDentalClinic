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
import TreatmentMenu from '../../../layouts/TreatmentMenu';

const useStyles = makeStyles(styles);

const ToothChartPage = ({ patientID }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const history = useHistory();
  const [showQuickselectMenu, setShowQuickselectMenu] = React.useState(false);
  const [disabledOverviewUndoBtn, setDisabledOverviewUndoBtn] = React.useState(true);

  const [selectedTooth, setSelectedTooth] = React.useState([]);

  const handleClickToothOverview = (toothID) => {
    history.push(path.toothOverviewInfoPath.replace(':patientID', patientID) + `?toothID=${toothID}`);
    setDisabledOverviewUndoBtn(false);
  }

  const handleSelectToothQuickselect = (toothID) => {
    if (selectedTooth.includes(toothID)) {  // selected
        // pop tooth ID
        let pos = selectedTooth.indexOf(toothID);
        let removedItem = selectedTooth.splice(pos, 1);
        console.log(selectedTooth);
        if (selectedTooth.length === 0) {
            setShowQuickselectMenu(false);
        }
    }
    else {                                  // unselected
        // push tooth ID
        selectedTooth.push(toothID);
        console.log(selectedTooth);
        if (!showQuickselectMenu) {
            setShowQuickselectMenu(true);
        }
    }
  }
//   const handleDeselectToothQuickselect = (toothID) => {
//     // pop tooth ID
//     let pos = selectedTooth.indexOf(toothID);
//     let removedItem = selectedTooth.splice(pos, 1);
//     if (selectedTooth.length === 0) {
//         setShowQuickselectMenu(false);
//     }
//   }

  const handleClickToothMissing = () => {
    // Todo: update tooth status and rerender
    console.log("selected: " + selectedTooth);
    console.log("Missing");
    clearSelectedTooth();
  }
  const handleClickToothVeneer = () => {
    // Todo: update tooth status and rerender
    clearSelectedTooth();
  }
  const handleClickToothPontics = () => {
    // Todo: update tooth status and rerender
    clearSelectedTooth();
  }
  const handleClickToothCrown = () => {
    // Todo: update tooth status and rerender
    clearSelectedTooth();
  }
  const handleClickToothEndoTests = () => {
    // Todo: update tooth status and rerender
    clearSelectedTooth();
  }
  const handleClickToothClear = () => {
    // Todo: update tooth status and rerender
    clearSelectedTooth();
  }
  function clearSelectedTooth() {
      /// Todo: bỏ trạng thái select của từng răng
    setShowQuickselectMenu(false);
    setSelectedTooth([]);
  }

  return (
  <React.Fragment>
    <TreatmentMenu patientID = { patientID }/>
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
                      <AdultToothChart selectedTooth={selectedTooth} onSelectTooth={handleClickToothOverview} viewType="overview"></AdultToothChart>
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
                      <AdultToothChart selectedTooth={selectedTooth} onSelectTooth={handleSelectToothQuickselect} viewType="quickselect"></AdultToothChart>
                    </span>
                    <span className={classes.quickselectMenuContainer}>
                        <Grow in={showQuickselectMenu}>
                            <ButtonGroup size="large" color="primary" aria-label="large outlined primary button group" className={classes.quickselectMenu}>
                                <Button onClick={handleClickToothMissing}><b>{t(strings.missing)}</b></Button>
                                <Button onClick={handleClickToothVeneer}><b>{t(strings.veneer)}</b></Button>
                                <Button onClick={handleClickToothPontics}><b>{t(strings.pontics)}</b></Button>
                                <Button onClick={handleClickToothCrown}><b>{t(strings.crown)}</b></Button>
                                <Button onClick={handleClickToothEndoTests}><b>{t(strings.endoTests)}</b></Button>
                                <Button onClick={handleClickToothClear}><b>{t(strings.clear)}</b></Button>
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
    
  </React.Fragment>
  );
};

export default ToothChartPage;
