import React, { useState } from "react";
import clsx from "clsx";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import strings from "../../configs/strings";
// Routes
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
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import PeopleIcon from "@material-ui/icons/People";
import AssessmentIcon from "@material-ui/icons/Assessment";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ArrowBack from "@material-ui/icons/ArrowBack";
import AssignmentInd from "@material-ui/icons/AssignmentInd";
import { FaTeeth } from "react-icons/fa";

// Components
import CustomAvatar from "../../components/common/CustomAvatar";
import LinkList from "./LinkList";
// import GoBack from "./GoBack";
import styles from "./jss";

// Utils
import { disableClick } from "../../utils/general";

const useStyles = makeStyles(styles);
const TreatmentMenu = (props) => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();

  // States
  const [openLeftSidebarGhost, setOpenLeftSidebarGhost] = useState(false);

  const pathList = [
    {
      link: path.toothChartPath,
      text: t(strings.toothChart),
      icon: <FaTeeth />,
    },
    {
      link: path.patientDashboardPath,
      text: t(strings.dashboard),
      icon: <AssignmentInd />,
    },
    {
      link: path.patientReportPath,
      text: t(strings.report),
      icon: <InsertDriveFileIcon />,
    },
  ];
  const links = <LinkList links={pathList} />;

  const goBack = (
    <NavLink to="/patient" className={classes.listItemLink}>
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
