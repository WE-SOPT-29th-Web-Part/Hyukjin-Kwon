import React from 'react';
import Delimiter from 'Components/Common/Delimiter';
import useInput from 'Hooks/useInput';
import CalcResult from './CalcResult';
import CalcInput from './CalcInput';

import './index.scss';

function Calculator() {
  const yearInput = useInput(true);
  const monthInput = useInput(true);
  const dayInput = useInput(true);
  return (
    <div className="calc">
      <header className="calc__header">D-day 계산기</header>
      <CalcInput
        yearInput={yearInput}
        monthInput={monthInput}
        dayInput={dayInput}
      />
      <Delimiter color="mediumaquamarine" />
      <CalcResult
        calcType="+"
        year={yearInput.value}
        month={monthInput.value}
        day={dayInput.value}
      />
      <CalcResult
        calcType="-"
        year={yearInput.value}
        month={monthInput.value}
        day={dayInput.value}
      />
      <Delimiter color="mediumaquamarine" />
    </div>
  );
}

export default Calculator;
