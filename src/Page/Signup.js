import axios from "axios";
import { useState } from "react";

function Signup() {
  // env URL
  const URL = process.env.REACT_APP_API_URL;

  // useState
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 이메일, 패스워드 value
  const onChangeEmail = (e) => {
    const emailCurrent = e.target.value;
    setEmail(emailCurrent);
  };

  const onChangePassword = (e) => {
    const passwordCurrent = e.target.value;
    setPassword(passwordCurrent);
  };

  const SignUpHandler = async () => {
    try {
      await axios.post(`${URL}/auth/signup`, {
        email: email,
        password: password,
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <input onChange={onChangeEmail} placeholder="이메일" />
      <input onChange={onChangePassword} placeholder="비밀번호" />
      <button onClick={SignUpHandler}>회원가입</button>
    </div>
  );
}

export default Signup;
