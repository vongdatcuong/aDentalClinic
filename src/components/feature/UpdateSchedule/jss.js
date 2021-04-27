const updateScheduleStyle = (theme) => ({
    paper: {
        flexGrow: 1,
        margin:"0px",
        '& .MuiFormControl-root': {
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1),
        },
        
        '& .MuiInputLabel-outlined':{
            color:theme.primaryColor[2],
            marginLeft:'30px',

        }
    },
});

  
export default updateScheduleStyle;  