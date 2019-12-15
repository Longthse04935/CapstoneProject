import React, { Component } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
class ForgotPassword extends Component {
    constructor(props){
        super(props);
        this.state = {
            alert:null,
            email:''
        }
    }

    handleSubmit= ()=>{
        this.statusProfile('Send success!');
        this.setState({email:''})
    }

    handleChange = (e) =>{
        let value = e.target.value;
        this.setState({email:value});
    }
    hideAlert() {
        this.setState({
            alert: null
        });
    }

    statusProfile(message) {
        const getAlert = () => (
            <SweetAlert
                success
                onConfirm={() => this.hideAlert()}
            >
                {message}
            </SweetAlert>
        );

        this.setState({
            alert: getAlert()
        });
    }
    render() {
        return (
            <div>
            {this.state.alert}
                <div className="forgotPassword">
                <h3>Enter your email to get password</h3>
                <div className="form-group row" >
                <div className="col-lg-2 group_IncludeSer">
                    <label className="col-form-label form-control-label" id="forgotEmail">
                    Email
                    </label>
                  
                </div>
                <div className="col-lg-8 include-service">
                    <div className="dropdownCoverSelect">
                    <input
                        className="dropdown-select service"
                        type="text"
                        required
                        name="service"
                        onChange={this.handleChange}
                        value={this.state.email}
                    />
                    </div>
                </div>
                <div className="col-lg-2 group_IncludeSer">
                    <div class="submit_btn" style={{marginTop:'0'}}><button class="submitBtn btnSb" onClick={this.handleSubmit}>Send</button></div>
                </div>
                </div>
            </div>
            </div>
        );
    }
}

export default ForgotPassword;