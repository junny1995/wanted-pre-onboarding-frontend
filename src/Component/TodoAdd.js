import axios from "axios";
import { useState } from "react";

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
    <>
      <input
        type="text"
        onChange={onChangeTodo}
        onKeyDown={handlerOnKeyDown}
        placeholder="할일을 작성해주세요!"
        data-testid="new-todo-input"
      />
      <button onClick={PostTodoHandler} data-testid="new-todo-add-button">
        추가
      </button>
    </>
  );
}

export default TodoAdd;
