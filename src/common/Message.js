import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ChatList from "./ChatStore";
import Config from '../Config'
class Message extends React.Component {
      constructor(props) {
            super(props);
            this.state = {
                  client: ""
            }
      }

      async componentDidMount() {
      }

      load = (eve) => {
            eve.preventDefault();
            //console.log(eve.target);
            this.setState({ client: eve.target.id });
      }

      render() {
            //let messages = this.props.getState().messages;
            //console.log(this.props);
            return (
                  <div className="messageRoom">
                        <div className="chat_window">
                              <div className="plan">
                                    <div className="planContent">
                                          <h1>Chat</h1>
                                          <div style={{ marginBottom: "30px" }} />
                                          <ul style={{listStyleType: 'none', }}>
                                                {
                                                      this.props.clients.filter(client => client!==this.props.user.userName).map((value, index) => (
                                                            <li key={index} style={{height: '64px', position: 'relative', display: 'flex'}}>
                                                                  <a onClick={this.load}  style={{color: '#385898', cursor: 'pointer', width: '100%', paddingLeft:'8px',paddingRight:'8px', borderRadius:"8px"}}>
                                                                        <div className="detail" id={value}>
                                                                              {value}
                                                                        </div></a>
                                                            </li>
                                                      ))
                                                }
                                          </ul>
                                    </div>
                              </div>
                              <ChatList name={this.props.user.userName} receiver={this.state.client}
                                    messages={this.props.messages
                                          .filter(msg => this.props.user.role === 'GUIDER'
                                          ?( msg.guider === this.props.user.userName && msg.traveler === this.state.client)
                                          :( msg.guider === this.state.client && msg.traveler === this.props.user.userName))
                                    } />

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
