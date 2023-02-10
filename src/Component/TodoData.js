import axios from "axios";
import { useState } from "react";

function TodoData(props) {
  const { id, body, change } = props;

  // env URL
  const URL = process.env.REACT_APP_API_URL;

  // input State
  const [showinput, setShowinput] = useState(false);
  const [updateinput, setUpdateinput] = useState("");

  // input boolean Handler
  const InputTrueHandler = () => {
    setShowinput(true);
  };
  const InputFalseHandler = () => {
    setShowinput(false);
  };

  // input value onChange
  const UpdateInput = (e) => {
    const inputCurrent = e.target.value;
    setUpdateinput(inputCurrent);
  };

  // Update Todo Axios
  const UpdateTodoHandler = async () => {
    try {
      await axios.put(
        `${URL}/todos/${id}`,
        { todo: updateinput, isCompleted: false },
        {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("token"),
          },
        }
      );
      InputFalseHandler();
      change();
      console.log("수정성공");
    } catch (e) {
      console.log(e);
    }
  };

  // Delete Todo Axios
  const DeleteTodoHandler = async () => {
    try {
      await axios.delete(`${URL}/todos/${id}`, {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("token"),
        },
      });
      console.log("삭제성공");
      change();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <ul>
        <li>
          {showinput ? (
            <>
              <input
                type="text"
                onChange={UpdateInput}
                placeholder="수정할 할일을 적어주세요"
              />
              <button onClick={UpdateTodoHandler} data-testid="submit-button">
                제출
              </button>
              <button onClick={InputFalseHandler} data-testid="cancel-button">
                취소
              </button>
            </>
          ) : (
            <>
              <span>{body}</span>{" "}
              <button onClick={InputTrueHandler} data-testid="modify-button">
                수정
              </button>
              <button onClick={DeleteTodoHandler} data-testid="delete-button">
                삭제
              </button>
            </>
          )}
        </li>
      </ul>
    </div>
  );
}

export default TodoData;
