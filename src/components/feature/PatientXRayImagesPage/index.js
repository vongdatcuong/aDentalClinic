import React from 'react';
import { makeStyles, useTheme  } from "@material-ui/core/styles";

// @material-ui/core Component
import Container from '@material-ui/core/Container';
import styles from "./jss";
import strings from '../../../configs/strings';
// use i18next
import { useTranslation, Trans } from 'react-i18next';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

// Component
import PopupChat from '../../common/Messenger/PopupChat';

const useStyles = makeStyles(styles);

const PatientXRayImagesPage = () => {
    const {t, i18n } = useTranslation();
    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <Grid container component="main" component={Paper} className={classes.root}>
                Patient X-Ray Images Page
                <PopupChat></PopupChat>
            </Grid>
        </Container>
    )
}

export default PatientXRayImagesPage;