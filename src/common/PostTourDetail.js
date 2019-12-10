import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "font-awesome/css/font-awesome.min.css";
import Config from '../Config';
import Rated from '../Guider/Rated';
class PostTourDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPage: 1,
			todosPerPage: 4,
			dataPostOneCategory: [],
			posts: [],
			postsContribute: [],
			locations: [],
			page: 0
		};
	}

	async componentDidMount() {
		let autheticate = {
			method: "GET",
			mode: "cors",
			credentials: "include",
			headers: {
				'Accept': 'application/json'
			}
		}
		try {
			const responseRate = await fetch(
				Config.api_url + "Guider/getTopGuiderByRate",
				autheticate
			);
			if (!responseRate.ok) {
				throw Error(responseRate.status + ": " + responseRate.statusText);
			}

			const responseContribute = await fetch(
				Config.api_url + "Guider/getTopGuiderByRate",
				autheticate
			);
			if (!responseContribute.ok) {
				throw Error(
					responseContribute.status + ": " + responseContribute.statusText
				);
			}

			const responsePosts = await fetch(
				Config.api_url + "guiderpost/allPostOfOneCategory/" + this.props.match.params.id + "/" + this.state.page,
				autheticate);

			if (!responsePosts.ok) {
				throw Error(responsePosts.status + ": " + responsePosts.statusText);
			}

			const responseLocations = await fetch(
				Config.api_url + "location/findAll",
				autheticate);

			if (!responsePosts.ok) {
				throw Error(responsePosts.status + ": " + responsePosts.statusText);
			}

			const dataPostOneCategory = await responsePosts.json();
			const posts = await responseRate.json();
			const postsContribute = await responseContribute.json();
			const locations = await responseLocations.json();
			this.setState({ dataPostOneCategory, posts, postsContribute, locations, page: ++this.state.page });
			console.log(dataPostOneCategory);
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
		const data = this.state.dataPostOneCategory;
		const { currentPage, todosPerPage, locations } = this.state;

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
					className={currentPage === number ? 'currentPage' : ''}
				>
					{number}
				</button>
			);
		});
		let category_name = window.sessionStorage.getItem('category_name');

		let showTour = currentdata.map((post, index) => {
			let link_youtube = post.video_link;
			if (link_youtube.includes('youtu.be')) {
				link_youtube = link_youtube.replace("youtu.be", "youtube.com/embed");

			} else {
				link_youtube = link_youtube.split("&");
				link_youtube = link_youtube[0].replace("watch?v=", "embed/");
			}
			let imgSrc = Config.api_url + "images/" + post.picture_link[0];
			let result = locations.find(location => location.location_id === post.location_id);
			console.log(result);
			return (
				<div className="contentTourDetail" key={index}>
					<iframe
						src={link_youtube}
						frameBorder="0"
						allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
					></iframe>
					<img src={imgSrc} className="imgTourDetail" />
					<h2 style={{ height: '72px', overflow: 'hidden' }}>{post.title}</h2>
					<p className="postDestTour">{post.description}</p>
					<p>Price of trip:<span style={{ color: 'rgb(59, 241, 3)', fontWeight: '600' }}>{" " + post.price}$</span></p>
					<p>Meeting Location:<span style={{ color: 'rgb(59, 241, 3)', fontWeight: '600' }}>{" " + result.location}</span></p>
					<div className="RatingTour">
						<span style={{ fontWeight: '600' }}>Rated:</span>
						<Rated number={post.rated} />
					</div>
					<Link to={"/post/" + post.post_id}>Watch my post</Link>
				</div>
			)
		})

		let guiderByRate = this.state.posts.map((post, index) => {
			let bgImg = Config.api_url + "images/" + post.avatar;
			return (
				<div className="profile-box" key={index} >
					<div className="pb-header header-stick">
						<div className="header-pb">
							<h1 className="TitlePb TileStickyPb">
								{post.first_name + "" + post.last_name}
							</h1>
						</div>
					</div>
					<img src={bgImg} className="imgpb-header" />
					<Rated number={post.rated} />
					<Link to={"/guider/" + post.guider_id}>
						<button className="contactMe">About me</button>
					</Link>
				</div>
			);
		});

		let guiderByContribute = this.state.postsContribute.map((post, index) => {
			let bgImg = Config.api_url + "images/" + post.avatar;
			// style={{backgroundImage: `url(${bgImg})`}};
			return (
				<div className="profile-box" key={index} >
					<div className="pb-header header-stick">
						<div className="header-pb">
							<h1 className="TitlePb TileStickyPb">
								{post.first_name + "" + post.last_name}
							</h1>
						</div>
					</div>
					<img src={bgImg} className="imgpb-header" />
					<Rated number={post.rated} />
					<Link to={"/guider/" + post.guider_id}>
						<button className="contactMe">About me</button>
					</Link>
				</div>
			)
		});

		return (
			<div>
				<div className='postInTour'>
					<h2>All trips about {category_name} </h2>
					<div className="contentTour">
						{
							showTour
						}
					</div>
					<div className="pagination">
						<div className="paginationContent">
							{renderPageNumbers}
						</div>
					</div>
				</div>

				<div className="categoryTour">

					<div className="topGuider">
						<div className="topGuiderByRate">
							<h1>Top guider by Rate</h1>
							<div className="content-left">{guiderByRate}</div>
						</div>
						<div className="topGuiderByRate">
							<h1>Top guider by Contribute</h1>
							<div className="content-left">{guiderByContribute}</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default PostTourDetail;