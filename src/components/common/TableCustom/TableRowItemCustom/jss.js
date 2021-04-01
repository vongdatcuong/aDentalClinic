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
    tableRowEdit:{
        // '&:hover':{
        //     backgroundColor:'red',

        // }
    },
    tableRow:{
        
    },
});

  
export default tableRowItemCustomStyle;  