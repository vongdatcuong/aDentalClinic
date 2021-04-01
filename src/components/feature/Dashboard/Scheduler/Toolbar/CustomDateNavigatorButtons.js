
import React, {memo}  from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { 

} from '@material-ui/core';
import strings from '../../../../../configs/strings';
import {
    DateNavigator,
} from '@devexpress/dx-react-scheduler-material-ui';
// Material UI Icons

const useStyles = makeStyles((theme) => ({
  buttons: {
    color: theme.whiteColor,
    '& svg': {
        fontSize: '1.2em'
    }
  },
}));

const CustomDateNavigatorButtons = memo(({...restProps }) => {
  const classes = useStyles();
  return (
    <DateNavigator.NavigationButton
      className={classes.buttons}
      {...restProps}
      //onClick={() => onClick(restProps.type)}
    > 
    </DateNavigator.NavigationButton>
  );
});

export default CustomDateNavigatorButtons