import {useEffect} from "react"
import Timer from "./Timer";

function Question({question, answer, questionIndex, dispatch, time}) {

    useEffect(function(){
       const interval = setInterval(function(){
            dispatch({type: "timerMinusOne"})
        }, 1000)

    return function(){clearInterval(interval)}
    } ,[])
    
    const wasAnswered = answer !== null;
    
    return (
    <>
        <div className="options"> 
             <h4>{question.question}</h4> 
            {question.options.map((q, index)=>
                <button alt={index} className={`btn btn-option ${answer === index ? "answer" : ""} 
                    ${wasAnswered ? question.correctOption === index ? "correct" : "wrong" : ""} `} 
                    //nested ternaries
                    key={q} 
                    disabled={wasAnswered}
                    onClick={() => {dispatch({type: "answered", payload: index})}
                    }> 
                        {q} 
                </button>) }
        </div>
        
        {(wasAnswered && questionIndex < 14) &&
        <button className="btn btn-ui" onClick={() => dispatch({type: "nextQ"})}>Next</button>
        }
        
        {(wasAnswered && questionIndex >= 14) &&
        <button className="btn btn-ui" onClick={() => dispatch({type: "summary"})}>Finish</button> 
        }
        <Timer time={time}/>
    </>
    )
}

export default Question
