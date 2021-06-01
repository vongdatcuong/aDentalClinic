const styles = (theme) => ({
 container: {
    background: theme.pageBackgroundColor,
    color: theme.textColor,
    flexGrow: 1,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    height: '100%',
    maxWidth: 'none'
  },
  title: {
    fontWeight: 600
  },
  gridContainer: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  },
  formGroup: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  formMessageFail: {
    textAlign: "left",
    fontSize: "12px",
    color: theme.dangerColor[0],
    marginTop: '4px',
    marginLeft: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5)
  },
  inputPaperWrapper: {
    width: '100%',
    padding: theme.spacing(2)
  },
  addBtn: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    margin: 'auto'
  },
  titleColumn: {
    fontWeight: 600
  },
  noDataWrapper: {
    textAlign: 'center'
  }
});



export default {
  styles,
};
