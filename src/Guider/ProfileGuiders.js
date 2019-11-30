import React, { Component } from 'react';
import "font-awesome/css/font-awesome.min.css";
import $ from 'jquery';

class ProfileGuiders extends Component {
    componentDidMount(){
        //add css with jquery
        $("head").append('<link href="/css/profile.css" rel="stylesheet"/>');
        $("head").append('<link href="/css/login.css" rel="stylesheet"/>');


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
    
    }


    render() {
        return (
            <div>
                <div>
                <div id="reactContainer">
                    {/* Menubar */}
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
                </div>
                </div>;

            </div>
        );
    }
}

export default ProfileGuiders;