import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand onClick={() => navigate("/")}>ToDo List</Navbar.Brand>
        <Nav className="p-2">
          <Nav.Link onClick={() => navigate("/todo")}>Todo</Nav.Link>
          <Nav.Link onClick={() => navigate("/login")}>로그인</Nav.Link>
          <Nav.Link onClick={() => navigate("/signup")}>회원가입</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
