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
        width: '100%',
        height: '100%',
    },
    fabAppointRequest: {
        position: 'fixed',
        right: 150,
        bottom: 50,
        zIndex: theme.fabZIndex,
        backgroundColor: theme.infoColor[0]
    }
});
  
export default dashboardStyle;  