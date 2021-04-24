import React, { useEffect, useState, useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
// @material-ui/core Component
import Container from "@material-ui/core/Container";
import styles from "./jss";
import strings from "../../../../../configs/strings";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Grid from '@material-ui/core/Grid';
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
// use i18next
import { useTranslation, Trans } from "react-i18next";
import IconButton from "@material-ui/core/IconButton";
// Component
import { toast } from "react-toastify";
import Draggable, { DraggableCore } from "react-draggable"; // Both at the same time
import { FaPencilAlt, FaSearchPlus, FaTrashAlt } from "react-icons/fa";
import { loadingStore } from "../../../../../contexts/loading-context";
import ImageService from "../../../../../api/images/image.service";
import keys from "../../../../../configs/keys";
const useStyles = makeStyles(styles);
const ImageDialog = ({ open, onClose, onSelect, patientID }) => {
  const [imageList, setImageList] = React.useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const { loadingState, dispatchLoading } = useContext(loadingStore);
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  const onClickImage = (image) => {
    if (selectedImage && image._id == selectedImage._id) {
      setSelectedImage(null);
    } else {
      setSelectedImage(image);
    }
  }
  const onCancel = () => {
    setSelectedImage(null);
    onClose();
  }
  const onSelectImage = () => {
    onSelect(selectedImage);
    setSelectedImage(null);
    onClose();
  };
  const onLoadPage = async () => {
    try {
      dispatchLoading({ type: strings.setLoading, isLoading: true });
      const data = await ImageService.getImageOfPatient(patientID);
      if (data.success) {
        setImageList(data.payload);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
    } finally {
      dispatchLoading({ type: strings.setLoading, isLoading: false });
    }
  };
  useEffect(() => {
    onLoadPage();
  }, []);

  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">{t(strings.images)}</DialogTitle>
        <DialogContent dividers={true}>
          <div id="scroll-dialog-description" tabIndex={-1}>
            <Grid container style={{ flexGrow: 1 }} spacing={3}>
              <Grid container justify="center" spacing={2}>
                {imageList.map((image, index) => {
                  return (
                    <Grid key={image._id} item>
                      <div
                        onClick={() => onClickImage(image)}
                        className={classes.xRayThumbnail}
                        style={{
                          flexDirection: "column",
                          backgroundColor:
                            selectedImage && selectedImage._id === image._id
                              ? "#3297FD"
                              : "white",
                        }}
                      >
                        <img
                          src={image.image_path}
                          alt={image.image_name}
                          className={classes.xRayThumbnailImage}
                        />
                        <a
                          className={classes.xRayThumbnailImage}
                          style={{ paddingLeft: 5 }}
                        >
                          {image.image_name.length <= 10
                            ? image.image_name
                            : image.image_name.substring(0, 10)}
                        </a>
                      </div>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel} color="primary">
            {t(strings.cancel)}
          </Button>
          <Button onClick={onSelectImage} color="primary">
            {t(strings.select)}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ImageDialog;
