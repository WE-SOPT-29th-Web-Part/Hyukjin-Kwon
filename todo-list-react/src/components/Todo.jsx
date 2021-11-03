import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import trashCan from '../assets/icon/trash-can.svg';

function Todo({ isLeft }) {
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState('');
  const handleTodoValue = (e) => setTodoValue(e.target.value);

  const showTodoList = () => todoList.map((todoElem) => (
    <TodoItem className="todos__item">
      <div className="todos__btn-wrapper">
        <span>{todoElem}</span>
        <button
          type="button"
          className="todos__remove-btn"
          onClick={() => {
            setTodoList(todoList.filter((elem) => elem !== todoElem));
          }}
        >
          <img src={trashCan} alt="remove-btn" />
        </button>
      </div>
    </TodoItem>
  ));

  const isRedundant = (list, target) => new Set(list).has(target);

  const addTodoList = () => {
    if (todoValue && typeof todoValue === 'string' && !isRedundant(todoList, todoValue)) setTodoList([...todoList, todoValue.trim()]);
    setTodoValue('');
  };

  return (
    <StyledTodo isLeft={isLeft}>
      <h2>
        {isLeft ? '오늘 할 일' : '내일 할 일'}
      </h2>
      <TodoItems className="todos__items">
        {showTodoList()}
      </TodoItems>
      <AddTodo className="todos__add-item">
        <input
          type="text"
          value={todoValue}
          onChange={handleTodoValue}
          onKeyPress={(e) => {
            if (e.key === 'Enter') addTodoList();
          }}
          placeholder="TODO를 추가해주세요."
        />
        <button type="button" className="todos__add-btn" onClick={addTodoList}>+</button>
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
