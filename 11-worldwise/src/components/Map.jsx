import styles from "./Map.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";

function Map() {
	const navigate = useNavigate();
	// eslint-disable-next-line no-unused-vars
	const [searchParams, setSearchParams] = useSearchParams();
	const lat = searchParams.get("lat");
	const lng = searchParams.get("lng");

	return (
		<div
			className={styles.mapContainer}
			onClick={() => {
				navigate("form");
			}}>
			<h1>Map</h1>
			<h1>
				Position: {lat}, {lng}
			</h1>
		</div>
	);
}

export default Map;
