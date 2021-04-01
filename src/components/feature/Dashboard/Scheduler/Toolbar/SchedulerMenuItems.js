
import React, {memo, useState, useEffect}  from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from "@material-ui/core/styles";
import strings from '../../../../../configs/strings';

// @material-ui/core
import { 
  Box
} from '@material-ui/core';
import {
  
} from '@devexpress/dx-react-scheduler-material-ui';
// Material UI Icons
import FilterListIcon from '@material-ui/icons/FilterList';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';

// Component
import FilterChairPopover from './FilterChairPopover';
import FilterPatientPopover from './FilterPatientPopover';

const useStyles = makeStyles((theme) => ({
  toolBarItem: {
    borderLeft: `2px solid ${theme.whiteColor}`,
    fontSize: '1.2em',
    fontWeight: '600',
    cursor: 'pointer'
  },
  itemIcon: {
    verticalAlign: 'text-bottom',
    fontSize: '1.2em',
    marginRight: theme.spacing(1)
  }
}));

const SchedulerMenuItems = ({ chairs, appointments, patientDisplayObj, onSelectChair, onSelectPatient }) => {
  const classes = useStyles();
  const [t, i18n] = useTranslation();

  // States
  // Filter Chair
  const [openFilterChairPopover, setOpenFilterChairPopover] = useState(false);
  const [filterChairAnchorEl, setFilterChairAnchorEl] = useState(null);
  const filterChairPopOverId = openFilterChairPopover? "filter-chair-popover" : undefined;

  // Filter Patient
  const [openFilterPatientPopover, setOpenFilterPatientPopover] = useState(false);
  const [filterPatientAnchorEl, setFilterPatientAnchorEl] = useState(null);
  const filterPatientPopOverId = openFilterPatientPopover? "filter-patient-popover" : undefined;

  // Use effect
  useEffect(() => {

  }, []);

  // Filter chair
  const handleOpenFilterChair = (evt) => {
    setFilterChairAnchorEl(evt.currentTarget);
    setOpenFilterChairPopover(true);
  }

  const handleCloseFilterChair = (evt) => {
    setOpenFilterChairPopover(false);
  }

  const handleSelectChair = (chairsDisplay) => {
    setOpenFilterChairPopover(false);
    onSelectChair(chairsDisplay);
  }

  // Filter patient
  const handleOpenFilterPatient = (evt) => {
    setFilterPatientAnchorEl(evt.currentTarget);
    setOpenFilterPatientPopover(true);
  }

  const handleCloseFilterPatient = (evt) => {
    setOpenFilterPatientPopover(false);
  }

  const handleSelectPatient = (patientDisplayObj) => {
    setOpenFilterPatientPopover(false);
    onSelectPatient(patientDisplayObj);
  }

  return (
    <Box display="flex" justifyContent="flex-start" pt={0} pb={0}>
        <Box p={1} pl={4} pr={4} className={classes.toolBarItem} onClick={handleOpenFilterChair} ref={(el) => setFilterChairAnchorEl(el)}>
          <FilterListIcon className={classes.itemIcon}/>
            {t(strings.chairs)} ({chairs.length})
           
        </Box>
        <Box p={1} pl={4} pr={4} className={classes.toolBarItem} onClick={handleOpenFilterPatient} ref={(el) => setFilterPatientAnchorEl(el)}>
          <AssignmentIndIcon className={classes.itemIcon}/>
          {t(strings.patient)}
        </Box>
        <FilterChairPopover
            id={filterChairPopOverId}
            open={openFilterChairPopover}
            onClose={handleCloseFilterChair}
            anchorEl={filterChairAnchorEl}
            chairs={chairs}
            onApply={handleSelectChair}
           />
        <FilterPatientPopover
          id={filterPatientPopOverId}
          open={openFilterPatientPopover}
          onClose={handleCloseFilterPatient}
          anchorEl={filterPatientAnchorEl}
          appointments={appointments}
          patientDisplayObj={patientDisplayObj}
          onApply={handleSelectPatient}
        />
    </Box>
  );
};

export default SchedulerMenuItems