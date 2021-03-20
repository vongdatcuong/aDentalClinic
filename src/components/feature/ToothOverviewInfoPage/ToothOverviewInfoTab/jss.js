const style = (theme) => ({
  toothTabContainer: {
    height: "100vh",
    "& .MuiBox-root": {
        padding: 0,
    }
  },
  root: {
    height: "100vh",
    color: theme.primaryColor[0],
  },
  toothImgContainer: {
    height: "100vh",
    background: theme.grayColor[4],
    display: "flex",    // centering
    justifyContent: "center",
    alignItems: "center",
    "& svg": {
        height: "60%",
        width: "auto",
    }
  },
  toothInfoContainer: {
    height: "100vh",

  },
});

export default style;
