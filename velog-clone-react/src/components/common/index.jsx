import PropTypes from 'prop-types';
import styled from 'styled-components';

export const Delimiter = styled.hr`
  width: ${(props) => props.width || '100%'};
  height: ${(props) => props.height || 'initial'};
  border: 1px solid ${(props) => props.color || 'rgb(209, 209, 209)'};
  margin: 3% 0;
`;

export const Tag = styled.span`
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: rgb(241, 243, 245);
  color: rgb(18, 184, 134);
  border-radius: 16px;

  &:hover {
    cursor: pointer;
  }
`;

export const ImageWrapper = (props) => {
  const { ratio, children } = props;
  return (
    <StyledWrapper ratio={ratio}>
      {children}
    </StyledWrapper>
  );
};

ImageWrapper.propTypes = {
  ratio: PropTypes.number,
  children: PropTypes.node,
};

ImageWrapper.defaultProps = {
  ratio: 62.5,
  children: null,
};

const StyledWrapper = styled.div`
  position: relative;
  overflow: hidden;
  padding-top: ${({ ratio }) => ratio}%;

  & > img {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 60%;
    height: 100%;
    display: block;
    object-fit: cover;
  }
`;
