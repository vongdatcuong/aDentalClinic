import React from "react";
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
// Component
import PopupChat from "../../common/Messenger/PopupChat";

const useStyles = makeStyles(styles);

const PatientAddXRayImagesPage = () => {
  const { t, i18n } = useTranslation();
  const classes = useStyles();

  return (
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
      <div className={classes.bodyContainer}>PatientAddXRayImagesPage</div>
    </Container>
  );
};

export default PatientAddXRayImagesPage;
