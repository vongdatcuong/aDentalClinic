import React, {useState} from "react";
import { NavLink } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// Utils
import {disableClick} from '../../utils/general';

const useStyles = makeStyles((theme) => ({
    list: {
      marginTop: "0",
      paddingLeft: "0",
      paddingTop: "0",
      paddingBottom: "0",
      marginBottom: "0",
      listStyle: "none",
      position: "unset"
    },
    listItem: {
      width: '100%',
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    listItemLink: {
      margin: '0 auto',
    },
    listItemBtn: {
      width: '60px',
      height: '60px',
      color: theme.whiteColor,
      borderRadius: '5px',
      backgroundColor: theme.primaryColor[2],
      '& .MuiIconButton-label': {
        '& .MuiSvgIcon-root': {
          fontSize: '1.2em'
        }
      },
      '&:hover': {
        backgroundColor: theme.hoverBrightColor[0]
      }
    },
}));
const FunctionList = ({functions}) => {
    const classes = useStyles();

    return (
        <List className={classes.list}>
            {functions.map((func, index) => {
              return (
                    <ListItem key={index} className={classes.listItem}>
                        <NavLink
                          to="/"
                          className={classes.listItemLink}
                          onClick={disableClick}
                        >
                          {func}
                        </NavLink>
                    </ListItem>
                )
            })}
        </List>
    );
  }

export default FunctionList;