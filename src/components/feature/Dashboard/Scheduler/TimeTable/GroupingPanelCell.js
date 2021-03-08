
import React, {memo}  from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { 
  TableRow, 
  Typography
} from '@material-ui/core';
import {
  GroupingPanel,
} from '@devexpress/dx-react-scheduler-material-ui';
// Material UI Icons
import EventSeatIcon from '@material-ui/icons/EventSeat';

const useStyles = makeStyles((theme) => ({
  headerCell: {
    backgroundColor: theme.primaryColor[0],
    color: theme.whiteColor,
    fontSize: '1.0em',
    width: '100%',
    textAlign: 'center',
    height: '30px'
  },
  chairIcon: {
    verticalAlign: 'text-top',
    marginLeft: '5px',
    fontSize: '1.2em'
  }
}));

const GroupingPanelCell = memo(({ group, ...restProps }) => {
  const classes = useStyles();
  const textStyle = {
    color: '#ffffff',
    fontSize: '1.1em',
  };
  return (
    <GroupingPanel.Cell
      className={classes.headerCell}
      textStyle={textStyle}
      group={group}
      {...restProps}
    >
      <EventSeatIcon className={classes.chairIcon}/>
    </GroupingPanel.Cell>
  );
});

export default GroupingPanelCell