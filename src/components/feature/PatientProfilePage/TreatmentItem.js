import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import BackspaceIcon from "@material-ui/icons/Backspace";
import clsx from "clsx";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionActions from "@material-ui/core/AccordionActions";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Chip from "@material-ui/core/Chip";
import Divider from "@material-ui/core/Divider";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useParams, useHistory } from "react-router-dom";
// use i18next
import { useTranslation, Trans } from "react-i18next";

import path from "../../../routes/path";
//import styles from "./jss";
import strings from "../../../configs/strings";
// utils
import ConvertDateTimes from "../../../utils/datetimes/convertDateTimes";

const styles = (theme) => ({
  historyItemContainer: {
    color: theme.whiteColor,
    marginTop: "0.7rem",
    marginBottom: "0.7rem",
    "& .MuiAccordionSummary-root": {
      borderRadius: "0.3rem",
      backgroundColor: theme.primaryColor[3],
      color: theme.whiteColor,
      "& .MuiAccordionSummary-content": {
        display: "flex",
        justifyContent: "space-between",
      },
      "& .MuiIconButton-label": {
        color: theme.whiteColor,
      },
    },
  },
  historyItemTime: {
    //float: "right",
  },
  btnDelete: {
    //float: "right",
    "& $button": {
      color: theme.dangerColor[2] + " !important",
    },
    //marginTop: theme.spacing(-1),
  },
  treatmentNote: {
    whiteSpace: "pre-wrap",
  },

  selectedToothDisplay: {
    whiteSpace: "pre-wrap",
  },
});
const useStyles = makeStyles(styles);

const TreatmentItem = ({
  patientID,
  treatmentID,
  treatmentTime,
  treatmentProvider,
  treatmentAssistant,
  treatmentProcedure,
  treatmentDescription,
  treatmentNote,
  treatmentToothShort,
  treatmentSelectedTooth /*handleUpdateNote, handleDeleteNote*/,
}) => {
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  const history = useHistory();

  function generateTreatmentTitle() {
    let fullTreatmentTitle = treatmentProcedure;
    fullTreatmentTitle += treatmentToothShort ? " | " + treatmentToothShort : "";
    fullTreatmentTitle += " ("+t(strings.provider)+": " + (treatmentProvider.first_name + " " + treatmentProvider.last_name).trim() + ")";
    return fullTreatmentTitle.trim();
  }
  function parseSelectedTooth() {
    let displayString = "";
    treatmentSelectedTooth.forEach((tooth) => {
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
    return displayString
  }
  return (
    <div className={classes.historyItemContainer}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <span className={classes.historyItemContent}>
            {generateTreatmentTitle()}
          </span>
          <span>
            <span className={classes.historyItemTime}>
              {ConvertDateTimes.formatDate(
                treatmentTime,
                strings.defaultDateTimeFormat
              )}{" "}
            </span>
          </span>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
            <div>
                <div>
                {t(strings.treatment)}: {treatmentProcedure}
                </div>
                <div>
                {t(strings.description)}: {treatmentDescription}
                </div>
                <div>
                {t(strings.date)}:{" "}
                {ConvertDateTimes.formatDate(
                    treatmentTime,
                    strings.defaultDateTimeFormat
                )}
                </div>
                <div>
                {t(strings.provider)}: {treatmentProvider.first_name + " " + treatmentProvider.last_name}
                </div>
                <div>
                {t(strings.assistant)}: {treatmentAssistant ? treatmentAssistant.first_name + " " + treatmentAssistant.last_name : t(strings.none)}
                </div>
                <div className={classes.treatmentNote}>
                {t(strings.note)}: {treatmentNote === "" ? t(strings.none) : treatmentNote}
                </div>
                <div className={classes.selectedToothDisplay}>
                { treatmentSelectedTooth && t(strings.selectedTooth) + ": " + parseSelectedTooth()}
                </div>
            </div>
        </AccordionDetails>
        <Divider />
        <AccordionActions>
          {/* <Button size="small" color="secondary">
            {t(strings.btnDelete)}
          </Button> */}
          <Button size="small" color="primary" onClick={() =>
                    history.push(
                      path.updateTreatmentPath.replace(":patientID", patientID).replace(":treatmentID", treatmentID)
                    )
                  }>
            {t(strings.update)}
          </Button>
        </AccordionActions>
      </Accordion>
    </div>
  );
};

export default TreatmentItem;
