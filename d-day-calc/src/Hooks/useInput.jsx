import { useState } from 'react';
import PropTypes from 'prop-types';

function useInput(withSetter) {
  const [value, setValue] = useState('');
  const handleInputChange = (e) => {
    const target = e.target.value;
    if (typeof target === 'string' && target.match('^([1-9])*$')) setValue(target);
  };

  if (withSetter) { return { value, setValue, onChange: handleInputChange }; }

  return { value, onChange: handleInputChange };
}

useInput.propTypes = {
  withSetter: PropTypes.bool,
};

useInput.defaultProps = {
  withSetter: false,
};

export default useInput;
