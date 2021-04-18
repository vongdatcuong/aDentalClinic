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
  xRayTemplateContainer: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  xRayImagesContainer: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(2),
    display: "flex",
    overflowX: "auto",
    width: "100%",
  },
  addXRayImage: {
    color: theme.whiteColor,
    width: theme.spacing(8),
    height: theme.spacing(8),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(1),
    "& .MuiSvgIcon-root": {
      fontSize: "2.5rem",
    },
  },
  xRayThumbnail: {
    marginLeft: theme.spacing(3),
    minWidth: theme.spacing(11),
    width: theme.spacing(11),
    maxWidth: theme.spacing(11),
    height: theme.spacing(12),
    borderStyle: "groove",
    cursor: "pointer",
  },
  xRayThumbnailImage: {
    padding: 5,
    width: theme.spacing(10),
    minWidth: theme.spacing(10),
    maxWidth: theme.spacing(10),
    height: theme.spacing(8),
    cursor: "pointer",
    justifySelf: "center",
    alignSelf: "center",
    textAlign: "center",
  },
});

export default styles;
