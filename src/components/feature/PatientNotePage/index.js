import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { toast } from "react-toastify";

// @material-ui/core Component
import Container from "@material-ui/core/Container";
import styles from "./jss";
import strings from "../../../configs/strings";
import Typography from "@material-ui/core/Typography";
import logoADC from "../../../assets/images/logoADC.png";
// use i18next
import { useTranslation, Trans } from "react-i18next";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  TextField,
} from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import BackspaceIcon from "@material-ui/icons/Backspace";

// Component
import PopupChat from "../../common/Messenger/PopupChat";
import NoteItem from "./NoteItem.js";
import TreatmentMenu from "../../../layouts/TreatmentMenu";

import ProgressNoteService from "../../../api/patient/progress-note.service";

const useStyles = makeStyles(styles);

const PatientNotePage = ({ patientID }) => {
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  const [notes, setNotes] = useState([]);

  const [openInsertDialog, setOpenInsertDialog] = React.useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = React.useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [insertNoteTitle, setInsertNoteTitle] = React.useState("");
  const [insertNoteTooth, setInsertNoteTooth] = React.useState("");
  const [insertNoteSurface, setInsertNoteSurface] = React.useState("");
  const [insertNoteContent, setInsertNoteContent] = React.useState("");
  const [updateNoteTitle, setUpdateNoteTitle] = React.useState("");
  const [updateNoteTooth, setUpdateNoteTooth] = React.useState("");
  const [updateNoteSurface, setUpdateNoteSurface] = React.useState("");
  const [updateNoteContent, setUpdateNoteContent] = React.useState("");
  const [currUpdateNoteID, setCurrUpdateNoteID] = React.useState("");

  const handleChangeInsertNoteTitle = (e) => {
    setInsertNoteTitle(e.target.value);
  };
  const handleChangeInsertNoteTooth = (e) => {
    setInsertNoteTooth(e.target.value);
  };
  const handleChangeInsertNoteSurface = (e) => {
    setInsertNoteSurface(e.target.value);
  };
  const handleChangeInsertNoteContent = (e) => {
    setInsertNoteContent(e.target.value);
  };
  const handleChangeUpdateNoteTitle = (e) => {
    setUpdateNoteTitle(e.target.value);
  };
  const handleChangeUpdateNoteTooth = (e) => {
    setUpdateNoteTooth(e.target.value);
  };
  const handleChangeUpdateNoteSurface = (e) => {
    setUpdateNoteSurface(e.target.value);
  };
  const handleChangeUpdateNoteContent = (e) => {
    setUpdateNoteContent(e.target.value);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const result = await ProgressNoteService.getPatientProgressNote(
        patientID
      );
      if (result.success) {
        setNotes(result.data);
        return true;
      }
      toast.error(result.message);
      return false;
    } catch (err) {
      toast.error(t(strings.errorLoadData));
      return false;
    }
  };

  const insertNote = async (title, tooth, surface, content) => {
    try {
      const result = await ProgressNoteService.insert({
        patient: patientID,
        title: title,
        tooth: tooth,
        surface: surface,
        content: content ? content : "No content.",
      });
      if (result.success) {
        fetchNotes();
        return true;
      }
      toast.error(result.message);
      return false;
    } catch (err) {
      toast.error(t(strings.insertFail));
      return false;
    }
  };
  const updateNote = async (noteID, title, tooth, surface, content) => {
    try {
      const result = await ProgressNoteService.update(noteID, {
        patient: patientID,
        title: title,
        tooth: tooth,
        surface: surface,
        content: content ? content : "No content.",
      });
      if (result.success) {
        fetchNotes();
        return true;
      }
      toast.error(result.message);
      return false;
    } catch (err) {
      toast.error(t(strings.updateFail));
      return false;
    }
  };
  const deleteNote = async (noteID) => {
    try {
      const result = await ProgressNoteService.delete(noteID);
      if (result.success) {
        fetchNotes();
        return true;
      }
      toast.error(result.message);
      return false;
    } catch (err) {
      toast.error(t(strings.deleteFail));
      return false;
    }
  };

  const handleClickOpenInsertDialog = () => {
    setOpenInsertDialog(true);
  };

  const handleCloseInsertDialog = () => {
    setOpenInsertDialog(false);
  };
  const handleSaveInsertDialog = () => {
    insertNote(
      insertNoteTitle,
      insertNoteTooth,
      insertNoteSurface,
      insertNoteContent
    );
    setOpenInsertDialog(false);
  };
  const handleClickOpenUpdateDialog = (noteID) => {
    setOpenUpdateDialog(true);
    setCurrUpdateNoteID(noteID);
  };

  const handleCloseUpdateDialog = () => {
    setOpenUpdateDialog(false);
    setCurrUpdateNoteID("");
  };
  const handleSaveUpdateDialog = () => {
    updateNote(
      currUpdateNoteID,
      updateNoteTitle,
      updateNoteTooth,
      updateNoteSurface,
      updateNoteContent
    );
    setOpenUpdateDialog(false);
    setCurrUpdateNoteID("");
  };

  const handleUpdateNote = (noteID, title, tooth, surface, content) => {
    setUpdateNoteTitle(title);
    setUpdateNoteTooth(tooth);
    setUpdateNoteSurface(surface);
    setUpdateNoteContent(content);
    handleClickOpenUpdateDialog(noteID);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setCurrUpdateNoteID("");
  };
  const handleDeleteNote = (noteID) => {
    setOpenDeleteDialog(true);
    setCurrUpdateNoteID(noteID); //////// attention
  };

  function approveDeleteNote() {
    deleteNote(currUpdateNoteID);
    setOpenDeleteDialog(false);
    setCurrUpdateNoteID("");
  }

  return (
    <React.Fragment>
      <TreatmentMenu patientID={patientID} />
      <Container className={classes.container}>
        <PopupChat></PopupChat>
        <div className={classes.headerContainer}>
          <Typography
            component="h1"
            variant="h5"
            className={classes.loginTitle}
          >
            {t(strings.note)}
          </Typography>
          <Button
            simple
            className={classes.btnAddRecord}
            onClick={handleClickOpenInsertDialog}
          >
            <AddCircleOutlineIcon></AddCircleOutlineIcon> {t(strings.addRecord)}
          </Button>
        </div>
        <div className={classes.noteContainer}>
          {notes.map((noteItem, index) => {
            return (
              <NoteItem
                key={index}
                noteID={noteItem._id}
                noteTitle={noteItem.title}
                noteTooth={noteItem.tooth}
                noteSurface={noteItem.surface}
                noteTime={noteItem.updatedAt}
                noteContent={noteItem.content}
                handleDeleteNote={() => {
                  handleDeleteNote(noteItem._id);
                }}
                handleUpdateNote={() => {
                  handleUpdateNote(
                    noteItem._id,
                    noteItem.title,
                    noteItem.tooth,
                    noteItem.surface,
                    noteItem.content
                  );
                }}
              ></NoteItem>
            );
          })}
        </div>
        <Dialog
          open={openInsertDialog}
          onClose={handleCloseInsertDialog}
          aria-labelledby="form-dialog-title"
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle id="form-dialog-title">{t(strings.addNote)}</DialogTitle>
          <DialogContent dividers>
            {/* <DialogContentText>
                {t(strings.title)}
            </DialogContentText> */}
            <TextField
              value={insertNoteTitle}
              onChange={handleChangeInsertNoteTitle}
              autoFocus
              margin="dense"
              id="title"
              label={t(strings.title)}
              fullWidth
            />
            <TextField
              value={insertNoteTooth}
              onChange={handleChangeInsertNoteTooth}
              margin="dense"
              id="tooth"
              label={t(strings.tooth)}
            />{" "}
            {"  "}
            <TextField
              value={insertNoteSurface}
              onChange={handleChangeInsertNoteSurface}
              margin="dense"
              id="surface"
              label={t(strings.surface)}
            />
            <TextField
              required
              value={insertNoteContent}
              onChange={handleChangeInsertNoteContent}
              className={classes.noteContentInput}
              id="outlined-multiline-static"
              label={t(strings.content)}
              multiline
              rows={10}
              variant="outlined"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseInsertDialog} color="secondary">
              {t(strings.cancel)}
            </Button>
            <Button onClick={handleSaveInsertDialog} color="primary">
              {t(strings.save)}
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openUpdateDialog}
          onClose={handleCloseUpdateDialog}
          aria-labelledby="form-dialog-title"
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle id="form-dialog-title">
            {t(strings.updateNote)}
          </DialogTitle>
          <DialogContent dividers>
            {/* <DialogContentText>
                {t(strings.title)}
            </DialogContentText> */}
            <TextField
              value={updateNoteTitle}
              onChange={handleChangeUpdateNoteTitle}
              autoFocus
              margin="dense"
              id="title"
              label={t(strings.title)}
              fullWidth
            />
            <TextField
              value={updateNoteTooth}
              onChange={handleChangeUpdateNoteTooth}
              margin="dense"
              id="tooth"
              label={t(strings.tooth)}
            />{" "}
            {"  "}
            <TextField
              value={updateNoteSurface}
              onChange={handleChangeUpdateNoteSurface}
              margin="dense"
              id="surface"
              label={t(strings.surface)}
            />
            <TextField
              required
              value={updateNoteContent}
              onChange={handleChangeUpdateNoteContent}
              className={classes.noteContentInput}
              id="outlined-multiline-static"
              label={t(strings.content)}
              multiline
              rows={10}
              variant="outlined"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseUpdateDialog} color="secondary">
              {t(strings.cancel)}
            </Button>
            <Button onClick={handleSaveUpdateDialog} color="primary">
              {t(strings.save)}
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          onClose={handleCloseDeleteDialog}
          open={openDeleteDialog}
          className={classes.dialog}
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {t(strings.deleteConfirmMessage)}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteDialog} color="secondary">
              {t(strings.no)}
            </Button>
            <Button
              onClick={() => approveDeleteNote()}
              color="primary"
              autoFocus
            >
              {t(strings.yes)}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </React.Fragment>
  );
};

export default PatientNotePage;
