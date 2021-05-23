import React, { createContext, useReducer } from "react";
import socketIOClient from "socket.io-client";

// API
import api from '../api/base-api';
import strings from "../configs/strings";

// Socket
import {
    forceDisconnect
  } from '../socket/base-socket';

const initState = {
  socket: null,
  isCheck: false,
};
const socketStore = createContext(initState);
const { Provider } = socketStore;

// Temporary socket
let socket = null;

const SocketStateProvider = ({ children }) => {
  const [socketState, dispatchSocket] = useReducer((state, action) => {
    switch (action.type) {
      case strings.connectSocket:
          if (!state.isCheck){
              if (!socket){
                socket = socketIOClient(api.SOCKET_URL, {
                    withCredentials: true,
                });
              }
              
              return {
                socket: socket,
                isCheck: true
              };
          } else {
              return state;
          }
        case strings.disconnectSocket:
            if (state.socket){
                forceDisconnect(state.socket);
                socket = null;
            }
            return {...initState};
      default:
        throw new Error();
    }
  }, initState);
  return <Provider value={{ socketState, dispatchSocket }}>{children}</Provider>;
};

export { socketStore, SocketStateProvider };