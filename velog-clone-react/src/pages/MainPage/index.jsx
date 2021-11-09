import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Navbar from 'components/Navbar';
import UserBoard from 'components/UserBoard';
import Article from 'components/Article';

const ROOT = '/';
const SERIES = '/series';

function MainPage() {
  const [currentActive, setCurrentActive] = useState(ROOT);
  const location = useLocation();
  const navigator = useNavigate();

  const getNextActive = (current) => (current === ROOT ? SERIES : ROOT);
  const isActiveWithSeries = () => currentActive === SERIES;

  const handleClickArticleType = (nowActive) => {
    const nextActive = getNextActive(nowActive);

    return () => {
      setCurrentActive(nextActive);
      navigator(nextActive);
    };
  };

  useEffect(() => {
    if (location && location.pathname !== currentActive) setCurrentActive(location.pathname);
  }, [currentActive, location]);

  return (
    <Container>
      <Navbar />
      <UserBoard />
      <TypeSelector>
        <ArticleType
          isActive={!isActiveWithSeries()}
          onClick={handleClickArticleType(SERIES)}
        >
          글
        </ArticleType>
        <ArticleType
          isActive={isActiveWithSeries()}
          onClick={handleClickArticleType(ROOT)}
        >
          시리즈
        </ArticleType>
      </TypeSelector>
      <ArticleList>
        <Article />
        <Article />
        <Article />
      </ArticleList>
    </Container>

  );
}

const Container = styled.main`
  width: 1280px;
  height: 100%;

  margin: 0 auto;
  `;

const TypeSelector = styled.div`
  width: 800px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

const ArticleType = styled.button`
  padding: 1rem 2rem;
  background-color: transparent;

  font-weight: 500;
  font-size: 1.2rem;
  
  ${(props) => (props.isActive ? `
    color: rgb(18, 184, 134);
    border-bottom: 1px solid rgb(18, 184, 134);
  ` : '')}
`;

const ArticleList = styled.section`
  width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

export default MainPage;