import React from 'react';
import ReviewInPost from './ReviewInPost';
import PlanInPost from './PlanInPost';

class PostDetail extends React.Component {
	constructor(props) {
		super(props);
		let obj = {
			"title": "",
			"video_link": "",
			"picture_link": [],
			"total_hour": 1,
			"description": "",
			"including_service": [],
			"active": true,
			"location": ""
		};
		this.state = { postInfo: obj };
	}
	async componentDidMount() {
		try {
			const response = await fetch("http://localhost:8080/guiderpost/post/" + this.props.postId);
			if (!response.ok) { throw Error(response.status + ": " + response.statusText); }
			const post = await response.json();
			this.setState({ postInfo: post });
			console.log(this.state.postInfo);
		} catch (err) {
			console.log(err);
		}

	}

	render() {
		let postInfo = this.state.postInfo;
		return (

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
					<span><strong>Including:</strong>{postInfo.including_service.join(" • ")}</span>
				</div>
				

				<ReviewInPost postId={this.props.postId} />
				
				<PlanInPost postId={this.props.postId} />
				<button className="serve">How can I serve you!!</button>
			</div>

		);
	}


}



export default PostDetail;
