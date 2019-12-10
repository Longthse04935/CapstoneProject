import React from "react";
import ReviewInPost from "../Guider/ReviewInPost";
import PlanInPost from "./PlanInPost";
import GuiderInPost from "./GuiderInPost";
import Rated from "./Rated";
import $ from "jquery";
import Config from "../Config";

class PostDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPage: 1,
			todosPerPage: 4,
			postInfo: [],
			posts: [],
			guider: {},
			page: 0
		};
	}
	async componentDidMount() {
		$("html").animate({ scrollTop: 0 }, 500, "swing");
		try {
			const post_id = this.props.match.params.post_id;
			let autheticate = {
				method: "GET",
				mode: "cors",
				credentials: "include",
				headers: {
					'Accept': 'application/json'
				}
			}

			const response2 = await fetch(
				Config.api_url + "Guider/guiderByPostId?post_id=" + post_id,
				autheticate
			);
			if (!response2.ok) {
				throw Error(response2.status + ": " + response2.statusText);
			}
			const guider = await response2.json();
			this.setState({ guider });

			const response = await fetch(
				Config.api_url + "guiderpost/findSpecificPost?post_id=" + post_id,
				autheticate
			);
			if (!response.ok) {
				throw Error(response.status + ": " + response.statusText);
			}

			const responsePosts = await fetch(
				Config.api_url +
				"guiderpost/postOfOneGuider/" +
				guider.guider_id+"/"+this.state.page,
				autheticate
			);
			if (!responsePosts.ok) {
				throw Error(responsePosts.status + ": " + responsePosts.statusText);
			}

			const responseCategories = await fetch(
				Config.api_url + "category/findAll",
				autheticate
			);
			if (!responsePosts.ok) {
				throw Error(responsePosts.status + ": " + responsePosts.statusText);
			}

			window.sessionStorage.setItem("guider_id", "" + guider.guider_id);

			const postInfo = await response.json();
			this.setState({ postInfo:postInfo, page: ++this.state.page });


			const posts = await responsePosts.json();
			this.setState({ posts });
			let link_youtube = postInfo.video_link;
			if (link_youtube.includes('youtu.be')) {
				link_youtube = link_youtube.replace("youtu.be", "youtube.com/embed");
				this.setState({ link_youtube });
			} else {
				link_youtube = link_youtube.split("&");
				this.setState({ link_youtube: link_youtube[0].replace("watch?v=", "embed/") });
			}



		} catch (err) {
			console.log(err);
		}
	}

	handleGotoPage = (post_id, guider_id) => {
		this.props.history.push("/post/" + post_id);
		window.location.reload();
	};

	handleCurrentPage = event => {
		this.setState({
			currentPage: event.target.id
		});
	};

	render() {
		const { postInfo } = this.state;
		const post_id = this.props.match.params.post_id;
		let guider_id = this.state.guider.guider_id;

		//pagination

		const data = this.state.posts;
		const { currentPage, todosPerPage } = this.state;

		// Logic for displaying todos
		const indexOfLastTodo = currentPage * todosPerPage;
		const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
		const currentdata = data.slice(indexOfFirstTodo, indexOfLastTodo);

		// Logic for displaying page numbers
		const pageNumbers = [];
		for (let i = 1; i <= Math.ceil(data.length / todosPerPage); i++) {
			pageNumbers.push(i);
		}

		const renderPageNumbers = pageNumbers.map(number => {
			return (
				<button
					key={number}
					id={number}
					onClick={this.handleCurrentPage}
					className={currentPage === number ? "currentPage" : ""}
				>
					{number}
				</button>
			);
		});

		let posts = currentdata.map((post, index) => (

			<li key={index}>
				<div className="sheet">
					<div className="imageFigure">
						<img src={Config.api_url + 'images/' + post.picture_link[0]} alt="logo" />
					</div>
					<div className="experienceCard-details">
						<span className="enjoy">
							Enjoy <span className="withName">{post.title}</span>
						</span>
						<h3>
							<span
								onClick={() => this.handleGotoPage(post.post_id, guider_id)}
							>
								{post.description}
							</span>
						</h3>
						<div className="price">
							<i className="fa fa-money" aria-hidden="true"></i><span>{" " + post.price}$</span>
							<span className="experienceCard-topDetails-bullet">
								{" "}
								&#9679;{" "}
							</span>
							<i className="fa fa-hourglass-half" aria-hidden="true"></i>
							<span className="experienceCard-topDetails-duration">
								{" " + post.total_hour} hours
              </span>
							<span className="experienceCard-topDetails-bullet">
								{" "}
								&#9679;{" "}
							</span>
							{
								post.total_hour > 24 ?
									<span>
										<i className="fa fa-moon-o" aria-hidden="true"></i>
										<span data-translatekey="Experience.SubcategoryOrTag.day-trip">
											{" "}Long trip
               </span>
									</span>
									:
									<span>
										<i className="fa fa-sun-o" aria-hidden="true"></i>
										<span data-translatekey="Experience.SubcategoryOrTag.day-trip">
											{" "} Day trip
               </span>
									</span>
							}

						</div>
						<div className="experienceCard-bottomDetails">
							<Rated number="5" />
						</div>
					</div>
				</div>
			</li>
		));

		let imgPostInfo = <img className="imgPostInfo" src={Config.api_url + 'images/' + postInfo.picture_link} />;

		return (
			<div>
				<div>
					<div id="reactContainer">
						{/*  Content  */}
						<div className="content">
							<div className="content-left">
								{guider_id ? (
									<GuiderInPost
										guiderId={guider_id}
										postId={this.props.match.params.post_id}
									/>
								) : null}
							</div>
							<div className="content-right">
								<div className="PostDetail">
									<div className="intro">
										<iframe
											src={this.state.link_youtube}
											frameBorder="0"
											allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
											allowFullScreen
										></iframe>
										<h2 className="titleTour">{postInfo.title}</h2>
										<p className="introduceTour">{postInfo.description}</p>
									</div>
									<div className="activities">
										<ul>
											<li>
												<i className="fa fa-map-marker"></i>
												<span>{postInfo.location}</span>
											</li>
											<li>
												<i className="fa fa-cutlery" aria-hidden="true"></i>
												<span>{postInfo.category} tour</span>
											</li>
											<li>
												<i className="fa fa-hourglass-end" />
												<span>{postInfo.total_hour} hours</span>
											</li>

											{postInfo.total_hour > 24 ?
												<li>
													<i className="fa fa-moon-o" aria-hidden="true"></i>
													<span>Long trip</span>
												</li>
												:
												<li>
													<i className="fa fa-sun-o" aria-hidden="true"></i>
													<span>Day trip</span>
												</li>
											}

											<li>
												<i className="fa fa-users" />
												<span>Private tour. Only you and your host</span>
											</li>
										</ul>
										<i className="fa fa-sticky-note" />
										<span>
											<strong>Including:</strong>
											{this.state.including_service}
										</span>
									</div>

									<ReviewInPost postId={post_id} />


									<PlanInPost postId={post_id} />
									{imgPostInfo}
								</div>

								<div className="bookOffers">
									<h2 style={{ marginBottom: '20px' }}>Watch one of my trip</h2>
									<ul>{posts}</ul>
								</div>

								<div className="pagination">
									<div className="paginationContent">{renderPageNumbers}</div>
								</div>
							</div>
						</div>
					</div>
					{/*  End Content  */}
				</div>
			</div>
		);
	}

}

export default PostDetail;
