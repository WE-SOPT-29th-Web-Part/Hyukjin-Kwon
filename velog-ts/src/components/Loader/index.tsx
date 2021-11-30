import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FaSpinner } from 'react-icons/fa';

interface ILoader {
  customWidth: string;
}

function Loader({ width }: { width: string }) {
  return (
    <StyledLoader customWidth={width}>
      <FaSpinner />
    </StyledLoader>
  );
}

const StyledLoader = styled.div<ILoader>`
  margin: auto;
  & > svg {
    animation: rotateINF infinite 1s linear;

    @keyframes rotateINF {
      0% {
        transform: rotate(0deg);
      }

      100% {
        transform: rotate(360deg);
      }
    }

    width: ${(props) => props.customWidth};
    height: ${(props) => props.customWidth};
  }
`;

Loader.propTypes = {
  width: PropTypes.string,
};

Loader.defaultProps = {
  width: '2rem',
};

export default Loader;
