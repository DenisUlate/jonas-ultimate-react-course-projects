import { useContext } from "react";
import { QuizContext } from "../context/QuizContext";

// Custom hook
const useQuiz = () => {
	const context = useContext(QuizContext);
	if (!context) {
		throw new Error("useQuiz must be used within a QuizProvider");
	}
	return context;
};

export { useQuiz };
