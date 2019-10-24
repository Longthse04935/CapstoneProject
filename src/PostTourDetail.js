import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import "font-awesome/css/font-awesome.min.css";
class PostTourDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
          dataPostOneCategory: []
        };
      }
      async componentDidMount() {
        try {
          const responsePosts = await fetch(
            "http://localhost:8080/guiderpost/allPostOfOneCategory?category_id="+this.props.match.params.id);
    
          if (!responsePosts.ok) {
            throw Error(responsePosts.status + ": " + responsePosts.statusText);
          }
    
          const dataPostOneCategory = await responsePosts.json();
    
          this.setState({ dataPostOneCategory});
          console.log(this.state.dataPostOneCategory);
        } catch (err) {
          console.log(err);
        }
      }
    render() {
        const data = this.state.dataPostOneCategory;
        return (
            <div className='postInTour'>
                <h2>All posts about {this.props.match.params.type} </h2>
                <div className="contentTour">
                    {
                        data.map((post) => {
                            return ( 
                                <div className="contentTourDetail">
                                    <video controls>
                                        <source src='/video/Food_Tour-1_m8apyj.webm' type="video/mp4" />
                                    </video>
                                    <h2>{post.title}</h2>
                                    <p>{post.description}</p>
                                    <p>Price:{post.price}$</p>
                                    <p>Location:{post.location}</p>
                                    <div class="Rating">
                                        Rated:
                                        <i className="fa fa-star-half-o"></i>
                                        <i className="fa fa-star-half-o"></i>
                                        <i className="fa fa-star-half-o"></i>
                                        <i className="fa fa-star-half-o"></i>
                                        <i className="fa fa-star-half-o"></i>
                                    </div>
                                    <Link to="/guiderallpost">Watch my post</Link>
                                </div>
                            )
                            })
                    }
                   
                </div>
            </div>
        );
    }
}

export default PostTourDetail;