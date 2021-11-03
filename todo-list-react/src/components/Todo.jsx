import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import trashCan from '../assets/icon/trash-can.svg';

function Todo({ isLeft }) {
  return (
    <StyledTodo isLeft={isLeft}>
      <h2>오늘 할 일</h2>
      <TodoItems className="todos__items">
        <TodoItem className="todos__item">
          <div className="todos__btn-wrapper">
            <span>HTML 배우기</span>
            <button type="button" className="todos__remove-btn">
              <img src={trashCan} alt="remove-btn" />
            </button>
          </div>
        </TodoItem>
        <TodoItem className="todos__item">
          <div className="todos__btn-wrapper">
            <span>CSS 배우기</span>
            <button type="button" className="todos__remove-btn">
              <img src={trashCan} alt="remove-btn" />
            </button>
          </div>
        </TodoItem>
      </TodoItems>
      <AddTodo className="todos__add-item">
        <input type="text" placeholder="TODO를 추가해주세요." />
        <button type="button" className="todos__add-btn">+</button>
      </AddTodo>
    </StyledTodo>
  );
}

Todo.propTypes = {
  isLeft: PropTypes.bool,
};

Todo.defaultProps = {
  isLeft: false,
};

const StyledTodo = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: rgba(216, 216, 216, 0.3);
  transition: all 300ms ease-in;

  ${(props) => (props.isLeft ? 'border-right: 1px solid lightgray;' : '')} 

  &.extended {
    transition: all 300ms ease-in;
    width: 0;
    visibility: hidden;
  }
`;

const TodoItems = styled.ul`
  flex-grow: 1;
`;

const TodoItem = styled.li`
  border-bottom: 1px solid lightgray;
  padding-bottom: 5px;
  margin: 10px;

  & .todos__btn-wrapper {
    display: flex;
    justify-content: space-between;
    height: 30px;
    line-height: 30px;
  }
`;

const AddTodo = styled.div`
  display: flex;
  flex-direction: column;

  & > button {
    font-size: 1.5rem;
  }
`;

export default Todo;
