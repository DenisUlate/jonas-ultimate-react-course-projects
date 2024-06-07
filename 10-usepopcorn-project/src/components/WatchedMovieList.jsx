import React from "react";
import WatchedMovieItem from "./WatchedMovieItem";

const WatchedMovieList = ({ watched }) => {
	return (
		<ul className="list">
			{watched.map((movie) => (
				<WatchedMovieItem key={movie.imdbID} movie={movie} />
			))}
		</ul>
	);
};

export default WatchedMovieList;
