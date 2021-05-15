const patientReferralStyle = (theme) => ({
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
        justifyContent:'flex-end',
        '& .MuiFormControl-root':{
            marginRight:'1vw',
        },
        '& .MuiIconButton-root':{
            padding:'5px',
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
        display:'flex',
        justifyContent:'flex-end',
        marginRight:'15px',
    },
    status:{
        // marginRight:'1vw',
        '& .MuiSelect-select':{
            backgroundColor:'inherit',
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
    containerTable:{
        marginLeft:'10px',
        '@media (min-width: 1280px)':{
            maxWidth:'none',
            width:'99%',
        }
    },
    dialogContainer:{
        minWidth:'93vw',
        minHeight:'600px',
        justifyContent:'center',
        alignItems:'center',
        '& .MuiDialog-paperWidthSm':{
            minWidth:'93vw',
            minHeight:'600px',

        }
    },
});
  
export default patientReferralStyle;  