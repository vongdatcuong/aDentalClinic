const toothStyle = (theme) => ({
    upperJawTooth: {
        "& .MuiSvgIcon-root": {
            bottom: theme.spacing(11),
        }
    },
    lowerJawTooth: {
        "& .MuiSvgIcon-root": {
            bottom: theme.spacing(17),
        }
    },
    toothContainer: {
        cursor: "pointer",
    },
    selectedTooth: {
        position: "relative",
        "& .MuiSvgIcon-root": {
            color: theme.primaryColor[0],
            zIndex: theme.selectedToothZIndex,
            position: "absolute",
            left: theme.spacing(2),
        },
    },
    unSelectedTooth: {
        position: "relative",
        "& .MuiSvgIcon-root": {
            display: "none",
        }
    }
  });
  
  export default toothStyle;
  