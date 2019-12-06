import { combineReducers } from 'redux';
import { ROLE, LOGIN, LOGOUT } from './actions';
import { websocketReducer, getMessages, arrangeClients } from './webSocket'

const rootReducer = combineReducers({
      websocket: websocketReducer,
      messages: getMessages,
      clients: arrangeClients
});

export default rootReducer;