import React, { useState, useEffect, useRef} from 'react';
import { makeStyles } from "@material-ui/core/styles";
import strings from '../../../configs/strings';
import lists from '../../../configs/lists';

// i18next
import { useTranslation } from 'react-i18next';

// React-day-picker
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from 'react-day-picker/moment';

// @material-ui/core Component
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import Link from '@material-ui/core/Link';

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
    calendarIcon: {
        color: theme.primaryColor[0],
        verticalAlign: 'middle',
        marginLeft: theme.spacing(2)
    },
    inputFrom: {
        display: 'inline-block',
        verticalAlgin: 'text-bottom',
        marginLeft: theme.spacing(1),
        '& input': {
            border: `2px solid ${theme.hoverDarkColor[1]}`,
            borderRadius: '5px',
            padding: theme.spacing(1),
            '&::placeholder': {
                color: theme.fontColor,
                opacity: 1,
            },
            [theme.breakpoints.down('xs')]: {
                width: '120px'
            },
            '&:hover': {
                cursor: 'text'
            }
        },
    },
    inputTo: {
        '& input': {
            border: `2px solid ${theme.hoverDarkColor[1]}`,
            borderRadius: '5px',
            padding: theme.spacing(1),
            '&::placeholder': {
                color: theme.fontColor,
                opacity: 1,
            },
            [theme.breakpoints.down('xs')]: {
                width: '120px'
            },
            '&:hover': {
                cursor: 'text'
            }
        }
    },
    selectContainer: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(3)
    },
    clearEndDateBtn: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(1),
      cursor: 'pointer'
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

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 550,
      width: 200,
    },
  },
  anchorOrigin: {
    vertical: 'top',
    horizontal: 'left',
  },
  transformOrigin: {
    vertical: 'bottom',
    horizontal: 'left',
  },
  variant: "menu"
};

const AddScheduleMonthly = ({
    open, schedule, dates, startDate, endDate,
    onClose, onAddSchedule, onUpdateSchedule
}) => {
  const classes = useStyles();
  const [t, i18n] = useTranslation();

  // States
    const [scheduleID, setScheduleID] = useState(null);
    const [selectedDate, setSelectedDate] = useState([]);
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const fromRef = useRef(null);
    const toRef = useRef(null);

    const dateModifiers = { start: fromDate, end: toDate };

    const [startDateErrMsg, setStartDateErrMsg] = useState("");
    const [datesErrMsg ,setDatesErrMsg] = useState("");


  // use effect
  useEffect(async () => {
    setScheduleID(schedule);
    setSelectedDate(dates);
    setFromDate(startDate);
    setToDate(endDate);
  }, [open, schedule, dates, startDate, endDate]);

  const handleOnClose = () => {
    onClose();
  }

  const handleFromChange = (from) => {
    if (from && from != fromDate){
      setFromDate(from);
    }
  }

  const handleToChange = (to) => {
    if (to && to != toDate){
      setToDate(to);
    }
   }

   const handleSelectDate = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleOnApply = (evt) => {
    evt.preventDefault();
    let isValid = true;
    if (!fromDate){
        setStartDateErrMsg(t(strings.startDateErrMsg));
        isValid = false;
    } else {
        setStartDateErrMsg("");
    }

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

    const data = {
      start_date: ConvertDateTimes.formatDate(fromDate, strings.apiDateFormat),
      end_date: toDate? ConvertDateTimes.formatDate(toDate, strings.apiDateFormat) : null,
      mode: lists.schedule.mode.monthly,
      value: tempDate.join(","),
    }

    // Add Schedule
    if (!scheduleID){
      onAddSchedule(data);
    } else {
      onUpdateSchedule(scheduleID, data);
    }
  }

  const handleClearEndDate = () =>{
    setToDate(null);
  }

  return (
    <Paper>
      <Dialog
        open={open}
        onClose={handleOnClose}
        aria-labelledby="add-schedule-monthly"
        classes={{ 
          paper: classes.paper,
        }}
      >
        <DialogTitle id="add-schedule-monthly" className={classes.dialogTitle}>{t(strings.monthly)}</DialogTitle>
        <DialogContent>
            <div className={classes.inputFrom}>
                <DayPickerInput
                    ref={fromRef}
                    value={fromDate}
                    placeholder={t(strings.from)}
                    format="LL"
                    formatDate={formatDate}
                    parseDate={parseDate}
                    dayPickerProps={{
                    selectedDays: [fromDate, { fromDate, toDate }],
                    disabledDays: { after:  toDate},
                    dateModifiers,
                    month: toDate,
                    toMonth: toDate,
                    numberOfMonths: 1,
                    onDayClick: () => toRef.current.input.focus(),
                    }}
                    onDayChange={handleFromChange}
                />{' '}
                    —{' '}
                <span className={classes.inputTo}>
                    <DayPickerInput
                    ref={toRef}
                    value={toDate}
                    placeholder={t(strings.to)}
                    format="LL"
                    formatDate={formatDate}
                    parseDate={parseDate}
                    dayPickerProps={{
                        selectedDays: [toDate, { fromDate, toDate }],
                        disabledDays: { before: fromDate },
                        dateModifiers,
                        month: fromDate,
                        fromMonth: fromDate,
                        numberOfMonths: 1,
                    }}
                    onDayChange={handleToChange}
                    />
                </span>
                {Boolean(startDateErrMsg) && 
                    <FormHelperText
                        className={classes.formMessageFail}
                        error={Boolean(startDateErrMsg)}
                    >
                        {startDateErrMsg}
                    </FormHelperText>
                }
                <Link
                  onClick={handleClearEndDate}
                  className={classes.clearEndDateBtn}
                >
                  {t(strings.clear) + " " + t(strings.endDate)}
                </Link>
            </div>
          <DialogContentText>
            <div className={classes.selectContainer}>
                <Select
                    labelId="schedule-monthly"
                    id="schedule-monthly"
                    multiple
                    displayEmpty
                    value={selectedDate}
                    onChange={handleSelectDate}
                    MenuProps={MenuProps}
                    inputProps={{ 'aria-label': 'Without label' }}
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    size="small"
                >
                    {lists.date?.daysInMonth.map((day) => (
                        <MenuItem key={day} value={day} style={{fontWeight: selectedDate.indexOf(day) == -1 ? 400 : 600}}>
                            {day}
                        </MenuItem>
                    ))}
                </Select>
                {Boolean(datesErrMsg) && 
                    <FormHelperText
                        className={classes.formMessageFail}
                        error={Boolean(datesErrMsg)}
                    >
                        {datesErrMsg}
                    </FormHelperText>
                }
            </div>
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

export default AddScheduleMonthly;