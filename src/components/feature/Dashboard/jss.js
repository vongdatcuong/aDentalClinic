const dashboardStyle = (theme) => ({
    container: {
        flexGrow: 1,
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1), 
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(0.5),
        marginBottom: theme.spacing(0.5),
        maxWidth: 'none',
        overflow: 'hidden'
    },
    appointmentTabBox: {
        position: 'fixed'
    },
});
  
export default dashboardStyle;  