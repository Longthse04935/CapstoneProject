import React from 'react';
import { connect } from 'react-redux';
import { send } from './redux/webSocket';
class ChatList extends React.Component {
      constructor(props) {
		super(props);
      }
      
      render() {
            let input = null;
            let receiver = null;
            let user = this.props.name;
            //let messages = this.props.getState().messages;
            console.log(this.props);
            return (<div className="ChatRoom">
                  <form style={{position:"relative", top:"500px", left: "500px"}} onSubmit={e => {
                        e.preventDefault();
                        if (!input.value.trim()) {
                              return;
                        }
                        if (!receiver.value.trim()) {
                              return;
                        }     

                        let chatMessage = {
                              user: user,
                              content: input.value,
                              receiver: receiver.value,
                              dateReceived: Date.now()
                        };
                        this.props.dispatch(send(chatMessage));
                        input.value = '';
                  }}>
                        <input ref={node => {
                              input = node;
                        }}
                        />
                        <input ref={node => {
                              receiver = node;
                        }}
                        />
                        <button type="submit">Send</button>
                  </form>
                  {this.props.messages.map((msg, index) => (
                        <p key={index}>{`${msg.user}: ${msg.content}`}</p>
                  ))}
            </div>);
      }
}

export default connect()(ChatList);