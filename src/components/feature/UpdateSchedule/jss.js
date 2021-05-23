const updateScheduleStyle = (theme) => ({
   container: {
    background: theme.pageBackgroundColor,
    color: theme.textColor,
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
    providerInfo: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    headerContainer: {
        position: 'relative',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    title: {
        fontWeight: 600
    },
    itemContainer: {
        color: theme.whiteColor,
        borderRadius: "0.3rem",
        marginTop: "0.7rem",
        marginBottom: "0.7rem",
        paddingTop: 0,
        paddingBottom: 0,
        display: 'inline-block',
        '& span': {
            verticalAlign: 'sub'
        }
    },
    itemDate: {
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        "& span": {
            fontSize: '1.2em',
            verticalAlign: 'sub',
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1),
            [theme.breakpoints.down('sm')]: {
                fontSize: '1em',
            },
        },
        "& svg": {
            fontSize: '.9em',
            verticalAlign: 'text-bottom',
            
        }
    },
    itemContent: {

    },
    updateBtn: {
        color: theme.warningColor[2] + " !important",
        paddingLeft: theme.spacing(0.5),
        paddingRight: theme.spacing(0.5)
    },
    deleteBtn: {
        color: theme.dangerColor[2] + " !important",
        paddingLeft: theme.spacing(0.5),
        paddingRight: theme.spacing(0.5)
    },
    addRecordBtn: {
        color: theme.primaryColor[0],
        fontWeight: "bold",
        textTransform: "none",
        position: 'absolute',
        top: 0,
        right: 0
    },
    monthlyItem: {
        backgroundColor: theme.scheduleMonthlyItemColor
    },
    weeklyItem: {
        backgroundColor: theme.scheduleWeeklyItemColor
    },
    autoItem: {
        backgroundColor: theme.scheduleAutoItemColor,
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        minWidth: theme.scheduleAutoItemMinWidth,
    },
    autoItemDeleteBtn: {
        minWidth: '50px',
    },
    noDataContainer: {
        textAlign: 'center',
        '& svg': {
            width: 100,
            height: 80
        }
    }
});

  
export default updateScheduleStyle;  