const tableStyle = (theme) => ({
    container: {
        flexGrow: 1,
        margin:"0px"
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