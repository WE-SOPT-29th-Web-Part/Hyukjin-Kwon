import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Tag, ImageWrapper } from 'components/common';
import { useNavigate } from 'react-router-dom';

function Article({ articleInfo }) {
  const navigator = useNavigate();
  const {
    title, summary = '', tags = [], date = '', thumbnail = '', id,
  } = articleInfo;

  const onClickArticle = () => {
    navigator(`/article/${id}`);
  };

  return (
    <StyledArticle onClick={onClickArticle}>
      {thumbnail && (
        <ImageWrapper ratio={45}>
          <img src={thumbnail} alt="article-thumbnail" />
        </ImageWrapper>
      )}
      <Title>{title}</Title>
      <Summary>{summary}</Summary>
      <TagList>
        {tags.length > 0 && tags.map((tag) => <Tag key={`${title}_${tag}`}>{tag}</Tag>)}
      </TagList>
      <Date>{date}</Date>
    </StyledArticle>
  );
}

const StyledArticle = styled.article`
  position: relative;
  /* width: 800px; */
  width: fit-content;
  display: flex;
  flex-direction: column;

  padding-bottom: 3rem;
  border-bottom: 2px solid lightgray;

  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
`;

const Title = styled.h2`
  margin: 0;
`;

const Summary = styled.p`
  margin: 0;
`;

const TagList = styled.div`
  display: flex;
  gap: 2rem;

  margin: 1rem 0;
`;

const Date = styled.span`
  color: darkgray;
  font-size: 0.9rem;
`;

Article.propTypes = {
  articleInfo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    summary: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    date: PropTypes.string,
    thumbnail: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
};

export default Article;
