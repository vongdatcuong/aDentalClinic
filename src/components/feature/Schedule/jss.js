const scheduleStyle = (theme) => ({
    container: {
        flexGrow: 1,
        margin:"0px",
    },
    tableContainer: {
        maxWidth: 'none',
        marginLeft: '10px',
        width: '99%'
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
        justifyContent: 'flex-end',
        '& .MuiFormControl-root':{
            marginRight: '2vw',
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
        marginBottom: theme.spacing(1.5)
    },
    status:{
        marginRight:'1vw',
        '& .MuiSelect-select':{
            backgroundColor:'inherit',
        },
    },
    goBack:{
        cursor:'pointer',
        color:theme.primaryColor[1],
        display:'flex',
        justifyContent:'flex-end',
        marginRight:'15px',
    },
});

  
export default scheduleStyle;  