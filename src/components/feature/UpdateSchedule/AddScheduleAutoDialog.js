import React, { useState, useEffect} from 'react';
import { makeStyles  } from "@material-ui/core/styles";
import strings from '../../../configs/strings';
import lists from '../../../configs/lists';

// i18next
import { useTranslation } from 'react-i18next';

// Toast

// moment

// React-day-picker
import DayPicker, { DateUtils } from 'react-day-picker';

// @material-ui/core Component
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// Icons

// Utils
import ConvertDateTimes from '../../../utils/datetimes/convertDateTimes';

const useStyles = makeStyles((theme) => ({
    paper: {
        width: theme.addScheduleMonthlyWidth,
        height: theme.addScheduleMonthlyHeight,
        maxWidth: '100%',
        textAlign: 'center'
    },
    dialogTitle: {
        fontWeight: 700,
        textAlign: 'center'
    },
    dialogContext: {
      '& .DayPicker': {
        border: '1px solid #000000',
        borderRadius: '5px'
      }
    },
    formMessageSuccess: {
        textAlign: "left",
        fontSize: "12px",
        color: theme.successColor[0],
        marginBottom: theme.spacing(1)
    },
    formMessageFail: {
        textAlign: "left",
        fontSize: "12px",
        color: theme.dangerColor[0],
        marginTop: '4px',
        marginLeft: theme.spacing(1.5),
        marginBottom: theme.spacing(1.5)
    },
}));


const AddScheduleAuto = ({
    open, schedule, dates,
    onClose, onAddSchedule, onUpdateSchedule
}) => {
  const classes = useStyles();
  const [t, i18n] = useTranslation();

  // States
    const [scheduleID, setScheduleID] = useState(null);
    const [selectedDate, setSelectedDate] = useState([]);

    const [datesErrMsg ,setDatesErrMsg] = useState("");


  // use effect
  useEffect(async () => {
    setScheduleID(schedule);
    setSelectedDate(dates.map((date) => date.value));
  }, [open, schedule, dates]);

  const handleOnClose = () => {
    onClose();
  }

   const handleSelectDate = (day, {selected}) => {
    const newSelectedDay = [...selectedDate];
    if (selected) {
      const selectedIndex = newSelectedDay.findIndex(selectedDay =>
        DateUtils.isSameDay(selectedDay, day)
      );
      newSelectedDay.splice(selectedIndex, 1);
    } else {
      newSelectedDay.push(day);
    }
    setSelectedDate(newSelectedDay);
  };

  const handleOnApply = (evt) => {
    evt.preventDefault();
    let isValid = true;

    if (selectedDate.length == 0){
        setDatesErrMsg(t(strings.datesErrMsg));
        isValid = false;
    } else {
        setDatesErrMsg("");
    }

    if (!isValid){
      return;
    }

    const tempDate = [...selectedDate];
    tempDate.sort((a, b) => a - b);
    let val = "";
    tempDate.forEach((date, index) => {
      if (index != 0){
        val+= ",";
      };
      val+= ConvertDateTimes.formatDate(date, strings.apiDateFormat);
    })

    const data = {
      start_date: ConvertDateTimes.formatDate(new Date(), strings.apiDateFormat),
      mode: lists.schedule.mode.auto,
      value: val
    }
    if (!scheduleID){
      onAddSchedule(data);
    } else {
      onUpdateSchedule(scheduleID, data);
    }
  }

  return (
    <Paper>
      <Dialog
        open={open}
        onClose={handleOnClose}
        aria-labelledby="add-schedule-auto"
        classes={{ 
          paper: classes.paper,
        }}
      >
        <DialogTitle id="add-schedule-auto" className={classes.dialogTitle}>{t(strings.auto)}</DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.dialogContext}>
            <DayPicker
              selectedDays={selectedDate}
              onDayClick={handleSelectDate}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleOnClose} color="secondary" variant="outlined" autoFocus>
            {t(strings.cancel)}
          </Button>
          <Button onClick={handleOnApply} color="primary" variant="contained">
            {t(strings.ok)}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

export default AddScheduleAuto;