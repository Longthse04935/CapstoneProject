import React, { Component } from "react";
import Chatbox from "./Chatbox";
import EditPost from "./EditPost";
import ProfileGuiders from "./ProfileGuiders";
import Tour from "./Tour";
import ProfileTravaller from './ProfileTraveller';
import GuiderAllPost from './GuiderAllPost';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navbar from './Navbar';
import Footer from './Footer';
import Logged from './Logged';
import Home from './Home';
import PostTourDetail from './PostTourDetail';
class App extends Component {
  render() {
    return (
        <Router>
        <div>
        <Logged />
        {/* <Navbar /> */}
          <Switch>
              <Route exact path='/chatbox' component={Chatbox} />
              <Route path='/editpost' component={EditPost} />
              <Route path='/profileguiders' component={ProfileGuiders} />
              <Route path='/tour' component={Tour} />
              <Route path='/profiletraveller' component={ProfileTravaller} />
              <Route path='/Home' component={Home} />
              <Route path='/posttour/:id/:type' component={PostTourDetail} />
              <Route path='/' ><GuiderAllPost guiderId={4} /></Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
