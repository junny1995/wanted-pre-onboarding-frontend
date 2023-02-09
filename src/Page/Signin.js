import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/AuthContext";

function Signin() {
  // env URL
  const URL = process.env.REACT_APP_API_URL;

  // useNavigate
  const navigate = useNavigate();

  // useContext
  const authCtx = useContext(AuthContext);

  // useState
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 이메일, 패스워드 value
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  // 로그인 Axios
  const SignIpHandler = async () => {
    try {
      const signin = await axios.post(`${URL}/auth/signin`, {
        email: email,
        password: password,
      });
      const token = signin.data.access_token;
      authCtx.login(token);
      alert("로그인이 완료되었습니다.");
      navigate("/todo");
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  // 토큰이 있다면 투두 페이지로 이동
  useEffect(() => {
    const isLoggedIn = authCtx.isLoggedIn;
    if (isLoggedIn) {
      navigate("/todo");
    }
  }, [authCtx, navigate]);

  return (
    <div>
      <h2>로그인</h2>
      <div>
        <label>이메일</label>
        <input type="email" onChange={onChangeEmail} placeholder="이메일" />
      </div>
      <div>
        <label>비밀번호</label>
        <input
          type="password"
          onChange={onChangePassword}
          placeholder="비밀번호"
        />
      </div>
      <button
        onClick={SignIpHandler}
        disabled={!(email && password)}
        data-testid="signin-button"
      >
        로그인
      </button>
    </div>
  );
}

export default Signin;
