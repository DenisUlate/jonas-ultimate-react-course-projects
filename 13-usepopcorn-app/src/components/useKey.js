import { useEffect } from "react";

export function useKey(key, action) {
	useEffect(
		function () {
			// Effect to handle the Escape key press to close the movie details
			function handleKeyDown(event) {
				if (event.key.toLowerCase() === key.toLowerCase()) {
					action();
				}
			}
			document.addEventListener("keydown", handleKeyDown);

			return () => {
				document.removeEventListener("keydown", handleKeyDown);
			};
		},
		[action, key]
	);
}
