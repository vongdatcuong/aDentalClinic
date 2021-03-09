import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';

// @material-ui/core/icons
import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles((theme) => ({
  list: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    paddingTop: 0,
    paddingBottom: 0
  },
  listItem: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(10),
  },
  listItemSecondaryAction: {
    right: '10px'
  },
  checkIcon: {
    color: theme.successColor[0]
  }
}));

const SimpleCombobox = ({list, value, onChange, classes}) => {
  let inClasses = useStyles();
  if (classes){
      inClasses = Object.assign(inClasses, classes);
  }

  return (
    <List className={inClasses.list} component="nav" aria-label="simple-combobox">
      {list.map((el, index) => {
        return (
          <React.Fragment key={index}>
            <ListItem button className={inClasses.listItem} onClick={() => onChange(el.value)}>
              <ListItemText primary={el.text} secondary={el.secondary || ""} />
              {(value == el.value)? <ListItemSecondaryAction className={inClasses.listItemSecondaryAction}>
                                      <CheckIcon className={inClasses.checkIcon} />
                                    </ListItemSecondaryAction> 
              :
              ''}
            </ListItem>
            <Divider/>
          </React.Fragment>
        )
      })}
    </List>
  );
}

export default SimpleCombobox