import { useEffect, useState } from "react";

const KEY = "1207a162";

export function useMovies(query) {
	const [movies, setMovies] = useState([]);
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const abortController = new AbortController();
		async function fetchMovies() {
			if (!query.length) {
				setMovies([]);
				setError("");
				return;
			}

			try {
				setIsLoading(true);
				const response = await fetch(
					`https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
					{ signal: abortController.signal }
				);

				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const data = await response.json();
				if (data.Response === "False") {
					throw new Error("No results found");
				}

				setMovies(data.Search);
				setError("");
			} catch (error) {
				console.error(error.message);
				if (error.name === "AbortError") {
					setError(error.message);
				}
			} finally {
				setIsLoading(false);
			}
		}

		fetchMovies();
		return () => {
			abortController.abort();
		};
	}, [query]);

	return { movies, error, isLoading };
}
