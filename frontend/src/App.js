import React, { Component } from "react";
import Chatbox from "./Chatbox";
import EditPost from "./EditPost";
import ProfileGuiders from "./ProfileGuiders";
import Tour from "./Tour";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
class App extends Component {
  render() {
    return (
        <Router>
        <div>
          <Switch>
              <Route exact path='/chatbox' component={Chatbox} />
              <Route path='/editpost' component={EditPost} />
              <Route path='/profileguiders' component={ProfileGuiders} />
              <Route path='/tour' component={Tour} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
