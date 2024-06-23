/* eslint-disable react/prop-types */
function NextButton({ dispatch, answer, questionIndex, numQuestions }) {
	if (answer === null) return null;

	if (questionIndex < numQuestions - 1)
		return (
			<button
				className="btn btn-ui"
				onClick={() => dispatch({ type: "NEXT_QUESTION" })}>
				Next
			</button>
		);

	if (questionIndex === numQuestions - 1)
		return (
			<button
				className="btn btn-ui"
				onClick={() => dispatch({ type: "FINISH" })}>
				Finish
			</button>
		);
}

export default NextButton;
