import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AuthContext from "../store/AuthContext";

function Signin() {
  // env URL
  const URL = process.env.REACT_APP_API_URL;

  // useNavigate
  const navigate = useNavigate();

  // useContext
  const authCtx = useContext(AuthContext);

  // 이메일, 비밀번호 저장 State
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

  // 엔터키 입력 이벤트
  const handlerOnKeyDown = (e) => {
    if (email && password && e.key === "Enter") {
      SignIpHandler();
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
    <Section className="form-signin signin">
      <h2 className="h3 mb-3 fw-normal text-white">로그인</h2>
      <div className="form-floating">
        <Input
          type="email"
          className="form-control bg-secondary mb-2"
          onChange={onChangeEmail}
          placeholder="이메일"
        />
        <label className="text-white-50">이메일</label>
      </div>
      <div className="form-floating">
        <Input
          type="password"
          className="form-control bg-secondary mb-2"
          onChange={onChangePassword}
          placeholder="비밀번호"
          onKeyDown={handlerOnKeyDown}
        />
        <label className="text-white-50">비밀번호</label>
      </div>
      <button
        className="w-100 btn btn-lg btn-primary"
        onClick={SignIpHandler}
        disabled={!(email && password)}
        data-testid="signin-button"
      >
        로그인
      </button>
    </Section>
  );
}

export default Signin;

// Styled Component
const Section = styled.div`
  padding: 70px;
`;

const Input = styled.input`
  border: 1px solid black;
  color: white;
  :focus {
    color: white;
  }
`;
