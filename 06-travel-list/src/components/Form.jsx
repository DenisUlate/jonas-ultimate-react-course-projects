import React, { useState } from "react";

export default function Form({ onAddItems }) {
	const [description, setDescription] = useState("");
	const [quantity, setQuantity] = useState(1);

	function handleSubmit(event) {
		event.preventDefault();

		if (!description) return;
		const newItem = {
			id: Date.now(),
			description,
			quantity,
			packed: false,
		};
		console.log(newItem);

		onAddItems(newItem);

		setDescription("");
		setQuantity(1);
	}

	return (
		<form className="add-form" onSubmit={handleSubmit}>
			<h3>What do you need for your 🎒 trip?</h3>
			<select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
				{Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
					<option key={num}>{num}</option>
				))}
			</select>
			<input
				value={description}
				onChange={(e) => setDescription(e.target.value)}
				type="text"
				placeholder="Item..."
			/>
			<button>Add</button>
		</form>
	);
}
