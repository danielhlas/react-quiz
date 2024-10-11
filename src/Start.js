function startScreen({numberOfQuestion, dispatch}) {
    return (
        <div className="start">
            <h2>Welcome to the Quiz app</h2>
            <h3>{numberOfQuestion} questions are ready to go! </h3>
            <button className="btn btn-ui" onClick={()=>dispatch({type:"showQuestion"})}>Start the game</button>
        </div>
    )
}

export default startScreen
