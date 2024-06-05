/* eslint-disable react/prop-types */
import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";

function CityList({ cities, loading }) {
	if (loading) {
		return <Spinner />;
	}

	if (!cities.length) {
		return <Message message="Add your city by clicking on a city on the map" />;
	}

	return (
		<div className={styles.CityList}>
			{cities.map((city) => (
				<CityItem key={city.id} city={city} />
			))}
		</div>
	);
}

export default CityList;
