import React from 'react';
import { makeStyles, useTheme  } from "@material-ui/core/styles";
import { NavLink, withRouter } from "react-router-dom";

//translation
import { useTranslation, Trans } from 'react-i18next';

// @material-ui/core Component
import {Typography,
    Container,
    Grid,
    Tab,
}
from '@material-ui/core';
import styles from "./jss";
const useStyles = makeStyles(styles);


const MenuBarItem=(props)=>{
    const {t, i18n } = useTranslation();
    const classes = useStyles();
    
    return(
        <NavLink
                        to={props.path}
                        className={classes.link}
                        activeClassName={classes.activeLink}
                    >
                        <Container className={props.index===0 ? classes.menuItemFirst: classes.menuItem}>
                            <img className={classes.menuItemImage} src={props.src}></img>
                            <Typography variant="body2"  >
                                {props.name}
                            </Typography>
                        </Container>
                        
        </NavLink>
        

    )
}

export default MenuBarItem;
