import React, { Component, useState, useEffect } from "react";
import {
  Widget,
  addResponseMessage,
  addLinkSnippet,
  addUserMessage,
} from "react-chat-widget";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import "react-chat-widget/lib/styles.css";

import logoADC from "../../../../assets/images/logoADC.png";
import styles from "./jss";

const PopupChat = () => {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  useEffect(() => {
    addResponseMessage("Hi there");
    addUserMessage("Hello, how can I help you?");
    addResponseMessage("Can I reschedule my appointment this Wednesday?");
  }, []);

  const handleNewUserMessage = (newMessage) => {
    //console.log(`New message incoming! ${newMessage}`);
    // Now send the message throught the backend API
    addResponseMessage("The response for: " + newMessage);
  };
  return (
    <div className={classes.popupChatContainer}>
      <Widget
        handleNewUserMessage={handleNewUserMessage}
        profileAvatar={logoADC}
        title="Message"
        subtitle="From patient"
      />
    </div>
  );
};

export default PopupChat;
