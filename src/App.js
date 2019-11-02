import React, { Component } from "react";
import Chatbox from "./Chatbox";
import EditPost from "./EditPost";
import ProfileGuiders from "./ProfileGuiders";
import Home from "./Home";
import ProfileTravaller from './ProfileTraveller';
import GuiderAllPost from './GuiderAllPost';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navbar from './Navbar';
import Footer from './Footer';
import Logged from './Logged';
import AddPost from "./AddPost";
import { BrowserRouter } from 'react-router-dom';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: "Guest",
			role: "GUEST",
			id: 0,
			logedIn: false
		};
		console.log(this.state.token);
	}

	reload = (user) => {
		console.log(user);
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
		console.log('app state ', this.state);
		let present = this.state.logedIn ? <Logged reload={this.reload} /> : <Navbar reload={this.reload} />;


		return (
			<div>
				{present}
				<Switch>

					{/* <Route exact path='/chatbox' component={Chatbox} />
					<Route path='/editpost' component={EditPost} />
					<Route path='/profileguiders' component={ProfileGuiders} />
					<Route path='/tour' component={Tour} />
					<Route path='/profiletraveller' component={ProfileTravaller} /> */}
					<Route exact path="/"><Home /></Route>
					<Route exact path={"/add"}><AddPost guiderId={this.state.id} /></Route>
					<Route exact path={"/edit"}>
						<BrowserRouter>
							<GuiderAllPost guiderId={this.state.id} />
						</BrowserRouter></Route>

				</Switch>
				<Footer />
			</div>

		);
	}


}

export default App;
