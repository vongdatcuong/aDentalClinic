import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme  } from "@material-ui/core/styles";
import styles from "./jss";

import {Tabs,
    Tab,
    Box,
    Typography,
    
} from '@material-ui/core';

const useStyles = makeStyles(styles);

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    const classes = useStyles();

    return (
      <div
        role="tabpanel"
        className={classes.item}
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

export default TabPanel;