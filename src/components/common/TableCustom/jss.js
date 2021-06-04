const tableStyle = (theme) => ({
   container: {
    background: theme.pageBackgroundColor,
    color: theme.textColor,
        flexGrow: 1,
        margin:"0px"
    },
    table:{
        // borderRadius:'10px',
        boxShadow:`3px 3px 3px ${theme.grayColor[0]}`,
        backgroundColor: theme.tableBackgroundColor,
        "& .MuiTableCell-root": {
            color: theme.textColor,
        }
    },
    footer:{
        marginLeft:"300px",
    },
    titleColumn:{
        fontWeight:'bold',
        
    },
    content:{
        background:theme.whiteColor,
        marginTop:'30px',
    },
    tableCell: {
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word'
    },
});

  
export default tableStyle;  