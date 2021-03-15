import React, {useState} from 'react';
import { makeStyles  } from "@material-ui/core/styles";
import strings from '../../../configs/strings';
// use i18next
import { useTranslation } from 'react-i18next';

// @material-ui/core Component

// Component


const useStyles = makeStyles((theme) => ({
    map: {
        width: '100%',
        height: '100%',
        minWidth: `${theme.mapMinWidth}px`,
        minHeight: `${theme.mapMinHeight}px`,
        border: `1px solid ${theme.blackColor}`,
        borderRadius: '5px'
    }
}));

const Location = () => {
  const classes = useStyles();
  const {t, i18next} = useTranslation();

  return (
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.630773293551!2d106.6799830146141!3d10.762912992330714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1c06f4e1dd%3A0x43900f1d4539a3d!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBLaG9hIGjhu41jIFThu7Egbmhpw6puIC0gxJDhuqFpIGjhu41jIFF14buRYyBHaWEgVFAuSENN!5e0!3m2!1svi!2s!4v1615481248216!5m2!1svi!2s" 
            className={classes.map}
            allowFullScreen="" 
            loading="lazy">
        </iframe>
    )
}

export default Location;