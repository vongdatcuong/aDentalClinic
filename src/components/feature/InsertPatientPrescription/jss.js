const insertPatientPrescriptionStyle = (theme) => ({
   container: {
    background: theme.pageBackgroundColor,
    color: theme.textColor,
        flexGrow: 1,
        margin:"0px",
        '& .MuiFormControl-root': {
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1),
        },
        
        '& .MuiInputLabel-outlined':{
            //color:theme.primaryColor[2],
            marginLeft:'30px',

        },
        borderRadius:'15px',
        boxShadow:'3px 3px 3px gray',
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
            marginLeft:'1px',
            marginBottom:'10px',
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
    inputControlDate:{
        height:'35px',
        width:'36vw',
        marginLeft:'30px',
        marginBottom:'20px',
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
            // paddingTop:'7px',
            width:'1.6em',
            height:'1.6em',
        },
        '& .MuiInputBase-root':{
            height:'35px',
            width:'36vw',
            border:`1px solid ${theme.grayColor[0]}`,
            borderRadius:'3px',
            
        },
        '& .MuiInputBase-input':{
            marginLeft:'15px',
            
        },
        '& .MuiInputLabel-outlined':{
            marginLeft:'1px',
        },
        '& .MuiInputBase-input.Mui-disabled':{
            color:theme.grayColor[0],
        },
        '& .MuiInputLabel-formControl':{
            // marginLeft:'15px',
            // marginTop:'10px',
        },
       
        
    

    },
    insertButton:{
       
        height:'35px',
        width:'30vw',
        marginLeft:"30px",
        marginTop:'40px',
        marginBottom:'30px',
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
            marginTop:'-5px',
        }
    },
    itemDate:{
        marginTop:'15px',
        '& .MuiInputLabel-formControl':{
            marginLeft:'10px',
        }
    },
    itemSelect:{
        marginTop:'35px',
        marginLeft:'30px',
        // border:`1px solid ${theme.primaryColor[0]}`,
        // minWidth:'100%'
        '& .MuiInputBase-root':{
            border:`1px solid ${theme.grayColor[0]}`,
            width:'36vw',
            borderRadius:'5px',
        },
        '& .MuiSelect-select':{
            paddingLeft:'15px',
        },
        '& .MuiInputLabel-formControl':{
            marginLeft:'10px',
        }
    },
    itemSmall:{
        display:'flex',
        flexDirection:'row',
        marginTop:'25px',
    },
    input:{
        marginTop:'10px',
        // display:'flex',
        // justifyContent:'center',
        // alignItems:'center'
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
    containerAddRecord:{
        display:'flex',
        justifyContent:'flex-end',
        marginRight:'30px',
        marginTop:'30px',
    },
    btnAddRecord: {

        color: theme.primaryColor[0],
        fontWeight: "bold",
        textTransform: "none",
    },
    menu:{
        minWidth:'36vw',
        // marginLeft:'30px',
        marginTop:'30px',
        border:'1px solid lightgray',
        borderRadius:'5px',
        '& .MuiInputLabel-formControl':{
            marginLeft:'15px',
            // marginTop:'10px',
        },
    },
    drugDialog:{
        minWidth:'90vw',
    }
});

  
export default insertPatientPrescriptionStyle;  