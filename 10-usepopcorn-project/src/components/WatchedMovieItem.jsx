import React from "react";

/**
 * Componente que representa un elemento de película vista.
 *
 * @component
 * @param {Object} props - Las props del componente.
 * @param {Object} props.movie - La información de la película.
 * @param {string} props.movie.imdbID - El ID de IMDb de la película.
 * @param {string} props.movie.Poster - La URL del póster de la película.
 * @param {string} props.movie.Title - El título de la película.
 * @param {number} props.movie.imdbRating - La calificación de IMDb de la película.
 * @param {number} props.movie.userRating - La calificación del usuario de la película.
 * @param {number} props.movie.runtime - La duración de la película en minutos.
 * @param {Function} props.onRemoveWatchedMovie - La función para eliminar la película vista.
 * @returns {JSX.Element} El elemento de película vista.
 */
const WatchedMovieItem = ({ movie, onRemoveWatchedMovie }) => {
	const { imdbID } = movie;
	return (
		<li key={movie.imdbID}>
			<img src={movie.Poster} alt={`${movie.Title} poster`} />
			<h3>{movie.Title}</h3>
			<div>
				<p>
					<span>⭐️</span>
					<span>{movie.imdbRating}</span>
				</p>
				<p>
					<span>🌟</span>
					<span>{movie.userRating}</span>
				</p>
				<p>
					<span>⏳</span>
					<span>{movie.runtime} min</span>
				</p>
				<button
					className="btn-delete"
					onClick={() => onRemoveWatchedMovie(imdbID)}>
					X
				</button>
			</div>
		</li>
	);
};

export default WatchedMovieItem;
