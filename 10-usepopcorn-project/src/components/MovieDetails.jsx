import React, { useEffect, useState } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";

const KEY = "1207a162";

const MovieDetails = ({
	selectedId, // The ID of the selected movie
	onMovieClose, // Function to close the movie details
	onAddWatchedMovie, // Function to add the movie to the watched list
	watched, // Array of watched movies
}) => {
	const [movie, setMovie] = useState({}); // State to store the movie details
	const [isLoading, setIsLoading] = useState(false); // State to track loading state
	const [userRating, setUserRating] = useState(0); // State to store user rating

	const isMovieInList = watched.some((movie) => movie.imdbID === selectedId); // Check if the movie is already in the watched list

	const {
		Title: title,
		Year: year,
		Poster: poster,
		Runtime: runtime,
		imdbRating,
		Released: released,
		Plot: plot,
		Director: director,
		Genre: genre,
		Actors: actors,
	} = movie; // Destructure movie details for easier access

	function handleAdd() {
		// Function to handle adding the movie to the watched list
		const newWatchedMovie = {
			imdbID: selectedId,
			Title: title,
			Year: year,
			Poster: poster,
			runtime: Number(runtime.split(" ")[0]),
			imdbRating: Number(imdbRating),
			userRating,
		};
		onAddWatchedMovie(newWatchedMovie); // Call the onAddWatchedMovie function with the new movie
		onMovieClose(); // Close the movie details
	}

	useEffect(
		function () {
			// Effect to handle the Escape key press to close the movie details
			function handleKeyDown(event) {
				if (event.key === "Escape") {
					onMovieClose();
				}
			}
			document.addEventListener("keydown", handleKeyDown);

			return () => {
				document.removeEventListener("keydown", handleKeyDown);
			};
		},
		[onMovieClose]
	);

	useEffect(() => {
		// Effect to fetch the movie details when the selectedId changes
		async function getMovieDetails() {
			setIsLoading(true);
			const res = await fetch(
				`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
			);
			const data = await res.json();
			setMovie(data); // Set the movie details in the state
			setIsLoading(false);
		}
		getMovieDetails();
	}, [selectedId]);

	useEffect(
		function () {
			// Effect to update the document title with the movie title
			document.title = title ? `${title} - Movie Details` : "Movie Details";

			return () => {
				document.title = "usePopcorn";
			};
		},
		[title]
	);

	return (
		<div className="details">
			{isLoading ? (
				<Loader /> // Show loader while loading movie details
			) : (
				<>
					<header>
						<button className="btn-back" onClick={onMovieClose}>
							&larr;
						</button>
						<img src={poster} alt={`Poster of ${movie} movie`} />
						<div className="details-overview">
							<h2>{title}</h2>
							<p>
								{released} &bull; {runtime}
							</p>
							<p>{genre}</p>
							<p>
								<span>⭐</span>
								{imdbRating} IMDb rating
							</p>
						</div>
					</header>
					<section>
						<div className="rating">
							<StarRating
								maxRating={10}
								size={24}
								onSetRating={setUserRating}
							/>
							{userRating > 0 && (
								<button className="btn-add" onClick={handleAdd}>
									{isMovieInList ? "Movie already on list" : "+ Add to list"}
								</button>
							)}
						</div>
						<p>
							<em>{plot}</em>
						</p>
						<p>Starring {actors}</p>
						<p>Directed by {director}</p>
					</section>{" "}
				</>
			)}
		</div>
	);
};

export default MovieDetails;
