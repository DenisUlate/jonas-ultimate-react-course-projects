// eslint-disable-next-line react/prop-types
function Progress({ questionIndex, numQuestions, points, maxPoints, answer }) {
	return (
		<header className="progress">
			<progress
				value={questionIndex + Number(answer !== null)}
				max={numQuestions}></progress>

			<p>
				Question <strong>{questionIndex + 1}</strong> / {numQuestions}
			</p>

			<p>
				<strong>{points}</strong> / {maxPoints}
			</p>
		</header>
	);
}

export default Progress;
