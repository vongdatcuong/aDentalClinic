const appointmentTabStyle = (theme) => ({
    paper: {
        width: '100%',
        height: '100%'
    },
    backBtn: {
        float: 'left',
        backgroundColor: theme.blackColor,
        opacity: 0.5,
        color: theme.fontColor,
        margin: theme.spacing(2),
        '&:hover': {
            color: theme.fontColor,
            backgroundColor: theme.hoverBrightColor[0]
        }
    },
    title: {
        fontWeight: 600,
        textAlign: 'center',
        paddingTop: theme.spacing(2)
    },
    gridContainer: {
        padding: theme.spacing(2)
    }
});
  
export default appointmentTabStyle;  