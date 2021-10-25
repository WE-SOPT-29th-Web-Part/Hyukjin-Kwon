import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

function CalcInput(props) {
  const {
    yearInput, monthInput, dayInput,
  } = props;

  const { setValue: setYear, ...restYearInput } = yearInput;
  const { setValue: setMonth, ...restMonthInput } = monthInput;
  const { setValue: setDay, ...restDayInput } = dayInput;

  const setToday = () => {
    setYear(new Date().getFullYear());
    setMonth(new Date().getMonth() + 1);
    setDay(new Date().getDate());
  };

  return (
    <div className="calcInput">
      <div className="calcInput__inputWrapper">
        <input type="text" {...restYearInput} />
        <span>년</span>
        <input type="text" {...restMonthInput} />
        <span>월</span>
        <input type="text" {...restDayInput} />
        <span>일을 기준으로 계산해주세요.</span>

      </div>

      <button type="button" className="calcInput__todayBtn" onClick={setToday}>
        오늘을 기준으로 계산할게요.
      </button>
    </div>
  );
}

const inputPropTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  setValue: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

CalcInput.propTypes = {
  yearInput: PropTypes.shape(
    inputPropTypes,
  ).isRequired,
  monthInput: PropTypes.shape(
    inputPropTypes,
  ).isRequired,
  dayInput: PropTypes.shape(
    inputPropTypes,
  ).isRequired,
};

export default CalcInput;
