import axios from "axios";
import { useEffect, useState } from "react";
import TodoAdd from "./TodoAdd";
import TodoData from "./TodoData";

function TodoList() {
  // env URL
  const URL = process.env.REACT_APP_API_URL;

  // Todo 배열 저장 State
  const [todoData, setTodoData] = useState([]);

  // Get Todo Axios
  const GetTodoHandler = async () => {
    try {
      const getTodo = await axios.get(`${URL}/todos`, {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("token"),
        },
      });
      setTodoData(getTodo.data);
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  // 페이지 첫 랜더링시 한번만 실행
  useEffect(() => {
    GetTodoHandler();
  }, []);

  return (
    <>
      <TodoAdd change={GetTodoHandler} />
      {todoData.map((el, idx) => {
        return (
          <div key={idx}>
            <TodoData
              key={el.id}
              id={el.id}
              body={el.todo}
              change={GetTodoHandler}
            />
          </div>
        );
      })}
    </>
  );
}

export default TodoList;
