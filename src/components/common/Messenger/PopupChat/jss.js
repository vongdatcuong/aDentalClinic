const popupChatStyle = (theme) => ({
  popupChatContainer: {
    flexGrow: 1,
    "& .rcw-conversation-container": {
      "& .rcw-header": {
        backgroundColor: theme.primaryColor[3],
      },
      "& .rcw-client": {
        "& .rcw-message-text": {
          backgroundColor: theme.primaryColor[3],
          color: "white",
        },
      },
      //   "& .rcw-response": {
      //     "& .rcw-message-text": {
      //         backgroundColor: "gray",
      //         color: "black",
      //       },
      //   },
    },
    "& .rcw-launcher": {
      backgroundColor: theme.primaryColor[3],
    },
  },
});

export default popupChatStyle;
