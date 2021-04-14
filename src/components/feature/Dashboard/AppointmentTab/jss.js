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
        padding: theme.spacing(2),
        paddingTop: 0,
        "& .MuiInputBase-root.Mui-disabled": {
            color: theme.primaryColor[0],
            opacity: 0.85
        }
    },
    newPatientBtn: {

    },
    formGroup: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    formGroupHeader: {
        fontWeight: 600
    },
    formControl: {
        width: '100%',
        '& label': {
            opacity: theme.secondaryOpacity
        }
    },
    tableContainer: {
        height: theme.appointmentTreatmentTableHeight
    },
    table: {
        tableLayout: 'fixed'
    },
    tableCellName:{
        fontWeight: 600,
    },
    tableCell: {
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        paddingLeft: 0,
        paddingRight: 0
    },
    tableBtnGroup: {
        textAlign: 'right'
    },
    tableIconBtn: {
        '& .MuiSvgIcon-root': {
            fontSize: '35px'
        }
    },
    insertLinkIcon: {
        color: theme.tableInsertLinkIconColor
    },
    addIcon: {
        color: theme.tableAddIconColor
    },
    formMessageSuccess: {
        textAlign: "left",
        fontSize: "12px",
        color: theme.successColor[0],
        marginBottom: theme.spacing(1)
    },
    formMessageFail: {
        textAlign: "left",
        fontSize: "12px",
        color: theme.dangerColor[0],
        marginTop: '4px',
        marginLeft: theme.spacing(1.5),
        marginBottom: theme.spacing(1.5)
    },
    autocompleteLabel: {
        fontSize: '12px'
    }
});
  
export default appointmentTabStyle;  