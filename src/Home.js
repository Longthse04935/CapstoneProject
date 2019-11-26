import React, { Component } from "react";
import Config from './Config';
import SweetAlert from 'react-bootstrap-sweetalert';
<<<<<<< HEAD
import ReactDOM from 'react-dom';
import {Link } from "react-router-dom";
=======
import {Link} from 'react-router-dom';
import Rated from './Rated';
import $ from 'jquery';

>>>>>>> 3c70703810401a33fdb953b032fa75fa47a9a0b2
class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      category: [],
<<<<<<< HEAD
      guiders: [],
      alert:null
=======
      alert:null,
      posts:[],
      postsContribute:[],
      tours:[]
>>>>>>> 3c70703810401a33fdb953b032fa75fa47a9a0b2
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
    setTimeout(function() {
      window.loadSlideshow();
    }, 1000);
    

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
    
  }
  render() {
    let tour = this.state.category.map((tour,index) => {
       return ( <li key={index}>
        <img src={`/img/${tour.category}.jpg`}/>
        <a href={"/posttour/"+tour.category_id+"/"+tour.category} >{tour.category} tour</a>
        </li>
       )
    });


    let guiderByRate = this.state.posts.map((post,index) => (
      <div className="profile-box" key={index}>
                        <div className="pb-header header-stick">
                        <div className="header-pb">
                            <h1 className="TitlePb TileStickyPb">{post.first_name + "" + post.last_name}</h1>
                            <Rated number={post.rated}/>
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
                            I live in {post.city}
                        </span>
                    </p>
                    <p className="ListItem">
                        <span className="ListItemIcon">
                            <i className="fa fa-globe"></i>
                        </span>
                        <span className="ListItemText">
                            I speak {post.languages}
                        </span>
                    </p>
                    <p className="ListItem">
                        <span className="ListItemIcon">
                            <i className="fa fa-heart"></i>
                        </span>
                        <span className="ListItemText">
                            My passions are: {post.passion}
                        </span>
                    </p>
                    <p className="ListItem">
                        <span className="ListItemIcon">
                            <i className="fa fa-address-card" aria-hidden="true"></i>
                        </span>
                        <span className="ListItemText">
                            Age: {post.age}
                        </span>
                    </p>
                    <p className="ListItem">
                        <span className="ListItemIcon">
                            <i className="fa fa-ravelry" aria-hidden="true"></i>
                        </span>
                        <span className="ListItemText">
                            Contribution: {post.contribution}
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
                        <i className="fa fa-info-circle" aria-hidden="true"></i>
                        </span>
                        <span className="ListItemText">About me:{post.about_me}</span>
                    </p>
                        <Link to={"/guider/"+post.guider_id}><button className="BtnContact">Watch all my tour</button></Link>
                  </div>
    ));

    let guiderByContribute = this.state.postsContribute.map((post,index) => (
      <div className="profile-box" key={index}>
                        <div className="pb-header header-stick">
                        <div className="header-pb">
                            <h1 className="TitlePb TileStickyPb">{post.first_name + "" + post.last_name}</h1>
                            <Rated number={post.rated} />
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
                            I live in {post.city}
                        </span>
                    </p>
                    <p className="ListItem">
                        <span className="ListItemIcon">
                            <i className="fa fa-globe"></i>
                        </span>
                        <span className="ListItemText">
                            I speak {post.languages}
                        </span>
                    </p>
                    <p className="ListItem">
                        <span className="ListItemIcon">
                            <i className="fa fa-heart"></i>
                        </span>
                        <span className="ListItemText">
                            My passions are: {post.passion}
                        </span>
                    </p>
                    <p className="ListItem">
                        <span className="ListItemIcon">
                            <i className="fa fa-address-card" aria-hidden="true"></i>
                        </span>
                        <span className="ListItemText">
                            Age: {post.age}
                        </span>
                    </p>
                    <p className="ListItem">
                        <span className="ListItemIcon">
                            <i className="fa fa-ravelry" aria-hidden="true"></i>
                        </span>
                        <span className="ListItemText">
                            Contribution: {post.contribution}
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
                        <i className="fa fa-info-circle" aria-hidden="true"></i>
                        </span>
                        <span className="ListItemText">About me:{post.about_me}</span>
                    </p>
                        <Link to={"/guider/"+post.guider_id}><button className="BtnContact">Watch all my tour</button></Link>
                  </div>
    ));
      let slide = this.state.tours.map((value,index)=>(
        <div className="item" key={index}>
          <h2>Enjoy our {value.title}</h2>
          <img src="/img/Night.jpg"/>
          <Link to={"/post/"+value.post_id}><button>Explore</button></Link>
        </div>
      ));
     

    return (
      
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

        <h1 style={{marginTop:'30px'}}>The travel is most appreciated</h1>
        <div className="coverTopTour" style={{position:'relative'}}>
          {/* <button className="arrow_left"><i className="fa fa-arrow-left" aria-hidden="true"></i></button>
          <button className="arrow_right"><i className="fa fa-arrow-right" aria-hidden="true"></i></button> */}
        
          <div className="owl-carousel owl-theme">
          {slide}
          </div>
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
>>>>>>> 3c70703810401a33fdb953b032fa75fa47a9a0b2
      </div>
    );
  }

  searchGuider = async (eve)=> {
    eve.preventDefault();
    const dom = ReactDOM.findDOMNode(this);

    
    if (dom instanceof HTMLElement) {

      let key = dom.querySelector('input[name="keyword"]').value;
      try {
        let response = await fetch("http://localhost:8080/Guider/Search/" + key,
            {
                method: "GET",
                mode: "cors",
                credentials: "include",
      
            }
        );
        if (!response.ok) { throw Error(response.status + ": " + response.statusText); }
        const guiders = await response.json();
        console.table(guiders);
        this.setState({guiders: guiders});
    } catch (err) {
        console.log(err);
    } 

    } else {
        console.log("find DOM do not work");
    }
  }
}

export default Home;
