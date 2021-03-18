const toothStyle = (theme) => ({
    selectedTooth: {

        "& svg": {
            backgroundColor: "red",
            "&:after": {
                content:'+',
                display: "inline-block",
                verticalAlign: "top",
                // line-height: 1em;
                // width: 1em;
                // height:1em;
                // margin-right: 0.3em;
                textAlign: "center",
                color: "red",
            }
        }
    }
  });
  
  export default toothStyle;
  