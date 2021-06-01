import React, { useState, useEffect, useRef, useCallback} from 'react';
import { makeStyles, useTheme  } from "@material-ui/core/styles";
import strings from '../../../configs/strings';

// i18next
import { useTranslation } from 'react-i18next';

// Toast

// @material-ui/core Component
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: theme.appointUpdatePayDialogWidth,
    maxWidth: '100%',
    maxHeight: theme.appointUpdatePayDialogMaxHeight
  },
  dialogTitle: {
    fontWeight: 700,
    textAlign: 'center'
  },
  dataGrid: {
    '& .MuiDataGrid-colCellTitle': {
      fontWeight: 600
    },
    '& .MuiDataGrid-colCellTitleContainer': {
      justifyContent: 'flex-start'
    }
  }
}));

const UpdatePayDialog = ({
  open, transaction,
  onClose, onUpdate
}) => {
  const classes = useStyles();
  const [t, i18n] = useTranslation();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // States
  const [note, setNote] = useState("");

  // use effect
  useEffect(() => {
    if (transaction){
        setNote(transaction.note || "");
    }
  }, [transaction])

  const handleOnClose = () => {

    onClose();
  }

  const handleOnUpdate = () => {
    onUpdate(transaction._id, note);
  }

  const handleOnNoteChange = (evt) => {
    setNote(evt.target.value);
  }

  return (
    <Paper>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleOnClose}
        aria-labelledby="update-payment-dialog-title"
        classes={{ 
          paper: classes.paper,
        }}
      >
        <DialogTitle id="update-payment-dialog-title" className={classes.dialogTitle}>{t(strings.update) + " " + t(strings.payment)}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <TextField
                label={t(strings.note)}
                id="payment-note"
                className={classes.textField}
                margin="dense"
                variant="outlined"
                size="small"
                fullWidth
                type="text"
                multiline
                rows={5}
                onChange={handleOnNoteChange}
                InputLabelProps={{
                    shrink: true
                }}
                value={note}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleOnClose} color="secondary" variant="outlined" autoFocus>
            {t(strings.cancel)}
          </Button>
          <Button onClick={handleOnUpdate} color="primary" variant="contained">
            {t(strings.ok)}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

export default UpdatePayDialog;