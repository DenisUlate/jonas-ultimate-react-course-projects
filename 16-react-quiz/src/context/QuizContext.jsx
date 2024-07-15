/* eslint-disable react/prop-types */
/* eslint-disable no-case-declarations */
import { createContext, useReducer } from "react";

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

const QuizContext = createContext();

const QuizProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<QuizContext.Provider value={{ state, dispatch }}>
			{children}
		</QuizContext.Provider>
	);
};

export { QuizProvider, QuizContext };
