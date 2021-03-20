const style = (theme) => ({
  toothTabContainer: {
    height: "100vh",
    "& .MuiBox-root": {
      padding: 0,
    },
  },
  toothImgContainer: {
    height: "100vh",
    background: theme.grayColor[4],
    display: "flex", // centering
    justifyContent: "center",
    alignItems: "center",
    "& svg": {
      height: "60%",
      width: "auto",
    },
  },
  toothInfoContainer: {
    height: "100vh",
  },
  dentalContainer: {
    width: "100%",
    marginLeft: theme.spacing(5),
    dentalHeaderContainer: {
      width: "100%",
    },
  },
  dentalHeaderContainer: {
    fontSize: "1.5rem",
    borderBottom: "solid black 0.1rem",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  dentalButtonsContainer: {
    float: "right",
    "& button": {
      color: theme.primaryColor[0],
      "& .MuiButton-label": {
        textTransform: "none",
        fontSize: "1.2rem",
        "& .MuiSvgIcon-root": {
          marginRight: "0.5rem",
        },
      },
    },
  },
  dentalBodyContainer: {
    marginTop: theme.spacing(2),
    "& .blankMessage": {
      color: theme.grayColor[1],
      textAlign: "center",
    },
  },
  bottomContainer: {
    borderTop: "solid black 0.05rem",
    //minHeight: "20vh",
  },
  endodonticContainer: {
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    color: theme.blackColor,
    "& .Mui-selected": {
      color: theme.primaryColor[0],
    },
    "& .MuiTabs-indicator": {
      display: "none",
    },
    "& .MuiTab-root": {
      maxWidth: "100%",
    },
  },
  endodonticTitle: {
    fontSize: "1.3rem",
    paddingBottom: theme.spacing(4),
  },
  testContainer: {
    background: theme.coldColor,
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(5),
  },
  testTitle: {
    fontSize: "1rem",
    fontWeight: "bold",
  },
  endodonticItem: {
    paddingTop: theme.spacing(2),
    borderTop: "solid black 0.05rem",
    textTransform: "none",
    width: "100%",
  },
  endodonticTestIcon: {
    float: "left",
    fontSize: "1rem",
    fontWeight: "bold",
  },
  endodonticTestName: {
    float: "left",
    fontSize: "1rem",
    fontWeight: "bold",
    marginLeft: theme.spacing(2),
  },
  endodonticTestStatus: {
    fontSize: "0.7rem",
    float: "right",
    display: "flex",
  },
  testBtns: {
    marginTop: theme.spacing(3),
    color: theme.primaryColor[0],
    background: theme.whiteColor,
    fontWeight: "bold",
    width: "90%",
    textTransform: "none",
  },
  clearBtn: {
    marginTop: theme.spacing(3),
    color: theme.primaryColor[0],
    fontWeight: "bold",
    width: "90%",
  },
});

export default style;
