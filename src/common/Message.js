import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ChatList from "./ChatStore";
class Message extends React.Component {
      constructor(props) {
            super(props);
            this.state = {
                  sender: ""
            }
      }

      load = (eve) => {
            eve.preventDefault();
            //console.log(eve.target);
            this.setState({ sender: eve.target.id });
      }

      render() {
            //let messages = this.props.getState().messages;
            //console.log(this.props);
            return (
                  <div className="ChatRoom" style={{ height: "800px" }}>
                        <div className="chat_window" style={{ height: "800px" }}>
                              <div className="plan" style={{ height: "800px", width: "300px", left:"-300px" }}>
                                    <div className="planContent">
                                          <h1>Chat</h1>
                                          <div style={{ marginBottom: "30px" }} />
                                          {
                                                this.props.clients.map((value, index) => (
                                                      <a key={index} onClick={this.load} >
                                                            <div className="detail" id={value}>
                                                                  {value}
                                                            </div></a>
                                                ))
                                          }

                                    </div>
                              </div>
                              <ChatList name={this.props.name} receiver={this.state.sender}
                                    messages={this.props.messages.filter(mess => mess.receiver = this.state.sender)} />
                        </div>
                  </div>);
      }
}

export default connect()(Message);
