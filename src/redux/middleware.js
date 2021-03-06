import * as actions from './webSocket';
import * as act from './actions';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const socketMiddleware = () => {
      let socket = null;
      const onOpen = (store, host) => (event) => {
            socket.subscribe('/user/queue/reply', onMessage(store));
            store.dispatch(actions.wsConnected(host));
      };

      const onClose = store => () => {
            console.log("test disconnect");
            store.dispatch(actions.wsDisconnected());
            //store.dispatch(act.logOut());
      };

      const onMessage = (store) => (msg) => {
            // console.log(msg.body);
            let user = store.getState().user;
            let payload = msg.body;
            console.log(payload);
            let json = JSON.parse(payload)
            if(JSON.parse(payload).type=="CHAT") {
                  store.dispatch(actions.save(json));
                  store.dispatch(actions.arrange(json.sender));
            } else {
                  store.dispatch(actions.announce(json));
                  store.dispatch(actions.unSeenNoti());
            }
            
      };

      return store => next => (action) => {
            console.log(socket);
            switch (action.type) {
                  case 'WS_CONNECT':
                        console.log("connect socket");
                        if (socket !== null) {
                              socket.disconnect(() => { console.log("close connection"); })
                        }

                        // connect to the remote host
                        //socket = new WebSocket(action.host);
                        socket = Stomp.over(new SockJS(action.host));
                        socket.heartbeat.outgoing = 10000;
                        socket.heartbeat.incoming = 10000;
                        socket.connect({ "user": action.name }, onOpen(store, action.host), onClose(store));
                        // websocket handlers
                        // socket.onmessage = onMessage(store);
                        // socket.onclose = onClose(store);
                        // socket.onopen = onOpen(store);


                        break;
                  case 'WS_DISCONNECT':
                        console.log("disconnect socket");
                        if (socket !== null) {
                              socket.disconnect(() => { console.log("close connection"); });
                        }
                        socket = null;
                        break;
                  case 'SEND':
                        console.log(socket);
                        socket.send("/app/chat.sendMessage", {}, JSON.stringify(action.message));
                        // action.message.id = "0";
                        // store.dispatch(actions.save(action.message));
                        break;
                  default:

                        return next(action);
            }
      };
};

export default socketMiddleware();