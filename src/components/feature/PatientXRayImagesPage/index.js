import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
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

import TwoLayer from "../../../assets/images/2-Layer.png";
import FourLayer from "../../../assets/images/4-Layer.png";
import DefaultMouthThumbnail from "../../../assets/mount-template/thumnail_default_mountemplate.png";
import path from "../../../routes/path";
// Component
import PopupChat from "../../common/Messenger/PopupChat";
import TreatmentMenu from "../../../layouts/TreatmentMenu";
import MouthTemplateRow from "./template.row";
import MouthTemplateService from "../../../api/xray/xray.template.service";
import MouthService from "../../../api/xray/xray.service";
import { loadingStore } from "../../../contexts/loading-context";
import { toast } from "react-toastify";
const useStyles = makeStyles(styles);

const PatientXRayImagesPage = ({ patientID }) => {
  const [templateList, setTemplateList] = useState([]);
  const [mouthList, setMouthList] = useState([]);
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  const { loadingState, dispatchLoading } = useContext(loadingStore);

  const history = useHistory();
  const handleAddXRayImage = () => {
    history.push(
      path.patientAddXRayImagesPath.replace(":patientID", patientID)
    );
  };
  const handleViewXRayImage = () => {
    history.push(
      path.patientViewXRayImagesPath.replace(":patientID", patientID)
    );
  };
  const loadPatientMonth = async (patient_id) => {
    try {
      dispatchLoading({ type: strings.setLoading, isLoading: true });
      const data = await MouthService.getsByPatientAndTemplate(
        patient_id,
        null
      );
      if (data.success) {
        setMouthList(data.payload);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
    } finally {
      dispatchLoading({ type: strings.setLoading, isLoading: false });
    }
  };
  useEffect(() => {
    const onLoad = async () => {
      try {
        dispatchLoading({ type: strings.setLoading, isLoading: true });
        const data = await MouthTemplateService.gets();
        if (data.success) {
          let payload = data.payload;
          payload.push({
            _id: null,
            name: "Others",
            thumbnail: null,
          });
          setTemplateList(payload);
        } else {
          toast.error(data.message);
        }
      } catch (err) {
      } finally {
        dispatchLoading({ type: strings.setLoading, isLoading: false });
      }
    };
    onLoad();
    //loadPatientMonth(patientID);
  }, []);
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
            {t(strings.xRayImages)}
          </Typography>
          {/* <Button simple className={classes.btnAddRecord}>
            <AddCircleOutlineIcon></AddCircleOutlineIcon> {t(strings.addMoreImage)}
          </Button> */}
        </div>
        <div className={classes.bodyContainer}>
          {templateList.map((template) => {
            return (
              <MouthTemplateRow template={template} patientID={patientID} />
            );
          })}
          {/*<div>
            <b>2-{t(strings.layer)}</b>
            <div className={classes.xRayImagesContainer}>
              <Button
                onClick={handleAddXRayImage}
                variant="contained"
                className={classes.addXRayImage}
              >
                <AddBoxIcon></AddBoxIcon>
              </Button>
              {xRayImages.TwoLayer.map((image, index) => {
                return (
                  <img
                    onClick={handleViewXRayImage}
                    src={image.src}
                    alt={image.title}
                    className={classes.xRayThumbnail}
                  />
                );
              })}
            </div>
          </div>
          <div>
          <b>4-{t(strings.layer)}</b>
          <div className={classes.xRayImagesContainer}>
            <Button onClick={handleAddXRayImage} variant="contained" className={classes.addXRayImage}>
              <AddBoxIcon></AddBoxIcon>
            </Button>
            {xRayImages.FourLayer.map((image, index) => {
              return <img onClick={handleViewXRayImage} src={image.src} alt={image.title} className={classes.xRayThumbnail} />;
            })}
          </div>
        </div>{" "}
        <div>
          <b>8-{t(strings.layer)}</b>
          <div className={classes.xRayImagesContainer}>
            <Button onClick={handleAddXRayImage} variant="contained" className={classes.addXRayImage}>
              <AddBoxIcon></AddBoxIcon>
            </Button>
            {xRayImages.EightLayer.map((image, index) => {
              return <img onClick={handleViewXRayImage} src={image.src} alt={image.title} className={classes.xRayThumbnail} />;
            })}
          </div>
        </div>{" "}
        <div>
          <b>16-{t(strings.layer)}</b>
          <div className={classes.xRayImagesContainer}>
            <Button onClick={handleAddXRayImage} variant="contained" className={classes.addXRayImage}>
              <AddBoxIcon></AddBoxIcon>
            </Button>
            {xRayImages.SixteenLayer.map((image, index) => {
              return <img onClick={handleViewXRayImage} src={image.src} alt={image.title} className={classes.xRayThumbnail} />;
            })}
          </div>
        </div>{" "}
        <div>
          <b>32-{t(strings.layer)}</b>
          <div className={classes.xRayImagesContainer}>
            <Button onClick={handleAddXRayImage} variant="contained" className={classes.addXRayImage}>
              <AddBoxIcon></AddBoxIcon>
            </Button>
            {xRayImages.ThirtyTwoLayer.map((image, index) => {
              return <img onClick={handleViewXRayImage} src={image.src} alt={image.title} className={classes.xRayThumbnail} />;
            })}
          </div>
          </div>*/}
        </div>
      </Container>
    </React.Fragment>
  );
};

export default PatientXRayImagesPage;
