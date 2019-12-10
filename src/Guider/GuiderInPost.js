import React from 'react';
import "font-awesome/css/font-awesome.min.css";
import {Link} from 'react-router-dom';
import Config from '../Config';
import Rated from './Rated';
class GuiderInPost extends React.Component {
      constructor(props) {
            super(props);
            this.state = {
                guider: {
                    languages: ['']
                }
            };
      }
      async componentDidMount() {
            try {
                  const response = await fetch(Config.api_url + "Guider/" + this.props.guiderId,{
                    method: "GET",
                    mode: "cors",
                    credentials: "include"
                });
                  if (!response.ok) { throw Error(response.status + ": " + response.statusText); }
                  const guider = await response.json();
                  this.setState({guider});
                  window.sessionStorage.setItem("guider_name", ""+guider.first_name);
            } catch (err) {
                  console.log(err);
            }

      }
      render() {
            let guide = this.state.guider;
            let languages = '' ;
            for (var i = 0 ; i < guide.languages.length;i++){
                if(i+1 === guide.languages.length){
                    languages += guide.languages[i].toUpperCase();
                }else{
                    languages += guide.languages[i].toUpperCase()+',';
                }
            }
            
            let checkPath = window.location.pathname ;
            if(checkPath.includes('post') ){
                checkPath = <Link to={"/chatbox/"+this.props.postId}><button className="BtnContact">Contact with me</button></Link>;
            }else{
                checkPath = <Link to={"/chat"}><button className="BtnContact">Contact with me</button></Link>;
            }
            return (
                  <div className="profile-box">
                        <div className="pb-header header-stick">
                        <div className="header-pb">
                            <h1 className="TitlePb TileStickyPb">{guide.first_name + " " + guide.last_name}</h1>
                            <Rated number={guide.rated} />
                        </div>
                        <div>
                            <img className="pf-avatar"
                                src={Config.api_url+"images/"+guide.avatar}/>
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
                        <i className="fa fa-graduation-cap" aria-hidden="true"></i>
                        </span>
                        <span className="ListItemText">
                            Age {guide.age}
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

export default GuiderInPost;