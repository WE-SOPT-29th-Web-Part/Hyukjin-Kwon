import styled from 'styled-components';

import Navbar from 'components/Navbar';
import UserBoard from 'components/UserBoard';

function MainPage() {
  return (
    <Container>
      <Navbar />
      <UserBoard />
    </Container>
  );
}

const Container = styled.main`
  width: 1280px;
  height: 100%;

  margin: 0 auto;
`;

export default MainPage;
