function Summary({score, maxScore, bestScore, dispatch}) {


    return (
        <>
            <p className="result">
                Score: {score} / {maxScore}
                <p>--------</p>
                {Math.ceil(score / maxScore * 100) }% was correct
            </p>

            <p className="highscore">
                Best score was: {bestScore} / {maxScore}
            </p>

            <button className="btn btn-ui" onClick={()=>dispatch({type: "restart"})}>Restart</button>
        </>
    )
}

export default Summary
