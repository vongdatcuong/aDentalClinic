import React, {useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

import styles from "./jss";

const useStyles = makeStyles(styles);

const CustomAvatar = ({link, src, text, classes}) => {
    let inClasses = useStyles();
    if (classes){
        inClasses = Object.assign(inClasses, classes);
    }

    return (
        <div className={inClasses.avatarWrapper}>
            <a
                href={link}
                target="_blank">
                <Avatar alt="Jiwon" src={src} className={inClasses.avatarLarge}></Avatar>
                <div className={inClasses.avatarText}>{text}</div>
            </a>
        </div>
    );
  }

export default CustomAvatar;