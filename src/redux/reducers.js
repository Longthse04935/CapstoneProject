import { combineReducers } from 'redux';
import { ROLE, LOGIN, LOGOUT } from './actions';
import { websocketReducer, getMessages } from './webSocket'

const rootReducer = combineReducers({
      websocket: websocketReducer,
      messages: getMessages
});

export default rootReducer;