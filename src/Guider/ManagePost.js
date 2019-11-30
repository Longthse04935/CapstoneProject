import React, { Component } from "react";
import "font-awesome/css/font-awesome.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Rated from "../Rated";
import GuiderInPost from './GuiderInPost';
import EditPost from './EditPost';
import Config from '../Config';
class ManagePost extends Component {
      constructor(props) {
            super(props);

            this.state = {
                  currentPage: 1,
                  todosPerPage: 8,
                  posts: []
            };
      }

      async componentDidMount() {
            try {
                  let guider_id = this.props.guiderId;
                  const responsePosts = await fetch(
                        Config.api_url + "guiderpost/postOfOneGuider?guider_id=" + guider_id,
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

                  this.setState({ posts });
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
            console.log(this.props.guiderId);

            let posts = this.state.posts.map((post, index) => (
                  <li key={index}>
                        <div className="sheet">
                              <div className="imageFigure">
                                    <img src={post.picture_link[0]} alt="logo" width="42" height="42" />
                              </div>
                              <div className="experienceCard-details">
                                    <span className="enjoy">
                                          Enjoy <span className="withName">{post.post_id}</span>
                                    </span>
                                    <h3>
                                          <Link to={"/update/" + post.post_id}>{post.title}</Link>
                                    </h3>

                              </div>
                        </div>
                  </li>
            ));
            let routes = this.state.posts.map((post, index) => (
                  <Route path={"/update/" + post.post_id}><EditPost guiderId={this.props.guiderId} postId={post.post_id} /></Route>


            ));


            return (
                  <div>
                        <Switch>
                              {routes}
                        </Switch>
                        <div>

                              <div id="reactContainer">
                                    {/*  Content  */}
                                    <div className="content">
                                          <div className="content-left">

                                          </div>
                                          <div className="content-right">
                                                <div className="bookOffers">
                                                      <h2>Book one of my offers in Ha Noi</h2>
                                                      <ul>{posts}</ul>
                                                </div>



                                          </div>
                                    </div>
                              </div>
                              
                        </div>

                  </div>
            );
      }
}

export default ManagePost;
