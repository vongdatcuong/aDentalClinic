import React, {} from "react";
import clsx from "clsx";
import { NavLink } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// Utils
import {activeRoute} from '../../utils/routes';

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
    activeRoute: {
        borderLeft: `4px solid ${theme.fontColor}`
    }
}));
const LinkList = ({links}) => {
    const classes = useStyles();

    return (
        <List className={classes.list}>
            {links.map((path, index) => {
                return (
                    <ListItem key={index} className={clsx(classes.listItem, activeRoute(path.link) && classes.activeRoute)}>
                        <NavLink
                            to={path.link}
                            className={classes.listItemLink}
                        >
                            <Tooltip title={path.text} aria-label={path.text}>
                              <IconButton className={classes.listItemBtn} size="medium">{path.icon}</IconButton>
                            </Tooltip>
                        </NavLink>
                    </ListItem>
                )
            })}
        </List>
    );
  }

export default LinkList;