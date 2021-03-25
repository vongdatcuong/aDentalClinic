const tableRowItemCustomStyle = (theme) => ({
    
    tableCell: {
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        '& .MuiGrid-container':{
            alignItems:'center',
        },
        '&:hover':{
            //background:theme.primaryColor[1],
            '& .MuiSvgIcon-root':{
                color:theme.grayColor[0],
                cursor:'pointer',
            },
            
            
        },
    },
    checkIcon:{
        cursor:'pointer',
        
    },
    updateIcon:{
        color:theme.whiteColor,
        
    },
});

  
export default tableRowItemCustomStyle;  