import React, { Component } from "react";
import "font-awesome/css/font-awesome.min.css";
import country from './json/country.json';
import $ from 'jquery';
import Config from './Config';
class Pay extends Component {
  constructor(props){
    super(props);

    this.state = {
      tourDetail:{},
      country:[],
      isDisabled:true,
      isDisabledPay:true
    }
  }

  componentDidMount() {
      this.setState({country});

      //open loader to paypal
      $('input[name="paypal"]').on('click', function(){
        $('.coverLoader').show();
     });

    
  }
  async goToPayPal(){
    var data=JSON.parse(sessionStorage.getItem('tourDetail'));
    delete data.price;
    delete data.dateForBook;
    delete data.hourForBook;
    let options = {
      method: 'POST',
      mode: "cors",
      credentials: "include",
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    };
    let response = await fetch(Config.api_url + "Payment/Pay", options);
    response = await response.text();
    window.location.href = response;
    console.log(response);
  }

  genderOnChange = (e)=>{
    if(e.target.name==='gender'){
      if(e.target.value==='' || e.target.value===null ){
        this.setState({
          genderError:true
        })
      } else {
        this.setState({
          genderError:false,     
          gender:e.target.value
        })
      }
    }
    
  }

  validateEmail(email){
   const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
   const result = pattern.test(email);
   if(result === true){
     this.setState({
       emailError:false,
       email:email
     })
   } else{
     this.setState({
       emailError:true
     })
   }
 }

  validatePhone(phone){
    const pattern = /^\d{10,11}$/;
    const result = pattern.test(phone);
    if(result === true){
      this.setState({
        phoneError:false,
        phone:phone
      })
    } else{
      this.setState({
        phoneError:true
      })
    }
  }

  
  handleChange(e){
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
    if(e.target.name==='firstname'){
      if(e.target.value==='' || e.target.value===null ){
        this.setState({
          firstnameError:true
        })
      } else {
        this.setState({
          firstnameError:false,     
          firstName:e.target.value
        })
      }
    }
    if(e.target.name==='lastname'){
      if(e.target.value==='' || e.target.value===null){
        this.setState({
          lastnameError:true
        })
      } else {
        this.setState({
          lastnameError:false,
          lastName:e.target.value
        })
      }
    }
    if(e.target.name==='email'){
    this.validateEmail(e.target.value);
    }
    if(e.target.name==='phone'){
      this.validatePhone(e.target.value);
  }
  if(this.state.firstnameError===false && this.state.lastnameError===false && 
    this.state.emailError===false && this.state.genderError === false){
      this.setState({
        isDisabled:false
      })
      
  }
  }
  submitForm = (e) => {
    e.preventDefault();
    const data = {
    firstName: this.state.firstName,
    lastName: this.state.lastName,
    email: this.state.email,
    phone:this.state.phone,
    gender:this.state.gender
    }
    this.setState({isDisabledPay:false});
    console.log(data);
  }

  render() {
    let country_name = this.state.country.map((value,index) =>{
      return <option key={index} value={value.name}>{value.name + "("+value.code +")"}</option>   
    })

    let country_phone = this.state.country.map((value,index) =>{
      return <option key={index} value={value.dial_code}>{value.name + "("+value.dial_code+")"}</option>   
    })
    var tourDetail = JSON.parse(sessionStorage.getItem('tourDetail'));
    var user = JSON.parse(sessionStorage.getItem('user'));
    if(tourDetail === null || user === null){
      window.location.href = "/";
      sessionStorage.setItem('messagePay','Error user or tour inf');
    }else{
      sessionStorage.setItem('messagePay','');
    }
    
    return (
      <div>
        <div className="coverLoader">
          <div className="loader"></div>
        </div>
        <div className="payForm">
      <div className="inputInfoPay">
        <div className={this.state.isDisabledPay ? 'paypal_pay hidden' : ''} >
          <h2>Select payment</h2>
          <hr/>
          <div className="paypal_radio">
            <input type="radio" name="paypal" defaultValue="female" onChange={this.goToPayPal}/> <span>Paypal</span>
            <img src="/img/paypal.png" alt="paypal"/>
          </div>
        </div>
        <div className={this.state.isDisabledPay ? '' : 'paypal_pay hidden'} >
            <div className="gender" >
              <p>Gender</p>
              <input
                type="radio"
                className="gendermale"
                name="gender"
                value="male"
                onChange={(e)=>this.genderOnChange(e)}
              /> Male
              <input type="radio" name="gender" value="female" onChange={(e)=>this.genderOnChange(e)}/> Female
              <input type="radio" name="gender" value="other" onChange={(e)=>this.genderOnChange(e)}/> Other
            </div>

            <div className="infoTravellerPay">
              <p>First name</p>
              <input type="text" placeholder="Fisrt name" name="firstname" onChange={(e)=>{this.handleChange(e)}}/>
              {this.state.firstnameError ? <p style={{color: "red"}} className="errorInput">Please enter your first name</p> : ''} 

              <p>Last name</p>
              <input type="text" placeholder="Last name" name="lastname" onChange={(e)=>{this.handleChange(e)}}/>
              {this.state.lastnameError ? <p style={{color: "red"}} className="errorInput">Please enter your last name</p> : ''} 

              <p>Email</p>
              <input type="text" placeholder="Email" name="email" onChange={(e)=>{this.handleChange(e)}}/>
              {this.state.emailError ? <p style={{color: "red"}} className="errorInput">Please enter your email</p> : ''} 
              <p>Country of residence</p>
              <select
                style={{
                  width: "100%",
                  height: "40px",
                  border: "1px solid #eaeaea"
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
              >
                {country_phone}
              </select>
              <input
                type="text"
                placeholder="Phone"
                className="phone_traveller"
                name = "phone"
                onChange={(e)=>{this.handleChange(e)}}
              />
               {this.state.phoneError ? <p style={{color: "red"}} className="errorInput">Phone must be have 10 digit</p> : ''} 

              <input type="submit" value="Save" className="saveInfoTraveller"  onClick={this.submitForm}/>
            </div>
        
        </div>
        </div>

        {/* infoTourBook */}
        <div className="infoTourBook">
          <div className="intro_tour">
            <img alt="natural" src="/img/natural1.jpg" />
            <h2>The Magic of Dubai at Night Private Tour</h2>
           
          </div>
          <div className="info_tourDetail">
            <hr />
            <div className="tour_detailHour">
              <i className="fa fa-calendar-o celander" aria-hidden="true">
                <span>{tourDetail.dateForBook}</span>
              </i>
              <i className="fa fa-clock-o" aria-hidden="true">
                <span>{tourDetail.hourForBook}</span>
              </i>
              <i className="fa fa-user" aria-hidden="true">
                <span>{parseInt(tourDetail.adult_quantity)+parseInt(tourDetail.children_quantity)} people</span>
              </i>
            <hr />
            <div className="total_priceBook">
              Total
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
