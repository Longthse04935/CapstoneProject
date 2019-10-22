import React, { Component } from 'react';
import "font-awesome/css/font-awesome.min.css";
import $ from 'jquery';
import { Link } from "react-router-dom";
class Navbar extends Component {

    componentDidMount(){
        $("head").append('<link href="/css/login.css" rel="stylesheet"/>');
        $("head").append('<link href="/css/navbar.css" rel="stylesheet"/>');

        $('.button-group > button').on('click', function() {
            $('.button-group > button').removeClass('active');
            $(this).addClass('active');
        });
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
    
        //mouse click outside .content-login form
        $(document).mouseup(function(e) 
        {
            if(e.button === 0){
                var container = $(".content-login");
                // if the target of the click isn't the container nor a descendant of the container
                if (!container.is(e.target) && container.has(e.target).length === 0 ) 
                {
                    $('.signUpForm,.loginForm').hide();
                }
            }
        });

         // hide and show password in login
         $(document).on('click', '.fa-eye', function() {
            var input = $("#pass_log_id");
            input.attr('type') === 'password' ? input.attr('type','text') : input.attr('type','password');
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
                        <div className="facebook-button-container">
                            <button className="facebook-button">
                            <span className="IconContainer-3X91n">
                                <svg
                                className="facebook-icon"
                                width={7}
                                height={13}
                                viewBox="0 0 10 20"
                                >
                                <path
                                    d="M6.66666667,6.66666667 L6.66666667,4.68229167 C6.66666667,3.78645833 6.86458333,3.3333333300000003 8.25520833,3.3333333300000003 L10,3.3333333300000003 L10,0 L7.08854167,0 C3.52083333,0 2.34375,1.6354166700000001 2.34375,4.44270833 L2.34375,6.66666667 L0,6.66666667 L0,10 L2.34375,10 L2.34375,20 L6.66666667,20 L6.66666667,10 L9.60416667,10 L10,6.66666667 L6.66666667,6.66666667 L6.66666667,6.66666667 Z"
                                    id="Shape"
                                    stroke="none"
                                    fill="#FFFFFF"
                                    fillRule="nonzero"
                                />
                                </svg>
                            </span>
                            <span className="FacebookText-eC-J-">Sign up with Facebook</span>
                            </button>
                        </div>
                        <div className="google-button-container">
                            <button className="google-button">
                            <svg
                                width={15}
                                height={25}
                                viewBox="0 0 40 40"
                                style={{ marginLeft: 65 }}
                            >
                                <g>
                                <path
                                    d="M39.609375,16.082031 L38,16.082031 L38,16 L20,16 L20,24 L31.304688,24 C29.652344,28.65625 25.222656,32 20,32 C13.371094,32 8,26.628906 8,20 C8,13.371094 13.371094,8 20,8 C23.058594,8 25.84375,9.152344 27.960938,11.039063 L33.617188,5.382813 C30.046875,2.054688 25.269531,0 20,0 C8.953125,0 0,8.953125 0,20 C0,31.046875 8.953125,40 20,40 C31.046875,40 40,31.046875 40,20 C40,18.660156 39.863281,17.351563 39.609375,16.082031 Z"
                                    fill="#FFC107"
                                />
                                <path
                                    d="M2.304688,10.691406 L8.878906,15.511719 C10.65625,11.109375 14.960938,8 20,8 C23.058594,8 25.84375,9.152344 27.960938,11.039063 L33.617188,5.382813 C30.046875,2.054688 25.269531,0 20,0 C12.316406,0 5.65625,4.335938 2.304688,10.691406 Z"
                                    fill="#FF3D00"
                                />
                                <path
                                    d="M20,40 C25.164063,40 29.859375,38.023438 33.410156,34.808594 L27.21875,29.570313 C25.210938,31.089844 22.714844,32 20,32 C14.796875,32 10.382813,28.683594 8.71875,24.054688 L2.195313,29.078125 C5.503906,35.554688 12.226563,40 20,40 Z"
                                    fill="#4CAF50"
                                />
                                <path
                                    d="M39.609375,16.082031 L38,16.082031 L38,16 L20,16 L20,24 L31.304688,24 C30.511719,26.238281 29.070313,28.164063 27.214844,29.570313 C27.21875,29.570313 27.21875,29.570313 27.21875,29.570313 L33.410156,34.808594 C32.972656,35.203125 40,30 40,20 C40,18.660156 39.863281,17.351563 39.609375,16.082031 Z"
                                    fill="#1976D2"
                                />
                                </g>
                            </svg>
                            <span className="Children-49JTf">Sign up with Google</span>
                            </button>
                        </div>
                        <div className="SignupSeparator-zlqUF">
                            <span className="SignupSeparatorText-2cxm-">or</span>
                        </div>
                        <h3 className="SubTitle-230L-">Sign up with your email address</h3>
                        <form style={{ textAlign: "center" }}>
                            <div className="SignupForm-20HPb">
                            <div className="firstName">
                                <label className="InputLabel-Tch5j InputLabelConditionalHide-24VTo">
                                First name *
                                </label>
                                <input
                                className="Input-1e6rU"
                                type="text"
                                name="firstName"
                                placeholder="First name"
                                />
                            </div>
                            <div className="lastName">
                                <label className="InputLabel-Tch5j InputLabelConditionalHide-24VTo">
                                Last name *
                                </label>
                                <input
                                className="Input-1e6rU"
                                type="text"
                                name="lastName"
                                placeholder="Last name"
                                />
                            </div>
                            <div className="email">
                                <label className="InputLabel-Tch5j InputLabelConditionalHide-24VTo">
                                Email *
                                </label>
                                <input
                                className="Input-1e6rU"
                                type="email"
                                name="email"
                                placeholder="Email"
                                />
                            </div>
                            <div className="PasswordInput-1Qf5F">
                                <div className="password">
                                <label className="InputLabel-Tch5j InputLabelConditionalHide-24VTo">
                                    Password
                                </label>
                                <input
                                    className="Input-1e6rU"
                                    placeholder="Password"
                                    type="password"
                                    name="password"
                                    required
                                    defaultValue
                                />
                                </div>
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
                    <div className="facebook-button-container">
                        <button className="facebook-button">
                        <span className="IconContainer-3X91n">
                            <svg
                            className="facebook-icon"
                            width={7}
                            height={13}
                            viewBox="0 0 10 20"
                            >
                            <path
                                d="M6.66666667,6.66666667 L6.66666667,4.68229167 C6.66666667,3.78645833 6.86458333,3.3333333300000003 8.25520833,3.3333333300000003 L10,3.3333333300000003 L10,0 L7.08854167,0 C3.52083333,0 2.34375,1.6354166700000001 2.34375,4.44270833 L2.34375,6.66666667 L0,6.66666667 L0,10 L2.34375,10 L2.34375,20 L6.66666667,20 L6.66666667,10 L9.60416667,10 L10,6.66666667 L6.66666667,6.66666667 L6.66666667,6.66666667 Z"
                                id="Shape"
                                stroke="none"
                                fill="#FFFFFF"
                                fillRule="nonzero"
                            />
                            </svg>
                        </span>
                        <span className="FacebookText-eC-J-">Sign up with Facebook</span>
                        </button>
                    </div>
                    <div className="google-button-container">
                        <button className="google-button">
                        <svg
                            width={15}
                            height={25}
                            viewBox="0 0 40 40"
                            style={{ marginLeft: 65 }}
                        >
                            <g>
                            <path
                                d="M39.609375,16.082031 L38,16.082031 L38,16 L20,16 L20,24 L31.304688,24 C29.652344,28.65625 25.222656,32 20,32 C13.371094,32 8,26.628906 8,20 C8,13.371094 13.371094,8 20,8 C23.058594,8 25.84375,9.152344 27.960938,11.039063 L33.617188,5.382813 C30.046875,2.054688 25.269531,0 20,0 C8.953125,0 0,8.953125 0,20 C0,31.046875 8.953125,40 20,40 C31.046875,40 40,31.046875 40,20 C40,18.660156 39.863281,17.351563 39.609375,16.082031 Z"
                                fill="#FFC107"
                            />
                            <path
                                d="M2.304688,10.691406 L8.878906,15.511719 C10.65625,11.109375 14.960938,8 20,8 C23.058594,8 25.84375,9.152344 27.960938,11.039063 L33.617188,5.382813 C30.046875,2.054688 25.269531,0 20,0 C12.316406,0 5.65625,4.335938 2.304688,10.691406 Z"
                                fill="#FF3D00"
                            />
                            <path
                                d="M20,40 C25.164063,40 29.859375,38.023438 33.410156,34.808594 L27.21875,29.570313 C25.210938,31.089844 22.714844,32 20,32 C14.796875,32 10.382813,28.683594 8.71875,24.054688 L2.195313,29.078125 C5.503906,35.554688 12.226563,40 20,40 Z"
                                fill="#4CAF50"
                            />
                            <path
                                d="M39.609375,16.082031 L38,16.082031 L38,16 L20,16 L20,24 L31.304688,24 C30.511719,26.238281 29.070313,28.164063 27.214844,29.570313 C27.21875,29.570313 27.21875,29.570313 27.21875,29.570313 L33.410156,34.808594 C32.972656,35.203125 40,30 40,20 C40,18.660156 39.863281,17.351563 39.609375,16.082031 Z"
                                fill="#1976D2"
                            />
                            </g>
                        </svg>
                        <span className="Children-49JTf">Sign up with Google</span>
                        </button>
                    </div>
                    <div className="SignupSeparator-zlqUF">
                        <span className="SignupSeparatorText-2cxm-">or</span>
                    </div>
                    <h3 className="SubTitle-230L-">Log in with your email address</h3>
                    <form style={{ textAlign: "center" }}>
                        <div className="SignupForm-20HPb">
                        <div className="email">
                            <label className="InputLabel-Tch5j InputLabelConditionalHide-24VTo">
                            Email *
                            </label>
                            <input
                            className="Input-1e6rU"
                            type="email"
                            name="email"
                            placeholder="Email"
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
                                name="password"
                                required
                                defaultValue
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
                            <span className="SpanLogin"> Sign up</span>
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
                    <i className="fa fa-arrows" aria-hidden="true"/>
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