import styled from 'styled-components';

import Navbar from 'components/Navbar';

function MainPage() {
  return (
    <Container>
      <Navbar />
    </Container>
  );
}

const Container = styled.main`
  width: 1280px;
  height: 100%;
`;

export default MainPage;
