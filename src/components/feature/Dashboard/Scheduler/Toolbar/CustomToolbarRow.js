
import React, {memo}  from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { 
  TableRow, 
  Typography
} from '@material-ui/core';
import {
  Toolbar,
} from '@devexpress/dx-react-scheduler-material-ui';
// Material UI Icons


const useStyles = makeStyles((theme) => ({
  toolbar: {
    backgroundColor: theme.primaryColor[3],
    color: theme.whiteColor,
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    maxHeight: '45px',
    minHeight: '10px'
  }
}));

const CustomToolbarRow = memo(({ group, ...restProps }) => {
  const classes = useStyles();
  return (
    <Toolbar.Root
        {...restProps}
        className={classes.toolbar}
    >
    </Toolbar.Root>
  );
});

export default CustomToolbarRow