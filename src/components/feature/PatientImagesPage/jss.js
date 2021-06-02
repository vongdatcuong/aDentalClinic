const styles = (theme) => ({
 container: {
    background: theme.pageBackgroundColor,
    color: theme.textColor,
    flexGrow: 1,
    height: "100vh",
    paddingTop: theme.spacing(3),
  },
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "solid " + theme.textColor + " 0.05rem",
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
        right: "12vw",
        top: "13vh",
        "@media (max-width: 1024px)": {
          right: "25vw",
          top: "7vh",
        },
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
    color: theme.materialPrimaryColor,
    fontWeight: "bold",
    textTransform: "none",
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
    height: "30px",
    width: "30px",
    margin: "5px",
  },
  thumbnail: {
    maxWidth: theme.spacing(40),
    height: "auto", //theme.spacing(40)
    cursor: "pointer",
  },
  selectImgPerPage: {
    marginLeft: theme.spacing(1),
    color: theme.textColor,
    "& .MuiSelect-root": {
        color: theme.textColor,
    }
  },
  noDataIcon: {
    textAlign: 'center',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
});

export default styles;
