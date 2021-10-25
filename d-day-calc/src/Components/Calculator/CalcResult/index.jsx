import React from 'react';
import PropTypes from 'prop-types';

import useInput from 'Hooks/useInput';

import './index.scss';

function CalcResult(props) {
  const {
    calcType, year, month, day,
  } = props;

  const { value: plusVal, onChange: onChangePlusVal } = useInput();
  const { value: minusVal, onChange: onChangeMinusVal } = useInput();

  const getCalcDate = () => {
    if (calcType === '+' && !plusVal) return '';
    if (calcType === '-' && !minusVal) return '';
    const newDate = new Date();
    newDate.setFullYear(year);
    newDate.setMonth(month - 1);
    if (calcType === '+') newDate.setDate(day + Number(plusVal) - 1);
    else newDate.setDate(day - Number(minusVal));

    return newDate
      .toLocaleDateString('ko-kr')
      .replace('.', '년')
      .replace('.', '월')
      .replace('.', '일');
  };

  return (
    <div className="calcResult">
      <div className="wrapper">
        {calcType === '+' && (
          <>
            <input type="text" value={plusVal} onChange={onChangePlusVal} />
            일째 되는 날은?
          </>
        )}
        {calcType === '-' && (
          <>
            D-
            <input type="text" value={minusVal} onChange={onChangeMinusVal} />
            는?
          </>
        )}
      </div>
      <span className="calcResult__result">{getCalcDate()}</span>
    </div>
  );
}

CalcResult.propTypes = {
  calcType: PropTypes.oneOf(['+', '-']).isRequired,
  year: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  month: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  day: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

CalcResult.defaultProps = {
  year: '',
  month: '',
  day: '',
};

export default CalcResult;
