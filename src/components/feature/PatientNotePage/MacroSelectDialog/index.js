import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Checkbox, Grid } from "@material-ui/core";
import { useTranslation, Trans } from "react-i18next";
import { toast } from "react-toastify";
import strings from "../../../../configs/strings";
import TemplateService from "../../../../api/template/template.service";

export default function MacroSelectDialog({ onClose, open, title, currentContent }) {
  const [data, setData] = useState([]);
  const [value, setValue] = useState(currentContent);
  const { t, i18n } = useTranslation();
  const radioGroupRef = React.useRef(null);
  const onLoad = async () => {
    try {
      const result = await TemplateService.getProgressNoteTemplate();
      if (result.success) {
        setData(result.payload);
        return true;
      }
      toast.error(result.message);
      return false;
    } catch (err) {
      toast.error(t(strings.errorLoadData));
      return false;
    }
  };
  useEffect(() => {
    setValue(currentContent);
  }, [open]);
  useEffect(() => {
    onLoad();
  }, []);
  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };
  const handleCancel = () => {
    onClose();
  };
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleOk = () => {
    onClose(value);
  };
  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="sm"
      onEntering={handleEntering}
      aria-labelledby="confirmation-dialog-title"
      open={open}
      onClose={handleCancel}
    >
      <DialogTitle id="confirmation-dialog-title">{title}</DialogTitle>
      <DialogContent dividers>
        <List>
          <RadioGroup
            ref={radioGroupRef}
            aria-label="ringtone"
            name="ringtone"
            value={value}
            onChange={handleChange}
          >
            {data.map((macro) => (
              <div>
                <ListItem button key={macro._id} divider>
                  <FormControlLabel
                    value={macro.content}
                    control={<Radio />}
                    label={macro.content}
                  />
                </ListItem>
              </div>
            ))}
          </RadioGroup>
        </List>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={handleCancel}
          color="primary"
          variant="outlined"
        >
          {t(strings.cancel)}
        </Button>
        <Button onClick={handleOk} color="primary" variant="contained">
          {t(strings.ok)}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
