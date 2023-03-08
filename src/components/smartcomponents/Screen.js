import React, { useContext } from 'react';
import useFitText from 'use-fit-text';

import { CalculationContext } from '../../contexts/CalculationContext';
import "../../index.css";

const Screen = () => {
  const { fontSize, ref } = useFitText();
  const { calc } = useContext(CalculationContext);
  const { num, result } = calc;

  return (
    <div className='screen' ref={ref} style={{ fontSize }}>
      {num ? num : result}
    </div>
  );
}

export default Screen;
