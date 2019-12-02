import React, { Component } from "react";
import Chatbox from "./Chatbox";
import ProfileGuiders from "./Guider/ProfileGuiders";
import Home from "./Home";
import ProfileTravaller from './Traveler/ProfileTraveller';
import GuiderAllPost from './Guider/GuiderAllPost';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Navbar from './Nav/Navbar';
import Footer from './Footer';
import LoggedTvl from './Nav/LoggedTvl';
import LoggedGuider from './Nav/LoggedGuider';
import PostDetail from './Guider/PostDetail';
import Tour from './Tour';
import PostTourDetail from './PostTourDetail';
import Pay from './Traveler/Pay';
import TravellerManager from './Traveler/TravellerManager';
import GuiderContract from './Guider/GuiderContract';
import Chart from './Guider/Chart';
import ManagePost from './Guider/ManagePost';
import AddPost from './Guider/AddPost';
import { connect } from 'react-redux';
import { logOut,logIn } from './redux/actions';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: "Guest",
			role: "GUEST",
			id: 0,
			logedIn: false,
			avartar: ""
		};

	}

	reload = (user) => {

		if (typeof (Storage) !== 'undefined') {
			if (user.id === 0) {
				
				window.sessionStorage.clear();
			}
			else {
			
				window.sessionStorage.setItem('user', JSON.stringify(user));
			}
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
		let present;
		let user = JSON.parse(window.sessionStorage.getItem('user'));
		if (this.state.logedIn) {
			if (user.role === 'TRAVELER') {
				present = <LoggedTvl reload={this.reload} />;
			}
			else {
				present = <LoggedGuider reload={this.reload} />;
			}
		} else {
			present = <Navbar reload={this.reload} />;
		}


		return (
			<div>
				{present}
				<Switch>
					<Route path='/' component={Home} exact />
					{/* <Route path='/guider/:guider_id' component={GuiderAllPost} exact /> */}
					<Route path='/post/:post_id' component={PostDetail} exact />
					<Route exact path='/chatbox/:post_id' component={Chatbox} />
					<Route exact path='/chatbox/:post_id/:message' component={Chatbox} />
					<Route path='/profileguiders' component={ProfileGuiders} />
					<Route path='/tour' component={Tour} />
					<Route path='/profiletraveller' component={ProfileTravaller} />
					<Route path='/tour/:id' component={PostTourDetail} exact />
					<Route path='/posttour/:id' component={PostTourDetail} />
					<Route path='/book' component={Pay} />
					<Route path='/tvlManager' component={TravellerManager} />
					<Route path='/contract' component={GuiderContract} />
					<Route path='/chart' component={Chart} />
					<Route path='/add' ><AddPost guiderId={this.state.id} /></Route>
					<Route exact path={"/edit"}>
						<BrowserRouter>
							<ManagePost guiderId={this.state.id} />
						</BrowserRouter>
					</Route>

				</Switch>
				<Footer />
			</div>

		);
	}
}
export default App;
