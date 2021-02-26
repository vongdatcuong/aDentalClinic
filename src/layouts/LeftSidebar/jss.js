import {
    drawerLeftWidth,
    primaryColor,
    fontColor,
    whiteColor,
    hoverBrightColor,
    blackColor,
  } from "../../themes/theme1";
  
const sidebarStyle = (theme) => ({
    leftSidebarWrapper: {
      color: fontColor,
      width: drawerLeftWidth,
      flexShrink: 0
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
    // Mini Left Sidebar
    miniLeftSidebarWrapper: {
      position: 'absolute',
      top: '15px',
      backgroundColor: blackColor,
      opacity: 0.3,
      borderRadius: '0 5px 5px 0',
      '& .MuiSvgIcon-root': {
        color: whiteColor, 
      },
    }
  });
  
export default sidebarStyle;  