import React from "react";

// Función para calcular el promedio de un array
const average = (arr) =>
	arr.reduce((acc, cur, arr) => acc + cur / arr.length, 0);

const WatchedSummary = ({ watched }) => {
	// Calcula el promedio de las calificaciones de IMDb
	const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
	// Calcula el promedio de las calificaciones de los usuarios
	const avgUserRating = average(watched.map((movie) => movie.userRating));
	// Calcula el promedio de la duración de las películas
	const avgRuntime = average(watched.map((movie) => movie.runtime));

	return (
		<div className="summary">
			<h2>Movies you watched</h2>
			<div>
				<p>
					<span>#️⃣</span>
					<span>{watched.length} movies</span>
				</p>
				<p>
					<span>⭐️</span>
					<span>{avgImdbRating.toFixed(2)}</span>
				</p>
				<p>
					<span>🌟</span>
					<span>{avgUserRating.toFixed(2)}</span>
				</p>
				<p>
					<span>⏳</span>
					<span>{avgRuntime} min</span>
				</p>
			</div>
		</div>
	);
};

export default WatchedSummary;
