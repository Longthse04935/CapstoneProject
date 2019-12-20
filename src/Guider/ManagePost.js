import React, { Component } from "react";
import "font-awesome/css/font-awesome.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Rated from "./Rated";
import GuiderInPost from "./GuiderInPost";
import EditPost from "./EditPost";
import Config from "../Config";
import { connect } from "react-redux";
class ManagePost extends Component {
  constructor(props) {
    super(props);
    console.log("constructor pót");
    console.log(props);
    this.state = {
      currentPage: 1,
      todosPerPage: 8,
      posts: [],
      page: 0
    };
  }
  // componentWillMount() {
  //       console.log(this.props);
  // 	var user = JSON.parse(sessionStorage.getItem('user'));
  // 	if (user !== null) {
  // 		console.log("session storage");
  // 	}
  // }

  async componentDidMount() {
    //console.log(this.props);
    try {
      let guider_id = this.props.user.id;
      const responsePosts = await fetch(
        Config.api_url +
          "guiderpost/postOfOneGuider/" +
          guider_id +
          "/" +
          this.state.page,
        {
          method: "GET",
          mode: "cors",
          credentials: "include",
          headers: {
            Accept: "application/json"
          }
        }
      );

      if (!responsePosts.ok) {
        throw Error(responsePosts.status + ": " + responsePosts.statusText);
      }

      const posts = await responsePosts.json();

      this.setState({ posts: posts, page: ++this.state.page });
    } catch (err) {
      console.log(err);
    }
  }

  handleCurrentPage = event => {
    this.setState({
      currentPage: event.target.id
    });
  };

  render() {
    console.log(this.props);
    // Link to={"/update/"+this.props.guiderId+"/" + post.post_id}
    let posts = this.state.posts.map((post, index) => (
      <Link to={"/update/"+this.props.guiderId+"/" + post.post_id}>
        <li key={index}>
          <div className="sheet">
            <div className="imageFigure">
              <img src={post.picture_link[0]} alt="logo" />
            </div>
            <div className="experienceCard-details">
              {/* <span className="enjoy">
								Enjoy <span className="withName">{post.title}</span>
								</span> */}
              <h3 className="h3PostResult">
                <span>{post.title}</span>
              </h3>
              <div className="price">
                <i className="fa fa-money" aria-hidden="true"></i>
                <span>{" " + post.price}$</span>
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
                {post.total_hour > 24 ? (
                  <span>
                    <i className="fa fa-moon-o" aria-hidden="true"></i>
                    <span data-translatekey="Experience.SubcategoryOrTag.day-trip">
                      {" "}
                      Long trip
                    </span>
                  </span>
                ) : (
                  <span>
                    <i className="fa fa-sun-o" aria-hidden="true"></i>
                    <span data-translatekey="Experience.SubcategoryOrTag.day-trip">
                      {" "}
                      Day trip
                    </span>
                  </span>
                )}
              </div>
              <div className="experienceCard-bottomDetails">
                <Rated number={post.rated} />
              </div>
            </div>
          </div>
        </li>
      </Link>
    ));
    // let routes = this.state.posts.map((post, index) => (
    //       <Route path={"/update/:guider/:post"} key={index} component={EditPost} />

    // ));

    //<EditPost guiderId={this.props.guiderId} postId={post.post_id} /></Route>
    return (
      <div>
        {/* <Switch>
                              {routes}
                        </Switch> */}
        <div>
          <div id="reactContainer">
            {/*  Content  */}
            <div className="content">
                <div className="bookOffers guiderResult" id="managePost">
                <h2>All post of mine</h2>
                  <ul className="postOneGuider" style={{width:'100%'}}>{posts}</ul>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const user = state.user;
  return { user };
}
export default connect(mapStateToProps)(ManagePost);
