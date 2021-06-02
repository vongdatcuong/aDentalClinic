import loginBackground from "../../../assets/images/loginBackground.png";
const loginStyle = (theme) => ({
 container: {
    background: theme.pageBackgroundColor,
    color: theme.textColor,
    flexGrow: 1,
    height: "100vh",
  },
  //color: theme.primaryColor[0],
  headerInfo: {
    height: "20vh",
    paddingTop: theme.spacing(3),
  },
  oralHeathContainer: {
    height: "40vh",
    borderBottom: "solid gray 0.1rem",
  },
  indexInputWrapper: {
    display: 'inline-block',
    width: '90%',
    '& input': {
      display: 'block',
      float: 'right',
      [theme.breakpoints.down('sm')]: {
        float: 'none',
        margin: '2px auto'
      },
    }
  },
  inputOralHeath: {
      marginLeft: theme.spacing(0.2),
      maxWidth: "3rem",
      textAlign: "center",
      backgroundColor: "transparent",
      borderWidth: "0.5px",
      borderColor: theme.borderColor,
      borderRadius: theme.spacing(0.5),
      '&:disabled': {
        border: "0px",
      },
  },
  oralHeathHeader: {
    width: "100%",
    paddingTop: theme.spacing(3),
  },
  detailProfileContainer: {
    height: "80vh",
    "& .MuiGrid-root.MuiGrid-item": {
      width: "95%",
      "& .MuiTabs-scroller.MuiTabs-fixed": {
        borderBottom: "solid gray 0.01rem",
      },
    },
  },
  medicalIssuesContainer: {
    height: "20vh",
    "& div.MuiInputBase-root": {
      minWidth: "18vw",
    },
    "& .MuiOutlinedInput-inputMultiline": {

    },
    "& .Mui-disabled": {
        "& $textarea": {
            color: theme.blackColor,
        },
        "& $fieldset": {
            border: "0px",
        },
    }
  },
  medicalIssuesHeader: {
    width: "100%",
    paddingTop: theme.spacing(2),
  },
  medicalIssuesBtns: {
    display: 'inline-block'
  },
  TabsContainer: {
    width: "100%",
  },
  leftGrid: {
    borderRight: "solid gray 0.01rem",
  },
  rightGrid: {
    paddingLeft: theme.spacing(3),
  },
  patientName: {
    width: "100%",
  },
  patientAgeGender: {
    width: "100%",
    marginTop: theme.spacing(-2),
    '& div': {
      marginTop: theme.spacing(0.5)
    }
  },
  btnEdit: {
    textTransform: "none",
  },
  linearProgressBar: {
    height: "0.7rem",
    borderRadius: 5,
    //backgroundColor: theme.primaryColor[5],
  },
  linearProgressBarContainer: {
    width: "100%",
    maxWidth: theme.spacing(30),
  },
  containerAddRecord:{
      display:'flex',
      justifyContent:'flex-end',
      marginRight:'30px',
      marginTop:'30px',
  },
  btnAddRecord: {

      color: theme.primaryColor[0],
      fontWeight: "bold",
      textTransform: "none",
  },
});

export default loginStyle;
