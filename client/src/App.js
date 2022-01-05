import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Todo from "./Todo";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
