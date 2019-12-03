export const wsConnect = (host, name) => ({ type: 'WS_CONNECT', host, name });
export const wsConnecting = host => ({ type: 'WS_CONNECTING', host });
export const wsConnected = host => ({ type: 'WS_CONNECTED', host });
export const wsDisconnect = host => ({ type: 'WS_DISCONNECT', host });
export const wsDisconnected = host => ({ type: 'WS_DISCONNECTED', host });
export const send = message => ({ type: 'SEND', message });
export const get = () => ({ type: 'GET' });
export const save = message => ({ type: 'SAVE', message });
const websocketInitialState = {};
const messageInitState = [];

export const websocketReducer = (state = { ...websocketInitialState }, action) => {
      switch (action.type) {
            case 'WS_CONNECTED':
                  return { ...state, connected: true };
            default:
                  return state;
      }
};

export const getMessages = (state = messageInitState , action) => {
      console.log("save: ", action);
      switch (action.type) {
            case 'SAVE':
                  return [...state, action.message];
            case 'GET':
                  return state;
            default:
                  return state;
      }
};