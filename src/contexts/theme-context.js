import React, { createContext, useReducer } from "react";
import lightTheme from "../themes/lightTheme";
import darkTheme from "../themes/darkTheme";

// Utils
import ThemeType from '../utils/types/Theme';

// @material-ui/core
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const initState = {
  theme: lightTheme,
  type: ThemeType.LIGHT
};
const themeStore = createContext(initState);
const { Provider } = themeStore;

const ThemeStateProvider = ({ children }) => {
  const [themeState, dispatchTheme] = useReducer((state, action) => {
    switch (action.type) {
      case "Set-Theme":
        switch(parseInt(action.theme)){
          case ThemeType.LIGHT:
            return {theme: lightTheme, type: ThemeType.LIGHT};
          case ThemeType.DARK:
            return {theme: darkTheme, type: ThemeType.DARK};
        }
      default:
        return (themeState)? {...themeState} : {...initState};
        //throw new Error();
    }
  }, initState);
  return <Provider value={{ themeState, dispatchTheme }}>
          <ThemeProvider theme={createMuiTheme(themeState? themeState.theme : lightTheme)}>
            {children}
          </ThemeProvider>
        </Provider>;
};

export { themeStore, ThemeStateProvider };