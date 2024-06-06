export default function Stats({ items }) {
	if (items.length === 0)
		return (
			<p className="stats">
				<em>Start adding some items to your packing list 🎒</em>
			</p>
		);

	const numItems = items.length;
	const numPackedItems = items.filter((item) => item.packed).length;
	const percentage = Math.round((numPackedItems / numItems) * 100 || 0);
	return (
		<footer className="stats">
			{percentage === 100 ? (
				<strong>🎉 You have everything! Ready to go 🎉</strong>
			) : (
				<em>
					🧳 You have {numItems} items on your list, and you already packed{" "}
					{numPackedItems} ({percentage}%)
				</em>
			)}
		</footer>
	);
}
