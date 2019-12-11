import Config from '../Config';
import {wsConnect} from './webSocket';

export const logIn = json => ({ type: 'LOGIN', data: json });
export const exit = () => ({ type: 'LOGOUT' });
export const startRound = () => ({ type: 'START_ROUND' });
export const updateTimer = time => ({ type: 'UPDATE_TIMER', time });
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
            //throw new Error(error);
      })
      .then((json) => {
            dispatch({ type: 'LOGIN', data: json });
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
                  return { gameInitialState };
            case 'UPDATE_TIMER':
                  return { ...state, time: action.time };
            case 'UPDATE_GAME_PLAYER':
                  return { ...state, gamePlayer: action.player };
            default:
                  return state;
      }
};