import MovieItem from "./MovieItem";

/**
 * Renders a list of movies.
 *
 * @component
 * @param {Object[]} movies - An array of movie objects.
 * @param {Function} onSelectMovie - A callback function to handle movie selection.
 * @returns {JSX.Element} The rendered MovieList component.
 */
const MovieList = ({ movies, onSelectMovie }) => {
	return (
		<ul className="list list-movies">
			{movies?.map((movie) => (
				<MovieItem
					key={movie.imdbID}
					movie={movie}
					onSelectMovie={onSelectMovie}
				/>
			))}
		</ul>
	);
};

export default MovieList;
