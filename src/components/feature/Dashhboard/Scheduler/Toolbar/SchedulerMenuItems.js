
import React, {memo}  from 'react';
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

const SchedulerMenuItems = ({ numOfChair, onClick }) => {
  const classes = useStyles();
  const [t, i18n] = useTranslation();
  return (
    <Box display="flex" justifyContent="flex-start" pt={0} pb={0}>
        <Box p={1} pl={4} pr={4} className={classes.toolBarItem} onClick={onClick}>
          <FilterListIcon className={classes.itemIcon}/>
           {t(strings.chairs)} ({numOfChair})
        </Box>
        <Box p={1} pl={4} pr={4} className={classes.toolBarItem} onClick={onClick}>
          <AssignmentIndIcon className={classes.itemIcon}/>
          {t(strings.all)}
        </Box>
    </Box>
  );
};

export default SchedulerMenuItems