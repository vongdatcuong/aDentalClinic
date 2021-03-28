import React, {useState, useContext} from "react";
import clsx from "clsx";
import { useTranslation } from 'react-i18next';
import {moment} from 'moment';
import strings from '../../configs/strings';
// Routes
import path from "../../routes/path";
// @material-ui/core components
import { makeStyles, useTheme  } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";

// @material-ui/core Icons
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

// react-day-picker
import DayPicker from 'react-day-picker';

// Components

// Contexts


import styles from "./jss";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(styles);

const RightSidebar = ({ handleSelectDate }) => {
    const classes = useStyles();
    const {t, i18n } = useTranslation();

    // States
    const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
    const [calendarDate, setCalendarDate] = useState(new Date());

    const toggleDrawer = () => {
      setRightSidebarOpen(!rightSidebarOpen);
    }

    return (
      <div className={clsx(classes.rightSidebarWrapper, !rightSidebarOpen && classes.rightSidebarCloseWrapper)}>
        <Drawer
            variant="permanent"
            anchor="right"
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: rightSidebarOpen,
                [classes.drawerClose]: !rightSidebarOpen,
            })}
            classes={{
                paper: clsx({
                    [classes.drawerOpen]: rightSidebarOpen,
                    [classes.drawerClose]: !rightSidebarOpen,
                }),
            }}
        >
          <IconButton onClick={toggleDrawer} className={classes.toggleBtn}>
              {rightSidebarOpen ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
          <Divider />
          <div className={clsx(classes.sidebarContent, rightSidebarOpen && classes.displayBlock)}>
            <DayPicker 
              className={classes.calendar}
              onDayClick={handleSelectDate}
            />
            <Divider />
            <div className={classes.appointmentHolder}>
              <Typography component="h6" variant="h6">{t(strings.appointmentHolder)}</Typography>
              <Box className={classes.appointmentHolderBox}>
                
              </Box>
            </div>
            <Divider />
            <div className={classes.todayAppoinment}>
              <Typography component="h6" variant="h6">{t(strings.todayAppointment)}</Typography>
              <Box className={classes.todayAppoinmentBox}>
                
              </Box>
            </div>
          </div>
        </Drawer>
      </div>
    );
  }

export default RightSidebar;