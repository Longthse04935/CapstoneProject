import React, { Component } from 'react';
import "font-awesome/css/font-awesome.min.css";
import $ from 'jquery';
// import iconMain from '../../public/icon/iconMain.jpg';
class Footer extends Component {
    componentDidMount(){
        $("head").append('<link href="/css/footer.css" rel="stylesheet"/>');
    }
    render() {
        return (
                <footer>
                    <div className="containerMain">
                        <div className="socialMedia">
                        <div className="webLogo">
                            <a href="/"><img src="../public/icon/iconMain.jpg" /></a>
                        </div>
                        <ul className="socialMediaList">
                            <li>
                            <a href="/">
                                <i className="fa fa-facebook-square" />
                            </a>
                            </li>
                            <li>
                            <a href="/">
                                <i className="fa fa-twitter-square" />
                            </a>
                            </li>
                            <li>
                            <a href="/">
                                <i className="fa fa-instagram" />
                            </a>
                            </li>
                            <li>
                            <a href="/">
                                <i className="fa fa-youtube" />
                            </a>
                            </li>
                            <li>
                            <a href="/">
                                <i className="fa fa-pinterest-square" />
                            </a>
                            </li>
                            <li>
                            <a href="/">
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
        );
    }
}

export default Footer;