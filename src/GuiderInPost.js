import React from 'react';
import "font-awesome/css/font-awesome.min.css";
import {Link} from 'react-router-dom';
class GuiderInPost extends React.Component {
      constructor(props) {
            super(props);
            this.state = {guider:[]};
      }
      async componentDidMount() {
            try {
                  const response = await fetch("http://localhost:8080/guider/" + this.props.guiderId);
                  if (!response.ok) { throw Error(response.status + ": " + response.statusText); }
                  const guider = await response.json();
                  this.setState({guider});
            } catch (err) {
                  console.log(err);
            }

      }
      render() {
            let guide = this.state.guider;
            return (
                  <div className="profile-box">
                        <div className="pb-header header-stick">
                        <div className="header-pb">
                            <h1 className="TitlePb TileStickyPb">{guide.first_name + "" + guide.last_name}</h1>
                            <h2 className="TitlePb TileStickyPb">The Life Lover</h2>
                            <div className="Rating">
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                250 reviews
                            </div>
                        </div>
                        <div>
                            <img className="pf-avatar"
                                src="https://withlocals-com-res.cloudinary.com/image/upload/w_80,h_80,c_thumb,q_auto,dpr_1.0,f_auto/956bda712df856f552fa7bfebbbcce8f"/>
                        </div>
                    </div>
                    <p className="ListItem">
                        <span className="ListItemIcon">
                            <i className="fa fa-map-marker"></i>
                        </span>
                        <span className="ListItemText">
                            I live in {guide.city}
                        </span>
                    </p>
                    <p className="ListItem">
                        <span className="ListItemIcon">
                            <i className="fa fa-globe"></i>
                        </span>
                        <span className="ListItemText">
                            I speak {guide.languages}
                        </span>
                    </p>
                    <p className="ListItem">
                        <span className="ListItemIcon">
                            <i className="fa fa-heart"></i>
                        </span>
                        <span className="ListItemText">
                            My passions are
                        </span>
                    </p>
                    <p className="ListItem">
                        <span className="ListItemIcon">
                        <i className="fa fa-shield" aria-hidden="true"></i>
                        </span>
                        <span className="ListItemText">Verified</span>
                    </p>
                    <p className="ListItem">
                        <span className="ListItemIcon">
                        <i className="fa fa-clock-o" aria-hidden="true"></i>
                        </span>
                        <span className="ListItemText">Response time</span>
                    </p>
                    <Link to={"/chatbox/"+ this.props.postId}><button className="BtnContact">Contact me</button></Link>
                  </div>
            );
      }

}

export default GuiderInPost;