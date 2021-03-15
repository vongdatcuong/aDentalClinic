import React from 'react';
import { makeStyles, useTheme  } from "@material-ui/core/styles";
// use i18next
import { useTranslation, Trans } from 'react-i18next';

// @material-ui/core Component
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

// Component
import Copyright from './Copyright';

const useStyles = makeStyles((theme) => ({
    footer: {
        display: "flex",
    },
    copyrightBox : {
      alignSelf: "flex-end",
      marginBottom: "2rem",
      marginLeft: "auto",
      marginRight: "auto",
    },
    copyright : {
      fontStyle: "italic",
      fontWeight: "bold",
    }
  }));

const Footer = () => {
    const {t, i18n } = useTranslation();
    const classes = useStyles();

    return (
        <Grid container className={classes.footer}>
            <Box mt={5} className={classes.copyrightBox}>
                <Copyright />
            </Box>
        </Grid>
    )
}

export default Footer;