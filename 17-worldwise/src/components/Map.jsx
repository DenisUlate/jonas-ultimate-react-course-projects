/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	useMap,
	useMapEvent,
	useMapEvents,
} from "react-leaflet";
import { useState, useEffect } from "react";
import { useCities } from "../contexts/CitiesContext";

import styles from "./Map.module.css";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";

function Map() {
	const { cities } = useCities();
	const [mapPosition, setMapPosition] = useState([51.505, -0.09]);

	const {
		isLoading: isLoadingPosition,
		position: geolocationPosition,
		getPosition,
	} = useGeolocation();

	const [lat, lng] = useUrlPosition();

	useEffect(() => {
		if (lat && lng) {
			setMapPosition([parseFloat(lat), parseFloat(lng)]);
		}
	}, [lat, lng]);

	useEffect(() => {
		if (geolocationPosition) {
			setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
		}
	}, [geolocationPosition]);

	return (
		<div
			className={styles.mapContainer}
			onClick={() => {
				navigate("form");
			}}>
			{!geolocationPosition && (
				<Button type="position" onClick={getPosition}>
					{isLoadingPosition ? "Loading..." : "Get Position"}
				</Button>
			)}
			<MapContainer
				center={mapPosition}
				zoom={6}
				scrollWheelZoom={true}
				className={styles.map}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
				/>
				{cities.map((city) => (
					<Marker
						key={city.id}
						position={[city.position.lat, city.position.lng]}>
						<Popup>
							<span>{city.emoji}</span> <span>{city.cityName}</span>
						</Popup>
					</Marker>
				))}

				<ChangeCenter positon={mapPosition} />
				<DetectClick />
			</MapContainer>
			,
		</div>
	);
}

function ChangeCenter({ positon }) {
	const map = useMap();
	map.setView(positon);

	return null;
}

function DetectClick() {
	const navigate = useNavigate();

	useMapEvents({
		click(e) {
			navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
		},
	});
}

export default Map;
