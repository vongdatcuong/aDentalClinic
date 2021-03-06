const procedureStyle = (theme) => ({
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
    itemCode:{
        width: 100,
        fontWeight:"bold"
    },
    itemFee:{
        width: 100,
        fontWeight:"bold"
    },
    itemINS:{
        width: 100,
        fontWeight:"bold"
    },
    itemDuration:{
        width: 90,
        fontWeight:"bold"
    },
    itemType:{
        width: 70,
        fontWeight:"bold"
    },
    itemABBR:{
        width: 70,
        fontWeight:"bold"
    },
    itemDescription:{
        width: 200,
        fontWeight:"bold"
    },
    itemIndexContent:{
        width: 50,
    },
    itemCodeContent:{
        width: 100,
    },
    itemFeeContent:{
        width: 100,
    },
    itemINSContent:{
        width: 100,
    },
    itemDurationContent:{
        width: 90,
    },
    itemTypeContent:{
        width: 70,
    },
    itemABBRContent:{
        width: 70,
    },
    itemDescriptionContent:{
        width: 200,
    },
});
  
export default procedureStyle;  