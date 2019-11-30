import React, { Component } from "react";
import Config from './Config';
import SweetAlert from 'react-bootstrap-sweetalert';
import {Link} from 'react-router-dom';
import Rated from './Rated';
import $ from 'jquery';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      category: [],
      alert:null,
      posts:[],
      postsContribute:[],
      tours:[],
      slideShow: [
        'images/hoguom.jpg',
        'images/danang.jpg',
        'images/buncha.jpg',
        'images/dinhdoclap.jpg',
        'images/hanoi.jpg',
        'images/hoguom.jpg',
        'images/phobo.jpg'
      ],
      currentIndex:0
    };
  }

  async componentWillMount(){

    const responseRate = await fetch(
      Config.api_url + "Guider/getTopGuiderByRate",
      {
        method: "GET",
        mode: "cors",
        credentials: "include"
      }
    );
    if (!responseRate.ok) {
      throw Error(responseRate.status + ": " + responseRate.statusText);
    }

    const responseContribute = await fetch(
      Config.api_url + "Guider/getTopGuiderByRate",
      {
        method: "GET",
        mode: "cors",
        credentials: "include"
      }
    );
    if (!responseContribute.ok) {
      throw Error(responseContribute.status + ": " + responseContribute.statusText);
    }

    const responseTour = await fetch(
      Config.api_url + "guiderpost/getTopTour",
      {
        method: "GET",
        mode: "cors",
        credentials: "include"
      }
    );
    if (!responseTour.ok) {
      throw Error(responseTour.status + ": " + responseTour.statusText);
    }

    const posts = await responseRate.json();
    const postsContribute = await responseContribute.json();
    const tours = await responseTour.json();
    this.setState({ posts,postsContribute,tours });

  }

  onNotification(){
    this.setState({alert:null});
    sessionStorage.setItem('messagePay','');
  }

  notification(notification){
    const getAlert = () => (
      <SweetAlert
        warning
        confirmBtnText="This is notification for you"
        confirmBtnBsStyle="danger"
        title="Notification"
        onConfirm={()=>this.onNotification()}
      >
        {notification}
      </SweetAlert>
    );

    this.setState({
      alert: getAlert()
    });
  }

  async componentDidMount() {
    $('.search-4ul6i').focus(function () {
        $('.fillter-4ul6i').show();

    });
    $(document).mouseup(function (e) {
        if (!$('.Search-3ul6i').is(e.target) && !$('.fillter-4ul6i').is(e.target)
            && $('.Search-3ul6i').has(e.target).length === 0
            && $('.fillter-4ul6i').has(e.target).length === 0) {
            $('.fillter-4ul6i').hide();
        }
    });

    try {
      const responsePosts = await fetch(
        Config.api_url + "category/findAll"
      );
      if (!responsePosts.ok) {
        throw Error(responsePosts.status + ": " + responsePosts.statusText);
      }

      const category = await responsePosts.json();

      this.setState({ category});
    } catch (err) {
      console.log(err);
    }
    if(sessionStorage.getItem('messagePay')){
      var messagePay = sessionStorage.getItem('messagePay');
      if(messagePay ==='Error user or tour inf'){
        this.notification("You are not logged in. Please login or register to use service mywebsite!!");
      }else if(messagePay === 'You are Guider'){
        this.notification("You do not have access to here");
      }
    }

    this.setupInterval();

    window.onscroll = function() {
      if(window.pageYOffset === 0) {
        $( "#navbar" ).css({'background':'none','border-bottom':'none'});
        $('.navbarRightContent ul li').css({'color':'black','font-size':'18px'});
      }
    };

  }

  setupInterval = () => {
    let intervalId = setInterval(this.commonNext, 5000);
    this.setState({ intervalId: intervalId });
    
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
    window.onscroll = null;
 }

  commonNext  = () => {
    let { currentIndex, slideShow } = this.state;
    currentIndex++;
    if(currentIndex >= slideShow.length) {
      currentIndex = 0;
    }
    this.setState({ currentIndex });
  }

  handleChange = (category_name) =>{
    window.sessionStorage.setItem('category_name',category_name);
  }

  render() {
    let {currentIndex, slideShow} = this.state;
    let src = Config.api_url+slideShow[currentIndex];
    let tour = this.state.category.map((tour,index) => {
       return ( <li key={index}>
        <img src={`${Config.api_url}images/${tour.category}.jpg`}/>
        <Link to={"/posttour/"+tour.category_id} onClick={() => {this.handleChange(tour.category)}}><button className="categoriesTour">{tour.category} tour</button></Link>
         
        </li>
       )
    });

    let guiderByRate = this.state.posts.map((post,index) => (
      <div className="profile-box" key={index} >
            <div className="pb-header header-stick">
            <div className="header-pb">
                <h1 className="TitlePb TileStickyPb">{post.first_name + "" + post.last_name}</h1>
              
            </div>

        </div>
            <Rated number={post.rated} />
            <Link to={"/guider/"+post.guider_id}><button className="contactMe">About me</button></Link>
      </div>
    ));

    let guiderByContribute = this.state.postsContribute.map((post,index) => (
      <div className="profile-box" key={index} >
                        <div className="pb-header header-stick">
                        <div className="header-pb">
                            <h1 className="TitlePb TileStickyPb">{post.first_name + "" + post.last_name}</h1>
                          
                        </div>

                    </div>
                        <Rated number={post.rated} />
                        <Link to={"/guider/"+post.guider_id}><button className="contactMe">About me</button></Link>
                  </div>
    ));
      let slide = this.state.tours.map((value,index)=>(
        <div className="slideContent" key={index}>
          <h2>Enjoy our {value.title}</h2>
          <img src="/img/Night.jpg"/>
          <Link to={"/post/"+value.post_id}><button>Explore</button></Link>
        </div>
      ));

    return (
      
    <div>
        <div className="homeSlide">
          <img src={src}/>
          <div className="Title-e9h41">
            <h1>Book unique private tours and activities with locals worldwide</h1>
            <div className="Search-2ul6i">
            <div className="Search-3ul6i">
                            <label>
                                <input
                                    type="text"
                                    placeholder="Welcome to my website"
                                    name="search"
                                    autoComplete="off"
                                    className="search-4ul6i"
                                />
                                
                            </label>
                            <div className="fillter fillter-4ul6i">
                                <div className="filter-Content">
                                    <div className="localsOrExperience">
                                        <h3 className="explore">Explore TravelWlocals</h3>
                                        <div className="button-group">
                                            <button className="active">Guider</button>
                                            <button>Location</button>
                                        </div>
                                    </div>
                                    <div className="popularDestination">
                                        <h3 id="popularLabel">Popular Destinations</h3>
                                        <ul>
                                            <li>
                                                <i className="fa fa-map-marker" aria-hidden="true"></i>
                                                <a>Ha Noi</a>
                                            </li>
                                            <li>
                                                <i className="fa fa-map-marker" aria-hidden="true"></i>
                                                <a>Ho Chi Minh</a>
                                            </li>
                                            <li>
                                                <i className="fa fa-map-marker" aria-hidden="true"></i>
                                                <a>Da Nang</a>
                                            </li>
                                            <li>
                                                <i className="fa fa-map-marker" aria-hidden="true"></i>
                                                <a>Bac Ninh</a>
                                            </li>
                                            <li>
                                                <i className="fa fa-map-marker" aria-hidden="true"></i>
                                                <a>Da Lat</a>
                                            </li>
                                            <li>
                                                <i className="fa fa-map-marker" aria-hidden="true"></i>
                                                <a>Hue</a>
                                            </li>
                                            <li>
                                                <i className="fa fa-map-marker" aria-hidden="true"></i>
                                                <a>Vung Tau</a>
                                            </li>
                                            <li>
                                                <i className="fa fa-map-marker" aria-hidden="true"></i>
                                                <a>Hai Phong</a>
                                            </li>
                                            <li>
                                                <i className="fa fa-map-marker" aria-hidden="true"></i>
                                                <a>Phu Quoc</a>
                                            </li>
                                            <li>
                                                <i className="fa fa-map-marker" aria-hidden="true"></i>
                                                <a>Sapa</a>
                                            </li>
                                            <li>
                                                <i className="fa fa-map-marker" aria-hidden="true"></i>
                                                <a>Ca Mau</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
              <button className="Button-2i">Search</button>
            </div>
          </div>
        </div>

        <div className="categoryTour">  
        <h1>Explore Withlocals</h1>
        <h2 className="sectionSubtitle">
          <span data-translatekey="Homepage.Categories.subTitle">
            All of our tours and activities are:{" "}
            <span>• Private • Personalized • </span>{" "}
            <span>With the local of your choice</span>
          </span>
        </h2>
        <ul className="tourDetail">
        {tour}
        </ul>
        {this.state.alert}
        <h1 style={{marginTop:'30px',fontSize:'30px'}}>The travel is most appreciated</h1>
        <div className="coverTopTour">
          {slide}
        </div>
        <div className="topGuider">
          <div className="topGuiderByRate">
            <h1>Top guider by Rate</h1>
             <div className="content-left">
                {guiderByRate}
            </div> 
          </div>
          <div className="topGuiderByRate">
            <h1>Top guider by Contribute</h1>
            <div className="content-left">
                {guiderByContribute}
            </div>
          </div>
        </div>
      </div>
    
    </div>
    );
  }
}

export default Home;
