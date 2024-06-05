import React from "react";
import Order from "./Order";

const Footer = () => {
	const hour = new Date().getHours();
	const openHour = 11;
	const closeHour = 23;
	const isOpen = hour >= openHour && hour < closeHour;

	return (
		<footer className="footer">
			{isOpen ? (
				<Order closeHour={closeHour} openHour={openHour} />
			) : (
				<p>Sorry, we're closed. We open at {openHour}:00.</p>
			)}
		</footer>
	);
};

export default Footer;
