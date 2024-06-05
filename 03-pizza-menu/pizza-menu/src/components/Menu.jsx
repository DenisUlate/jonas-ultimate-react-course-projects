import React from "react";
import pizzaData from "../data.js";
import Pizza from "./Pizza";

const Menu = () => {
	const pizzas = pizzaData;
	// const pizzas = [];
	const numPizzas = pizzas.length;

	return (
		<main className="menu">
			<h2>Our Menu</h2>

			{numPizzas > 0 ? (
				<>
					<p>
						Authentic Italian cuisine. 6 creative dishes to choose from. All
						from our stone oven, all organic, all delicious.
					</p>
					<ul className="pizzas">
						{pizzas.map((pizza) => (
							<Pizza key={pizza.name} pizzaObj={pizza} />
						))}
					</ul>
				</>
			) : (
				<p>We're still working on our menu. Please come back later :)</p>
			)}
		</main>
	);
};

export default Menu;
