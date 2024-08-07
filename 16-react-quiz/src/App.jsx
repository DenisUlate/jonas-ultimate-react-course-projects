/* eslint-disable no-case-declarations */
import { useEffect } from "react";
import { useQuiz } from "./hooks/useQuiz";
import Header from "./components/Header";
import MainApp from "./components/MainApp";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Timer from "./components/Timer";
import Footer from "./components/Footer";

function App() {
	const { state, dispatch } = useQuiz();
	console.log(dispatch);
	const { questions, status, questionIndex, answer, points, highscore, timer } =
		state;

	const numQuestions = questions.length;
	const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0);

	useEffect(() => {
		fetch("http://localhost:8000/questions")
			.then((response) => response.json())
			.then((data) => dispatch({ type: "DATA_RECEIVED", payload: data }))
			.catch(() => dispatch({ type: "DATA_ERROR" }));
	}, [dispatch]);
	return (
		<div className="app">
			<Header />

			<MainApp>
				{status === "loading" && <Loader />}
				{status === "error" && <Error />}
				{status === "ready" && (
					<StartScreen numQuestions={numQuestions} dispatch={dispatch} />
				)}
				{status === "active" && (
					<>
						<Progress
							questionIndex={questionIndex}
							numQuestions={numQuestions}
							points={points}
							maxPoints={maxPoints}
							answer={answer}
						/>
						<Question
							question={questions[questionIndex]}
							dispatch={dispatch}
							answer={answer}
						/>
						<Footer>
							<Timer dispatch={dispatch} timer={timer} />
							<NextButton
								dispatch={dispatch}
								answer={answer}
								questionIndex={questionIndex}
								numQuestions={numQuestions}
							/>
						</Footer>
					</>
				)}
				{status === "completed" && (
					<FinishScreen
						points={points}
						maxPoints={maxPoints}
						highscore={highscore}
						dispatch={dispatch}
					/>
				)}
			</MainApp>
		</div>
	);
}

export default App;
