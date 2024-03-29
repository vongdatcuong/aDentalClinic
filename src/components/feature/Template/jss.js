const templateStyle = (theme) => ({
   container: {
    background: theme.pageBackgroundColor,
    color: theme.textColor,
        flexGrow: 1,
        margin:"0px"
    },

    searchControl:{
        color: theme.textColor,
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
        justifyContent:'flex-end',
        '& .MuiFormControl-root':{
            marginRight:'2vw',

        }
    },
    iconButton:{
        cursor:'pointer',
        
    },
    title:{
        marginLeft:"30px",

    },
    titleColumn:{
        fontWeight:'bold',
        
    },
    titleDivider: {
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(2),
        marginBottom: theme.spacing(1.5),
        
    },
    goBack:{
        cursor:'pointer',
        color:theme.primaryColor[1],
        marginTop:'10px',
        display:'flex',
        justifyContent:'flex-end',
        marginRight:'15px',
        marginLeft:'10px',
    },
    serviceGroup:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-end',
        '& .MuiFormControl-root':{
            marginRight:'2vw',

        }
    },
    status:{
        marginRight:'1vw',
        '& .MuiSelect-select':{
            backgroundColor:'inherit',
        },
        color: theme.textColor,
        '& .MuiSelect-select':{
            backgroundColor:'inherit',
        },
        '& .MuiSelect-icon':{
            color: theme.textColor,
        },
    },
    dialog:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    },
    dialogMessage:{
        padding:'20px'
    },
    dialogButtons:{
        marginTop:'15px',
        marginRight:'10px',
        marginBottom:'15px',
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-end',
    },
    dialogButton:{
        marginLeft:'15px',
    },
    //container: {
    background: theme.pageBackgroundColor,
    color: theme.textColor,
    //     flexGrow: 1,
    //     margin:"0px"
    // },

    // searchControl:{
    //     height:40,
    //     width:'100%',
    //     '& .MuiOutlinedInput-input': {
    //         paddingTop: theme.spacing(1),
    //         paddingBottom: theme.spacing(1),
    //     }
    // },
    // serviceControl:{
    //     display:'flex',
    //     flexDirection:'row',

    // },
    // iconButton:{
    //     cursor:'pointer',
        
    // },
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
    templateMedicalAlert:{
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
    templateTreatment:{
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
    templateProgress:{
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
    containerTable:{
        marginLeft:'10px',
        '@media (min-width: 1280px)':{
            maxWidth:'none',
            width:'99%',
        }
    },
    
});
  
export default templateStyle;  