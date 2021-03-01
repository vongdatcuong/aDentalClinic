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

function Copyright() {
    const {t, i18n } = useTranslation();
    const classes = useStyles();
    return (
      <Typography variant="body2" color="textSecondary" align="center" className={classes.copyright}>
        {t(strings.copyrightBy)} {' '}
        <Link color="inherit" href="https://material-ui.com/">
          Hcmus student
        </Link>
      </Typography>
    );
}

const useStyles = makeStyles(styles);

const LoginPage = () => {
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
                <CssBaseline />
                <Grid container className={classes.loginHeader}>
                    <div className={classes.brandContainer}>
                        <img src={logoADC} alt="Logo" className={classes.logo}/>
                        <div className={classes.brandName}>
                            A Dental Clinic
                        </div>
                    </div>
                </Grid>
                <Grid container className={classes.loginContainer}>
                    <Grid item xs={12} sm={8} md={5} elevation={6} square>
                        <div className={classes.paper}>
                            <Typography component="h1" variant="h5" className={classes.loginTitle}>
                                <Trans i18nKey={strings.loginYourAccount}>
                                </Trans>
                            </Typography>
                            <form className={classes.form} noValidate>
                                <Grid container spacing={1} alignItems="flex-end" className={classes.inputContainer}>
                                    <Grid item>
                                        <AccountBox className={classes.loginIcons}/>
                                    </Grid>
                                    <Grid item className={classes.inputTextContainer}>
                                        <TextField
                                            className={classes.inputText}
                                            required
                                            fullWidth
                                            id="username"
                                            label={t(strings.username)}
                                            name="username"
                                            autoComplete="username"
                                            autoFocus
                                            />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={1} alignItems="flex-end" className={classes.inputContainer}>
                                    <Grid item>
                                        <Lock className={classes.loginIcons}/>
                                    </Grid>
                                    <Grid item className={classes.inputTextContainer}>
                                        <TextField
                                            className={classes.inputText}
                                            required
                                            fullWidth
                                            name="password"
                                            label={t(strings.password)}
                                            type={values.showPassword ? 'text' : 'password'}
                                            value={values.password}
                                            onChange={handleChange('password')}
                                            id="password"
                                            autoComplete="current-password"
                                            InputProps={{
                                                endAdornment: (
                                                <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    className={classes.btnToggleVisibility}
                                                >
                                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                                </InputAdornment>
                                            )
                                            }}
                                            />
                                    </Grid>
                                </Grid>
                                {/* <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                                /> */}
                                <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                >
                                {t(strings.continueLogin)}
                                </Button>
                                <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2" className={classes.link}>
                                    {t(strings.forgotPassword)}
                                    </Link>
                                </Grid>
                                {/* <Grid item>
                                    <Link href="#" variant="body2" className={classes.link}>
                                    {t(strings.dontHaveAccount)}
                                    </Link>
                                </Grid> */}
                                </Grid>
                            </form>
                        </div>
                    </Grid>
                    <Grid item xs={false} sm={4} md={7} className={classes.image} />
                </Grid>
                <Grid container className={classes.loginFooter}>
                    <Box mt={5} className={classes.copyrightBox}>
                        <Copyright />
                    </Box>
                </Grid>
                
            </Grid>
        </Container>
    )
}

export default LoginPage;