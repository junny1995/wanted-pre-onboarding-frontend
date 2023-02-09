import axios from "axios";
import { useState } from "react";

function Signup() {
  // env URL
  const URL = process.env.REACT_APP_API_URL;

  // 이메일, 비밀번호 유효성 메시지
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 이메일, 비밀번호 유효성 state
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  // 이메일 비밀번호 입력확인
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  // 이메일, 패스워드 유효성 검사
  const onChangeEmail = (e) => {
    const emailCurrent = e.target.value;
    setEmail(emailCurrent);
    const emailValidation = /([\w-.]+)@/;

    if (!emailValidation.test(emailCurrent)) {
      setEmailMessage("이메일 형식이 아닙니다!");
      setIsEmail(false);
    } else {
      setEmailMessage("이메일 형식이 정확힙니다!");
      setIsEmail(true);
    }
  };

  const onChangePassword = (e) => {
    const passwordCurrent = e.target.value;
    setPassword(passwordCurrent);
    const passwordValidation = /.{8,25}$/;

    if (!passwordValidation.test(passwordCurrent)) {
      setPasswordMessage("8자리 이상 입력해주세요!");
      setIsPassword(false);
    } else {
      setPasswordMessage("사용가능한 비밀번호입니다!");
      setIsPassword(true);
    }
  };

  const SignUpHandler = async () => {
    try {
      const res = await axios.post(`${URL}/auth/signup`, {
        email: email,
        password: password,
      });
      console.log(res.data.access_token);
    } catch (e) {
      alert(e.response.data.message);
    }
  };
  return (
    <section>
      <h2>회원가입</h2>
      <div>
        <label>이메일</label>
        <input type="email" onChange={onChangeEmail} placeholder="이메일" />
        {email.length > 0 && <span>{emailMessage}</span>}
      </div>
      <div>
        <label>비밀번호</label>
        <input
          type="password"
          onChange={onChangePassword}
          placeholder="비밀번호"
        />
        {password.length > 0 && <span>{passwordMessage}</span>}
      </div>
      <button onClick={SignUpHandler} disabled={!(isEmail && isPassword)}>
        회원가입
      </button>
    </section>
  );
}

export default Signup;
