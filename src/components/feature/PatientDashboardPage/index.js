import React from 'react';
import { makeStyles, useTheme  } from "@material-ui/core/styles";

// @material-ui/core Component
import Container from '@material-ui/core/Container';
import styles from "./jss";
import strings from '../../../configs/strings';
import logoADC from '../../../assets/images/logoADC.png'
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
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import InputAdornment from "@material-ui/core/InputAdornment";
import CustomInput from "../../common/CustomInput/CustomInput.js";
import People from "@material-ui/icons/People";
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import AccountBox from '@material-ui/icons/AccountBox';
import Lock from '@material-ui/icons/Lock';

// Component
import Footer from '../../../layouts/Footer';

const useStyles = makeStyles(styles);

const PatientDashboardPage = () => {
    const {t, i18n } = useTranslation();
    const classes = useStyles();
    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
    });
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

    return (
        <Container className={classes.container}>
            <Grid container component="main" component={Paper} className={classes.root}>
                Patient Dashboard Page
                
            </Grid>
        </Container>
    )
}

export default PatientDashboardPage;