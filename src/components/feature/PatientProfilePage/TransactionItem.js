import Button from "@material-ui/core/Button";
import clsx from "clsx";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionActions from "@material-ui/core/AccordionActions";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Divider from "@material-ui/core/Divider";
import { makeStyles, useTheme } from "@material-ui/core/styles";
// use i18next
import { useTranslation } from "react-i18next";

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
  deletedPayment: {
    backgroundImage: 'repeating-linear-gradient(60deg,transparent,transparent 2px,#aaaaaa,#aaaaaa 5px)'
  }
});
const useStyles = makeStyles(styles);

const TransactionItem = ({
  data
}) => {
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  
  // Others
  const emptyStr = "...";

  function generateTransactionTitle() {
    let fullTransactionTitle = t(strings.provider) + ": " + (data.provider?.user?.first_name + " " + data.provider?.user?.last_name).trim();
    fullTransactionTitle += "  |  " + t(strings.totalAmount) + ": $" + data.amount;
    return fullTransactionTitle.trim();
  }

  function parseSelectedTooth(treatmentSelectedTooth) {
    if (!treatmentSelectedTooth){
      return "";
    }
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
    return displayString;
  }

  function renderTreatmentList(treatmentList){
    if (!treatmentList){
      return "";
    }
    let lis = [];
    treatmentList.forEach((treatment) => {
      lis.push(
        <li>
          {t(strings.treatment)}: <b>{treatment.ada_code || emptyStr}</b>
          <ul>
            <li>{t(strings.description)}: {treatment.description}</li>
            <li>{t(strings.fee)}: ${treatment.fee?.$numberDecimal}</li>
            <li>{t(strings.date)}: {ConvertDateTimes.formatDate(treatment.treatment_date, strings.defaultDateTimeFormat)}</li>
            {treatment.tooth && <li>{t(strings.tooth)}: {treatment.tooth}</li>}
            {treatment.surface && <li>{t(strings.surface)}: {treatment.surface}</li>}
          </ul>
        </li>
      );
    });
    return <ul>{[...lis]}</ul>
  }

  return (
    <div className={classes.historyItemContainer}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
          className={clsx(data.is_deleted && classes.deletedPayment)}
        >
          <span className={classes.historyItemContent}>
            {generateTransactionTitle()}
          </span>
          <span>
            <span className={classes.historyItemTime}>
              {ConvertDateTimes.formatDate(
                data.transaction_date,
                strings.defaultDateTimeFormat
              )}{" "}
            </span>
          </span>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
            <div>
                <div>
                {t(strings.date)}: {ConvertDateTimes.formatDate(
                    data.transaction_date,
                    strings.defaultDateTimeFormat
                )}
                </div>
                <div>
                {t(strings.provider)}: {data.provider?.user?.first_name + " " + data.provider?.user?.last_name}
                </div>
                <div>
                {t(strings.amount)}: <b>${data.amount}</b>
                </div>
                <div>
                {t(strings.paid)}: ${data.paid_amount} 
                </div>
                <div>
                {t(strings.returned)}: ${data.return_amount} 
                </div>
                <div>
                {t(strings.note)}: {data.note || "..."} 
                </div>
                {t(strings.treatments)}:
                {renderTreatmentList(data.treatment_list)}
            </div>
        </AccordionDetails>
        <Divider />
        <AccordionActions>
          <Button size="small" color="secondary" variant="outlined">
            {t(strings.btnDelete)}
          </Button>
          <Button size="small" color="primary" variant="contained">
            {t(strings.update)}
          </Button>
        </AccordionActions>
      </Accordion>
    </div>
  );
};

export default TransactionItem;
