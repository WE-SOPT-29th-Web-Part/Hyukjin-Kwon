import styled from 'styled-components';

import megun from 'assets/img/megun.jpeg';
import github from 'assets/icon/github.svg';
import home from 'assets/icon/home.svg';
import mail from 'assets/icon/mail.svg';

function UserBoard() {
  return (
    <StyledUserBoard>
      <UserWrapper>
        <img src={megun} alt="user-thumbnail" />
        <IntroWrapper>
          <h2>혁자친구</h2>
          <p>안녕하세요. 혁자친구입니다.</p>
        </IntroWrapper>
      </UserWrapper>

      <Delimiter />

      <IconGroup>
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/KimKwon">
          <img src={github} alt="github-link" />
        </a>
        <a target="_blank" rel="noopener noreferrer" href="https://nukw0n-dev.tistory.com/">
          <img src={home} alt="home-link" />
        </a>
        <a href="mailto:khj9709@icloud.com">
          <img src={mail} alt="mail-link" />
        </a>
      </IconGroup>
    </StyledUserBoard>
  );
}

const StyledUserBoard = styled.div`
  width: 800px;
  margin: 5% auto;
  
  display: flex;
  flex-direction: column;
`;

const UserWrapper = styled.div`
  display: flex;

  & > img {
    width: 15%;
    height: 15%;
    border-radius: 50%;
    overflow: hidden;

    margin-right: 3%;
  }
`;

const IntroWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  & > h2, & p {
    margin: 0;
  }
`;

const Delimiter = styled.hr`
  width: 100%;
  border: 1px solid rgb(209, 209, 209);
  margin: 3% 0;
`;

const IconGroup = styled.div`
  display: flex;
  gap: 1rem;

  & > a:hover {
    img {
        filter: brightness(1) invert(1);
    }
  }
`;

export default UserBoard;
