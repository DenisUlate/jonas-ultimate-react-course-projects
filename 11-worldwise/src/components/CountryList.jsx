/* eslint-disable react/prop-types */
import CountryItem from "./CityItem";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";

function CountryList({ cities, loading }) {
	if (loading) {
		return <Spinner />;
	}

	if (!cities.length) {
		return (
			<Message message="Add your country by clicking on a country on the map" />
		);
	}

	const countries = cities.reduce((arr, city) => {
		if (!arr.map((el) => el.country).includes(city.country)) {
			return [...arr, { country: city.country, emoji: city.emoji }];
		}
		return arr;
	}, []);

	return (
		<div className={styles.CityList}>
			{countries.map((country) => (
				<CountryItem country={country} key={country.country} />
			))}
		</div>
	);
}

export default CountryList;
