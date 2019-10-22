import React from 'react';
import Rated from './Rated';

class ReviewInPost extends React.Component {
      constructor(props) {
            super(props);
            let obj = [{
                  "review_id": "",
                  "post_id": "",
                  "guider_id": "",
                  "review": "",
                  "rated_star": 1,
                  "date": ""
            }];

            this.state = { reviews: obj };

      }
      async componentDidMount() {
            try {
                  const response = await fetch("http://localhost:8080/review/reviewByPostId?post_id=" + this.props.postId );
                  if (!response.ok) { throw Error(response.status + ": " + response.statusText); }
                  const review = await response.json();
                  this.setState({ reviews: review });
                  console.log(this.state.reviews);
            } catch (err) {
                  console.log(err);
            }

      }
      render() {
            const showReview = this.state.reviews.map((review, index) => 
                  <li key={index}>
                        <div className="review">
                              <div className="reviewContainer">
                                    <img className="defaultLogo" src="./img/defaultAvatarComment.webp" alt="logo" />
                                    <div className="reviewInfo">
                                          <div className="nickName">AnnaBanana</div>
                                          <Rated number={review.rated_star}/>
                                          <div className="dateComment">{review.date}</div>
                                    </div>
                                    <div className="commentDetails">{review.review}</div>
                                    <span className="reviewTitle">The Local!</span>
                              </div>
                        </div>
                  </li>
            );
            return (
                  <div className="content-right">
                        <ul className="listReview">
                              <h2>Reviews</h2>
                              {showReview}
                        </ul>
                  </div>
            );
      }
}


export default ReviewInPost;
