import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ChatList from "./ChatStore";
import Config from '../Config'
class Message extends React.Component {
      constructor(props) {
            super(props);
            this.state = {
                  sender: ""
            }
      }

      async componentDidMount() {
            try {
                  let guests = await fetch(`${Config.api_url}messages/${this.props.user.userName}/0/10`, {
                        method:"POST",
                        mode: "cors",
                        credentials: "include",
                        headers: {
                              'Content-Type': 'application/json',

                        },
                  });
                  guests = guests.json();  
                  console.log(guests);    
            } catch(err) {
                  console.log(err);
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
                              <div className="plan" style={{ height: "800px", width: "300px", left: "-300px" }}>
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
                              <ChatList name={this.props.user.userName} receiver={this.state.sender}
                                    messages={this.props.messages} />
                              {/*    */}
                        </div>
                  </div>);
      }
}
function mapStateToProps(state) {
      //console.log(state);
      const messages = state.messages;
      const clients = state.clients;
      const user = state.user;
      return { messages, clients, user };
}
export default connect(mapStateToProps)(Message);
