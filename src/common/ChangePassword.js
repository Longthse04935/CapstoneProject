import React from 'react';
import $ from "jquery";
import Config from '../Config'
class ChatList extends React.Component {
      constructor(props) {
            super(props);
      }
      componentDidMount() {
            $("head").append('<link href="/css/editPost.css" rel="stylesheet"/>');
      }

      render() {
            let user = this.props.name;
            let password = null;
            let repassword = null;
            let newpassword = null;
            return (<div className="changePassword" style={{}}>

                  <form onSubmit={async  (e) => {
                        e.preventDefault();
                        if (!password.value.trim()) {
                              return;
                        }
                        if (!repassword.value.trim()) {
                              return;
                        }
                        if (!newpassword.value.trim()) {
                              return;
                        }

                        if(password.value.trim() !== repassword.value.trim()) {
                              return;
                        }
                        let acc = {
                              password: password.value.trim(),
                              repassword: newpassword.value.trim()
                        };
                        try {
                              let response = await fetch(Config.api_url+"account/change",
                                  {
                                      method: "POST",
                                      mode: "cors",
                                      credentials: "include",
                                      headers: {
                                          'Content-Type': 'application/json'
                                      },
                                      body: JSON.stringify(acc)
                                  }
                              );
                              if (!response.ok) { throw Error(response.status + ": " + response.statusText); }
                              console.log("change password: "+ await response.text());
                              
                              if (!response.ok) { throw Error(response.status + ": " + response.statusText); }
                          } catch (err) {
                              console.log(err);
                          }
                  }}>
                  <br/>Old password: <input ref={node => { password = node; }}  type="password"/>
                  <br/>Confirm old password: <input ref={node => { repassword = node; }}  type="password"/>
                  <br/>New password: <input ref={node => { newpassword = node; }}  type="password"/>
                  <br/><button type="submit" className="text">Change</button>

                  </form>
            </div>);
      }
}

export default (ChatList);
