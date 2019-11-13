import React, { Component } from "react";
import { Link } from 'react-router-dom';
import $ from 'jquery';

class GuiderBooks extends Component {

	constructor(props) {
		super(props);
		this.state = {
			orders: []
		};
		this.accept = this.accept.bind(this);
		this.deny = this.deny.bind(this);
	}
	async accept(eve) {
		try {
			const remain = this.state.orders.splice(eve.target.id,1);
			const orderResponse = await fetch(
				"http://localhost:8080/Order/AcceptOrder/"+eve.target.value,
				{
					method: "GET",
					mode: "cors",
					credentials: "include",
					headers: {
						'Accept': 'application/json'
					}
				});

			if (!orderResponse.ok) {
				throw Error(orderResponse.status + ": " + orderResponse.statusText);
			}

			const status = await orderResponse.text();
			console.log(status);
			this.setState({ orders:remain });
		} catch (err) {
			console.log(err);
		}
	}

	async deny(eve) {
		try {
			const denied = this.state.orders[eve.target.id]
			const remain = this.state.orders.splice(eve.target.id,1);
			const orderResponse = await fetch(
				"http://localhost:8080/Order/CancelOrderAsTraveler",
				{
					method: "PUT",
					mode: "cors",
					credentials: "include",
					headers: {
						'Accept': 'application/json'
					},
					body: JSON.stringify(denied)
				});

			if (!orderResponse.ok) {
				throw Error(orderResponse.status + ": " + orderResponse.statusText);
			}

			const order = await orderResponse.text();
			console.log(order);
			this.setState({ orders:remain });
		} catch (err) {
			console.log(err);
		}
	}

	async componentDidMount() {
		$("head").append('<link href="/css/books.css" rel="stylesheet"/>');
		$("head").append('<link href="/css/util.css" rel="stylesheet"/>');
		try {
			const orderResponse = await fetch(
				"http://localhost:8080/Order/GetOrderByStatus?role=" + this.props.user.role + "&id=" + this.props.user.id + "&status=CANCELLED",
				{
					method: "GET",
					mode: "cors",
					credentials: "include",
					headers: {
						'Accept': 'application/json'
					}
				});

			if (!orderResponse.ok) {
				throw Error(orderResponse.status + ": " + orderResponse.statusText);
			}

			const order = await orderResponse.json();
			console.log(order);
			this.setState({ orders:order });
		} catch (err) {
			console.log(err);
		}
	}
	render() {
		let order = this.state.orders.map((order, index) => 
			<tr className="row100 body" key={index}>
				<td className="cell100 column2"><Link to={order.traveler_id}>{order.object}</Link></td>
				<td className="cell100 column3">{order.begin_date}</td>
				<td className="cell100 column4">{order.finish_date}</td>
				<td className="cell100 column5"><Link to={order.post_id}>{order.postTitle}</Link></td>
				<td className="cell100 column6">{order.adult_quantity}</td>
				<td className="cell100 column7">{order.children_quantity}</td>
				<td className="cell100 column8">{order.fee_paid}</td>
			</tr>
		);

		let action = this.state.orders.map((order, index) => 
		<tr className="row100 body"  key={index}>
		<td className="cell100 column1"><button className="accept" value={order.order_id} id={index} onClick={this.accept}>Accept</button>
			<button onClick={this.deny} value={order.order_id} id={index} className="refuse">Refuse</button></td>

	</tr>
		);

		return (
			<div className="container-table100">
				<div className="table100 ver1">
					<div className="table100-firstcol">
						<table>
							<thead>
								<tr className="row100 head">
									<th className="cell100 column1">Action</th>
								</tr>
							</thead>
							<tbody>
								<tr className="row100 body">
									<td className="cell100 column1"><button id="accept" onClick={this.accept}>Accept</button>
										<button onClick={this.deny} id="refuse">Refuse</button></td>

								</tr>
							</tbody>
						</table>
					</div>
					<div className="wrap-table100-nextcols js-pscroll ps ps--active-x">
						<div className="table100-nextcols">
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
									</tr>
								</thead>
								<tbody>
									{order}



								</tbody>
							</table>
						</div>

						<div className="wrap-table100-nextcols js-pscroll"></div>
					</div>
				</div>
				<div><paging /></div>
			</div>
		);
	}
}

export default GuiderBooks;
