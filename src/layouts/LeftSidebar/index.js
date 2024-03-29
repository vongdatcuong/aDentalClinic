import React, {useState, useContext} from "react";
import {
  useHistory
} from "react-router-dom";
import { useTranslation } from 'react-i18next';
import strings from '../../configs/strings';
// Routes
import path from "../../routes/path";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/core Icons
import MenuIcon from '@material-ui/icons/Menu';
  // Links Icons
  import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
  import { FaUserInjured } from "react-icons/fa";
  import AssessmentIcon from '@material-ui/icons/Assessment';
  import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
  import SettingsIcon from '@material-ui/icons/Settings';
  import ExitToAppIcon from '@material-ui/icons/ExitToApp';

// Components
import CustomAvatar from '../../components/common/CustomAvatar';
import LinkList from './LinkList';
import FunctionList from './FunctionList';
import Notification from './Notification';
import NotificationPopover from './Notification/NotificationPopover';
import styles from "./jss";

// Contexts
import { socketStore } from '../../contexts/socket-context';

// API
import AuthService from '../../api/authentication/auth.service';



const useStyles = makeStyles(styles);
const LeftSidebar = (props) => {
    const classes = useStyles();
    const {t, i18n } = useTranslation();
    const history = useHistory();

    const user = AuthService.getCurrentUser();

    // Contexts
    const {socketState, dispatchSocket} = useContext(socketStore);

    // States
    const [openLeftSidebarGhost, setOpenLeftSidebarGhost] = useState(false);
    const [openNotiPopover, setOpenNotiPopover] = useState(false);

    const [notiPopAnchorEl, setNotiPopAnchorEl] = useState(null);
    const popOverId = openNotiPopover? "notification-popover" : undefined;

    // Notification
    const [notifications, setNotifications] = useState([
      {
        id: 1,
        user: {},
        content: "User 1 register package ABC for 3 years from 2021",
        date: new Date(),
        isRead: false
      },
      {
        id: 2,
        user: {},
        content: "User 2 register package ABC for 3 years from 2021",
        date: new Date(),
        isRead: false
      },
      {
        id: 3,
        user: {},
        content: "User 3 register package ABC for 3 years from 2021",
        date: new Date(),
        isRead: true
      }
    ]);


    const pathList = [
      {
        link: path.dashboardPath,
        text: t(strings.appointment),
        icon: <CalendarTodayIcon/>
      },
      {
        link: path.patientPath,
        text: t(strings.patient),
        icon: <FaUserInjured/>
      },
      {
        link: path.reportPath,
        text: t(strings.report),
        icon: <AssessmentIcon/>
      },
      {
        link: path.managementsPath,
        text: t(strings.management),
        icon: <BusinessCenterIcon/>
      },
      {
        link: path.settingsPath,
        text: t(strings.settings),
        icon: <SettingsIcon/>
      }
    ]
    const links = <LinkList
      links={pathList}
    />

    // Notifications Popover
    const handleOpenNotiPopover = (evt) => {
      setNotiPopAnchorEl(evt.currentTarget);
      setOpenNotiPopover(true);
    }

    const handleCloseNotiPopover = () => {
      setNotiPopAnchorEl(null);
      setOpenNotiPopover(false);
    }

    const onNotificationClick = (notiId) => {
      const newNotifications = [...notifications];
      newNotifications.forEach((notification) => {
        if (notification.id == notiId){
          notification.isRead = true;
        }
      })
      setNotifications(newNotifications);
    }

    const handleRemoveNotification = (notiId) => {
      setNotifications(notifications.filter((notification) => notification.id != notiId));
    }

    const handleLogout = () => {
      AuthService.logOut();
      dispatchSocket({type: strings.disconnectSocket})
      history.push(path.loginPath);
    }

    const notification = 
      <Notification
        onOpen={handleOpenNotiPopover}
        popOverId={popOverId}
        notiCount={notifications.filter((noti) => !noti.isRead).length}
      />

    const logout = 
        <Tooltip title={t(strings.logout)} aria-label={t(strings.logout)}>
          <IconButton className={classes.listItemBtn} size="medium" onClick={handleLogout}>
            <ExitToAppIcon/>
          </IconButton>
        </Tooltip>

    const funcList = <FunctionList
      functions={[/*notification,*/ logout]}
    />

    const toggleLeftSidebar = (val) => {      
      setOpenLeftSidebarGhost(val);
    }


    return (
      <React.Fragment>
        <div className={classes.miniLeftSidebarWrapper}>
          <Hidden mdUp implementation="css">
              <IconButton color="default" aria-label="toggle sidebar" component="span"
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
                  keepMounted: true // Better open performance on mobile.
                  }}
                  className={classes.drawer}
              >
                <CustomAvatar
                    link={path.settingsPath}
                    src="https://www.w3schools.com/w3images/avatar2.png"
                    user={user}
                  />
                  {/*<Divider className={classes.divider}/>*/}
                  <div className={classes.sidebarWrapper}>
                    {links}
                    {funcList}
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
                  <CustomAvatar
                    link={path.settingsPath}
                    src="https://www.w3schools.com/w3images/avatar2.png"
                    user={user}
                  />
                  {/*<Divider className={classes.divider}/>*/}
                  <div className={classes.sidebarWrapper}>
                    {links}
                    {funcList}
                  </div>
              </Drawer>
          </div>
        </Hidden>
        <NotificationPopover
          id={popOverId}
          open={openNotiPopover}
          onClose={handleCloseNotiPopover}
          anchorEl={notiPopAnchorEl}
          notifications={notifications}
          onNotificationClick={onNotificationClick}
          onRemoveNotification={handleRemoveNotification}
        />
      </React.Fragment>
    );
  }

export default LeftSidebar;