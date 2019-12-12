import Config from '../Config';
import {wsConnect} from './webSocket';

export const logIn = json => ({ type: 'LOGIN', data: json });
export const exit = () => ({ type: 'LOGOUT' });
export const firErr = err => ({ type: 'ERROR', err });
export const visit = json => ({ type: 'VISIT', guider:json });
export const makeMove = move => ({ type: 'MAKE_MOVE', move });
export const updateGamePlayer = player => ({ type: 'UPDATE_GAME_PLAYER', player });


export const signIn = login => dispatch => fetch(`${Config.api_url}account/login`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
            'Content-Type': 'application/json',

      },
      body: JSON.stringify(login)
})
      .then(res => res.json(), error => {
            console.log('An error occurred.', error);
            throw new Error(error);
            
      })
      .then((json) => {
            dispatch({ type: 'LOGIN', data: json });
      }).catch(err => {
            dispatch({type: 'ERROR', err: 'User name or password is wrong'});
      });

export const logOut = () => dispatch => fetch(`${Config.api_url}account/logout`, {
      method: "GET",
      mode: "cors",
      credentials: "include",
})
      .then(res => res.json(), error => {
            console.log('An error occurred.', error);
            //throw new Error(error);
      })
      .then(() => {
            dispatch({ type: 'LOGOUT' });
      });




const gameInitialState = {
      userName: "",
      role: "",
      id: 0,
      logedIn: false,
      avatar: ""
};

const intialError = {
      msg: "nothing",
      flag: false
};
const initGuider = {
      guiderId: 0,
      guiderName: "",
      guiderAvatar: ""      
}




export const catchError = (state = { ...intialError }, action) => {
      switch (action.type) {
            case 'ERROR':
                  return {
                        msg: action.err,
                        flag: true
                  };
            
            default:
                  return state;
      }
};

export const gameReducer = (state = { ...gameInitialState }, action) => {
      switch (action.type) {
            case 'LOGIN':
                  console.log(action.data);
                  return {
                        userName: action.data.userName,
                        role: action.data.role,
                        id: action.data.id,
                        logedIn: true,
                        avatar: ""

                  };
            case 'LOGOUT':
                  return gameInitialState ;
            
            default:
                  return state;
      }
};