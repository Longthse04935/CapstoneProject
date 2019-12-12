import React, { Component } from "react";
import "font-awesome/css/font-awesome.min.css";
import { Link, Route, Switch } from 'react-router-dom';
import Rated from "./Rated";
import GuiderInPost from './GuiderInPost';
import EditPost from './EditPost';
import Config from '../Config';
class GuiderAllPost extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentPage: 1,
			todosPerPage: 8,
			posts: [],
			guider_id:"",
			page: 0
		};
	}

	async componentDidMount() {
		try {
			let guider_id = this.props.match.params.guider_id;
			const responsePosts = await fetch(
				Config.api_url + "guiderpost/postOfOneGuider/" + guider_id+"/"+this.state.page,
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
			this.setState({ posts:posts,guider_id:guider_id,page: ++this.state.page });
		} catch (err) {
			console.log(err);
		}
	}

	handleCurrentPage = (event) => {
	  this.setState({
	    currentPage: event.target.id
	  });
	}

	render() {
		
		let data = this.state.posts;
		let { currentPage, todosPerPage,guider_id } = this.state;
		let user = sessionStorage.getItem('user');
		// Logic for displaying todos
		let indexOfLastTodo = currentPage * todosPerPage;
		let indexOfFirstTodo = indexOfLastTodo - todosPerPage;
		let currentdata = data.slice(indexOfFirstTodo, indexOfLastTodo);

		// Logic for displaying page numbers
		let pageNumbers = [];
		for (let i = 1; i <= Math.ceil(data.length / todosPerPage); i++) {
		  pageNumbers.push(i);
		}

		let renderPageNumbers = pageNumbers.map(number => {
		  return (
		    <button
		      key={number}
		      id={number}
		      onClick={this.handleCurrentPage}
		      className={currentPage === number ? 'currentPage' : ''}
		    >
		      {number}
		    </button>
		  );
		});
		let posts = currentdata.map((post, index) => (
			<li key={index}>
			<div className="sheet">
			  <div className="imageFigure">
				<img src={post.picture_link[0]} alt="logo" />
			  </div>
			  <div className="experienceCard-details">
				<span className="enjoy">
				  Enjoy <span className="withName">{post.title}</span>
				</span>
				<h3>
					<Link to={"/post/" + post.post_id}>
					<span>
					{post.description}
				  </span>
					</Link>
				</h3>
				<div className="price">
				<i className="fa fa-money" aria-hidden="true"></i><span>{" "+post.price}$</span>
				  <span className="experienceCard-topDetails-bullet">
					{" "}
					&#9679;{" "}
				  </span>
				  <i className="fa fa-hourglass-half" aria-hidden="true"></i>
				  <span className="experienceCard-topDetails-duration">
					{" "+post.total_hour} hours
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
		
		

		return (
			<div>
				<div>

					<div id="reactContainer">
						{/*  Content  */}
						<div className="content">
							<div className="content-right">
								<div className="bookOffers">
									<h2>Book one of my offers in Ha Noi</h2>
									<ul>{posts}</ul>
								</div>
								<div className="pagination">
						<div className="paginationContent">
							{renderPageNumbers}
						</div>
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

export default GuiderAllPost;
