import React, { Component } from 'react';
import "font-awesome/css/font-awesome.min.css";
import $ from 'jquery';
class Tour extends Component {
    componentDidMount(){
        $("head").append('<link href="/css/tour.css" rel="stylesheet"/>');
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
            input.attr('type') === 'password' ? input.attr('type','text') : input.attr('type','password')
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
    

        //them bot nguoi du lich
        $(document).mouseup(function(e) 
            {
                if(e.button == 0){
                var container = $(".viewNumberTravel");
                var button = $("#Button-1bHL6");
                if (!container.is(e.target) && container.has(e.target).length === 0 && !button.is(e.target) && button.has(e.target).length === 0 ) {
                    $(".viewNumberTravel").hide();
                }
                }
            });

            $(document).on('click', '.DropdownButton-15Fja', function() {
                if($(".viewNumberTravel").css('display') === 'none') {
                $(".viewNumberTravel").show();
                } else {
                $(".viewNumberTravel").hide();
                }
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
                <div id="reactContainer">
  {/* Menubar */}
  <nav className="navbar">
    <div className="menubar">
      <div className="logoContainer">
        <a href="#">
          <i className="far fa-smile-wink" />
        </a>
      </div>
      <div className="search">
        <label>
          <input
            type="text"
            placeholder="Welcome to my website"
            name="search"
            className="searchInput"
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
                  <i className="fa fa-map-marker-alt" />
                  <a>Ha Noi</a>
                </li>
                <li>
                  <i className="fa fa-map-marker-alt" />
                  <a>Ho Chi Minh</a>
                </li>
                <li>
                  <i className="fa fa-map-marker-alt" />
                  <a>Da Nang</a>
                </li>
                <li>
                  <i className="fa fa-map-marker-alt" />
                  <a>Bac Ninh</a>
                </li>
                <li>
                  <i className="fa fa-map-marker-alt" />
                  <a>Da Lat</a>
                </li>
                <li>
                  <i className="fa fa-map-marker-alt" />
                  <a>Hue</a>
                </li>
                <li>
                  <i className="fa fa-map-marker-alt" />
                  <a>Vung Tau</a>
                </li>
                <li>
                  <i className="fa fa-map-marker-alt" />
                  <a>Hai Phong</a>
                </li>
                <li>
                  <i className="fa fa-map-marker-alt" />
                  <a>Phu Quoc</a>
                </li>
                <li>
                  <i className="fa fa-map-marker-alt" />
                  <a>Sapa</a>
                </li>
                <li>
                  <i className="fa fa-map-marker-alt" />
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
            <a href="#" className="login">Log in</a>
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
      <div className="book_block">
        <div className="experience_price">$45.00 per person</div>
        <div className="Rating">
          <i className="fas fa-star" />
          <i className="fas fa-star" />
          <i className="fas fa-star" />
          <i className="fas fa-star" />
          <i className="fas fa-star" />
          250 reviews
        </div>
        <div>
          <div className="DateSelector-2OYxm">
            <button className="Button-1bHL5 DropdownButton-1gKqn">
              <span className="CalendarIconContainer-2Gxrj">
                <svg
                  className="CalendarIcon-3Nhbh"
                  width={16}
                  height={20}
                  viewBox="0 0 18 23"
                >
                  <g>
                    <path d="M17,19.8657336 L17,4.63426638 C17,3.87033675 16.4003614,3.25 15.678604,3.25 L2.32139605,3.25 C1.59963862,3.25 1,3.87033675 1,4.63426638 L1,19.8657336 C1,20.6296633 1.59963862,21.25 2.32139605,21.25 L15.678604,21.25 C16.4003614,21.25 17,20.6296633 17,19.8657336 Z M18,19.8657336 C18,21.174497 16.9603822,22.25 15.678604,22.25 L2.32139605,22.25 C1.03961782,22.25 8.34368004e-16,21.174497 8.34368004e-16,19.8657336 L8.34368004e-16,4.63426638 C8.34368004e-16,3.32550299 1.03961782,2.25 2.32139605,2.25 L15.678604,2.25 C16.9603822,2.25 18,3.32550299 18,4.63426638 L18,19.8657336 Z"></path>
                    <path d="M4,0.5 C4,0.223857625 4.22385763,-9.71445147e-16 4.5,-9.71445147e-16 C4.77614237,-9.71445147e-16 5,0.223857625 5,0.5 L5,5.5 C5,5.77614237 4.77614237,6 4.5,6 C4.22385763,6 4,5.77614237 4,5.5 L4,0.5 Z"></path>
                    <path d="M13,0.5 C13,0.223857625 13.2238576,-3.1918912e-15 13.5,-3.1918912e-15 C13.7761424,-3.1918912e-15 14,0.223857625 14,0.5 L14,5.5 C14,5.77614237 13.7761424,6 13.5,6 C13.2238576,6 13,5.77614237 13,5.5 L13,0.5 Z"></path>
                    <polygon points="0.5 9.25 0.5 8.25 17.5 8.25 17.5 9.25" />
                  </g>
                </svg>
              </span>
              <span id="btn-calendar" className="ButtonText-xoSvS">
                {" "}
                10-10-2019{" "}
              </span>
              <svg
                className="ChevronIcon-1tmys"
                width={9}
                height={5}
                viewBox="0 0 15 9"
              >
                <path d="M7.5,5.66602416 L2.43674491,0.431396522 C1.9082727,-0.114962532 1.01849523,-0.14659907 0.449371305,0.360734337 C-0.119752618,0.868067744 -0.15270734,1.72225426 0.375764875,2.26861331 L6.46950998,8.56860926 C7.02586699,9.14379691 7.97413301,9.14379691 8.53049002,8.56860926 L14.6242351,2.26861331 C15.1527073,1.72225426 15.1197526,0.868067744 14.5506287,0.360734337 C13.9815048,-0.14659907 13.0917273,-0.114962532 12.5632551,0.431396522 L7.5,5.66602416 Z"></path>
              </svg>
            </button>
            <input type="text" id="text-calendar" className="calendar" />
          </div>
          <div className="numberTravel">
            <span>
              <span className="PeopleSelector-3cPTh">
                <button
                  className="Button-1bHL5 DropdownButton-15Fja"
                  id="Button-1bHL6"
                >
                  <span className="ProfileIconContainer-3Xala">
                    <svg
                      className="ProfileIcon-3FvCp"
                      width={16}
                      height={16}
                      viewBox="0 0 20 23"
                    >
                      <g>
                        <path d="M15.414094,6.65663665 C15.414094,3.52796224 12.9882716,1 10.0062103,1 C7.02509025,1 4.59942235,3.52812516 4.59942235,6.65663665 C4.59942235,9.78514815 7.02509025,12.3132733 10.0062103,12.3132733 C12.9882716,12.3132733 15.414094,9.78531106 15.414094,6.65663665 Z M16.4126481,6.65663665 C16.4126481,10.3285794 13.5485479,13.3132733 10.0047644,13.3132733 C6.46189225,13.3132733 3.59797646,10.3283892 3.59797646,6.65663665 C3.59797646,2.9848841 6.46189225,0 10.0047644,0 C13.5485479,0 16.4126481,2.98469387 16.4126481,6.65663665 Z"></path>
                        <path d="M1.01540138,21.9992828 C1.19144555,18.0419836 3.44634003,14.5899302 6.73724542,13.1335217 C6.98976422,13.0217681 7.10387696,12.726467 6.99212337,12.4739482 C6.88036977,12.2214294 6.58506864,12.1073166 6.33254984,12.2190702 C2.53516372,13.8996246 0.00429829063,17.9459179 0.00429829063,22.4992828 L0.00429829063,22.9992828 L20.003133,22.9992828 L20.003133,22.4992828 C20.003133,17.9435721 17.4710994,13.897152 13.6713661,12.2178274 C13.4187915,12.1062 13.1235474,12.2204602 13.0119199,12.4730347 C12.9002924,12.7256093 13.0145526,13.0208534 13.2671272,13.1324809 C16.5600972,14.5878371 18.8160013,18.0399474 18.9920364,21.9992828 L1.01540138,21.9992828 Z"></path>
                      </g>
                    </svg>
                  </span>
                  <span className="ButtonText-3rr6g">4 Adults</span>
                  <svg
                    className="ChevronIcon-1tmys"
                    width={9}
                    height={5}
                    viewBox="0 0 15 9"
                  >
                    <path d="M7.5,5.66602416 L2.43674491,0.431396522 C1.9082727,-0.114962532 1.01849523,-0.14659907 0.449371305,0.360734337 C-0.119752618,0.868067744 -0.15270734,1.72225426 0.375764875,2.26861331 L6.46950998,8.56860926 C7.02586699,9.14379691 7.97413301,9.14379691 8.53049002,8.56860926 L14.6242351,2.26861331 C15.1527073,1.72225426 15.1197526,0.868067744 14.5506287,0.360734337 C13.9815048,-0.14659907 13.0917273,-0.114962532 12.5632551,0.431396522 L7.5,5.66602416 Z"></path>
                  </svg>
                </button>
              </span>
            </span>
            <div className="viewNumberTravel">
              <div className="adult">
                {" "}
                Adults
                <div className="plusAndMinus">
                  <i className="fas fa-minus-circle" />
                  &nbsp;1&nbsp;
                  <i className="fas fa-plus-circle" />
                </div>
              </div>
              <div className="children">
                {" "}
                Children
                <div className="plusAndMinus">
                  <i className="fas fa-minus-circle" />
                  &nbsp;1&nbsp;
                  <i className="fas fa-plus-circle" />
                </div>
              </div>
              <p>€223 per person</p>
              <a href="javascript:void(0)">Apply</a>
            </div>
          </div>
        </div>
        <div className="LocalInfo-3-Zrh">
          <div className="LocalImages-1fJRM">
            <img
              alt
              src="https://withlocals-com-res.cloudinary.com/image/upload/w_56,h_56,c_fill,g_auto,q_auto,dpr_1.0,f_auto/49726c5301c4720ed18497075cd753cd"
              width={56}
              height={56}
              className="LocalAvatar-2w9Nv"
            />
            <img
              alt
              src="https://withlocals-com-res.cloudinary.com/image/upload/w_56,h_56,c_fill,g_auto,q_auto,dpr_1.0,f_auto/502ed371a533beceb145d4f52c96bd7c"
              width={56}
              height={56}
              className="LocalAvatar-2w9Nv"
            />
          </div>
          <div className="LocalInfoText-2C1wz">
            <span>
              <span data-translatekey="ExperiencePage.Footer.pickALocal">
                Pick one of the <span className="HighlightedText-1qv83">7</span>{" "}
                locals available on this tour
              </span>
            </span>
          </div>
        </div>
        <div className="BookButtonContainer-8-YC2">
          <button className="Button-2iSbC Gradient-9mayK FullWidth-pJfgw Large-1e1rx">
            Pick your favorite local
          </button>
        </div>
      </div>
    </div>
    <div className="content-right">
      <div className="intro">
        <ol className="Breadcrumbs">
          <li className="ListItem">
            <a className="Link-3Z1kp" href="#">
              <span>Viet Nam</span>
            </a>
            ›
          </li>
          <li className="ListItem">
            <a className="Link-3Z1kp" href="#">
              <span>Ha Noi</span>
            </a>
            ›
          </li>
          <li className="#">
            <a className="Link-3Z1kp" href="#">
              <span>Tours</span>
            </a>
            ›
          </li>
          <li className="ListItem">
            <a className="Link-3Z1kp" href="#">
              <span>Food tours</span>
            </a>
            ›
          </li>
          <li className="ListItem">
            <span>HaNoi's Favorite Food Tour: 10 tastings</span>
          </li>
        </ol>
        <video controls>
          <source src="./video/Food_Tour-1_m8apyj.webm" type="video/mp4" />
        </video>
        <h2 className="titleTour">
          HaNoi's Favorite Food Tour: the 10 Tastings
        </h2>
        <p className="introduceTour">
          Ready to taste the best food in Lisbon? Get your taste buds dancing
          during the most delicious Lisbon food tour in town! Together with your
          foodie insider, enjoy 10 delicious tastings, and food memories to last
          you a lifetime. What are you waiting for? Tasty local food awaits!
        </p>
      </div>
      <div className="activities">
        <ul>
          <li>
            <i className="fas fa-map-marker-alt" />
            <span>Ha Noi</span>
          </li>
          <li>
            <i className="fas fa-pizza-slice" />
            <span>Food tour</span>
          </li>
          <li>
            <i className="fas fa-hourglass-end" />
            <span>3 hours</span>
          </li>
          <li>
            <i className="fas fa-walking" />
            <span>Walking tour</span>
          </li>
          <li>
            <i className="fas fa-users" />
            <span>Private tour. Only you and your host</span>
          </li>
        </ul>
        <i className="fas fa-sticky-note" />
        <span>
          <strong>Including:</strong>Private guide • 8 tastings and 2 drinks • 2
          alcoholic drinks
        </span>
      </div>
      <div className="activities reason">
        <h2>6 reasons to book this tour</h2>
        <ul>
          <li>
            <i className="fas fa-check" />
            <p>Visit the charming old village of Sintra</p>
          </li>
          <li>
            <i className="fas fa-check" />
            <p>Discover all the mysteries of Regaleira Palace and Gardens</p>
          </li>
          <li>
            <i className="fas fa-check" />
            <p>Be amazed by the Arabic-style Monserrate Palace</p>
          </li>
          <li>
            <i className="fas fa-check" />
            <p>Visit the most westerly point of Europe</p>
          </li>
          <li>
            <i className="fas fa-check" />
            <p>100% personalized to your wishes</p>
          </li>
          <li>
            <i className="fas fa-check" />
            <p>Discover the laid back seaside town of Cascais</p>
          </li>
        </ul>
      </div>
      {/* slideshow */}
      <div className="slideshow">
        <div className="slideshow-container">
          <h2>What you can expect</h2>
          <div className="mySlides fade">
            <img src="/img/natural1.jpg" />
          </div>
          <div className="mySlides fade">
            <img src="/img/nature2.jpg" />
          </div>
          <div className="mySlides fade">
            <img src="/img/nature3.jpg" />
          </div>
          <div className="mySlides fade">
            <img src="/img/nature4.jpg" />
          </div>
          <div className="mySlides fade">
            <img src="/img/nature5.jpg" />
          </div>
          <div className="mySlides fade">
            <img src="/img/nature6.jpg" />
          </div>
          <a className="prev" onclick="plusSlides(-1)">
            ❮
          </a>
          <a className="next" onclick="plusSlides(1)">
            ❯
          </a>
        </div>
        <br />
        <div
          className="navigation"
          style={{ textAlign: "center", marginBottom: 30 }}
        >
          <span className="dot" onclick="currentSlide(1)" />
          <span className="dot" onclick="currentSlide(2)" />
          <span className="dot" onclick="currentSlide(3)" />
          <span className="dot" onclick="currentSlide(4)" />
          <span className="dot" onclick="currentSlide(5)" />
          <span className="dot" onclick="currentSlide(6)" />
        </div>
        <div className="readMoreText expect">
          <div id="section">
            <div className="slideshow">
              <p>
                The best way to make the most out of your stay. Enjoy the city
                like and with a local. Lisbon is a mix of wonderful
                architecture, lively streets, and colorful sights. Get answers
                to all questions and the best recommendations from your local
                insider!
              </p>
              <p className="moretext">
                Hop from town to town discovering monuments and fascinating
                stories. Go to Óbidos and step back in time at this medieval
                town. Not only you will see UNESCO heritage monuments, you'll
                also have a taste of the best 'ginginja' in Portugal!
              </p>
              <p className="moretext">
                Follow the pilgrimage road that leads to Fátima. Discover its
                fascinating story and the reason why many people decide to visit
                this town for religious reasons and blessings.
              </p>
            </div>
            <a className="moreless-button" href="javascript:void(0)">
              Read more
            </a>
          </div>
        </div>
      </div>
      {/* end slideshow */}
      {/* plan */}
      <div className="plan">
        <h2>This is plan</h2>
        <p>
          Check out the plan below to see what you'll get up to with your local
          host.
        </p>
        <p /> Feel free to personalize this offer.
        <p />
        <div style={{ marginBottom: 30 }} />
        <div className="meetPoint">
          <i className="fas fa-map-marker-alt" />
          <div className="detailPlan">
            <h4>Meeting point</h4>
            <p>Curry 36 - Berlin</p>
          </div>
        </div>
        <div className="detail">
          <i className="fas fa-circle" />
          <div className="detailPlan">
            <h4>Classic Currywurst</h4>
            <p>
              Try it from a place with 35 years of tradition that became a
              culinary Berliner institution.
            </p>
          </div>
        </div>
        <div className="detail">
          <i className="fas fa-circle" />
          <div className="detailPlan">
            <h4>Schaumkuss</h4>
            <p>Try a delicious sweet treat</p>
          </div>
        </div>
        <div className="detail">
          <i className="fas fa-circle" />
          <div className="detailPlan">
            <h4>A sweet Berliner (Pfannkuchen)</h4>
            <p>A Withlocals favorite that you will not forget!</p>
          </div>
        </div>
        <div className="detail">
          <i className="fas fa-circle" />
          <div className="detailPlan">
            <h4>Leberkäse mit Semmel</h4>
            <p>A hearty portion of a German specialty</p>
          </div>
        </div>
        <div className="detail">
          <i className="fas fa-circle" />
          <div className="detailPlan">
            <h4>Kartoffelpuffer</h4>
            <p>
              Authentic German street-food, prepared for 30 years, daily, by the
              same chef.
            </p>
          </div>
        </div>
        <div className="detail">
          <i className="fas fa-circle" />
          <div className="detailPlan">
            <h4>Original German Berlin beer</h4>
            <p>Time for a refreshment!</p>
          </div>
        </div>
        <div className="detail">
          <i className="fas fa-circle" />
          <div className="detailPlan">
            <h4>Berlin-style Boulette</h4>
            <p>
              Taste a Berlin-style Boulette served by an imbiss run by locals.
            </p>
          </div>
        </div>
        <div className="detail">
          <i className="fas fa-circle" />
          <div className="detailPlan">
            <h4>Baklava</h4>
            <p>Oriental sweets to enjoy the tour on a sweet note!/p&gt;</p>
          </div>
        </div>
        <button>Contact me to personalize this for you</button>
      </div>
      {/* end plan */}
      {/* good to know  */}
      <div className="activities reason shouldKnow">
        <h2>6 reasons to book this tour</h2>
        <ul>
          <h3>What's included</h3>
          <li>
            <i className="fas fa-check" />
            <p>Private guide</p>
          </li>
          <li>
            <i className="fas fa-check" />
            <p>8 local food tastings</p>
          </li>
          <li>
            <i className="fas fa-check" />
            <p>2 alcoholic drinks: beer, local drinks</p>
          </li>
        </ul>
        <ul>
          <h3>Cancellation</h3>
          <li>
            <i className="fas fa-check" />
            <p>Free cancellation up to 14 days before experience date</p>
          </li>
          <li>
            <i className="fas fa-times" />
            <p>No refunds within 14 days of experience date.</p>
          </li>
        </ul>
      </div>
      {/* end good to know */}
      {/* List review */}
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
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                </div>
                <div className="dateComment">1 October 2019</div>
              </div>
              <div className="commentDetails">
                You can go to a city and explore it one time, two times, maybe
                even lucky enough to go three times. You can research that city
                on the internet and get so much information. But, you will never
                know a city the way a local knows their city. Laura showed us so
                many hidden treasures in Barcelona that were not on the
                internet. We were with her for only three hours. Yet we saw so
                much and learned so much about Barcelona and Spain in that short
                period of time. Laura is an amazing guide. Her English is easy
                to understand. And she is truly a friendly, knowledgable person.
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
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                </div>
                <div className="dateComment">1 October 2019</div>
              </div>
              <div className="commentDetails">
                You can go to a city and explore it one time, two times, maybe
                even lucky enough to go three times. You can research that city
                on the internet and get so much information. But, you will never
                know a city the way a local knows their city. Laura showed us so
                many hidden treasures in Barcelona that were not on the
                internet. We were with her for only three hours. Yet we saw so
                much and learned so much about Barcelona and Spain in that short
                period of time. Laura is an amazing guide. Her English is easy
                to understand. And she is truly a friendly, knowledgable person.
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
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                </div>
                <div className="dateComment">1 October 2019</div>
              </div>
              <div className="commentDetails">
                You can go to a city and explore it one time, two times, maybe
                even lucky enough to go three times. You can research that city
                on the internet and get so much information. But, you will never
                know a city the way a local knows their city. Laura showed us so
                many hidden treasures in Barcelona that were not on the
                internet. We were with her for only three hours. Yet we saw so
                much and learned so much about Barcelona and Spain in that short
                period of time. Laura is an amazing guide. Her English is easy
                to understand. And she is truly a friendly, knowledgable person.
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
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                </div>
                <div className="dateComment">1 October 2019</div>
              </div>
              <div className="commentDetails">
                You can go to a city and explore it one time, two times, maybe
                even lucky enough to go three times. You can research that city
                on the internet and get so much information. But, you will never
                know a city the way a local knows their city. Laura showed us so
                many hidden treasures in Barcelona that were not on the
                internet. We were with her for only three hours. Yet we saw so
                much and learned so much about Barcelona and Spain in that short
                period of time. Laura is an amazing guide. Her English is easy
                to understand. And she is truly a friendly, knowledgable person.
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
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                </div>
                <div className="dateComment">1 October 2019</div>
              </div>
              <div className="commentDetails">
                You can go to a city and explore it one time, two times, maybe
                even lucky enough to go three times. You can research that city
                on the internet and get so much information. But, you will never
                know a city the way a local knows their city. Laura showed us so
                many hidden treasures in Barcelona that were not on the
                internet. We were with her for only three hours. Yet we saw so
                much and learned so much about Barcelona and Spain in that short
                period of time. Laura is an amazing guide. Her English is easy
                to understand. And she is truly a friendly, knowledgable person.
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
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                </div>
                <div className="dateComment">1 October 2019</div>
              </div>
              <div className="commentDetails">
                You can go to a city and explore it one time, two times, maybe
                even lucky enough to go three times. You can research that city
                on the internet and get so much information. But, you will never
                know a city the way a local knows their city. Laura showed us so
                many hidden treasures in Barcelona that were not on the
                internet. We were with her for only three hours. Yet we saw so
                much and learned so much about Barcelona and Spain in that short
                period of time. Laura is an amazing guide. Her English is easy
                to understand. And she is truly a friendly, knowledgable person.
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
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                </div>
                <div className="dateComment">1 October 2019</div>
              </div>
              <div className="commentDetails">
                You can go to a city and explore it one time, two times, maybe
                even lucky enough to go three times. You can research that city
                on the internet and get so much information. But, you will never
                know a city the way a local knows their city. Laura showed us so
                many hidden treasures in Barcelona that were not on the
                internet. We were with her for only three hours. Yet we saw so
                much and learned so much about Barcelona and Spain in that short
                period of time. Laura is an amazing guide. Her English is easy
                to understand. And she is truly a friendly, knowledgable person.
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
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                </div>
                <div className="dateComment">1 October 2019</div>
              </div>
              <div className="commentDetails">
                You can go to a city and explore it one time, two times, maybe
                even lucky enough to go three times. You can research that city
                on the internet and get so much information. But, you will never
                know a city the way a local knows their city. Laura showed us so
                many hidden treasures in Barcelona that were not on the
                internet. We were with her for only three hours. Yet we saw so
                much and learned so much about Barcelona and Spain in that short
                period of time. Laura is an amazing guide. Her English is easy
                to understand. And she is truly a friendly, knowledgable person.
              </div>
              <span className="reviewTitle">Laura The Local!</span>
            </div>
          </div>
        </li>
      </ul>
      {/* Load Review button */}
      <div className="commentButton">
        <div id="loadMore">Show more reviews</div>
        <div id="showLess">Hide less reviews</div>
      </div>
      {/* End Review */}
    </div>
  </div>
  <div className="bookOffers tourversion">
    <h2>Other things to do in Ha Noi</h2>
    <ul>
      <li>
        <div className="sheet">
          <button className="unlike">
            <i className="fas fa-heart" />
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
                <img src="./img/2.jpg" alt="logo" width={64} height={64} />
              </div>
              <div className="experienceAvatarCard2">
                <img src="./img/3.jpg" alt="logo" width={64} height={64} />
              </div>
              <div className="localAvailable">7 others locals available</div>
            </div>
            <span className="enjoy">
              Enjoy Hanoi with <span className="withName">Amadio</span>
            </span>
            <h3 className>Mysteries of Regaleira: Sintra</h3>
            <div className="price">
              <span>$57.50 pp</span>
              <span className="experienceCard-topDetails-bullet">●</span>
              <span className="experienceCard-topDetails-duration">
                8 hours
              </span>
              <span className="experienceCard-topDetails-bullet"> ●</span>
              <span data-translatekey="Experience.SubcategoryOrTag.day-trip">
                Day trip
              </span>
            </div>
            <div className="experienceCard-bottomDetails">
              <div className="rating">
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
              </div>
              <span className="colorShared">1249 |</span>
              <span className="colorShared">
                <i className="fas fa-bolt" /> |
              </span>
              <span className="colorShared">
                <i className="fas fa-car" />
              </span>
            </div>
          </div>
        </div>
      </li>
      <li>
        <div className="sheet">
          <button className="unlike">
            <i className="fas fa-heart" />
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
                <img src="./img/2.jpg" alt="logo" width={64} height={64} />
              </div>
              <div className="experienceAvatarCard2">
                <img src="./img/3.jpg" alt="logo" width={64} height={64} />
              </div>
              <div className="localAvailable">7 others locals available</div>
            </div>
            <span className="enjoy">
              Enjoy Hanoi with <span className="withName">Amadio</span>
            </span>
            <h3 className>Mysteries of Regaleira: Sintra</h3>
            <div className="price">
              <span>$57.50 pp</span>
              <span className="experienceCard-topDetails-bullet">●</span>
              <span className="experienceCard-topDetails-duration">
                8 hours
              </span>
              <span className="experienceCard-topDetails-bullet"> ●</span>
              <span data-translatekey="Experience.SubcategoryOrTag.day-trip">
                Day trip
              </span>
            </div>
            <div className="experienceCard-bottomDetails">
              <div className="rating">
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
              </div>
              <span className="colorShared">1249 |</span>
              <span className="colorShared">
                <i className="fas fa-bolt" /> |
              </span>
              <span className="colorShared">
                <i className="fas fa-car" />
              </span>
            </div>
          </div>
        </div>
      </li>
      <li>
        <div className="sheet">
          <button className="unlike">
            <i className="fas fa-heart" />
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
                <img src="./img/2.jpg" alt="logo" width={64} height={64} />
              </div>
              <div className="experienceAvatarCard2">
                <img src="./img/3.jpg" alt="logo" width={64} height={64} />
              </div>
              <div className="localAvailable">7 others locals available</div>
            </div>
            <span className="enjoy">
              Enjoy Hanoi with <span className="withName">Amadio</span>
            </span>
            <h3 className>Mysteries of Regaleira: Sintra</h3>
            <div className="price">
              <span>$57.50 pp</span>
              <span className="experienceCard-topDetails-bullet">●</span>
              <span className="experienceCard-topDetails-duration">
                8 hours
              </span>
              <span className="experienceCard-topDetails-bullet"> ●</span>
              <span data-translatekey="Experience.SubcategoryOrTag.day-trip">
                Day trip
              </span>
            </div>
            <div className="experienceCard-bottomDetails">
              <div className="rating">
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
              </div>
              <span className="colorShared">1249 |</span>
              <span className="colorShared">
                <i className="fas fa-bolt" /> |
              </span>
              <span className="colorShared">
                <i className="fas fa-car" />
              </span>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
  {/*  End Content  */}
  <footer>
    <div className="footer-content">
      <div className="socialMedia">
        <div className="webLogo">
          <a href="#">
            <i className="far fa-smile-wink" />
          </a>
          Travel
        </div>
        <ul className="socialMediaList">
          <li>
            <a href="#">
              <i className="fab fa-facebook-square" />
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fab fa-twitter-square" />
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fab fa-instagram" />
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fab fa-youtube" />
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fab fa-pinterest-square" />
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fab fa-facebook-messenger" />
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
</div>;


            </div>
        );
    }
}

export default Tour;