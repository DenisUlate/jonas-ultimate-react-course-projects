/* eslint-disable react/prop-types */
import { createContext, useEffect, useContext, useReducer } from "react";
const BASE_URL = "http://localhost:9000";

const CitiesContext = createContext();

const initialState = {
	cities: [],
	isLoading: false,
	currentCity: {},
	error: "",
};

function reducer(state, action) {
	switch (action.type) {
		case "loading":
			return { ...state, isLoading: true };
		case "city/created":
			return {
				...state,
				isLoading: false,
				cities: [...state.cities, action.payload],
				currentCity: action.payload,
			};
		case "cities/loaded":
			return { ...state, isLoading: false, cities: action.payload };
		case "city/loaded":
			return { ...state, isLoading: false, currentCity: action.payload };
		case "city/deleted":
			return {
				...state,
				isLoading: false,
				cities: state.cities.filter((city) => city.id !== action.payload),
				currentCity: {},
			};
		case "rejected":
			return { ...state, isLoading: false, error: action.payload };

		default:
			return state;
	}
}

function CitiesProvider({ children }) {
	const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
		reducer,
		initialState
	);

	useEffect(() => {
		const fetchCities = async () => {
			dispatch({ type: "loading" });

			try {
				const response = await fetch(`${BASE_URL}/cities`);
				const data = await response.json();
				dispatch({ type: "cities/loaded", payload: data });
			} catch {
				dispatch({
					type: "rejected",
					payload: "There was an error fetching cities",
				});
			}
		};

		fetchCities();
	}, []);

	async function getCity(id) {
		if (Number(id) === currentCity.id)
			return console.log("City already loaded");

		dispatch({ type: "loading" });

		try {
			const response = await fetch(`${BASE_URL}/cities/${id}`);
			const data = await response.json();
			dispatch({ type: "city/loaded", payload: data });
		} catch {
			dispatch({
				type: "rejected",
				payload: "There was an error loading the city",
			});
		}
	}

	async function createCity(newCity) {
		dispatch({ type: "loading" });

		try {
			const response = await fetch(`${BASE_URL}/cities`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newCity),
			});
			const data = await response.json();
			dispatch({ type: "city/created", payload: data });
		} catch {
			dispatch({
				type: "rejected",
				payload: "There was an error creating city",
			});
		}
	}

	async function deleteCity(id) {
		dispatch({ type: "loading" });

		try {
			await fetch(`${BASE_URL}/cities/${id}`, {
				method: "DELETE",
			});

			dispatch({ type: "city/deleted", payload: id });
		} catch {
			dispatch({
				type: "rejected",
				payload: "There was an error deleting city",
			});
		}
	}

	return (
		<CitiesContext.Provider
			value={{
				cities,
				isLoading,
				currentCity,
				error,
				getCity,
				createCity,
				deleteCity,
			}}>
			{children}
		</CitiesContext.Provider>
	);
}

function useCities() {
	const context = useContext(CitiesContext);
	if (context === undefined) {
		throw new Error("useCities must be used within a CitiesProvider");
	}

	return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { CitiesProvider, CitiesContext, useCities };
