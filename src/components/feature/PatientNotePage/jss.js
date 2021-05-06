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
  noteContainer: {
    padding: theme.spacing(10),
    paddingTop: theme.spacing(5),
  },
  btnAddRecord: {
    color: theme.primaryColor[0],
    fontWeight: "bold",
    textTransform: "none",
  },
  noteContentMacro: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  noteContentInput: {
    marginTop: theme.spacing(0),
  },
});

export default styles;
