import React, { Component } from "react";
import Config from './Config';
import SweetAlert from 'react-bootstrap-sweetalert';
import ReactDOM from 'react-dom';
import {Link } from "react-router-dom";
class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      category: [],
      guiders: [],
      alert:null
    };
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

    let guide = this.state.guiders.map((guider,index) =>
    <Link key={index} to={"guider/"+ guider.guider_id}>{guider.first_name + " " + guider.last_name}</Link>
    );

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
        <form onSubmit={this.searchGuider}>
          <input className="search" type="text" name="keyword"/>
          <input type="submit" value="Search"/> 
        </form>
        {guide}
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
