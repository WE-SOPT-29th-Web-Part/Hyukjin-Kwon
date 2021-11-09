import styled from 'styled-components';
import { Link } from 'react-router-dom';
import megun from 'assets/img/megun.jpeg';

function Navbar() {
  return (
    <StyledNavbar>
      <Link to="/">
        <Logo>jjinny.log</Logo>
      </Link>
      <ButtongGroup>
        <SearchButton>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000" className="dark-fill-icon">
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path
              d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
            />
          </svg>
        </SearchButton>
        <Link to="/write">
          <NewPostButton>
            새 글 작성
          </NewPostButton>
        </Link>
        <UserMenu>
          <img src={megun} alt="authorThumbnail" />
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
            className="dark-fill-icon"
          >
            <path d="M7 10l5 5 5-5z" />
          </svg>
        </UserMenu>
      </ButtongGroup>
    </StyledNavbar>
  );
}

const StyledNavbar = styled.header`
  display: flex;
  justify-content: space-between;
  padding-top: 1%;
`;

const Logo = styled.span`
  font-family: Roboto;
  font-weight: 500;
  font-size: 1.2rem;
`;

const ButtongGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SearchButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0;

  background-color: transparent;
`;

const NewPostButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 14px;
  border: 1px solid black;
  background-color: white;
  min-width: fit-content;
  transition: background-color ease 300ms, color ease 300ms;


  &:hover {
    background-color: black;
    color: white;
    transition: background-color ease 300ms, color ease 300ms;
  }
`;

const UserMenu = styled.div`
  display: flex;
  align-items: center;

  & > img {
    border-radius: 50%;
  overflow: hidden;

  width: 2.5rem;
  height: 2.5rem;
  }

  & > svg {
    width: 1.3rem;
  height: 1.3rem;
  }

  &:hover {
    cursor: pointer;
  }
`;

export default Navbar;
