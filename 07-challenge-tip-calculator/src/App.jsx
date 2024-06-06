import { useState } from "react";

function App() {
	const [bill, setBill] = useState(0);
	const [service1, setService1] = useState(0.3);
	const [service2, setService2] = useState(0.3);

	const handleBill = (e) => {
		setBill(parseFloat(e.target.value));
	};

	const handleService1 = (e) => {
		setService1(parseFloat(e.target.value));
	};

	const handleService2 = (e) => {
		setService2(parseFloat(e.target.value));
	};

	const tip1 = bill * service1;
	const tip2 = bill * service2;
	const total = bill + tip1 + tip2;

	return (
		<div className="bg-neutral-400 h-screen px-28">
			<h1 className="text-center text-2xl py-8 font-semibold uppercase">
				Tip Calculator
			</h1>
			<Bill handleBill={handleBill} />
			<Services>
				<h2 className="text-lg font-semibold w-1/2">
					How did you like the service?
				</h2>
				<select
					name="service"
					className="w-1/2 border border-neutral-300 p-2"
					onChange={handleService1}>
					<option value="0.3">it was good 100%</option>
					<option value="0.2">it was nice 60%</option>
					<option value="0.15">is was regular 35%</option>
					<option value="0.1">bad services 10%</option>
					<option value="0.05">it was bad 5%</option>
				</select>
			</Services>
			<Services>
				<h2 className="text-lg font-semibold w-1/2">
					How did your friend like the service?
				</h2>
				<select
					name="service"
					className="w-1/2 border border-neutral-300 p-2"
					onChange={handleService2}>
					<option value="0.3">it was good 100%</option>
					<option value="0.2">it was nice 60%</option>
					<option value="0.15">is was regular 35%</option>
					<option value="0.1">bad services 10%</option>
					<option value="0.05">it was bad 5%</option>
				</select>
			</Services>
			<Stats total={total} tip1={tip1} tip2={tip2} />
		</div>
	);
}

function Bill({ handleBill }) {
	return (
		<div className="bg-white p-4">
			<h2 className="text-lg font-semibold">How much was the bill?</h2>
			<input
				onChange={handleBill}
				type="number"
				placeholder="0.00"
				className="w-full border border-neutral-300 p-2 mt-2"
			/>
		</div>
	);
}

function Services({ children }) {
	return <div className="flex gap-6 bg-white p-4 mt-2 w-full">{children}</div>;
}

function Stats({ total, tip1, tip2 }) {
	return (
		<p className="w-full text-xl font-semibold text-center my-8">
			You pay ${total.toFixed(2)} (${(total - tip1 - tip2).toFixed(2)} + $
			{tip1.toFixed(2)} + ${tip2.toFixed(2)})
		</p>
	);
}

export default App;
