import logo from '../../assets/images/logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import Routes from '../../routes';

// Material UI Core
//import CssBaseline from "@material-ui/core/CssBaseline";

// Context
import { LoadingStateProvider } from '../../contexts/loading-context';

// Components
//import Loading from '../Loading';

const App = () => {
  return (
    <LoadingStateProvider>
      {/*<CssBaseline />*/}
      {/*<Loading />*/}
      <Router>
        <Routes/>
      </Router>
    </LoadingStateProvider>
  );
}

export default App;
