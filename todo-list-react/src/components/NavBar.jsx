import React from 'react';

import styled from 'styled-components';

function NavBar() {
  return (
    <StyledNavbar>
      <button type="button" className="navBar__today">오늘만 보기</button>
      <button type="button" className="navBar__tommorow">내일만 보기</button>
      <button type="button" className="navBar__both">함께 보기</button>
    </StyledNavbar>
  );
}

const StyledNavbar = styled.nav`
  text-align: center;
  margin: 10px;

  & > button {
    border: 0;
    background-color: lightsalmon;

    margin-right: 10px;
  }
`;

export default NavBar;
