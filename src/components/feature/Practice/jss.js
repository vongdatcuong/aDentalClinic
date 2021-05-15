const practiceStyle=(theme)=>({
    container: {
        flexGrow: 1,
        margin:"0px",
        
    },
    content:{
        // background:theme.whiteColor,
        marginTop:"30px",
        display:'flex',
        flexDirection:'column',
        // alignItems:'center',
        // justifyContent:'center',
    },
    title:{
        marginLeft:"30px",
        
    },
    titleDivider: {
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(2),
        marginBottom: theme.spacing(1.5)
    },
    logo:{
        width:'150px',
        height:'150px',
        marginLeft:'40vw',
        marginTop:'30px',
    },
    leftContent:{
        color:theme.primaryColor[0],
        borderRight:'1px solid blue',
        
    },
    rightContent:{
        display:'flex',
        flexDirection:'column',
        // justifyContent:'center',
        // alignItems:'center',
        // marginLeft:'10px',
    },
    rightContentTitle:{
        color:theme.primaryColor[0],
        marginLeft:'20px',
    },
    rightContentText:{
        fontStyle:'italic',
        textAlign: 'justify',
        marginLeft:'20px',
        marginRight:'20px',
        marginTop:'10px',
    },        
    saveButton:{
        height:'35px',
        width:'36vw',
        marginLeft:"30px",
        marginTop:'20px',    
    },
    item:{
        marginTop:'15px',
        justifyContent:'center',
        alignItems:'center',
        '& .MuiFormLabel-root.Mui-disabled':{
            color:theme.grayColor[0],
        },
        '& .MuiFormLabel-root':{
            paddingBottom:'20px',
            marginRight:'20px',
        },
        '& .MuiInputLabel-outlined.MuiInputLabel-shrink':{
            transform: 'translate(15px, -6px) scale(0.75)',
        }
        
    },
    inputControl:{
        height:'40px',
        width:'35vw',
        marginLeft:'30px',
        marginTop:'10px',
        // display:'flex',
        // flexDirection:'row',
        // border:`1px solid ${theme.primaryColor[0]}`,
        //color:theme.primaryColor[2],
        '& .MuiOutlinedInput-input': {
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1),
        },
        '& .MuiSvgIcon-root': {
            paddingBottom: '15px',
            // paddingTop:'7px',
            width:'1.6em',
            height:'1.6em',

        },
        '& .MuiInputBase-root':{
            height:'60px',
            width:'36vw',
            
            //border:`1px solid ${theme.primaryColor[0]}`,
        },
        '& .MuiInputLabel-outlined':{
            marginLeft:'10px',
            marginTop:'-7px',
        },
        '& .MuiInputBase-input.Mui-disabled':{
            color:theme.grayColor[0],
        },
        
        // '& .MuiOutlinedInput-root': {
        //     '& fieldset': {
        //         borderColor: theme.primaryColor[0],
        //     },
        //     '&:hover fieldset': {
        //         borderColor: theme.primaryColor[0],
        //     },
        //     '&.Mui-focused fieldset': {
        //         borderColor: theme.primaryColor[0],
        //     },
        // },
        
    

    },
    inputControlSmall:{
        height:'50px',
        width:'15.5vw',
        marginLeft:'30px',
        marginTop:'10px',
        // display:'flex',
        // flexDirection:'row',
        // border:`1px solid ${theme.primaryColor[0]}`,
        //color:theme.primaryColor[2],
        '& .MuiOutlinedInput-input': {
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1),
        },
        '& .MuiSvgIcon-root': {
            padding: '7px',
            width:'1.6em',
            height:'1.6em',
        },
        '& .MuiInputBase-root':{
            height:'60px',
            width:'17.1vw',
            border:`1px solid ${theme.grayColor[0]}`,
            borderRadius:'3px',
        },
        '& .MuiInputLabel-outlined':{
            marginLeft:'10px',
            marginTop:'-7px',
        },
        '& .MuiInputBase-input.Mui-disabled':{
            color:theme.grayColor[0],
        },
        '& .MuiInputBase-input':{
            marginLeft:'20px',
        },
        '& .MuiButtonBase-root':{
            marginTop:'10px',
            
        },
        '& .MuiInputLabel-formControl':{
            marginLeft:'10x',
            
        },
        
        // '& .MuiOutlinedInput-root': {
        //     '& fieldset': {
        //         borderColor: theme.primaryColor[0],
        //     },
        //     '&:hover fieldset': {
        //         borderColor: theme.primaryColor[0],
        //     },
        //     '&.Mui-focused fieldset': {
        //         borderColor: theme.primaryColor[0],
        //     },
        // },
        
    

    },
    inputDate:{
        flexDirection:'row',
        justifyContent:'space-around',
        // alignItems:'space-between',

        width:'36vw',
    },
    status:{
        marginLeft:'20px',
        marginRight:'10px',
        '& .MuiSelect-select':{
            backgroundColor:'inherit',
        },
    },
    information:{
        backgroundColor:theme.whiteColor,
        justifyContent:'center',
        alignItems:'center',
    },
    logoContainer:{
        justifyContent:'center',
        alignItems:'center',
    },
    errorText:{
        marginLeft:'30px',
    },
});
export default practiceStyle;  