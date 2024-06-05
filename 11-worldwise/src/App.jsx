import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Homepage from "./pages/Homepage";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import "./index.css";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";

const BASE_URL = "http://localhost:9000";

function App() {
	const [cities, setCities] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		async function fetchCities() {
			try {
				setLoading(true);
				const response = await fetch(`${BASE_URL}/cities`);
				const data = await response.json();
				setCities(data);
			} catch (error) {
				alert("Fetch cities failed: ", error);
			} finally {
				setLoading(false);
			}
		}
		fetchCities();
	}, []);
	return (
		<BrowserRouter>
			<Routes>
				{/* Add routes here */}
				<Route path="/" element={<Homepage />} />
				<Route path="product" element={<Product />} />
				<Route path="Pricing" element={<Pricing />} />
				<Route path="login" element={<Login />} />
				<Route path="App" element={<AppLayout />}>
					<Route index element={<Navigate replace to="cities" />} />
					<Route
						path="cities"
						element={<CityList cities={cities} loading={loading} />}
					/>
					<Route path="cities/:id" element={<City />} />
					<Route path="countries" element={<CountryList />} />
					<Route path="form" element={<Form />} />
				</Route>
				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
