import { useState } from "react";
import Notification from "./Notification";

function App() {
	const [notifications, setNotifications] = useState([
		{ id: 1, message: "Info message", type: "info" },
		{ id: 2, message: "Success message", type: "success" },
		{ id: 3, message: "Warning message", type: "warning" },
		{ id: 4, message: "Error message", type: "error" },
	]);

	const handleDismiss = (id) => {
		setNotifications(
			notifications.filter((notification) => notification.is !== id)
		);
	};

	return (
		<div className="App">
			{notifications.map((notification) => (
				<Notification
					key={notification.id}
					message={notification.message}
					type={notification.type}
					onDismiss={() => handleDismiss(notification.id)}
				/>
			))}
		</div>
	);
}

export default App;
