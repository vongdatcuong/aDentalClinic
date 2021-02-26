import {
    drawerRightWidth,
    drawerRightCloseWidth,
    transition,
    boxShadow,
    primaryColor,
    primaryBoxShadow,
    infoColor,
    successColor,
    warningColor,
    dangerColor,
    fontColor,
    whiteColor,
    grayColor,
    blackColor,
    hoverBrightColor,
    hexToRgb
  } from "../../themes/theme1";
  
const sidebarStyle = (theme) => ({
    rightSidebarWrapper: {
      color: fontColor,
      width: drawerRightWidth,
      flexShrink: 0,
      '& .MuiSvgIcon-root': {
          color: fontColor
      },
      '& .MuiDivider-root': {
        backgroundColor: whiteColor,
        height: '1px',
        width: '90%',
        margin: '0 auto'
      }
    },
    drawer: {
      '& .MuiDrawer-paper': {
        backgroundColor: primaryColor[0],
        color: fontColor,
      }
    },
    sidebarWrapper: {
      position: "relative",
      height: "calc(100vh - 75px)",
      overflow: "auto",
      width: drawerRightWidth,
      zIndex: "4",
      overflowScrolling: "touch",
      marginTop: '10px'
    },
    drawerOpen: {
        width: drawerRightWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: drawerRightCloseWidth,
        [theme.breakpoints.up('sm')]: {
          width: drawerRightCloseWidth + 10,
        },
    },
    toggleBtn: {
      borderRadius: '0px',
      '& .MuiSvgIcon-root': {
        fontSize: '1.7em'
      } 
    },
    rightSidebarCloseWrapper: {
      width: drawerRightCloseWidth,
    },
    sidebarContent: {
      //width: 0,
      display: 'none',
      transition: theme.transitions.create('display', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      paddingLeft: drawerRightCloseWidth + 20,
      paddingRight: drawerRightCloseWidth + 20,
      transition: theme.transitions.create('padding', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    displayBlock: {
      //width: '100%',
      display: 'block',
      transition: theme.transitions.create('display', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      transition: theme.transitions.create('padding', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    calendar: {
      fontSize: '0.93em',
      backgroundColor: whiteColor,
      color: blackColor,
    },
    appointmentHolder: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      paddingLeft: theme.spacing(0),
      paddingRight: theme.spacing(0),
      textAlign: 'center',
    },
    appointmentHolderBox: {
      width: '100%',
      minHeight: '100px',
      backgroundColor: whiteColor,
      borderRadius: '10px',
      marginTop: theme.spacing(1)
    },
    todayAppoinment: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      paddingLeft: theme.spacing(0),
      paddingRight: theme.spacing(0),
      textAlign: 'center',
    },
    todayAppoinmentBox: {
      width: '100%',
      minHeight: '100px',
      backgroundColor: whiteColor,
      borderRadius: '10px',
      marginTop: theme.spacing(1)
    }
  });
  
export default sidebarStyle;  