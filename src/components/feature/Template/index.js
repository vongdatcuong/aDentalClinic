import React,{useState} from 'react';
import { makeStyles, useTheme  } from "@material-ui/core/styles";
//translation
import { useTranslation, Trans } from 'react-i18next';

// @material-ui/core Component
import Container from '@material-ui/core/Container';
import { Typography,
    Divider,
    InputAdornment,
    FormControl,
    FilledInput,
    OutlinedInput,
 } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import PropTypes from 'prop-types';

import styles from "./jss";
import darkTheme from "../../../themes/darkTheme";
//import configs
import strings from "../../../configs/strings";
//import image

//import icons
import SearchIcon from '@material-ui/icons/Search';
import FilterList from '@material-ui/icons/FilterList';
import AddBox from '@material-ui/icons/AddBox';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AssessmentIcon from '@material-ui/icons/Assessment';
import GroupIcon from '@material-ui/icons/Group';
//import component


const useStyles = makeStyles(styles);
const Template = () => {
    const {t, i18n } = useTranslation();

    const classes = useStyles();
    

    return (
        <div className={classes.container}>
            
            <div className={classes.content}>
                <Grid container>
                    <Grid item xs={8}>
                        <Typography className={classes.title} variant="h4">
                            {t(strings.template)}
                        </Typography>
                    </Grid>
                    
                </Grid>
                <Divider className={classes.titleDivider}/>

                <Container style={{marginTop:'30px'}}>
                    <Grid container>
                        <Grid item xs={8}>
                            <Typography className={classes.titleItem} variant="h5">
                                {t(strings.recent)}
                            </Typography>
                        </Grid>
                        
                    </Grid>
                    <Grid container >
                        <Grid item className={classes.templateNewPatient}>
                            <FiberNewIcon/>
                            <Typography  variant="body1">
                                {t(strings.newPatient)}
                            </Typography>
                        </Grid>
                        <div className={classes.spaceLeft}></div>
                        <Grid item className={classes.templateInvoice}>
                            <ReceiptIcon/>
                            <Typography  variant="body1">
                                {t(strings.invoice)}
                            </Typography>
                        </Grid>

                    </Grid>
                </Container>
                <Container style={{marginTop:'30px'}}>
                    <Grid container>
                        <Grid item xs={8}>
                            <Typography className={classes.titleItem} variant="h5">
                                {t(strings.allTemplates)}
                            </Typography>
                        </Grid>
                        
                    </Grid>
                    <Grid container >
                        <Grid item className={classes.templateNewPatient}>
                            <FiberNewIcon/>
                            <Typography  variant="body1">
                                {t(strings.newPatient)}
                            </Typography>
                        </Grid>
                        <div className={classes.spaceLeft}></div>
                        <Grid item className={classes.templateInvoice}>
                            <ReceiptIcon/>
                            <Typography  variant="body1">
                                {t(strings.invoice)}
                            </Typography>
                        </Grid>
                        <div className={classes.spaceLeft}></div>
                        <Grid item className={classes.templateReport}>
                            <AssessmentIcon/>
                            <Typography  variant="body1">
                                {t(strings.report)}
                            </Typography>
                        </Grid>
                        <div className={classes.spaceLeft}></div>
                        <Grid item className={classes.templateResignationLetter}>
                            <GroupIcon/>
                            <Typography  variant="body1">
                                {t(strings.resignationLetter)}
                            </Typography>
                        </Grid>

                    </Grid>
                </Container>
                
            </div>
            
        </div>
    )
}

export default Template;