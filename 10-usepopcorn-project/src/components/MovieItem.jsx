import React from "react";

/**
 * Represents a single movie item in the movie list.
 * 
 * @component
 * @param {Object} props - The props object.
 * @param {Object} props.movie - The movie object containing details like title, poster, year, etc.
 * @param {Function} props.onSelectMovie - The function to be called when a movie is selected.
 * @returns {JSX.Element} The JSX element representing the movie item.
 */
const MovieItem = ({ movie, onSelectMovie }) => {
	return (
		<li key={movie.imdbID} onClick={() => onSelectMovie(movie.imdbID)}>
			movie
			<img src={movie.Poster} alt={`${movie.Title} poster`} />
			<h3>{movie.Title}</h3>
			<div>
				<p>
					<span>🗓</span>
					<span>{movie.Year}</span>
				</p>
			</div>
		</li>
	);
};

export default MovieItem;
