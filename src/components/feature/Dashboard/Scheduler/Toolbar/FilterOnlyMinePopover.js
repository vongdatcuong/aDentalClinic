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

const FilterChairPopover = ({id, open, onClose, anchorEl, onlyMine, onApply}) => {
  const classes = useStyles();
  const {t, i18n } = useTranslation();

  const originalIsOnlyMine = onlyMine;

  // States
  const [isOnlyMine, setIsOnlyMine] = useState(onlyMine);
  
  const handleOnChangeCbx = (evt) => {
    setIsOnlyMine(!isOnlyMine);
  }

  const handleOnClose = () => {
    onClose();
    setIsOnlyMine(originalIsOnlyMine);
  }

  const handleOnApply = () => {
    onApply(isOnlyMine);
  }

  const labelId = `checkbox-list-secondary-label-${1}`;
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
            <ListItem key={1} button>
                <ListItemText id={labelId} primary={t(strings.onlyMine)} />
                <ListItemSecondaryAction>
                    <Checkbox
                        checked={isOnlyMine}
                        edge="end"
                        inputProps={{ 'aria-labelledby': labelId }}
                        onChange={(evt) => handleOnChangeCbx(evt)}
                    />
                </ListItemSecondaryAction>
            </ListItem>
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