import React from 'react';
import { makeStyles, useTheme  } from "@material-ui/core/styles";

// @material-ui/core Component
import Container from '@material-ui/core/Container';
import styles from "./jss";

// Components
import Schedulerr from "./Scheduler";

const useStyles = makeStyles(styles);

const DashBoard = () => {
    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <Schedulerr/>
        </Container>
    )
}

export default DashBoard;