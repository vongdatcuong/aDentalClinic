import React, { createContext, useReducer } from "react";
import lightTheme from "../themes/lightTheme";
import darkTheme from "../themes/darkTheme";

// Utils
import ThemeType from '../utils/types/Theme';

// @material-ui/core
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const initState = {
  theme: lightTheme
};
const themeStore = createContext(initState);
const { Provider } = themeStore;

const ThemeStateProvider = ({ children }) => {
  const [themeState, dispatchTheme] = useReducer((state, action) => {
    switch (action.type) {
      case "Set-Theme":
        switch(action.theme){
          case ThemeType.LIGHT:
            return {theme: lightTheme};
          case ThemeType.DARK:
            return {theme: darkTheme}
        }
      default:
        throw new Error();
    }
  }, initState);
  return <Provider value={{ themeState, dispatchTheme }}>
          <ThemeProvider theme={createMuiTheme(themeState? themeState.theme : lightTheme)}>
            {children}
          </ThemeProvider>
        </Provider>;
};

export { themeStore, ThemeStateProvider };