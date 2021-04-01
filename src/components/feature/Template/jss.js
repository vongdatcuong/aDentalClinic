const templateStyle = (theme) => ({
    container: {
        flexGrow: 1,
        margin:"0px"
    },

    searchControl:{
        height:40,
        width:'100%',
        '& .MuiOutlinedInput-input': {
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1),
        }
    },
    serviceControl:{
        display:'flex',
        flexDirection:'row',

    },
    iconButton:{
        cursor:'pointer',
        
    },
    title:{
        marginLeft:"30px",

    },
    titleItem:{
        marginLeft:'10px',
    },
    titleColumn:{
        fontWeight:'bold',
        
    },
    titleDivider: {
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(2),
        marginBottom: theme.spacing(1.5)
    },
    spaceLeft:{
        marginLeft:'20px',
    },
    templateNewPatient:{
        height:'150px',
        width:'150px',
        marginLeft:'10px',
        marginTop:'10px',
        display:'flex',
        flexDirection:'column',
        
        alignItems:'center',
        justifyContent:'center',
        color:theme.whiteColor,
        border:`1px solid ${theme.warningColor[0]}`,
        borderRadius:'5px',
        backgroundColor:theme.warningColor[0],
        '& .MuiSvgIcon-root':{
            fontSize:'2.3rem'
        },
        cursor:'pointer',
    },
    templateInvoice:{
        height:'150px',
        width:'150px',
        marginLeft:'10px',
        marginTop:'10px',
        display:'flex',
        flexDirection:'column',
        
        alignItems:'center',
        justifyContent:'center',
        color:theme.whiteColor,
        border:`1px solid ${theme.successColor[0]}`,
        borderRadius:'5px',
        backgroundColor:theme.successColor[0],
        '& .MuiSvgIcon-root':{
            fontSize:'2.3rem'
        },
        cursor:'pointer',
    },
    templateReport:{
        height:'150px',
        width:'150px',
        marginLeft:'10px',
        marginTop:'10px',
        display:'flex',
        flexDirection:'column',
        
        alignItems:'center',
        justifyContent:'center',
        color:theme.whiteColor,
        border:`1px solid ${theme.infoColor[0]}`,
        borderRadius:'5px',
        backgroundColor:theme.infoColor[0],
        '& .MuiSvgIcon-root':{
            fontSize:'2.3rem'
        },
        cursor:'pointer',
    },
    templateResignationLetter:{
        height:'150px',
        width:'150px',
        marginLeft:'10px',
        marginTop:'10px',
        display:'flex',
        flexDirection:'column',
        
        alignItems:'center',
        justifyContent:'center',
        color:theme.whiteColor,
        border:`1px solid ${theme.dangerColor[0]}`,
        borderRadius:'5px',
        backgroundColor:theme.dangerColor[0],
        '& .MuiSvgIcon-root':{
            fontSize:'2.3rem'
        },
        cursor:'pointer',
    },
});
  
export default templateStyle;  