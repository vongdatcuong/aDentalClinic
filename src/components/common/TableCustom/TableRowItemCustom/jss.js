const tableRowItemCustomStyle = (theme) => ({
    
    tableCell: {
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word'
    },
    checkIcon:{
        cursor:'pointer',
        
    },
    tableRowEditChangePage:{
        '&:hover':{
            backgroundColor:theme.primaryColor[1],
            cursor:'pointer',
        }
    },
    tableRowDelete:{
        '&:hover':{
            backgroundColor:theme.dangerColor[0],
            cursor:'pointer',

        }
    },
    tableRow:{
        '&:hover':{
            cursor:'pointer',

        }
    },
});

  
export default tableRowItemCustomStyle;  