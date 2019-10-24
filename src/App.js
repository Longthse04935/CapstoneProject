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
import Cookies from 'js-cookie'

class App extends Component {
	constructor(props) {
		super(props);
		this.state={logedIn: false};
		
	  }

	reload = () => {
		this.setState({logedIn: !this.state.logedIn});
	}

	sample = () => {
		return 1+1;
	}

	render() {
	
		let present = this.state.logedIn ?  <Logged reload={this.reload}/>:<Navbar reload={this.reload}/>;
		
		
		return (
			<div>


				{present}
				<Router>



					{/* <Switch>
              <Route exact path='/chatbox' component={Chatbox} />
              <Route path='/editpost' component={EditPost} />
              <Route path='/profileguiders' component={ProfileGuiders} />
              <Route path='/tour' component={Tour} />
              <Route path='/profiletraveller' component={ProfileTravaller} />
              <Route exact path={"/"}><Home guiderId={4} /></Route>
          </Switch> */}


				</Router>
				<Footer />
			</div>
		);
	}
}

export default App;
