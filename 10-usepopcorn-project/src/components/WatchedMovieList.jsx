import React from "react";
import WatchedMovieItem from "./WatchedMovieItem";

const WatchedMovieList = ({ watched, onRemoveWatchedMovie }) => {
	return (
		<ul className="list">
			{watched.map((movie) => (
				<WatchedMovieItem
					key={movie.imdbID}
					movie={movie}
					onRemoveWatchedMovie={onRemoveWatchedMovie}
				/>
			))}
		</ul>
	);
};

export default WatchedMovieList;
