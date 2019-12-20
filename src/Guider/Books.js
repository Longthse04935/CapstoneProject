import React, { Component } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import Config from "../Config";
import { connect } from "react-redux";
class GuiderBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      status: "WAITING"
    };

    this.accept = this.accept.bind(this);
    this.deny = this.deny.bind(this);
    this.cancel = this.cancel.bind(this);
  }
  async accept(eve) {
    try {
      const remain = this.state.orders;
      remain.splice(eve.target.id, 1);

      const orderResponse = await fetch(
        Config.api_url + "Order/AcceptOrder/" + eve.target.value,
        {
          method: "GET",
          mode: "cors",
          credentials: "include"
        }
      );

      if (!orderResponse.ok) {
        throw Error(orderResponse.status + ": " + orderResponse.statusText);
      }

      const status = await orderResponse.text();

      this.setState({ orders: remain });
    } catch (err) {
      console.log(err);
    }
  }

  async deny(eve) {
    eve.preventDefault();
    try {
      const denied = this.state.orders[eve.target.id];
      const remain = this.state.orders;
      remain.splice(eve.target.id, 1);
      const orderResponse = await fetch(
        Config.api_url + "Order/refuseTrip/" + eve.target.value,
        {
          method: "PUT",
          mode: "cors",
          credentials: "include",
          body: JSON.stringify(denied)
        }
      );

      if (!orderResponse.ok) {
        throw Error(orderResponse.status + ": " + orderResponse.statusText);
      }

      const order = await orderResponse.text();
      //console.log(order);
      this.setState({ orders: remain });
    } catch (err) {
      console.log(err);
    }
  }

  async cancel(eve) {
    eve.preventDefault();
    try {
      //console.log(this.state.orders);
      const denied = this.state.orders[eve.target.id];
      const remain = this.state.orders;
      remain.splice(eve.target.id, 1);
      const orderResponse = await fetch(
        Config.api_url +
          "Order/CancelOrderAsGuider?trip_id=" +
          eve.target.value,
        {
          method: "PUT",
          mode: "cors",
          credentials: "include",
          body: JSON.stringify(denied)
        }
      );

      if (!orderResponse.ok) {
        throw Error(orderResponse.status + ": " + orderResponse.statusText);
      }

      const order = await orderResponse.text();
      //console.log(order);
      this.setState({ orders: remain });
    } catch (err) {
      console.log(err);
    }
  }

  async componentDidMount() {
    // $("head").append('<link href="/css/books.css" rel="stylesheet"/>');
    // $("head").append('<link href="/css/util.css" rel="stylesheet"/>');
    let user = this.props.user;
    try {
      const orderResponse = await fetch(
        Config.api_url +
          "Order/GetOrderByStatus?role=" +
          "GUIDER" +
          "&id=" +
          user.id +
          "&status=" +
          this.state.status,
        {
          method: "GET",
          mode: "cors",
          credentials: "include",
          headers: {
            Accept: "application/json"
          }
        }
      );

      if (!orderResponse.ok) {
        throw Error(orderResponse.status + ": " + orderResponse.statusText);
      }

      const order = await orderResponse.json();
      this.setState({ orders: order });
    } catch (err) {
      console.log(err);
    }
  }

  async tabList(status) {
    let user = this.props.user;
    try {
      const orderResponse = await fetch(
        Config.api_url +
          "Order/GetOrderByStatus?role=" +
          "GUIDER" +
          "&id=" +
          user.id +
          "&status=" +
          status,
        {
          method: "GET",
          mode: "cors",
          credentials: "include",
          headers: {
            Accept: "application/json"
          }
        }
      );

      if (!orderResponse.ok) {
        throw Error(orderResponse.status + ": " + orderResponse.statusText);
      }
      const order = await orderResponse.json();
      this.setState({ orders: order, status: status });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    let { status,orders } = this.state;
    
    let order = orders.map((order, index) => (
      <tr className="row100 body" key={index}>
        <td className="cell100 column2">
          <Link to={`/reviewtvl/`+order.traveler_id}>{order.object}</Link>
        </td>
        <td className="cell100 column3">{order.begin_date}</td>
        <td className="cell100 column4">{order.finish_date}</td>
        <td className="cell100 column5">
          <Link to={`/post/${order.post_id}`}>{order.postTitle}</Link>
        </td>
        <td className="cell100 column6">{order.adult_quantity}</td>
        <td className="cell100 column7">{order.children_quantity}</td>
        <td className="cell100 column8">{order.fee_paid}</td>
        {status === 'WAITING' ? (
          <td className="cell100 column1">
           <div>
		   <button
              className="accept btn btn-primary btn-icon-split"
              value={order.trip_id}
              id={index}
              onClick={this.accept}
              type="button"
            >
              Accept
            </button>
            <button
              onClick={this.deny}
              value={order.trip_id}
              id={index}
              className="refuse btn btn-danger btn-icon-split "
              type="button"
			  style={{marginLeft:'10px'}}
            >
              Refuse
            </button>
		   </div>
          </td>
        ) : null}
        {status === 'ONGOING' ? (
          <td className="cell100 column1">
            <button
              className="cancel btn btn-secondary"
              value={order.trip_id}
              id={index}
              onClick={this.cancel}
              type="button"
            >
              Cancel
            </button>
          </td>
        ):null}
      </tr>
    ));

    
    let arr = ["WAITING", "ONGOING", "FINISHED", "CANCELLED"];

    let tab = arr.map((value, index) => (
      <li
        key={index}
        onClick={() => {
          this.tabList(value);
        }}
      >
        {value}
      </li>
    ));

    return (
      <div className="tvlManager_Container">
        <div className="tvlManager_title">
          <ul className="tvlTab" id="bookManage">{tab}</ul>
        </div>

        <div className="table100 ver1">
          <div className="table100-firstcol">
            {/* <table>
              <thead>
                <tr className="row100 head">
                  <th className="cell100 column1">Action</th>
                </tr>
              </thead>
              <tbody>{action}</tbody>
            </table> */}
          </div>
          <div className="wrap-table100-nextcols js-pscroll ps ps--active-x">
            <div className="table100-nextcols">
              {
                orders.length === 0 ?  <h1>You don't have any booking on that list</h1>
               :
               <table>
                <thead>
                  <tr className="row100 head">
                    <th className="cell100 column2">Traverler</th>
                    <th className="cell100 column3">Start time</th>
                    <th className="cell100 column4">End time</th>
                    <th className="cell100 column5">Post</th>
                    <th className="cell100 column6">Adult quantity</th>
                    <th className="cell100 column7">Child quantiy</th>
                    <th className="cell100 column8">Price</th>
                    {status === 'WAITING' || status === 'ONGOING' ? <th className="cell100 column8">Action</th> : null}
                  </tr>
                </thead>
                <tbody>{order}</tbody>
              </table>
              }
            </div>

            <div className="wrap-table100-nextcols js-pscroll"></div>
          </div>
        </div>
        <div></div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const user = state.user;
  return { user };
}
export default connect(mapStateToProps)(GuiderBooks);
