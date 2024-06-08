import React, { useState, useEffect } from "react";

const Notification = ({
	message,
	type = "info",
	duration = 8000,
	onDismiss,
}) => {
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(false);
			if (onDismiss) {
				onDismiss();
			}
		}, duration);

		return () => clearTimeout(timer);
	}, [duration, onDismiss]);

	if (!isVisible) {
		return null;
	}

	return (
		<div className={`notification ${type}`}>
			<span>{message}</span>
			<button onClick={() => setIsVisible(false)}>Dismiss</button>
		</div>
	);
};

export default Notification;
