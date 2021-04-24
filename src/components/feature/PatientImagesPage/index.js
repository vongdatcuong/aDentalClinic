import React, { useEffect, useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Viewer from "react-viewer";
import toothImg from "../../../assets/images/XRayTeeth.png";
// @material-ui/core Component
import Container from "@material-ui/core/Container";
import styles from "./jss";
import strings from "../../../configs/strings";
import Typography from "@material-ui/core/Typography";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import ConfirmDialog from "../../dialogs/ConfirmDialog";
import { FaExpand, FaPencilAlt, FaTrashAlt } from "react-icons/fa";
// use i18next
import { useTranslation, Trans } from "react-i18next";
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Select from "@material-ui/core/Select";
import Pagination from "react-pagination-list";
// Component
import PopupChat from "../../common/Messenger/PopupChat";
import TreatmentMenu from "../../../layouts/TreatmentMenu";
import ImageDialog from "./ImageDialog";
import ImageService from "../../../api/images/image.service";
import { toast } from "react-toastify";
import moment from "moment";
// Context
import { loadingStore } from "../../../contexts/loading-context";
const useStyles = makeStyles(styles);

const PatientImagesPage = ({ patientID }) => {
  const [imagesPerPage, setImagesPerPage] = React.useState(8);
  const [visible, setVisible] = React.useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
  const [viewingImageIndex, setViewingImageIndex] = React.useState("0");
  const [insertDialogVisible, setInsertDialogVisible] = React.useState(false);
  const [imageList, setImageList] = React.useState([]);
  const { t, i18n } = useTranslation();
  const [dialogMode, setDialogMode] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(null);
  const classes = useStyles();
  // Context
  const { loadingState, dispatchLoading } = useContext(loadingStore);
  function handleViewImage(clickedImageIndex) {
    setViewingImageIndex(clickedImageIndex);
    setVisible(true);
  }

  const handleChangeImgPerPage = (event) => {
    setImagesPerPage(event.target.value);
  };

  const openInsertDialogVisible = () => {
    setDialogMode(true);
    setSelectedImage(null);
    setInsertDialogVisible(true);
  };
  const openUpdateDialogVisible = (image) => {
    setDialogMode(false);
    setSelectedImage(image);
    setInsertDialogVisible(true);
  };
  const closeInsertDialogVisible = () => {
    setDialogMode(false);
    setSelectedImage(null);
    setInsertDialogVisible(false);
  };
  const handleCloseConfirmDialog = () => {
    setSelectedImage(null);
    setOpenConfirmDialog(false);
  };
  const handleOpenConfirmDelete = (image) => {
    setSelectedImage(image);
    setOpenConfirmDialog(true);
  };
  const handleDeleteImage = async () => {
    try {
      const result = await ImageService.delete(selectedImage._id);
      if (result.success) {
        onReload(selectedImage, "DELETE");
        toast.success(t(strings.deleteSuccess));
      } else {
        toast.error(t(strings.deleteFail));
      }
    } catch (err) {
      toast.error(t(strings.deleteFail));
    }
  };
  const onReload = (image, mode) => {
    let newImageList = imageList.slice();
    if (mode == "INSERT") {
      newImageList.unshift(image);
    } else {
      const index = imageList.findIndex(function (img) {
        return img._id == image._id;
      });
      if (index == -1) return;
      if (mode == "UPDATE") {
        newImageList[index] = image;
      } else if (mode == "DELETE") {
        newImageList.splice(index, 1);
      }
    }
    setImageList(newImageList);
  };
  const onLoadPage = async () => {
    try {
      dispatchLoading({ type: strings.setLoading, isLoading: true });
      const data = await ImageService.getImageOfPatient(patientID);
      if (data.success) {
        const imagesListData = [];
        for (const image of data.payload) {
          const imageData = {
            _id: image._id,
            src: image.image_path,
            title: image.image_name,
            date: moment(image.createdAt).format("DD/MM/YYYY"),
            alt: image.image_name,
          };
          imagesListData.push(imageData);
        }
        setImageList(imagesListData);
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
            {t(strings.images)}
          </Typography>
          <Button
            simple
            className={classes.btnAddRecord}
            onClick={openInsertDialogVisible}
          >
            <AddCircleOutlineIcon></AddCircleOutlineIcon>{" "}
            {t(strings.addMoreImage)}
          </Button>
          <ImageDialog
            patient={patientID}
            open={insertDialogVisible}
            onClose={closeInsertDialogVisible}
            onReload={onReload}
            mode={dialogMode}
            image={selectedImage}
          />
        </div>
        <div className={classes.bodyContainer}>
          <div className={classes.selectImgPerPage}>
            {t(strings.imagesPerPage)}:{" "}
            <Select
              native
              value={imagesPerPage}
              onChange={handleChangeImgPerPage}
              inputProps={{
                name: "Images per page",
                id: "images-per-page",
              }}
            >
              <option value={8}>8</option>
              <option value={16}>16</option>
              <option value={32}>32</option>
              <option value={1000}>{t(strings.all)}</option>
            </Select>
          </div>

          <GridList className={classes.gridList}>
            {/* <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">December</ListSubheader>
        </GridListTile> */}
            <Pagination
              data={imageList}
              pageSize={imagesPerPage}
              renderItem={(image, index) => (
                <GridListTile key={image.img}>
                  <img
                    src={image.src}
                    alt={image.title}
                    className={classes.thumbnail}
                    onClick={() => {
                      handleViewImage(index);
                    }}
                  />
                  <GridListTileBar
                    title={image.title}
                    subtitle={<span>Date: {image.date}</span>}
                    actionIcon={
                      <div>
                        <IconButton
                          onClick={() => handleOpenConfirmDelete(image)}
                          aria-label={`edit info about ${image.title}`}
                          className={classes.icon}
                          size="small"
                        >
                          <FaTrashAlt />
                        </IconButton>
                        <IconButton
                          onClick={() => openUpdateDialogVisible(image)}
                          aria-label={`edit info about ${image.title}`}
                          className={classes.icon}
                          size="small"
                        >
                          <FaPencilAlt />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            handleViewImage(index);
                          }}
                          aria-label={`info about ${image.title}`}
                          className={classes.icon}
                          size="small"
                        >
                          <FaExpand />
                        </IconButton>
                      </div>
                    }
                  />
                </GridListTile>
              )}
            />
            {/* {images.map((image, index) => (
            
          ))} */}
          </GridList>
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
          <ConfirmDialog
            open={openConfirmDialog}
            onClose={handleCloseConfirmDialog}
            action={handleDeleteImage}
          >
            {t(strings.areYouSureWantTo) +
              " " +
              t(strings.btnDelete) +
              " " +
              t(strings.image)}
          </ConfirmDialog>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default PatientImagesPage;
