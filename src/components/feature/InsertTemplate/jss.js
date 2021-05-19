const insertTemplateStyle = (theme) => ({
    container: {
        flexGrow: 1,
        margin:"0px",
        '& .MuiFormControl-root': {
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1),
        },
        
        '& .MuiInputLabel-outlined':{
            //color:theme.primaryColor[2],
            marginLeft:'30px',

        }
    },
    
    searchControl:{
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
        background:theme.whiteColor,
        // marginTop:"30px",
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',

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
        //color:theme.primaryColor[1],
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
        minHeight:'100px',
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
            minHeight:'100px',
            width:'36vw',
            //border:`1px solid ${theme.primaryColor[0]}`,
        },
        '& .MuiInputLabel-outlined':{
            marginLeft:'1px',
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
    inputCombobox:{
        height:'35px',
        width:'36vw',
        marginLeft:'30px',
        marginTop:'10px',
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        color:theme.blackColor,

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
            //border:`1px solid ${theme.primaryColor[0]}`,
        },
        '& .MuiInputLabel-outlined':{
            marginLeft:'10px',
        }

    },
    insertButton:{
       
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

    },
    itemSelect:{
        marginTop:'15px',
        '& .MuiInputLabel-formControl':{
            marginLeft:'40px',
        },
    },
    itemSmall:{
        display:'flex',
        flexDirection:'row',
        marginTop:'25px',
    },
    input:{
        marginTop:'10px',
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

    }

});

  
export default insertTemplateStyle;  