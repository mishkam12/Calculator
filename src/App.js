import { useState } from 'react';

function CalculatorApp() {
  const [calc, setCalc] = useState(""); // State to store current calculation
  const [result, setResult] = useState(""); // State to store the result of the calculation

  const operators = ["/", "*", "+", "-", "."]; // List of operators

  const updateCalculations = digit => {
    // Prevent multiple leading zeros
    if (digit === "0" && calc === "0") {
      return;   
    }

    // Prevent multiple decimal points in a single number
    if (digit === "." && calc.split(/[+\-*/]/).slice(-1)[0].includes(".")) {
      return;
    }

    // Prevent multiple operators in a row, allow a minus after another operator
    if (operators.includes(digit) && calc !== "" && operators.includes(calc.slice(-1))) {
      if (digit === "-") {
        setCalc(calc + digit);
      } else if (operators.includes(calc.slice(-2, -1))) {
        if (digit !== "-") {
          setCalc(calc.slice(0, -2) + digit);
        } else {
          setCalc(calc.slice(0, -1) + digit);
        }
      } else {
        setCalc(calc.slice(0, -1) + digit);
      }
      return;
    }

    setCalc((prevCalc) => {
      const updatedCalc = prevCalc + digit;
      
      if (!operators.includes(digit)) {
        try { 
          setResult(eval(calc + digit).toString()); // Evaluate the expression and update the result
        } catch (err) {
          setResult("ERR");
        }
      } else {
        setResult(updatedCalc); // Update result for operator inputs
      }

      return updatedCalc;
    });
  }

  // Function to calculate the final result
  const calculate = () => {
    try {
      setCalc(eval(calc).toString()); 
    } catch (err) {
      setResult("ERR");
    }
  }

  // Function to delete the last digit and update result
  const deleteDigit = () => {
    if (calc === "") {
      return;
    }
    setCalc(calc.slice(0, -1));
    setResult(calc.slice(0, -1) || "0");
  }

  // Function to clear the calculator
  const clearCalculator = () => {
    setCalc("");
    setResult("0"); 
  }

  return (
    <div className="calculator">
      <div id="display-container">
        <div id="display">{calc || "0"}</div>
        <div id="result">{result}</div>
      </div>
      <button onClick={clearCalculator} id="clear">AC</button>
      <button onClick={deleteDigit} id="delete">DEL</button>
      <button onClick={() => updateCalculations('/')} id="divide">/</button>
      <button onClick={() => updateCalculations('1')} id="one">1</button>
      <button onClick={() => updateCalculations('2')} id="two">2</button>
      <button onClick={() => updateCalculations('3')} id="three">3</button>
      <button onClick={() => updateCalculations('*')} id="multiply">*</button>
      <button onClick={() => updateCalculations('4')} id="four">4</button>
      <button onClick={() => updateCalculations('5')} id="five">5</button>
      <button onClick={() => updateCalculations('6')} id="six">6</button>
      <button onClick={() => updateCalculations('+')} id="add">+</button>
      <button onClick={() => updateCalculations('7')} id="seven">7</button>
      <button onClick={() => updateCalculations('8')} id="eight">8</button>
      <button onClick={() => updateCalculations('9')} id="nine">9</button>
      <button onClick={() => updateCalculations('-')} id="subtract">-</button>
      <button onClick={() => updateCalculations('.')} id="decimal">.</button>
      <button onClick={() => updateCalculations('0')} id="zero">0</button>
      <button onClick={calculate} id="equals">=</button>
    </div>
  );
}

export default CalculatorApp;