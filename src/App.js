import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader"
import Error from "./Error"
import Start from "./Start";
import Question from "./Question";
import ProgressBar from "./ProgressBar";
import Summary from "./Summary";

export default function App() {


  const initialVar = {
    questions: [], //seznam všech otázek
    status: "loading",
    questionIndex: 0,
    answer: null,
    score: 0,
    bestScore: 0,
    time: 180
  }

  const [value, dispatch] = useReducer(reducer, initialVar)

  function reducer(value, action){
    switch(action.type){
      case "loaded": return {...value, questions: action.payload, status: "loaded"}
      case "error": return {...value, status: "error"}
      case "showQuestion": return {...value, status: "showQuestion"}
      case "answered": 
        const question = value.questions.at(value.questionIndex)
        return {...value, 
          answer: action.payload, 
          score: (action.payload === question.correctOption) ? value.score + question.points : value.score}
      case "nextQ": return{...value, questionIndex: value.questionIndex++, answer: null}
      case "timerMinusOne": 
      if (value.time===0) return {...value, status: "summary"} 
      else {return {...value, time: value.time-1}}
        
      case "summary": return {...value, status: "summary", bestScore: value.score > value.bestScore ? value.score : value.bestScore}
      case "restart": return {...initialVar, questions: value.questions, status: "loaded", highscore: value.highscore}
      default: throw new Error("action.type not recognized")
    }

  }

  const maxScore = value.questions.reduce(function(acc, i) {return acc + i.points}, 0)
  const numQuestions = value.questions.length

  //Fetching data:
  useEffect(function(){
    async function fetchData(){
      try {
        const data = await fetch("http://localhost:8000/questions")
        
        const result = await data.json()
        dispatch({type: "loaded", payload: result})
      }
      catch (err) {
        dispatch({type: "error"})
    }
    }
    fetchData()
  }, [])


  
  const numberOfQuestion = value.questions.length

  return(
    <div className="app">
      <Header/>

      <Main>
        {value.status === "loading" && <Loader/>}
        {value.status === "error" && <Error/>}
       
        {value.status === "loaded" && <Start numberOfQuestion={numberOfQuestion} dispatch={dispatch}/>}
        {value.status === "showQuestion" && 
          <>
            <ProgressBar questionIndex={value.questionIndex} score={value.score} maxScore={maxScore} numQuestions={numQuestions}/>
            <Question question={value.questions[value.questionIndex]} answer={value.answer} questionIndex={value.questionIndex} dispatch={dispatch} time={value.time}/>
          </>}
        {value.status === "summary" && <Summary score={value.score} maxScore={maxScore} bestScore={value.bestScore} dispatch={dispatch}/>}
      </Main>  
      
    </div>
  );
}