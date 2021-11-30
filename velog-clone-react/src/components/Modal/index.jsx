import styled from 'styled-components';
import PropTypes from 'prop-types';

function Modal(props) {
  const { isOpen, children } = props;

  return (
    <>
      {isOpen && (
        <StyledModal>
          {children}
        </StyledModal>
      )}
    </>
  );
}

const StyledModal = styled.div`
  position: absolute;
  z-index: 9999;
  width: 100%;
  height: 100%;

  left: 0;
  top: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(248, 249, 250, 255);
`;

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Modal;
