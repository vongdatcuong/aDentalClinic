import React, { useState, useEffect, useContext } from "react";
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
import {
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  TextField,
} from "@material-ui/core";
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

// API
import api from "../../../api/base-api";
import apiPath from "../../../api/path";
// Context
import { loadingStore } from "../../../contexts/loading-context";

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
  const { loadingState, dispatchLoading } = useContext(loadingStore);
  // States
  const [procedureCates, setProcedureCates] = useState([]);
  const [procedures, setProcedures] = useState([]);
  const [selectedProcedureCate, setselectedProcedureCate] = useState(null);
  const [selectedProcedure, setSelectedProcedure] = useState(null);
  const [treatmentNote, setTreatmentNote] = useState("");
  //
  const [procedureErrMsg, setProcedureErrMsg] = useState("");

  const [showQuickselectMenu, setShowQuickselectMenu] = React.useState(false);
  const [selectedTooth, setSelectedTooth] = React.useState([]); // các răng đã chọn - tạm thời
  const [toothCondition, setToothCondition] = React.useState([]);
  const [toothNotes, setToothNotes] = React.useState([]);
  const [selectedTooth_Raw, setSelectedTooth_Raw] = React.useState([]); // các răng đã chọn - tổng hợp - json
  const [selectedTooth_Display, setSelectedTooth_Display] = React.useState([]); // parse chuỗi json ở trên để hiện thị với user
  const [toothSelectedSurfaces, setToothSelectedSurfaces] = React.useState([]);
  const [showUnselectBtn, setShowUnselectBtn] = React.useState(false);
  const [selectedFacial, setSelectedFacial] = React.useState(false);
  const [selectedLingual, setSelectedLingual] = React.useState(false);
  const [selectedMesial, setSelectedMesial] = React.useState(false);
  const [selectedDistal, setSelectedDistal] = React.useState(false);
  const [selectedTop, setSelectedTop] = React.useState(false);
  const [selectedRoot, setSelectedRoot] = React.useState(false);

  // fetch category
  useEffect(async () => {
    try {
      dispatchLoading({ type: strings.setLoading, isLoading: true });
      const promises = [
        api.httpGet({
          url: apiPath.procedure.procedure + apiPath.procedure.category,
        }),
      ];
      const result = await Promise.all(promises);
      if (result[0].success) {
        const categories = result[0].payload.map((cate) => ({
          id: cate._id,
          name: cate.name,
        }));
        setProcedureCates(categories);
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      toast.error(t(strings.loadProcedureCateErrMsg));
    } finally {
      dispatchLoading({ type: strings.setLoading, isLoading: false });
    }
  }, [selectedProcedureCate, procedures]);
  const handleOnProcedureCateChange = async (evt) => {
    const newSelectedCate = evt.target.value;
    try {
      dispatchLoading({ type: strings.setLoading, isLoading: true });
      const promises = [
        api.httpGet({
          url:
            apiPath.procedure.procedure +
            apiPath.procedure.category +
            "/" +
            newSelectedCate,
          query: {
            get_codes: true,
          },
        }),
      ];
      const result = await Promise.all(promises);
      if (result[0].success) {
        setselectedProcedureCate(newSelectedCate);
        const codes = result[0].payload.procedure_code.map((code) => ({
          id: code._id,
          procedure_code: code.procedure_code,
          description: code.description,
        }));
        setProcedures(codes);
        setSelectedProcedure(null);
        //   setSelectedTooth(null);
        //   setSelectedTeeth([]);
        //   setSelectedSurface(null);
        //   setAllowMultipleTooth(false);
        //   setAllowNoTooth(false);
        //   setAllowedTeeth({});
        //   setSurfaces([]);
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      toast.error(t(strings.loadProcedureCodeErrMsg));
    } finally {
      dispatchLoading({ type: strings.setLoading, isLoading: false });
    }
  };
  const handleOnProcedureChange = async (evt) => {
    const newSelectedProcedure = evt.target.value;
    try {
      dispatchLoading({ type: strings.setLoading, isLoading: true });
      const promises = [
        api.httpGet({
          url: apiPath.procedure.procedure + "/" + newSelectedProcedure.id,
        }),
      ];
      const result = await Promise.all(promises);
      if (result[0].success) {
        setSelectedProcedure(newSelectedProcedure);
        // const selectedTooth = result[0].payload.tooth_select;
        // if (selectedTooth){
        // const tokens = selectedTooth.split(":");
        // if (tokens[0] == strings.selectNoneTooth){
        //     setAllowNoTooth(true);
        //     setAllowMultipleTooth(false);
        //     setAllowedTeeth({});
        // } else {
        //     if (tokens[0] == strings.selectMultiTooth){
        //     setAllowMultipleTooth(true);
        //     } else {
        //     setAllowMultipleTooth(false);
        //     }
        //     let isOpt = false;
        //     if (tokens[tokens.length - 1] == "opt"){
        //     setAllowNoTooth(true);
        //     isOpt = true;
        //     } else {
        //     setAllowNoTooth(false);
        //     }
        //     // Allowed teeth
        //     let newAllowedTeeth = {};
        //     let toks;
        //     for (let i = 1; i < tokens.length - isOpt; i++){
        //     if (tokens[i].indexOf("-") != -1){
        //         toks = tokens[i].split("-");
        //         for (let j = Number(toks[0]); j <= Number(toks[1]); j++){
        //         newAllowedTeeth[j] = true;
        //         }
        //     } else {
        //         toks = tokens[i].split(",");
        //         for (let j = 0; j < toks.length; j++){
        //         newAllowedTeeth[toks[j]] = true;
        //         }
        //     }
        //     }
        //     setAllowedTeeth(newAllowedTeeth);
        // }
        // } else {
        // setAllowMultipleTooth(false);
        // setAllowNoTooth(false);
        // setAllowedTeeth({});
        // }
        // setSelectedTooth(null);
        // setSelectedTeeth([]);
        // setSelectedSurface(null);
        // setSurfaces([]);
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      toast.error(t(strings.loadProcedureCodeErrMsg));
    } finally {
      dispatchLoading({ type: strings.setLoading, isLoading: false });
    }
  };

  const handleChangeNote = (e) => {
    setTreatmentNote(e.target.value);
  };

  useEffect(() => {
    fetchToothCondition();
  }, []);
  const fetchToothCondition = async () => { // this run when page open
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
        let tSelectedTooth_Raw = [];
        let toothSelectedSurfaces = [];
        for (let i = 0; i < 32; i++) {
            let tooth = {
                toothNumber: i+1,
                isSelected: false,
                // distal: false,
                // mesial: false,
                // facial: false,
                // lingual: false,
                // top: false,
                // root: false,
            }
            tSelectedTooth_Raw.push(tooth);
            let surfaces = {
                toothNumber: i+1,
                isSelected: false,
                distal: false,
                mesial: false,
                facial: false,
                lingual: false,
                top: false,
                root: false,
            }
            toothSelectedSurfaces.push(surfaces);
        }
        setSelectedTooth_Raw(tSelectedTooth_Raw);
        setToothSelectedSurfaces(toothSelectedSurfaces);
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
    let intToothID = parseInt(toothID.replace("Tooth",""));
    if (selectedTooth.includes(toothID)) { //răng này đã được chọn => bỏ chọn răng
      // pop tooth ID
      let pos = selectedTooth.indexOf(toothID);
      let removedItem = selectedTooth.splice(pos, 1);
      setSelectedTooth(selectedTooth.slice());
      if (selectedTooth.length === 0) {
        //setShowQuickselectMenu(false);
        clearSelectedTooth();
      }
      else if (selectedTooth.length === 1) {    // mới chỉ chọn 1 răng
        // hiển thị menu theo răng được chọn
        let selectedToothID = parseInt(selectedTooth[0].replace("Tooth",""));
        setShowUnselectBtn(selectedTooth_Raw[selectedToothID-1].isSelected === true);
        setSelectedFacial(selectedTooth_Raw[selectedToothID-1].facial === true);
        setSelectedLingual(selectedTooth_Raw[selectedToothID-1].lingual === true);
        setSelectedMesial(selectedTooth_Raw[selectedToothID-1].mesial === true);
        setSelectedDistal(selectedTooth_Raw[selectedToothID-1].distal === true);
        setSelectedTop(selectedTooth_Raw[selectedToothID-1].top === true);
        setSelectedRoot(selectedTooth_Raw[selectedToothID-1].root === true);
      }
      else {    // sau khi bỏ chọn, nếu những răng còn lại đều đã được selected => hiện nút unselect
        groupToothBySelectedSurface();
      }
    } else { // răng này chưa được chọn => chọn răng
      // push tooth ID
      selectedTooth.push(toothID);
      setSelectedTooth(selectedTooth.slice());
      if (!showQuickselectMenu) {   // mới chỉ chọn 1 răng
        // hiển thị menu theo răng vừa chọn
        setShowUnselectBtn(selectedTooth_Raw[intToothID-1].isSelected === true);
        setSelectedFacial(selectedTooth_Raw[intToothID-1].facial === true);
        setSelectedLingual(selectedTooth_Raw[intToothID-1].lingual === true);
        setSelectedMesial(selectedTooth_Raw[intToothID-1].mesial === true);
        setSelectedDistal(selectedTooth_Raw[intToothID-1].distal === true);
        setSelectedTop(selectedTooth_Raw[intToothID-1].top === true);
        setSelectedRoot(selectedTooth_Raw[intToothID-1].root === true);
        setShowQuickselectMenu(true);
      }
      else {    // đã chọn nhiều răng => nếu tất cả các răng trong selectedTooth đều có isSlected = 1 thì hiện nút bỏ chọn
        setSelectedFacial(false);
        setSelectedLingual(false);
        setSelectedMesial(false);
        setSelectedDistal(false);
        setSelectedTop(false);
        setSelectedRoot(false);
        groupToothBySelectedSurface();

      }
    }
  };

  function groupToothBySelectedSurface(){
    let showUnselectForAll = true;
    let showFacialForAll = true;
    let showLingualForAll = true;
    let showMesialForAll = true;
    let showDistalForAll = true;
    let showTopForAll = true;
    let showRootForAll = true;
    selectedTooth.forEach((tooth) => {
        let intTooth = parseInt(tooth.replace("Tooth",""));
        if (selectedTooth_Raw[intTooth-1].isSelected === false) {
            showUnselectForAll = false;
        }
        if (!(selectedTooth_Raw[intTooth-1].facial === true)) {
            showFacialForAll = false;
        }
        if (!(selectedTooth_Raw[intTooth-1].lingual === true)) {
            showLingualForAll = false;
        }
        if (!(selectedTooth_Raw[intTooth-1].mesial === true)) {
            showMesialForAll = false;
        }
        if (!(selectedTooth_Raw[intTooth-1].distal === true)) {
            showDistalForAll = false;
        }
        if (!(selectedTooth_Raw[intTooth-1].top === true)) {
            showTopForAll = false;
        }
        if (!(selectedTooth_Raw[intTooth-1].root === true)) {
            showRootForAll = false;
        }
    });
    setShowUnselectBtn(showUnselectForAll);
    setSelectedFacial(showFacialForAll);
    setSelectedLingual(showLingualForAll);
    setSelectedMesial(showMesialForAll);
    setSelectedDistal(showDistalForAll);
    setSelectedTop(showTopForAll);
    setSelectedRoot(showRootForAll);
  }

  const handleClickToothFacial = () => {
    setSelectedFacial(!selectedFacial);
  };
  const handleClickToothLingual = () => {
    setSelectedLingual(!selectedLingual);
  };
  const handleClickToothMesial = () => {
    setSelectedMesial(!selectedMesial);
  };
  const handleClickToothDistal = () => {
    setSelectedDistal(!selectedDistal);
  };
  const handleClickToothTop = () => {
    setSelectedTop(!selectedTop);
  };
  const handleClickToothRoot = () => {
    setSelectedRoot(!selectedRoot);
  };
  const handleClickToothUnselect = () => {
    // update selectedTooth_Raw
    let tselectedTooth_Raw = selectedTooth_Raw.slice();
    let tToothSelectedSurfaces = toothSelectedSurfaces.slice();
    selectedTooth.forEach((tooth) => {
        let toothNumber = parseInt(tooth.replace("Tooth",""));
        tselectedTooth_Raw[toothNumber-1].isSelected = false;
        tselectedTooth_Raw[toothNumber-1].facial = false;
        tselectedTooth_Raw[toothNumber-1].lingual = false;
        tselectedTooth_Raw[toothNumber-1].mesial = false;
        tselectedTooth_Raw[toothNumber-1].distal = false;
        tselectedTooth_Raw[toothNumber-1].top = false;
        tselectedTooth_Raw[toothNumber-1].root = false;

        tToothSelectedSurfaces[toothNumber-1].isSelected = false;
        tToothSelectedSurfaces[toothNumber-1].facial = false;
        tToothSelectedSurfaces[toothNumber-1].lingual = false;
        tToothSelectedSurfaces[toothNumber-1].mesial = false;
        tToothSelectedSurfaces[toothNumber-1].distal = false;
        tToothSelectedSurfaces[toothNumber-1].top = false;
        tToothSelectedSurfaces[toothNumber-1].root = false;
    });
    setSelectedTooth_Raw(tselectedTooth_Raw);
    setToothSelectedSurfaces(tToothSelectedSurfaces);
    clearSelectedTooth();
  };
  const handleClickToothSelect = () => {
    let tselectedTooth_Raw = selectedTooth_Raw.slice();
    let tToothSelectedSurfaces = toothSelectedSurfaces.slice();
    selectedTooth.forEach((tooth) => {
        let toothNumber = parseInt(tooth.replace("Tooth",""));
        tselectedTooth_Raw[toothNumber-1].isSelected = true;
        tselectedTooth_Raw[toothNumber-1].facial = selectedFacial;
        tselectedTooth_Raw[toothNumber-1].lingual = selectedLingual;
        tselectedTooth_Raw[toothNumber-1].mesial = selectedMesial;
        tselectedTooth_Raw[toothNumber-1].distal = selectedDistal;
        tselectedTooth_Raw[toothNumber-1].top = selectedTop;
        tselectedTooth_Raw[toothNumber-1].root = selectedRoot;

        tToothSelectedSurfaces[toothNumber-1].isSelected = true;
        tToothSelectedSurfaces[toothNumber-1].facial = selectedFacial;
        tToothSelectedSurfaces[toothNumber-1].lingual = selectedLingual;
        tToothSelectedSurfaces[toothNumber-1].mesial = selectedMesial;
        tToothSelectedSurfaces[toothNumber-1].distal = selectedDistal;
        tToothSelectedSurfaces[toothNumber-1].top = selectedTop;
        tToothSelectedSurfaces[toothNumber-1].root = selectedRoot;
    });
    // update selectedTooth_Raw
    setSelectedTooth_Raw(tselectedTooth_Raw);
    // update toothSelectedSurfaces to display tooth UI
    setToothSelectedSurfaces(tToothSelectedSurfaces);
    clearSelectedTooth();
  };
  function clearSelectedTooth() {
    setShowQuickselectMenu(false);
    setSelectedTooth([]);
    setShowUnselectBtn(false);
    setSelectedFacial(false);
    setSelectedLingual(false);
    setSelectedMesial(false);
    setSelectedDistal(false);
    setSelectedTop(false);
    setSelectedRoot(false);
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
            <h1>{t(strings.selectTreatment)}</h1>
            <Grid item md={8} sm={6} xs={12}>
              <InputLabel shrink id="treatment-category">
                {t(strings.category)}
              </InputLabel>
              <Select
                labelId="treatment-category"
                id="treatment-category"
                className={classes.select}
                margin="dense"
                variant="outlined"
                size="small"
                fullWidth
                value={selectedProcedureCate || 0}
                onChange={handleOnProcedureCateChange}
              >
                {procedureCates.map((cate) => {
                  return (
                    <MenuItem key={cate.id} value={cate.id}>
                      {cate.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </Grid>
            {/* Select Procedure */}
            <Grid
              item
              md={8}
              sm={6}
              xs={12}
              className={classes.selectProcedure}
            >
              <InputLabel shrink id="treatment-procedure">
                {t(strings.procedure)}
              </InputLabel>
              <Select
                labelId="treatment-procedure"
                id="treatment-procedure"
                className={classes.select}
                margin="dense"
                variant="outlined"
                size="small"
                fullWidth
                value={selectedProcedure || 0}
                onChange={handleOnProcedureChange}
                error={Boolean(procedureErrMsg)}
                helperText={procedureErrMsg}
              >
                {procedures.map((code) => {
                  return (
                    <MenuItem key={code.id} value={code}>
                      {code.procedure_code} ({code.description})
                    </MenuItem>
                  );
                })}
              </Select>
              {Boolean(procedureErrMsg) && (
                <FormHelperText
                  className={classes.formMessageFail}
                  error={true}
                >
                  {procedureErrMsg}
                </FormHelperText>
              )}
            </Grid>
            <Grid
              item
              md={8}
              sm={6}
              xs={12}
              className={classes.selectProcedure}
            >
              <TextField
                multiline
                rows={10}
                rowsMax={15}
                onChange={handleChangeNote}
                label={t(strings.note)}
                className={classes.textField}
                margin="dense"
                variant="outlined"
                size="small"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  placeholder: t(strings.note),
                }}
              />
            </Grid>
          </div>
        );
      case 1:
        return (
          <div className={classes.stepContent}>
            <span className={classes.toothChartContainer}>
              <AdultToothChart
                toothCondition={toothCondition}
                toothSelectedSurfaces={toothSelectedSurfaces}
                toothNotes={toothNotes}
                selectedTooth={selectedTooth}
                onSelectTooth={handleSelectToothQuickselect}
                viewType="add-treatment"
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
                  <Button onClick={handleClickToothFacial} variant={ selectedFacial? "contained" : ""}>
                    <b>{t(strings.facial)}</b>
                  </Button>
                  <Button onClick={handleClickToothLingual} variant={ selectedLingual? "contained" : ""}>
                    <b>{t(strings.lingual)}</b>
                  </Button>
                  <Button onClick={handleClickToothMesial} variant={ selectedMesial? "contained" : ""}>
                    <b>{t(strings.mesial)}</b>
                  </Button>
                  <Button onClick={handleClickToothDistal} variant={ selectedDistal? "contained" : ""}>
                    <b>{t(strings.distal)}</b>
                  </Button>
                  <Button onClick={handleClickToothTop} variant={ selectedTop? "contained" : ""}>
                    <b>{t(strings.top)}</b>
                  </Button>
                  <Button onClick={handleClickToothRoot} variant={ selectedRoot? "contained" : ""}>
                    <b>{t(strings.root)}</b>
                  </Button>
                  { showUnselectBtn && 
                  <Button onClick={handleClickToothUnselect}>
                    <b>{t(strings.unselect)}</b>
                  </Button> }
                  <Button onClick={handleClickToothSelect}>
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
        {/* <PopupChat></PopupChat> */}
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
