import ListItem from "./ListItem";

const MovieList = ({ movies }) => {
	return (
		<ul className="list">
			{movies?.map((movie) => (
				<ListItem key={movie.imdbID} movie={movie} />
			))}
		</ul>
	);
};

export default MovieList;
