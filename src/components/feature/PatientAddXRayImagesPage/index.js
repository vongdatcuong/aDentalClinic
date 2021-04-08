import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

// @material-ui/core Component
import Container from "@material-ui/core/Container";
import styles from "./jss";
import strings from "../../../configs/strings";
import Typography from "@material-ui/core/Typography";
// use i18next
import { useTranslation, Trans } from "react-i18next";
import Button from "@material-ui/core/Button";
import AddBoxIcon from "@material-ui/icons/AddBox";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import Grid from "@material-ui/core/Grid";
// Component
import PopupChat from "../../common/Messenger/PopupChat";
import TreatmentMenu from '../../../layouts/TreatmentMenu';

// Import React FilePond
import { FilePond, File, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const useStyles = makeStyles(styles);

const PatientAddXRayImagesPage = ({ patientID }) => {
  const [files1, setFiles1] = useState([]);
  const [files2, setFiles2] = useState([]);
  const [files3, setFiles3] = useState([]);
  const [files4, setFiles4] = useState([]);
  const { t, i18n } = useTranslation();
  const classes = useStyles();

  return (  <React.Fragment>
    <TreatmentMenu patientID = { patientID }/>
    <Container className={classes.container}>
      <PopupChat></PopupChat>
      <div className={classes.headerContainer}>
        <Typography component="h1" variant="h5" className={classes.loginTitle}>
          {t(strings.xRayImages)}
        </Typography>
        <Button simple className={classes.btnAddRecord}>
          <AddCircleOutlineIcon></AddCircleOutlineIcon>{" "}
          {t(strings.addMoreImage)}
        </Button>
      </div>
      <div className={classes.bodyContainer}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <FilePond
              files={files1}
              onupdatefiles={setFiles1}
              //   allowMultiple={true}
              //   maxFiles={1}
              server="/api"
              name="files"
              labelIdle='<svg class="upload-image-button" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M19 7v2.99s-1.99.01-2 0V7h-3s.01-1.99 0-2h3V2h2v3h3v2h-3zm-3 4V8h-3V5H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8h-3zM5 19l3-4l2 3l3-4l4 5H5z" fill="#626262"/></svg>'
            />
          </Grid>
          <Grid item xs={6}>
            <FilePond
              files={files2}
              onupdatefiles={setFiles2}
              server="/api"
              name="files"
              labelIdle='<svg class="upload-image-button" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M19 7v2.99s-1.99.01-2 0V7h-3s.01-1.99 0-2h3V2h2v3h3v2h-3zm-3 4V8h-3V5H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8h-3zM5 19l3-4l2 3l3-4l4 5H5z" fill="#626262"/></svg>'
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <FilePond
              files={files3}
              onupdatefiles={setFiles3}
              server="/api"
              name="files"
              labelIdle='<svg class="upload-image-button" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M19 7v2.99s-1.99.01-2 0V7h-3s.01-1.99 0-2h3V2h2v3h3v2h-3zm-3 4V8h-3V5H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8h-3zM5 19l3-4l2 3l3-4l4 5H5z" fill="#626262"/></svg>'
            />
          </Grid>
          <Grid item xs={6}>
            <FilePond
              files={files4}
              onupdatefiles={setFiles4}
              server="/api"
              name="files"
              labelIdle='<svg class="upload-image-button" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M19 7v2.99s-1.99.01-2 0V7h-3s.01-1.99 0-2h3V2h2v3h3v2h-3zm-3 4V8h-3V5H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8h-3zM5 19l3-4l2 3l3-4l4 5H5z" fill="#626262"/></svg>'
            />
          </Grid>
        </Grid>
      </div>
    </Container></React.Fragment>
  );
};

export default PatientAddXRayImagesPage;
