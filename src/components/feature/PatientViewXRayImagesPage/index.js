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
import {
  FaPencilAlt,
  FaSave,
  FaSearchPlus,
  FaTimes,
  FaTrashAlt,
} from "react-icons/fa";
import ImageFrame from "./components/ImageFrame";
import MountService from "../../../api/xray/xray.service";
import MountTemplateService from "../../../api/xray/xray.template.service";
import { loadingStore } from "../../../contexts/loading-context";
import { TextField } from "@material-ui/core";
import { useHistory } from "react-router";
import keys from "../../../configs/keys";
import ImageDialog from "./components/ImageDialog";
const useStyles = makeStyles(styles);
const MouthHeight = 600;
const MouthWidth = 1200;
const PatientViewXRayImagesPage = ({ patientID, MouthID, mode }) => {
  const { t, i18n } = useTranslation();
  const history = useHistory();
  const classes = useStyles();
  const [XrayMode, setXrayMode] = useState(mode ? mode : keys.MODE.MODE_VIEW);
  const [visible, setVisible] = React.useState(false);
  const [imageList, setImageList] = React.useState([]);
  const [MouthData, setMouthData] = useState(null);
  const [viewingImageIndex, setViewingImageIndex] = React.useState("0");
  const { loadingState, dispatchLoading } = useContext(loadingStore);
  const [name, setName] = useState(moment().format("DD/MM/YYYY"));
  const [note, setNote] = useState("");
  const [resetState, setResetState] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingFrameId, setEditingFrameId] = useState(null);
  const handleViewImage = (order) => {
    setViewingImageIndex(order - 1);
    setVisible(true);
  };
  const onSetData = (data) => {
    if (data == null) {
      return false;
    }
    try {
      dispatchLoading({ type: strings.setLoading, isLoading: true });
      if (data.success) {
        const imagesListData = [];
        for (const frame of data.payload.frames) {
          const alt =
            "Frame " +
            frame.order +
            ": " +
            (frame.image ? frame.image.image_name : "");
          const path = frame.image ? frame.image.image_path : null;
          const imageData = Object.assign({}, frame, {
            src: path,
            alt: alt,
          });
          imagesListData.push(imageData);
        }
        imagesListData.sort(function (a, b) {
          return a.order - b.order;
        });
        setImageList(imagesListData);
        data.payload.frames = [...imagesListData.slice()];
        setMouthData(data.payload);
        setNote(data.payload.note);
        setName(data.payload.name);
      } else {
        toast.error(data.message);
      }
      return data.success;
    } catch (err) {
    } finally {
      dispatchLoading({ type: strings.setLoading, isLoading: false });
    }
  };
  const onLoad = async (mount_id) => {
    try {
      dispatchLoading({ type: strings.setLoading, isLoading: true });
      let data = await MountService.getsMouthById(mount_id);
      onSetData(data);
    } catch (err) {
    } finally {
      dispatchLoading({ type: strings.setLoading, isLoading: false });
    }
  };
  const onUpdateXray = async (mount_id, mouth) => {
    try {
      dispatchLoading({ type: strings.setLoading, isLoading: true });
      let data = await MountService.update(mount_id, mouth);
      const rs = onSetData(data);
      if (rs) {
        toast.success(t(strings.updateSuccess));
      }
    } catch (err) {
      toast.error(t(strings.updateFail));
    } finally {
      dispatchLoading({ type: strings.setLoading, isLoading: false });
    }
  };
  const onInsertXray = async (mouth, patient_id) => {
    try {
      dispatchLoading({ type: strings.setLoading, isLoading: true });
      const insertMouthObject = Object.assign({}, mouth, {
        patient: patient_id,
        entry_date: new Date(),
        template: mouth._id,
      });
      let data = await MountService.insert(insertMouthObject);
      const rs = onSetData(data);
      if (rs) {
        toast.success(t(strings.insertSuccess));
      }
    } catch (err) {
      toast.error(t(strings.insertFail));
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
  const onEditFramePosition = (frame_id, x_ratio, y_ratio) => {
    const frameIndex = imageList.findIndex((n) => n._id === frame_id);
    if (frameIndex === -1) {
      return;
    }
    let frame = Object.assign({}, imageList[frameIndex], {
      x_ratio: parseFloat(x_ratio),
      y_ratio: parseFloat(y_ratio),
    });
    let imagesListData = frameIndex > 0 ? imageList.slice(0, frameIndex) : [];
    imagesListData.push(frame);
    imagesListData = imagesListData.concat(
      imageList.slice(frameIndex + 1, frameIndex.length)
    );
    setImageList(imagesListData);
  };
  const onEditedFrameImage = (image_object) => {
    //set image_object
    const frameIndex = imageList.findIndex((n) => n._id === editingFrameId);
    if (frameIndex === -1 || image_object == null) {
      setEditingFrameId(null);
      return;
    }
    let frame = Object.assign({}, imageList[frameIndex]);
    frame.image = image_object;
    const alt =
      "Frame " +
      frame.order +
      ": " +
      (frame.image ? frame.image.image_name : "");
    const path = frame.image ? frame.image.image_path : null;
    const imageData = Object.assign({}, frame, {
      src: path,
      alt: alt,
    });
    let imagesListData = frameIndex > 0 ? imageList.slice(0, frameIndex) : [];
    imagesListData.push(imageData);
    imagesListData = imagesListData.concat(
      imageList.slice(frameIndex + 1, frameIndex.length)
    );
    setImageList(imagesListData);
    setEditingFrameId(null);
  };
  const onDeleteFrameImage = (frame_id) => {
    const frameIndex = imageList.findIndex((n) => n._id === frame_id);
    if (frameIndex === -1) {
      setEditingFrameId(null);
      return;
    }
    let frame = Object.assign({}, imageList[frameIndex]);
    frame.image = null;
    const alt = null;
    const path = null;
    const imageData = Object.assign({}, frame, {
      src: path,
      alt: alt,
    });
    let imagesListData = frameIndex > 0 ? imageList.slice(0, frameIndex) : [];
    imagesListData.push(imageData);
    imagesListData = imagesListData.concat(
      imageList.slice(frameIndex + 1, frameIndex.length)
    );
    setImageList(imagesListData);
  };
  const onCloseDialog = () => {
    setDialogOpen(false);
  };
  const onOpenDialog = (frame_id) => {
    setEditingFrameId(frame_id);
    setDialogOpen(true);
  };
  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangeNote = (e) => {
    setNote(e.target.value);
  };
  const onSave = async () => {
    //Do the saving here
    const templateName = MouthData.name;
    let newMouth = Object.assign({}, MouthData, { name: name, note: note });
    newMouth.frames = imageList.slice();
    if (XrayMode == keys.MODE.MODE_ADD) {
      if (newMouth.note == null || newMouth.note == "") {
        newMouth = Object.assign({}, newMouth, { note: templateName });
      }
      onInsertXray(newMouth, patientID);
    } else if (XrayMode == keys.MODE.MODE_EDIT) {
      onUpdateXray(newMouth._id, newMouth);
    }
    setXrayMode(keys.MODE.MODE_VIEW);
  };
  const onCancel = async () => {
    //Do the cancel here
    if (XrayMode === keys.MODE.MODE_ADD) {
      history.goBack();
      return;
    } else if (XrayMode === keys.MODE.MODE_EDIT) {
      setImageList(MouthData.frames);
      setNote(MouthData.note);
      setName(MouthData.name);
      setResetState(!resetState);
    }
    setXrayMode(keys.MODE.MODE_VIEW);
  };
  const onEdit = () => {
    setXrayMode(keys.MODE.MODE_EDIT);
  };
  useEffect(() => {
    if (MouthID) {
      if (XrayMode === keys.MODE.MODE_ADD) {
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
        onEdit={onOpenDialog}
        onDelete={onDeleteFrameImage}
        onChangePosition={onEditFramePosition}
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
          {XrayMode === keys.MODE.MODE_VIEW ? (
            <Button simple className={classes.btnEditRecord} onClick={onEdit}>
              <FaPencilAlt style={{ marginRight: 10 }}></FaPencilAlt>
              {t(strings.edit)}
            </Button>
          ) : null}
          {XrayMode != keys.MODE.MODE_VIEW ? (
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
              label={t(strings.name)}
              //defaultValue={moment().format("DD/MM/YYYY")}
              style={{ flex: 2 }}
              InputProps={{
                readOnly: XrayMode === keys.MODE.MODE_VIEW,
              }}
              value={name}
              onChange={onChangeName}
            />
            <TextField
              id="note"
              label={t(strings.note)}
              style={{ marginLeft: 20, flex: 8 }}
              InputProps={{
                readOnly: XrayMode === keys.MODE.MODE_VIEW,
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
        <ImageDialog
          open={dialogOpen}
          onClose={onCloseDialog}
          patientID={patientID}
          onSelect={onEditedFrameImage}
        ></ImageDialog>
      </Container>
    </React.Fragment>
  );
};

export default PatientViewXRayImagesPage;
