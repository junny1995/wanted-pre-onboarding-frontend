import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/AuthContext";

function Todo() {
  // useNavigate
  const navigate = useNavigate();

  // useContext
  const authCtx = useContext(AuthContext);

  // 토큰이 없다면 로그인 페이지로 이동
  useEffect(() => {
    const isLoggedIn = authCtx.isLoggedIn;
    if (!isLoggedIn) {
      navigate("/signin");
    }
  }, [authCtx, navigate]);

  return (
    <>
      <div>Todo페이지</div>
    </>
  );
}

export default Todo;
