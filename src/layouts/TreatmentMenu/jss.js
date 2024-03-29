const treatmentMenuStyle = (theme) => ({
    leftSidebarWrapper: {
      color: theme.fontColor,
      width: theme.drawerLeftWidth,
      flexShrink: 0
    },
    drawer: {
      '& .MuiDrawer-paper': {
        backgroundColor: theme.primaryColor[0]
      }
    },
    divider: {
      backgroundColor: theme.whiteColor,
      height: '1.5px'
    },
    sidebarWrapper: {
      position: "relative",
      height: "calc(100vh - 75px)",
      overflow: "auto",
      width: theme.drawerLeftWidth,
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
      color: theme.whiteColor,
      borderRadius: '5px',
      backgroundColor: theme.primaryColor[2],
      '& .MuiIconButton-label': {
        '& .MuiSvgIcon-root': {
          fontSize: '1.2em'
        }
      },
      '&:hover': {
        backgroundColor: theme.hoverBrightColor[0]
      }
    },
    // Mini Left Sidebar
    miniLeftSidebarWrapper: {
      position: 'absolute',
      top: '15px',
      backgroundColor: theme.blackColor,
      opacity: 0.3,
      borderRadius: '0 5px 5px 0',
      '& .MuiSvgIcon-root': {
        color: theme.whiteColor, 
      },
    },
    goBackBtn : {
        width: '100%',
        height: '60px',
        marginBottom: "0.7rem",
        color: theme.whiteColor,
        borderRadius: '5px',
        backgroundColor: theme.primaryColor[2],
        '& .MuiIconButton-label': {
          '& .MuiSvgIcon-root': {
            fontSize: '1.2em'
          }
        },
        '&:hover': {
          backgroundColor: theme.hoverBrightColor[0]
        }

    }
  });
  
export default treatmentMenuStyle;  