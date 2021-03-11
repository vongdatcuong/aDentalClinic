import React, {
  useContext,
} from "react";
import logo from '../../assets/images/logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import Routes from '../../routes';

// Configs
import figures from '../../configs/figures';

// Toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Material UI Core
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

// Context
import { LoadingStateProvider } from '../../contexts/loading-context';
import { ThemeStateProvider } from '../../contexts/theme-context';

// Components
import Loading from '../Loading';

const App = () => {
  
  return (
    <ThemeStateProvider> {/* ==> Theme Context Provider */}
        <LoadingStateProvider>
          <CssBaseline />
          <Loading />
          <ToastContainer
            autoClose={figures.toastTimeout}
            hideProgressBar={true}
            newestOnTop={true}
            limit={figures.toastLimit}
            position={toast.POSITION.BOTTOM_RIGHT}
          />
          <Router>
            <Routes/>
          </Router>
        </LoadingStateProvider>
    </ThemeStateProvider>
  );
}

export default App;
