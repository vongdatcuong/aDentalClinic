import React, {useContext} from "react";
import { makeStyles,  } from "@material-ui/core/styles";

// @icons
import loadingIcon from '../../assets/images/loading-icon.gif';

// Context
import { loadingStore } from "../../contexts/loading-context";

const useStyles = makeStyles((theme) => ({
    sweetLoading: {
        position: 'fixed',
        width: '100%',
        height: '100vh',
        backgroundColor: 'rgba(0, 0,0, 0.3)',
        textAlign: 'center',
        zIndex: theme.loadingZIndex,
    },
    loadingIconWrapper: {
        position: 'relative',
        '& img': {
            position: 'relative',
            top: '30%'
        }
    }
}));

 const Loading = (props) => {
    const classes = useStyles();
    const { loadingState, dispatchLoading } = useContext(loadingStore);
    return (
        <div className={classes.sweetLoading} style={{'display': (loadingState.isLoading)? 'block' : 'none'}}>
            <span className={classes.loadingIconWrapper}>
                <img src={loadingIcon} alt="Loading"/>
            </span>
        </div>
    );
}

export default Loading;