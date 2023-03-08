import React, { useContext } from 'react';
import { CalculationContext } from '../../contexts/CalculationContext';
import "../../index.css";

import {
  CLEAR,
  NEGATE,
  PERCENT_SIGN,
  ADD,
  SUBTRACT,
  DIVIDE,
  MULTIPLY,
  EQUAL_SIGN,
  DECIMAL_SEPARATOR
} from '../../utils/constants';

const Button = ({ className, value }) => {
  const { calc, setCalc } = useContext(CalculationContext);

  const clearClickHandler = () => {
    setCalc({ ...calc, sign: '', num: 0, result: 0 });
  };

  const negateClickHandler = () => {
    const { num, result } = calc;

    setCalc({
      ...calc,
      num: num ? num * -1 : 0,
      result: result ? result * -1 : 0,
      sign: "",
    });
  };

  const percentClickHandler = () => {
    const { num, result } = calc;
    const numValue = num ? parseFloat(num) : 0;
    const resultValue = result ? parseFloat(result) : 0;

    setCalc({
      ...calc,
      num: (numValue / Math.pow(100, 1)),
      result: (resultValue / Math.pow(100, 1)),
      sign: ''
    });
  };

  const equalClickHandler = () => {
    const { num, result, sign } = calc;

    if(sign && num) {
      const math = (a, b, sign_operator) => {
        switch (sign_operator) {
          case ADD: return a + b;
          case SUBTRACT: return a - b;
          case MULTIPLY: return a * b;
          default: return a / b;
        }
      }

      const resultValue = num === '0' && sign === DIVIDE
        ? "Can't divide with 0"
        : math(Number(result), Number(num), sign);

      setCalc({
        ...calc,
        result: resultValue,
        sign: '',
        num: 0
      });
    }
  };

  const operatorClickHandler = (event) => {
    event.preventDefault();
    const operatorSign = event.target.innerHTML;
    const { num, result } = calc;

    setCalc({
      ...calc,
      sign: operatorSign,
      result: !result && num ? num : result,
      num: 0
    });
  };

  const pointClickHandler = () => {
    const { num } = calc;
    const numValue = !num.toString().includes(DECIMAL_SEPARATOR) ? num + DECIMAL_SEPARATOR : num;
    setCalc({
      ...calc,
      num: numValue
    });
  };

  const numberClickHandler = (event) => {
    event.preventDefault();
    const numValue = event.target.innerHTML;
    const { sign, num, result } = calc;

    if (num === 0) { // first digit
      setCalc({
        ...calc,
        num: numValue,
        result: !sign ? 0 : result
      });
    }
    else if (num.length < 16) {
      let evaluateValue = num + numValue;

      if(num === 0 && numValue === '0') {
        evaluateValue = '0';
      }
      else if (num % 1 === 0) {
        Number(num + evaluateValue);
      }

      setCalc({
        ...calc,
        num: evaluateValue,
        result: !sign ? 0 : result
      });
    }
  };

  const determineHandlerFunction = (btnValue) => {
    switch (btnValue) {
      case CLEAR: return clearClickHandler;
      case NEGATE: return negateClickHandler;
      case PERCENT_SIGN: return percentClickHandler;
      case EQUAL_SIGN: return equalClickHandler;
      case ADD:
      case SUBTRACT:
      case MULTIPLY:
      case DIVIDE: return operatorClickHandler;
      case DECIMAL_SEPARATOR: return pointClickHandler;
      default: return numberClickHandler; 
    }
  };

  const onClick = determineHandlerFunction(value);

  return (
    <button
      className={className}
      onClick={onClick}>
      {value}
    </button>
  );
};

export default Button;