import React, { Component } from 'react';
import "font-awesome/css/font-awesome.min.css";
import $ from 'jquery';

class ProfileGuiders extends Component {
    componentDidMount(){
        //add css with jquery
        $("head").append('<link href="/css/profile.css" rel="stylesheet"/>');
        $("head").append('<link href="/css/login.css" rel="stylesheet"/>');

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
        
        //read more and read less
        $('.moreless-button').click(function () {
            $('.moretext').slideToggle();
            if ($('.moreless-button').text() === "Read more") {
                $(this).text("Read less")
            } else {
                $(this).text("Read more")
            }
        });
    
        //show and hide comment
        var size_li = $(".listReview li").length;
        $('#showLess').hide();
        var x = 3;
        $('.listReview li:lt(' + x + ')').show();

        $('#loadMore').click(function () {
           x = (x + 3 <= size_li) ? x + 3 : size_li;
            $('.listReview li:lt(' + x + ')').show(500);
            if(x > 3){
                $('#showLess').show();
            }
            if(x === size_li){
                $('#loadMore').hide();
            }
        });
        $('#showLess').click(function () {
            var x = (x - 3 < 3) ? 3 : x - 3;
            $('.listReview li').not(':lt(' + x + ')').hide(500);
            if (x <= 3) {
                $('#showLess').hide();
            }if(x < size_li){
                $('#loadMore').show();
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
        //.sheet redirect
        // toi ve lam not
        $(document).on('click', '.sheet', function(event) { 
            // event.preventDefault(); 
            $("#sheetTrigger").trigger('click');
            console.log('why run?');
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
                <div id="reactContainer">
                    {/* Menubar */}
                    <nav className="navbar">
                    <div className="menubar">
                        <div className="logoContainer">
                        <a href="#">
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
                    {/*  Content  */}
                    <div className="content">
                    <div className="content-left">
                        <div className="profile-box">
                        <div className="pb-header header-stick">
                            <div className="header-pb">
                            <h1 className="TitlePb TileStickyPb">Lucia</h1>
                            <h2 className="TitlePb TileStickyPb">The Life Lover</h2>
                            <div className="Rating">
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                250 reviews
                            </div>
                            </div>
                            <div>
                            <img
                                className="pf-avatar"
                                src="https://withlocals-com-res.cloudinary.com/image/upload/w_80,h_80,c_thumb,q_auto,dpr_1.0,f_auto/956bda712df856f552fa7bfebbbcce8f"
                            />
                            </div>
                        </div>
                        <p className="ListItem">
                            <span className="ListItemIcon">
                          <i className="fa fa-map-marker" aria-hidden="true"></i>
                            </span>
                            <span className="ListItemText">I live in</span>
                        </p>
                        <p className="ListItem">
                            <span className="ListItemIcon">
                            <i className="fa fa-globe" />
                            </span>
                            <span className="ListItemText">I speak</span>
                        </p>
                        <p className="ListItem">
                            <span className="ListItemIcon">
                            <i className="fa fa-heart" />
                            </span>
                            <span className="ListItemText">My passions are</span>
                        </p>
                        <p className="ListItem">
                            <span className="ListItemIcon">
                            <i className="fa fa-shield" aria-hidden="true"></i>
                            </span>
                            <span className="ListItemText">Verified</span>
                        </p>
                        <p className="ListItem">
                            <span className="ListItemIcon">
                            <i className="fa fa-clock-o" aria-hidden="true"></i>
                            </span>
                            <span className="ListItemText">Response time</span>
                        </p>
                        <button className="BtnContact">Contact me</button>
                        </div>
                    </div>
                    <div className="content-right">
                        {/* intro content */}
                        <div className="intro">
                        <h2>Hi There ! Nice to meet you</h2>
                        <video controls>
                            <source
                            src="/video/withlocals_originals_silvina_merino.mp4"
                            type="video/mp4"
                            />
                        </video>
                        <div className="readMoreText">
                            <div id="section">
                            <div className="article">
                                <p>
                                The best way to make the most out of your stay. Enjoy the city
                                like and with a local. Lisbon is a mix of wonderful
                                architecture, lively streets, and colorful sights. Get answers
                                to all questions and the best recommendations from your local
                                insider!
                                </p>
                                <p className="moretext">
                                Known as the city of the seven hills, its name comes from
                                Olisipo, name that the town already had before the Roman
                                occupation, in 205 BC Located in zone of strong seismic
                                intensity, suffered several earthquakes throughout the
                                centuries, having the earthquake of 1755 , followed by tsunami
                                and fire, totally destroying the riverside area of the city.
                                The reconstruction plan of the city implemented by Marquês de
                                Pombal is still visible today in the streets of Lisbon, mainly
                                in downtown Lisbon. Lisbon was one of the main centers of
                                introduction and development of Christianity in the Iberian
                                Peninsula.
                                </p>
                            </div>
                            <a className="moreless-button" onClick={e => e.preventDefault()}>
                                Read more
                            </a>
                            </div>
                        </div>
                        </div>
                        {/* End intro */}
                        {/* Passions */}
                        <div className="right-mainContent">
                        <div className="myPassions">
                            <h2>My passions</h2>
                            <ul>
                            <li>
                            <i className="fa fa-cutlery" aria-hidden="true"></i>
                                <p>
                                My diet is mosly plant based and I love to discover new
                                flavours, to try new recipes and to go to Veggie/Vegan
                                Restaurants around the world!!! I feel better with this diet!
                                I love cooking!
                                </p>
                            </li>
                            <li>
                                <i className="fa fa-globe" />
                                <p>
                                Because I love to discover new cultures!!! It is exciting to
                                see different people, food, architeture, etc.
                                </p>
                            </li>
                            <li>
                            <i className="fa fa-gratipay" aria-hidden="true"></i>
                                <p>
                                I love movies! Every week I go to cinema! We can forget about
                                everything and just enjoy the experience! I like this feeling!
                                </p>
                            </li>
                            </ul>
                        </div>
                        {/* End passions */}
                        {/* BookOffers */}
                        <div className="bookOffers">
                            <h2>Book one of my offers in Ha Noi</h2>
                            <ul>
                            <li>
                                <div className="sheet">
                                <button className="unlike">
                                    <i className="fa fa-heart" />
                                </button>
                                <button className="like">
                                    <i className="far fa-heart" />
                                </button>
                                <div className="imageFigure">
                                    <img src="./img/1.jpg" alt="logo" width={42} height={42} />
                                </div>
                                <div className="experienceCard-details">
                                    <div className="experienceAvatarCardContainer">
                                    <div className="experienceAvatarCard1">
                                        <img
                                        src="./img/2.jpg"
                                        alt="logo"
                                        width={64}
                                        height={64}
                                        />
                                    </div>
                                    <div className="experienceAvatarCard2">
                                        <img
                                        src="./img/3.jpg"
                                        alt="logo"
                                        width={64}
                                        height={64}
                                        />
                                    </div>
                                    <div className="localAvailable">
                                        7 others locals available
                                    </div>
                                    </div>
                                    <span className="enjoy">
                                    Enjoy Hanoi with <span className="withName">Amadio</span>
                                    </span>
                                    <h3 >Mysteries of Regaleira: Sintra</h3>
                                    <div className="price">
                                    <span>$57.50 pp</span>
                                    <span className="experienceCard-topDetails-bullet">
                                        ●
                                    </span>
                                    <span className="experienceCard-topDetails-duration">
                                        8 hours
                                    </span>
                                    <span className="experienceCard-topDetails-bullet">
                                        {" "}
                                        ●
                                    </span>
                                    <span data-translatekey="Experience.SubcategoryOrTag.day-trip">
                                        Day trip
                                    </span>
                                    </div>
                                    <div className="experienceCard-bottomDetails">
                                    <div className="rating">
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                    </div>
                                    <span className="colorShared">1249 |</span>
                                    <span className="colorShared">
                                        <i className="fa fa-bolt" /> |
                                    </span>
                                    <span className="colorShared">
                                        <i className="fa fa-car" />
                                    </span>
                                    </div>
                                </div>
                                </div>
                                <a id="sheetTrigger" href="edit.html">
                                trigger
                                </a>
                            </li>
                            <li>
                                <div className="sheet">
                                <button className="unlike">
                                    <i className="fa fa-heart" />
                                </button>
                                <button className="like">
                                    <i className="far fa-heart" />
                                </button>
                                <div className="imageFigure">
                                    <img src="./img/1.jpg" alt="logo" width={42} height={42} />
                                </div>
                                <div className="experienceCard-details">
                                    <div className="experienceAvatarCardContainer">
                                    <div className="experienceAvatarCard1">
                                        <img
                                        src="./img/2.jpg"
                                        alt="logo"
                                        width={64}
                                        height={64}
                                        />
                                    </div>
                                    <div className="experienceAvatarCard2">
                                        <img
                                        src="./img/3.jpg"
                                        alt="logo"
                                        width={64}
                                        height={64}
                                        />
                                    </div>
                                    <div className="localAvailable">
                                        7 others locals available
                                    </div>
                                    </div>
                                    <span className="enjoy">
                                    Enjoy Hanoi with <span className="withName">Amadio</span>
                                    </span>
                                    <h3 >Mysteries of Regaleira: Sintra</h3>
                                    <div className="price">
                                    <span>$57.50 pp</span>
                                    <span className="experienceCard-topDetails-bullet">
                                        ●
                                    </span>
                                    <span className="experienceCard-topDetails-duration">
                                        8 hours
                                    </span>
                                    <span className="experienceCard-topDetails-bullet">
                                        {" "}
                                        ●
                                    </span>
                                    <span data-translatekey="Experience.SubcategoryOrTag.day-trip">
                                        Day trip
                                    </span>
                                    </div>
                                    <div className="experienceCard-bottomDetails">
                                    <div className="rating">
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                    </div>
                                    <span className="colorShared">1249 |</span>
                                    <span className="colorShared">
                                        <i className="fa fa-bolt" /> |
                                    </span>
                                    <span className="colorShared">
                                        <i className="fa fa-car" />
                                    </span>
                                    </div>
                                </div>
                                </div>
                            </li>
                            <li>
                                <div className="sheet">
                                <button className="unlike">
                                    <i className="fa fa-heart" />
                                </button>
                                <button className="like">
                                    <i className="far fa-heart" />
                                </button>
                                <div className="imageFigure">
                                    <img src="./img/1.jpg" alt="logo" width={42} height={42} />
                                </div>
                                <div className="experienceCard-details">
                                    <div className="experienceAvatarCardContainer">
                                    <div className="experienceAvatarCard1">
                                        <img
                                        src="./img/2.jpg"
                                        alt="logo"
                                        width={64}
                                        height={64}
                                        />
                                    </div>
                                    <div className="experienceAvatarCard2">
                                        <img
                                        src="./img/3.jpg"
                                        alt="logo"
                                        width={64}
                                        height={64}
                                        />
                                    </div>
                                    <div className="localAvailable">
                                        7 others locals available
                                    </div>
                                    </div>
                                    <span className="enjoy">
                                    Enjoy Hanoi with <span className="withName">Amadio</span>
                                    </span>
                                    <h3>Mysteries of Regaleira: Sintra</h3>
                                    <div className="price">
                                    <span>$57.50 pp</span>
                                    <span className="experienceCard-topDetails-bullet">
                                        ●
                                    </span>
                                    <span className="experienceCard-topDetails-duration">
                                        8 hours
                                    </span>
                                    <span className="experienceCard-topDetails-bullet">
                                        {" "}
                                        ●
                                    </span>
                                    <span data-translatekey="Experience.SubcategoryOrTag.day-trip">
                                        Day trip
                                    </span>
                                    </div>
                                    <div className="experienceCard-bottomDetails">
                                    <div className="rating">
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                    </div>
                                    <span className="colorShared">1249 |</span>
                                    <span className="colorShared">
                                        <i className="fa fa-bolt" /> |
                                    </span>
                                    <span className="colorShared">
                                        <i className="fa fa-car" />
                                    </span>
                                    </div>
                                </div>
                                </div>
                            </li>
                            <li>
                                <div className="sheet">
                                <button className="unlike">
                                    <i className="fa fa-heart" />
                                </button>
                                <button className="like">
                                    <i className="far fa-heart" />
                                </button>
                                <div className="imageFigure">
                                    <img src="./img/1.jpg" alt="logo" width={42} height={42} />
                                </div>
                                <div className="experienceCard-details">
                                    <div className="experienceAvatarCardContainer">
                                    <div className="experienceAvatarCard1">
                                        <img
                                        src="./img/2.jpg"
                                        alt="logo"
                                        width={64}
                                        height={64}
                                        />
                                    </div>
                                    <div className="experienceAvatarCard2">
                                        <img
                                        src="./img/3.jpg"
                                        alt="logo"
                                        width={64}
                                        height={64}
                                        />
                                    </div>
                                    <div className="localAvailable">
                                        7 others locals available
                                    </div>
                                    </div>
                                    <span className="enjoy">
                                    Enjoy Hanoi with <span className="withName">Amadio</span>
                                    </span>
                                    <h3>Mysteries of Regaleira: Sintra</h3>
                                    <div className="price">
                                    <span>$57.50 pp</span>
                                    <span className="experienceCard-topDetails-bullet">
                                        ●
                                    </span>
                                    <span className="experienceCard-topDetails-duration">
                                        8 hours
                                    </span>
                                    <span className="experienceCard-topDetails-bullet">
                                        {" "}
                                        ●
                                    </span>
                                    <span data-translatekey="Experience.SubcategoryOrTag.day-trip">
                                        Day trip
                                    </span>
                                    </div>
                                    <div className="experienceCard-bottomDetails">
                                    <div className="rating">
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                    </div>
                                    <span className="colorShared">1249 |</span>
                                    <span className="colorShared">
                                        <i className="fa fa-bolt" /> |
                                    </span>
                                    <span className="colorShared">
                                        <i className="fa fa-car" />
                                    </span>
                                    </div>
                                </div>
                                </div>
                            </li>
                            <li>
                                <div className="sheet">
                                <button className="unlike">
                                    <i className="fa fa-heart" />
                                </button>
                                <button className="like">
                                    <i className="far fa-heart" />
                                </button>
                                <div className="imageFigure">
                                    <img src="./img/1.jpg" alt="logo" width={42} height={42} />
                                </div>
                                <div className="experienceCard-details">
                                    <div className="experienceAvatarCardContainer">
                                    <div className="experienceAvatarCard1">
                                        <img
                                        src="./img/2.jpg"
                                        alt="logo"
                                        width={64}
                                        height={64}
                                        />
                                    </div>
                                    <div className="experienceAvatarCard2">
                                        <img
                                        src="./img/3.jpg"
                                        alt="logo"
                                        width={64}
                                        height={64}
                                        />
                                    </div>
                                    <div className="localAvailable">
                                        7 others locals available
                                    </div>
                                    </div>
                                    <span className="enjoy">
                                    Enjoy Hanoi with <span className="withName">Amadio</span>
                                    </span>
                                    <h3>Mysteries of Regaleira: Sintra</h3>
                                    <div className="price">
                                    <span>$57.50 pp</span>
                                    <span className="experienceCard-topDetails-bullet">
                                        ●
                                    </span>
                                    <span className="experienceCard-topDetails-duration">
                                        8 hours
                                    </span>
                                    <span className="experienceCard-topDetails-bullet">
                                        {" "}
                                        ●
                                    </span>
                                    <span data-translatekey="Experience.SubcategoryOrTag.day-trip">
                                        Day trip
                                    </span>
                                    </div>
                                    <div className="experienceCard-bottomDetails">
                                    <div className="rating">
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                    </div>
                                    <span className="colorShared">1249 |</span>
                                    <span className="colorShared">
                                        <i className="fa fa-bolt" /> |
                                    </span>
                                    <span className="colorShared">
                                        <i className="fa fa-car" />
                                    </span>
                                    </div>
                                </div>
                                </div>
                            </li>
                            <li>
                                <div className="sheet">
                                <button className="unlike">
                                    <i className="fa fa-heart" />
                                </button>
                                <button className="like">
                                    <i className="far fa-heart" />
                                </button>
                                <div className="imageFigure">
                                    <img src="./img/1.jpg" alt="logo" width={42} height={42} />
                                </div>
                                <div className="experienceCard-details">
                                    <div className="experienceAvatarCardContainer">
                                    <div className="experienceAvatarCard1">
                                        <img
                                        src="./img/2.jpg"
                                        alt="logo"
                                        width={64}
                                        height={64}
                                        />
                                    </div>
                                    <div className="experienceAvatarCard2">
                                        <img
                                        src="./img/3.jpg"
                                        alt="logo"
                                        width={64}
                                        height={64}
                                        />
                                    </div>
                                    <div className="localAvailable">
                                        7 others locals available
                                    </div>
                                    </div>
                                    <span className="enjoy">
                                    Enjoy Hanoi with <span className="withName">Amadio</span>
                                    </span>
                                    <h3>Mysteries of Regaleira: Sintra</h3>
                                    <div className="price">
                                    <span>$57.50 pp</span>
                                    <span className="experienceCard-topDetails-bullet">
                                        ●
                                    </span>
                                    <span className="experienceCard-topDetails-duration">
                                        8 hours
                                    </span>
                                    <span className="experienceCard-topDetails-bullet">
                                        {" "}
                                        ●
                                    </span>
                                    <span data-translatekey="Experience.SubcategoryOrTag.day-trip">
                                        Day trip
                                    </span>
                                    </div>
                                    <div className="experienceCard-bottomDetails">
                                    <div className="rating">
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                    </div>
                                    <span className="colorShared">1249 |</span>
                                    <span className="colorShared">
                                        <i className="fa fa-bolt" /> |
                                    </span>
                                    <span className="colorShared">
                                        <i className="fa fa-car" />
                                    </span>
                                    </div>
                                </div>
                                </div>
                            </li>
                            </ul>
                        </div>
                        {/* End bookOffers */}
                        <div className="requestForOffers">
                            <div className="requestForOffersContent">
                            <img src="./img/2.jpg" alt="logo" />
                            <h2>
                                Hi there!
                                <br />I can personalize your experience
                            </h2>
                            <p>
                                Just let me know your preferences for a private and personalize
                                experience!
                            </p>
                            <button className="Button-3JfKU">
                                Request a personalized offer
                            </button>
                            </div>
                        </div>
                        {/* Review */}
                        <ul className="listReview">
                            <h2>Reviews</h2>
                            <li>
                            <div className="review">
                                <div className="reviewContainer">
                                <img
                                    className="defaultLogo"
                                    src="./img/defaultAvatarComment.webp"
                                    alt="logo"
                                />
                                <div className="reviewInfo">
                                    <div className="nickName">AnnaBanana</div>
                                    <div className="rating">
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    </div>
                                    <div className="dateComment">1 October 2019</div>
                                </div>
                                <div className="commentDetails">
                                    You can go to a city and explore it one time, two times,
                                    maybe even lucky enough to go three times. You can research
                                    that city on the internet and get so much information. But,
                                    you will never know a city the way a local knows their city.
                                    Laura showed us so many hidden treasures in Barcelona that
                                    were not on the internet. We were with her for only three
                                    hours. Yet we saw so much and learned so much about
                                    Barcelona and Spain in that short period of time. Laura is
                                    an amazing guide. Her English is easy to understand. And she
                                    is truly a friendly, knowledgable person.
                                </div>
                                <span className="reviewTitle">Laura The Local!</span>
                                </div>
                            </div>
                            </li>
                            <li>
                            <div className="review">
                                <div className="reviewContainer">
                                <img
                                    className="defaultLogo"
                                    src="./img/defaultAvatarComment.webp"
                                    alt="logo"
                                />
                                <div className="reviewInfo">
                                    <div className="nickName">AnnaBanana</div>
                                    <div className="rating">
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    </div>
                                    <div className="dateComment">1 October 2019</div>
                                </div>
                                <div className="commentDetails">
                                    You can go to a city and explore it one time, two times,
                                    maybe even lucky enough to go three times. You can research
                                    that city on the internet and get so much information. But,
                                    you will never know a city the way a local knows their city.
                                    Laura showed us so many hidden treasures in Barcelona that
                                    were not on the internet. We were with her for only three
                                    hours. Yet we saw so much and learned so much about
                                    Barcelona and Spain in that short period of time. Laura is
                                    an amazing guide. Her English is easy to understand. And she
                                    is truly a friendly, knowledgable person.
                                </div>
                                <span className="reviewTitle">Laura The Local!</span>
                                </div>
                            </div>
                            </li>
                            <li>
                            <div className="review">
                                <div className="reviewContainer">
                                <img
                                    className="defaultLogo"
                                    src="./img/defaultAvatarComment.webp"
                                    alt="logo"
                                />
                                <div className="reviewInfo">
                                    <div className="nickName">AnnaBanana</div>
                                    <div className="rating">
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    </div>
                                    <div className="dateComment">1 October 2019</div>
                                </div>
                                <div className="commentDetails">
                                    You can go to a city and explore it one time, two times,
                                    maybe even lucky enough to go three times. You can research
                                    that city on the internet and get so much information. But,
                                    you will never know a city the way a local knows their city.
                                    Laura showed us so many hidden treasures in Barcelona that
                                    were not on the internet. We were with her for only three
                                    hours. Yet we saw so much and learned so much about
                                    Barcelona and Spain in that short period of time. Laura is
                                    an amazing guide. Her English is easy to understand. And she
                                    is truly a friendly, knowledgable person.
                                </div>
                                <span className="reviewTitle">Laura The Local!</span>
                                </div>
                            </div>
                            </li>
                            <li>
                            <div className="review">
                                <div className="reviewContainer">
                                <img
                                    className="defaultLogo"
                                    src="./img/defaultAvatarComment.webp"
                                    alt="logo"
                                />
                                <div className="reviewInfo">
                                    <div className="nickName">AnnaBanana</div>
                                    <div className="rating">
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    </div>
                                    <div className="dateComment">1 October 2019</div>
                                </div>
                                <div className="commentDetails">
                                    You can go to a city and explore it one time, two times,
                                    maybe even lucky enough to go three times. You can research
                                    that city on the internet and get so much information. But,
                                    you will never know a city the way a local knows their city.
                                    Laura showed us so many hidden treasures in Barcelona that
                                    were not on the internet. We were with her for only three
                                    hours. Yet we saw so much and learned so much about
                                    Barcelona and Spain in that short period of time. Laura is
                                    an amazing guide. Her English is easy to understand. And she
                                    is truly a friendly, knowledgable person.
                                </div>
                                <span className="reviewTitle">Laura The Local!</span>
                                </div>
                            </div>
                            </li>
                            <li>
                            <div className="review">
                                <div className="reviewContainer">
                                <img
                                    className="defaultLogo"
                                    src="./img/defaultAvatarComment.webp"
                                    alt="logo"
                                />
                                <div className="reviewInfo">
                                    <div className="nickName">AnnaBanana</div>
                                    <div className="rating">
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    </div>
                                    <div className="dateComment">1 October 2019</div>
                                </div>
                                <div className="commentDetails">
                                    You can go to a city and explore it one time, two times,
                                    maybe even lucky enough to go three times. You can research
                                    that city on the internet and get so much information. But,
                                    you will never know a city the way a local knows their city.
                                    Laura showed us so many hidden treasures in Barcelona that
                                    were not on the internet. We were with her for only three
                                    hours. Yet we saw so much and learned so much about
                                    Barcelona and Spain in that short period of time. Laura is
                                    an amazing guide. Her English is easy to understand. And she
                                    is truly a friendly, knowledgable person.
                                </div>
                                <span className="reviewTitle">Laura The Local!</span>
                                </div>
                            </div>
                            </li>
                            <li>
                            <div className="review">
                                <div className="reviewContainer">
                                <img
                                    className="defaultLogo"
                                    src="./img/defaultAvatarComment.webp"
                                    alt="logo"
                                />
                                <div className="reviewInfo">
                                    <div className="nickName">AnnaBanana</div>
                                    <div className="rating">
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    </div>
                                    <div className="dateComment">1 October 2019</div>
                                </div>
                                <div className="commentDetails">
                                    You can go to a city and explore it one time, two times,
                                    maybe even lucky enough to go three times. You can research
                                    that city on the internet and get so much information. But,
                                    you will never know a city the way a local knows their city.
                                    Laura showed us so many hidden treasures in Barcelona that
                                    were not on the internet. We were with her for only three
                                    hours. Yet we saw so much and learned so much about
                                    Barcelona and Spain in that short period of time. Laura is
                                    an amazing guide. Her English is easy to understand. And she
                                    is truly a friendly, knowledgable person.
                                </div>
                                <span className="reviewTitle">Laura The Local!</span>
                                </div>
                            </div>
                            </li>
                            <li>
                            <div className="review">
                                <div className="reviewContainer">
                                <img
                                    className="defaultLogo"
                                    src="./img/defaultAvatarComment.webp"
                                    alt="logo"
                                />
                                <div className="reviewInfo">
                                    <div className="nickName">AnnaBanana</div>
                                    <div className="rating">
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    </div>
                                    <div className="dateComment">1 October 2019</div>
                                </div>
                                <div className="commentDetails">
                                    You can go to a city and explore it one time, two times,
                                    maybe even lucky enough to go three times. You can research
                                    that city on the internet and get so much information. But,
                                    you will never know a city the way a local knows their city.
                                    Laura showed us so many hidden treasures in Barcelona that
                                    were not on the internet. We were with her for only three
                                    hours. Yet we saw so much and learned so much about
                                    Barcelona and Spain in that short period of time. Laura is
                                    an amazing guide. Her English is easy to understand. And she
                                    is truly a friendly, knowledgable person.
                                </div>
                                <span className="reviewTitle">Laura The Local!</span>
                                </div>
                            </div>
                            </li>
                            <li>
                            <div className="review">
                                <div className="reviewContainer">
                                <img
                                    className="defaultLogo"
                                    src="./img/defaultAvatarComment.webp"
                                    alt="logo"
                                />
                                <div className="reviewInfo">
                                    <div className="nickName">AnnaBanana</div>
                                    <div className="rating">
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    </div>
                                    <div className="dateComment">1 October 2019</div>
                                </div>
                                <div className="commentDetails">
                                    You can go to a city and explore it one time, two times,
                                    maybe even lucky enough to go three times. You can research
                                    that city on the internet and get so much information. But,
                                    you will never know a city the way a local knows their city.
                                    Laura showed us so many hidden treasures in Barcelona that
                                    were not on the internet. We were with her for only three
                                    hours. Yet we saw so much and learned so much about
                                    Barcelona and Spain in that short period of time. Laura is
                                    an amazing guide. Her English is easy to understand. And she
                                    is truly a friendly, knowledgable person.
                                </div>
                                <span className="reviewTitle">Laura The Local!</span>
                                </div>
                            </div>
                            </li>
                        </ul>
                        {/* End Review */}
                        {/* Load Review button */}
                        <div className="commentButton">
                            <div id="loadMore">Show more reviews</div>
                            <div id="showLess">Hide less reviews</div>
                        </div>
                        {/* End Load Review button */}
                        <div className="thisIsTravel">
                            <h2>This is Withlocals</h2>
                            <video controls>
                            <source
                                src="/video/withlocalsvideo_e7rahz.mp4"
                                type="video/mp4"
                            />
                            </video>
                        </div>
                        <div className="experienceInCity">
                            <img src="./img/hanoi.jpg" alt="hanoi" />
                            <div className="localExperience">
                            Ha Noi
                            <button>See all Ha Noi experience</button>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    {/*  End Content  */}
                    <footer>
                    <div className="footer-content">
                        <div className="socialMedia">
                        <div className="webLogo">
                            <a href="#">
                            <i className="fa fa-arrows" aria-hidden="true"/>
                            </a>
                            Travel
                        </div>
                        <ul className="socialMediaList">
                            <li>
                            <a href="#">
                                <i className="fa fa-facebook-square" />
                            </a>
                            </li>
                            <li>
                            <a href="#">
                                <i className="fa fa-twitter-square" />
                            </a>
                            </li>
                            <li>
                            <a href="#">
                                <i className="fa fa-instagram" />
                            </a>
                            </li>
                            <li>
                            <a href="#">
                                <i className="fa fa-youtube" />
                            </a>
                            </li>
                            <li>
                            <a href="#">
                                <i className="fa fa-pinterest-square" />
                            </a>
                            </li>
                            <li>
                            <a href="#">
                                <i className="fa fa-facebook-messenger" />
                            </a>
                            </li>
                        </ul>
                        </div>
                        <div className="webInfo">
                        <div>
                            <h4>Contact us</h4>
                            <ul>
                            <li>
                                <a>Phone:0969449743</a>
                            </li>
                            <li>
                                <a>Mail:Longthse04935@fpt.edu.vn</a>
                            </li>
                            <li>
                                <a>Help</a>
                            </li>
                            </ul>
                        </div>
                        <div>
                            <h4>Support</h4>
                            <ul>
                            <li>
                                <a>Help Center for hosts</a>
                            </li>
                            <li>
                                <a>Help Center for travelers</a>
                            </li>
                            <li>
                                <a>Pravicy Policy</a>
                            </li>
                            <li>
                                <a>Term and Conditions</a>
                            </li>
                            <li>
                                <a>Cancelation policy for guests</a>
                            </li>
                            <li>
                                <a>Cancelation policy for hosts</a>
                            </li>
                            </ul>
                        </div>
                        <div>
                            <h4>How to partner</h4>
                            <ul>
                            <li>
                                <a>Become a host</a>
                            </li>
                            <li>
                                <a>Become a partner</a>
                            </li>
                            <li>
                                <a>Become an ambassador</a>
                            </li>
                            </ul>
                        </div>
                        <div>
                            <h4>About my web</h4>
                            <ul>
                            <li>
                                <a>Our story</a>
                            </li>
                            <li>
                                <a>Jobs</a>
                            </li>
                            <li>
                                <a>Press</a>
                            </li>
                            <li>
                                <a>Blog</a>
                            </li>
                            </ul>
                        </div>
                        </div>
                        <div />
                    </div>
                    </footer>
                </div>
                </div>;

            </div>
        );
    }
}

export default ProfileGuiders;