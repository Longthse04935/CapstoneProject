import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.min.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Notification from '../common/Notification';
import Config from '../Config';
import SweetAlert from 'react-bootstrap-sweetalert';
import $ from 'jquery';
import ChatList from "../common/ChatStore";
import { connect } from 'react-redux';
import PlanInPost from "../Guider/PlanInPost";

import { Redirect } from "react-router-dom";
class Chatbox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			//chatbox
			index: 1,
			//tour
			tourDate: new Date(),
			hourBegin: '',
			endTime: '',
			numberInjoy: {
				adult: 1,
				children: 0,
				price: 10,
				totalPrice: 10
			},
			//plan in tour
			plan: [],
			//time can book tour
			timeAvailable: [],
			message: '',
			isError: false,
			closest_EndDate: "",
			alert: null,
			valueItem: '',
			guider: {},
			//user: JSON.parse(sessionStorage.getItem('user'))
			user: props.user
		};
	}



	option = (time) => {
		var date = this.state.tourDate;
		var getDate = parseInt(date.getDate()) < 10 ? "0" + parseInt(date.getDate()) : parseInt(date.getDate());
		var getMonth = parseInt(date.getMonth() + 1) < 10 ? "0" + parseInt(date.getMonth() + 1) : parseInt(date.getMonth() + 1);
		//window.sessionStorage.getItem("guider_id")
		var data = {
			"guider_id": "" + this.props.user.id,
			"post_id": "" + this.props.match.params.post_id,
			"begin_date": "" + getMonth + "/" + getDate + "/" + date.getFullYear() + time
		};

		let options = {
			method: 'POST',
			mode: "cors",
			credentials: "include",
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data)
		};
		return options;
	}
	async componentDidMount() {

		let flag = this.props.match.params.message === undefined ? '' : this.props.match.params.message;
		let isError = (flag === "booking_success") ? false : true;

		let message = '';
		if (flag) {
			message = (isError) ? 'Booking Failed' : 'Booking Success';
		}


		// this.scrollToBottom();
		let post_id = this.props.match.params.post_id;

		//price in tour
		let { numberInjoy } = this.state;
		try {
			const responsePosts = await fetch(
				Config.api_url + "guiderpost/findSpecificPost?post_id=" + post_id, {
				method: "GET",
				mode: "cors",
				credentials: "include"
			});

			if (!responsePosts.ok) {
				throw Error(responsePosts.status + ": " + responsePosts.statusText);
			}

			const posts = await responsePosts.json();
			numberInjoy.price = posts.price;
			numberInjoy.totalPrice = numberInjoy.adult * posts.price;


			//load time avilable
			let options = this.option(" 00:00");
			let response = await fetch(Config.api_url + 'Order/GetAvailableHours', options);
			response = await response.json();
			//load end time avilable	
			let option = this.option(" " + response[0]);
			let endTime = await fetch(Config.api_url + 'Order/GetExpectedTourEnd', option);
			endTime = await endTime.text();
			
			//get profile guider sessionStorage.getItem('guider_id')
			const responseGuider = await fetch(Config.api_url + "Guider/" + this.props.user.id, {
				method: "GET",
				mode: "cors",
				credentials: "include"
			});
			if (!responseGuider.ok) { throw Error(responseGuider.status + ": " + responseGuider.statusText); }
			const guider = await responseGuider.json();
			this.setState({guider: guider , message, isError, numberInjoy, timeAvailable: response, hourBegin: response[0], endTime: endTime });

			$(".ratingChatbox img").hover(function () {
				$('.tool-tip').show();
			}, function () {
				$('.tool-tip').hide();
			})

		} catch (err) {
			console.log(err);
		}
	}

	dateChange = async date => {
		let tourDate = new Date() > date ? new Date() : date;
		this.setState({
			tourDate: tourDate,
			closest_EndDate: ""
		});

		let options = this.option(" 00:00")
		let response = await fetch(Config.api_url + 'Order/GetAvailableHours', options);
		response = await response.json();
		//load end time avilable
		let option = this.option(" " + response[0]);
		let endTime = await fetch(Config.api_url + 'Order/GetExpectedTourEnd', option);
		endTime = await endTime.text();
		this.setState({ timeAvailable: response, endTime: endTime, valueItem: response[0] });

	}

	async handleChangeHour(e) {

		this.setState({
			hourBegin: e.target.value,
			valueItem: e.target.value
		});

		let options = this.option(" " + e.target.value);
		let response = await fetch(Config.api_url + 'Order/GetClosestFinishDate', options);
		let closest_EndDate = await response.text();
		console.log(closest_EndDate);
		response = await fetch(Config.api_url + 'Order/GetExpectedTourEnd', options);
		let endTime = await response.text();
		closest_EndDate = "Last tour ended at " + closest_EndDate;
		this.setState({ closest_EndDate, endTime: endTime });
	}

	onCancel() {
		this.setState({
			alert: null
		});
	}

	onLogin() {
		this.setState({ alert: null });
		$('.loginForm').show();
	}

	alertAccount() {
		const getAlert = () => (
			<SweetAlert
				warning
				showCancel
				confirmBtnText="Go to login"
				confirmBtnBsStyle="danger"
				title="Login notification"
				onConfirm={() => this.onLogin()}
				onCancel={() => this.onCancel()}
				focusCancelBtn
			>
				You are not logged in. Please login or register to book this tour!!
      </SweetAlert>
		);

		this.setState({
			alert: getAlert()
		});
	}

	bookNow = async () => {
		var user = JSON.parse(sessionStorage.getItem('user'));
		if (user === null) {
			this.alertAccount();
		} else if (user !== null) {
			let data = this.state;
			let today = data.tourDate;
			let getDate = parseInt(today.getDate()) < 10 ? "0" + parseInt(today.getDate()) : parseInt(today.getDate());
			let getMonth = parseInt(today.getMonth() + 1) < 10 ? "0" + parseInt(today.getMonth() + 1) : parseInt(today.getMonth() + 1);

			let options = this.option(" " + this.state.hourBegin);


			let tourDetail = {
				traveler_id: '',
				post_id: '',
				begin_date: '',
				adult_quantity: '',
				children_quantity: '',
				price: '',
				end_date: '',
				guider_id: sessionStorage.getItem('guider_id'),
				guider_name: sessionStorage.getItem('guider_name')
			};

			tourDetail.traveler_id = "" + user.id;
			tourDetail.post_id = "" + this.props.match.params.post_id;
			tourDetail.begin_date = getMonth + "/" + getDate + "/" + today.getFullYear() + " " + data.hourBegin;
			tourDetail.adult_quantity = "" + data.numberInjoy.adult;
			tourDetail.children_quantity = "" + data.numberInjoy.children;
			tourDetail.price = data.numberInjoy.totalPrice;
			tourDetail.end_date = this.state.endTime;
			sessionStorage.setItem('tourDetail', JSON.stringify(tourDetail));
			//add check here
			//window.location.href = "/book";
			return <Redirect to="/book"/>
		}


	}

	changeNumber = (age, minusPlus) => {
		const { numberInjoy } = this.state;
		const min = 1;
		const max = 8;
		var currentPeople = numberInjoy.adult + numberInjoy.children;

		if (age === "adult" && minusPlus === "minus") {
			if (currentPeople > min && numberInjoy.adult > 1) {
				numberInjoy.adult--;

			}
		} else if (age === "adult" && minusPlus === "plus") {
			if (currentPeople < max) {
				numberInjoy.adult++;

			}
		} else if (age === "child" && minusPlus === "minus") {
			if (currentPeople > min && numberInjoy.children > 0) {
				numberInjoy.children--;

			}
		} else if (age === "child" && minusPlus === "plus") {
			if (currentPeople < max) {
				numberInjoy.children++;
			}
		}
		numberInjoy.totalPrice = ((numberInjoy.adult * numberInjoy.price) + (numberInjoy.children * numberInjoy.price * 0.5));
		this.setState({ numberInjoy: numberInjoy });

	};

	render() {
		const { chatData, chatText, author, numberInjoy, plan, guider } = this.state;

		let selectHour = this.state.timeAvailable.map((value, index) => {
			return <option key={index} value={value}>{value}</option>;
		});


		return (
			<div className="ChatRoom">
				{this.state.alert}
				<Notification message={this.state.message} isError={this.state.isError} />
				{/* Chat form */}
				<div className="chat_window" >
					{/* plan of tour detailPlanChatBox*/}
					<div className="detailPlanChatBox"> 
					<PlanInPost postId={this.props.match.params.post_id}/>
					</div>
					{/* guider infor */}
					<div className="guiderInfo" >
						<div className="guiderContent">
							<h1>{window.sessionStorage.getItem("guider_name")}</h1>

							<div className="rating ratingChatbox">
								<img src="" />
								<i className="fa fa-star" aria-hidden="true"></i>
								<i className="fa fa-star" aria-hidden="true"></i>
								<i className="fa fa-star" aria-hidden="true"></i>
								<i className="fa fa-star" aria-hidden="true"></i>
								<i className="fa fa-star" aria-hidden="true"></i>
								<div className="tool-tip">
									<p className="tool-tipItem">
										<span className="tool-tipItemIcon">
											<i className="fa fa-map-marker"></i>
										</span>
										<span className="tool-tipItemText">
											I live in {guider.city}
										</span>
									</p>
									<p className="tool-tipItem">
										<span className="tool-tipItemIcon">
											<i className="fa fa-globe"></i>
										</span>
										<span className="tool-tipItemText">
											I speak {guider.languages}
										</span>
									</p>
									<p className="tool-tipItem">
										<span className="tool-tipItemIcon">
											<i className="fa fa-heart"></i>
										</span>
										<span className="tool-tipItemText">
											My passions are
                        </span>
									</p>
									<p className="tool-tipItem">
										<span className="tool-tipItemIcon">
											<i className="fa fa-shield" aria-hidden="true"></i>
										</span>
										<span className="tool-tipItemText">Verified</span>
									</p>
									<p className="tool-tipItem">
										<span className="tool-tipItemIcon">
											<i className="fa fa-info-circle" aria-hidden="true"></i>
										</span>
										<span className="tool-tipItemText">About me:{guider.about_me}</span>
									</p>
								</div>
							</div>

							<div className="pickdate">
								Pick Date Start:
                <DatePicker
									selected={this.state.tourDate}
									onChange={this.dateChange}

									minDate={new Date()}
								/>
							</div>
							<div className="selectTime">
								<p style={{ position: 'relative' }}>Time Start: <span style={{ position: 'absolute', right: '145px' }}>Time End</span></p>
								<div className="select-style">
									<select value={this.state.valueItem} onChange={(e) => this.handleChangeHour(e)}>
										{selectHour}
									</select>
								</div>
								<input value={this.state.endTime} readOnly name="endTime" />
								<h5 className="closest_EndDate">{this.state.closest_EndDate}</h5>
							</div>
							<div className="numberTravel">
								<span>
									<span className="PeopleSelector-3cPTh">
										<button
											className="Button-1bHL5 DropdownButton-15Fja"
											id="Button-1bHL6"
										>
											<span className="ProfileIconContainer-3Xala">
												<svg
													className="ProfileIcon-3FvCp"
													width="16"
													height="16"
													viewBox="0 0 20 23"
												>
													<g>
														<path d="M15.414094,6.65663665 C15.414094,3.52796224 12.9882716,1 10.0062103,1 C7.02509025,1 4.59942235,3.52812516 4.59942235,6.65663665 C4.59942235,9.78514815 7.02509025,12.3132733 10.0062103,12.3132733 C12.9882716,12.3132733 15.414094,9.78531106 15.414094,6.65663665 Z M16.4126481,6.65663665 C16.4126481,10.3285794 13.5485479,13.3132733 10.0047644,13.3132733 C6.46189225,13.3132733 3.59797646,10.3283892 3.59797646,6.65663665 C3.59797646,2.9848841 6.46189225,0 10.0047644,0 C13.5485479,0 16.4126481,2.98469387 16.4126481,6.65663665 Z"></path>
														<path d="M1.01540138,21.9992828 C1.19144555,18.0419836 3.44634003,14.5899302 6.73724542,13.1335217 C6.98976422,13.0217681 7.10387696,12.726467 6.99212337,12.4739482 C6.88036977,12.2214294 6.58506864,12.1073166 6.33254984,12.2190702 C2.53516372,13.8996246 0.00429829063,17.9459179 0.00429829063,22.4992828 L0.00429829063,22.9992828 L20.003133,22.9992828 L20.003133,22.4992828 C20.003133,17.9435721 17.4710994,13.897152 13.6713661,12.2178274 C13.4187915,12.1062 13.1235474,12.2204602 13.0119199,12.4730347 C12.9002924,12.7256093 13.0145526,13.0208534 13.2671272,13.1324809 C16.5600972,14.5878371 18.8160013,18.0399474 18.9920364,21.9992828 L1.01540138,21.9992828 Z"></path>
													</g>
												</svg>
											</span>
											<span className="ButtonText-3rr6g">
												{numberInjoy.adult} Adults and {numberInjoy.children}{" "}
												children
                      </span>
										</button>
									</span>
								</span>
								<div className="viewNumberTravel " id="viewNummberChat">
									<div className="adult">
										Adults
                    <div className="plusAndMinus">
											<i
												onClick={() => this.changeNumber("adult", "minus")}
												className="fa fa-minus-circle"
											></i>
											&nbsp;{numberInjoy.adult}&nbsp;
                      <i
												onClick={() => this.changeNumber("adult", "plus")}
												className="fa fa-plus-circle"
											></i>
										</div>
									</div>
									<div className="children">
										Children
                    <div className="plusAndMinus">
											<i
												onClick={() => this.changeNumber("child", "minus")}
												className="fa fa-minus-circle"
											></i>
											&nbsp;{numberInjoy.children}&nbsp;
                      <i
												onClick={() => this.changeNumber("child", "plus")}
												className="fa fa-plus-circle"
											></i>
										</div>
									</div>
									<p>Adults price:{" "}${numberInjoy.price}</p>
									<p>Children price:{" "}${numberInjoy.price * 0.5}</p>
									<p>Amount: ${numberInjoy.totalPrice}</p>
								</div>

								<button className="bookNow" onClick={this.bookNow}>Book now</button>
							</div>
						</div>
					</div>

					{/* End guider infor */}

					{/* End plan of tour */}
					<ChatList name={this.state.user.userName} messages={this.props.messages}
						receiver={this.state.guider.name} />

				</div>

				{/*End  Chat form */}

			</div>
		);
	}
}
function mapStateToProps(state) {
	console.log(state);
	const messages = state.messages;
	const user = state.message;
	return { messages };
}
Chatbox = connect(mapStateToProps)(Chatbox)
export default Chatbox;
