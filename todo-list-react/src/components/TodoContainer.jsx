import React from 'react';
import styled from 'styled-components';

import Todo from './Todo';

function TodosContainer() {
  return (
    <StyledTodos>
      <Todo isLeft />
      <Todo />
    </StyledTodos>
  );
}

const StyledTodos = styled.main`
  text-align: center;

  display: flex;
  flex: 1;
`;

export default TodosContainer;
