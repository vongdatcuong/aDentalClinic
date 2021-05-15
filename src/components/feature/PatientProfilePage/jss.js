import loginBackground from "../../../assets/images/loginBackground.png";
const loginStyle = (theme) => ({
  container: {
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
    marginTop: theme.spacing(-4),
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
