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
import PostDetail from "./PostDetail";
import Cookies from 'js-cookie';
import AddPost from "./AddPost";
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
		this.setState({
			logedIn: !this.state.logedIn,
			userName: user.userName,
			role: user.role,
			id: user.id
		});
	}


	render() {
		console.log('app state ', this.state);
		let present = this.state.logedIn ? <Logged reload={this.reload} /> : <Navbar reload={this.reload} />;


		return (
			<div>


				
				{/* <EditPost guiderId="1" postId="4"/> */}
				{/* <AddPost guiderId="3"/> */}
				{/* <PostDetail postId="1"/> */}
				
				<Router>
					{present}
					{/* <Route exact path='/chatbox' component={Chatbox} />
					<Route path='/editpost' component={EditPost} />
					<Route path='/profileguiders' component={ProfileGuiders} />
					<Route path='/tour' component={Tour} />
					<Route path='/profiletraveller' component={ProfileTravaller} /> */}
					<Route path="/"/>
					<Route exact path={"/add"}><AddPost guiderId={this.state.id} /></Route>
					<Route exact path={"/edit"}><GuiderAllPost guiderId={this.state.userId} /></Route>
					<Footer />
				</Router>
				
			</div>

		);
	}

}

export default App;
