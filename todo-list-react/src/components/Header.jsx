import React from 'react';

import styled from 'styled-components';

function Header() {
  return (
    <StyledHeader>
      <h1>To Do List</h1>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  text-align: center;

  background-color: thistle;
  color: white;
`;

export default Header;
