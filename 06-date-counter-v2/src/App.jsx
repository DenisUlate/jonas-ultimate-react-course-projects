import { useState } from "react";

function App() {
	const [step, setStep] = useState(1);
	const [count, setCount] = useState(0);

	const handleStepChange = (event) => {
		setStep(parseInt(event.target.value, 10));
		setCount(0); // Reset count when step changes
	};

	const handleCountChange = (event) => {
		setCount(parseInt(event.target.value));
	};

	const handleReset = () => {
		setStep(1);
		setCount(0);
	};

	const handleCount = (action) => {
		if (action === "increment") {
			setCount(count + 1);
		} else {
			setCount(count - 1);
		}
	};

	const calculateDate = (days) => {
		const currentDate = new Date();
		const futureDate = new Date(currentDate);
		futureDate.setDate(currentDate.getDate() + days);
		return futureDate.toDateString();
	};

	const totalDays = step * count;
	const futureDate = calculateDate(totalDays);

	return (
		<>
			<h1 className="text-2xl font-bold text-center py-32">Date Counter</h1>

			<div className="flex flex-col gap-6 items-center justify-center text-2xl">
				<div className="flex items-center justify-center">
					<input
						onChange={handleStepChange}
						type="range"
						name="steps"
						min={0}
						max={10}
						value={step}
						className="w-40"
					/>
					<p className="px-4">{step}</p>
				</div>
				<div className="flex">
					<button
						onClick={handleCount}
						className="border bg-slate-400 px-4 rounded hover:bg-slate-500">
						-
					</button>
					<input
						onChange={handleCountChange}
						type="number"
						name="count"
						value={count}
					/>
					{/* <p className="px-4">Count: {count}</p> */}
					<button
						onClick={() => handleCount("increment")}
						className="border bg-slate-400 px-4 rounded hover:bg-slate-500">
						+
					</button>
				</div>
				<h2 className="text-center text-xl my-6">
					{totalDays} days from today is {futureDate}
				</h2>
				{step !== 1 || count !== 0 ? (
					<button
						onClick={handleReset}
						className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-500">
						Reset
					</button>
				) : null}
			</div>
		</>
	);
}

export default App;
