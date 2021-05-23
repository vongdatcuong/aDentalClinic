const patientStyle = (theme) => ({
   container: {
    background: theme.pageBackgroundColor,
    color: theme.textColor,
        flexGrow: 1,
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        maxWidth: '100%'
    },
    // searchControl:{
    //     height:40,
    //     width: '100%',
    //     '& .MuiOutlinedInput-input': {
    //         paddingTop: theme.spacing(1),
    //         paddingBottom: theme.spacing(1),
    //     },
    // },
    // serviceControl:{
    //     display:'flex',
    //     flexDirection:'row',
    //     '& .MuiFormControl-root': {
    //         width: '100%'
    //     }
    // },
    // iconButton:{
    //     cursor:'pointer',
        
    // },
    // title:{
    //     fontWeight: 600,
    //     paddingTop: theme.spacing(0),
    //     paddingBottom: theme.spacing(1),
    //     paddingLeft: theme.spacing(3),
    //     paddingRight: theme.spacing(3),
    //     [theme.breakpoints.down('sm')]: {
    //         textAlign: 'center'
    //     }
    // },
    // titleColumn:{
    //     fontWeight: 600,
    //     fontSize: '1.1em'
    // },
    // titleDivider: {
    //     marginLeft: theme.spacing(2),
    //     marginRight: theme.spacing(2),
    //     marginBottom: theme.spacing(1.5)
    // },
    // tableContainer: {
    //     maxWidth: '100%',
    //     paddingLeft: theme.spacing(2),
    //     paddingRight: theme.spacing(2),
    //     '& .MuiPaper-root': {
    //         boxShadow: theme.primaryBoxShadow.boxShadow
    //     }
    // },
    // table: {
    //     tableLayout: 'fixed'
    // },
    // tableCell: {
    //     whiteSpace: 'pre-wrap',
    //     wordBreak: 'break-word'
    // },
    // content:{
        
    // },
    // serviceIconBtn: {
    //     paddingTop: '5px',
    //     verticalAlign: 'text-top',
    //     '& .MuiSvgIcon-root': {
    //         fontSize: '1.3em'
    //     }
    // }

    
    //container: {
    background: theme.pageBackgroundColor,
    color: theme.textColor,
    //     flexGrow: 1,
    //     margin:"0px"
    // },

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
    actionButton: {
        "& .MuiButton-label": {
            textTransform: 'none',
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

  
export default patientStyle;  