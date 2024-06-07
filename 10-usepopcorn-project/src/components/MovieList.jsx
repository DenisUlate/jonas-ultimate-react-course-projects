import React, { useState } from "react";
import ListItem from "./ListItem";

const MovieList = ({ moviesData }) => {
	const [movies, setMovies] = useState(moviesData);

	return (
		<ul className="list">
			{movies?.map((movie) => (
				<ListItem key={movie.imdbID} movie={movie} />
			))}
		</ul>
	);
};

export default MovieList;
