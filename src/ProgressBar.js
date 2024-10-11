function ProgressBar({questionIndex, score, maxScore, numQuestions}) {
    return (
        <header className="progress">
             <progress max={numQuestions} value={questionIndex}/> 

            <p>{questionIndex +1 } / {numQuestions}</p>

            <p>{score} / {maxScore}</p>
        </header>
    );
}

export default ProgressBar
