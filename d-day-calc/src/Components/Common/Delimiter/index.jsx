import React from 'react';
import './index.scss';

import PropTypes from 'prop-types';

function Delimiter(props) {
  const { color } = props;
  return <hr className="delimiter" style={{ border: `1px solid ${color}` }} />;
}

Delimiter.propTypes = {
  color: PropTypes.string,
};

Delimiter.defaultProps = {
  color: 'black',
};

export default Delimiter;
