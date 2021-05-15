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

export default function MacroCheckSelectDialog({
  onClose,
  open,
  title,
  selected,
}) {
  const [selectedList, setSelectedList] = useState(selected ? selected : []);
  const [selectedMap, setSelectedMap] = useState({});
  const [data, setData] = useState([]);
  const [medValue, setMedValue] = useState(selected);
  const { t, i18n } = useTranslation();
  const onLoad = async () => {
    try {
      const result = await TemplateService.getMedicalAlertTemplate();
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
    onLoad();
  }, []);

  React.useEffect(() => {
    const selectedListValue = selected ? selected.split(/[;\n]/) : [];
    let selectedSplit = [];
    for (const selectedValue of selectedListValue) {
      selectedSplit.push(selectedValue.trim());
    }
    setSelectedList(selectedSplit);
    let selectedMapValue = {};
    for (const selectedValue of selectedSplit) {
      selectedMapValue[selectedValue] = true;
    }
    setSelectedMap(selectedMapValue);
    let medValueResult = medValue.trim();
    for (const medMacro of data) {
      medValueResult = medValueResult.replaceAll(medMacro.content, "");
    }
    medValueResult = medValueResult.replace(/^;\s*|;\s*$/g, "");
    setMedValue(medValueResult);
  }, [open]);

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    let medValueResult = medValue;
    for (const medValueContent of selectedList) {
      medValueResult = medValueResult + "; " + medValueContent;
    }
    medValueResult = medValueResult.replace(/^;\s*|;\s*$/g, "");
    onClose(medValueResult);
  };

  const handleChange = (event) => {
    if (selectedList.includes(event.target.value)) {
      const index = selectedList.indexOf(event.target.value);
      let list = selectedList.slice(0, index);
      list = list.concat(selectedList.slice(index + 1));
      setSelectedList(list);
      let selectedMapValue = Object.assign({}, selectedMap);
      selectedMapValue[event.target.value] = false;
      setSelectedMap(selectedMapValue);
    } else {
      let list = [...selectedList.slice()];
      list.push(event.target.value);
      setSelectedList(list);
      let selectedMapValue = Object.assign({}, selectedMap);
      selectedMapValue[event.target.value] = true;
      setSelectedMap(selectedMapValue);
    }
  };
  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="sm"
      aria-labelledby="confirmation-dialog-title"
      open={open}
      onClose={handleCancel}
    >
      <DialogTitle id="confirmation-dialog-title">{title}</DialogTitle>
      <DialogContent dividers>
        <Grid container justify="space-between">
          {data.map((macro) => (
            <Grid item sm={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedMap[macro.content]}
                    onChange={handleChange}
                    name={macro.content}
                    color="primary"
                  />
                }
                value={macro.content}
                key={macro._id}
                label={macro.content}
              />
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={handleCancel}
          color="secondary"
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
