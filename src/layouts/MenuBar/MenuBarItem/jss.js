const menuBarItemStyle = (theme) => ({
    
    
    menuItem:{
        background: theme.whiteColor,
        zIndex:"100",
        height:"70px",
        marginTop:"20px",
        marginBottom:"15px",
        marginRight:"20px",
        cursor:'pointer',
        border:'1px solid white',
        borderRadius:'10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuItemFirst:{
        background: theme.whiteColor,
        zIndex:"100",
        height:"70px",
        marginTop:"20px",
        marginBottom:"15px",
        cursor:'pointer',
        border:'1px solid white',
        borderRadius:'10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuItemImage:{
        marginTop:"5px",
        width:"50px",
        height:"40px",
    },
    menuItemAuthentication:{
        background: theme.whiteColor,
        zIndex:"100",
        height:"70px",
        marginTop:"20px",
        marginLeft:"20px",

        cursor:'pointer',
        borderRadius:'10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    link:{
        textDecoration:'none',
        color:'black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'column',
    },
    activeLink:{
        color:'blue',
        fontWeight:'bold',
    },
    linkSmall:{
        textDecoration:'none',
        fontSize:'13px'
    },
   
});
  
export default menuBarItemStyle;  