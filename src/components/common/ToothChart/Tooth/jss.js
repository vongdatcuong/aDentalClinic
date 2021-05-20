const toothStyle = (theme) => ({
    upperJawTooth: {
        "& .MuiSvgIcon-root": {
            bottom: theme.spacing(11),
        },
        "& .conditionLayer": {
            bottom: theme.spacing(11),
        },
        "& .surfaceFull": {
            bottom: theme.spacing(0),
        },
        "& .surfaceTop": {
            bottom: theme.spacing(2),
        },
        "& .surfaceRoot": {
            bottom: theme.spacing(2),
        },
        "& .surfaceFacial": {
            bottom: theme.spacing(0),
        },
        "& .surfaceLingual": {
            bottom: theme.spacing(8.25),
        },
        "& .surfaceMesial": {
            bottom: theme.spacing(0.625),
        },
        "& .surfaceDistal": {
            bottom: theme.spacing(0.625),
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
        },
        "& .surfaceFull": {
            bottom: theme.spacing(23.125),
        },
        "& .surfaceTop": {
            bottom: theme.spacing(25),
        },
        "& .surfaceRoot": {
            bottom: theme.spacing(23.75),
        },
        "& .surfaceFacial": {
            bottom: theme.spacing(30),
        },
        "& .surfaceLingual": {
            bottom: theme.spacing(22.5),
        },
        "& .surfaceMesial": {
            bottom: theme.spacing(22.5),
        },
        "& .surfaceDistal": {
            bottom: theme.spacing(22.5),
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
        "& .surfaceFull": {
            display: "none",
        },
        "& .surfaceFacial": {
            display: "none",
        },
        "& .surfaceLingual": {
            display: "none",
        },
        "& .surfaceMesial": {
            display: "none",
        },
        "& .surfaceDistal": {
            display: "none",
        },
        "& .surfaceTop": {
            display: "none",
        },
        "& .surfaceRoot": {
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

    // display surface for add treatment
    selectedFullTooth: {
        "& .surfaceFull": {
            display: "unset",
            background: "red",
            zIndex: theme.selectedToothZIndex-1,
            position: "absolute",
            borderRadius: theme.spacing(3),
            width: theme.spacing(8.125),
            height: theme.spacing(8.125),
            left: theme.spacing(0),
        },
    },
    facial: {
        "& .surfaceFacial": {
            display: "unset",
            background: "red",
            zIndex: theme.selectedToothZIndex-1,
            position: "absolute",
            borderRadius: theme.spacing(3),
            width: theme.spacing(7.5),
            height: theme.spacing(0.5),
            left: theme.spacing(0),
        },
    },
    lingual: {
        "& .surfaceLingual": {
            display: "unset",
            background: "red",
            zIndex: theme.selectedToothZIndex-1,
            position: "absolute",
            borderRadius: theme.spacing(3),
            width: theme.spacing(7.5),
            height: theme.spacing(0.5),
            left: theme.spacing(0),
        },
    },
    rightMesial: {
        "& .surfaceMesial": {
            display: "unset",
            background: "red",
            zIndex: theme.selectedToothZIndex-1,
            position: "absolute",
            borderRadius: theme.spacing(3),
            width: theme.spacing(0.5),
            height: theme.spacing(7.5),
            left: theme.spacing(0),
        },
    },
    rightDistal: {
        "& .surfaceDistal": {
            display: "unset",
            background: "red",
            zIndex: theme.selectedToothZIndex-1,
            position: "absolute",
            borderRadius: theme.spacing(3),
            width: theme.spacing(0.5),
            height: theme.spacing(7.5),
            left: theme.spacing(7),
        },
    },
    leftMesial: {
        "& .surfaceMesial": {
            display: "unset",
            background: "red",
            zIndex: theme.selectedToothZIndex-1,
            position: "absolute",
            borderRadius: theme.spacing(3),
            width: theme.spacing(0.5),
            height: theme.spacing(7.5),
            left: theme.spacing(7),
        },
    },
    leftDistal: {
        "& .surfaceDistal": {
            display: "unset",
            background: "red",
            zIndex: theme.selectedToothZIndex-1,
            position: "absolute",
            borderRadius: theme.spacing(3),
            width: theme.spacing(0.5),
            height: theme.spacing(7.5),
            left: theme.spacing(0),
        },
    },
    top: {
        "& .surfaceTop": {
            display: "unset",
            background: "red",
            zIndex: theme.selectedToothZIndex-1,
            position: "absolute",
            borderRadius: theme.spacing(3),
            width: theme.spacing(3.5),
            height: theme.spacing(3.5),
            left: theme.spacing(2.125),
        },
    },
    root: {
        "& .surfaceRoot": {
            display: "unset",
            background: "red",
            zIndex: theme.selectedToothZIndex-1,
            position: "absolute",
            borderRadius: theme.spacing(3),
            width: theme.spacing(5.5),
            height: theme.spacing(5.5),
            left: theme.spacing(1.5),
        },
    },
  });
  
  export default toothStyle;
  