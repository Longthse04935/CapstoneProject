import { combineReducers } from 'redux';
import { gameReducer } from './actions';
import { websocketReducer, getMessages, arrangeClients } from './webSocket'

const rootReducer = combineReducers({
      websocket: websocketReducer,
      messages: getMessages,
      clients: arrangeClients,
      user: gameReducer
});

export default rootReducer;