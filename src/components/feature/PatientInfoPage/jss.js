const style = (theme) => ({
   container: {
    background: theme.pageBackgroundColor,
    color: theme.textColor,
        flexGrow: 1,
        margin:"0px",
        justifyContent:'center',
        alignItems:'center',
        '& .MuiFormControl-root': {
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1),
        },
        
        '& .MuiInputLabel-outlined':{
            color:theme.primaryColor[2],
            marginLeft:'30px',

        },
    },
    containerContent: {
        flexGrow: 1,
        margin:"0px",
        '& .MuiFormControl-root': {
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1),
        },
        
        '& .MuiInputLabel-outlined':{
            color:theme.primaryColor[2],
            marginLeft:'30px',

        },
        boxShadow:'3px 3px 3px gray',
        borderRadius:'15px'
    },
    searchControl:{
        color: theme.textColor,
        height:40,
        width:200,
        '& .MuiOutlinedInput-input': {
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1),
        }
    },
    serviceControl:{
        display:'flex',
        flexDirection:'row',

    },
    iconButton:{
        cursor:'pointer',
        
    },
    title:{
        marginLeft:"30px",

    },
    titleColumn:{
        fontWeight:'bold',
    },
    content:{
        background:theme.pageBackgroundColor,
        color: theme.textColor,
        // marginTop:"30px",
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        paddingBottom:theme.spacing(10),
    },
    
    logo:{
        width:'150px',
        height:'150px',

    },
    leftContent:{
        //color:theme.primaryColor[0],
        // borderRight:'1px solid blue',

    },
    rightContent:{
        // display:'flex',
        // flexDirection:'column',
        // justifyContent:'center',
        // alignItems:'center',
        //marginLeft:'20px',
    },
    rightContentTitle:{
        color:theme.primaryColor[1],
        marginLeft:'20px',
    },
    rightContentText:{
        fontStyle:'italic',
        textAlign: 'justify',
        marginLeft:'20px',
        marginRight:'20px',
        marginTop:'10px',
    },
    inputControl:{
        height:'35px',
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
            width:'1.6em',
            height:'1.6em',

        },
        '& .MuiInputBase-root':{
            height:'35px',
            width:'36vw',
            //border:`1px solid ${theme.primaryColor[0]}`,
            //color:theme.primaryColor[2],
        },
        '& .MuiInputLabel-outlined':{
            marginLeft:'10px',
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
    inputControlBig:{
        minHeight:'98px',
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
            width:'1.6em',
            height:'1.6em',

        },
        '& .MuiInputBase-root':{
            minHeight:'98px',
            width:'36vw',
            //border:`1px solid ${theme.primaryColor[0]}`,
        },
        '& .MuiInputLabel-outlined':{
            // marginLeft:'10px',
        },
       
        
    

    },
    inputControlOutline:{
        height:'35px',
        width:'36vw',
        marginLeft:'30px',
        marginTop:'15px',
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
            width:'1.6em',
            height:'1.6em',

        },
        '& .MuiInputBase-root':{
            height:'35px',
            width:'36vw',
            //border:`1px solid ${theme.primaryColor[0]}`,
        },
        '& .MuiInputLabel-outlined':{
            // marginBottom:'15px',
            // transform:'translate(14px, 18px) scale(1)',
        },
        
        
    

    },
    inputControlSmall:{
        height:'35px',
        width:'10.2vw',
        marginLeft:'30px',
        marginTop:'10px',
        display:'flex',
        flexDirection:'row',
        // border:`1px solid ${theme.primaryColor[0]}`,
        color:theme.primaryColor[3],
        '& .MuiInputBase-root':{
            width:'10.2vw',

        },
        '& .MuiOutlinedInput-input': {
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1),
        },
        '& .MuiSvgIcon-root': {
            paddingBottom: '15px',
            width:'1.6em',
            height:'1.6em',

        },
        '& .MuiInputBase-root':{
            height:'35px',
            width:'36vw',
            border:`1px solid ${theme.primaryColor[0]}`,
        },
        '& .MuiInputLabel-outlined':{
            marginLeft:'10px',
        }

    },
    updateButton:{
       
        height:'35px',
        width:'30vw',
        marginLeft:"30px",
        marginTop:'40px',
    },
    editButton:{
       
        height:'35px',
        width:'30vw',
        marginLeft:"30px",
        marginTop:'40px',
    },
    titleDivider: {
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(2),
        marginBottom: theme.spacing(1.5)
    },
    inputTitle:{
        marginLeft:'30px',
        fontSize:'18px',
        color:theme.primaryColor[2],

    },
    item:{
        marginTop:'15px',
        '& .MuiInputLabel-formControl':{
            marginLeft:'40px',
        }
    },
    itemSelect:{
        marginTop:'15px',
        '& .MuiInputLabel-animated':{
            marginLeft:'30px',
            marginTop:'10px',
        }
    },
    itemOutline:{
        marginTop:'20px',
        "& .MuiInputLabel-formControl":{
            marginLeft:'20px',
        },
    },
    itemSmall:{
        display:'flex',
        flexDirection:'row',
        marginTop:'20px',
    },
    input:{
        marginTop:'10px',
        display:'flex',
        justifyContent:'center',
    },
    editInfo: {
        "& $fieldset": {
            borderColor: theme.textColor + "!important",
        },
        "& .MuiOutlinedInput-root": {
            color: theme.textColor,
        },
        "& .MuiFormLabel-root": {
            color: theme.textColor,
        },
    },
    disabledEdit: {
        "& $fieldset": {
            borderColor: theme.inputDisabledColor + "!important",
        },
        "& .MuiOutlinedInput-root": {
            color: theme.inputDisabledColor,
        },
        "& .MuiFormLabel-root": {
            color: theme.inputDisabledColor,
        },
        "& .MuiCheckbox-colorPrimary.Mui-disabled": {
            color: theme.inputDisabledColor,
        },
        "& .MuiTypography-root": {
            color: theme.inputDisabledColor,
        },
        "& .MuiSelect-root": {
            color: theme.inputDisabledColor,
        },
        "& .MuiInputBase-root": {
            borderColor: theme.inputDisabledColor,
        }

    },
    checkbox:{
        marginLeft:'30px',

    },
    avatar:{
        width:'150px',
        height:'150px',
        cursor:'pointer',
        border:`1px solid ${theme.whiteColor}`,
        borderRadius:'75px',

    },
    inputAvatar:{
        marginTop:'20px',
        

    },
    inputAvatarDisplay:{
        display:'none',

    },
    status:{
        marginLeft:'30px',
        marginRight:'10px',
        marginTop:'20px',
        minWidth:'16vw',
        border:`1px solid ${theme.grayColor[0]}`,
        borderRadius:'5px',
        '& .MuiSelect-select':{
            backgroundColor:'inherit',
            paddingLeft:'10px',
        },
        color: theme.textColor,
        '& .MuiSelect-select':{
            backgroundColor:'inherit',
        },
        '& .MuiSelect-icon':{
            color: theme.textColor,
        },
    },

});

  
export default style;  