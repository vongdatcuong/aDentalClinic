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
    paddingTop: theme.spacing(5),
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),
    "& .MuiGridList-root": {
      "& .styles_kPaginationListItemVertical__q-2s5": {
        flexWrap: "wrap",
        flexDirection: "row",
      },
      "& .styles_kPaginationListPage__2_6Ph": {
        position: "absolute",
        right: "15vw",
        top: "14vh",
      },
      "& .MuiGridListTile-root": {
        margin: theme.spacing(0.2),
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
    height: "auto", //theme.spacing(40)
    cursor: "pointer",
  },
  selectImgPerPage: {
    marginLeft: theme.spacing(1),
  },
});

export default styles;
