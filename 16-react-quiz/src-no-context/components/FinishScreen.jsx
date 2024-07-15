/* eslint-disable react/prop-types */
function FinishScreen({ points, maxPoints, highscore, dispatch }) {
	const percentage = (points / maxPoints) * 100;

	let emoji;
	if (percentage === 100) {
		emoji = "🎉";
	} else if (percentage >= 80) {
		emoji = "👏";
	} else if (percentage >= 60) {
		emoji = "😒";
	} else if (percentage >= 40) {
		emoji = "😬";
	} else {
		emoji = "😭";
	}

	return (
		<>
			<p className="result">
				<span>{emoji}</span>
				You scored <strong>{points}</strong> out of <strong>{maxPoints}</strong>
				({Math.ceil(percentage)}%)!
			</p>
			<p className="highscore">(Highscore: {highscore} points)</p>
			<button
				className="btn btn-ui"
				onClick={() => dispatch({ type: "RESTART" })}>
				Restart
			</button>
		</>
	);
}

export default FinishScreen;
