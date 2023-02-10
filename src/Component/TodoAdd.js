import axios from "axios";
import { useState } from "react";
import styled from "styled-components";

function TodoAdd(props) {
  const { change } = props;
  // env URL
  const URL = process.env.REACT_APP_API_URL;

  // Todo 저장 state, onChange
  const [addtodo, setAddTodo] = useState("");

  const onChangeTodo = (e) => {
    const addTodoCurrent = e.target.value;
    setAddTodo(addTodoCurrent);
  };

  // Post Todo Axios
  const PostTodoHandler = async () => {
    try {
      await axios.post(
        `${URL}/todos`,
        { todo: addtodo },
        {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("token"),
          },
        }
      );
      change();
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  // 엔터키 입력 이벤트
  const handlerOnKeyDown = (e) => {
    if (e.key === "Enter") {
      PostTodoHandler();
    }
  };

  return (
    <section className="pb-3 text-center container">
      <Input
        type="text"
        className="bg-secondary"
        onChange={onChangeTodo}
        onKeyDown={handlerOnKeyDown}
        placeholder="할일을 작성해주세요!"
        data-testid="new-todo-input"
      />
      <button
        className="btn btn-primary my-2 p-3"
        onClick={PostTodoHandler}
        data-testid="new-todo-add-button"
      >
        추가
      </button>
    </section>
  );
}

export default TodoAdd;

// Styled Component
const Input = styled.input`
  height: 50px;
  border-radius: 10px;
  border: none;
  color: white;
  padding-left: 5px;
  margin: 70px 30px 40px 0;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: white;
    opacity: 0.5;
  }
`;
