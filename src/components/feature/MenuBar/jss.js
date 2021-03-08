const menuBarStyle = (theme) => ({
    container: {
        
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.primaryColor[2],
        margin:'0px'
    },
    
    menuItem:{
        background: theme.whiteColor,
        zIndex:"100",
        height:"70px",
        marginTop:"20px",
        marginBottom:"15px",
        cursor:'pointer'
    },
    menuItemFirst:{
        marginLeft:"30px",
        
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
        cursor:'pointer'
    },
    link:{
        textDecoration:'none',
        color:'black',
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
  
export default menuBarStyle;  