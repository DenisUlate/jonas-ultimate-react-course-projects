import Logo from "./components/Logo";
import Form from "./components/Form";
import PackingList from "./components/PackingList";
import Stats from "./components/Stats";

import { useState } from "react";

// const initialItems = [
// 	{ id: 1, description: "Passports", quantity: 2, packed: false },
// 	{ id: 2, description: "Socks", quantity: 12, packed: false },
// 	{ id: 3, description: "Charger", quantity: 1, packed: true },
// ];

function App() {
	const [items, setItems] = useState([]);

	function handleAddItems(newItem) {
		setItems((prevItems) => [newItem, ...prevItems]);
	}

	function handleRemoveItem(id) {
		setItems((prevItems) => prevItems.filter((item) => item.id !== id));
	}

	function handleToggleItem(id) {
		setItems((prevItems) =>
			prevItems.map((item) =>
				item.id === id ? { ...item, packed: !item.packed } : item
			)
		);
	}

	function handleClearList() {
		const confirmClear = window.confirm(
			"Are you sure you want to clear the list?"
		);
		if (confirmClear) setItems([]);
	}

	return (
		<div className="app">
			<Logo />
			<Form onAddItems={handleAddItems} />
			<PackingList
				items={items}
				onRemoveItem={handleRemoveItem}
				onToggleItem={handleToggleItem}
				onClearList={handleClearList}
			/>
			<Stats items={items} />
		</div>
	);
}

export default App;
