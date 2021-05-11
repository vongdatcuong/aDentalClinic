import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useParams, useHistory } from "react-router-dom";
// @material-ui/core Component
import Container from "@material-ui/core/Container";
import style from "./jss";
import strings from "../../../configs/strings";
// use i18next
import { useTranslation, Trans } from "react-i18next";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { MdSettingsBackupRestore } from "react-icons/md";

// Component
import PopupChat from "../../common/Messenger/PopupChat";
import Fab from "@material-ui/core/Fab";
import Grow from "@material-ui/core/Grow";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import NavPills from "../../common/NavPills/NavPills.js";
import AdultToothChart from "../../common/ToothChart/AdultToothChart.js";
import path from "../../../routes/path";
import TreatmentMenu from "../../../layouts/TreatmentMenu";
import { FaTeeth } from "react-icons/fa";
import ListAltIcon from "@material-ui/icons/ListAlt";

// Toast
import { toast } from "react-toastify";
import ToothService from "../../../api/patient/tooth.service";

// Stepping
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Check from "@material-ui/icons/Check";
import SettingsIcon from "@material-ui/icons/Settings";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import VideoLabelIcon from "@material-ui/icons/VideoLabel";
import StepConnector from "@material-ui/core/StepConnector";
import Typography from "@material-ui/core/Typography";

const ColorlibConnector = withStyles(style.colorlibConnector)(StepConnector);

const useColorlibStepIconStyles = makeStyles(style.colorlibStepIconStyles);

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <ListAltIcon />,
    2: <FaTeeth />,
    3: <VideoLabelIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.node,
};

const useStyles = makeStyles(style.styles);

const AddTreatmentPage = ({ patientID }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const history = useHistory();

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = [
    t(strings.selectTreatment),
    t(strings.selectTooth),
    t(strings.previewTreatmentInfo),
  ];

  const [showQuickselectMenu, setShowQuickselectMenu] = React.useState(false);
  const [selectedTooth, setSelectedTooth] = React.useState([]);
  const [toothCondition, setToothCondition] = React.useState([]);
  const [toothNotes, setToothNotes] = React.useState([]);

  useEffect(() => {
    fetchToothCondition();
  }, []);
  const fetchToothCondition = async () => {
    try {
      const result = await ToothService.getAllPatientTooth(patientID);
      if (result.success) {
        let tempArray = [];
        let tempNote = [];
        result.data.forEach((tooth) => {
          tempArray[tooth.tooth_number - 1] = tooth.condition || "NONE";
          tempNote[tooth.tooth_number - 1] =
            tooth.tooth_note || "No note here.";
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

  const handleSelectToothQuickselect = (toothID) => {
    if (selectedTooth.includes(toothID)) {
      // selected
      // pop tooth ID
      let pos = selectedTooth.indexOf(toothID);
      let removedItem = selectedTooth.splice(pos, 1);
      setSelectedTooth(selectedTooth.slice());
      if (selectedTooth.length === 0) {
        setShowQuickselectMenu(false);
      }
    } else {
      // unselected
      // push tooth ID
      selectedTooth.push(toothID);
      setSelectedTooth(selectedTooth.slice());
      if (!showQuickselectMenu) {
        setShowQuickselectMenu(true);
      }
    }
  };

  const handleClickToothMissing = () => {
    //updateSelectedToothCondition("MISSING");
    clearSelectedTooth();
  };
  const handleClickToothVeneer = () => {
    //updateSelectedToothCondition("VENEER");
    clearSelectedTooth();
  };
  const handleClickToothPontics = () => {
    //updateSelectedToothCondition("PONTICS");
    clearSelectedTooth();
  };
  const handleClickToothCrown = () => {
    //updateSelectedToothCondition("CROWN");
    clearSelectedTooth();
  };
  const handleClickToothEndoTests = () => {
    //updateSelectedToothCondition("ENDOTESTS");
    clearSelectedTooth();
  };
  const handleClickToothClear = () => {
    //updateSelectedToothCondition("NONE");
    clearSelectedTooth();
  };
  function clearSelectedTooth() {
    setShowQuickselectMenu(false);
    setSelectedTooth([]);
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
            <div className={classes.stepContent}>
                <h1>Select campaign settings...</h1>
            </div>
        );
      case 1:
        return (
          <div className={classes.stepContent}>
            <span className={classes.toothChartContainer}>
              <AdultToothChart
                toothCondition={toothCondition}
                toothNotes={toothNotes}
                selectedTooth={selectedTooth}
                onSelectTooth={handleSelectToothQuickselect}
                viewType="quickselect"
              ></AdultToothChart>
            </span>
            <span className={classes.quickselectMenuContainer}>
              <Grow in={showQuickselectMenu}>
                <ButtonGroup
                  size="large"
                  color="primary"
                  aria-label="large outlined primary button group"
                  className={classes.quickselectMenu}
                >
                  <Button onClick={handleClickToothMissing}>
                    <b>{t(strings.facial)}</b>
                  </Button>
                  <Button onClick={handleClickToothVeneer}>
                    <b>{t(strings.lingual)}</b>
                  </Button>
                  <Button onClick={handleClickToothPontics}>
                    <b>{t(strings.mesial)}</b>
                  </Button>
                  <Button onClick={handleClickToothCrown}>
                    <b>{t(strings.distal)}</b>
                  </Button>
                  <Button onClick={handleClickToothEndoTests}>
                    <b>{t(strings.top)}</b>
                  </Button>
                  <Button onClick={handleClickToothClear}>
                    <b>{t(strings.root)}</b>
                  </Button>
                  <Button onClick={handleClickToothClear}>
                    <b>{t(strings.unselect)}</b>
                  </Button>
                  <Button onClick={handleClickToothClear}>
                    <b>{t(strings.select)}</b>
                  </Button>
                </ButtonGroup>
              </Grow>
            </span>
          </div>
        );
      case 2:
        return (
            <div className={classes.stepContent}>
                <h1>This is the bit I really care about!</h1>
            </div>
        );
      default:
        return "Unknown step";
    }
  }

  return (
    <React.Fragment>
      <TreatmentMenu patientID={patientID} />
      <Container className={classes.container}>
        <PopupChat></PopupChat>
        <Grid
          container
          xs={12}
          sm={12}
          md={12}
          className={classes.pageContainer}
        >
          <Stepper
            alternativeLabel
            activeStep={activeStep}
            connector={<ColorlibConnector />}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          <div className={classes.stepContainer}>
            {activeStep === steps.length ? (
              <div>
                <Typography className={classes.instructions}>
                  {t(strings.allStepsCompleted)}
                </Typography>
                <Button onClick={handleReset} className={classes.button}>
                  {t(strings.reset)}
                </Button>
              </div>
            ) : (
              <div>
                {getStepContent(activeStep)}
                <div className={classes.stepButtons}>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    {t(strings.back)}
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1
                      ? t(strings.finish)
                      : t(strings.next)}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default AddTreatmentPage;
