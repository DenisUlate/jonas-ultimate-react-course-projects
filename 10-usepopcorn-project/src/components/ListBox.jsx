import React, { useState } from "react";
import MovieList from "./MovieList";

const ListBox = ({ moviesData }) => {
	const [isOpen1, setIsOpen1] = useState(true);

	return (
		<div className="box">
			<button
				className="btn-toggle"
				onClick={() => setIsOpen1((open) => !open)}>
				{isOpen1 ? "–" : "+"}
			</button>
			{isOpen1 && <MovieList moviesData={moviesData} />}
		</div>
	);
};

export default ListBox;
