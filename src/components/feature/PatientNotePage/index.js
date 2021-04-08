import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

// @material-ui/core Component
import Container from "@material-ui/core/Container";
import styles from "./jss";
import strings from "../../../configs/strings";
import Typography from "@material-ui/core/Typography";
import logoADC from "../../../assets/images/logoADC.png";
// use i18next
import { useTranslation, Trans } from "react-i18next";
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import BackspaceIcon from "@material-ui/icons/Backspace";

// Component
import PopupChat from "../../common/Messenger/PopupChat";
import NoteItem from "./NoteItem.js";
import TreatmentMenu from '../../../layouts/TreatmentMenu';

const noteData = [
  {
    noteTitle: "10, Missing",
    noteTime: "FEBRUARY 28,2021",
    noteContent: strings.aboutUsContent
  },
  {
    noteTitle: "11, Missing",
    noteTime: "FEBRUARY 27,2021",
    noteContent: strings.aboutUsContent
  },
  {
    noteTitle: "12, Missing",
    noteTime: "FEBRUARY 27,2021",
    noteContent: strings.aboutUsContent
  },
//   {
//     noteTitle: "13, Missing",
//     noteTime: "FEBRUARY 27,2021",
//     noteContent: strings.aboutUsContent
//   },
//   {
//     noteTitle: "14, Missing",
//     noteTime: "FEBRUARY 28,2021",
//     noteContent: strings.aboutUsContent
//   },
//   {
//     noteTitle: "15, Missing",
//     noteTime: "FEBRUARY 27,2021",
//     noteContent: strings.aboutUsContent
//   },
//   {
//     noteTitle: "16, Missing",
//     noteTime: "FEBRUARY 27,2021",
//     noteContent: strings.aboutUsContent
//   },
//   {
//     noteTitle: "17, Missing",
//     noteTime: "FEBRUARY 27,2021",
//     noteContent: strings.aboutUsContent
//   },
//   {
//     noteTitle: "18, Missing",
//     noteTime: "FEBRUARY 28,2021",
//     noteContent: strings.aboutUsContent
//   },
//   {
//     noteTitle: "19, Missing",
//     noteTime: "FEBRUARY 27,2021",
//     noteContent: strings.aboutUsContent
//   },
//   {
//     noteTitle: "20, Missing",
//     noteTime: "FEBRUARY 27,2021",
//     noteContent: strings.aboutUsContent
//   },
//   {
//     noteTitle: "21, Missing",
//     noteTime: "FEBRUARY 27,2021",
//     noteContent: strings.aboutUsContent
//   },
];

const useStyles = makeStyles(styles);

const PatientNotePage = ({ patientID }) => {
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  return (  <React.Fragment>
    <TreatmentMenu patientID = { patientID }/>
    <Container className={classes.container}>
      <PopupChat></PopupChat>
      <div className={classes.headerContainer}>
        <Typography component="h1" variant="h5" className={classes.loginTitle}>
          {t(strings.note)}
        </Typography>
        <Button simple className={classes.btnAddRecord}>
          <AddCircleOutlineIcon></AddCircleOutlineIcon> {t(strings.addRecord)}
        </Button>
      </div>
      <div className={classes.noteContainer}>
        {noteData.map((historyItem, index) => {
          return (
            <NoteItem
              key={index}
              noteTitle={historyItem.noteTitle}
              noteTime={historyItem.noteTime}
              noteContent={historyItem.noteContent}
            ></NoteItem>
          );
        })}
      </div>
    </Container></React.Fragment>
  );
};

export default PatientNotePage;
