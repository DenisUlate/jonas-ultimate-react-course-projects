/* eslint-disable react/prop-types */
import {  useState } from "react";
import Header from "./components/Header";
import ListBox from "./components/ListBox";
import MovieList from "./components/MovieList";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMovieList from "./components/WatchedMovieList";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import MovieDetails from "./components/MovieDetails";
import { useMovies } from "./components/useMovies";
import { useLocalStorageState } from "./components/useLocalStorageState";

// const KEY = "1207a162";

function App() {
	const [query, setQuery] = useState("inception");
	const [selectedId, setSelectedId] = useState(null);

	const { movies, isLoading, error } = useMovies(query);
	const [watched, setWatched] = useLocalStorageState([], "watched");

	// const [watched, setWatched] = useState(function () {
	// 	const watchedData = localStorage.getItem("watched");
	// 	return watchedData ? JSON.parse(watchedData) : [];
	// });

	function handleSelectedMovie(id) {
		setSelectedId((selectedId) => (selectedId === id ? null : id));
	}

	/**
	 * Closes the movie details.
	 */
	function handleCloseMovieDetails() {
		setSelectedId(null);
	}

	/**
	 * Adds a movie to the watched list.
	 * @param {object} movie - The movie object to be added.
	 */
	function handleAddWatchedMovie(movie) {
		setWatched((watched) => [...watched, movie]);
	}

	/**
	 * Removes a movie from the watched list.
	 * @param {string} id - The ID of the movie to be removed.
	 */
	function handleRemoveWatchedMovie(id) {
		setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
	}

	// useEffect(() => {
	// 	localStorage.setItem("watched", JSON.stringify(watched));
	// }, [watched]);

	return (
		<div className="w-full h-screen bg-gradient-to-t from-teal-950 to-neutral-950 px-6 py-6">
			<Header query={query} setQuery={setQuery} movies={movies} />

			{/* Main content */}
			<main className="w-full max-w-[80rem] mx-auto flex gap-2">
				<ListBox>
					{isLoading && <Loader />}
					{!isLoading && !error && (
						<MovieList movies={movies} onSelectMovie={handleSelectedMovie} />
					)}
					{error && <ErrorMessage message={error} />}
				</ListBox>
				<ListBox>
					{selectedId ? (
						<MovieDetails
							selectedId={selectedId}
							onMovieClose={handleCloseMovieDetails}
							onAddWatchedMovie={handleAddWatchedMovie}
							watched={watched}
						/>
					) : (
						<>
							<WatchedSummary watched={watched} />
							<WatchedMovieList
								watched={watched}
								onRemoveWatchedMovie={handleRemoveWatchedMovie}
							/>
						</>
					)}
				</ListBox>
			</main>
		</div>
	);
}

export default App;
