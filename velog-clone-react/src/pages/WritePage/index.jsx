/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Delimiter, Tag } from 'components/common';
import Modal from 'components/Modal';
import { postArticle } from 'core/api';
import useInput from 'core/useInput';
import { BsArrowLeftShort } from 'react-icons/bs';

const summaryValidate = {
  warnText: '150자 이하만 입력 가능합니다.',
  validateRegex: /^.{0,150}$/s,
};

const imageExts = '(png|svg|gif|jpg|jpeg)';
const imageExtRegex = new RegExp(`[.]${imageExts}$`);

const encodeFileToBase64 = (fileBlob) => {
  const reader = new FileReader();
  reader.readAsDataURL(fileBlob);
  return new Promise((resolve) => {
    reader.onload = () => resolve(reader.result);
  });
};

function WritePage() {
  const navigator = useNavigate();

  const titleInput = useInput();
  const tagInput = useInput();
  const descInput = useInput();
  const [fileInput, setFileInput] = useState();
  const handleFile = (e) => setFileInput(e.target.files[0]);

  const { validInfo, ...summary } = useInput(summaryValidate);
  const { isValid, warnText: WarnText } = validInfo;

  const [tagList, setTagList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isDuplicateTag = (needCheckTag) => new Set(tagList).has(needCheckTag);
  const isAllInputFilled = () => titleInput.value && descInput.value;

  const addTag = (e) => {
    e.preventDefault();
    if (typeof tagInput.value === 'string' && tagInput.value) {
      const targetTag = tagInput.value.trim();
      if (!isDuplicateTag(targetTag)) setTagList([...tagList, tagInput.value.trim()]);
      tagInput.initialize();
    }
  };
  const removeTag = (targetTag) => setTagList(tagList.filter((tag) => tag !== targetTag));
  const publishArticle = async () => {
    if (!validInfo.isValid) return;
    if (summary.value && isAllInputFilled()) {
      let articleInfo = {
        title: titleInput.value,
        summary: summary.value,
        tags: tagList,
      };

      if (fileInput) {
        const encodedThumbnail = await encodeFileToBase64(fileInput);
        articleInfo = { ...articleInfo, thumbnail: encodedThumbnail };
      }
      await postArticle(articleInfo);
      navigator('/');
    }
  };

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

      <SummaryInput {...descInput} placeholder="당신의 이야기...가 제법,, 궁금해요..." />

      <Footer>
        <Link to="/">
          <BsArrowLeftShort />
          <span>나가기</span>
        </Link>
        <ButtonWrapper>
          <GrayButton>임시저장</GrayButton>
          <GreenButton disabled={!isAllInputFilled()} onClick={() => setIsModalOpen(true)}>
            출간하기
          </GreenButton>
        </ButtonWrapper>
      </Footer>

      <Modal isOpen={isModalOpen}>
        <ModalContent>
          <h3>포스트 미리보기</h3>
          <ThumbnailInput
            type="file"
            onChange={(e) => {
              if (e.target.files[0].name.match(imageExtRegex)) handleFile(e);
              else e.target.files = null;
            }}
          />
          <Wrapper>
            <SummaryInput {...summary} placeholder="당신의 포스트를 짧게 소개해주세요. (150자 이하)" />
            {!isValid && <WarnText />}
          </Wrapper>
          <ButtonWrapper>
            <GrayButton onClick={() => setIsModalOpen(false)}>취소</GrayButton>
            <GreenButton disabled={!validInfo.isValid} onClick={publishArticle}>출간하기</GreenButton>
          </ButtonWrapper>
        </ModalContent>
      </Modal>
    </Container>
  );
}

const Container = styled.main`
  width: 50%;
  padding: 2rem;
  height: calc(100vh - 4rem);
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
  border: none;
  resize: none;
  outline: none;

  font-size: 1.3rem;
  padding-top: 2rem;

  -ms-overflow-style:none;
  &::-webkit-scrollbar { 
    display:none;
  }
`;

const ThumbnailInput = styled.input`
  text-align: center;
  width: 100%;
  background-color: lightgray;
  border-radius: 4px;
  padding: 0.3rem;
`;

const Wrapper = styled.div`
  margin-top: 3%;
  position: relative;
  flex: 1;

  width: 100%;
`;

const Footer = styled.footer`
  width: 50%;
  position: fixed;
  z-index: 5;
  bottom: 0;
  left: 0;
  padding: 1rem 2%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: white;

  box-shadow: 3px 3px 5px 3px lightgray;

  & > a:hover {
    transform: scale(1.3);
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const BasicButton = styled.button`
  display: flex;
  align-items: center;

  border: none;
  border-radius: 4px;
  outline: 0;
  background-color: transparent;
  font-size: 1.2rem;

  &:hover {
    transform: scale(1.1);
  }
`;

const GrayButton = styled(BasicButton)`
  padding: 0.5rem 1rem;
  background-color: #e3e3e3;
  &:hover {
    opacity: 0.6;
    transform: none;
  }
`;

const GreenButton = styled(BasicButton)`
  padding: 0.5rem 1rem;
  background-color: rgb(18, 184, 134);
  color: white;
  &:hover {
    opacity: 0.6;
    transform: none;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 3%;
  border-radius: 18px;
  box-shadow: 5px 5px 16px 5px lightgray;

  width: 40%;
  height: 60%;

  background-color: white;
`;

export default WritePage;
