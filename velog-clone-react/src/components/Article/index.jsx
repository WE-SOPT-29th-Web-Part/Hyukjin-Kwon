import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Tag } from 'components/common';

function Article({ articleInfo }) {
  const {
    title, summary = '', tags = [], date = '',
  } = articleInfo;

  return (
    <StyledArticle>
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
  width: 800px;
  display: flex;
  flex-direction: column;

  padding-bottom: 3rem;
  border-bottom: 2px solid lightgray;
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
  }).isRequired,
};

export default Article;
