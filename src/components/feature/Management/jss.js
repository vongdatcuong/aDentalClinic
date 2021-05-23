const managementStyle = (theme) => ({
 container: {
    background: theme.pageBackgroundColor,
    color: theme.textColor,
    flexGrow: 1,
    margin: "0px",
    "& .MuiTabs-root": {
      width: "92vw",
      paddingLeft: "20px",
      background: theme.primaryColor[1],
      color: theme.whiteColor,
      position: "fixed",
      zIndex: theme.menuBarZIndex,
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
    },
    "& .MuiBox-root": {
      padding: "0px",
      marginTop: "20px",
    },
    "& .MuiTab-wrapper": {
      background: theme.whiteColor,
      fontSize: "12px",
      border: "1px solid white",
      borderRadius: "20px",
      fontWeight: "bold",

      width: "120px",
      height: "100px",
    },
    "& Mui-selected": {
      fontWeight: "bold",
      color: theme.primaryColor[1],
    },
  },
  menuItem: {
    background: theme.whiteColor,
    zIndex: "100",
    width: "100px",
    height: "70px",

    marginTop: "20px",
    cursor: "pointer",
  },
  menuItemImage: {
    marginTop: "5px",
    width: 50,
    height: 50,
  },
});

export default managementStyle;
