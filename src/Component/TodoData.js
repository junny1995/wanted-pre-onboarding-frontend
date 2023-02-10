import axios from "axios";
import { useState } from "react";
import styled from "styled-components";

function TodoData(props) {
  const { id, body, change } = props;

  // env URL
  const URL = process.env.REACT_APP_API_URL;

  // input State
  const [showinput, setShowinput] = useState(false);
  const [updateinput, setUpdateinput] = useState("");
  const [isCompleted, setisCompleted] = useState(false);

  // input boolean Handler
  const InputTrueHandler = () => {
    setShowinput(true);
  };
  const InputFalseHandler = () => {
    setShowinput(false);
  };

  const UpdateInputHandler = (e) => {
    const inputCurrent = e.target.value;
    setUpdateinput(inputCurrent);
  };

  const CompleteinputHandler = () => {
    setisCompleted(!isCompleted);
  };

  // Update Todo Axios
  const UpdateTodoHandler = async () => {
    try {
      await axios.put(
        `${URL}/todos/${id}`,
        { todo: updateinput, isCompleted },
        {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("token"),
          },
        }
      );
      setisCompleted(false);
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

  // 엔터키 입력 이벤트
  const handlerOnKeyDown = (e) => {
    if (e.key === "Enter") {
      UpdateTodoHandler();
    }
  };

  return (
    <section className="text-center container">
      <div className="row">
        <div className="col-lg-6 mx-auto">
          <li>
            {showinput ? (
              <>
                <Input
                  type="text"
                  className="bg-secondary"
                  onChange={UpdateInputHandler}
                  onKeyDown={handlerOnKeyDown}
                  placeholder="수정할 할일을 적어주세요"
                  data-testid="modify-input"
                />
                <button
                  className="btn btn-primary my-2 p-3 m-2"
                  onClick={UpdateTodoHandler}
                  data-testid="submit-button"
                >
                  제출
                </button>
                <button
                  className="btn btn-primary my-2 p-3"
                  onClick={InputFalseHandler}
                  data-testid="cancel-button"
                >
                  취소
                </button>
              </>
            ) : (
              <Div>
                <input
                  type="checkbox"
                  className="check"
                  onClick={CompleteinputHandler}
                />
                <Span className={isCompleted ? "text-success" : "text-white"}>
                  {body}
                </Span>
                <button
                  className="btn btn-primary my-2 p-3 m-2"
                  onClick={InputTrueHandler}
                  data-testid="modify-button"
                >
                  수정
                </button>
                <button
                  className="btn btn-primary my-2 p-3"
                  onClick={DeleteTodoHandler}
                  data-testid="delete-button"
                >
                  삭제
                </button>
              </Div>
            )}
          </li>
        </div>
      </div>
    </section>
  );
}

export default TodoData;

// Styled Component
const Input = styled.input`
  height: 50px;
  border-radius: 10px;
  border: none;
  color: white;
  padding-left: 5px;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: white;
    opacity: 0.5;
  }
`;

const Div = styled.div`
  .check {
    margin-right: 50px;
    width: 20px;
    height: 20px;
  }
`;

const Span = styled.span`
  margin-right: 10%;
`;
