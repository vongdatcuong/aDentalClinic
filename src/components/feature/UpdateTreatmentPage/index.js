import React, { useState, useEffect, useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useParams, useHistory } from "react-router-dom";
// @material-ui/core Component
import Container from "@material-ui/core/Container";
import style from "./jss";
import strings from "../../../configs/strings";
import figures from "../../../configs/figures";
import lists from "../../../configs/lists";

// moment
import moment from "moment";

// use i18next
import { useTranslation, Trans } from "react-i18next";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { FaTeethOpen } from "react-icons/fa";

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
import FormControl from "@material-ui/core/FormControl";

// React-select
import AsyncSelect from "react-select/async";

// @material-ui/core Datepicker
import { DatePicker } from "@material-ui/pickers";

// API
import api from "../../../api/base-api";
import apiPath from "../../../api/path";
import TreatmentService from "../../../api/treatment/treatment.service";
// Context
import { loadingStore } from "../../../contexts/loading-context";

// Utils
import ConvertDateTimes from "../../../utils/datetimes/convertDateTimes";

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

const UpdateTreatmentPage = ({ patientID, treatmentID }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const history = useHistory();

  // None option
  const noneOption = { value: "", label: t(strings.none) };

  // Async select Style
  const asyncSelectStyle = {
    menu: ({ ...provided }, state) => ({
      ...provided,
      zIndex: 2,
    }),
  };

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = [
    t(strings.selectTreatment),
    t(strings.selectTooth),
    t(strings.reviewTreatmentInfo),
  ];
  const { loadingState, dispatchLoading } = useContext(loadingStore);
  // States
  const [selectedProcedure, setSelectedProcedure] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [treatmentNote, setTreatmentNote] = useState("");
  const [provider, setProvider] = React.useState(null);
  const [assistant, setAssistant] = React.useState(null);
  const [date, setDate] = React.useState(new Date());

  //
  const [procedureErrMsg, setProcedureErrMsg] = useState("");
  const [providerErrMsg, setProviderErrMsg] = useState("");
  const [dateErrMsg, setDateErrMsg] = useState("");
  const [selectedTooth, setSelectedTooth] = React.useState([]); // các răng đã chọn - tạm thời
  const [toothCondition, setToothCondition] = React.useState([]);
  const [toothNotes, setToothNotes] = React.useState([]);
  const [selectedTooth_Raw, setSelectedTooth_Raw] = React.useState([]); // các răng đã chọn - tổng hợp - json
  const [selectedTooth_Display, setSelectedTooth_Display] = React.useState(""); // parse chuỗi json ở trên để hiện thị với user

  const handleChangeNote = (e) => {
    setTreatmentNote(e.target.value);
  };

  useEffect(() => {
    getTreatmentData();
    fetchToothCondition();
  }, []);
  const getTreatmentData = async () => {
    // this run when page open
    try {
      const result = await TreatmentService.getTreatmentByID(treatmentID);
      if (result.success) {
          // States
        setSelectedStatus(result.data.status);
        setSelectedProcedure(result.data.procedure_code);
        setTreatmentNote(result.data.note);
        setProvider({
            value: result.data.provider._id,
            label: `${result.data.provider.user.first_name} ${result.data.provider.user.last_name} (${result.data.provider.display_id})`,
        })
        if (result.data.assistant) {
            setAssistant({
                value: result.data.assistant?._id,
                label: `${result.data.assistant?.user.first_name} ${result.data.assistant?.user.last_name} (${result.data.assistant?.display_id})`,
            })
        }
        setDate(new Date(result.data.treatment_date));
        setSelectedTooth_Raw(result.data.selected_tooth_raw);
        return true;
      }
      toast.error(result.message);
      return false;
    } catch (err) {
      toast.error(t(strings.errorLoadData));
      return false;
    }
  };
  const fetchToothCondition = async () => {
    // this run when page open
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
const handleSelectToothQuickselect = (toothID, isAutoQuickSelectTooth) => {
    // do nothing
}

  const handleNext =  async () => {
    if (validateData()) {
      if (activeStep === steps.length - 1) {    // đang ở bước submit
        let submited = await handleSubmit();
        if (submited) setActiveStep((prevActiveStep) => prevActiveStep + 1); // ko cho finish nếu gọi API ko thành công
        else toast.error(t(strings.updateFail));
      }
      else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        // update setSelectedTooth_Display
        let displayString = "";
        selectedTooth_Raw.forEach((tooth) => {
          if (tooth.isSelected === true) {
            displayString += "\n\tTooth " + tooth.toothNumber;
            if (tooth.distal || tooth.mesial || tooth.facial || tooth.lingual || tooth.top || tooth.root) {
            displayString += ": ";
            displayString += tooth.distal === true ? "D" : "";
            displayString += tooth.mesial === true ? "M" : "";
            displayString += tooth.facial === true ? "F" : "";
            displayString += tooth.lingual === true ? "L" : "";
            displayString += tooth.top === true ? "T" : "";
            displayString += tooth.root === true ? "R" : "";
            }
          }
        });
        setSelectedTooth_Display(displayString);
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    // reset state ...
  };

  function validateData() {
    let isValid = true;
    // Provider
    if (!provider?.value) {
      setProviderErrMsg(t(strings.appointProviderErrMsg));
      isValid = false;
    } else {
      setProviderErrMsg("");
    }
    //Procedure code
    if (selectedProcedure == null) {
      setProcedureErrMsg(t(strings.appointProcedureErrMsg));
      isValid = false;
    } else {
      setProcedureErrMsg("");
    }
    return isValid;
  }

  async function handleSubmit() {
    toast.info(t(strings.loading));
    const submitUpdateTreatment = async () => {
      try {
        const data = {
          treatment_date: ConvertDateTimes.formatDate(
            date,
            strings.apiDateFormat
          ),
          patient: patientID,
          provider: provider.value,
          assistant: assistant?.value,
          procedure_code: selectedProcedure.id,
          selected_tooth_raw: selectedTooth_Raw,
          note: treatmentNote,
          status: selectedStatus,
        };
        const result = await TreatmentService.updateTreatment(treatmentID, data);
        if (result.success) {
          toast.dismiss();  
          toast.success(t(strings.updateSuccess));
          return true;
        }
        toast.error(result.message);
        return false;
      } catch (err) {
        toast.error(t(strings.updateFail));
        return false;
      }
    };
    return submitUpdateTreatment();
  }

  // Select Date
  const handleOnDateChange = (date) => {
    setDate(date._d);
  };
  const handleOnStatusChange = async (evt) => {
    setSelectedStatus(evt.target.value)
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <div className={classes.stepContent}>
            <h1>{t(strings.selectTreatment)}</h1>
            <Grid
              item
              container
              md={8}
              sm={6}
              xs={12}
              className={classes.selectProviderAssistant}
              spacing={2}
            >
                {/* Date */}
                <Grid
                    item
                    md={6}
                    sm={12}
                    xs={12}
                className={classes.selectDate}
                >
                <DatePicker
                    label={t(strings.date)}
                    id="treatment-date"
                    margin="dense"
                    inputVariant="outlined"
                    size="small"
                    fullWidth
                    format={strings.defaultDateFormat}
                    value={date}
                    onChange={() => {}}
                    onAccept={handleOnDateChange}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    helperText={dateErrMsg}
                    error={Boolean(dateErrMsg)}
                />
                </Grid>
                {/* status */}
                <Grid
                item
                md={6}
                sm={12}
                xs={12}
                className={classes.selectProcedure}
                >
                <InputLabel shrink id="treatment-status">
                    {t(strings.status)}
                </InputLabel>
                <Select
                    labelId="treatment-status"
                    id="treatment-status"
                    className={classes.select}
                    margin="dense"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={selectedStatus || "--Select--"}
                    onChange={handleOnStatusChange}
                >
                    <MenuItem key="1" value="PLAN">
                        {"PLAN"}
                    </MenuItem>
                    <MenuItem key="2" value="CANCEL">
                        {"CANCEL"}
                    </MenuItem>
                    <MenuItem key="3" value="COMPLETED">
                        {"COMPLETED"}
                    </MenuItem>
                </Select>
                </Grid>
            </Grid>
            {/* Select Provider/Assistant */}
            <Grid
              item
              container
              md={8}
              sm={6}
              xs={12}
              className={classes.selectProviderAssistant}
              spacing={2}
            >
              {/* Provider */}
              <Grid
                item
                md={6}
                sm={12}
                xs={12}
                className={classes.selectProvider}
              >
                <FormControl
                  color="secondary"
                  className={classes.asyncSelectFormControl}
                >
                  <label
                    htmlFor="treatment-provider"
                    className={classes.autocompleteLabel}
                  >
                    {t(strings.provider)}
                  </label>
                  <AsyncSelect
                    inputId="treatment-provider"
                    item
                    cacheOptions
                    defaultOptions
                    //loadOptions={loadProviderOptions}
                    styles={asyncSelectStyle}
                    placeholder={t(strings.select) + " " + t(strings.provider)}
                    noOptionsMessage={() => t(strings.noOptions)}
                    value={provider || null}
                    isDisabled
                    // onChange={handleOnProviderChange}
                  />
                  {Boolean(providerErrMsg) && (
                    <FormHelperText
                      className={classes.formMessageFail}
                      error={true}
                    >
                      {t(providerErrMsg)}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              {/* Assistant */}
              <Grid item md={6} sm={12} xs={12}>
                <FormControl
                  color="secondary"
                  className={classes.asyncSelectFormControl}
                >
                  <label
                    htmlFor="treatment-assistant"
                    className={classes.autocompleteLabel}
                  >
                    {t(strings.assistant)}
                  </label>
                  <AsyncSelect
                    inputId="treatment-assistant"
                    item
                    cacheOptions
                    defaultOptions
                    //loadOptions={loadAssistantOptions}
                    styles={asyncSelectStyle}
                    placeholder={t(strings.select) + " " + t(strings.assistant)}
                    noOptionsMessage={() => t(strings.noOptions)}
                    value={assistant || null}
                    isDisabled
                    // onChange={handleOnAssistantChange}
                  />
                </FormControl>
              </Grid>
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
                // onChange={handleOnProcedureChange}
                error={Boolean(procedureErrMsg)}
                helperText={procedureErrMsg}
                disabled
              >
                  {selectedProcedure && (<MenuItem key={selectedProcedure.id} value={selectedProcedure}>
                      {selectedProcedure.procedure_code} ({selectedProcedure.description})
                    </MenuItem>)}
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
                value={treatmentNote}
                multiline
                rows={5}
                rowsMax={10}
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
                toothSelectedSurfaces={selectedTooth_Raw}
                toothNotes={toothNotes}
                selectedTooth={selectedTooth}
                onSelectTooth={handleSelectToothQuickselect}
                viewType="add-treatment"
              ></AdultToothChart>
            </span>
          </div>
        );
      case 2:
        return (
          <div className={classes.stepContent}>
            <h1>{t(strings.reviewTreatmentInfo)}</h1>
            <Grid item md={8} sm={6} xs={12}>
              <div>
                {t(strings.treatment)}: ({selectedProcedure.procedure_code}) {selectedProcedure.description}
              </div>
              <div>
                {t(strings.date)}:{" "}
                {ConvertDateTimes.formatDate(date, strings.defaultDateFormat)}
              </div>
              <div>
                {t(strings.status)}:{" "}
                {selectedStatus}
              </div>
              <div>
                {t(strings.provider)}: {provider.label}
              </div>
              <div>
                {t(strings.assistant)}: {assistant?.label}
              </div>
              <div className={classes.treatmentNote}>
                {t(strings.note)}:{" "}
                {treatmentNote === "" ? "None" : treatmentNote}
              </div>
              <div className={classes.selectedToothDisplay}>
                {t(strings.selectedTooth)}: {selectedTooth_Display}
              </div>
            </Grid>
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
                <h1>{t(strings.allStepsCompleted)}</h1>
                <Button onClick={handleReset} className={classes.button}>
                  {t(strings.reset)}
                </Button>
                <Button
                  onClick={() =>
                    history.push(
                      path.patientProfilePath.replace(":patientID", patientID)
                    )
                  }
                  className={classes.button}
                  variant="contained"
                  color="primary"
                >
                  {t(strings.back)}
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

export default UpdateTreatmentPage;
