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
    "& .PENDING": {
      backgroundColor: theme.successColor[1],
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
    backgroundImage:
      "repeating-linear-gradient(60deg,transparent,transparent 2px,#aaaaaa,#aaaaaa 5px)",
  },
});
const useStyles = makeStyles(styles);

const TransactionItem = ({ data, onUpdate, onDelete }) => {
  const { t, i18n } = useTranslation();
  const classes = useStyles();

  // Others
  const emptyStr = "...";

  function generateTransactionTitle() {
    let fullTransactionTitle =
      (data.status === "PENDING" ? "["+t(strings.PENDING)+"] " : "") +
      t(strings.createdBy) +
      ": " +
      (
        data.provider?.user?.first_name +
        " " +
        data.provider?.user?.last_name
      ).trim();
    fullTransactionTitle +=
      "  |  " + t(strings.totalAmount) + ": $" + data.amount;
    return fullTransactionTitle.trim();
  }

  function renderTreatmentList(treatmentList) {
    if (!treatmentList) {
      return "";
    }
    let lis = [];
    treatmentList.forEach((treatment) => {
      lis.push(
        <li>
          {t(strings.treatment)}: <b>{treatment.ada_code || emptyStr}</b>
          <ul>
            <li>
              {t(strings.description)}: {treatment.description}
            </li>
            <li>
              {t(strings.fee)}: ${treatment.fee?.$numberDecimal}
            </li>
            <li>
              {t(strings.date)}:{" "}
              {ConvertDateTimes.formatDate(
                treatment.treatment_date,
                strings.defaultDateFormat
              )}
            </li>
            {treatment.tooth && (
              <li>
                {t(strings.tooth)}: {treatment.tooth}
              </li>
            )}
            {treatment.surface && (
              <li>
                {t(strings.surface)}: {treatment.surface}
              </li>
            )}
          </ul>
        </li>
      );
    });
    return <ul>{[...lis]}</ul>;
  }

  return (
    <div className={classes.historyItemContainer}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
          className={
            data.status === "PENDING"
              ? "PENDING"
              : clsx(data.is_delete && classes.deletedPayment)
          }
        >
          <span className={classes.historyItemContent}>
            {generateTransactionTitle()}
          </span>
          <span>
            <span className={classes.historyItemTime}>
              {ConvertDateTimes.formatDate(
                data.transaction_date,
                strings.defaultDateFormat
              )}{" "}
            </span>
          </span>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <div>
            <div>
              {t(strings.transactionDate)}:{" "}
              {ConvertDateTimes.formatDate(
                data.transaction_date,
                strings.defaultDateFormat
              )}
            </div>
            <div>
              {t(strings.createdBy)}:{" "}
              {data.provider?.user?.first_name +
                " " +
                data.provider?.user?.last_name}
            </div>
            <div>
              {t(strings.amount)}: <b>${data.amount}</b>
            </div>
            <div>
              {t(strings.paid)}: ${data.paid_amount}
            </div>
            <div>
              {t(strings.changeMoney)}: ${data.return_amount}
            </div>
            <div>
              {t(strings.type)}:{" "}
              {data.mode == "MOMO" ? t(strings.momo) : t(strings.cash)}
            </div>
            <div>
              {t(strings.note)}: {data.note || "..."}
            </div>
            {data.mode == "MOMO" && data.status !== "DELETED" ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <img
                  src={data.qr_code}
                  alt="QR Code"
                  style={{ height: 300, width: 300 }}
                ></img>
              </div>
            ) : null}
            {t(strings.treatments)}:{renderTreatmentList(data.treatment_list)}
          </div>
        </AccordionDetails>
        <Divider />
        {!data.is_delete ? (
          <AccordionActions>
            <Button
              size="small"
              color="secondary"
              variant="outlined"
              onClick={onDelete}
            >
              {t(strings.btnDelete)}
            </Button>
            <Button
              size="small"
              color="primary"
              variant="contained"
              onClick={onUpdate}
            >
              {t(strings.update)}
            </Button>
          </AccordionActions>
        ) : null}
      </Accordion>
    </div>
  );
};

export default TransactionItem;
