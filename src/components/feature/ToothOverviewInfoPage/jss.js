const style = (theme) => ({
  container: {
    flexGrow: 1,
  },
  root: {
    height: "100vh",
    color: theme.primaryColor[0],
  },
  tabsContainer: {
    height: "100vh",
    width: "4vw",
  },
  tabs: {
    height: "100vh",
    "& .MuiTabs-scrollButtons": {
        background: theme.blackColor,
        color: theme.whiteColor,
        opacity: "1",
    },
    "& .MuiTabScrollButton-root.Mui-disabled":{
        color: theme.blackColor,
    },
    "& .MuiTab-root": {
        minWidth: "0.1rem",
        minHeight: "0.1rem",
        padding: 0,
        opacity: "0.8",
        background: theme.blackColor,
        color: theme.whiteColor,
    },
    "& .Mui-selected": {
        borderRight: 0,
        background: theme.whiteColor,
        color: theme.blackColor,
    }
  },
  toothInfoContainer: {
    height: "100vh",
    width: "80vw",
  },
});

export default style;
