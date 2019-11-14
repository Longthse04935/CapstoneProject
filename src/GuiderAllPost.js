import React, { Component } from "react";
import "font-awesome/css/font-awesome.min.css";
import { Link, Route, Switch } from 'react-router-dom';
import Rated from "./Rated";
import GuiderInPost from './GuiderInPost';
import EditPost from './EditPost';
import Config from './Config';
class GuiderAllPost extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentPage: 1,
			todosPerPage: 4,
			posts: []
		};
	}

	async componentDidMount() {
		try {
			const responsePosts = await fetch(
				Config.api_url + "guiderpost/postOfOneGuider?guider_id=" + this.props.match.params.guider_id,
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

			this.setState({ posts });
		} catch (err) {
			console.log(err);
		}
	}

	// handleCurrentPage = (event) => {
	//   this.setState({
	//     currentPage: event.target.id
	//   });
	// }

	render() {
		// const guider_id = this.props.userId;

		// const data = this.state.posts;
		// const { currentPage, todosPerPage } = this.state;

		// // Logic for displaying todos
		// const indexOfLastTodo = currentPage * todosPerPage;
		// const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
		// const currentdata = data.slice(indexOfFirstTodo, indexOfLastTodo);

		// // Logic for displaying page numbers
		// const pageNumbers = [];
		// for (let i = 1; i <= Math.ceil(data.length / todosPerPage); i++) {
		//   pageNumbers.push(i);
		// }

		// const renderPageNumbers = pageNumbers.map(number => {
		//   return (
		//     <button
		//       key={number}
		//       id={number}
		//       onClick={this.handleCurrentPage}
		//       className={currentPage === number ? 'currentPage' : ''}
		//     >
		//       {number}
		//     </button>
		//   );
		// });
		let edits = this.state.posts.map((post, index) =>
			<Route exact path={"/alter/" + post.post_id} key={index}><EditPost guiderId={this.props.guiderId} postId={post.post_id} /></Route>
		);
		let posts = this.state.posts.map((post, index) => (
			<li key={index}>
				<div className="sheet">
					<button className="unlike">
						<i className="fa fa-heart"></i>
					</button>
					<button className="like">
						<i className="fa fa-heart-o"></i>
					</button>
					<div className="imageFigure">
						<img src={post.picture_link[0]} alt="logo" width="42" height="42" />
					</div>
					<div className="experienceCard-details">
						<span className="enjoy">
							Enjoy <span className="withName">{post.post_id}</span>
						</span>
						<h3>
							<Link to={"/alter/" + post.post_id}>{post.title}</Link>
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
		));


		return (
			<div>
				<Switch>{edits}</Switch>
				<div>

					<div id="reactContainer">
						{/*  Content  */}
						<div className="content">
							<div className="content-right">
								<div className="bookOffers">
									<h2>Book one of my offers in Ha Noi</h2>
									<div className="contentTour">
										{
											this.state.posts.map((post, index) => {
												return (
													<div className="contentTourDetail" key={index}>
														<video controls>
															<source src='/video/Food_Tour-1_m8apyj.webm' type="video/mp4" />
														</video>
														<h2>{post.title}</h2>
														<p>{post.description}</p>
														<p>Price:{post.price}$</p>
														<p>Location:{post.location}</p>
														<div className="Rating">
															Rated:
                                        <i className="fa fa-star-half-o"></i>
															<i className="fa fa-star-half-o"></i>
															<i className="fa fa-star-half-o"></i>
															<i className="fa fa-star-half-o"></i>
															<i className="fa fa-star-half-o"></i>
														</div>
														<Link to={"/post/" + post.post_id}>Watch my post</Link>
													</div>
												)
											})
										}
									</div>
								</div>
								{/* <div className="pagination">
                  <div className="paginationContent">
                    {renderPageNumbers}
                  </div>
                </div> */}
							</div>
						</div>
					</div>
					{/*  End Content  */}
				</div>

			</div>
		);
	}
}

export default GuiderAllPost;
