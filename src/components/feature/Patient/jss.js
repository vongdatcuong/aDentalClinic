const patientStyle = (theme) => ({
    container: {
        flexGrow: 1,
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        maxWidth: '100%'
    },
    searchControl:{
        height:40,
        width: '100%',
        '& .MuiOutlinedInput-input': {
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1),
        },
    },
    serviceControl:{
        display:'flex',
        flexDirection:'row',
        '& .MuiFormControl-root': {
            width: '100%'
        }
    },
    iconButton:{
        cursor:'pointer',
        
    },
    title:{
        fontWeight: 600,
        paddingTop: theme.spacing(0),
        paddingBottom: theme.spacing(1),
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        [theme.breakpoints.down('sm')]: {
            textAlign: 'center'
        }
    },
    titleColumn:{
        fontWeight: 600,
        fontSize: '1.1em'
    },
    titleDivider: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        marginBottom: theme.spacing(1.5)
    },
    tableContainer: {
        maxWidth: '100%',
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        '& .MuiPaper-root': {
            boxShadow: theme.primaryBoxShadow.boxShadow
        }
    },
    table: {
        tableLayout: 'fixed'
    },
    tableCell: {
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word'
    },
    content:{
        
    },
    serviceIconBtn: {
        paddingTop: '5px',
        verticalAlign: 'text-top',
        '& .MuiSvgIcon-root': {
            fontSize: '1.3em'
        }
    }
});

  
export default patientStyle;  