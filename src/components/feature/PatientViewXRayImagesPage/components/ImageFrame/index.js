import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
// @material-ui/core Component
import Container from "@material-ui/core/Container";
import styles from "../../jss";
import strings from "../../../../../configs/strings";
import Typography from "@material-ui/core/Typography";

// use i18next
import { useTranslation, Trans } from "react-i18next";
import IconButton from "@material-ui/core/IconButton";
// Component
import { toast } from "react-toastify";
import Draggable, { DraggableCore } from "react-draggable"; // Both at the same time
import { FaPencilAlt, FaSearchPlus, FaTrashAlt } from "react-icons/fa";
const useStyles = makeStyles(styles);
const MODE_VIEW = "VIEW";
const MODE_EDIT = "EDIT";
const ImageFrame = ({
  frameInfo,
  mode,
  MouthHeight,
  MouthWidth,
  onView,
}) => {
  const [frameWidth] = useState(frameInfo.width_ratio * MouthWidth);
  const [imageHeight] = useState(frameInfo.height_ratio * MouthHeight);
  const [imageWidth] = useState(frameWidth - 2);
  const [frameHeight] = useState(imageHeight + 39);
  const [defaultX] = useState(frameInfo.x_ratio * MouthWidth);
  const [defaultY] = useState(frameInfo.y_ratio * MouthHeight);
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  const onViewImage = () => {
    onView(frameInfo.order);
  }
  
  return (
    <Draggable
      grid={[10, 10]}
      defaultPosition={{ x: defaultX, y: defaultY }}
      handle="strong"
      bounds="parent"
    >
      <div
        className={classes.box_no_cursor}
        style={{
          maxHeight: frameHeight,
          maxWidth: frameWidth,
          minHeight: frameHeight,
          minWidth: frameWidth,
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
            <IconButton onClick={onViewImage} size="small">
              <FaSearchPlus style={{ margin: 5 }} />
            </IconButton>
            {mode === MODE_EDIT ? (
              <IconButton
                onClick={() => {
                  toast.warning("Click edit");
                }}
                size="small"
              >
                <FaPencilAlt style={{ margin: 5 }} />
              </IconButton>
            ) : null}
            {mode === MODE_EDIT ? (
              <IconButton
                onClick={() => {
                  toast.error("Click delete");
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
