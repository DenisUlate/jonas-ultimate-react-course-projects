/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import React from "react";

const Order = ({ openHour, closeHour }) => {
	return (
		<div className="order">
			<p>
				We're open from {openHour}:00 to {closeHour}:00. Come visit us or order
				online.
			</p>
			<button className="btn">Order</button>
		</div>
	);
};

export default Order;
