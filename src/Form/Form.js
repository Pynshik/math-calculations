import React from "react";
import { useState } from "react";

import styles from "./Form.module.scss";

const OPERANDS = ["+", "/", "%", ">"];

export default function Form({ changeResults }) {
  const [firstValue, setFirstValue] = useState(0);
  const [secondValue, setSecondValue] = useState(0);
  const [operator, setOperator] = useState("+");

  const handleSubmit = () => {
    let result;

    switch (operator) {
      case "+":
        result = Number(firstValue) + Number(secondValue);
        break;
      case "/":
        result = Number(firstValue) / Number(secondValue);
        break;
      case "%":
        result = Number(firstValue) % Number(secondValue);
        break;
      case ">":
        result =
          Number(firstValue) > Number(secondValue)
            ? Number(firstValue)
            : Number(secondValue);
        break;
      default:
        break;
    }

    const resultString =
      operator !== ">"
        ? `${firstValue} ${operator} ${secondValue} = ${result}`
        : `the largest of ${firstValue} and ${secondValue} is ${result}`;

    changeResults(resultString);
    clearForm();
  };

  const clearForm = () => {
    setFirstValue(0);
    setSecondValue(0);
    setOperator("+");
  };

  return (
    <div className={styles['form-container']}>
      <input
        type="number"
        value={firstValue}
        data-testid="firstValue"
        onChange={(e) => setFirstValue(e.target.value)}
      />
      <select
        data-testid="select"
        value={operator}
        onChange={(e) => setOperator(e.target.value)}
      >
        {OPERANDS.map((operand) => (
          <option data-testid="select-option" value={operand} key={operand}>
            {operand}
          </option>
        ))}
      </select>
      <input
        type="number"
        value={secondValue}
        data-testid="secondValue"
        onChange={(e) => setSecondValue(e.target.value)}
      />
      <button data-testid="inputSubmit" onClick={handleSubmit}>
        Run
      </button>
    </div>
  );
};
