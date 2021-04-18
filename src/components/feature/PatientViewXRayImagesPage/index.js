import React, { useEffect, useState, useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import XrayBackground from "../../../assets/images/xray_bg.png";
import Viewer from "react-viewer";
// @material-ui/core Component
import Container from "@material-ui/core/Container";
import styles from "./jss";
import strings from "../../../configs/strings";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
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
import { FaPencilAlt, FaSave, FaSearchPlus, FaTimes, FaTrashAlt } from "react-icons/fa";
import ImageFrame from "./components/ImageFrame";
import MountService from "../../../api/xray/xray.service";
import MountTemplateService from "../../../api/xray/xray.template.service";
import { loadingStore } from "../../../contexts/loading-context";
import { TextField } from "@material-ui/core";
import { useHistory } from "react-router";
const useStyles = makeStyles(styles);
const MouthHeight = 600;
const MouthWidth = 1000;
const MODE_VIEW = "VIEW";
const MODE_EDIT = "EDIT";
const MODE_ADD = "ADD";
const PatientViewXRayImagesPage = ({ patientID, MouthID, mode }) => {
  const { t, i18n } = useTranslation();
  const history = useHistory();
  const classes = useStyles();
  const [XrayMode, setXrayMode] = useState(mode ? mode : MODE_VIEW);
  const [visible, setVisible] = React.useState(false);
  const [imageList, setImageList] = React.useState([]);
  const [MouthData, setMouthData] = useState(null);
  const [viewingImageIndex, setViewingImageIndex] = React.useState("0");
  const { loadingState, dispatchLoading } = useContext(loadingStore);
  const [name, setName] = useState(moment().format("DD/MM/YYYY"));
  const [note, setNote] = useState("");
  const [resetState, setResetState] = useState(false);
  const handleViewImage = (order) => {
    setViewingImageIndex(order - 1);
    setVisible(true);
  };
  const onTest = () => {
    if (XrayMode === MODE_VIEW) setXrayMode(MODE_EDIT);
    else if (XrayMode === MODE_EDIT) setXrayMode(MODE_VIEW);
  };
  const onLoad = async (mount_id) => {
    try {
      dispatchLoading({ type: strings.setLoading, isLoading: true });
      const data = await MountService.getsMouthById(mount_id);
      if (data.success) {
        const imagesListData = [];
        for (const frame of data.payload.frames) {
          const alt =
            "Frame " +
            frame.order +
            ": " +
            (frame.image ? frame.image.image_name : null);
          const path = frame.image ? frame.image.image_path : null;
          const imageData = Object.assign(frame, {
            src: path,
            alt: alt,
          });
          imagesListData.push(imageData);
        }
        imagesListData.sort(function (a, b) {
          return a.order - b.order;
        });
        setImageList(imagesListData);
        setMouthData(data.payload);
        setNote(data.payload.note);
        setName(data.payload.name);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
    } finally {
      dispatchLoading({ type: strings.setLoading, isLoading: false });
    }
  };
  const onLoadTemplate = async (mount_id) => {
    try {
      dispatchLoading({ type: strings.setLoading, isLoading: true });
      const data = await MountTemplateService.getsMouthById(mount_id);
      if (data.success) {
        const imagesListData = data.payload.frames;
        imagesListData.sort(function (a, b) {
          return a.order - b.order;
        });
        setImageList(imagesListData);
        setMouthData(data.payload);
        setNote("");
        setName(moment().format("DD/MM/YYYY"));
      } else {
        toast.error(data.message);
      }
    } catch (err) {
    } finally {
      dispatchLoading({ type: strings.setLoading, isLoading: false });
    }
  };
  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangeNote = (e) => {
    setNote(e.target.value);
  };
  const onSave = () => {
    //Do the saving here
    setXrayMode(MODE_VIEW);
  };
  const onCancel = async () => {
    //Do the cancel here
    if (XrayMode === MODE_ADD) {
      history.goBack();
      return;
    } else if (XrayMode === MODE_EDIT) {
      setNote(MouthData.note);
      setName(MouthData.name);
      console.log(MouthData);
      setResetState(!resetState);
    }
    setXrayMode(MODE_VIEW);
  };
  const onEdit = () => {
    setXrayMode(MODE_EDIT);
  };
  useEffect(() => {
    if (MouthID) {
      if (XrayMode === MODE_ADD) {
        onLoadTemplate(MouthID);
      } else {
        onLoad(MouthID);
      }
    }
  }, []);
  const renderFrame = (frameInfo) => {
    return (
      <ImageFrame
        key={frameInfo._id}
        onView={handleViewImage}
        MouthWidth={MouthWidth}
        MouthHeight={MouthHeight}
        mode={XrayMode}
        frameInfo={frameInfo}
        resetState={resetState}
      />
    );
  };
  const renderAllFrames = () => {
    return imageList.map((frame) => renderFrame(frame));
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
          {XrayMode === MODE_VIEW ? (
            <Button simple className={classes.btnEditRecord} onClick={onEdit}>
              <FaPencilAlt style={{ marginRight: 10 }}></FaPencilAlt>
              {t(strings.edit)}
            </Button>
          ) : null}
          {XrayMode != MODE_VIEW ? (
            <div>
              <Button
                simple
                className={classes.btnCancelRecord}
                onClick={onCancel}
              >
                <FaTimes style={{ marginRight: 10 }}></FaTimes>{" "}
                {t(strings.cancel)}
              </Button>
              <Button simple className={classes.btnSaveRecord} onClick={onSave}>
                <FaSave style={{ marginRight: 10 }}></FaSave> {t(strings.save)}
              </Button>
            </div>
          ) : null}
        </div>
        <div className={classes.bodyContainer}>
          <div
            className={classes.input}
            style={{ flexDirection: "row", paddingTop: 10, display: "flex" }}
          >
            <TextField
              required
              id="name-required"
              label="Name"
              //defaultValue={moment().format("DD/MM/YYYY")}
              style={{ flex: 2 }}
              InputProps={{
                readOnly: XrayMode === MODE_VIEW,
              }}
              value={name}
              onChange={onChangeName}
            />
            <TextField
              id="note"
              label="Note"
              style={{ marginLeft: 20, flex: 8 }}
              InputProps={{
                readOnly: XrayMode === MODE_VIEW,
              }}
              value={note}
              onChange={onChangeNote}
            />
            <div style={{ flex: 1 }}></div>
          </div>
          <div
            className={classes.box}
            style={{
              height: MouthHeight,
              width: MouthWidth,
              position: "relative",
              overflow: "auto",
              padding: "0",
              backgroundImage: `url(${XrayBackground})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              backgroundPosition: "center",
            }}
          >
            {renderAllFrames()}
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
