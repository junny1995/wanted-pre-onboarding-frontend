import axios from "axios";
import { useState } from "react";

function Login() {
  // env URL
  const URL = process.env.REACT_APP_API_URL;

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
      const a = await axios.post(`${URL}/auth/signin`, {
        email: email,
        password: password,
      });
      console.log(a);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <input onChange={onChangeEmail} placeholder="이메일" />
      <input onChange={onChangePassword} placeholder="비밀번호" />
      <button onClick={SignIpHandler}>로그인</button>
    </div>
  );
}

export default Login;
