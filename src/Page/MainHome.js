import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AuthContext from "../store/AuthContext";

function MainHome() {
  // useNavigate
  const navigate = useNavigate();

  // useContext 관련 로그인 확인
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  // 로그아웃
  const signoutHandler = () => {
    authCtx.logout();
  };

  return (
    <section className="py-5 text-center container">
      <div className="row py-lg-5">
        <div className="col-lg-6 col-md-8 mx-auto">
          <P1>wanted-pre-onboarding-frontend</P1>
          <P2>선발 과제</P2>
          {isLoggedIn ? (
            <>
              <button
                className="btn btn-primary my-2 p-3 m-3"
                onClick={() => navigate("/todo")}
              >
                할일 작성해보기
              </button>
              <button
                className="btn btn-primary my-2 p-3 m-3"
                onClick={signoutHandler}
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <P2>
                체험을 원하신다면 아래 버튼이나 메뉴 버튼으로 이동해주세요!
              </P2>
              <button
                className="btn btn-primary my-2 p-3 m-3"
                onClick={() => navigate("/signin")}
              >
                로그인 체험
              </button>
              <button
                className="btn btn-primary my-2 p-3 m-3"
                onClick={() => navigate("/signup")}
              >
                회원가입 체험
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default MainHome;

// Styled Component
const P1 = styled.p`
  color: white;
  font-size: 35px;
  font-weight: 800;
`;

const P2 = styled.p`
  color: white;
  font-size: 20px;
  font-weight: 500;
`;
