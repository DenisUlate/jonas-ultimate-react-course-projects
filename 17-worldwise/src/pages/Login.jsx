import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import PageNav from "../components/PageNav";
import { AuthContext } from "../contexts/FakeAuthContext";

export default function Login() {
	const { login, isAuthenticated } = useContext(AuthContext);
	const navigate = useNavigate();

	// PRE-FILL FOR DEV PURPOSES
	const [email, setEmail] = useState("jack@example.com");
	const [password, setPassword] = useState("qwerty");

	const handleSubmit = (e) => {
		e.preventDefault();
		login(email, password);
	};

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/app");
		}
	}, [isAuthenticated, navigate]);

	return (
		<main className={styles.login}>
			<PageNav />
			<form className={styles.form} onSubmit={handleSubmit}>
				<div className={styles.row}>
					<label htmlFor="email">Email address</label>
					<input
						type="email"
						id="email"
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					/>
				</div>

				<div className={styles.row}>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						onChange={(e) => setPassword(e.target.value)}
						value={password}
					/>
				</div>

				<div>
					<button>Login</button>
				</div>
			</form>
		</main>
	);
}
