import React, { Component } from "react";
import Config from './Config';
import SweetAlert from 'react-bootstrap-sweetalert';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      category: [],
      alert:null
    };
  }
  onNotification(){
    this.setState({alert:null});
    sessionStorage.setItem('messagePay','');
  }
  notification(){
    const getAlert = () => (
      <SweetAlert
        warning
        confirmBtnText="This is notification for you"
        confirmBtnBsStyle="danger"
        title="Notification"
        onConfirm={()=>this.onNotification()}
      >
        You are not logged in or book a tour . Please login or register to book this tour!!
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
          this.notification();
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
      </div>
    );
  }
}

export default Home;
