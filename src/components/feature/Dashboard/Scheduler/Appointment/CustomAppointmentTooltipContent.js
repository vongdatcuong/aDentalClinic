
import React, {memo}  from 'react';
import { makeStyles } from "@material-ui/core/styles";
import strings from '../../../../../configs/strings';
import clsx from 'clsx';

// i18next
import { useTranslation } from 'react-i18next';

// @material-ui/core
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// dx-react-scheduler
import {
    AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui';
// Material UI Icons
import { FaUserInjured } from "react-icons/fa";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import EventSeatIcon from '@material-ui/icons/EventSeat';
import AdjustIcon from '@material-ui/icons/Adjust';
import EventNoteIcon from '@material-ui/icons/EventNote';
import AssistantIcon from '@material-ui/icons/Assistant';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';

// Utils
import ConvertDateTimes from '../../../../../utils/datetimes/convertDateTimes';

const useStyles = makeStyles((theme) => ({
  listItemIcon: {
    minWidth: '10px',
    width: '20px',
    height: '20px',
    '& svg': {
      width: '100%',
      height: '100%',
    }
  },
  listItemLabel: {
    minWidth: '120px',
    justifyContent: 'flex-start',
    marginLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  hightlight: {
    '& span': {
      fontWeight: 600
    }
  }
}));

const CustomAppointmentTooltipContent = memo(({children, appointmentData,...restProps }) => {
  const classes = useStyles();
  const [t, i18n] = useTranslation();

  const listItems = [
    {
      label: t(strings.patient),
      value: (appointmentData.title + " (" + appointmentData.patientGender + ")") || "",
      icon: <FaUserInjured/>
    },
    {
      label: t(strings.time),
      value: ConvertDateTimes.formatDate(appointmentData.startDate, "HH:mm") + " - " +
            ConvertDateTimes.formatDate(appointmentData.endDate, "HH:mm") + " (" +
            ConvertDateTimes.formatDate(appointmentData.startDate, "YYYY/MM/DD") + ")",
      icon: <AccessTimeIcon/>
    },
    {
      label: t(strings.chair),
      value: appointmentData.chair?.name || "",
      icon: <EventSeatIcon/>
    },
    {
      label: t(strings.status),
      value: appointmentData.status || "",
      icon: <AdjustIcon/>,
      isHighlighted: true,
    },
    {
      label: t(strings.note),
      value: appointmentData.note || "",
      icon: <EventNoteIcon/>
    },
    {
      label: t(strings.assistant),
      value: appointmentData.assistantDisplay,
      icon: <AssistantIcon/>
    },
    {
      label: t(strings.provider),
      value: appointmentData.providerDisplay,
      icon: <LocalHospitalIcon/>
    }
  ];
  return (
    <List dense={true}>
      {listItems.map((item, index) => {
        return (
          <ListItem key={index}>
            <ListItemIcon className={classes.listItemIcon} style={{color: appointmentData.chair?.color || ""}}>
              {item.icon}
            </ListItemIcon>
            <ListItemIcon className={classes.listItemLabel}>
              <span>{item.label}</span>
            </ListItemIcon>
            <ListItemText
              primary={item.value}
              className={clsx(item.isHighlighted && classes.hightlight)}
            />
          </ListItem>
        )
      })}
    </List>
  );
});

export default CustomAppointmentTooltipContent