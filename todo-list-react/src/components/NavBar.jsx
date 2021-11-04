import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function NavBar({ setExpandSection }) {
  return (
    <StyledNavbar>
      <button type="button" className="navBar__today" onClick={() => setExpandSection('left')}>오늘만 보기</button>
      <button type="button" className="navBar__tommorow" onClick={() => setExpandSection('right')}>내일만 보기</button>
      <button type="button" className="navBar__both" onClick={() => setExpandSection('')}>함께 보기</button>
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

NavBar.propTypes = {
  setExpandSection: PropTypes.func.isRequired,
};

export default NavBar;
