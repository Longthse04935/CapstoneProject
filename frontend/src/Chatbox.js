import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './css/chatbox.css';
import io from "socket.io-client";

class Chatbox extends Component {
  constructor(props){
    super(props);
    this.state = {
        index:1,
        chatText: '',
        author:'Tran Hoang long',
        chatData: [
            {
                id: 1,
                message: 'Hello can i help you !:) ',
                type: 'you'
            },
        ],
    };
    // this.socket = io('localhost:3002');
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({chatText: e.target.value});
  }

  handleSend = async (e) => {
    e.stopPropagation();
    e.preventDefault();
  //   this.socket.emit('SEND_MESSAGE', {
  //     author: this.state.username,
  //     message: this.state.message
  // });
    let { chatData, chatText,index } = this.state;
    index ++;
    chatData.push({
        id: index,
        message: chatText,
        type: 'me'
    });
    this.setState({ chatData, chatText: '',index: index
 });
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }
  
  componentDidMount() {
    this.scrollToBottom();
  }
  
  componentDidUpdate() {
    this.scrollToBottom();
  }


  render() {
    const { chatData, chatText,author } = this.state;
    return (
      <div>
          <div className="chat_window">
              <div className="top_menu">
                  <div className="buttons">
                      <div className="button close"></div>
                      <div className="button minimize"></div>
                      <div className="button maximize"></div>
                  </div>
                  <div className="title">Chat</div>
              </div>
              <ul className="messages">
              {chatData.map((item) => (
                <li className={`message ${item.type === 'me' ? 'right' : 'left' } appeared`} key={item.id}>
                    <div className="avatar"></div>
                    <div className="text_wrapper">
                        {author}
                        <div className="text">{item.message}</div>
                    </div>
                    <div style={{ float:"left", clear: "both" }}
                        ref={(el) => { this.messagesEnd = el; }}>
                    </div>
                </li>
              ))}
              </ul>
              <div className="bottom_wrapper clearfix">
                    <form>
                        <div className="message_input_wrapper">
                            <input className="message_input" value={chatText} onChange={this.handleChange} placeholder="Type your message here..." />
                        </div>
                        <div className="send_message">
                            <div className="icon"></div>
                            <button className="text" onClick={this.handleSend} type="submit">Send</button>
                        </div>
                    </form>
              </div>
          </div>
          <div className="message_template">
              <li className="message">
                  <div className="avatar"></div>
                  <div className="text_wrapper">
                      <div className="text"></div>
                  </div>
              </li>
          </div>
      </div>
    );
  }
}

export default Chatbox;