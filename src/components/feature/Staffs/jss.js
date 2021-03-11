const staffStyle = (theme) => ({
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
        height:"70px",
        marginTop:"20px",
        cursor:'pointer',

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
        height:20,
        width:150,
        '& .MuiOutlinedInput-input': {
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1),
        }
    },
});
  
export default staffStyle;  