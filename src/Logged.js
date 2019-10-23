import React, { Component } from 'react';
import $ from 'jquery';
import "font-awesome/css/font-awesome.min.css";
class Logged extends Component {
    constructor(props){
        super(props);
        this.state ={
            disable:true
        }
    }

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
    }

    disableLoggedChoice = ()=>{
        this.setState({disable:!this.state.disable});
    }

    render() {
        return (
            <div>
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
                        <ul className="logged" >
                            <li>
                            <a href="#">Bookings</a>
                            </li>
                            <li>
                            <a href="#" >
                                Messages
                            </a>
                            </li>
                            <li>
                            <a href="#">
                                Favorites
                            </a>
                            </li>
                            <li className="avatarLogged" onClick={this.disableLoggedChoice}>
                            <a href="#">
                                <img src="/img/2.jpg"/>
                                <ul className="dropContent" style={this.state.disable ? {display: 'none'} : { display: 'block' }}>
                                    <li><a href="/">Edit profile</a><i className="fa fa-user" aria-hidden="true"></i></li>
                                    <li><a href="">Become a host</a><i className="fa fa-user" aria-hidden="true"></i></li>
                                    <li><a href="">Favorites</a><i className="fa fa-user" aria-hidden="true"></i></li>
                                    <li><a href="">Help</a><i className="fa fa-user" aria-hidden="true"></i></li>
                                    <li><a href="">Log out</a><i className="fa fa-user" aria-hidden="true"></i></li>
                                    <li><a href="">Contact</a><i className="fa fa-user" aria-hidden="true"></i></li>
                                </ul>
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

export default Logged;