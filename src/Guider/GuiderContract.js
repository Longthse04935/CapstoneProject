import React, { Component } from "react";
import "font-awesome/css/font-awesome.min.css";
import country from "../json/country.json";

class GuiderContract extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tourDetail: {},
      country: [],
      errors:[],
      isError: false,
      data:{
        traveler_id:'',
        first_name: '',
        last_name: '',
        identity_card_number: '',
        gender: 'male',
        hometown:'',
        date_of_birth:'1970-01-01',
        address:'',
        nationality: 'Vietnam',
        day:'01',
        month:'01',
        year:'1970',
        card_issued_province:''
      }
      
    };
  }

  async componentDidMount() {
    this.setState({ country });
 

  }
  genderOnChange = e => {

    let {data} = this.state;
    data[e.target.name] = e.target.value;
    this.setState({data});
  };

  handleChange = (e)=>{
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

    var letters = /^[0-9]+$/;
    if(!data.identity_card_number.match(letters)){
      isError = true;
      errors['identity_card_number'] = 'Identity card number must be digits';
    }
    if(data.hometown === ''){
      isError = true;
      errors['hometown'] = 'Home town is empty, Input your home town';
    }
    if(data.address === ''){
      isError = true;
      errors['address'] = 'Address is empty, Input your address';
    }
    if(data.card_issued_province === ''){
      isError = true;
      errors['card_issued_province'] = 'Card issued province is empty, Input your card issued province';
    }



    this.setState({ isError, errors });
    if(isError) 
      return true;

    return false;
  }

submitForm = (e)=>{
    e.preventDefault();
    console.log("Data",this.state.data);
    if(this.isValidate()) {
      return false;
    } 
    
  }


  render() {
    const { errors,data} = this.state;
    let country_name = this.state.country.map((value, index) => {
      return (
        <option key={index} value={value.name}>
          {value.name + "(" + value.code + ")"}
        </option>
      );
    });



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

    return (
      <div>
        <div className="coverLoader">
          <div className="loader"></div>
        </div>
        <div className="payForm contract">
          <div className="inputInfoPay contractContent">
          <h1>Contract</h1>
              <div className="gender">
                <p>Gender</p>
                <input
                  type="radio"
                  className="gendermale"
                  name="gender"
                  value="male"
                  checked={this.state.data.gender === 'male'}
                  onChange={e => this.genderOnChange(e)}
                />{" "}
                Male
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={this.state.data.gender === 'female'}
                  onChange={e => this.genderOnChange(e)}
                />{" "}
                Female
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  checked={this.state.data.gender === 'other'}
                  onChange={e => this.genderOnChange(e)}
                />{" "}
                Other
              </div>
              {errors['gender'] ? <p style={{color: "red"}} className="errorInput">{errors['gender']}</p> : ''}

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
                

                <div className="label-information">Date Of Birth</div>
                    <div style={{ marginBottom: '20px' }}>
                    <select className="DOB" value={data.day} name="day" onChange={(e)=>{this.handleChange(e)}}>
                    {dayOption}
                    </select>
                    <select className="DOB" value={data.month} name="month" onChange={(e)=>{this.handleChange(e)}}>
                    {monthOptiom}
                    </select>
                    <select className="DOB" value={data.year} name="year" onChange={(e)=>{this.handleChange(e)}}>
                    {yearOption}
                    </select>
                </div>

                <p>Home town</p>
                <input
                  type="text"
                  placeholder="Home town"
                  name="hometown"
                  onChange={e => {
                    this.handleChange(e);
                  }}
                />
              {errors['hometown'] ? <p style={{color: "red"}} className="errorInput">{errors['hometown']}</p> : ''}

                <p>Address</p>
                <input
                  type="text"
                  placeholder="Address"
                  name="address"
                  onChange={e => {
                    this.handleChange(e);
                  }}
                />
                {this.state.hometownError ? (
                  <p style={{ color: "red" }} className="errorInput">
                    Please enter your hometown
                  </p>
                ) : (
                  ""
                )}
                {errors['address'] ? <p style={{color: "red"}} className="errorInput">{errors['address']}</p> : ''}

                <p>Country of residence</p>
                <select
                  style={{
                    width: "100%",
                    height: "40px",
                    border: "1px solid #eaeaea"
                  }}
                  name="nationality"
                  value={data.nationality}
                  onChange={(e)=>{this.handleChange(e)}}
                >
                  {country_name}
                </select>

                <p>Identity card number</p>
                <input
                  type="text"
                  placeholder="Identity card number"
                  className="phone_traveller"
                  name="identity_card_number"
                  onChange={e => {
                    this.handleChange(e);
                  }}
                />
                {errors['identity_card_number'] ? <p style={{color: "red"}} className="errorInput">{errors['identity_card_number']}</p> : ''}


                <div className="label-information">Card issued date</div>
                    <div style={{ marginBottom: '20px' }}>
                    <select className="DOB" value={data.day} name="day" onChange={(e)=>{this.handleChange(e)}}>
                    {dayOption}
                    </select>
                    <select className="DOB" value={data.month} name="month" onChange={(e)=>{this.handleChange(e)}}>
                    {monthOptiom}
                    </select>
                    <select className="DOB" value={data.year} name="year" onChange={(e)=>{this.handleChange(e)}}>
                    {yearOption}
                    </select>
                </div>

                <p>Card issued province</p>
                <input
                  type="text"
                  placeholder="Card issued province"
                  className="phone_traveller"
                  name="card_issued_province"
                  onChange={e => {
                    this.handleChange(e);
                  }}
                />
                {errors['card_issued_province'] ? <p style={{color: "red"}} className="errorInput">{errors['card_issued_province']}</p> : ''}

                <input
                  type="submit"
                  value="Save"
                  className="saveInfoTraveller"
                  onClick={this.submitForm}
                />
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default GuiderContract;
