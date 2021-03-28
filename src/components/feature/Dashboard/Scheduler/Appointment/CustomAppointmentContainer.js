
import React, {memo}  from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { 

} from '@material-ui/core';
import {
    Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';
// Material UI Icons

const useStyles = (width) => makeStyles((theme) => ({
    container: {
        width: `${width}% !important`
    },
    disabled: {
      width: '100%',
      height: '100%',
      background: '#ccc',
      backgroundImage: 'repeating-linear-gradient(60deg,transparent,transparent 2px,#eee 0,#eee 7px)'
    }
}));

const CustomAppointmentContainer = memo(({width, ...restProps }) => {
  const classes = useStyles(width)();
  const data = restProps.children[0]?.props?.params?.data;
  return (
    <React.Fragment>
      {(data.block)? 
        <Appointments.Container
          className={classes.container}
          {...restProps}
        >
          <div className={classes.disabled}></div> 
        </Appointments.Container>
        : 
        <Appointments.Container
          className={classes.container}
          {...restProps}
        />
      }
    </React.Fragment>
  );
});

export default CustomAppointmentContainer