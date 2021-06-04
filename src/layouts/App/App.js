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

// Material UI Datepicker
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

// Context
import { LoadingStateProvider } from '../../contexts/loading-context';
import { themeStore, ThemeStateProvider } from '../../contexts/theme-context';
import { SocketStateProvider } from '../../contexts/socket-context';

// Components
import Loading from '../Loading';
const BodyComponent = () => {
  const {themeState} = useContext(themeStore);
  return (
    <div
      style={{
        height: "100%",
        backgroundColor: themeState.theme.pageBackgroundColor,
      }}
    >
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
        <Routes />
      </Router>
    </div>
  );
}
const App = () => {
  return (
    <ThemeStateProvider> {/* ==> Theme Context Provider */}
        <LoadingStateProvider>
          <SocketStateProvider>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <BodyComponent/>
            </MuiPickersUtilsProvider>
          </SocketStateProvider>
        </LoadingStateProvider>
    </ThemeStateProvider>
  );
}

export default App;
