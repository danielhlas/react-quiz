import { useReducer} from "react";

function DateCounter() {

  function reducer(state, action) {
    switch(action.type){
      case "přidat": 
        return {...state, count: state.count + state.step}

     case "ubrat": 
        return {...state, count: state.count - state.step}

      case "zápis": 
        return {...state, count: state.count + action.payload}
      
      case "step": 
        return {...state, step: state.step + action.payload}

      default: throw Error("nezadána hodnota")
      }
    }
 

  const variable123 = {count: 1, step: 1}
  const [count, dispatch] = useReducer(reducer, variable123);

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count.count);

  const dec = function () {
    dispatch({type: "ubrat", payload: Number(5)})
  };

  const inc = function () {
    dispatch({type: "přidat", payload: Number(5)})
  };

  const defineCount = function (e) {
    dispatch({type: "zápis", payload: Number(e.target.value)})
  };

  const defineStep = function (e) {
    dispatch({type: "step", payload: Number(e.target.value)})
  };

  const reset = function () {
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={count.step}
          onChange={defineStep}
        />
        <span>{count.step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count.count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
