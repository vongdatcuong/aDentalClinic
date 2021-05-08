const toothStyle = (theme) => ({
    upperJawTooth: {
        "& .MuiSvgIcon-root": {
            bottom: theme.spacing(11),
        },
        "& .conditionLayer": {
            bottom: theme.spacing(11),
        }
    },
    lowerJawTooth: {
        "& .MuiSvgIcon-root": {
            bottom: theme.spacing(17),
        },
        "& .conditionLayer": {
            bottom: theme.spacing(16),
        },
        "& .maskLayer": {
            bottom: 0,
        }
    },
    toothContainer: {
        cursor: "pointer",
        "& .svgTooth": {
            "@media (max-width: 1280px)": {
                maxWidth: "6%",
            },
        },
        "& .conditionLayer": {
            display: "none",
        },
        "& .maskLayer": {
            display: "none",
        },
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
    },
    missingTooth: {
        opacity: "0.1",
    },
    veneerTooth: {
        "& .conditionLayer": {
            display: "unset",
            background: "#FEF8D8",
            zIndex: theme.selectedToothZIndex-1,
            position: "absolute",
            borderRadius: theme.spacing(3),
            width: theme.spacing(5),
            height: theme.spacing(5),
            left: theme.spacing(1.5),
        },
    },
    ponticsTooth: {
        "& .maskLayer": {
            display: "unset",
            background: theme.pageBackgroundColor,
            zIndex: theme.selectedToothZIndex-1,
            position: "absolute",
            width: theme.spacing(8),
            height: theme.spacing(14),
            left: 0,
        },
    },
    crownTooth: {
        "& .conditionLayer": {
            display: "unset",
            background: "#E1EEEB",
            zIndex: theme.selectedToothZIndex-1,
            position: "absolute",
            borderRadius: theme.spacing(3),
            width: theme.spacing(5),
            height: theme.spacing(5),
            left: theme.spacing(1.5),
        },
    },
    endotestsTooth: {
        background: "black",
    },
  });
  
  export default toothStyle;
  