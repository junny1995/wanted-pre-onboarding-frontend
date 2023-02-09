import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/AuthContext";

function Header() {
  // useNavigate
  const navigate = useNavigate();

  // useContext 관련 로그인 확인
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  // 로그아웃 함수
  const signoutHandler = () => {
    authCtx.logout();
    navigate("/");
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand onClick={() => navigate("/")}>ToDo List</Navbar.Brand>
        <Nav className="p-2">
          {!isLoggedIn ? (
            <>
              <Nav.Link onClick={() => navigate("/signin")}>로그인</Nav.Link>
              <Nav.Link onClick={() => navigate("/signup")}>회원가입</Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link onClick={() => navigate("/todo")}>Todo</Nav.Link>
              <Nav.Link onClick={signoutHandler}>로그아웃</Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
