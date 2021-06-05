import React, {useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

import styles from "./jss";

const useStyles = makeStyles(styles);

const CustomAvatar = ({link, src, user, classes}) => {
    let inClasses = useStyles();
    if (classes){
        inClasses = Object.assign(inClasses, classes);
    }

    return (
        <div className={inClasses.avatarWrapper}>
            <a
                href={link}>
                <Avatar alt={user.first_name + " " + user.last_name} src={src} className={inClasses.avatarLarge}></Avatar>
                <div className={inClasses.avatarText}>{user.first_name}</div>
            </a>
        </div>
    );
  }

export default CustomAvatar;