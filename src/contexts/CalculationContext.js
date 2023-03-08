import React, { createContext, useState } from 'react';

export const CalculationContext = createContext();

const CalculationContextProvider = (props) => {
  const [ calc, setCalc ] = useState({
    sign: '',
    num: 0,
    result: 0,
  });
  return (
    <CalculationContext.Provider value={{calc, setCalc}}>
      {props.children}
    </CalculationContext.Provider>
  );
}
 
export default CalculationContextProvider;
