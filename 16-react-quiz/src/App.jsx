import { useEffect, useReducer } from "react";
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

const initialState = {
	questions: [],
	answer: null,
	status: "loading", // "loading", "ready", "error", "active", "completed
	questionIndex: 0,
	points: 0,
	highscore: 0,
	timer: null,
};

const SECS_PER_QUESTION = 20;

const reducer = (state, action) => {
	switch (action.type) {
		case "DATA_RECEIVED":
			return {
				...state,
				questions: action.payload,
				status: "ready",
			};
		case "DATA_ERROR":
			return {
				...state,
				status: "error",
			};
		case "START_QUIZ":
			return {
				...state,
				status: "active",
				timer: state.questions.length * SECS_PER_QUESTION,
			};
		case "ANSWER_QUESTION":
			const question = state.questions.at(state.questionIndex);
			const isCorrect = action.payload === question.correctOption;
			const pointsToAdd = isCorrect ? question.points : 0;

			return {
				...state,
				answer: action.payload,
				points: state.points + pointsToAdd,
			};

		case "NEXT_QUESTION":
			return {
				...state,
				questionIndex: state.questionIndex + 1,
				answer: null,
			};

		case "FINISH":
			return {
				...state,
				status: "completed",
				highscore:
					state.points > state.highscore ? state.points : state.highscore,
			};
		case "RESTART":
			return {
				...initialState,
				status: "ready",
				highscore: state.highscore,
				questions: state.questions,
			};
		case "TICK":
			return {
				...state,
				timer: state.timer - 1,
				status: state.timer === 0 ? "completed" : state.status,
			};

		default:
			throw new Error("Invalid action type");
	}
};

function App() {
	const [
		{ questions, status, questionIndex, answer, points, highscore, timer },
		dispatch,
	] = useReducer(reducer, initialState);

	const numQuestions = questions.length;
	const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0);

	useEffect(() => {
		fetch("http://localhost:8000/questions")
			.then((response) => response.json())
			.then((data) => dispatch({ type: "DATA_RECEIVED", payload: data }))
			.catch((error) => dispatch({ type: "DATA_ERROR" }));
	}, []);
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
