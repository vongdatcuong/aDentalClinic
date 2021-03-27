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
  },
  xRayImagesContainer: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  addXRayImage: {
    color: theme.whiteColor,
    width: theme.spacing(8),
    height: theme.spacing(8),
    "& .MuiSvgIcon-root": {
      fontSize: "2.5rem",
    },
  },
});

export default styles;
