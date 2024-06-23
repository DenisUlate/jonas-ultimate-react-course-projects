/* eslint-disable react/prop-types */
function Options({ question, dispatch, answer }) {
	const hasAnswered = answer !== null;

	return (
		<div className="options">
			{question.options.map((option, index) => {
				// Determinar si la opción es la correcta
				const isCorrectOption = index === question.correctOption;
				// Determinar si esta opción fue seleccionada
				const isSelected = index === answer;
				// Aplicar la clase 'answer' solo si la opción seleccionada es correcta
				const answerClass = isSelected && isCorrectOption ? "answer" : "";
				// Aplicar la clase 'selected' solo si la opción seleccionada es incorrecta
				const selectedClass = isSelected && !isCorrectOption ? "selected" : "";
				// Determinar las clases adicionales basadas en si la pregunta ha sido respondida
				const additionalClass = hasAnswered
					? isCorrectOption
						? "correct"
						: "wrong"
					: "";

				return (
					<button
						key={option}
						disabled={hasAnswered}
						className={`btn btn-option ${answerClass} ${selectedClass} ${additionalClass}`}
						onClick={() =>
							dispatch({ type: "ANSWER_QUESTION", payload: index })
						}>
						{option}
					</button>
				);
			})}
		</div>
	);
}

export default Options;
