import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.min.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import $ from "jquery";
// import io from "socket.io-client";

class Chatbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 1,
      chatText: "",
      chatData: [
        {
          id: 1,
          author: "Tran Hoang long",
          message: "Hello can i help you !:) ",
          type: "you"
        }
      ],
      tourDate: new Date(),
      numberInjoy: {
        adult: 1,
        children: 0
      }
    };
  }

  handleChange = e => {
    this.setState({ chatText: e.target.value });
  };

  handleSend = async e => {
    e.stopPropagation();
    e.preventDefault();
    let { chatData, chatText, index } = this.state;
    index++;
    chatData.push({
      id: index,
      message: chatText,
      type: "me",
      author: "Tran Hoang Long"
    });

    this.setState({ chatData, chatText: "", index: index });
  };

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  componentDidMount() {
    this.scrollToBottom();
    $("head").append('<link href="/css/chatbox.css" rel="stylesheet"/>');
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  dateChange = date => {
    this.setState({
      tourDate: date
    });
  };

  changeNumber = (age, minusPlus) => {
    const { numberInjoy } = this.state;
    const min = 1;
    const max = 8;
    var currentPeople = numberInjoy.adult + numberInjoy.children;
    if (age === "adult" && minusPlus === "minus") {
     if(currentPeople > min && numberInjoy.adult > 1){
      numberInjoy.adult--;
      this.setState({ numberInjoy: numberInjoy });
     }
    } else if (age === "adult" && minusPlus === "plus") {
      if(currentPeople < max){
        numberInjoy.adult++;
        this.setState({ numberInjoy: numberInjoy });
      }
    } else if (age === "child" && minusPlus === "minus") {
      if(currentPeople > min && numberInjoy.children > 0){
        numberInjoy.children--;
        this.setState({ numberInjoy: numberInjoy });
      }
    } else if (age === "child" && minusPlus === "plus") {
      if(currentPeople < max){
        numberInjoy.children++;
        this.setState({ numberInjoy: numberInjoy });
      }
    }
  };

  render() {
    const { chatData, chatText, author, numberInjoy } = this.state;
    return (
      <div className="ChatRoom">
        {/* Chat form */}
        <div className="chat_window">
          {/* plan of tour */}
          <div className="plan">
            <div className="planContent">
              <h2>This is plan</h2>
              <p>
                Check out the plan below to see what you'll get up to with your
                local host.
              </p>
              <p> Feel free to personalize this offer.</p>
              <div style={{ marginBottom: "30px" }} />
              <div className="meetPoint">
                <i className="fa fa-map-marker" aria-hidden="true"></i>
                <div className="detailPlan">
                  <h4>Meeting point</h4>
                  <p>Curry 36 - Berlin</p>
                </div>
              </div>
              <div className="detail">
                <i className="fa fa-circle" />
                <div className="detailPlan">
                  <h4>Classic Currywurst</h4>
                  <p>
                    Try it from a place with 35 years of tradition that became a
                    culinary Berliner institution.
                  </p>
                </div>
              </div>
              <div className="detail">
                <i className="fa fa-circle" />
                <div className="detailPlan">
                  <h4>Schaumkuss</h4>
                  <p>Try a delicious sweet treat</p>
                </div>
              </div>
              <div className="detail">
                <i className="fa fa-circle" />
                <div className="detailPlan">
                  <h4>A sweet Berliner (Pfannkuchen)</h4>
                  <p>A Withlocals favorite that you will not forget!</p>
                </div>
              </div>
              <div className="detail">
                <i className="fa fa-circle" />
                <div className="detailPlan">
                  <h4>Leberkäse mit Semmel</h4>
                  <p>A hearty portion of a German specialty</p>
                </div>
              </div>
              <div className="detail">
                <i className="fa fa-circle" />
                <div className="detailPlan">
                  <h4>Kartoffelpuffer</h4>
                  <p>
                    Authentic German street-food, prepared for 30 years, daily,
                    by the same chef.
                  </p>
                </div>
              </div>
              <div className="detail">
                <i className="fa fa-circle" />
                <div className="detailPlan">
                  <h4>Original German Berlin beer</h4>
                  <p>Time for a refreshment!</p>
                </div>
              </div>
              <div className="detail">
                <i className="fa fa-circle" />
                <div className="detailPlan">
                  <h4>Berlin-style Boulette</h4>
                  <p>
                    Taste a Berlin-style Boulette served by an imbiss run by
                    locals.
                  </p>
                </div>
              </div>
              <div className="detail">
                <i className="fa fa-circle" />
                <div className="detailPlan">
                  <h4>Baklava</h4>
                  <p>Oriental sweets to enjoy the tour on a sweet note!</p>
                </div>
              </div>
            </div>
          </div>

          {/* guider infor */}
          <div className="guiderInfo">
            <div className="guiderContent">
              <h1>Guider name</h1>

              <div className="rating">
                <img src="/img/2.jpg" />
                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star" aria-hidden="true"></i>
              </div>

              <div className="pickdate">
                Pick Date:
                <DatePicker
                  selected={this.state.tourDate}
                  onChange={this.dateChange}
                />
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
                          width="16"
                          height="16"
                          viewBox="0 0 20 23"
                        >
                          <g>
                            <path d="M15.414094,6.65663665 C15.414094,3.52796224 12.9882716,1 10.0062103,1 C7.02509025,1 4.59942235,3.52812516 4.59942235,6.65663665 C4.59942235,9.78514815 7.02509025,12.3132733 10.0062103,12.3132733 C12.9882716,12.3132733 15.414094,9.78531106 15.414094,6.65663665 Z M16.4126481,6.65663665 C16.4126481,10.3285794 13.5485479,13.3132733 10.0047644,13.3132733 C6.46189225,13.3132733 3.59797646,10.3283892 3.59797646,6.65663665 C3.59797646,2.9848841 6.46189225,0 10.0047644,0 C13.5485479,0 16.4126481,2.98469387 16.4126481,6.65663665 Z"></path>
                            <path d="M1.01540138,21.9992828 C1.19144555,18.0419836 3.44634003,14.5899302 6.73724542,13.1335217 C6.98976422,13.0217681 7.10387696,12.726467 6.99212337,12.4739482 C6.88036977,12.2214294 6.58506864,12.1073166 6.33254984,12.2190702 C2.53516372,13.8996246 0.00429829063,17.9459179 0.00429829063,22.4992828 L0.00429829063,22.9992828 L20.003133,22.9992828 L20.003133,22.4992828 C20.003133,17.9435721 17.4710994,13.897152 13.6713661,12.2178274 C13.4187915,12.1062 13.1235474,12.2204602 13.0119199,12.4730347 C12.9002924,12.7256093 13.0145526,13.0208534 13.2671272,13.1324809 C16.5600972,14.5878371 18.8160013,18.0399474 18.9920364,21.9992828 L1.01540138,21.9992828 Z"></path>
                          </g>
                        </svg>
                      </span>
                      <span className="ButtonText-3rr6g">
                        {numberInjoy.adult} Adults and {numberInjoy.children}{" "}
                        children
                      </span>
                    </button>
                  </span>
                </span>
                <div className="viewNumberTravel">
                  <div className="adult">
                    Adults
                    <div className="plusAndMinus">
                      <i
                        onClick={() => this.changeNumber("adult", "minus")}
                        className="fa fa-minus-circle"
                      ></i>
                      &nbsp;{numberInjoy.adult}&nbsp;
                      <i
                        onClick={() => this.changeNumber("adult", "plus")}
                        className="fa fa-plus-circle"
                      ></i>
                    </div>
                  </div>
                  <div className="children">
                    Children
                    <div className="plusAndMinus">
                      <i
                        onClick={() => this.changeNumber("child", "minus")}
                        className="fa fa-minus-circle"
                      ></i>
                      &nbsp;{numberInjoy.children}&nbsp;
                      <i
                        onClick={() => this.changeNumber("child", "plus")}
                        className="fa fa-plus-circle"
                      ></i>
                    </div>
                  </div>
                  <p>€223 per person</p>
                  <a href="">Apply</a>
                </div>

                <button className="bookNow">Book now</button>
              </div>
            </div>
          </div>

          {/* End guider infor */}

          {/* End plan of tour */}
          <div className="top_menu">
            {/* <div className="buttons">
              <div className="button close"></div>
              <div className="button minimize"></div>
              <div className="button maximize"></div>
            </div> */}
            <div className="title">Chat</div>
          </div>
          <ul className="messages">
            {chatData.map(item => (
              <li
                className={`message ${
                  item.type === "me" ? "right" : "left"
                } appeared`}
                key={item.id}
              >
                <div className="avatar"></div>
                <div className="text_wrapper">
                  {author}
                  <div className="text">{item.message}</div>
                </div>
                <div
                  style={{ float: "left", clear: "both" }}
                  ref={el => {
                    this.messagesEnd = el;
                  }}
                ></div>
              </li>
            ))}
          </ul>
          <div className="bottom_wrapper clearfix">
            <form>
              <div className="message_input_wrapper">
                <input
                  className="message_input"
                  value={chatText}
                  onChange={this.handleChange}
                  placeholder="Type your message here..."
                />
              </div>
              <div className="send_message">
                <div className="icon"></div>
                <button
                  className="text"
                  onClick={this.handleSend}
                  type="submit"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="message_template">
          <li className="message">
            <div className="avatar"></div>
            <div className="text_wrapper">
              <div className="text"></div>
            </div>
          </li>
        </div>
        {/*End  Chat form */}
      </div>
    );
  }
}

export default Chatbox;
