import React, { Component } from "react";
import Chatbox from "./Chatbox";
import ProfileGuiders from "./ProfileGuiders";
import Home from "./Home";
import ProfileTravaller from './ProfileTraveller';
import GuiderAllPost from './GuiderAllPost';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {BrowserRouter} from "react-router-dom";
import Navbar from './Navbar';
import Footer from './Footer';
import Logged from './Logged';
import PostDetail from './PostDetail';
import Tour from './Tour';
import PostTourDetail from './PostTourDetail';
import Pay from './Pay';
import TravellerManager from './TravellerManager';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: "Guest",
			role: "GUEST",
			id: 0,
			logedIn: false
		};
	
	}

	reload = (user) => {
		if (typeof (Storage) !== 'undefined') {
			if (user.id === 0) window.sessionStorage.clear();
			else window.sessionStorage.setItem('user', JSON.stringify(user));
		} else {
			alert('Browser not support!');
		}
		this.setState({
			logedIn: !this.state.logedIn,
			userName: user.userName,
			role: user.role,
			id: user.id
		});
	}

	componentDidMount() {
		if (typeof (Storage) !== 'undefined') {
			// get sessionStorage
			let user = window.sessionStorage.getItem('user');
			if (user !== null) this.reload(JSON.parse(user));
		} else {
			alert('Browser not support!');
		}
	}


	render() {
		let present = this.state.logedIn ? <Logged reload={this.reload} /> : <Navbar reload={this.reload} />;


		return (
			<div>
				{present}
				<Switch>
				<Route path='/' component={Home} exact />
				<Route path='/guider/:guider_id' component={GuiderAllPost} exact />
				<Route path='/post/:post_id' component={PostDetail} exact />
				<Route exact path='/chatbox/:post_id' component={Chatbox} />
				<Route exact path='/chatbox/:post_id/:message' component={Chatbox} />
				<Route path='/profileguiders' component={ProfileGuiders} />
				<Route path='/tour' component={Tour} />
				<Route path='/profiletraveller' component={ProfileTravaller} />
				<Route path='/tour/:id' component={PostTourDetail} exact />
				<Route path='/posttour/:id/:type' component={PostTourDetail} />
				<Route path='/book' component={Pay} />
				<Route path='/tvlManager' component={TravellerManager} />
				<Route exact path={"/edit"}>
					<BrowserRouter>
						<GuiderAllPost guiderId={this.state.id} />
					</BrowserRouter>
				</Route>

				</Switch>
				<Footer />
			</div>

		);
	}
}
export default App;
