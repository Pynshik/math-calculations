import React, {useEffect, useReducer} from "react"

import styles from "./Form.module.scss";

const OPERATORS = {
  SUM: '+',
  DEVISION: '/',
  REMINDER: '%',
  LARGEST: '>'
};

const actionTypes = {
  SET_FIRST_OPERATION_VALUE: "setFirstOperationValue",
  SET_SECOND_OPERATION_VALUE: "setSecondOperationValue",
  SET_OPERATOR: "setOperator",
  SET_INITIAL_STATE: "setReset"
}

const initialState = {
  firstOperationValue: '',
  secondOperationValue: '',
  operator: '+',
  result: null
}

function reducer(state, action) {
  switch(action.type) {
    case actionTypes.SET_FIRST_OPERATION_VALUE:
      return { ...state, firstOperationValue: action.payload }
    case actionTypes.SET_SECOND_OPERATION_VALUE:
      return { ...state, secondOperationValue: action.payload }
    case actionTypes.SET_OPERATOR:
      return {...state, operator: action.payload }
    case actionTypes.SET_INITIAL_STATE:
      return {...initialState};
    case OPERATORS.SUM:
      return {...state, result: state.firstOperationValue + state.secondOperationValue}
    case OPERATORS.DEVISION:
      return {...state, result: state.firstOperationValue / state.secondOperationValue}
    case OPERATORS.REMINDER:
      return {...state, result: state.firstOperationValue % state.secondOperationValue}
    case OPERATORS.LARGEST:
      return {...state, result: Number(state.firstOperationValue) > Number(state.secondOperationValue)
          ? Number(state.firstOperationValue)
          : Number(state.secondOperationValue)}
    default:
      break;
  }
}


export default function Form({ changeResults }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if(state.result) {
      const resultString = state.operator !== ">"
        ? `${state.firstOperationValue} ${state.operator} ${state.secondOperationValue} = ${state.result}`
        : `the largest of ${state.firstOperationValue} and ${state.secondOperationValue} is ${state.result}`;

      changeResults(resultString);

      dispatch({ type: actionTypes.SET_INITIAL_STATE, payload: initialState})
    }
  });



  return (
    <div className={styles['form-container']}>
      <input
        type="number"
        value={state.firstOperationValue}
        data-testid="firstValue"
        onChange={(e) => dispatch({type: actionTypes.SET_FIRST_OPERATION_VALUE, payload: Number(e.target.value)})}
      />
      <select
        data-testid="select"
        value={state.operator}
        onChange={(e) => dispatch({type: actionTypes.SET_OPERATOR, payload: e.target.value})}
      >
        {Object.values(OPERATORS).map((operand) => (
          <option data-testid="select-option" value={operand} key={operand}>
            {operand}
          </option>
        ))}
      </select>
      <input
        type="number"
        value={state.secondOperationValue}
        data-testid="secondValue"
        onChange={(e) => dispatch({type: actionTypes.SET_SECOND_OPERATION_VALUE, payload: Number(e.target.value)})}
      />
      <button data-testid="submit" onClick={() => dispatch({ type: state.operator })}>
        Run
      </button>
    </div>
  );
};
