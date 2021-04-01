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
// use i18next
import { useTranslation, Trans } from "react-i18next";

//import styles from "./jss";
import strings from "../../../configs/strings";

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
});
const useStyles = makeStyles(styles);

const NoteItem = ({ noteTitle, noteTime, noteContent }) => {
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  return (
    <div className={classes.historyItemContainer}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <span className={classes.historyItemContent}>{noteTitle}</span>
          <span>
            <span className={classes.historyItemTime}>{noteTime} </span>
            {/* <span className={classes.btnDelete}>
              <Button>
                <BackspaceIcon></BackspaceIcon>
              </Button>
            </span> */}
          </span>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          {noteContent}
        </AccordionDetails>
        <Divider />
        <AccordionActions>
          <Button size="small" color="secondary">
            {t(strings.btnDelete)}
          </Button>
          <Button size="small" color="primary">
            {t(strings.save)}
          </Button>
          <Button size="small">{t(strings.cancel)}</Button>
        </AccordionActions>
      </Accordion>
    </div>
  );
};

export default NoteItem;
