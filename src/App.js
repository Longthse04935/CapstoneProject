import React, { Component } from "react";
import Chatbox from "./Traveler/Chatbox";
import ProfileGuiders from "./Guider/ProfileGuiders";
import Home from "./common/Home";
import ProfileTravaller from './Traveler/ProfileTraveller';
import { BrowserRouter as Router, Switch, Route, Link,Redirect } from "react-router-dom";
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
import { wsConnect, wsDisconnect, send } from './redux/webSocket';
import Message from './common/Message';
import ChatList from './common/ChatStore';
import Books from './Guider/Books';
import Schedule from './Guider/Schedule';
import GuiderProfile from './Guider/GuiderProfile';
import ChangePassword from "./common/ChangePassword";
import EditPost from './Guider/EditPost';
import SweetAlert from 'react-bootstrap-sweetalert';
import Page404 from './Page404';
import ReviewTraveler from './Guider/ReviewTraveler';
import Config from './Config';
import ForgotPassword from "./common/ForgotPassword";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: "Guest",
			role: "GUEST",
			id: 0,
			logedIn: false,
			avartar: "",
			alert: null,
		};

	}
	
	checkPathWithoutLogin = (component) => (
		this.props.user.userName === '' ? (
			<Redirect to="/" />
		) : (
			component
		)
	)
	
	checkPathWithRoleTraveler = (component) => {
		let user = this.props.user;
		if(user.userName === '' || user.role === 'GUIDER'){
           return <Redirect to="/" />
		}else{
			return component;
		}
		
	}

	checkPathWithRoleGuider = (component) => {
		let user = this.props.user;
		
		if(user.userName === '' || user.role === 'TRAVELER'){
           return <Redirect to="/" />
		}else if(user.role === 'GUIDER'){
			if(user.isContractExist === false || user.isGuiderActive === false){
				return <GuiderContract message={'Waiting'}/>;
			}else{
                return component;
			}
			
		}
		
	}

	componentDidMount() {
		let user = this.props.user;
		if (user.logedIn) {
			this.props.dispatch(wsConnect(Config.api_url+"ws"));
		} else {

		}

	}


	
	render() {
		// let present;
		// let user = JSON.parse(window.sessionStorage.getItem('user'));
		// if (this.state.logedIn) {
		// 	if (user.role === 'TRAVELER') {
		// 		present = <LoggedTvl reload={this.reload} />;
		// 	}
		// 	else {
		// 		present = <LoggedGuider reload={this.reload} />;
		// 	}
		// } else {
		// 	present = <Navbar reload={this.reload} user={this.props.user}/>;
		// }
		

		let present;
		let user = this.props.user;
		if (user.logedIn) {
			if (user.role === 'TRAVELER') {
				present = <LoggedTvl id={this.props.user.id} reload={this.reload} />;
			}
			else {
				present = <LoggedGuider id={this.props.user.id} reload={this.reload} />;
			}
		} else {
			present = <Navbar reload={this.reload} />;
		}
		return (
			<div className="App">
				{present}
				<Switch>
				    {/* route public */}
					<Route path='/' component={Home} exact />
					<Route path='/posttour/:id' component={PostTourDetail} />
					<Route path='/forgotpassword' component={ForgotPassword} />
					<Route path='/guider/:guider_id' component={ProfileGuiders} exact />
					<Route path='/post/:post_id' component={PostDetail} exact />

					{/* route guider */}
					<Route path='/profileguiders' render={()=>this.checkPathWithRoleGuider(<GuiderProfile />)}/>
					<Route path='/contract' render={()=>this.checkPathWithRoleGuider(<GuiderContract />)} />
					<Route path='/chart' render={()=>this.checkPathWithRoleGuider(<Chart />)} />
					<Route path='/add' render={()=>this.checkPathWithRoleGuider(<AddPost guiderId={this.props.user.id} />)} />
					<Route path='/managebook' render={()=>this.checkPathWithRoleGuider(<Books id={this.props.user.id} />)} />
					<Route path='/schedule' render={()=>this.checkPathWithRoleGuider(<Schedule id={this.props.user.id} />)} />
					
					
					<Route exact path={"/edit"} render={()=>this.checkPathWithRoleGuider(<ManagePost guiderId={this.props.user.id} />)} />
					<Route path={"/update/:guider/:post"} render={(props)=>this.checkPathWithRoleGuider(<EditPost {...props}/>)} />
					<Route path='/reviewtvl/:id' render={(props)=>this.checkPathWithRoleGuider(<ReviewTraveler {...props}/>)} />

					{/* route traveler */}
					<Route path='/profiletraveller' render={()=>this.checkPathWithRoleTraveler(<ProfileTravaller/>)} />
					<Route path='/tvlManager' render={()=>this.checkPathWithRoleTraveler(<TravellerManager id={this.state.id} />)}></Route>
					<Route path='/book' render={()=>this.checkPathWithRoleTraveler(<Pay/>)} /> 
				
					{/* check login */}
					<Route exact path='/chatbox/:guiderId/:post_id/:message' render={(props)=>this.checkPathWithoutLogin(<Chatbox {...props}/>)} />
					<Route exact path='/chatbox/:guiderId/:post_id/' render={(props)=>this.checkPathWithoutLogin(<Chatbox {...props}/>)} />
					<Route path='/changepassword' render={()=>this.checkPathWithoutLogin(<ChangePassword guiderId={this.props.user.id} />)}/>
					<Route path='/chat' render={()=>this.checkPathWithoutLogin(<Message />)}/>
					<Route path='/tour' component={Tour} />
					
					{/* <Route path='/tour/:id' component={PostTourDetail} exact />*/}
					
					
					{/* <Route path='/tvlManager' render={this.checkPathWithRoleTraveler(<ProfileTravaller/>)}> <TravellerManager id={this.state.id} /> </Route> */}
					
					{/* <Route path='/profileguider' component={ProfileGuiders} /> */}
					<Route path='*' component={Page404} />
				</Switch>
				<Footer />
			</div>

		);
	}
}
function mapStateToProps(state) {
	console.log(state);
	const messages = state.messages;
	const clients = state.clients;
	const user = state.user;
	const error = state.Error;
	const notifications = state.notifications; 
	return { messages, clients, user, error, notifications };
}
App = connect(mapStateToProps)(App);

export default App;
//export default connect()(App);
