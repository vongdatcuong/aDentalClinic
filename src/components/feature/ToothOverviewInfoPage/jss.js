const style = (theme) => ({
 container: {
    background: theme.pageBackgroundColor,
    color: theme.textColor,
    flexGrow: 1,
  },
  root: {
    height: "100vh",
    color: theme.primaryColor[0],
  },
  tabsContainer: {
    height: "100vh",
    width: "3vw",
  },
  tabs: {
    height: "100vh",
    "& .MuiTabs-scrollButtons": {
      background: theme.blackColor,
      color: theme.whiteColor,
      opacity: "1",
    },
    "& .MuiTabScrollButton-root.Mui-disabled": {
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
    },
  },
  toothInfoContainer: {
    height: "100vh",
    width: "84vw",
    // "@media (min-width: 2304px)": {
    //   width: "80vw",
    // },
  },
});

export default style;
