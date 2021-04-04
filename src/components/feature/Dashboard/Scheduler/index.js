import React, {useState, useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import strings from '../../../../configs/strings';
import figures from '../../../../configs/figures';
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/core
import Paper from '@material-ui/core/Paper';

// React-Scheduler
import {
  ViewState, GroupingState, IntegratedGrouping, IntegratedEditing, EditingState,
} from '@devexpress/dx-react-scheduler';

import {
  Scheduler,
  Resources,
  Appointments,
  AppointmentTooltip,
  GroupingPanel,
  DayView,
  WeekView,
  DragDropProvider,
  AppointmentForm,
  Toolbar,
  DateNavigator,
  ViewSwitcher,
} from '@devexpress/dx-react-scheduler-material-ui';


// Appointment
import CustomAppointmentContainer from './Appointment/CustomAppointmentContainer';
import CustomAppointment from './Appointment/CustomAppointment';
import CustomAppointmentTooltipHeader from './Appointment/CustomAppointmentTooltipHeader';
import CustomAppointmentTooltipContent from './Appointment/CustomAppointmentTooltipContent';
// TimeTable
import HolidayRow from './TimeTable/HolidayRow';
import CustomTimeTableCell from './TimeTable/CustomTimeTableCell';
import CustomTimeScaleLabel from './TimeTable/CustomTimeScaleLabel';
import CustomTimeScaleTicket from './TimeTable/CustomTimeScaleTicket';
import GroupingPanelCell from './TimeTable/GroupingPanelCell';
// Toolbar
import CustomToolbarRow from './Toolbar/CustomToolbarRow';
import SchedulerMenuItems from './Toolbar/SchedulerMenuItems';
import CustomDateNavigatorButtons from './Toolbar/CustomDateNavigatorButtons';
import CustomDateNavigatorOpenButton from './Toolbar/CustomDateNavigatorOpenButton';

import Empty from '../../../common/Empty';

// Utils
import {disableClick} from '../../../../utils/general';

// API
import api from '../../../../api/base-api';
import apiPath from '../../../../api/path';

const useStyles = makeStyles((theme) => ({
  paper: {
    '& div div:last-child div div:last-child div div:first-child div table:': {
      height: '100%'
    },
    '& div div:last-child div div:last-child div div:last-child table': {
      height: '100%'
    },
    // Container
    '& div div:last-child': {
      paddingRight: '0.1px',
    }
  }
}));

const calcTimeTableCellHeight = (containerHeight, startDayHour, endDayHour, duration) => {
  const numOfPeriods = (endDayHour - startDayHour) * Math.round(60 / duration);
  return Math.round(containerHeight * 100000 / numOfPeriods) / 100000;
}

const Schedulerr = (
  { 
    appointments, blocks, chairs, selectedDate, cellDuration, startDayHour, endDayHour, patientDisplayObj, holidays,
    tableCellClick, onSelectChair, onSelectDate, onSelectPatient
  }) => {
  const classes = useStyles();
  const [t, i18n] = useTranslation();
  
  // States
  const [timeTableCellHeight, setTimeTableCellHeight] = useState(calcTimeTableCellHeight(window.innerHeight - 135, startDayHour, endDayHour, cellDuration));

  // Filter instance
  const instances = [];
  const chairMap = {};
  chairs.forEach((chair) => {
    if (chair.isDisplay){
      instances.push(chair);
      chairMap[chair._id] = true;
    }
  })
  let data = [];
  let filterBlocks = [];
  if (patientDisplayObj && Object.keys(patientDisplayObj).length > 0){
    appointments.forEach((appoint) => {
      if (chairMap[appoint.chairId] && patientDisplayObj[appoint.title]){
        data.push(appoint);
      } else {
        filterBlocks.push({...appoint, filter: true});
      }
    })
  } else {
    data = appointments.filter((appoint) => chairMap[appoint.chairId]);
  }

  const resources = [
    {
      fieldName: 'chairId',
      title: 'Chair',
      instances: instances,
    }];
  const grouping = [{
      resourceName: 'chairId',
  }];

  // Holidays
  const holidayMsgs = (holidays.length > 0)? holidays[selectedDate.getMonth() + 1][selectedDate.getDate()] : "";
  // Use Effect
  useEffect(async () => {
    
  })

  // Tooltip
  const handleAppointmentTooltipEdit = (info, startDate, endDate) => {
    info.text = chairs[info.chairId - 1].text;
    tableCellClick(info, startDate, endDate);
  }

  const handleAppointmentTooltipDelete = () => {
    alert("Appointment Tooltip Delete");
  }

  const renderTimeTableCell = (props) => {
    return (
      <CustomTimeTableCell 
        {...props} 
        cellHeight={timeTableCellHeight}
        onClick={tableCellClick}
      />
    )
  }

  return (
    <React.Fragment>
      {(instances.length > 0)?
        <Paper className={classes.paper}>
          <Scheduler
            data={[...data, ...blocks, ...filterBlocks]}
          >
            <ViewState
              defaultCurrentDate={selectedDate}
              onCurrentDateChange={onSelectDate}
            />
            <Toolbar
              className={classes.Toolbar}
              rootComponent={CustomToolbarRow}
              flexibleSpaceComponent={
                (props) => <SchedulerMenuItems {...props} 
                  chairs={chairs} appointments={appointments} patientDisplayObj={patientDisplayObj} 
                  onSelectChair={onSelectChair} onSelectPatient={onSelectPatient}/>
              }
            />
            <DateNavigator 
              openButtonComponent={CustomDateNavigatorOpenButton}
              navigationButtonComponent={
                (props) => <CustomDateNavigatorButtons {...props}/>
              }
            />
            
            <GroupingState
              grouping={grouping}
            />
            {/* Holidays OR Scheduler */}
            {(!holidayMsgs)? 
              <DayView
                startDayHour={startDayHour}
                endDayHour={endDayHour}
                cellDuration={cellDuration}
                intervalCount={1}
                height={0}
                dayScaleRowComponent={Empty}
                timeScaleLabelComponent={
                  (props) => <CustomTimeScaleLabel cellHeight={timeTableCellHeight} {...props}/>
                }
                timeTableCellComponent={renderTimeTableCell}
                timeScaleTickCellComponent={
                  (props) => <CustomTimeScaleTicket cellHeight={timeTableCellHeight} {...props} />
                }
              />
              :
              <DayView
                startDayHour={0}
                endDayHour={0.1}
                cellDuration={cellDuration}
                intervalCount={1}
                height={0}
                dayScaleRowComponent={Empty}
                timeTableRowComponent={(props) => <HolidayRow {...props} message={holidayMsgs.join(" | ")}/>}
              />
            }
            <Appointments 
              containerComponent={
                (props) => <CustomAppointmentContainer width={99.92 / instances.length} {...props}/>
              }
              appointmentComponent={
                (props) => <CustomAppointment {...props}/>
              }
            />

            <Resources
              data={resources}
              mainResourceName="chairId"
            />

            <IntegratedGrouping />

            <AppointmentTooltip 
              showOpenButton
              showDeleteButton
              showCloseButton
              headerComponent={
                (props) => <CustomAppointmentTooltipHeader {...props} 
                onEdit={handleAppointmentTooltipEdit} 
                onDelete={handleAppointmentTooltipDelete}/>
              }
              contentComponent={
                (props) => <CustomAppointmentTooltipContent {...props}/>
              }
            />
            <AppointmentForm />
            <GroupingPanel 
              cellComponent={GroupingPanelCell}
            />
            {/*<DragDropProvider />*/}
          </Scheduler>
        </Paper>
      : ""
    }
    </React.Fragment>
  );
}

export default Schedulerr;