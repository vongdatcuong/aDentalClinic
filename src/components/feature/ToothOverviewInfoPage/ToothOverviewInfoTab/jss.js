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
    borderBottom: "solid " + theme.textColor + " 0.1rem",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  dentalButtonsContainer: {
    float: "right",
    "& button": {
        color: theme.materialPrimaryColor,
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
  editToothArea: {
    width: "100%",
    "& .MuiOutlinedInput-inputMultiline": {
        color: theme.textColor,
    },
    "& .Mui-disabled": {
        "& $textarea": {
            color: theme.textColor,
        },
    }
  },
  bottomContainer: {
    borderTop: "solid " + theme.textColor + " 0.05rem",
    //minHeight: "20vh",
  },
  endodonticTitle: {
    fontSize: "1.3rem",
    paddingBottom: theme.spacing(4),
    color: theme.textColor,
  },
  testContainer: {
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(5),
  },
  coldTestContainer: {
    background: theme.coldColor,
  },
  percussionTestContainer: {
    background: theme.coldColor,
  },
  palpationTestContainer: {
    background: theme.coldColor,
  },
  heatTestContainer: {
    background: theme.coldColor,
  },
  electricityTestContainer: {
    background: theme.coldColor,
  },
  testTitle: {
    fontSize: "1rem",
    fontWeight: "bold",
  },
  endodonticItem: {
    paddingTop: theme.spacing(2),
    borderTop: "solid " + theme.textColor + " 0.05rem",
    textTransform: "none",
    width: "100%",
  },
  endodonticTestIcon: {
    float: "left",
    fontSize: "1rem",
    fontWeight: "bold",
    color: theme.textColor,
  },
  endodonticTestName: {
    float: "left",
    fontSize: "1rem",
    fontWeight: "bold",
    marginLeft: theme.spacing(2),
    color: theme.textColor,
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
    color: theme.materialPrimaryColor,
    fontWeight: "bold",
    width: "90%",
  },
  selectedBtn: {
      border: "solid",
  },
  endodonticContainer: {
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    color: theme.textColor,
    "& .Mui-selected": {
        color: theme.materialPrimaryColor,
        "& $endodonticTestIcon": {
            color: theme.materialPrimaryColor,
        },
        "& $endodonticTestName": {
            color: theme.materialPrimaryColor,
        },
    },
    "& .MuiTabs-indicator": {
      display: "none",
    },
    "& .MuiTab-root": {
      maxWidth: "100%",
    },
  },
});

export default style;
