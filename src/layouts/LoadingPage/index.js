import React, {} from "react";
import { makeStyles,  } from "@material-ui/core/styles";

// icons
import LoadingPageIcon from '../../assets/images/loading-page-icon.gif';

const useStyles = makeStyles((theme) => ({
    loadingPageWrapper: {
        display: 'flex',
        justifyContent: 'center',
        height: '95vh',
        alignItems: 'center'
    },
}));

 const LoadingPage = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.loadingPageWrapper}>
            <img src={LoadingPageIcon}/>
        </div>
    );
}

export default LoadingPage;