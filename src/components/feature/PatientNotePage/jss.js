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
  },
  btnAddRecord: {
    color: theme.primaryColor[0],
    fontWeight: "bold",
  },

});

export default styles;
