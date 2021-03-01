import React from 'react';
import { makeStyles, useTheme  } from "@material-ui/core/styles";
import { useTranslation, Trans } from 'react-i18next';
import strings from '../../configs/strings';

import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    copyright : {
      fontStyle: "italic",
      fontWeight: "bold",
    }
  }));

const Copyright = () => {
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

export default Copyright;