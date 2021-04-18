const styles = (theme) => ({
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
