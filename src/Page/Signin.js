import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  // env URL
  const URL = process.env.REACT_APP_API_URL;

  // useNavigate
  const navigate = useNavigate();

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

  const SignIpHandler = async () => {
    try {
      const signin = await axios.post(`${URL}/auth/signin`, {
        email: email,
        password: password,
      });
      const token = signin.data.access_token;
      localStorage.setItem("token", token);
      alert("로그인이 완료되었습니다.");
      navigate("/todo");
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <div>
      <input onChange={onChangeEmail} placeholder="이메일" />
      <input onChange={onChangePassword} placeholder="비밀번호" />
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

export default Login;
