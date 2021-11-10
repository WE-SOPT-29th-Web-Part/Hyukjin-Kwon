/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import styled from 'styled-components';
import { Delimiter, Tag } from 'components/common';
import useInput from 'core/useInput';

const summaryValidate = {
  warnText: '150자 이하만 입력 가능합니다.',
  validateRegex: /^.{0,150}$/s,
};

function WritePage() {
  const titleInput = useInput();
  const tagInput = useInput();
  const { validInfo, ...summary } = useInput(summaryValidate);
  const { isValid, warnText: WarnText } = validInfo;
  const [tagList, setTagList] = useState([]);

  const isDuplicateTag = (needCheckTag) => new Set(tagList).has(needCheckTag);

  const addTag = (e) => {
    e.preventDefault();
    if (typeof tagInput.value === 'string' && tagInput.value) {
      const targetTag = tagInput.value.trim();
      if (!isDuplicateTag(targetTag)) setTagList([...tagList, tagInput.value.trim()]);
      tagInput.initialize();
    }
  };

  const removeTag = (targetTag) => setTagList(tagList.filter((tag) => tag !== targetTag));

  return (
    <Container>
      <TitleInput type="text" placeholder="제목을 입력하세요." {...titleInput} />
      <Delimiter width="10%" height="5px" color="black" />
      <TagList onSubmit={addTag}>
        {tagList.map((tag) => (
          <Tag onClick={() => removeTag(tag)} key={tag}>{tag}</Tag>
        ))}
        <TagInput type="text" {...tagInput} placeholder="태그를 입력하세요." />
      </TagList>
      <Wrapper>
        <SummaryInput {...summary} placeholder="Show me what you got (150자 이하)" />
        {!isValid && <WarnText />}
      </Wrapper>
    </Container>
  );
}

const Container = styled.main`
  width: 50%;
  height: 100vh;
  padding: 2%;
  background-color: white;

  display: flex;
  flex-direction: column;

`;

const TitleInput = styled.input`
  font-size: 2.5rem;
  font-weight: bolder;

  &::placeholder {
    color: darkgray;
  }
`;

const TagList = styled.form`
  display: flex;
  gap: 0.5rem;
`;

const TagInput = styled.input`
  font-size: 1.3rem;
  order: 1;
`;

const SummaryInput = styled.textarea`
  width: 100%;
  height: 100%;
  position: relative;
  border: none;
  resize: none;
  outline: none;

  font-size: 1.3rem;
  padding-top: 2rem;
`;

const Wrapper = styled.div`
  margin-top: 3%;
  position: relative;
  flex: 1;
`;

export default WritePage;
