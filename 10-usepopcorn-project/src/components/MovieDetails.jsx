import React, { useEffect, useState } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";

const KEY = "1207a162";

const MovieDetails = ({
	selectedId,
	onMovieClose,
	onAddWatchedMovie,
	watched,
}) => {
	const [movie, setMovie] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [userRating, setUserRating] = useState(0);

	const isMovieInList = watched.some((movie) => movie.imdbID === selectedId);

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
	} = movie;

	function handleAdd() {
		const newWatchedMovie = {
			imdbID: selectedId,
			Title: title,
			Year: year,
			Poster: poster,
			runtime: Number(runtime.split(" ")[0]),
			imdbRating: Number(imdbRating),
			userRating,
		};
		onAddWatchedMovie(newWatchedMovie);
		onMovieClose();
	}

	useEffect(
		function () {
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
		async function getMovieDetails() {
			setIsLoading(true);
			const res = await fetch(
				`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
			);
			const data = await res.json();
			setMovie(data);
			setIsLoading(false);
		}
		getMovieDetails();
	}, [selectedId]);

	useEffect(
		function () {
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
				<Loader />
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
