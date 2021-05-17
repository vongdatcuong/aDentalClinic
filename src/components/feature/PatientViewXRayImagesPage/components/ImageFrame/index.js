import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/core Component
import styles from "../../jss";
import Typography from "@material-ui/core/Typography";

// use i18next
import { useTranslation } from "react-i18next";
import IconButton from "@material-ui/core/IconButton";
// Component
import Draggable from "react-draggable"; // Both at the same time
import { FaPencilAlt, FaSearchPlus, FaTrashAlt } from "react-icons/fa";

import keys from "../../../../../configs/keys";
const useStyles = makeStyles(styles);
const ImageFrame = ({
  frameInfo,
  mode,
  MouthHeight,
  MouthWidth,
  onView,
  resetState,
  onEdit,
  onDelete,
  onChangePosition,
}) => {
  const [frameWidth] = useState(frameInfo.width_ratio * MouthWidth);
  const [imageHeight] = useState(frameInfo.height_ratio * MouthHeight);
  const [imageWidth] = useState(frameWidth - 2);
  const [frameHeight] = useState(imageHeight + 39);
  const [defaultX] = useState(frameInfo.x_ratio * MouthWidth);
  const [defaultY] = useState(frameInfo.y_ratio * MouthHeight);
  const [position, setPosition] = useState({ x: defaultX, y: defaultY });
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  const onViewImage = () => {
    onView(frameInfo.order);
  };
  const onDrag = (e, data) => {
    setPosition({
      x: data.x,
      y: data.y,
    });
  };
  const onStop = (e, data) => {
    setPosition({
      x: data.x,
      y: data.y,
    });
    const x_ratio = parseFloat(data.x / MouthWidth).toFixed(2);
    const y_ratio = parseFloat(data.y / MouthHeight).toFixed(2);
    const frame_id = frameInfo._id;
    onChangePosition(frame_id, x_ratio, y_ratio);
  };
  useEffect(() => {
    setPosition({
      x: frameInfo.x_ratio * MouthWidth,
      y: frameInfo.y_ratio * MouthHeight,
    });
  }, [resetState]);
  return (
    <Draggable
      defaultPosition={{ x: defaultX, y: defaultY }}
      handle="strong"
      bounds="parent"
      disabled={mode === keys.MODE.MODE_VIEW ? true : false}
      position={position}
      onDrag={onDrag}
      onStop={onStop}
    >
      <div
        className={classes.box_no_cursor}
        style={{
          maxHeight: frameHeight,
          maxWidth: frameWidth,
          minHeight: frameHeight,
          minWidth: frameWidth,
          position: "absolute",
        }}
      >
        <strong
          className={classes.cursor}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography style={{ alignSelf: "center", paddingLeft: 5 }}>
            {frameInfo.order}
          </Typography>
          <div>
            {mode === keys.MODE.MODE_VIEW ? (
              <IconButton onClick={onViewImage} size="small">
                <FaSearchPlus style={{ margin: 5 }} />
              </IconButton>
            ) : null}
            {mode !== keys.MODE.MODE_VIEW ? (
              <IconButton
                onClick={() => {
                  onEdit(frameInfo._id);
                }}
                size="small"
              >
                <FaPencilAlt style={{ margin: 5 }} />
              </IconButton>
            ) : null}
            {mode !== keys.MODE.MODE_VIEW ? (
              <IconButton
                onClick={() => {
                  onDelete(frameInfo._id);
                }}
                size="small"
              >
                <FaTrashAlt style={{ margin: 5 }} />
              </IconButton>
            ) : null}
          </div>
        </strong>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            style={{
              maxHeight: imageHeight,
              maxWidth: imageWidth,
              display: "block",
              marginTop: "auto",
              marginBottom: "auto",
              position: "absolute",
              top: "auto",
              bottom: "auto",
            }}
            src={frameInfo.src}
            className={classes.thumbnail}
            onClick={onViewImage}
          />
        </div>
      </div>
    </Draggable>
  );
};

export default ImageFrame;
