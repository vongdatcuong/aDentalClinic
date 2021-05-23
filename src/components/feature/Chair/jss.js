const chairStyle = (theme) => ({
   container: {
    background: theme.pageBackgroundColor,
    color: theme.textColor,
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
        display:'flex',
        justifyContent:'flex-end',
        marginRight:'15px',
    },
    status:{
        marginRight:'1vw',
        '& .MuiSelect-select':{
            backgroundColor:'inherit',
        },
    },
    containerTable:{
        marginLeft:'10px',
        '@media (min-width: 1280px)':{
            maxWidth:'none',
            width:'99%',
        }
    },
    
});

  
export default chairStyle;  