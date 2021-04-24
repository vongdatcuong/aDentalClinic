import React, { useState } from "react";
import strings from '../../../configs/strings';

// i18next
import { useTranslation } from 'react-i18next';

// @material-ui/core
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";

// Service

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: "1.5em",
    fontWeight: "bold",
    textAlign: "center",
  },
  content: {
    minWidth: theme.confirmDialogMinWidth,
    textAlign: "center",
  },
  action: {
    justifyContent: "center",
  },
  button: {
    margin: theme.spacing(1),
  },
  contentText: {
    textAlign: "center",
    wordWrap: "break-word",
  },
}));

const ConfirmDialog = ({open, onClose, action, children}) => {
  const classes = useStyles();
  const [t, i18n] = useTranslation();

  const handleOK = async () => {
    await action();
    onClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="confirm-dialog-title"
      >
        <DialogTitle
          className={classes.title}
          component="h1"
          id="confirm-dialog-title"
        >
          {t(strings.confirm)}
        </DialogTitle>
        <DialogContent className={classes.content}>
          <DialogContentText className={classes.contentText}>
            {children}
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.action}>
          <Button
            onClick={onClose}
            variant="outlined"
            color="secondary"
            className={classes.button}
          >
            {t(strings.cancel)}
          </Button>
          <Button
            onClick={handleOK}
            variant="contained"
            color="primary"
            className={classes.button}
          >
            {t(strings.ok)}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default ConfirmDialog;