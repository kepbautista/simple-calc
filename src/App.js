import Wrapper from './components/Wrapper';
import Screen from './components/smartcomponents/Screen';
import ButtonBox from './components/ButtonBox';
import Button from './components/smartcomponents/Button';
import CalculationContextProvider from './contexts/CalculationContext';

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
} from './utils/constants';

const buttonValues = [
  [CLEAR, NEGATE, PERCENT_SIGN, DIVIDE],
  [7, 8, 9, MULTIPLY],
  [4, 5, 6, SUBTRACT],
  [1, 2, 3, ADD],
  [0, DECIMAL_SEPARATOR, EQUAL_SIGN]
];

const operator_keys = [DIVIDE, MULTIPLY, SUBTRACT, ADD, EQUAL_SIGN];
const function_keys = [CLEAR, NEGATE, PERCENT_SIGN]

const isItemInArray = (array_list, item) => {
  return array_list.includes(item);
}

const App = () => {
  return (
    <Wrapper>
      <CalculationContextProvider>
        <Screen value='0' />
        <ButtonBox>
          {
            buttonValues.flat().map((btn, i) => {
              let button_type = ''; // default type

              if(isItemInArray(operator_keys, btn)) {
                button_type = 'operator_keys';
              }
              else if (isItemInArray(function_keys, btn)) {
                button_type = 'function_keys';
              }
              else if (btn === 0) {
                button_type = 'zero_key'
              }

              return (
                <Button
                  key={i}
                  className={button_type}
                  value={btn}
                />
              );
            })
          }
        </ButtonBox>
      </CalculationContextProvider>
    </Wrapper>
  );
};

export default App;
