import React, { Component } from "react";
import "font-awesome/css/font-awesome.min.css";
import country from "../json/country.json";
import $ from "jquery";
import Config from "../Config";
import ReviewInPost from '../Guider/ReviewInPost';
import GuiderInPost from '../Guider/GuiderInPost';


class Pay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tourDetail: {},
      country: [],
      postInfo: [],
      isDisabledPay: true,
      isDisabledCheckBox:true,
      link_youtube:'',
      errors:[],
      isError: false,
      data:{
        traveler_id:'',
        first_name: '',
        last_name: '',
        email: '',
        gender: 'male',
        country_name:'Vietnam',
        country_phone:'+84',
        phone:''
      }
    };
  }

  async componentDidMount() {
    this.setState({ country });
    //open loader to paypal
    $('input[name="paypal"]').on("click", function() {
      $(".coverLoader").show();
    });

    $("#amout_show").hover(function(){
      $('.tool_tipPeople').show();
    },function(){
        $('.tool_tipPeople').hide();
    })

    $('.guiderNamePay').click(function () {
      if($('.guiderNamePay').hasClass('showing') === false){
        $('.tool_tipGuider').show();
        $('.guiderNamePay').addClass('showing');
      }else{
        $('.tool_tipGuider').hide();
        $('.guiderNamePay').removeClass('showing');
      }
    });

    $('.titleTourPay').click(function () {
      if($('.titleTourPay').hasClass('showing') === false){
        $('.tool-tipPost').show();
        $('.titleTourPay').addClass('showing');
      }
    });

    $(document).mouseup(function (e) {
      if (e.button === 0) {
          var container = $(".tool-tipPost");
          // if the target of the click isn't the container nor a descendant of the container
          if (!container.is(e.target) && container.has(e.target).length === 0) {
            $('.tool-tipPost').hide();
            $('.titleTourPay').removeClass('showing');
          }
      }
  });

    //load post data
    let tourDetail = JSON.parse(sessionStorage.getItem('tourDetail'));
    let response = await fetch(
      Config.api_url + "guiderpost/findSpecificPost?post_id=" + tourDetail.post_id,
      {
        method: "GET",
        mode: "cors",
        credentials: "include"
      }
    );
    if (!response.ok) {
      throw Error(response.status + ": " + response.statusText);
    }

    const postInfo = await response.json();

    let link_youtube = postInfo.video_link;
      if(link_youtube.includes('youtu.be')){
        link_youtube = link_youtube.replace("youtu.be","youtube.com/embed");
        this.setState({link_youtube});
      }else{
        link_youtube = link_youtube.split("&");
        this.setState({link_youtube:link_youtube[0].replace("watch?v=","embed/")});
      }
      this.setState({ postInfo});

  }

  async goToPayPal() {
    var data = JSON.parse(sessionStorage.getItem("tourDetail"));
    delete data.price;
    delete data.dateForBook;
    delete data.hourForBook;
    let options = {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
    let response = await fetch(Config.api_url + "Payment/Pay", options);
    response = await response.text();
    window.location.href = response;
    sessionStorage.setItem("link", response);
  }

  genderOnChange = e => {
    let {data} = this.state;
    data[e.target.name] = e.target.value;
    this.setState({data});
  };

  validateEmail(email) {
    const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
    const result = pattern.test(email);
    return result;
  }

  validatePhone(phone) {
    const pattern = /^\d{10,11}$/;
    const result = pattern.test(phone);
    return result;
  }

  handleCheckBox = () =>{
    this.setState({isDisabledCheckBox:!this.state.isDisabledCheckBox});
  }

  handleChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    let {errors} = this.state;
    const { data } = this.state;
    data[name] = value;
    if(value !== ''){
        errors[name] = '';
    }
    this.setState({ data });
  }

  isValidate = () => {
    const { data } = this.state;
    let isError = false;
    let errors = {};
    if(data.first_name === '') {
      isError = true;
      errors['first_name'] = 'First name is empty, Input your first name';
    }
    if(data.last_name === '') {
      isError = true;
      errors['last_name'] = 'Last name is empty, Input your last name';
    }
    if(this.validateEmail(data.email) === false){
      isError = true;
      errors['email'] = 'Email example like abcxzy@gmail.com';
    }
    if(this.validatePhone(data.phone) === false){
      isError = true;
      errors['phone'] = 'Phone must be digits and have 10-11 digits';
    }

    this.setState({ isError, errors });
    if(isError) 
      return true;

    return false;
  }

  submitForm = e => {
    e.preventDefault();
    if(this.isValidate()) {
      return false;
    } 
  };

  render() {
    let country_name = this.state.country.map((value, index) => {
      return (
        <option key={index} value={value.name}>
          {value.name + "(" + value.code + ")"}
        </option>
      );
    });

    let country_phone = this.state.country.map((value, index) => {
      return (
        <option key={index} value={value.dial_code}>
          {value.name + "(" + value.dial_code + ")"}
        </option>
      );
    });
    let {postInfo} = this.state;
    
    let tourDetail = JSON.parse(sessionStorage.getItem("tourDetail"));
  
    let user = JSON.parse(sessionStorage.getItem("user"));
    if (tourDetail === null || user === null) {
      window.location.href = "/";
      sessionStorage.setItem("messagePay", "Error user or tour inf");
    } else {
      sessionStorage.setItem("messagePay", "");
    }
    let begin_date = tourDetail.begin_date.split(" ");
    let end_date = tourDetail.end_date.split(" ");
    let {data,errors} = this.state;
    return (
      <div>
        <div className="coverLoader">
          <div className="loader"></div>
        </div>
        <div className="payForm">
          <div className="inputInfoPay">
            <div
              className={this.state.isDisabledPay ? "paypal_pay hidden" : ""}
            >
              <h2>Select payment</h2>
              <hr />
              <input type="checkbox" onClick={this.handleCheckBox}/> <span className="policy" >Chinh sach</span>
              <div className="paypal_radio">
                {
                  this.state.isDisabledCheckBox ? '' 
                  : <input
                  type="radio"
                  name="paypal"
                  onChange={this.goToPayPal}
                /> 
                }{" "}
                <span>Paypal</span>
                <img src="/img/paypal.png" alt="paypal" />
              </div>
            </div>
            <div
              className={this.state.isDisabledPay ? "" : "paypal_pay hidden"}
            >
              <div className="gender">
                <p>Gender</p>
                <input
                  type="radio"
                  className="gendermale"
                  name="gender"
                  value="male"
                  checked={data.gender === 'male'}
                  onChange={e => this.genderOnChange(e)}
                />{" "}
                Male
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={data.gender === 'female'}
                  onChange={e => this.genderOnChange(e)}
                />{" "}
                Female
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  checked={data.gender === 'other'}
                  onChange={e => this.genderOnChange(e)}
                />{" "}
                Other
              </div>

              <div className="infoTravellerPay">
                <p>First name</p>
                <input
                  type="text"
                  placeholder="Fisrt name"
                  name="first_name"
                  onChange={e => {
                    this.handleChange(e);
                  }}
                />
                {errors['first_name'] ? <p style={{color: "red"}} className="errorInput">{errors['first_name']}</p> : ''}

                <p>Last name</p>
                <input
                  type="text"
                  placeholder="Last name"
                  name="last_name"
                  onChange={e => {
                    this.handleChange(e);
                  }}
                />
                 {errors['last_name'] ? <p style={{color: "red"}} className="errorInput">{errors['last_name']}</p> : ''}

                <p>Email</p>
                <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  onChange={e => {
                    this.handleChange(e);
                  }}
                />
               {errors['email'] ? <p style={{color: "red"}} className="errorInput">{errors['email']}</p> : ''}

                <p>Country of residence</p>
                <select
                  style={{
                    width: "100%",
                    height: "40px",
                    border: "1px solid #eaeaea"
                  }}
                  name='country_name'
                  value={data.country_name}
                  onChange={e => {
                    this.handleChange(e);
                  }}
                >
                  {country_name}
                </select>

                <p>Phone</p>
                <select
                  style={{
                    width: "40%",
                    height: "42px",
                    border: "1px solid #eaeaea"
                  }}
                  name='country_phone'
                  value={data.country_phone}
                  onChange={e => {
                    this.handleChange(e);
                  }}
                >
                  {country_phone}
                </select>
                <input
                  type="text"
                  placeholder="Phone"
                  className="phone_traveller"
                  name="phone"
                  onChange={e => {
                    this.handleChange(e);
                  }}
                />
                 {errors['phone'] ? <p style={{color: "red"}} className="errorInput">{errors['phone']}</p> : ''}
                <input
                  type="submit"
                  value="Save"
                  className="saveInfoTraveller"
                  onClick={this.submitForm}
                />
              </div>
            </div>
          </div>

          {/* infoTourBook */}
          <div className="infoTourBook">
            <div className="intro_tour">
              <img className="payImg" alt="natural" src="/img/natural1.jpg" />
              <h2 className="titleTourPay">The Magic of Dubai at Night Private Tour</h2>
              <div className="tool-tipPost">
                  {/* Post */}
                  <div id="reactContainer">
                  {/*  Content  */}
                  <div className="content " id="contentPay">
                    <div className="content-right " id="content-rightPay">
                      <div className="PostDetail">
                        <div className="intro">
                        <iframe
                          src={this.state.link_youtube}
                          frameBorder="0"
                          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen 
                        ></iframe>
                          <h2 className="titleTour">{postInfo.title}</h2>
                          <p className="introduceTour">{postInfo.description}</p>
                        </div>
                        <div className="activities">
                          <ul>
                            <li>
                              <i className="fa fa-map-marker"></i>
                              <span>{postInfo.location}</span>
                            </li>
                            <li>
                              <i className="fa fa-hourglass-end" />
                              <span>{postInfo.total_hour} hours</span>
                            </li>
                            <li>
                              <i className="fa fa-users" />
                              <span>Private tour. Only you and your host</span>
                            </li>
                          </ul>
                          <i className="fa fa-sticky-note" />
                          <span>
                            <strong>Including:</strong>
                            {postInfo.including_service}
                          </span>
                        </div>

                        <ReviewInPost postId={tourDetail.post_id} />

                        {/* <PlanInPost postId={tourDetail.post_id} /> */}
                        
                      </div>
                    </div>
                  </div>
                </div>
                  {/* End Post */}
              </div>
            </div>
            <div className="info_tourDetail">
              <hr />
              <div className="tour_detailHour">
                <i className="fa fa-calendar-o celander" aria-hidden="true">
                  <span>Begin date: {begin_date[0]}</span>
                </i>
                <i className="fa fa-clock-o" aria-hidden="true">
                  <span>Begin time: {begin_date[1]}</span>
                </i>
                <p></p>
                <i className="fa fa-calendar-o celander" aria-hidden="true">
                  <span>End date: {end_date[0]}</span>
                </i>
                <p></p>
                <i className="fa fa-clock-o" aria-hidden="true">
                  <span>End time: {end_date[1]}</span>
                </i>
                <p></p>
                <i className="fa fa-clock-o" aria-hidden="true">
                  <span>Tour duration: {postInfo.total_hour} hour</span>
                </i>
                <p></p>
                <i className="fa fa-user" aria-hidden="true" style={{position:'relative'}}>
                  <span >
                    Guider: <span className="guiderNamePay">{tourDetail.guider_name}</span>
                  </span>
                  <div className="tool_tipGuider">
                    <div className="content-left">
                        <GuiderInPost
                          guiderId={tourDetail.guider_id}
                          postId={tourDetail.post_id}
                        />
                    </div>
                  </div>
                </i>
                <p></p>
                <i className="fa fa-user" aria-hidden="true">
                  <span >
                    Amount people:
                    <span style={{color:"#e71575",position:'relative',cursor:'pointer'}} id="amout_show">
                    {" "}{parseInt(tourDetail.adult_quantity) +
                      parseInt(tourDetail.children_quantity)}
                      </span>
                      {" "}people
                  </span>
                  <div className="tool_tipPeople">
                    <i className="fa fa-user" aria-hidden="true">
                      <span>
                        Adult:{" "+tourDetail.adult_quantity}
                      </span>
                    </i>
                    <p></p>
                    <i className="fa fa-user" aria-hidden="true">
                      <span>
                      Children:{" "+ tourDetail.children_quantity}
                      </span>
                    </i>
                    <p></p>
                  </div>
                </i>
                <hr />
                <div className="total_priceBook">
                  Fee tour:
                  <span>{tourDetail.price}$</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Pay;