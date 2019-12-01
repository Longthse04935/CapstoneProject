import { combineReducers } from 'redux';
import {ROLE, LOGIN, LOGOUT} from './actions';
const init =  {
      user: {
            name: "guest",
            role: "GUEST",
            id: 0,
            loggedIn: false,
      },
      notification: [],
      chatMessage: []
}

const user  = (action, state = init.user) => {
      return Object.assign({}, state);
      // switch (action.type) {
      //       case LOGIN:
      //             return Object.assign({}, state);
      //       case LOGOUT:
      //             return Object.assign({}, state);
      // }
}
const signInApp = combineReducers({user});

export default signInApp;