const managementStyle = (theme) => ({
    container: {
        flexGrow: 1,
        margin:"0px",
        '& .MuiTabs-root':{
            width:'92vw',
            background:theme.primaryColor[1],
            color:theme.whiteColor,
            position:'fixed',
            zIndex: theme.menuBarZIndex,
            [theme.breakpoints.down('sm')]: {
                width: '100%'
            },

        },
        '& .MuiBox-root':{
            padding:'0px',
            marginTop:'10px',

        },
        '& .MuiTab-wrapper':{
            background:theme.whiteColor,
            fontSize:'12px',
            border:'1px solid white',
            borderRadius:'10px',
            fontWeight:'bold' ,

        },
        '& Mui-selected':{
            fontWeight:'bold' ,
            color:theme.primaryColor[1],

        },
        
    },
    menuItem:{
        background: theme.whiteColor,
        zIndex:"100",
        width:"100px",
        height:"70px",
        marginTop:"20px",
        cursor:'pointer'
    },
    menuItemImage:{
        marginTop:"5px",
        width:"50px",
        height:"40px",
    },
    tabs:{
        
    }
});
  
export default managementStyle;  