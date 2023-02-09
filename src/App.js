// react-router-dom
import { Route, Routes } from "react-router-dom";

// BootStrap
import "bootstrap/dist/css/bootstrap.min.css";

// Pages
import MainHome from "./Page/MainHome";
import Signup from "./Page/Signup";
import Signin from "./Page/Signin";

// Components
import Header from "./Component/Header";
import Todo from "./Page/Todo";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainHome />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </>
  );
}

export default App;
