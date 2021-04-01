import React from "react";
import {
    useHistory
  } from "react-router-dom";
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

import path from '../../../routes/path';
// Component
import PopupChat from "../../common/Messenger/PopupChat";

const xRayImages = {
  TwoLayer: [
    {
      src: TwoLayer,
    },
    {
      src: TwoLayer,
    },
  ],
  FourLayer: [
    {
      src: FourLayer,
    },
    {
      src: FourLayer,
    },
    {
      src: FourLayer,
    },
  ],
  EightLayer: [
    {
      src: FourLayer,
    },
    {
      src: FourLayer,
    },
    {
      src: FourLayer,
    },
    {
      src: FourLayer,
    },
    {
      src: FourLayer,
    },
    {
      src: FourLayer,
    },],
  SixteenLayer: [
    {
      src: FourLayer,
    },],
  ThirtyTwoLayer: [],
};

const useStyles = makeStyles(styles);

const PatientXRayImagesPage = () => {
  const { t, i18n } = useTranslation();
  const classes = useStyles();

  const history = useHistory();
  const handleAddXRayImage = () => {
      history.push(path.patientAddXRayImagesPath);
  }
  const handleViewXRayImage = () => {
      history.push(path.patientViewXRayImagesPath);
  }

  return (
    <Container className={classes.container}>
      <PopupChat></PopupChat>
      <div className={classes.headerContainer}>
        <Typography component="h1" variant="h5" className={classes.loginTitle}>
          {t(strings.xRayImages)}
        </Typography>
        {/* <Button simple className={classes.btnAddRecord}>
            <AddCircleOutlineIcon></AddCircleOutlineIcon> {t(strings.addMoreImage)}
          </Button> */}
      </div>
      <div className={classes.bodyContainer}>
        <div>
          <b>2-{t(strings.layer)}</b>
          <div className={classes.xRayImagesContainer}>
            <Button onClick={handleAddXRayImage} variant="contained" className={classes.addXRayImage}>
              <AddBoxIcon></AddBoxIcon>
            </Button>
            {xRayImages.TwoLayer.map((image, index) => {
              return <img onClick={handleViewXRayImage} src={image.src} alt={image.title} className={classes.xRayThumbnail} />;
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
        </div>
      </div>
    </Container>
  );
};

export default PatientXRayImagesPage;
