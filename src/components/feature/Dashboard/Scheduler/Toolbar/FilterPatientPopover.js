import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import strings from '../../../../../configs/strings';

// Toast
import { toast } from 'react-toastify';

// @material-ui/core 
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

// react-select
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

// @material-ui/core Icons
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';

let popoverWidth = 100;
const useStyles = makeStyles((theme) => {  
  popoverWidth = theme.filterPatientPopoverWidth;
  return {
    root: {
      
    },
    select: {
      width: theme.filterPatientPopoverWidth,
      maxWidth: theme.filterPatientPopoverMaxWidth,
      maxHeight: theme.filterPatientPopoverMaxHeight,
      margin: theme.spacing(2),
      marginTop: theme.spacing(3)
    },
    applyBtn: {
      display: 'block',
      marginLeft: `auto`,
      marginRight: `auto`,
      marginTop: '2px',
      marginBottom: theme.spacing(2)
    }
  }
});

const animatedComponents = makeAnimated();

const FilterPatientPopover = ({id, open, onClose, anchorEl, appointments, patientDisplayObj, onApply}) => {
  const classes = useStyles();
  const {t, i18n } = useTranslation();

  // States
  const [localPatientDisplayObj, setLocalPatientDisplayObj] = useState(patientDisplayObj);

  // Select style
  const selectStyle = {
    menu: ({top, ...provided}, state) => ({
      ...provided,
      position: 'fixed',
      maxWidth: popoverWidth
    }),
  };

  const options = appointments.map((appointment) => ({
    label: appointment.title,
    value: appointment.title
  }));

  const defaultValue = Object.keys(patientDisplayObj).map((patient) => ({
    label: patient,
    value: patient
  }))

  const handleOnClose = () => {
    onClose();
  }

  const handleOnChange = (selectedOption) => {
    const obj = {};
    selectedOption.forEach((option) => {
      obj[option.value] = true;
    })
    setLocalPatientDisplayObj(obj);
  }

  const handleOnApply = () => {
    onApply(localPatientDisplayObj);
  }

  return (
    <Popover
        id={id}
        open={open}
        onClose={handleOnClose}
        anchorEl={anchorEl}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        className={classes.root}
    >
        <Select
          className={classes.select}
          //closeMenuOnSelect={false}
          components={animatedComponents}
          defaultValue={defaultValue}
          isMulti
          autoFocus
          isSearchable
          styles={selectStyle}
          placeholder={t(strings.select)}
          noOptionsMessage={() => t(strings.noOptions)}
          options={options}
          onChange={handleOnChange}
        />
        <Button
          variant="contained"
          color="secondary"
          size="small"
          className={classes.applyBtn}
          onClick={handleOnApply}
        >
          {t(strings.apply)}
        </Button>
    </Popover>
  );
}

export default FilterPatientPopover;