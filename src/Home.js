import React, { Component } from "react";
import {Link} from 'react-router-dom';
class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      category: []
    };
  }
  async componentDidMount() {
    try {
      const responsePosts = await fetch(
        "http://localhost:8080/category/findAll"
      );

      if (!responsePosts.ok) {
        throw Error(responsePosts.status + ": " + responsePosts.statusText);
      }

      const category = await responsePosts.json();

      this.setState({ category});
      console.log(category);
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    let tour = this.state.category.map((tour,index) => {
      if(tour.category ==="Night tour"){
        return ( <li key={index}>
          <img src="/img/Nighttour.jpg"/>
          <a href={"/posttour/"+tour.category_id+"/"+tour.category}>{tour.category}</a>
          </li>
         )
      }
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
      </div>
    );
  }
}

export default Home;
