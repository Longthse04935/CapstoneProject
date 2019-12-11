import React from 'react';
import { connect } from 'react-redux';
import { send } from '../redux/webSocket';
class ChatList extends React.Component {
      constructor(props) {
            super(props);
      }

      render() {
            let input = null;
            let receiver = this.props.receiver;
            let user = this.props.name;
            //let messages = this.props.getState().messages;
            //console.log(this.props);
            return (<div className="ChatRoom" >
                  <div className="top_menu" >
                        <div className="title">Chat</div>
                  </div>
                  <ul className="messages" >
                        {this.props.messages.map((msg, index) => (
                              <li
                                    className={`message ${msg.user === user ? "right" : "left"} appeared`} key={index}>
                                    <div className="avatar"></div>
                                    <div className="text_wrapper">
                                          {msg.user}
                                          <div className="text">{msg.content}</div>
                                    </div>
                                    <div
                                          style={{ float: "left", clear: "both" }}
                                          ref={el => {
                                                //this.messagesEnd = el;
                                          }}
                                    ></div>
                              </li>
                        ))}
                  </ul>
                  <div className="bottom_wrapper clearfix" style={{ maxWidth:"700px"}}>
                        <form onSubmit={e => {
                              e.preventDefault();
                              if (!input.value.trim()) {
                                    return;
                              }
                              //console.log("send 2??");
                              let chatMessage = {
                                    user: user,
                                    content: input.value,
                                    receiver: receiver,
                                    dateReceived: Date.now()
                              };
                              this.props.dispatch(send(chatMessage));
                              input.value = '';
                        }}>
                              <div className="message_input_wrapper">
                                    <input ref={node => { input = node; }} className="message_input" placeholder="Type your message here..." />
                              </div>
                              <div className="send_message">
                                    <div className="icon"></div>
                                    <button type="submit" className="text">Send</button>
                              </div>
                              
                        </form>
                  </div>

            </div>);
      }
}

export default connect()(ChatList);
{/* style={{ position: "relative", top: "500px", left: "500px" }}
      <div className="top_menu">

<div className="title">Chat</div>
</div>
<ul className="messages">
{chatData.map(item => (
      <li
            className={`message ${
                  item.type === "me" ? "right" : "left"
                  } appeared`}
            key={item.id}
      >
            <div className="avatar"></div>
            <div className="text_wrapper">
                  {author}
                  <div className="text">{item.message}</div>
            </div>
            <div
                  style={{ float: "left", clear: "both" }}
                  ref={el => {
                        this.messagesEnd = el;
                  }}
            ></div>
      </li>
))}
</ul>
<div className="bottom_wrapper clearfix">
<form>
      <div className="message_input_wrapper">
            <input
                  className="message_input"
                  value={chatText}
                  onChange={this.handleChange}
                  placeholder="Type your message here..."
            />
      </div>
      <div className="send_message">
            <div className="icon"></div>
            <button
                  className="text"
                  onClick={this.handleSend}
                  type="submit"
            >
                  Send
</button>
      </div>
</form>
</div> */}