import { useState, useEffect } from "react";

export function useLocalStorageState(initialState, key) {
	// Obtener el valor almacenado en el localStorage o usar el initialState si no hay ningún valor almacenado
	const [value, setValue] = useState(function () {
		const storedValue = localStorage.getItem(key);
		return storedValue ? JSON.parse(storedValue) : initialState;
	});

	// Actualizar el valor almacenado en el localStorage cada vez que el valor cambie
	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [value, key]);

	// Devolver el valor y la función para actualizarlo
	return [value, setValue];
}
