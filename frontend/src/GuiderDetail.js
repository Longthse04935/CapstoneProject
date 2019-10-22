import React from 'react';
import PostDetail from './PostDetail';
import Rated from './Rated';
import { Link, Route, Switch } from 'react-router-dom';
import Request from './Request';


class GuiderDetail extends React.Component {
	constructor(props) {
		super(props);
		let initPosts = [{
			"post_id": "",
			"title": "",
			"video_link": "",
			"picture_link": [],
			"total_hour": 1,
			"description": "",
			"including_service": [],
			"active": true,
			"location": ""
		}];
		let initGuider = {
			"guider_id": 0,
			"first_name": "",
			"last_name": "",
			"age": 0,
			"about_me": ".",
			"contribution_point": 0,
			"city": "",
			"active": false,
			"languages": []
		};
		this.state = {
			posts: initPosts,
			guider: initGuider
		};
	}
	async componentDidMount() {
		try {
			const responsePosts = await fetch("http://localhost:8080/guiderpost/postOfOneGuider?guider_id=" + this.props.guiderId);
			const responseGuider = await fetch("http://localhost:8080/guider/" + this.props.guiderId);
			if (!responsePosts.ok) { throw Error(responsePosts.status + ": " + responsePosts.statusText); }
			if (!responseGuider.ok) { throw Error(responseGuider.status + ": " + responseGuider.statusText); }
			const post = await responsePosts.json();
			const guide = await responseGuider.json();
			this.setState({ posts: post, guider: guide });
		} catch (err) {
			console.log(err);
		}

	}

	render() {
		let guide = this.state.guider;
		

		return (

			<div className="content-right">
				<div class="intro">
					<h2>Hi There ! Nice to meet you</h2>
					<video controls>
						<source src="./video/withlocals_originals_silvina_merino.mp4" type="video/mp4" />
					</video>
					<div class="readMoreText">
						<div id="section">
							<div class="article">
								{guide.about_me}
							</div>
							<a class="moreless-button" href="javascript:void(0)">Read more</a>
						</div>
					</div>
				</div>
				<div class="myPassions">
					<h2>My passions</h2>
					{}
				</div>

			</div>

		);
	}


}



export default GuiderDetail;
