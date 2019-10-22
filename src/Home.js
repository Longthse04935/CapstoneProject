import React, { Component } from 'react';
import "font-awesome/css/font-awesome.min.css";
import $ from 'jquery';
import {Link} from 'react-router-dom';
import Rated from './Rated';
class Home extends Component {

    constructor(props) {
        super(props);     
        let initPosts = [{
              "post_id": "",
              "title": "",
              "video_link": "",
              "picture_link": [],
              "total_hour": 1,
              "description": "",
              "including_service": [],
              "active": true,
              "location": "",
              "price": 0,
              "rated": 0,
              "reasons": null
        }];

        this.state = {
              posts: initPosts,

        };
  }

    async componentDidMount(){
        //add css with jquery
        $("head").append('<link href="/css/profile.css" rel="stylesheet"/>');
        $("head").append('<link href="/css/login.css" rel="stylesheet"/>');
        //read more and read less
        $('.moreless-button').click(function () {
            $('.moretext').slideToggle();
            if ($('.moreless-button').text() === "Read more") {
                $(this).text("Read less")
            } else {
                $(this).text("Read more")
            }
        });
    
        //show and hide comment
        var size_li = $(".listReview li").length;
        $('#showLess').hide();
        var x = 3;
        $('.listReview li:lt(' + x + ')').show();

        $('#loadMore').click(function () {
           x = (x + 3 <= size_li) ? x + 3 : size_li;
            $('.listReview li:lt(' + x + ')').show(500);
            if(x > 3){
                $('#showLess').show();
            }
            if(x === size_li){
                $('#loadMore').hide();
            }
        });
        $('#showLess').click(function () {
            var x = (x - 3 < 3) ? 3 : x - 3;
            $('.listReview li').not(':lt(' + x + ')').hide(500);
            if (x <= 3) {
                $('#showLess').hide();
            }if(x < size_li){
                $('#loadMore').show();
            }
        });
        
        
        try {
            const responsePosts = await fetch("http://localhost:8080/guiderpost/postOfOneGuider?guider_id=" + this.props.guiderId);

            if (!responsePosts.ok) { throw Error(responsePosts.status + ": " + responsePosts.statusText); }

            const post = await responsePosts.json();

            this.setState({ posts: post });
      } catch (err) {
            console.log(err);
      }
        console.log(this.state.posts);
    }


    render() {
        let posts = this.state.posts.map((post, index) =>           
                  <li key={index}>
                        <div className="sheet">
                              <button className="unlike">
                                    <i className="fa fa-heart"></i>
                              </button>
                              <button className="like">
                                    <i className="fa fa-heart"></i>
                              </button>
                              <div className="imageFigure">
                                    <img src="./img/1.jpg" alt="logo" width="42" height="42" />
                              </div>
                              <div className="experienceCard-details">
                                    <div className="experienceAvatarCardContainer">
                                          <div className="experienceAvatarCard1">
                                                <img src="./img/2.jpg" alt="logo" width="64" height="64" />
                                          </div>
                                    </div>
                                    <span className="enjoy">Enjoy <span className="withName">{post.post_id}</span></span>
                                    <h3><Link to={"/post/" + post.post_id}>{post.title}</Link></h3>
                                    <div className="price">
                                          <span>${post.price}</span>
                                          <span className="experienceCard-topDetails-bullet">&#9679;</span>
                                          <span className="experienceCard-topDetails-duration">{post.total_hour} hours</span>
                                          <span class="experienceCard-topDetails-bullet"> &#9679;</span>
                                          <span data-translatekey="Experience.SubcategoryOrTag.day-trip">Day
                                                trip</span>
                                    </div>
                                    <div className="experienceCard-bottomDetails">
                                          <Rated number="5" />
                                          <span className="colorShared">1249 |</span>
                                            <span className="colorShared">
                                                <i className="fa fa-bolt" /> |
                                            </span>
                                          <span className="colorShared"><i className="fa fa-car" /></span>
                                    </div>
                              </div>
                        </div>
                  </li>
            );

        return (
            <div>
                <div>
                <div id="reactContainer">
                    {/* Menubar */}
           
                    {/* End MenuBar */}
                    {/*  Content  */}
                    <div className="content">
                    <div className="content-left">
                        <div className="profile-box">
                        <div className="pb-header header-stick">
                            <div className="header-pb">
                            <h1 className="TitlePb TileStickyPb">Lucia</h1>
                            <h2 className="TitlePb TileStickyPb">The Life Lover</h2>
                            <div className="Rating">
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                250 reviews
                            </div>
                            </div>
                            <div>
                            <img
                                className="pf-avatar"
                                src="https://withlocals-com-res.cloudinary.com/image/upload/w_80,h_80,c_thumb,q_auto,dpr_1.0,f_auto/956bda712df856f552fa7bfebbbcce8f"
                            />
                            </div>
                        </div>
                        <p className="ListItem">
                            <span className="ListItemIcon">
                          <i className="fa fa-map-marker" aria-hidden="true"></i>
                            </span>
                            <span className="ListItemText">I live in</span>
                        </p>
                        <p className="ListItem">
                            <span className="ListItemIcon">
                            <i className="fa fa-globe" />
                            </span>
                            <span className="ListItemText">I speak</span>
                        </p>
                        <p className="ListItem">
                            <span className="ListItemIcon">
                            <i className="fa fa-heart" />
                            </span>
                            <span className="ListItemText">My passions are</span>
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
                        <button className="BtnContact">Contact me</button>
                        </div>
                    </div>
                    <div className="content-right">
                    <div className="bookOffers">
                            <h2>Book one of my offers in Ha Noi</h2>
                            <ul>
                                {posts}
                            </ul>
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

export default Home;