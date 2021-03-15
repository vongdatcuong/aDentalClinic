const reportStyle = (theme) => ({
    dummyContainer: {
        padding: 0,
        margin: 0,
        maxWidth: 'none'
    },
    container: {
        flexGrow: 1,
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        marginLeft: theme.spacing(0),
        marginRight: theme.spacing(1),
        maxWidth: 'none',
    },
    title: {
        fontWeight: 600,
        position: 'fixed',
        width: '100%',
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        backgroundColor: theme.whiteColor,
        borderRadius: '5px',
        boxShadow: theme.primaryBoxShadow.boxShadow,
        [theme.breakpoints.down('sm')]: {
            textAlign: 'center'
        }
    },
    calendarIcon: {
        color: theme.primaryColor[0],
        verticalAlign: 'middle',
        marginLeft: theme.spacing(2)
    },
    inputFrom: {
        display: 'inline-block',
        verticalAlgin: 'text-bottom',
        marginLeft: theme.spacing(1),
        '& input': {
            border: `2px solid ${theme.hoverDarkColor[1]}`,
            borderRadius: '5px',
            backgroundColor: theme.primaryColor[0],
            color: theme.fontColor,
            padding: theme.spacing(1),
            '&::placeholder': {
                color: theme.fontColor,
                opacity: 1,
            },
            [theme.breakpoints.down('xs')]: {
                width: '120px'
            },
            '&:hover': {
                cursor: 'text'
            }
        }
    },
    inputTo: {
        '& input': {
            border: `2px solid ${theme.hoverDarkColor[1]}`,
            borderRadius: '5px',
            padding: theme.spacing(1),
            '&::placeholder': {
                color: theme.fontColor,
                opacity: 1,
            },
            [theme.breakpoints.down('xs')]: {
                width: '120px'
            },
            '&:hover': {
                cursor: 'text'
            }
        }
    },
    applyBtn: {
        paddingTop: theme.spacing(0.7),
        paddingBottom: theme.spacing(0.7),
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        verticalAlign: 'baseline',
        color: theme.fontColor,
        marginLeft: theme.spacing(2),
        backgroundColor: theme.secondaryColor[0],
        '&:hover': {
            backgroundColor: theme.hoverBrightColor[1]
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: theme.spacing(1.5)
        },
    },
    cardReport: {
        marginTop: theme.spacing(9),
        marginBottom: theme.spacing(0),
    },
    card: {
        padding: theme.spacing(0.5),
        boxShadow: theme.primaryBoxShadow.boxShadow
    },
    cardContent: {
        paddingTop: 0,
        paddingBottom: `0px !important`,
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
    },
    cardValue: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        fontWeight: 600,
        fontSize: '1.3em'
    },
    cardLabel: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1)
    },
    cardDivider: {
        backgroundColor: theme.primaryColor[0],
        height: '4px',
        borderRadius: '5px'
    },
    chartGrid: {
        marginTop: theme.spacing(0),
        marginBottom: theme.spacing(0),
    },
    chartCanvas: {
        boxShadow: theme.primaryBoxShadow.boxShadow,
        borderRadius: '3px',
        padding: theme.spacing(1)
    },
    cardCircularReport: {
        marginTop: theme.spacing(0),
        marginBottom: theme.spacing(0),
    },
    cardCircularReportItem: {
        
    },
    cardCircularReportItemCard: {
        boxShadow: theme.primaryBoxShadow.boxShadow,
    },
    cardCircularHeader: {
        paddingTop: theme.spacing(1.5),
        paddingBottom: theme.spacing(1),
        '& .MuiCardHeader-title': {
            fontSize: '1.5em',
            fontWeight: 600
        }
    },
    circularCardDivider: {
        height: '2px',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
    circularChartCanvas: {
        
    },
    circularAction: {
        textAlign: 'center'
    },
    circularActionValue: {
        fontWeight: 600,
        fontSize: '1em'
    },
    circularActionGroup: {
        paddingTop: '5px',
        fontWeight: 550,
        fontSize: '0.9em'
    }
});
  
export default reportStyle;  