import axios from "axios";
import { useState } from "react";

function TodoAdd() {
  // env URL
  const URL = process.env.REACT_APP_API_URL;

  // Todo 저장 state, onChange
  const [addtodo, setAddTodo] = useState("");

  const onChangeTodo = (e) => {
    const addTodoCurrent = e.target.value;
    setAddTodo(addTodoCurrent);
  };

  // Todo Axios
  const TodoAddHandler = async () => {
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
    } catch (e) {
      alert(e.response.data.message);
    }
  };
  return (
    <>
      <div>추가</div>
      <input
        type="text"
        onChange={onChangeTodo}
        placeholder="할일을 작성해주세요!"
        data-testid="new-todo-input"
      />
      <button onClick={TodoAddHandler} data-testid="new-todo-add-button">
        추가
      </button>
    </>
  );
}

export default TodoAdd;
