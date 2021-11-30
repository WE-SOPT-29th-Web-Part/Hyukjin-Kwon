import React from 'react';

import styled from 'styled-components';

function Footer() {
  return (
    <StyledFooter>
      SOPT 29th Web Part
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  background-color: thistle;
  color: white;

  text-align: center;
  height: 50px;
  line-height: 50px;
`;

export default Footer;
