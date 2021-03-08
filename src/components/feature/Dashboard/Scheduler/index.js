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
import {
  teal, indigo,
} from '@material-ui/core/colors';

// Appointment
import CustomAppointmentContainer from './Appointment/CustomAppointmentContainer';
import CustomAppointment from './Appointment/CustomAppointment';
import CustomAppointmentTooltipHeader from './Appointment/CustomAppointmentTooltipHeader';
import CustomAppointmentTooltipContent from './Appointment/CustomAppointmentTooltipContent';
// TimeTable
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

// Dialogs
import MakeAppointmentDialog from './Appointment/MakeAppointmentDialog';

// Utils
import {disableClick} from '../../../../utils/general';

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
      paddingRight: '0.1px'
    }
  }
}));

const generateTimeTable = (startDayHour, endDayHour, duration) => {
  const numOfPeriods = (endDayHour - startDayHour) * Math.round(60 / duration);
  const timeTable = {};
  return timeTable;
}

const calcTimeTableCellHeight = (containerHeight, startDayHour, endDayHour, duration) => {
  const numOfPeriods = (endDayHour - startDayHour) * Math.round(60 / duration);
  return Math.round(containerHeight * 100000 / numOfPeriods) / 100000;
}

const Schedulerr = (props) => {
  const classes = useStyles();
  const [t, i18n] = useTranslation();

  const appointments = [{
    id: 0,
    title: 'Watercolor Landscape',
    chairId: 1,
    startDate: new Date(2017, 4, 29, 7, 15),
    endDate: new Date(2017, 4, 29, 9, 0),
  }, {
    id: 1,
    title: 'Oil Painting for Beginners',
    chairId: 2,
    startDate: new Date(2017, 4, 29, 10, 30),
    endDate: new Date(2017, 4, 29, 11, 30),
  }, {
    id: 2,
    title: 'Testing',
    chairId: 1,
    startDate: new Date(2017, 4, 29, 10, 30),
    endDate: new Date(2017, 4, 29, 11, 30),
  }, {
    id: 3,
    title: 'Final exams',
    chairId: 3,
    startDate: new Date(2017, 4, 29, 12, 30),
    endDate: new Date(2017, 4, 29, 13, 0),
  }];
  
  
  const chairs = [
    { text: `${t(strings.chair)} 1`, id: 1 },
    { text: `${t(strings.chair)} 2`, id: 2 },
    { text: `${t(strings.chair)} 3`, id: 3 },
    //{ text: '`${t(strings)} 4`, id: 4 },
  ];
  
  // States
  const [cellDuration, setCellDuration] = useState(figures.defaultCellDuration);
  const [startDayHour, setStartDayHour] = useState(figures.defaultStartDayHour);
  const [endDayHour, setEndDayHour] = useState(figures.defaultEndDayHour);
  const [timeTable, setTimeTable] = useState(generateTimeTable(startDayHour, endDayHour, cellDuration));
  const [timeTableCellHeight, setTimeTableCellHeight] = useState(calcTimeTableCellHeight(window.innerHeight - 130, startDayHour, endDayHour, cellDuration))
  //const [chosenDuration, setChosenDuration] = useState(45);
  //const [numOfChosenCell, setNumOfChosenCell] = useState(chosenDuration / cellDuration);

  // Appointments Dialog
  const [appointmentData, setAppointmentData] = useState({});
  const [openAppointmentDialog, setOpenAppointmentDialog] = useState(false);

  const data = appointments;
  const resources = [
    {
      fieldName: 'chairId',
      title: 'Chair',
      instances: chairs,
    }];
  const grouping = [{
      resourceName: 'chairId',
  }];

  const handleTimeTableCellClick = (info, startDate, endDate) => {
    try {
      setAppointmentData({
        info: info,
        startDate: startDate,
        endDate: endDate
      });
      handleOpenAppointmentDialog();
    } catch(err){

    }
  }

  const handleAppointmentTooltipEdit = (info, startDate, endDate) => {
    info.text = chairs[info.chairId - 1].text;
    handleTimeTableCellClick(info, startDate, endDate);
  }

  const handleAppointmentTooltipDelete = () => {
    alert("Appointment Tooltip Delete");
  }

  const handleOpenAppointmentDialog = () => {
    setOpenAppointmentDialog(true);
  };

  const handleCloseAppointmentDialog = () => {
    setOpenAppointmentDialog(false);
  };

  useEffect(() => {

  })

  const renderTimeTableCell = (props) => {
    const endDay = new Date(props.endDate.toString());
    const stateArr = timeTable[props.groupingInfo[0].id];
    const numOfPeriods = 60 / cellDuration;
    let index = (endDay.getHours() - startDayHour) * numOfPeriods + Math.round(endDay.getMinutes() / cellDuration);
    index = (index > 0)? index - 1 : index;
    return (
      <CustomTimeTableCell 
      {...props} 
      cellHeight={timeTableCellHeight}
      indexInRow={index} 
      //state={stateArr[index]} 
      onClick={handleTimeTableCellClick}
      />
    )
  }

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <Scheduler
          data={data}
        >
          <ViewState
            defaultCurrentDate="2017-05-29"
          />
          <Toolbar
            className={classes.Toolbar}
            rootComponent={CustomToolbarRow}
            flexibleSpaceComponent={
              (props) => <SchedulerMenuItems {...props} numOfChair={2} onClick={disableClick}/>
            }
          />
          <DateNavigator 
            openButtonComponent={CustomDateNavigatorOpenButton}
            navigationButtonComponent={CustomDateNavigatorButtons}
          />
          
          <GroupingState
            grouping={grouping}
          />

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
          <Appointments 
            containerComponent={
              (props) => <CustomAppointmentContainer width={100 / chairs.length} {...props}/>
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
      <MakeAppointmentDialog
        open={openAppointmentDialog}
        onClose={handleCloseAppointmentDialog}
        data={appointmentData}
      />
    </React.Fragment>
  );
}

export default Schedulerr;