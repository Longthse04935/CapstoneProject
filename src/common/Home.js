import React, { Component } from "react";
import Config from "../Config";
import SweetAlert from "react-bootstrap-sweetalert";
import { Link } from "react-router-dom";
import $ from "jquery";
import Rated from '../Guider/Rated';
import TopGuider from "../Guider/TopGuider";
import { NONAME } from "dns";
class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			category: [],
			alert: null,
			tours: [],
			searchGuider: [],
			searchPost: [],
			slideShow: [
				"images/hoguom.jpg",
				"images/buncha.jpg",
				"images/dinhdoclap.jpg",
				"images/hanoi.jpg",
				"images/phobo.jpg",
				"images/thanhphodanang.jpg"
			],
			currentIndex: 0,
			filter: "none",
			location: [],
			postPage: 0,
			guiderPage: 0
		};
	}


	onNotification() {
		this.setState({ alert: null });
		sessionStorage.setItem("messagePay", "");
	}

	notification(notification) {
		const getAlert = () => (
			<SweetAlert
				warning
				confirmBtnText="This is notification for you"
				confirmBtnBsStyle="danger"
				title="Notification"
				onConfirm={() => this.onNotification()}
			>
				{notification}
			</SweetAlert>
		);

		this.setState({
			alert: getAlert()
		});
	}

	async componentDidMount() {
		$(".search-4ul6i").focus(function () {
			$(".fillter-4ul6i").show();
		});
		$(document).mouseup(function (e) {
			if (
				!$(".Search-3ul6i").is(e.target) &&
				!$(".fillter-4ul6i").is(e.target) &&
				$(".Search-3ul6i").has(e.target).length === 0 &&
				$(".fillter-4ul6i").has(e.target).length === 0
			) {
				$(".fillter-4ul6i").hide();
			}
		});

		try {
			const locate = await fetch(Config.api_url + "location/findAll", {
				method: "GET",
				mode: "cors",
				credentials: "include"
			});
			if (!locate.ok) {
				throw Error(responseTour.status + ": " + responseTour.statusText);
			}
			const cities = await locate.json();
			

			const responseTour = await fetch(Config.api_url + "guiderpost/getTopTour", {
				method: "GET",
				mode: "cors",
				credentials: "include"
			});
			if (!responseTour.ok) {
				throw Error(responseTour.status + ": " + responseTour.statusText);
			}

			const responsePosts = await fetch(Config.api_url + "category/findAll");
			if (!responsePosts.ok) {
				throw Error(responsePosts.status + ": " + responsePosts.statusText);
			}

			const category = await responsePosts.json();
			const tours = await responseTour.json();
			this.setState({ category: category, tours: tours, location: cities });
		} catch (err) {
			console.log(err);
		}
		if (sessionStorage.getItem("messagePay")) {
			var messagePay = sessionStorage.getItem("messagePay");
			if (messagePay === "Error user or tour inf") {
				this.notification(
					"You are not logged in. Please login or register to use service mywebsite!!"
				);
			} else if (messagePay === "You are Guider") {
				this.notification("You do not have access to here");
			}
		}

		this.setupInterval();

		// window.onscroll = function () {
		// 	if (window.pageYOffset === 0) {
		// 		$("#navbar").css({ background: "none", "border-bottom": "none" });
		// 		$(".navbarRightContent ul li").css({
		// 			color: "black",
		// 			"font-size": "18px"
		// 		});
		// 	}
		// };
	}

	setupInterval = () => {
		let intervalId = setInterval(this.commonNext, 5000);
		this.setState({ intervalId: intervalId });
	};

	componentWillUnmount() {
		clearInterval(this.state.intervalId);
		window.onscroll = null;
	}

	commonNext = () => {
		let { currentIndex, slideShow } = this.state;
		currentIndex++;
		if (currentIndex >= slideShow.length) {
			currentIndex = 0;
		}
		this.setState({ currentIndex });
	};

	handleChange = category_name => {
		window.sessionStorage.setItem("category_name", category_name);
	};

	searchGuider = async (input) => {
		try {
			const responsePosts = await fetch(
				Config.api_url + "Guider/Search/" + input+"/"+this.state.guiderPage,
				{
					method: "GET",
					mode: "cors",
					credentials: "include",
					headers: {
						'Accept': 'application/json'
					},
				}
			);

			if (!responsePosts.ok) {
				throw Error(responsePosts.status + ": " + responsePosts.statusText);
			}

			const guiders = await responsePosts.json();

			this.setState({ searchGuider: guiders, guiderPage: ++this.state.guiderPage });
		} catch (err) {
			console.log(err);
		}
	}
	searchLocation = async (input) => {
		try {
			let guider_id = this.props.id;
			const responsePosts = await fetch(
				Config.api_url + "guiderpost/findAllPostWithLocationName/" + input+"/"+this.state.postPage,
				{
					method: "GET",
					mode: "cors",
					credentials: "include",
					headers: {
						'Accept': 'application/json'
					},
				}
			);

			if (!responsePosts.ok) {
				throw Error(responsePosts.status + ": " + responsePosts.statusText);
			}

			const posts = await responsePosts.json();

			this.setState({ searchPost: posts, postPage: ++this.state.postPage });
		} catch (err) {
			console.log(err);
		}
	}

	render() {
		let input = null;
		let { currentIndex, slideShow } = this.state;
		let src = Config.api_url + slideShow[currentIndex];
		let tour = this.state.category.map((tour, index) => {
			return (
				<li key={index}>
					<img src={`${Config.api_url}images/${tour.category}.jpg`} />
					<Link
						to={"/posttour/" + tour.category_id}
						onClick={() => {
							this.handleChange(tour.category);
						}}
					>
						<button className="categoriesTour">{tour.category} tour</button>
					</Link>
				</li>
			);
		});
		let slide = this.state.tours.map((value, index) => (
			<div className="slideContent" key={index}>
				<h2>Enjoy our {value.title}</h2>
				<img src={`${Config.api_url}images/${value.picture_link[0]}`} />
				<Link to={"/post/" + value.post_id}>
					<button>Explore</button>
				</Link>
			</div>
		));
		let home = (<div className="categoryTour">
			<h1>Explore Withlocals</h1>
			<h2 className="sectionSubtitle">
				<span data-translatekey="Homepage.Categories.subTitle">
					All of our tours and activities are:{" "}
					<span>• Private • Personalized • </span>{" "}
					<span>With the local of your choice</span>
				</span>
			</h2>
			<ul className="tourDetail">{tour}</ul>
			{this.state.alert}
			<h1 style={{ marginTop: "30px", fontSize: "30px" }}>The travel is most appreciated</h1>
			<div className="coverTopTour">{slide}</div>
			<TopGuider />
		</div>);
		let postResult = (<div className="postResult">
			<div className="bookOffers">
				<h2>Search Result </h2>
				<ul>
					{this.state.searchPost.map((post, index) => (
						<li key={index}>
							<div className="sheet">
								<div className="imageFigure">
									<img src={post.picture_link[0]} alt="logo" width="42" height="42" />
								</div>
								<div className="experienceCard-details">
									<span className="enjoy">
										Enjoy <span className="withName">{post.post_id}</span>
									</span>
									<h3>
										<Link to={"/post/" + post.post_id}>{post.title}</Link>
									</h3>
									<div className="price">
										<span>${post.price}</span>
										<span className="experienceCard-topDetails-bullet">
											{" "}
											&#9679;{" "}
										</span>
										<span className="experienceCard-topDetails-duration">{post.total_hour} hours</span>
										<span className="experienceCard-topDetails-bullet">
											{" "}
											&#9679;{" "}
										</span>
										<span data-translatekey="Experience.SubcategoryOrTag.day-trip">Day trip</span>
									</div>
									<div className="experienceCard-bottomDetails">
										<Rated number="5" />
										<span className="colorShared">1249 | </span>
										<span className="colorShared"><i className="fa fa-bolt" /> |</span>
										<span className="colorShared"><i className="fa fa-car" /></span>
									</div>
								</div>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
		);
		//console.log(this.state.searchGuider);
		let guiderResult = (<div className="guiderResult">
			<h2>Search Result</h2>
			<div className="content-left">
				{this.state.searchGuider.map((post, index) => (
					<div className="profile-box" key={index}>
						<div className="pb-header header-stick">
							<div className="header-pb">
								<h1 className="TitlePb TileStickyPb">
									{post.first_name + "" + post.last_name}
								</h1>
							</div>
						</div>
						<Rated number={post.rated} />
						<Link to={"/guider/" + post.guider_id}>
							<button className="contactMe">About me {post.guider_id}</button>
						</Link>

					</div>
				))}
			</div>
		</div>
		);

		let visible = (this.state.filter === "none") ? home : (this.state.filter === "guider") ? guiderResult : postResult;
		return (
			<div>
				<div className="homeSlide">
					<img src={src} />
					<div className="Title-e9h41">
						<h1>Book unique private tours and activities with locals worldwide</h1>
						<div className="Search-2ul6i">
							<div className="Search-3ul6i">
								<label>
									<input
										type="text"
										placeholder="Welcome to my website"
										name="search"
										autoComplete="off"
										className="search-4ul6i"
										ref={node => { input = node; }}
									/>
								</label>
								<div className="fillter fillter-4ul6i">
									<div className="filter-Content">
										<div className="localsOrExperience">
											<h3 className="explore">Explore TravelWlocals</h3>
											<div className="button-group">
												<button className="active" onClick={(eve) => {
													eve.preventDefault();
													this.state.filter = "guider";
												}}>Guider</button>
												<button onClick={(eve) => {
													eve.preventDefault();
													this.state.filter = "location";
												}}>Location</button>
											</div>
										</div>
										<div className="popularDestination">
											<h3 id="popularLabel">Popular Destinations</h3>
											<ul>
												{this.state.location.map((city, index) => (
													<li key={index}>
														<i
															className="fa fa-map-marker"
															aria-hidden="true"
														></i>
														<a onClick={(eve) => {
															eve.preventDefault();

															this.searchLocation(city.city);
														}}>{city.city}</a>
													</li>
												))}

											</ul>
										</div>
									</div>
								</div>
							</div>
							<button className="Button-2i" onClick={(eve) => {
								eve.preventDefault();
								if (!input.value.trim()) {
									return;
								}
								this.state.filter = (this.state.filter === "none") ? "guider" : this.state.filter;
								console.log("input: " + input.value);
								if (this.state.filter === "guider") {
									this.searchGuider(input.value);
								} else if (this.state.filter === "location") {
									this.searchLocation(input.value);
								} else {
									console.log("search other filter");
								}

							}}>Search</button>

						</div>
					</div>
				</div>
				{visible}
			</div>
		);
	}
}

export default Home;
