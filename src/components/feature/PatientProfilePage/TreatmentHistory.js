import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import BackspaceIcon from "@material-ui/icons/Backspace";
import { makeStyles, useTheme } from "@material-ui/core/styles";
// use i18next
import { useTranslation, Trans } from "react-i18next";

//import styles from "./jss";
import strings from "../../../configs/strings";

const historyData = [
  {
    content: "10, Missing",
    time: "FEBRUARY 28,2021",
  },
  {
    content: "11, Missing",
    time: "FEBRUARY 27,2021",
  },
];

const styles = (theme) => ({
  btnAddRecord: {
    color: theme.primaryColor[0],
    fontWeight: "bold",
    textTransform: "none",
  },
  historyItemContainer: {
    padding: "0.7rem",
    backgroundColor: theme.primaryColor[3],
    color: theme.whiteColor,
    borderRadius: "0.3rem",
    marginTop: "0.7rem",
    marginBottom: "0.7rem",
  },
  historyItemTime: {
    float: "right",
  },
  btnDelete: {
    float: "right",
    "& $button" : {
        color: theme.dangerColor[2] + " !important",
    },
    marginTop: theme.spacing(-1),
  },
});
const useStyles = makeStyles(styles);

const TreatmentHistory = () => {
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  return (
    <span>
      {/* <Button simple className={classes.btnAddRecord}>
        <AddCircleOutlineIcon></AddCircleOutlineIcon> {t(strings.addRecord)}
      </Button> */}
      {historyData.map((historyItem, index) => {
        return (
          <div key={index} className={classes.historyItemContainer}>
            <span className={classes.historyItemContent}>
              {historyItem.content}
            </span>
            <span className={classes.btnDelete}>
              <Button>
                <BackspaceIcon></BackspaceIcon>
              </Button>
            </span>
            <span className={classes.historyItemTime}>{historyItem.time} </span>
          </div>
        );
      })}
    </span>
  );
};

export default TreatmentHistory;
