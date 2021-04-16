import React, { useState, useContext, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import InputAdornment from "@material-ui/core/InputAdornment";

import Input from "@material-ui/core/Input";
import styles from "./jss";
import strings from "../../../configs/strings";
// Toast
import { toast } from "react-toastify";
// Context
import { loadingStore } from "../../../contexts/loading-context";

// use i18next
import { useTranslation, Trans } from "react-i18next";
import { IconButton } from "@material-ui/core";
import ImageService from "../../../api/images/image.service";
import moment from "moment";
const useStyles = makeStyles(styles);
const ImageDialog = ({ open, onClose, patient, onReload, mode, image }) => {
  const { t, i18n } = useTranslation();
  const [fileName, setFileName] = useState("");
  const [name, setName] = useState(image ? image.title : "");
  const [fileData, setFileData] = useState("");
  const [dialogMode, setDialogMode] = useState(mode);
  // Context
  const { loadingState, dispatchLoading } = useContext(loadingStore);
  const handleSelectFile = (evt) => {
    const file = evt.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = async function (e) {
        const base64Value = reader.result;
        console.log(base64Value);
        setFileData(base64Value);
        if (name == null || name == fileName) {
          setName(file.name);
        }
        setFileName(file.name);
      };
    }
  };
  const handleInsertImage = async (patient_id) => {
    let resultData = { success: false };
    try {
      dispatchLoading({ type: strings.setLoading, isLoading: true });
      const data = {
        patient: patient_id,
        data: fileData,
        image_name: name,
        file_name: fileName,
      };
      const result = await ImageService.insert(data);
      if (result.success) {
        toast.success(t(strings.insertSuccess));
      } else {
        toast.error(result.message);
      }
      resultData = result;
    } catch (err) {
      toast.error(t(strings.insertFail));
    } finally {
      dispatchLoading({ type: strings.setLoading, isLoading: false });
    }
    return resultData;
  };
  const handleUpdateImage = async (image_id) => {
    let resultData = { success: false };
    try {
      dispatchLoading({ type: strings.setLoading, isLoading: true });
      const result = await ImageService.update(image_id, name);
      if (result.success) {
        toast.success(t(strings.updateSuccess));
      } else {
        toast.error(result.message);
      }
      resultData = result;
    } catch (err) {
      toast.error(t(strings.updateFail));
    } finally {
      dispatchLoading({ type: strings.setLoading, isLoading: false });
    }
    return resultData;
  };
  const handleClearData = () => {
    setName("");
    setFileName("");
    setFileData("");
  };
  const handleSave = async () => {
    let result = null;
    const reloadMode = mode === true ? "INSERT" : "UPDATE";
    if (mode === true) {
      //Insert
      if (name && fileName && fileData && patient) {
        result = await handleInsertImage(patient);
      }
      else {
        toast.error("Name and File are required");
        return;
      }
    } else {
      //Update
      if (name) {
        result = await handleUpdateImage(image._id, name);
      }
      else {
        toast.error("Name is required");
        return;
      }
    }
    if (result === null) {
      return;
    }
    if (result.success === true) {
      const imageData = {
        _id: result.payload._id,
        src: result.payload.image_path,
        title: result.payload.image_name,
        date: moment(result.createdAt).format("DD/MM/YYYY"),
        alt: result.payload.image_name,
      };
      onReload(imageData, reloadMode);
    }
    handleClearData();
    onClose();
  };
  const handleCancel = () => {
    handleClearData();
    onClose();
  };
  useEffect(() => {
    setName(image ? image.title : "");
    setDialogMode(mode);
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        {t(strings.addMoreImage)}
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="normal"
          id="name"
          label={t(strings.name)}
          type="text"
          fullWidth
          required={true}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        {dialogMode === true ? (
          <Input
            autoFocus
            margin="normal"
            readOnly={true}
            id="file_name"
            label={t(strings.fileName)}
            type="text"
            fullWidth
            value={fileName}
            required={true}
            endAdornment={
              <InputAdornment position="end">
                <IconButton variant="contained" component="label">
                  <AttachFileIcon></AttachFileIcon>
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleSelectFile}
                    style={{ width: 100, height: 100, display: false }}
                  />
                </IconButton>
              </InputAdornment>
            }
          />
        ) : null}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          {t(strings.cancel)}
        </Button>
        <Button onClick={handleSave} color="primary" type="submit">
          {t(strings.save)}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ImageDialog;
