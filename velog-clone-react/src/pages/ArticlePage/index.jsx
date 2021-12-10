import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Navbar from 'components/Navbar';
import UserBoard from 'components/UserBoard';
import Loader from 'components/Loader';
import Article from 'components/Article';
import { api } from 'core/api';

function ArticlePage() {
  const navigator = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [currentArticleData, setCurrentArticleData] = useState();
  const { id } = useParams();

  useEffect(() => {
    async function fetchArticle() {
      setIsLoading(true);
      const { data } = await api.get(`/article/${id}`);
      setCurrentArticleData(data);
      setIsLoading(false);
    }
    fetchArticle();
  }, [id]);

  const onClickDeleteButton = (e) => {
    e.stopPropagation();
    api.delete(`/article/${id}`);
    navigator('/');
  };

  const onClickEditButton = (e) => {
    e.stopPropagation();
    navigator(`/edit/${id}`);
  };

  return (
    <Container>
      <Navbar />
      <UserBoard />
      <ArticleOptions>
        <li>
          <CommonButton onClick={onClickEditButton}>수정</CommonButton>
        </li>
        <li>
          <CommonButton onClick={onClickDeleteButton}>삭제</CommonButton>
        </li>
      </ArticleOptions>
      <ArticleList>
        {isLoading && !currentArticleData && <Loader />}
        {!isLoading && currentArticleData && (
          <Article articleInfo={currentArticleData} />
        )}
      </ArticleList>
    </Container>

  );
}

const Container = styled.main`
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;

const ArticleList = styled.section`
  width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const ArticleOptions = styled.ul` 
  width: 800px;
  display: flex;
  gap: 1rem;
  margin: 5% auto;
`;

const CommonButton = styled.button`
  border: 1px solid black;
  border-radius: 18px;
  color: white;
  background-color: black;
  padding: 0.5rem 1rem;
`;

export default ArticlePage;
