import {
    drawerLeftWidth,
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
    leftSidebarWrapper: {
      color: fontColor
    },
    drawer: {
      '& .MuiDrawer-paper': {
        backgroundColor: primaryColor[0]
      }
    },
    divider: {
      backgroundColor: whiteColor,
      height: '1.5px'
    },
    sidebarWrapper: {
      position: "relative",
      height: "calc(100vh - 75px)",
      overflow: "auto",
      width: drawerLeftWidth,
      zIndex: "4",
      overflowScrolling: "touch",
      marginTop: '10px'
    },
    list: {
      marginTop: "10px",
      paddingLeft: "0",
      paddingTop: "0",
      paddingBottom: "0",
      marginBottom: "0",
      listStyle: "none",
      position: "unset"
    },
    listItem: {
      width: '100%',
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    listItemLink: {
      margin: '0 auto',
    },
    listItemBtn: {
      width: '60px',
      height: '60px',
      color: whiteColor,
      borderRadius: '5px',
      backgroundColor: primaryColor[2],
      '& .MuiIconButton-label': {
        '& .MuiSvgIcon-root': {
          fontSize: '1.2em'
        }
      },
      '&:hover': {
        backgroundColor: hoverBrightColor[0]
      }
    },
  });
  
export default sidebarStyle;  