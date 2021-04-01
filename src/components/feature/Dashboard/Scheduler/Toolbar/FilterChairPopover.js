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

// @material-ui/core Icons
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';

const useStyles = makeStyles((theme) => ({
  root: {
   
  },
  list: {
    width: theme.filterChairPopoverWidth,
    maxWidth: theme.filterChairPopoverMaxWidth,
    maxHeight: theme.filterChairPopoverMaxHeight,
  },
  applyBtn: {
    display: 'block',
    marginLeft: `auto`,
    marginRight: `auto`,
    marginTop: '2px',
    marginBottom: theme.spacing(2)
  }
}));

const FilterChairPopover = ({id, open, onClose, anchorEl, chairs, onApply}) => {
  const classes = useStyles();
  const {t, i18n } = useTranslation();

  const originalChairsDisplay = chairs.map((chair) => chair.isDisplay);

  // States
  const [chairsDisplay, setChairsDisplay] = useState(originalChairsDisplay);
  
  const handleOnChangeCbx = (evt, index) => {
    const newChairsDisplay = [...chairsDisplay];
    newChairsDisplay[index] = evt.target.checked;
    setChairsDisplay(newChairsDisplay);
  }

  const handleOnClose = () => {
    onClose();
    setChairsDisplay(originalChairsDisplay);
  }

  const handleOnApply = () => {
    if (chairsDisplay.filter((display) => display).length > 0){
      onApply(chairsDisplay);
    } else {
      toast.error(t(strings.invalidFilterChairMsg));
    }
  }

  return (
    <Popover
        id={id}
        open={open}
        onClose={handleOnClose}
        anchorEl={anchorEl}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        className={classes.root}
    >
        <List dense className={classes.list}>
            {chairs.map((chair, index) => {
                const labelId = `checkbox-list-secondary-label-${chair.id}`;
                return (
                  <ListItem key={chair.id} button>
                      <ListItemText id={labelId} primary={chair.text} />
                      <ListItemSecondaryAction>
                          <Checkbox
                              checked={chairsDisplay[index]}
                              edge="end"
                              inputProps={{ 'aria-labelledby': labelId }}
                              onChange={(evt) => handleOnChangeCbx(evt, index)}
                          />
                      </ListItemSecondaryAction>
                  </ListItem>
                );
            })}
        </List>
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

export default FilterChairPopover;