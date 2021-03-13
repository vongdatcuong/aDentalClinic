const practiceStyle = (theme) => ({
    container: {
        flexGrow: 1,
        margin:"0px"
    },
    menuBar:{
        background: theme.primaryColor[2],
        height:"150px"
    }, 
    menuItem:{
        background: theme.whiteColor,
        zIndex:"100",
        width:"100px",
        height:"70px",
        marginTop:"20px",
        cursor:'pointer'
    },
    menuItemImage:{
        marginTop:"5px",
        width:"50px",
        height:"40px",
    },
    itemIndex:{
        width: 50,
        fontWeight:"bold"
    },
    itemID:{
        width: 100,
        fontWeight:"bold"
    },
    itemFullname:{
        width: 400,
        fontWeight:"bold"
    },
    itemGender:{
        width: 80,
        fontWeight:"bold"
    },
    itemBirth:{
        width: 100,
        fontWeight:"bold"
    },
    itemAddress:{
        width: 500,
        fontWeight:"bold"
    },
    itemIndexContent:{
        width: 50,
    },
    itemIDContent:{
        width: 100,
    },
    itemFullnameContent:{
        width: 400,
    },
    itemGenderContent:{
        width: 80,
    },
    itemBirthContent:{
        width: 100,
    },
    itemAddressContent:{
        width: 500,
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
        marginTop:"30px",
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
        color:theme.primaryColor[0],
        borderRight:'1px solid blue',

    },
    rightContent:{
        // display:'flex',
        // flexDirection:'column',
        // justifyContent:'center',
        // alignItems:'center',
        //marginLeft:'20px',
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
    inputControl:{
        height:'35px',
        width:'150%',
        marginLeft:'30px',
        marginTop:'10px',
        display:'flex',
        flexDirection:'row',
        border:`1px solid ${theme.primaryColor[0]}`,
        color:theme.primaryColor[1],
        '& .MuiOutlinedInput-input': {
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1),
        },
        '& .MuiSvgIcon-root': {
            paddingBottom: '15px',
            width:'1.6em',
            height:'1.6em',

        }

    },
    saveButton:{
        // color:theme.whiteColor,
        // background:theme.primaryColor[0],
        // border:`1px solid ${theme.primaryColor[0]}`,
        // borderRadius:'3px',
        height:'35px',
        width:'72.5%',
        marginLeft:"30px",
        marginTop:'20px',

    },
    
});

  
export default practiceStyle;  