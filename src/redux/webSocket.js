

export const wsConnect = (host, name) => ({ type: 'WS_CONNECT', host, name });
export const wsConnecting = host => ({ type: 'WS_CONNECTING', host });
export const wsConnected = host => ({ type: 'WS_CONNECTED', host });
export const wsDisconnect = host => ({ type: 'WS_DISCONNECT', host });
export const wsDisconnected = host => ({ type: 'WS_DISCONNECTED', host });
export const send = message => ({ type: 'SEND', message });
export const get = () => ({ type: 'GET' });
export const save = message => ({ type: 'SAVE', message });
export const loadGuest = () => ({ type: 'LOAD' });
export const arrange = user => ({ type: 'ARRANGE', user });
export const clear = () => ({ type: 'CLEAR' });
const websocketInitialState = {};
const messageInitState = [];
const clients = [];



export const websocketReducer = (state = { ...websocketInitialState }, action) => {
      switch (action.type) {
            case 'WS_CONNECTED':
                  console.log("test connect");
                  return { ...state, connected: true };
            case 'WS_DISCONNECTED':
                  console.log("test disconnect");
                  clear();
                  return { state, connected: false };
            default:
                  return state;
      }
};

export const getMessages = (state = messageInitState, action) => {
      //console.log("save: ", action);
      switch (action.type) {
            case 'SAVE':

                  return [...state, action.message];
            case 'GET':

                  return state;
            default:
                  return state;
      }
};

export const arrangeClients = (state = clients, action) => {
      switch (action.type) {
            case 'ARRANGE':
                  let queue = Object.assign([], state);
                  if (queue.indexOf(action.message.user) >= 0) {
                        queue.splice(queue.indexOf(action.message.user), 1);
                        queue.unshift(action.message.user);
                  } else {
                        queue.unshift(action.message.user);
                  }
                  return queue;
            case 'GET':

                  return state;
            default:
                  return state;
      }
}