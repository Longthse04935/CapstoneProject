import React, { Component } from 'react';
import $ from 'jquery';
import "font-awesome/css/font-awesome.min.css";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Config from '../Config';
import { connect } from 'react-redux';
import { exit } from '../redux/actions';
import {wsConnect, wsDisconnect, send} from '../redux/webSocket';

class LoggedGuider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disable: true,
            avatar: ''
        }
    }

    async componentDidMount() {
        $('.button-group > button').on('click', function () {
            $('.button-group > button').removeClass('active');
            $(this).addClass('active');
        });

        let pathname = window.location.pathname;
        if (pathname !== '/') {
            $('input[name=search]').focus(function () {
                $('.search .fillter').show();

            });
            $(document).mouseup(function (e) {
                if (!$('.search').is(e.target) && !$('.fillter').is(e.target)
                    && $('.search').has(e.target).length === 0
                    && $('.fillter').has(e.target).length === 0) {
                    $('.fillter').hide();
                }
            });
        }
        let user = JSON.parse(window.sessionStorage.getItem("user"));
        if (user) {
            const responseTraveller = await fetch(
                Config.api_url + "Guider/getGuider/" + user.id,
                {
                    method: "GET",
                    mode: "cors",
                    credentials: "include"
                }
            );

            const dataTraveller = await responseTraveller.json();
            this.setState({ avatar: dataTraveller.avatar });
        }
    }

    disableLoggedChoice = () => {
        this.setState({ disable: !this.state.disable });
    }

    render() {
        return (
            <div>
                {/* Menubar */}

                <nav className="navbar">
                <div className="menubar">
                    <div className="logoContainer">
                        <a href="/">
                            <i className="fa fa-arrows" aria-hidden="true" />
                        </a>
                    </div>
                    <div className="search">
                        <label>
                            <input
                                type="text"
                                placeholder="Welcome to my website"
                                name="search"
                                autoComplete="off"
                            />
                        </label>
                        <div className="fillter">
                            <div className="filter-Content">
                                <div className="localsOrExperience">
                                    <h3 className="explore">Explore TravelWlocals</h3>
                                    <div className="button-group">
                                        <button className="active">All</button>
                                        <button>Locals</button>
                                        <button>Experiences</button>
                                    </div>
                                </div>
                                <div className="popularDestination">
                                    <h3 id="popularLabel">Popular Destinations</h3>
                                    <ul>
                                        <li>
                                            <i className="fa fa-map-marker" aria-hidden="true"></i>
                                            <a>Ha Noi</a>
                                        </li>
                                        <li>
                                            <i className="fa fa-map-marker" aria-hidden="true"></i>
                                            <a>Ho Chi Minh</a>
                                        </li>
                                        <li>
                                            <i className="fa fa-map-marker" aria-hidden="true"></i>
                                            <a>Da Nang</a>
                                        </li>
                                        <li>
                                            <i className="fa fa-map-marker" aria-hidden="true"></i>
                                            <a>Bac Ninh</a>
                                        </li>
                                        <li>
                                            <i className="fa fa-map-marker" aria-hidden="true"></i>
                                            <a>Da Lat</a>
                                        </li>
                                        <li>
                                            <i className="fa fa-map-marker" aria-hidden="true"></i>
                                            <a>Hue</a>
                                        </li>
                                        <li>
                                            <i className="fa fa-map-marker" aria-hidden="true"></i>
                                            <a>Vung Tau</a>
                                        </li>
                                        <li>
                                            <i className="fa fa-map-marker" aria-hidden="true"></i>
                                            <a>Hai Phong</a>
                                        </li>
                                        <li>
                                            <i className="fa fa-map-marker" aria-hidden="true"></i>
                                            <a>Phu Quoc</a>
                                        </li>
                                        <li>
                                            <i className="fa fa-map-marker" aria-hidden="true"></i>
                                            <a>Sapa</a>
                                        </li>
                                        <li>
                                            <i className="fa fa-map-marker" aria-hidden="true"></i>
                                            <a>Ca Mau</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="navbarRightContent">
                        <ul className="logged" >
                            <li>
                                <Link to="/chat">Message</Link>
                            </li>
                            <li>
                                <Link to={"/managebook"}>Bookings</Link>
                            </li>
                            <li className="avatarLogged" onClick={this.disableLoggedChoice}>

                                    <img src={`${this.state.avatar}`} />

                                    <ul className="dropContent" style={this.state.disable ? { display: 'none' } : { display: 'block' }}>
                                        <span>
                                            <li><Link to="/profileguiders">Profile</Link><i className="fa fa-address-card-o" aria-hidden="true"></i></li>
                                            <li><Link to="/edit">Edit Post</Link><i className="fa fa-pencil" aria-hidden="true"></i></li>
                                            <li><Link to="/add">Add Post</Link><i className="fa fa-user" aria-hidden="true"></i></li>
                                            <li><Link to="/schedule">Schedule</Link><i className="fa fa-handshake-o" aria-hidden="true"></i></li>
                                            <li><Link to="/changepassword">Change Password</Link><i className="fa fa-handshake-o" aria-hidden="true"></i></li>
                                            <li><Link to="/contract">Contract</Link><i className="fa fa-handshake-o" aria-hidden="true"></i></li>
                                            <li><Link to="/chart">Your Income</Link><i className="fa fa-handshake-o" aria-hidden="true"></i></li>
                                        </span>
                                        <li onClick={() => {
                                            // console.log("log out");
                                            // const user = {
                                            //   userName: "Guest",
                                            //   role: "GUEST",
                                            //   id: 0
                                            // };
                                            // this.props.reload.call(this, user);window.location.href = '/';
                                            //this.props.dispatch(wsDisconnect(Config.api_url+"ws"));
                                            this.props.dispatch(exit());
                                            window.location.href = '/';
                                            
                                        }}>Log out<i className="fa fa-sign-out" aria-hidden="true"></i></li>


                                </ul>

                            </li>
                        </ul>
                    </div>

                </div>
                </nav>
                {/* End MenuBar */}
            </div>
        );
    }
}

export default connect()(LoggedGuider);