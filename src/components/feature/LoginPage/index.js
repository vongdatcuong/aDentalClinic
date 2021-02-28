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
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

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

    return (
        <Container className={classes.container}>
            <Grid container component="main" className={classes.root}>
                <CssBaseline />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        <Trans i18nKey={strings.loginYourAccount}>
                        </Trans>
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label={t(strings.username)}
                        name="username"
                        autoComplete="username"
                        autoFocus
                        />
                        <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label={t(strings.password)}
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        />
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
                            <Link href="#" variant="body2">
                            {t(strings.forgotPassword)}
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                            {t(strings.dontHaveAccount)}
                            </Link>
                        </Grid>
                        </Grid>
                        <Box mt={5}>
                        <Copyright />
                        </Box>
                    </form>
                    </div>
                </Grid>
                <Grid item xs={false} sm={4} md={7} className={classes.image} />
            </Grid>
        </Container>
    )
}

export default LoginPage;