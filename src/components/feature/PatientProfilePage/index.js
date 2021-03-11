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
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

// Component
import PopupChat from '../../common/Messenger/PopupChat';
import TabPanel from '../../common/TabPanel'

const useStyles = makeStyles(styles);

const PatientProfilePage = () => {
    const {t, i18n } = useTranslation();
    const classes = useStyles();

    const [curTab, setCurTab] = React.useState(0);

    const handleChangeTab = (event, newTab) => {
        setCurTab(newTab);
    };

    function a11yProps(index) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
      }

    return (
        <Container className={classes.container}>
            <PopupChat></PopupChat>
            <Grid container>
                <Grid item xs={9} sm={9} md={9} className={classes.leftGrid}>
                    <Grid container className={classes.headerInfo}>
                        Do The Anh
                    </Grid>
                    <Grid container className={classes.detailProfileContainer}>
                        <Grid item>
                            <Tabs value={curTab} onChange={handleChangeTab} indicatorColor="primary" textColor="primary">
                                    <Tab label={t(strings.treatmentPlan).toUpperCase()} {...a11yProps(0)} />
                                    <Tab label={t(strings.history).toUpperCase()} {...a11yProps(1)} />
                            </Tabs>
                            <Grid item>
                                <TabPanel value={curTab} index={0}>
                                    {t(strings.noTreatmentsPending)}
                                </TabPanel>
                                <TabPanel value={curTab} index={1}>
                                    <Button color="twitter" simple>
                                        <AddCircleOutlineIcon></AddCircleOutlineIcon>{" "}
                                        {t(strings.addRecord)}
                                    </Button>
                                </TabPanel>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={3} sm={3} md={3} className={classes.rightGrid}>
                    <Grid container className={classes.oralHeathContainer}>
                        <Typography component="h1" variant="h5">
                            {t(strings.oralHealth)} <Button color="primary" simple>{t(strings.edit)}</Button>
                        </Typography>
                        {t(strings.plaqueIndex)}<br></br>
                        {t(strings.bleedingIndex)}<br></br>
                        {t(strings.halitosis)}<br></br>
                    </Grid>
                    <Grid container className={classes.medicalIssuesContainer}>
                        <Typography component="h1" variant="h5">
                            {t(strings.medicalIssues)} <Button color="primary" simple>{t(strings.edit)}</Button>
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}

export default PatientProfilePage;