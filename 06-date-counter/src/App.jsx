import { useState } from "react";

function App() {
	const [step, setStep] = useState(1);
	const [count, setCount] = useState(0);

	const handleStep = (action) => {
		if (action === "increment") {
			setStep(step + 1);
		} else {
			setStep(step - 1);
		}
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
			<h2 className="text-center text-xl my-6">
				{totalDays} days from today is {futureDate}
			</h2>
			<div className="flex gap-6 items-center justify-center text-2xl">
				<div className="flex">
					<button
						onClick={handleStep}
						className="border bg-slate-400 px-4 rounded hover:bg-slate-500">
						-
					</button>
					<p className="px-4">Step: {step}</p>
					<button
						onClick={() => handleStep("increment")}
						className="border bg-slate-400 px-4 rounded hover:bg-slate-500">
						+
					</button>
				</div>
				<div className="flex">
					<button
						onClick={handleCount}
						className="border bg-slate-400 px-4 rounded hover:bg-slate-500">
						-
					</button>
					<p className="px-4">Count: {count}</p>
					<button
						onClick={() => handleCount("increment")}
						className="border bg-slate-400 px-4 rounded hover:bg-slate-500">
						+
					</button>
				</div>
			</div>
		</>
	);
}

export default App;
