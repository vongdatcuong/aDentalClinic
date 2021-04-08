import React from "react";
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
import { FaExpand } from "react-icons/fa";
// use i18next
import { useTranslation, Trans } from "react-i18next";
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Select from "@material-ui/core/Select";
import Pagination from "react-pagination-list";
// Component
import PopupChat from "../../common/Messenger/PopupChat";
import TreatmentMenu from '../../../layouts/TreatmentMenu';

const images = [
  {
    src:
      "https://64.media.tumblr.com/4ce37f19e23ee5b7e1555f3cd1c0cac0/d51f00faf7b2b44f-76/s1280x1920/9a13a622e4a9da6600927f10fd3094a511d8fd76.jpg",
    title: "Image 1",
    date: "27/03/2021",
  },
  {
    src:
      "https://64.media.tumblr.com/5b10b8d5924e2e595ed390f413726ced/9bc8f6d4d09a2d4f-00/s1280x1920/ffffaccc6b9060e302daa73fc9b0d44b58597ab5.jpg",
    title: "Image 2",
    date: "27/03/2021",
  },
  {
    src:
      "https://64.media.tumblr.com/383c940ea2f2ba6aa41a6e593f26735b/5c8f2146b1afa07e-af/s1280x1920/3e721f1eb9d425f2ba88bc8329d54d8ba28e4ed2.jpg",
    title: "Image 3",
    date: "27/03/2021",
  },
  {
    src:
      "https://64.media.tumblr.com/e9cc31e93b7aad3829f8ad72be0d7c5b/5ead5ecdc6e8c4ff-77/s640x960/cb803ca5b21242e7eded54fb6d9d951f73c4bb04.jpg",
    title: "Image 4",
    date: "27/03/2021",
  },
  {
    src:
      "https://64.media.tumblr.com/d974c4699963d5a37678647daf11533a/199a8002a3510625-0f/s1280x1920/30f5be99dfcdd7206082435ebc60ef0139c26eef.jpg",
    title: "Image 5",
    date: "27/03/2021",
  },
  {
    src: toothImg,
    title: "Tooth 1",
    date: "28/03/2021",
  },
  {
    src: toothImg,
    title: "Tooth 2",
    date: "29/03/2021",
  },
  {
    src: toothImg,
    title: "Tooth 3",
    date: "30/03/2021",
  },
  {
    src: toothImg,
    title: "Tooth 4",
    date: "31/03/2021",
  },
  {
    src: toothImg,
    title: "Tooth 5",
    date: "32/03/2021",
  },
  {
    src: toothImg,
    title: "Tooth 4",
    date: "31/03/2021",
  },
  {
    src: toothImg,
    title: "Tooth 5",
    date: "32/03/2021",
  },
];

const useStyles = makeStyles(styles);

const PatientImagesPage = ({ patientID }) => {
  const [imagesPerPage, setImagesPerPage] = React.useState(8);
  const [visible, setVisible] = React.useState(false);
  const [viewingImageIndex, setViewingImageIndex] = React.useState("0");
  const { t, i18n } = useTranslation();
  const classes = useStyles();

  function handleViewImage(clickedImageIndex) {
    setViewingImageIndex(clickedImageIndex);
    setVisible(true);
  }

  const handleChangeImgPerPage = (event) => {
    setImagesPerPage(event.target.value);
  };

  return (  <React.Fragment>
    <TreatmentMenu patientID = { patientID }/>
    <Container className={classes.container}>
      <PopupChat></PopupChat>
      <div className={classes.headerContainer}>
        <Typography component="h1" variant="h5" className={classes.loginTitle}>
          {t(strings.images)}
        </Typography>
        <Button simple className={classes.btnAddRecord}>
          <AddCircleOutlineIcon></AddCircleOutlineIcon>{" "}
          {t(strings.addMoreImage)}
        </Button>
      </div>
      <div className={classes.bodyContainer}>
          <div className={classes.selectImgPerPage}>      
          {t(strings.imagesPerPage)}: <Select
            native
            value={imagesPerPage}
            onChange={handleChangeImgPerPage}
            inputProps={{
              name: "Images per page",
              id: "images-per-page",
            }}
          >
            <option value={5}>5</option>
            <option value={8}>8</option>
            <option value={10}>10</option>
            <option value={1000}>{t(strings.all)}</option>
          </Select></div>

        <GridList className={classes.gridList}>
          {/* <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">December</ListSubheader>
        </GridListTile> */}
          <Pagination
            data={images}
            pageSize={imagesPerPage}
            renderItem={(image, index) => (
              <GridListTile
                key={image.img}
                onClick={() => {
                  handleViewImage(index);
                }}
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className={classes.thumbnail}
                />
                <GridListTileBar
                  title={image.title}
                  subtitle={<span>Date: {image.date}</span>}
                  actionIcon={
                    <IconButton
                      aria-label={`info about ${image.title}`}
                      className={classes.icon}
                    >
                      <FaExpand />
                    </IconButton>
                  }
                />
              </GridListTile>
            )}
          />
          {/* {images.map((image, index) => (
            
          ))} */}
        </GridList>
        <Viewer
          noImgDetails="true"
          visible={visible}
          activeIndex={viewingImageIndex}
          zoomSpeed="0.3"
          onClose={() => {
            setVisible(false);
          }}
          images={images}
        />
      </div>
    </Container></React.Fragment>
  );
};

export default PatientImagesPage;
