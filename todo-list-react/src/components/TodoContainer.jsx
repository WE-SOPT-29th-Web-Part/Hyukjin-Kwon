import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Todo from './Todo';

function TodosContainer({ hiddenSection }) {
  return (
    <StyledTodos>
      <Todo isLeft hiddenSection={hiddenSection === 'right' ? hiddenSection : ''} />
      <Todo hiddenSection={hiddenSection === 'left' ? hiddenSection : ''} />
    </StyledTodos>
  );
}

const StyledTodos = styled.main`
  text-align: center;

  display: flex;
  flex: 1;
`;

TodosContainer.propTypes = {
  hiddenSection: PropTypes.oneOf(['left', 'right', '']),
};
TodosContainer.defaultProps = {
  hiddenSection: '',
};

export default TodosContainer;
