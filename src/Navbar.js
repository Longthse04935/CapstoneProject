import React, { Component } from 'react';
import "font-awesome/css/font-awesome.min.css";
import $ from 'jquery';
import Config from './Config';
import ReactDOM from 'react-dom';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.signUp = this.signUp.bind(this);
        this.logIn = this.logIn.bind(this);

    }

    async signUp(eve) {
        eve.preventDefault();
        const dom = ReactDOM.findDOMNode(this);
        let bod = {
            userName: "",
            password: "",
            role: ""
        };
        if (dom instanceof HTMLElement) {
            bod.userName = dom.querySelector("input[name='sign-up-name']").value;
            bod.password = dom.querySelector("input[name='sign-up-password']").value;
            bod.role = dom.querySelector("select[class='sign-up-custom-select']").value;

            console.log(bod);
            try {
                const response = await fetch(Config.api_url + "account/registrator",
                    {
                        method: "POST",
                        mode: "cors",
                        credentials: "include",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(bod)
                    }
                );
                if (!response.ok) { throw Error(response.status + ": " + response.statusText); }
                const user = await response.json();
                // console.log(await user);
                this.props.reload.call(this, await user);
            } catch (err) {
                console.log(err);
            }
        } else {
            console.log("find DOM do not work");
        }

    }

    async logIn(eve) {
        eve.preventDefault();
        const dom = ReactDOM.findDOMNode(this);
        let bod = {
            userName: "",
            password: "",
            role: ""
        };
        if (dom instanceof HTMLElement) {
            bod.userName = dom.querySelector("input[name='log-in-name']").value;
            bod.password = dom.querySelector("input[name='log-in-password']").value;
            bod.role = dom.querySelector("select[class='log-in-custom-select']").value;
            try {
                const response = await fetch(Config.api_url + "account/login",
                    {
                        method: "POST",
                        mode: "cors",
                        credentials: "include",
                        headers: {
                            'Content-Type': 'application/json',
                            // http://localhost:8080/account/login

                        },
                        body: JSON.stringify(bod)
                    }
                );

                if (!response.ok) { throw Error(response.status + ": " + response.statusText); }
                const user = await response.json();
                // console.log(await user);
                this.props.reload.call(this, await user);
            } catch (err) {
                console.log(err);
            }
        } else {
            console.log("find DOM do not work");
        }
    }

    componentDidMount() {
        $("head").append('<link href="/css/login.css" rel="stylesheet"/>');
        $("head").append('<link href="/css/navbar.css" rel="stylesheet"/>');

        $('.button-group > button').on('click', function () {
            $('.button-group > button').removeClass('active');
            $(this).addClass('active');
        });

        let pathname = window.location.pathname;
        if(pathname !== '/'){
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

        // click sign up and close sign up form
        $('.signup').click(function () {
            $('.signUpForm').show();
        });

        $('.closeLogin').click(function () {
            $('.signUpForm,.loginForm').hide();
        });
        // click login and close login form

        $('.login').click(function () {
            $('.loginForm').show();
        });

        $('.SpanLogin').click(function () {
            $('.loginForm').show();
            $('.signUpForm').hide();
        });

        $('.SignIn').click(function () {
            $('.signUpForm').show();
            $('.loginForm').hide();
        });

        //mouse click outside .content-login form
        $(document).mouseup(function (e) {
            if (e.button === 0) {
                var container = $(".content-login");
                // if the target of the click isn't the container nor a descendant of the container
                if (!container.is(e.target) && container.has(e.target).length === 0) {
                    $('.signUpForm,.loginForm').hide();
                }
            }
        });

        // hide and show password in login
        $(document).on('click', '.fa-eye', function () {
            var input = $("#pass_log_id");
            input.attr('type') === 'password' ? input.attr('type', 'text') : input.attr('type', 'password');
        });
    }
    render() {
        return (
            <div>
                {/* sign up */}
                <div className="layout signUpForm">
                    <div className="content-login">
                        <button className="closeLogin">
                            <i className="fa fa-times" />
                        </button>
                        <h3 className="SubTitle-230L-">Sign up </h3>
                        <form style={{ textAlign: "center" }} onSubmit={this.signUp}>
                            <div className="SignupForm-20HPb">
                                <div className="role">
                                    <label className="InputLabel-Tch5j InputLabelConditionalHide-24VTo">
                                        You are *</label>
                                    <select className="sign-up-custom-select" id="inputGroupSelect02">
                                        <option value="GUIDER">Guider</option>
                                        <option value="TRAVELER">Traveler</option>

                                    </select>
                                </div>
                                <div className="UserName">
                                    <label className="InputLabel-Tch5j InputLabelConditionalHide-24VTo">
                                        Nick name *
                                </label>
                                    <input
                                        className="Input-1e6rU"
                                        type="text"
                                        name="sign-up-name"
                                        placeholder="Name"
                                    />
                                </div>

                                {/* <div className="email">
                                    <label className="InputLabel-Tch5j InputLabelConditionalHide-24VTo">
                                        Email *
                                </label>
                                    <input
                                        className="Input-1e6rU"
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                    />
                                </div> */}
                                <div className="PasswordInput-1Qf5F">
                                    <div className="password">
                                        <label className="InputLabel-Tch5j InputLabelConditionalHide-24VTo">
                                            Password
                                </label>
                                        <input
                                            className="Input-1e6rU"
                                            placeholder="Password"
                                            type="password"
                                            name="sign-up-password"
                                            required

                                        />
                                    </div>
                                </div>
                                <div className="lastName">
                                    <label className="InputLabel-Tch5j InputLabelConditionalHide-24VTo">
                                        Confirm password
                                </label>
                                    <input
                                        className="Input-1e6rU"
                                        type="password"
                                        name="rePassword"
                                        placeholder="Password"
                                    />
                                </div>
                            </div>
                            <div className="Submit-2es0L">
                                <button type="submit" className="Button-2iSbC SubmitButton-3lXjw">
                                    <span className="SubmitText-sXv20">Join Withlocals</span>
                                </button>
                            </div>
                            <div className="loginLinkContain">
                                <button className="loginLink">
                                    <span className="SpanReady">I already have an account.</span>
                                    <span className="SpanLogin"> Log in</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                {/* end sign up */}
                {/* login */}
                <div className="layout loginForm">
                    <div className="content-login">
                        <button className="closeLogin">
                            <i className="fa fa-times" />
                        </button>
                        <h3 className="SubTitle-230L-">Log in</h3>
                        <form style={{ textAlign: "center" }} onSubmit={this.logIn}>
                            <div className="SignupForm-20HPb">
                                <div className="role">
                                    <label className="InputLabel-Tch5j InputLabelConditionalHide-24VTo">
                                        You are *</label>
                                    <select className="log-in-custom-select" id="inputGroupSelect02">
                                        <option value="GUIDER">Guider</option>
                                        <option value="TRAVELER">Traveler</option>

                                    </select>
                                </div>
                                <div className="firstName">
                                    <label className="InputLabel-Tch5j InputLabelConditionalHide-24VTo">
                                        Nick name *
                                </label>
                                    <input
                                        className="Input-1e6rU"
                                        type="text"
                                        name="log-in-name"
                                        placeholder="Name"
                                    />
                                </div>
                                <div className="PasswordInput-1Qf5F">
                                    <div className="password">
                                        <label className="InputLabel-Tch5j InputLabelConditionalHide-24VTo">
                                            Password
                            </label>
                                        <div className="showPass">
                                            <input
                                                id="pass_log_id"
                                                className="Input-1e6rU"
                                                placeholder="Password"
                                                type="password"
                                                name="log-in-password"
                                                required

                                            />
                                            <i className="fa fa-eye" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="forgotPass">
                                <a href="javascrip:void(0)">I forgot my password</a>
                            </div>
                            <div className="Submit-2es0L">
                                <button type="submit" className="Button-2iSbC SubmitButton-3lXjw">
                                    <span className="SubmitText-sXv20">Login</span>
                                </button>
                            </div>
                            <div className="loginLinkContain">
                                <button className="loginLink">
                                    <span className="SpanReady">No account?</span>
                                    <span className="SignIn"> Sign in</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                {/* end login */}
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
                                            <button className="active">Guider</button>
                                            <button>Location</button>
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
                            <ul>
                                <li>
                                    <a href="#">Become a host</a>
                                </li>
                                <li>
                                    <a href="#" className="login">
                                        Log in
                        </a>
                                </li>
                                <li>
                                    <a href="#" className="signup">
                                        Sign up
                        </a>
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

export default Navbar;