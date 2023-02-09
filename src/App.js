// react-router-dom
import { Route, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

// Pages
import MainHome from "./Page/MainHome";
import Signup from "./Page/Signup";
import Login from "./Page/Signin";

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
        <Route path="/signin" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
