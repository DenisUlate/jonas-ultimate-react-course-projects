/* eslint-disable react/prop-types */
function StartScreen({ numQuestions, dispatch }) {
	return (
		<div className="start">
			<h2>Welcome to The React Quiz!</h2>
			<h3>{numQuestions} question to test your React mastery</h3>
			<button
				className="btn btn-ui"
				onClick={() => dispatch({ type: "START_QUIZ" })}>
				Start the Quiz
			</button>
		</div>
	);
}

export default StartScreen;
