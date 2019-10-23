import React, { Component } from "react";
import "font-awesome/css/font-awesome.min.css";
import $ from "jquery";
import { Link, Route, Switch } from 'react-router-dom';
import Rated from "./Rated";
import PostDetail from './PostDetail';
import GuiderInPost from './GuiderInPost';
import GuiderDetail from './GuiderDetail';
class GuiderAllPost extends Component {
  constructor(props) {
    super(props);
    let initPosts = [
      {
        post_id: "",
        title: "",
        video_link: "",
        picture_link: [],
        total_hour: 1,
        description: "",
        including_service: [],
        active: true,
        location: "",
        price: 0,
        rated: 0,
        reasons: null
      }
    ];

    this.state = {
      posts: initPosts
    };
  }

  async componentDidMount() {
    //add css with jquery
    $("head").append('<link href="/css/tour.css" rel="stylesheet"/>');
    $("head").append('<link href="/css/profile.css" rel="stylesheet"/>');
    $("head").append('<link href="/css/login.css" rel="stylesheet"/>');
   

    try {
      const responsePosts = await fetch(
        "http://localhost:8080/guiderpost/postOfOneGuider?guider_id=" +
          this.props.guiderId
      );

      if (!responsePosts.ok) {
        throw Error(responsePosts.status + ": " + responsePosts.statusText);
      }

      const post = await responsePosts.json();

      this.setState({ posts: post });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
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
              <Link to={"/post/" + post.post_id}>{post.title}</Link>
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

    const switches = this.state.posts.map((post, index) => (
      <Route path={"/post/" + post.post_id} key={index}>
        <PostDetail postId={post.post_id} />
      </Route>
    ));

    return (
      <div>
        <div>
          <div id="reactContainer">
            {/*  Content  */}
            <div className="content">
              <div className="content-left">
              <GuiderInPost guiderId={this.props.guiderId} />
              </div>
              <div className="content-right">
                <Switch>
                  <Route path={"/guider"}>
                    <GuiderDetail guiderId={this.props.guiderId} />
                  </Route>
                  {switches}
                </Switch>
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

export default GuiderAllPost;
