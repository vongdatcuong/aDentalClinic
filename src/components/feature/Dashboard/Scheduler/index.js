import React, {useState, useEffect, memo} from 'react';
import { useTranslation } from 'react-i18next';
import strings from '../../../../configs/strings';
import figures from '../../../../configs/figures';
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/core
import Paper from '@material-ui/core/Paper';

// @fullcalendar
import FullCalendar, { formatDate } from '@fullcalendar/react';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import interactionPlugin from '@fullcalendar/interaction';

// Appointment
import AppointmentTooltipPopover from './Appointment/AppointmentTooltipPopover';
// TimeTable
import HolidayMsgView from './TimeTable/HolidayMsgView';
// Toolbar
import FilterChairPopover from './Toolbar/FilterChairPopover';
import FilterPatientPopover from './Toolbar/FilterPatientPopover';
import FilterOnlyMinePopover from './Toolbar/FilterOnlyMinePopover';

// Utils

// API
import api from '../../../../api/base-api';
import apiPath from '../../../../api/path';

const useStyles = makeStyles((theme) => ({
  paper: {
    paddingTop: theme.spacing(1),
    '& .fc-timegrid-col-events': {
      margin: 0
    },
    color: theme.textColor,
    backgroundColor: theme.pageBackgroundColor,
  }
}));

const Schedulerr = (
  { 
    user, isImmutable, calendarRef, appointments, blocks, chairs, selectedDate, cellDuration, startDayHour, endDayHour, patientDisplayObj, onlyMine, holidays, 
    openAppointTooltip, tableCellClick, tableCellSelect, onSelectChair, onSelectDate, onSelectPatient, onSelectOnlyMine, onToPatientProfile, onUpdateAppointment, onDeleteAppointment, setOpenAppointTooltip
  }) => {
  const classes = useStyles();
  const [t, i18n] = useTranslation();
  
  // States
  const [timeTableHeight, setTimeTableHeight] = useState(window.innerHeight - 100);

   // Filter Chair
   const [openFilterChairPopover, setOpenFilterChairPopover] = useState(false);
   const [filterChairAnchorEl, setFilterChairAnchorEl] = useState(null);
   const filterChairPopOverId = openFilterChairPopover? "filter-chair-popover" : undefined;
 
   // Filter Patient
   const [openFilterPatientPopover, setOpenFilterPatientPopover] = useState(false);
   const [filterPatientAnchorEl, setFilterPatientAnchorEl] = useState(null);
   const filterPatientPopOverId = openFilterPatientPopover? "filter-patient-popover" : undefined;

   // Filter Only mine
   const [openFilterOnlyMinePopover, setOpenFilterOnlyMinePopover] = useState(false);
   const [filterOnlyMineAnchorEl, setFilterOnlyMineAnchorEl] = useState(null);
   const filterOnlyMinePopOverId = openFilterOnlyMinePopover? "filter-onlymine-popover" : undefined;

   // Appointment tooltip popover
   //const [openAppointTooltip, setOpenAppointTooltip] = useState(false);
   const [appointTooltip, setAppointTooltip] = useState({});
   const [appointTooltipPos, setAppointTooltipPos] = useState({left: 200, top: 200});
   const [popoverAppointID, setPopoverAppointID] = useState("");
   const appointTooltipPopoverId = 'appointment-tooltip-popover';

  // Filter instance
  const instances = [];
  const chairMap = Object.create(null);
  chairs.forEach((chair) => {
    if (chair.isDisplay){
      instances.push(chair);
      chairMap[chair._id] = true;
    }
  })
  let data = [];
  let filterBlocks = [];
  let providerID = user?.staff_id || "";
  if (patientDisplayObj && Object.keys(patientDisplayObj).length > 0){
    appointments.forEach((appoint) => {
      if (chairMap[appoint.resourceId] && patientDisplayObj[appoint.title]){
        data.push(appoint);
      } else {
        filterBlocks.push({...appoint, filter: true});
      }
    })
  } else {
    data = appointments.filter((appoint) => chairMap[appoint.resourceId]);
  }
  if (onlyMine){
    data = data.filter((appoint => {
      if (appoint.providerID === providerID){
        return true;
      } else {
        filterBlocks.push({...appoint, filter: true});
        return false;
      }
    }));
  }

  // Holidays
  const holidayMsgs = (holidays.length > 0)? holidays[selectedDate.getMonth() + 1][selectedDate.getDate()] : "";
  let currentView = (holidays.length > 0 && holidays[selectedDate.getMonth() + 1][selectedDate.getDate()])? "HolidayMsg" : "resourceTimeGrid";

  // Use Effect
  useEffect(async () => {

  })

  // Filter chair
  const handleOpenFilterChair = (evt) => {
    setFilterChairAnchorEl(evt.target);
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
    setFilterPatientAnchorEl(evt.target);
    setOpenFilterPatientPopover(true);
  }

  const handleCloseFilterPatient = (evt) => {
    setOpenFilterPatientPopover(false);
  }

  const handleSelectPatient = (patientDisplayObj) => {
    setOpenFilterPatientPopover(false);
    onSelectPatient(patientDisplayObj);
  }

  // Filter only mine
  const handleOpenFilterOnlyMine = (evt) => {
    setFilterOnlyMineAnchorEl(evt.target);
    setOpenFilterOnlyMinePopover(true);
  }

  const handleSelectOnlyMine = (val) => {
    setOpenFilterOnlyMinePopover(false);
    onSelectOnlyMine(val);
  }

  const handleCloseFilterOnlyMine = (evt) => {
    setOpenFilterOnlyMinePopover(false);
  }

  // Appointment Tooltip Popover
  const handleOpenAppointTooltip = (bound, appointment) => {
    setOpenAppointTooltip(true);
    setAppointTooltipPos(bound);
    setAppointTooltip(appointment);
    setPopoverAppointID(appointment.id);
  }

  const handleCloseAppointTooltip = () => {
    setOpenAppointTooltip(false);
    setAppointTooltipPos({left: 0, top: 0});
    setPopoverAppointID("");
  }

  // To Patient Profile
  const handleToPatientProfile = () => {
    onToPatientProfile(popoverAppointID);
  }

  // Update appointment
  const handleUpdateAppointment = () => {
    onUpdateAppointment(popoverAppointID);
    handleCloseAppointTooltip();
  }
  // Delete Appointment
  const handleDeleteAppointment = () => {
    onDeleteAppointment(popoverAppointID);
  }

  const customBtns = {
    filterChairButton: {
      text: t(strings.chairs),
      click: (evt) => {
        handleOpenFilterChair(evt);
      },
    },
    filterPatientButton: {
      text: t(strings.patient),
      click: (evt) => {
        handleOpenFilterPatient(evt);
      },
    },
    filterOnlyMine: {
      text: t(strings.onlyMine),
      click: (evt) => {
        handleOpenFilterOnlyMine(evt);
      }
    }
  }

  return (
    <React.Fragment>
      {(instances.length > 0 && holidays.length > 0)?
        <Paper className={classes.paper} >
          <FullCalendar
              ref={calendarRef}
              schedulerLicenseKey='CC-Attribution-NonCommercial-NoDerivatives'
              plugins={[resourceTimeGridPlugin, interactionPlugin, HolidayMsgView]}
              initialView={currentView}
              headerToolbar={{
                left: 'prev,next,today,filterChairButton,filterPatientButton' + (isImmutable? ',filterOnlyMine' : ""),
                center: 'title',
                right: '',
              }}
              customButtons={customBtns}
              buttonText={{
                today: t(strings.today)
              }}
              resources={instances}
              eventDidMount={(info) => {
                const props = info.event.extendedProps;
                // UI Blocks & Filter
                if (props){
                  const el = info.el;
                  if (props.block){
                    el.innerHTML="";
                    el.style.background = '#cccccc';
                    el.style.backgroundImage = 'repeating-linear-gradient(60deg,transparent,transparent 2px,#eeeeee 0,#eeeeee 7px)';
                  } else if (props.filter){
                    el.innerHTML="";
                    el.style.background = '#00ff00';
                    el.style.backgroundImage = 'repeating-linear-gradient(60deg,transparent,transparent 2px,#eeeeee 0,#eeeeee 7px)';
                  }
                }
              }}
              initialDate={selectedDate}
              //editable={true}
              selectable={!isImmutable}
              selectOverlap={false}
              //selectMirror={true}
              dayMaxEvents={true}
              height={timeTableHeight}
              expandRows={true}
              allDaySlot={false}
              slotDuration={`00:${cellDuration}`}
              slotMinTime={startDayHour}
              slotMaxTime={endDayHour}
              slotLabelFormat={
                {
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: false
                }
              }
              eventTimeFormat={
                {
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: false
                }
              }
              events={[...data, ...blocks, ...filterBlocks]}
              dateClick={(info) => {
                tableCellClick(info.resource._resource.id, info.date);
              }}
              select={(info) => {
                tableCellSelect(info.resource._resource.id, info.start, info.end);
              }}
              eventClick={(info) => {
                const evt = info.jsEvent;
                const el = info.el;
                const appointment = info.event.extendedProps;
                const bound = el.getBoundingClientRect();
                evt.preventDefault();
                if (!appointment.block && !appointment.filter){
                  handleOpenAppointTooltip({left: bound.x, top: bound.y}, 
                    Object.assign({
                      id: info.event.id,
                      title: info.event._def.title,
                      start: info.event.start,
                      end: info.event.end,
                      backgroundColor: info.event.backgroundColor
                    }, info.event.extendedProps));
                }
              }}
              datesSet={(date, info) => {
                const current = date.start;
                if (holidays.length > 0 && holidays[current.getMonth() + 1][current.getDate()]){
                  if (currentView != "HolidayMsg" && calendarRef.current){
                    calendarRef.current.getApi().changeView("HolidayMsg");
                    currentView="HolidayMsg";
                  }
                } else {
                  if (currentView != "resourceTimeGrid" && calendarRef.current){
                    calendarRef.current.getApi().changeView("resourceTimeGrid");
                    currentView="resourceTimeGrid";
                  }
                  onSelectDate(date);
                }
              }}
            >
              
            </FullCalendar>
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
            <FilterOnlyMinePopover
                id={filterOnlyMinePopOverId}
                open={openFilterOnlyMinePopover}
                onClose={handleCloseFilterOnlyMine}
                anchorEl={filterOnlyMineAnchorEl}
                onlyMine={onlyMine}
                onApply={handleSelectOnlyMine}
            />
            <AppointmentTooltipPopover
              isToProfile={true}
              isEditable={true}
              isDeletable={!isImmutable}
              id={appointTooltipPopoverId}
              open={openAppointTooltip}
              onClose={handleCloseAppointTooltip}
              anchorPos={appointTooltipPos}
              appointment={appointTooltip}
              onToPatientProfile={handleToPatientProfile}
              onUpdateAppointment={handleUpdateAppointment}
              onDeleteAppointment={handleDeleteAppointment}
            />
        </Paper>
        
      : ""
    }
    
    </React.Fragment>
  );
}

const MemorizedSchedulerr = memo(Schedulerr);

export default MemorizedSchedulerr;