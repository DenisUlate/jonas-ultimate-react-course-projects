/* eslint-disable react/prop-types */
import { useRef } from "react";
import { useKey } from "./useKey";

const Search = ({ query, setQuery }) => {
	const inputEl = useRef(null);

	useKey("Enter", () => {
		if (document.activeElement === inputEl.current) return;
		inputEl.current.focus();
		setQuery("");
	});

	return (
		<input
			className="w-[20rem] h-[2rem] bg-transparent border border-white/15 text-white text-center rounded-xl focus:outline-none focus:border-2 transition-all duration-500 ease-in-out focus:shadow-sm focus:shadow-white/50 hover:bg-teal-700"
			type="text"
			placeholder="Search movies..."
			value={query}
			onChange={(e) => setQuery(e.target.value)}
			ref={inputEl}
		/>
	);
};

export default Search;
