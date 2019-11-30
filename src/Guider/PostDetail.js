import React from "react";
import ReviewInPost from "../Guider/ReviewInPost";
import PlanInPost from "./PlanInPost";
import GuiderInPost from "./GuiderInPost";
import Rated from "../Rated";
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
      guider: {}
    };
  }
  async componentDidMount() {
    $("html").animate({ scrollTop: 0 }, 500, "swing");
    const post_id = this.props.match.params.post_id;

    try {
      const response2 = await fetch(
        Config.api_url + "Guider/guiderByPostId?post_id=" + post_id,
        {
          method: "GET",
          mode: "cors",
          credentials: "include"
        }
      );
      if (!response2.ok) {
        throw Error(response2.status + ": " + response2.statusText);
      }
      const guider = await response2.json();
      this.setState({ guider });

      const response = await fetch(
        Config.api_url + "guiderpost/findSpecificPost?post_id=" + post_id,
        {
          method: "GET",
          mode: "cors",
          credentials: "include"
        }
      );
      if (!response.ok) {
        throw Error(response.status + ": " + response.statusText);
      }

      const responsePosts = await fetch(
        Config.api_url +
          "guiderpost/postOfOneGuider?guider_id=" +
          guider.guider_id,
        {
          method: "GET",
          mode: "cors",
          credentials: "include"
        }
      );
      if (!responsePosts.ok) {
        throw Error(responsePosts.status + ": " + responsePosts.statusText);
      }

      window.sessionStorage.setItem("guider_id", "" + guider.guider_id);

      const postInfo = await response.json();
      this.setState({ postInfo });

      const posts = await responsePosts.json();
      this.setState({ posts });
      let link_youtube = postInfo.video_link;
      if(link_youtube.includes('youtu.be')){
        link_youtube = link_youtube.replace("youtu.be","youtube.com/embed");
        this.setState({link_youtube});
      }else{
        link_youtube = link_youtube.split("&");
        this.setState({link_youtube:link_youtube[0].replace("watch?v=","embed/")});
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
              <span
                onClick={() => this.handleGotoPage(post.post_id, guider_id)}
              >
                {post.title}
              </span>
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
                    {/* <video
                      controls="controls"
                      class="video-stream"
                      x-webkit-airplay="allow"
                      data-youtube-id="N9oxmRT2YWw"
                      src={postInfo.video_link}
                    ></video> */}
                    {/* <iframe src={postInfo.video_link}>
                    </iframe> */}
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
                        <span>Food tour</span>
                      </li>
                      <li>
                        <i className="fa fa-hourglass-end" />
                        <span>{postInfo.total_hour} hours</span>
                      </li>
                      <li>
                        <i className="fa fa-bicycle" aria-hidden="true"></i>
                        <span>Walking tour</span>
                      </li>
                      <li>
                        <i className="fa fa-users" />
                        <span>Private tour. Only you and your host</span>
                      </li>
                    </ul>
                    <i className="fa fa-sticky-note" />
                    <span>
                      <strong>Including:</strong>
                      {postInfo.including_service}
                    </span>
                  </div>

                  <ReviewInPost postId={post_id} />

                  <PlanInPost postId={post_id} />
                  <button className="serve">How can I serve you!!</button>
                </div>

                <div className="bookOffers">
                  <h2>Book one of my offers in Ha Noi</h2>
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