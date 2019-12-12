import React, { Component } from "react";
import Chatbox from "./Traveler/Chatbox";
import ProfileGuiders from "./Guider/ProfileGuiders";
import Home from "./common/Home";
import ProfileTravaller from './Traveler/ProfileTraveller';
import GuiderAllPost from './Guider/GuiderAllPost';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Navbar from './Nav/Navbar';
import Footer from './common/Footer';
import LoggedTvl from './Nav/LoggedTvl';
import LoggedGuider from './Nav/LoggedGuider';
import PostDetail from './Guider/PostDetail';
import Tour from './Tour';
import PostTourDetail from './common/PostTourDetail';
import Pay from './Traveler/Pay';
import TravellerManager from './Traveler/TravellerManager';
import GuiderContract from './Guider/GuiderContract';
import Chart from './Guider/Chart';
import ManagePost from './Guider/ManagePost';
import AddPost from './Guider/AddPost';
import { connect } from 'react-redux';
import { logOut,logIn } from './redux/actions';
import {wsConnect, wsDisconnect, send} from './redux/webSocket';
import Message from './common/Message';
import ChatList from './common/ChatStore';
import Books from './Guider/Books';
import Schedule from './Guider/Schedule';
import ChangePassword from "./common/ChangePassword";
import Page404 from './Page404';
import ReviewTraveler from './Guider/ReviewTraveler';

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
				this.props.dispatch(wsDisconnect("http://localhost:8080/ws"));
				
				window.sessionStorage.clear();
			}
			else {
				this.props.dispatch(wsConnect("http://localhost:8080/ws", user.userName));
				
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
					<Route path='/guider/:guider_id' component={GuiderAllPost} exact />
					<Route path='/post/:post_id' component={PostDetail} exact />
					<Route exact path='/chatbox/:post_id' component={Chatbox} />
					<Route exact path='/chatbox/:post_id/:message' component={Chatbox} />
					<Route path='/profileguiders' component={ProfileGuiders} />
					<Route path='/tour' component={Tour} />
					<Route path='/profiletraveller' component={ProfileTravaller} />
					<Route path='/tour/:id' component={PostTourDetail} exact />
					<Route path='/posttour/:id' component={PostTourDetail} />
					<Route path='/book' component={Pay} />
					<Route path='/tvlManager'> <TravellerManager id={this.state.id}/> </Route>
					<Route path='/contract' component={GuiderContract} />
					<Route path='/chart' component={Chart} />
					<Route path='/reviewtvl/:id' component={ReviewTraveler} />
					<Route path='/add' ><AddPost guiderId={this.state.id} /></Route>
					<Route path='/managebook' ><Books id={this.state.id} /></Route>
					<Route path='/schedule' ><Schedule id={this.state.id} /></Route>
					<Route path='/changepassword' ><ChangePassword guiderId={this.state.id} /></Route>
					<Route path='/chat' ><Message	 id={this.state.id}
					 messages={this.props.messages} clients={this.props.clients}/></Route>
					<Route exact path={"/edit"}>
						<BrowserRouter>
							<ManagePost guiderId={this.state.id} />
						</BrowserRouter>
					</Route>
					<Route path='*' component={Page404} />

				</Switch>
				<Footer />
			</div>

		);
	}
}
function mapStateToProps(state) {
	const messages = state.messages;
	const clients = state.clients;
      return {messages, clients};
}
App = connect(mapStateToProps)(App);

export default App;
//export default connect()(App);
