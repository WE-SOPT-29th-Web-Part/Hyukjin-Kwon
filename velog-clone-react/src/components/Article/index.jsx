import styled from 'styled-components';

function Article() {
  return (
    <StyledArticle>
      <Title>제목</Title>
      <Summary>서머리</Summary>
      <TagList>
        <Tag>1</Tag>
        <Tag>2</Tag>
        <Tag>3</Tag>
        <Tag>4</Tag>
      </TagList>
      <Date>2021년 10월 30일</Date>
    </StyledArticle>
  );
}

const StyledArticle = styled.article`
  width: 800px;
  display: flex;
  flex-direction: column;
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

const Tag = styled.span`
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: rgb(241, 243, 245);
  color: rgb(18, 184, 134);
  border-radius: 16px;
`;

const Date = styled.span`
  color: darkgray;
  font-size: 0.9rem;
`;

export default Article;
