const styles = (theme) => ({
 container: {
    background: theme.pageBackgroundColor,
    color: theme.textColor,
    flexGrow: 1,
    "& .MuiStepper-root": {
        backgroundColor: "inherit",
        marginLeft: "auto",
        marginRight: "auto",
        paddingBottom: 0,
        "& .MuiTypography-root": {
            color: theme.textColor,
        },
    },
  },
  pageContainer: {
    display: "initial",
  },
  navPillsContainer: {
    "& .MuiTabs-root": {
      "& .MuiTabs-flexContainer": {
        justifyContent: "center",
      },
    },
  },
  toothChartContainer: {
    display: "flex",
    justifyContent: "center",
  },
  fabUndo: {
    margin: theme.spacing(2),
    marrginTop: theme.spacing(3),
    width: "3.75rem",
    height: "3.75rem",
    backgroundColor: theme.whiteColor,
    "& .MuiFab-label": {
      fontSize: theme.spacing(5),
    },
  },
  quickselectMenu: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(3),
    height: theme.spacing(8),
    "& button": {
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
    },
  },
  // for stepping
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  stepContent: {
    //   marginLeft: "auto",
    //   marginRight: "auto",
    "& $fieldset": {
        borderColor: theme.textColor + "!important",
    },
    "& .MuiOutlinedInput-root": {
        color: theme.textColor,
    },
    "& .MuiFormLabel-root": {
        color: theme.textColor,
    },
    "& .MuiSelect-root": {
        "& .MuiSvgIcon-root": {
            color: theme.textColor,
        },
    },
    "& $label": {
        color: theme.textColor,
    },
    "& .css-yk16xz-control": {
        color: theme.textColor,
        backgroundColor: theme.pageBackgroundColor,
    },
    "& .css-1uccc91-singleValue": {
        color: theme.textColor,
    },
    "& .css-9g7j0m-menu": {
        backgroundColor: theme.pageBackgroundColor,
    },
    "& .css-1pahdxg-control": {
        backgroundColor: theme.pageBackgroundColor,
    }
  },
  stepContainer: {
      marginLeft: "auto",
      marginRight: "auto",
      "& .MuiButton-label": {
            color: theme.textColor,
      },
      "& .Mui-disabled": {
          "& .MuiButton-label": {
              color: theme.inputDisabledColor
          }
      },
      "& .MuiButton-containedPrimary": {
        "& .MuiButton-label": {
              color: theme.whiteColor,
        },
      }
  },
  stepButtons: {
      position: "fixed",
      right: 0,
      top: 0,
      marginTop: theme.spacing(4),
      marginRight: theme.spacing(5),
      "& .MuiButton-label": {
            color: theme.textColor,
      },
      "& .Mui-disabled": {
          "& .MuiButton-label": {
              color: theme.inputDisabledColor
          }
      },
      "& .MuiButton-containedPrimary": {
        "& .MuiButton-label": {
              color: theme.whiteColor,
        },
      }
  },
  btnQuickSelect: {
    display: "grid",
    position: "fixed",
    right: 0,
    top: 0,
    marginTop: theme.spacing(37),
    marginRight: theme.spacing(5),
  },
  selectProcedure: {
    marginTop: theme.spacing(4),
  },
  selectedToothDisplay: {
      whiteSpace: "pre-wrap",
  },
  treatmentNote: {
      whiteSpace: "pre-wrap",
  },
  asyncSelectFormControl: {
    width: '100%',
    '& label': {
        opacity: theme.secondaryOpacity
    }
  },
  autocompleteLabel: {
    fontSize: '12px'
  },
  selectCategory: {
    marginTop: theme.spacing(4),
  },
  selectProviderAssistant: {
    marginTop: theme.spacing(4),
  },
  selectProvider: {
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(1.7),
    },
  },
  formMessageFail: {
    textAlign: "left",
    fontSize: "12px",
    color: theme.dangerColor[0],
    marginTop: '4px',
    marginLeft: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5)
  },
  teethIcon: {
      fontSize: "4rem",
      color: theme.textColor,
  },
  coverIconTop: {
      height: "2rem",
      width: "4rem",
      position: "absolute",
      bottom: "50%",
      backgroundColor: theme.pageBackgroundColor,
  },
  coverIconBot: {
      height: "2rem",
      width: "4rem",
      position: "absolute",
      top: "50%",
      backgroundColor: theme.pageBackgroundColor,
  },
});

const colorlibStepIconStyles = (theme) => ({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundImage:
        "linear-gradient( 136deg, " + theme.primaryColor[3] + " 0%, " + theme.primaryColor[2] + " 50%, " + theme.primaryColor[0] + " 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  },
  completed: {
    backgroundImage:
        "linear-gradient( 136deg, " + theme.primaryColor[3] + " 0%, " + theme.primaryColor[2] + " 50%, " + theme.primaryColor[0] + " 100%)",
  },
});

const colorlibConnector = (theme) => ({
    alternativeLabel: {
        top: 22,
      },
      active: {
        "& $line": {
          backgroundImage:
            "linear-gradient( 95deg, " + theme.primaryColor[3] + " 0%, " + theme.primaryColor[2] + " 50%, " + theme.primaryColor[0] + " 100%)",
        },
      },
      completed: {
        "& $line": {
          backgroundImage:
            "linear-gradient( 95deg, " + theme.primaryColor[3] + " 0%, " + theme.primaryColor[2] + " 50%, " + theme.primaryColor[0] + " 100%)",
        },
      },
      line: {
        height: 3,
        border: 0,
        backgroundColor: "#eaeaf0",
        borderRadius: 1,
      },
  });

export default {
  styles,
  colorlibStepIconStyles,
  colorlibConnector,
};
