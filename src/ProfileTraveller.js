import React, { Component } from "react";
import "font-awesome/css/font-awesome.min.css";
import $ from "jquery";
import country from './json/country.json';
import Config from './Config';

class ProfileTraveller extends Component {
  constructor(props){
    super(props);
    this.state= {
      countryList: country,
      isError: false,
      errors: {},
      phone_code: '+84',
      data: {
        traveler_id:'',
        first_name: '',
        last_name: '',
        phone: '',
        gender: '0',
        email: '',
        date_of_birth:'',
        street:'',
        house_number:'',
        postal_code:'',
        slogan:'',
        about_me:'',
        language:["Vietnamese"], 
        country: 'Vietnam',
        city:'',
        avatar_link:'',
        day:'',
        month:'',
        year:'',
      }
    }
  }

  async componentDidMount(){
    $("head").append('<link href="/css/profile_traveller.css" rel="stylesheet"/>');
    $("#avatar_trigger").click(function () {
      $("#avatar_link").trigger('click');
  });
  if(this.props.match.params.message === "update"){
    const responseTraveller = await fetch(
      Config.api_url + "Traveler/GetTraveler?traveler_id=4",
      {
        method: "GET",
        mode: "cors",
        credentials: "include"
    });
  
    if (!responseTraveller.ok) {
      throw Error(responseTraveller.status + ": " + responseTraveller.statusText);
    }
  
    const dataTraveller = await responseTraveller.json();
    this.setState({data:dataTraveller});
  }
  }



  validateEmail(email){
    const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
    const result = pattern.test(email);
    return result;
  }

  handleChange=(e)=>{
    const value = e.target.value;
    const name = e.target.name;

    const { data } = this.state;
    data[name] = value;
    if(name === 'country') {
      let phone_code = $('#country > option:selected').data('code');
      this.setState({ phone_code });
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

    var letters = /^[0-9]+$/;
    if(!data.phone.match(letters)){
      isError = true;
      errors['phone'] = 'Phone must be digits';
    }
    if(data.slogan === ''){
      isError = true;
      errors['slogan'] = 'A good slogan will make you cool';
    }
    if(data.about_me === ''){
      isError = true;
      errors['about_me'] = 'Introduce yourself a bit, bro';
    }


    this.setState({ isError, errors });
    if(isError) 
      return true;

    return false;
  }

  submitForm = (e) => {
    e.preventDefault();
    var user = JSON.parse(sessionStorage.getItem('user'));
    if(this.isValidate()) {
      return false;
    } 
    var {data} = this.state;
    data.traveler_id = user.id;
    data.date_of_birth = data.year +"-"+ data.month +"-"+ data.day;
    console.log(JSON.stringify(this.state.data));
  }

  render() {

    const { isError, errors, data } = this.state;
    var day = [];
    for (var i = 1; i <= 31; i++){
        day.push(i);
    } 
    var dayOption = day.map((value,index) => {
      if(parseInt(value) < 10) {
      return <option value={"0"+ value} key={index}>{value}</option>
      }
      return <option value={value} key={index}>{value}</option>
    }
    )

    var month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    var monthOptiom = month.map((value,index)=>{
      if(parseInt(index + 1) < 10){
        return (<option value={"0" + (index + 1)} key={index}>{value}</option>)
      }

      return <option value={index + 1} key={index}>{value}</option>
    });
    
    var currentYear = parseInt(new Date().getFullYear());
    var year = [];
    for (var i = currentYear; i >= 1950 ; i--){
      year.push(i);
    } 
    var yearOption = year.map((value,index) => (
      <option value={value} key={index}>{value}</option>
    )
    )

    var country_name = this.state.countryList.map((value,index) => {
      return <option value={value.name} data-code={value.dial_code} key={index}>{value.name}</option>   
    })
    
    var language = ["English","Vietnamese","Japanese","Chinese","Korean","French","Russian","Turkish","Latin","Brazilian"];
    var languageOption = language.map((value,index) => (
      <option value={value} key={index}>{value}</option>
    ))
    var message = this.props.match.params.message;
    return (
      <div>
        <div className="content">
          <h1 className="h1-profile">{message === 'update' ? 'Update your profile':'Create your profile'}</h1>
          <div className="content-profile">
            <div className="profile-image">
              <h1 className="h1-introduce">{message === 'update' ? 'Update your profile':'Introduce yourself'}</h1>
              <img
                alt="profile avatar"
                height={150}
                width={150}
                className="profile-avatar"
                src="https://withlocals-com-res.cloudinary.com/image/upload/w_200,h_200,c_thumb,q_auto,f_auto/15476f307eb33925c9aba3968a030060"
              />
              <br />
              <button className="btn-changepic" id="avatar_trigger">Change profile picture</button>{data.avatar_link}
              <input type="file" id="avatar_link" style={{display:'none'}} name="avatar_link" onChange={(e)=>{this.handleChange(e)}}/>
            </div>
            <div className="profile-information">
              <div className="label-information">First Name</div>
              <input className="input-information" name="first_name" value={data.first_name} onChange={(e)=>{this.handleChange(e)}}/>
              {errors['first_name'] ? <p style={{color: "red"}} className="errorInput">{errors['first_name']}</p> : ''}

              <div className="label-information">Last Name</div>
              <input className="input-information" name="last_name" value={data.last_name} onChange={(e)=>{this.handleChange(e)}}/>
              {errors['last_name'] ? <p style={{color: "red"}} className="errorInput">{errors['last_name']}</p> : ''}

              <div className="label-information">Gender</div>
              <div>
                <select className="form-control" name="gender" value={data.gender} onChange={(e)=>{this.handleChange(e)}}>
                  <option value="0">Male</option>
                  <option value="1">Female</option>
                  <option value="2">Other</option>
                </select>
              </div>

              <div className="label-information">Phone</div>
              <input className="input-information" name="phone" value={data.phone} onChange={(e)=>{this.handleChange(e)}}/>
              {errors['phone'] ? <p style={{color: "red"}} className="errorInput">{errors['phone']}</p> : ''}

              <div className="label-information">Email</div>
              <input className="input-information" name="email" value={data.email} onChange={(e)=>{this.handleChange(e)}}/>
              {errors['email'] ? <p style={{color: "red"}} className="errorInput">{errors['email']}</p> : ''}
              
              <div className="label-information">Date Of Birth</div>
              <div style={{ marginBottom: 30 }}>
                <select className="DOB" name="day" value={data.day} onChange={(e)=>{this.handleChange(e)}}>
                 {dayOption}
                </select>
                <select className="DOB" name="month" value={data.month} onChange={(e)=>{this.handleChange(e)}}>
                  {monthOptiom}
                </select>
                <select className="DOB" name="year" value={data.year} onChange={(e)=>{this.handleChange(e)}}>
                  {yearOption}
                </select>
              </div>
            </div>
            <div className="profile-information">
              <h1 className="h1-profile">Where do you live?</h1>
              <div>
                <select id="country" className="country" name="country" onChange={(e)=>{this.handleChange(e)}} value={data.country}>
                    {country_name}
                </select>
              </div>
              {errors['country'] ? <p style={{color: "red"}} className="errorInput">{errors['country']}</p> : ''}
              <div className="label-information">City or town</div>
              <input
                className="input-information"
                style={{ marginBottom: 20 }}
                name="city"
                onChange={(e)=>{this.handleChange(e)}}
                value={data.city}
              />
            </div>
            <div className="profile-information">
              <h3>Address</h3>
              <div className="label-information">Street</div>
              <input className="input-information" name="street"  value={data.street} onChange={(e)=>{this.handleChange(e)}}/>
              <div className="label-information" >House Number</div>
              <input className="input-information" name="house_number" value={data.house_number} onChange={(e)=>{this.handleChange(e)}}/>
              <div className="label-information">Postal Code</div>
              <input
                className="input-information"
                style={{ width: 150, marginBottom: 30 }}
                name="postal_code"
                onChange={(e)=>{this.handleChange(e)}}
                value={data.postal_code}
              />
            </div>
            <div className="last-information">
              <h1 className="h1-introduce">Some thing about you</h1>
              <div className="label-information">Your language</div>
              <div>
                <select className="country" name="language" value={data.language[0]} onChange={(e)=>{this.handleChange(e)}}>
                 {languageOption}
                </select>
              </div>
              <div className="label-information">Description</div>
              <input
                placeholder="Write something about you pls !!!"
                className="input-something"
                name="about_me"
                onChange={(e)=>{this.handleChange(e)}}
                value={data.about_me}
              />
                {errors['about_me'] ? <p style={{color: "red"}} className="errorInput">{errors['about_me']}</p> : ''}

              <div className="label-information">Your sologan</div>
              <input
                placeholder="Please write your sologan !!!"
                className="input-something"
                name="slogan"
                onChange={(e)=>{this.handleChange(e)}}
                value={data.slogan}
              />
               {errors['slogan'] ? <p style={{color: "red"}} className="errorInput">{errors['slogan']}</p> : ''}
            </div>
            <div style={{ textAlign: "center" }}>
              <button className="btn-save" onClick={(e)=>{this.submitForm(e)}}>Save Your Profile</button>
            </div>
          </div>
        </div>
        ;
      </div>
    );
  }
}

export default ProfileTraveller;
