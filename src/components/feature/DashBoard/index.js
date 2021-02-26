import React from 'react';
import { makeStyles, useTheme  } from "@material-ui/core/styles";

// @material-ui/core Component
import Container from '@material-ui/core/Container';
import styles from "./jss";

const useStyles = makeStyles(styles);

const DashBoard = () => {
    const classes = useStyles();

    return (
        <Container className={classes.container}>
            wqeqweqweqweqwe
        </Container>
    )
}

export default DashBoard;