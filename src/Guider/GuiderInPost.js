import React from 'react';
import "font-awesome/css/font-awesome.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Config from '../Config';
import Rated from './Rated';
import { connect } from 'react-redux';
import SweetAlert from 'react-bootstrap-sweetalert';
import $ from 'jquery';
class GuiderInPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            guider: {
                languages: ['']
            },
            alert: null
        };
        this.onCancel = this.onCancel.bind(this);
        this.alertAccount = this.alertAccount.bind(this);
        this.onLogin = this.onLogin.bind(this);
    }

    async componentDidMount() {
        try {
            const response = await fetch(Config.api_url + "Guider/" + this.props.guiderId, {
                method: "GET",
                mode: "cors",
                credentials: "include"
            });
            if (!response.ok) { throw Error(response.status + ": " + response.statusText); }
            const guider = await response.json();
            //   console.log(guider);
            this.setState({ guider });
        } catch (err) {
            console.log(err);
        }

    }
    onCancel() {
        this.setState({
            alert: null
        });
    }
    onLogin() {
        this.setState({ alert: null });
        $('.loginForm').show();
    }

    alertAccount () {
        const getAlert = () => (
            <SweetAlert
                warning
                showCancel
                confirmBtnText="Go to login"
                confirmBtnBsStyle="danger"
                title="Login notification"
                onConfirm={() => this.onLogin()}
                onCancel={() => this.onCancel()}
                focusCancelBtn
            >
                You are not logged in. Please login or register to book this tour!!
      </SweetAlert>
        );
        console.log("hello2");
        this.setState({
            alert: getAlert()
        });
    }
    goToBook = eve => {
        //eve.preventDefault();
        
        if(!this.props.user.logedIn) {
            console.log("hello");
            this.alertAccount();
        } else {
            window.location.href=("/chatbox/" + this.props.guiderId + "/" + this.props.postId);
        }
    }
    render() {
        let guide = this.state.guider;
        let languages = '';
        for (var i = 0; i < guide.languages.length; i++) {
            if (i + 1 === guide.languages.length) {
                languages += guide.languages[i].toUpperCase();
            } else {
                languages += guide.languages[i].toUpperCase() + ',';
            }
        }

        let checkPath = <button className="BtnContact" onClick={this.goToBook}>Come and joint me</button>;
            // <Link to={"/chatbox/" + this.props.guiderId + "/" + this.props.postId}></Link>

        return (

            <div className="profile-box">
                {this.state.alert}
                <div className="pb-header header-stick">
                    <div className="header-pb">
                        <h1 className="TitlePb TileStickyPb">{guide.first_name + " " + guide.last_name}</h1>
                        <Rated number={guide.rated} />
                    </div>
                    <div>
                        <img className="pf-avatar"
                            src={guide.avatar} />

                    </div>
                </div>
                <p className="ListItem">
                    <span className="ListItemIcon">
                        <i className="fa fa-map-marker"></i>
                    </span>
                    <span className="ListItemText">
                        I live in {guide.city}
                    </span>
                </p>
                <p className="ListItem">
                    <span className="ListItemIcon">
                        <i className="fa fa-globe"></i>
                    </span>
                    <span className="ListItemText">
                        I speak {languages}
                    </span>
                </p>
                <p className="ListItem">
                    <span className="ListItemIcon">
                        <i className="fa fa-heart"></i>
                    </span>
                    <span className="ListItemText">
                        My passions are: {guide.passion}
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
                    <span className="ListItemText">About me:{guide.about_me}</span>
                </p>
                {
                    checkPath
                }

            </div>
        );
    }

}
function mapStateToProps(state) {
    const user = state.user;

    return { user };
}
export default connect(mapStateToProps)(GuiderInPost);