import React from 'react';
import ReviewInPost from './ReviewInPost';
import PlanInPost from './PlanInPost';
import GuiderInPost from './GuiderInPost';
import {Link} from 'react-router-dom';
import Rated from "./Rated";
import $ from 'jquery';

class PostDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
			postInfo: [],
			posts: [],
			guider: {}
		};
	}
	async componentDidMount() {
		$('html').animate({scrollTop:0}, 500, 'swing');
		const post_id = this.props.match.params.post_id;

		try {
			const response2 = await fetch("http://localhost:8080/guider/guiderByPostId?post_id=" + post_id);
			if (!response2.ok) { throw Error(response2.status + ": " + response2.statusText); }
			const guider = await response2.json();
			this.setState({ guider});

			const response = await fetch("http://localhost:8080/guiderpost/?post_id=" + post_id);
			if (!response.ok) { throw Error(response.status + ": " + response.statusText); }

			const responsePosts = await fetch("http://localhost:8080/guiderpost/postOfOneGuider?guider_id=" + guider.guider_id);
			 if (!responsePosts.ok) { throw Error(responsePosts.status + ": " + responsePosts.statusText); }

			 

			const postInfo = await response.json();
			this.setState({ postInfo});
		
			const posts = await responsePosts.json();
			this.setState({ posts});
		} catch (err) {
			console.log(err);
		}
	}

	handleGotoPage = (post_id, guider_id) => {
		this.props.history.push('/post/' + post_id);
		window.location.reload();
	}
	render() {
		const {postInfo} = this.state;
		const post_id = this.props.match.params.post_id;
		let guider_id = this.state.guider.guider_id;


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
				  <img src="/img/1.jpg" alt="logo" width="42" height="42" />
				</div>
				<div className="experienceCard-details">
				  <div className="experienceAvatarCardContainer">
					<div className="experienceAvatarCard1">
					  <img src="/img/2.jpg" alt="logo" width="64" height="64" />
					</div>
					<div className="experienceAvatarCard2">
					  <img src="/img/3.jpg" alt="logo" width={64} height={64} />
					</div>
					<div className="localAvailable">7 others locals available</div>
				  </div>
				  <span className="enjoy">
					Enjoy <span className="withName">{post.post_id}</span>
				  </span>
				  <h3>
					<span onClick={() => this.handleGotoPage(post.post_id, guider_id)}>{post.title}</span>
				  </h3>
				  <div className="price">
					<span>${post.price}</span>
					<span className="experienceCard-topDetails-bullet">
					  {" "}
					  &#9679;{" "}
					</span>
					<span className="experienceCard-topDetails-duration">
					  {post.total_hour} hours
					</span>
					<span className="experienceCard-topDetails-bullet">
					  {" "}
					  &#9679;{" "}
					</span>
					<span data-translatekey="Experience.SubcategoryOrTag.day-trip">
					  Day trip
					</span>
				  </div>
				  <div className="experienceCard-bottomDetails">
					<Rated number="5" />
					<span className="colorShared">1249 | </span>
					<span className="colorShared">
					  <i className="fa fa-bolt" /> |
					</span>
					<span className="colorShared">
					  {" "}
					  <i className="fa fa-car" />
					</span>
				  </div>
				</div>
			  </div>
			</li>
		  ));

		return (
			<div>
				<div>
				<div id="reactContainer">
					{/*  Content  */}
					<div className="content">
					<div className="content-left">
					{guider_id ? (<GuiderInPost guiderId={guider_id} />) : null}
					</div>
					<div className="content-right">
					<div className="PostDetail">
						<div className="intro">
							<video >
								<source src={postInfo.video_link} type="video/mp4" />
							</video>
							<h2 className="titleTour">{postInfo.title}</h2>
							<p className="introduceTour">{postInfo.description}</p>
						</div>
						<div className="activities">
							<ul>
								<li><i className="fa fa-map-marker"></i><span>{postInfo.location}</span></li>
								<li><i className="fa fa-cutlery" aria-hidden="true"></i><span>Food tour</span></li>
								<li><i className="fa fa-hourglass-end" /><span>{postInfo.total_hour} hours</span></li>
								<li><i className="fa fa-bicycle" aria-hidden="true"></i><span>Walking tour</span></li>
								<li><i className="fa fa-users" /><span>Private tour. Only you and your host</span></li>
							</ul>
							<i className="fa fa-sticky-note" />
							<span><strong>Including:</strong>{postInfo.including_service}</span>
						</div>
						

						<ReviewInPost postId={post_id} />
						
						<PlanInPost postId={post_id} />
						<button className="serve">How can I serve you!!</button>
					</div>
					<div className="bookOffers">
						<h2>Book one of my offers in Ha Noi</h2>
						<ul>{posts}</ul>
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
