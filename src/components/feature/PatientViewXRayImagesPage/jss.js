const styles = (theme) => ({
  container: {
    flexGrow: 1,
    height: "100vh",
    paddingTop: theme.spacing(3),
  },
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "solid " + theme.blackColor + " 0.05rem",
  },
  bodyContainer: {
    padding: theme.spacing(10),
    paddingTop: theme.spacing(5),
  },
  btnAddRecord: {
    color: theme.primaryColor[0],
    fontWeight: "bold",
    textTransform: "none",
  },
  xRayImageContainer: {
    "& img": {
      maxHeight: "70vh",
      marginLeft: "auto",
      marginRight: "auto",
      display: "block",
    },
  },
});

export default styles;
