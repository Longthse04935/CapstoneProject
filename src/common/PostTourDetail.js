import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "font-awesome/css/font-awesome.min.css";
import Config from '../Config';
import Rated from '../Guider/Rated';
import TopGuider from '../Guider/TopGuider';
class PostTourDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataPostOneCategory: [],
			posts: [],
			postsContribute: [],
			locations: [],
			page: 0,
			pageCount:0,
			autheticate: {
				method: "GET",
				mode: "cors",
				credentials: "include",
				headers: {
					'Accept': 'application/json'
				}
			}
		};
	}

	async componentDidMount() {
		let {page,pageCount,autheticate} = this.state;
		try {
			const response = await fetch(
				Config.api_url + "location/findAll",
				autheticate);
			if (!response.ok) {
				throw Error(response.status + ": " + response.statusText);
			}

			const totalPage = await fetch(
				Config.api_url + "guiderpost/allPostOfOneCategoryPageCount/"+this.props.match.params.id,
				autheticate);
			if (!totalPage.ok) {
				throw Error(totalPage.status + ": " + totalPage.statusText);
			}
			pageCount = await totalPage.json();
			pageCount++;

			const locations = await response.json();
			this.setState({locations,pageCount});
			this.loadPost(autheticate,page);
		} catch (err) {
			console.log(err);
		}


	}
	loadPost = async (autheticate,page)=>{
		const responsePosts = await fetch(
			Config.api_url + "guiderpost/allPostOfOneCategory/" + this.props.match.params.id + "/" + page,
			autheticate);

		if (!responsePosts.ok) {
			throw Error(responsePosts.status + ": " + responsePosts.statusText);
		}
		const dataPostOneCategory = await responsePosts.json();
		this.setState({ dataPostOneCategory});
	}

	handleCurrentPage = (currentPage) => {
		let {autheticate} = this.state;
		this.loadPost(autheticate,currentPage);
		this.setState({
			page: currentPage
		});
	}

	range = (start, end) => {
		var ans = [];
		for (let i = start; i <= end; i++) {
			ans.push(i);
		}
		return ans;
	}

	render() {
		const data = this.state.dataPostOneCategory;
		const {locations,pageCount,page} = this.state;
		const range = this.range(0, pageCount - 1);
		let renderPageNumbers = range.map((i) => (
				<button
					key={i}
					id={i}
					onClick={()=>this.handleCurrentPage(i)}
					className={page === i ? "currentPage" : ''}
				>
					{i+1}
				</button>
			)
		);

		let category_name = window.sessionStorage.getItem('category_name');

		let showTour = data.map((post, index) => {
			let link_youtube = post.video_link;
			if (link_youtube.includes('youtu.be')) {
				link_youtube = link_youtube.replace("youtu.be", "youtube.com/embed");

			} else {
				link_youtube = link_youtube.split("&");
				link_youtube = link_youtube[0].replace("watch?v=", "embed/");
			}
			let imgSrc = post.picture_link[0];
			let result = locations.find(location => location.location_id === post.location_id);

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

					<TopGuider />
				</div>
			</div>
		);
	}
}

export default PostTourDetail;