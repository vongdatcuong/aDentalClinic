import React, {useState,useEffect} from 'react';
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

// Toast
import { toast } from 'react-toastify';

import ToothService from "../../../api/patient/tooth.service";

const useStyles = makeStyles(styles);

const ToothChartPage = ({ patientID }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const history = useHistory();
  const [showQuickselectMenu, setShowQuickselectMenu] = React.useState(false);
  const [disabledOverviewUndoBtn, setDisabledOverviewUndoBtn] = React.useState(true);

  const [selectedTooth, setSelectedTooth] = React.useState([]);
  const [toothCondition, setToothCondition] = React.useState([]);
  const [toothNotes, setToothNotes] = React.useState([]);

  useEffect(() => {
    fetchToothCondition();
  }, [toothCondition]);
  const fetchToothCondition = async () => {
    try {
      const result = await ToothService.getAllPatientTooth(patientID);
      if (result.success) {
        let tempArray = [];
        let tempNote = [];
        result.data.forEach(tooth => {
            tempArray[tooth.tooth_number - 1] = tooth.condition || "NONE";
            tempNote[tooth.tooth_number - 1] = tooth.tooth_note || "No note here.";
        });
        setToothCondition(tempArray);
        setToothNotes(tempNote);
        return true;
      }
      toast.error(result.message);
      return false;
    } catch (err) {
      toast.error(t(strings.errorLoadData));
      return false;
    }
  };

  const handleClickToothOverview = (toothID) => {
    history.push(path.toothOverviewInfoPath.replace(':patientID', patientID) + `?toothID=${toothID}`);
    setDisabledOverviewUndoBtn(false);
  }

  const handleSelectToothQuickselect = (toothID) => {
    if (selectedTooth.includes(toothID)) {  // selected
        // pop tooth ID
        let pos = selectedTooth.indexOf(toothID);
        let removedItem = selectedTooth.splice(pos, 1);
        setSelectedTooth(selectedTooth.slice());
        if (selectedTooth.length === 0) {
            setShowQuickselectMenu(false);
        }
    }
    else {                                  // unselected
        // push tooth ID
        selectedTooth.push(toothID);
        setSelectedTooth(selectedTooth.slice());
        if (!showQuickselectMenu) {
            setShowQuickselectMenu(true);
        }
    }
  }

  const updateSelectedToothCondition = async (condition) => { // cập nhật trạng thái răng cho phần quickselect
    let toothNumberArray = [];
    selectedTooth.forEach(tooth => {
        toothNumberArray.push(parseInt(tooth.replace("Tooth","")));   // chuyển mảng có dạng ["Tooth1", "Tooth2"] thành [1,2]
    });
    try {
      const result = await ToothService.updateMultipleTooth(
        patientID,
        toothNumberArray, 
        {
            condition: condition,
        }
      );
      if (result.success) {
          // rerender lại toothCondition
        //   let tempCondition = toothCondition.slice();
        //   toothNumberArray.forEach(toothNumber => {
        //     tempCondition[toothNumber-1] = condition;
        //     setToothCondition(tempCondition);
        //   });
        return true;
      }
      //toast.error(result.message);
      return false;
    } catch (err) {
      //toast.error(t(strings.errorLoadData));
      return false;
    }
  };

  const handleClickToothMissing = () => {
    updateSelectedToothCondition("MISSING");
    clearSelectedTooth();
  }
  const handleClickToothVeneer = () => {
    updateSelectedToothCondition("VENEER");
    clearSelectedTooth();
  }
  const handleClickToothPontics = () => {
    updateSelectedToothCondition("PONTICS");
    clearSelectedTooth();
  }
  const handleClickToothCrown = () => {
    updateSelectedToothCondition("CROWN");
    clearSelectedTooth();
  }
  const handleClickToothEndoTests = () => {
    updateSelectedToothCondition("ENDOTESTS");
    clearSelectedTooth();
  }
  const handleClickToothClear = () => {
    updateSelectedToothCondition("NONE");
    clearSelectedTooth();
  }
  function clearSelectedTooth() {
    setShowQuickselectMenu(false);
    setSelectedTooth([]);
  }

  return (
  <React.Fragment>
    <TreatmentMenu patientID = { patientID }/>
    <Container className={classes.container}>
      {/* <PopupChat></PopupChat> */}
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
                      <AdultToothChart toothCondition={toothCondition} toothNotes={toothNotes} selectedTooth={selectedTooth} onSelectTooth={handleClickToothOverview} viewType="overview"></AdultToothChart>
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
                      <AdultToothChart toothCondition={toothCondition} toothNotes={toothNotes} selectedTooth={selectedTooth} onSelectTooth={handleSelectToothQuickselect} viewType="quickselect"></AdultToothChart>
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
