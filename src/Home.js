import React, { Component } from "react";

class Home extends Component {
  render() {
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
            <li>
                <img src="/img/food.jpg"/>
                <a>Food tour</a>
            </li>
            <li>
                <img src="/img/art.jpg"/>
                <a>Art tour</a>
            </li>
            <li>
                <img src="/img/culture.jpg"/>
                <a>Culture tour</a>
            </li>
            <li>
                <img src="/img/history.jpg"/>
                <a>History tour</a>
            </li>
            <li>
                <img src="/img/temple.jpg"/>
                <a>Temple tour</a>
            </li>
            <li>
                <img src="/img/nighttour.jpg"/>
                <a>Night tour</a>
            </li>
        </ul>
      </div>
    );
  }
}

export default Home;
