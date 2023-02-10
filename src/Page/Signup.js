import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/AuthContext";

function Signup() {
  // env URL
  const URL = process.env.REACT_APP_API_URL;

  // useNavigate
  const navigate = useNavigate();

  // useContext
  const authCtx = useContext(AuthContext);

  // 이메일, 비밀번호 유효성 메시지
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 이메일, 비밀번호 유효성 state
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  // 이메일 비밀번호 입력확인
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  // 이메일 유효성 검사
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

  // 비밀번호 유효성 검사
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

  // 회원가입 Axios
  const SignUpHandler = async () => {
    try {
      await axios.post(`${URL}/auth/signup`, {
        email: email,
        password: password,
      });
      alert("회원가입이 완료되었습니다.");
      navigate("/signin");
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  // 엔터키 입력 이벤트
  const handlerOnKeyDown = (e) => {
    if (isEmail && isPassword && e.key === "Enter") {
      SignUpHandler();
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
    <section>
      <h2>회원가입</h2>
      <div>
        <label>이메일</label>
        <input
          type="email"
          onChange={onChangeEmail}
          placeholder="이메일"
          data-testid="email-input"
        />
        {email.length > 0 && <span>{emailMessage}</span>}
      </div>
      <div>
        <label>비밀번호</label>
        <input
          type="password"
          onChange={onChangePassword}
          placeholder="비밀번호"
          onKeyDown={handlerOnKeyDown}
          data-testid="password-input"
        />
        {password.length > 0 && <span>{passwordMessage}</span>}
      </div>
      <button
        onClick={SignUpHandler}
        disabled={!(isEmail && isPassword)}
        data-testid="signup-button"
      >
        회원가입
      </button>
    </section>
  );
}

export default Signup;
