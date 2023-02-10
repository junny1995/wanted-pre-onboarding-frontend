import axios from "axios";

function TodoData(props) {
  const { id, body, change } = props;

  // env URL
  const URL = process.env.REACT_APP_API_URL;

  // Delete Todo Axios
  const DeleteTodoHandler = async () => {
    try {
      await axios.delete(`${URL}/todos/${id}`, {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("token"),
        },
      });
      console.log("성공");
      change();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <div>
        {id}/{body}
      </div>
      <button onClick={DeleteTodoHandler}>삭제</button>
    </div>
  );
}

export default TodoData;
