import { combineReducers } from 'redux';
import { gameReducer,catchError } from './actions';
import { websocketReducer, getMessages, arrangeClients } from './webSocket'

const rootReducer = combineReducers({
      websocket: websocketReducer,
      messages: getMessages,
      clients: arrangeClients,
      user: gameReducer,
      Error: catchError
});

export default rootReducer;