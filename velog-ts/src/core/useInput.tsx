import { ChangeEvent, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { isHTMLInputElement } from 'utils/type-util';

export interface IUseInput {
  value: string;
  onChange: (e: ChangeEvent) => void;
  initialize: () => void;
}

export interface IUseInputWithValidate {
  value: string;
  onChange: (e: ChangeEvent) => void;
  validInfo: IValidInfo;
}

export interface IValidInfo {
  isValid: boolean;
  warnText?: (() => JSX.Element) | null;
}

interface IValidateInfo {
  warnText: string;
  validateRegex: RegExp;
}

function useInput(validate?: IValidateInfo) {
  const [value, setValue] = useState('');
  const [validInfo, setValidInfo] = useState<IValidInfo>({
    isValid: true,
    warnText: null,
  });

  if (!validate) {
    const onChange = (e: ChangeEvent) => {
      if (isHTMLInputElement(e.target)) setValue(e.target.value);
    };
    const initialize = () => setValue('');
    return { value, onChange, initialize };
  }

  const { validateRegex, warnText } = validate;
  const onChange = (e: ChangeEvent) => {
    if (!isHTMLInputElement(e.target)) return;
    setValue(e.target.value);
    const currentText = e.target.value;
    if (typeof currentText === 'string' && currentText.match(validateRegex)) {
      setValidInfo({
        ...validInfo,
        isValid: true,
      });
      setValue(currentText);
    } else {
      setValidInfo({
        isValid: false,
        warnText: () => <StyledWarnText>{warnText}</StyledWarnText>,
      });
    }
  };

  return { value, onChange, validInfo };
}

const StyledWarnText = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  color: red;

  &::before {
    content: '🔥 ';
  }
`;

useInput.propTypes = {
  validate: PropTypes.shape({
    warnText: PropTypes.string,
    validateRegex: PropTypes.string,
  }),
};

useInput.defaultProps = {
  validate: null,
};

export default useInput;
