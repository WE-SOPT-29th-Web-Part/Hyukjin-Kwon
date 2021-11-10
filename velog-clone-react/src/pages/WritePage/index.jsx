/* eslint-disable react/jsx-props-no-spreading */
import styled from 'styled-components';
import { Delimiter } from 'components/common';
import useInput from 'core/useInput';

const summaryValidate = {
  warnText: '150자 이하만 입력 가능합니다.',
  validateRegex: /^.{0,150}$/s,
};

function WritePage() {
  const title = useInput();
  const tag = useInput();
  const { validInfo, ...summary } = useInput(summaryValidate);
  const { isValid, warnText: WarnText } = validInfo;

  return (
    <Container>
      <TitleInput type="text" placeholder="제목을 입력하세요." {...title} />
      <Delimiter width="10%" height="5px" color="black" />
      <TagInput type="text" {...tag} placeholder="태그를 입력하세요." />
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
const TagInput = styled.input`
  font-size: 1.3rem;
`;
const SummaryInput = styled.textarea`
  width: 100%;
  height: 100%;
  position: relative;
  margin-top: 3%;
  border: none;
  resize: none;
  outline: none;

  font-size: 1.3rem;
`;

const Wrapper = styled.div`
  position: relative;
  flex: 1;
`;

export default WritePage;
