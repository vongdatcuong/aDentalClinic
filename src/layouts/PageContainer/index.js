import React from "react";
import { makeStyles  } from "@material-ui/core/styles";

// Material UI Core

const useStyles = makeStyles((theme) => ({
    container: {
        padding: 0,
        margin: 0,
        display: 'flex',
    }
}))

const PageContainer = ({children}) => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            {children}
        </div>
    );
}

export default PageContainer;
