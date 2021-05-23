const toothChartPageStyle = (theme) => ({
 container: {
    background: theme.pageBackgroundColor,
    color: theme.textColor,
    flexGrow: 1,
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
});

export default toothChartPageStyle;
