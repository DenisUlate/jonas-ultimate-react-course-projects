/* eslint-disable react/prop-types */
import Spinner from "./Spinner";
import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Message from "./Message";

import { useCities } from "../contexts/CitiesContext";

function CountryList() {
	const { cities, isLoading } = useCities();
	if (isLoading) {
		return <Spinner />;
	}

	if (!cities.length) {
		return (
			<Message message="Add your first city by clicking on a city on the map" />
		);
	}

	const countries = cities.reduce((acc, city) => {
		if (!acc.map((el) => el.country).includes(city.country)) {
			acc.push({ country: city.country });

			return [...acc, { country: city.country, emoji: city.emoji }];
		} else {
			return acc;
		}
	}, []);

	return (
		<ul className={styles.countryList}>
			{countries.map((country, index) => (
				<CountryItem key={country.country + index} country={country} />
			))}
		</ul>
	);
}

export default CountryList;
