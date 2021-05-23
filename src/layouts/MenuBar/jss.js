const menuBarStyle = (theme) => ({
   container: {
    background: theme.pageBackgroundColor,
    color: theme.textColor,
        
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width:'100%',
        background: theme.primaryColor[2],
        margin:'0px',
        '& .horizontal-menu': {
            width:'1200px',
        },
        '& .MuiTabs-root':{
            width:'1200px',

        },
        '& .menu-wrapper--inner': {
            transform:'translate3d(15px, 0px, 0px) !important',
        },
        '& .menu-item-wrapper': {
            paddingLeft:'10px',
            paddingRight:'10px',
        },
        '& .scroll-menu-arrow':{
            padding: '20px',
            cursor: 'pointer',
        }
    },
    
    menuItem:{
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
    arrowLeft:{
        color:theme.whiteColor,
        fontSize:'20px',
    },
    arrowRight:{
        color:theme.whiteColor,
        fontSize:'20px',

    }
});
  
export default menuBarStyle;  