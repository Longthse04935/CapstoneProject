import React, { Component } from "react";
import Chatbox from "./Chatbox";
import EditPost from "./EditPost";
import ProfileGuiders from "./ProfileGuiders";
import Tour from "./Tour";
import ProfileTravaller from './ProfileTraveller';
import Home from './Home';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navbar from './Navbar';
import Footer from './Footer';
import Logged from './Logged';
class App extends Component {
  render() {
    return (
        <Router>
        <div>
        {/* <Logged /> */}
        <Navbar />
          <Switch>
              <Route exact path='/chatbox' component={Chatbox} />
              <Route path='/editpost' component={EditPost} />
              <Route path='/profileguiders' component={ProfileGuiders} >
              </Route>
              <Route path='/tour' component={Tour} />
              <Route path='/profiletraveller' component={ProfileTravaller} />
              <Route path={"/"}><Home guiderId={4} /></Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
