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
    paddingTop: theme.spacing(10),
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),
    "& .MuiGridList-root": {
      "& .MuiGridListTile-root": {
        width: "17vw!important",
        height: "17vw!important",
        "& .MuiGridListTileBar-root": {
            height: "auto",
        },
      },
    },
  },
  btnAddRecord: {
    color: theme.primaryColor[0],
    fontWeight: "bold",
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  thumbnail: {
    maxWidth: theme.spacing(40),
    height: "auto",//theme.spacing(40)
    cursor: "pointer",
  },

});

export default styles;
