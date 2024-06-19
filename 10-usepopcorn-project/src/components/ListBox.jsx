import React, { useState } from "react";

/**
 * ListBox component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The content to be rendered inside the ListBox.
 * @returns {JSX.Element} The rendered ListBox component.
 */
const ListBox = ({ children }) => {
	const [isOpen, setIsOpen] = useState(true);

	return (
		<div className="box">
			<button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
				{isOpen ? "–" : "+"}
			</button>
			{isOpen && children}
		</div>
	);
};

export default ListBox;
