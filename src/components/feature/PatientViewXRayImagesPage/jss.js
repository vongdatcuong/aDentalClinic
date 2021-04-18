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
    padding: theme.spacing(1),
    paddingBottom: theme.spacing(10),
    paddingTop: theme.spacing(1),
  },
  btnEditRecord: {
    color: "#edaa18",
    fontWeight: "bold",
    textTransform: "none",
  },
  btnSaveRecord: {
    color: "#24a0ed",
    fontWeight: "bold",
    textTransform: "none",
  },
  btnCancelRecord: {
    color: "red",
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
  box: {
    background: "#fff",
    borderColor: "black",
    border: "1px",
    borderRadius: "3px",
    borderStyle: "groove",
    width: "180px",
    height: "180px",
    margin: "10px",
    padding: "10px",
    float: "left",
  },
  input: {
    margin: "5px",
    padding: "5px",
    flexDirection: "row",
    paddingTop: "5px",
  },
  box_no_cursor: {
    background: "#fff",
    borderColor: "black",
    border: "1px",
    borderRadius: "3px",
    borderStyle: "groove",
    width: "180px",
    height: "180px",
    float: "left",
    cursor: "auto",
  },
  cursor: {
    cursor: "move",
    background: "#ddd",
    border: "1px",
    borderRadius: "3px",
    borderStyle: "groove",
    display: "block",
    textSlign: "center",
  },
  thumbnail: {
    maxWidth: theme.spacing(40),
    height: "auto", //theme.spacing(40)
    cursor: "pointer",
  },
});

export default styles;
