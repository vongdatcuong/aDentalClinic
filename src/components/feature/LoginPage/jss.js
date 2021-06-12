import loginBackground from "../../../assets/images/loginBackground.png";
const loginStyle = (theme) => ({
 container: {
    background: theme.pageBackgroundColor,
    color: theme.textColor,
    flexGrow: 1,
  },
  root: {
    background: theme.pageBackgroundColor,
    height: "100vh",
    color: theme.highlightColor,
  },
  loginContainer: {
    height: "65vh",
  },
  loginHeader: {
    height: "15vh",
  },
  image: {
    backgroundImage:  "url(" + loginBackground + ")",   // notice the url!
    backgroundRepeat: "no-repeat",
    // backgroundColor:
    //   theme.palette.type === "light"
    //     ? theme.palette.grey[50]
    //     : theme.palette.grey[900],
    backgroundPosition: "center",
    backgroundSize: 'contain'
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "90%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    marginLeft: "5rem",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: theme.highlightColor,
    height: "3rem",
    fontWeight: "bold",
  },
  brandContainer: {
    marginLeft: "7%",
    marginTop: "5%",
    display: "flex"
  },
  brandName : {
    fontStyle: "italic",
    fontWeight: "bold",
    fontSize: "3rem",
    marginLeft: theme.spacing(1),
  },
  logo : {
      width: "4rem",
      height: "4rem"
  },
  link : {
    fontWeight: "bold",
    color: theme.highlightColor + "!important",
  },
  inputContainer: {
    marginTop: "1rem",
    marginBottom: "1rem",
    '& div': {
        '& label': {
            color: theme.highlightColor + "!important",
            fontWeight: "bold",
        }
    }
  },
  inputText: {
    height: "3rem",
    '& div': {
        '& input': {
            // color: theme.highlightColor + "!important",
            fontWeight: "bold",
            color: theme.textColor,
        },
        '&::before': {
            borderBottomColor: theme.highlightColor
        },
        '&::after': {
            borderBottomColor: theme.highlightColor
        }
    }
  },
  inputTextContainer: {
      width: "85%",
  },
  btnToggleVisibility: {
    fontWeight: "bold",
    color: theme.highlightColor,
  },
  loginIcons: {
    fontSize: "2rem"
  },
  loginTitle: {
    minWidth: "20rem"
  },
  formMessageSuccess: {
    textAlign: "center",
    fontSize: "1.1em",
    color: theme.successColor[0],
    marginBottom: theme.spacing(1)
  },
  formMessageFail: {
    textAlign: "center",
    fontSize: "1.1em",
    color: theme.dangerColor[0],
    marginBottom: theme.spacing(1)
  },
});

export default loginStyle;
