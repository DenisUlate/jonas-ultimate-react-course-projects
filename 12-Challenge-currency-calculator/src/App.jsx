import { useState, useEffect } from "react";

function App() {
	const [amount, setAmount] = useState("");
	const [fromCurrency, setFromCurrency] = useState("USD");
	const [toCurrency, setToCurrency] = useState("EUR");
	const [conversionResult, setConversionResult] = useState(null);

	const handleAmountChange = (e) => {
		setAmount(e.target.value);
	};
	const handleFromCurrencyChange = (e) => {
		setFromCurrency(e.target.value);
	};
	const handleToCurrencyChange = (e) => {
		setToCurrency(e.target.value);
	};

	useEffect(() => {
		if (amount && fromCurrency && toCurrency) {
			fetch(
				`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
			)
				.then((response) => response.json())
				.then((data) => {
					if (data.rates) {
						setConversionResult(data.rates[toCurrency]);
					} else {
						setConversionResult(null);
					}
				})
				.catch((error) => {
					console.error("Error fetching conversion data:", error);
					setConversionResult(null);
				});

			if (fromCurrency === toCurrency) {
				return setConversionResult(amount);
			}
		}
	}, [amount, fromCurrency, toCurrency]);

	return (
		<div className="flex flex-col justify-center bg-neutral-800 h-screen">
			<h1 className="mb-10 text-center text-2xl text-neutral-300 uppercase tracking-widest">
				Currency converter
			</h1>
			<div className="flex justify-center items-center  gap-2">
				<input
					type="text"
					value={amount}
					onChange={handleAmountChange}
					placeholder="Enter amount"
					className="rounded outline-none bg-neutral-300 shadow-inner p-2"
				/>
				<select
					value={fromCurrency}
					onChange={handleFromCurrencyChange}
					className="p-2 bg-inherit text-white border rounded">
					<option className="bg-neutral-600" value="USD">
						USD
					</option>
					<option className="bg-neutral-600" value="EUR">
						EUR
					</option>
					<option className="bg-neutral-600" value="CAD">
						CAD
					</option>
					<option className="bg-neutral-600" value="INR">
						INR
					</option>
				</select>
				<select
					value={toCurrency}
					onChange={handleToCurrencyChange}
					className="p-2 bg-inherit text-white border rounded">
					<option className="bg-neutral-600" value="USD">
						USD
					</option>
					<option className="bg-neutral-600" value="EUR">
						EUR
					</option>
					<option className="bg-neutral-600" value="CAD">
						CAD
					</option>
					<option className="bg-neutral-600" value="INR">
						INR
					</option>
				</select>
				<p className="text-2xl text-neutral-200">
					{conversionResult
						? `${amount} ${fromCurrency} = ${conversionResult} ${toCurrency}`
						: "OUTPUT"}
				</p>
			</div>
		</div>
	);
}

export default App;
