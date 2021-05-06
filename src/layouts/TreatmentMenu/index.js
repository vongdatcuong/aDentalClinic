import React, { useState } from "react";
import clsx from "clsx";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import strings from "../../configs/strings";
// Routes
import { useParams, useHistory } from "react-router-dom";
import path from "../../routes/path";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/core Icons
import Divider from "@material-ui/core/Divider";
import MenuIcon from "@material-ui/icons/Menu";
// Links Icons
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import PermMedia from "@material-ui/icons/PermMedia";
import ArrowBack from "@material-ui/icons/ArrowBack";
import AssignmentInd from "@material-ui/icons/AssignmentInd";
import ListIcon from '@material-ui/icons/List';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import { FaTeeth, FaXRay } from "react-icons/fa";

// Components
import CustomAvatar from "../../components/common/CustomAvatar";
import LinkList from "./LinkList";
// import GoBack from "./GoBack";
import styles from "./jss";

// Utils
import { disableClick } from "../../utils/general";

const useStyles = makeStyles(styles);
const TreatmentMenu = ({ patientID }) => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const history = useHistory();

  // States
  const [openLeftSidebarGhost, setOpenLeftSidebarGhost] = useState(false);

  const pathList = [
    {
      link: path.patientProfilePath.replace(":patientID", patientID),
      text: t(strings.patientProfile),
      icon: <AssignmentInd />,
    },
    {
      link: path.toothChartPath.replace(":patientID", patientID),
      text: t(strings.toothChart),
      icon: <FaTeeth />,
    },
    {
      link: path.patientNotePath.replace(":patientID", patientID),
      text: t(strings.note),
      icon: <InsertDriveFileIcon />,
    },
    {
      link: path.patientXRayImagesPath.replace(":patientID", patientID),
      text: t(strings.xRayImages),
      icon: <FaXRay />,
    },
    {
      link: path.patientImagesPath.replace(":patientID", patientID),
      text: t(strings.images),
      icon: <PermMedia />,
    },
    {
      link: path.patientPrescriptionPath.replace(':patientID', patientID),
      text: t(strings.prescription),
      icon: <ListIcon />,
    },
    {
      link: path.patientInfoPath.replace(':patientID', patientID),
      text: t(strings.info),
      icon: <ContactPhoneIcon />,
    },
    {
      link: path.patientRecallPath.replace(':patientID', patientID),
      text: t(strings.recall),
      icon: <AccessAlarmIcon />,
    },
  ];
  const links = <LinkList links={pathList} />;

  const getGoBackURL = () => {
    // nếu đang ở trang toothOverviewInfo thì quay về tooth chart, còn lại thì quay về ds patients
    let curUrl = window.location.pathname;
    if (
      curUrl.includes("xRayImages/view") ||
      curUrl.includes("xRayImages/add")
    ) {
      const newUrl = curUrl.substring(0, curUrl.lastIndexOf("/"));
      return newUrl.substring(0, newUrl.lastIndexOf("/"));
    } else if (curUrl.includes("toothOverviewInfo")) {
      return curUrl.substring(0, curUrl.lastIndexOf("/"));
    } else {
      return path.patientPath;
    }
  };

  const goBack = (
    <NavLink to={getGoBackURL()} className={classes.listItemLink}>
      <Tooltip title={t(strings.goBack)} aria-label={t(strings.goBack)}>
        <IconButton className={classes.goBackBtn} size="medium">
          <ArrowBack />
        </IconButton>
      </Tooltip>
    </NavLink>
  ); // TODO: Edit goBack URL

  //   const goBackbtn = <GoBack functions={[goBack]} />;

  const toggleLeftSidebar = (val) => {
    setOpenLeftSidebarGhost(val);
  };

  return (
    <React.Fragment>
      <div className={classes.miniLeftSidebarWrapper}>
        <Hidden mdUp implementation="css">
          <IconButton
            color="default"
            aria-label="toggle sidebar"
            component="span"
            onClick={() => toggleLeftSidebar(true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            variant="temporary"
            anchor="left"
            open={openLeftSidebarGhost}
            onClose={() => toggleLeftSidebar(false)}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            className={classes.drawer}
          >
            {/*<Divider className={classes.divider}/>*/}
            <div className={classes.sidebarWrapper}>
              {goBack}
              {links}
            </div>
          </Drawer>
        </Hidden>
      </div>
      <Hidden smDown implementation="css">
        <div className={classes.leftSidebarWrapper}>
          <Drawer
            anchor="left"
            variant="permanent"
            open
            className={classes.drawer}
          >
            {/*<Divider className={classes.divider}/>*/}
            <div className={classes.sidebarWrapper}>
              {goBack}
              <Divider />
              {links}
            </div>
          </Drawer>
        </div>
      </Hidden>
    </React.Fragment>
  );
};

export default TreatmentMenu;
