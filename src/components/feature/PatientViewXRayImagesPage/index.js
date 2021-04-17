import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import FourLayerImg from "../../../assets/images/FourLayerImg.png";
import Viewer from "react-viewer";
// @material-ui/core Component
import Container from "@material-ui/core/Container";
import styles from "./jss";
import strings from "../../../configs/strings";
import Typography from "@material-ui/core/Typography";

// use i18next
import { useTranslation, Trans } from "react-i18next";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AddBoxIcon from "@material-ui/icons/AddBox";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
// Component
import PopupChat from "../../common/Messenger/PopupChat";
import TreatmentMenu from "../../../layouts/TreatmentMenu";
import { toast } from "react-toastify";
import Draggable, { DraggableCore } from "react-draggable"; // Both at the same time
import { FaPencilAlt, FaSearchPlus, FaTrashAlt } from "react-icons/fa";
import ImageFrame from "./components/ImageFrame";
const useStyles = makeStyles(styles);
const MouthHeight = 600;
const MouthWidth = 1000;
const MODE_VIEW = "VIEW";
const MODE_EDIT = "EDIT";
const PatientViewXRayImagesPage = ({ patientID }) => {
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  const [mode, setMode] = useState(MODE_VIEW);
  const [visible, setVisible] = React.useState(false);
  const [imageList, setImageList] = React.useState([
    {
      src:
        "https://i.ebayimg.com/images/g/zEEAAOSwjKddwhqG/s-l640.jpg",
      alt: "1",
    },
  ]);
  const [viewingImageIndex, setViewingImageIndex] = React.useState("0");
  const [frameInfo, setFrameInfo] = useState({
    src: "https://i.ebayimg.com/images/g/zEEAAOSwjKddwhqG/s-l640.jpg",
    order: 1,
    width_ratio: 0.2,
    height_ratio: 0.2,
    x_ratio: 0.5,
    y_ratio: 0.3,
  });
  const handleViewImage = (order) => {
    setViewingImageIndex(order - 1);
    setVisible(true);
  };
  const onTest= () => {
    setFrameInfo({
      src:
        "https://i.ebayimg.com/images/g/zEEAAOSwjKddwhqG/s-l640.jpg",
      order: 1,
      width_ratio: 0.2,
      height_ratio: 0.3,
      x_ratio: 0.5,
      y_ratio: 0.3,
    });
  }
  const renderFrame = () => {
    return (
      <ImageFrame
        onView={handleViewImage}
        MouthWidth={MouthWidth}
        MouthHeight={MouthHeight}
        mode={mode}
        frameInfo={frameInfo}
      />
    );
  };
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
          <Button simple className={classes.btnAddRecord} onClick={onTest}>
            <AddCircleOutlineIcon></AddCircleOutlineIcon>{" "}
            {t(strings.addMoreImage)}
          </Button>
        </div>
        <div className={classes.bodyContainer}>
          <div
            className={classes.box}
            style={{
              height: MouthHeight,
              width: MouthWidth,
              position: "relative",
              overflow: "auto",
              padding: "0",
            }}
          >
            {renderFrame()}
          </div>
        </div>
        <Viewer
          noImgDetails={true}
          visible={visible}
          activeIndex={viewingImageIndex}
          zoomSpeed="0.3"
          onClose={() => {
            setVisible(false);
          }}
          images={imageList}
        />
      </Container>
    </React.Fragment>
  );
};

export default PatientViewXRayImagesPage;
