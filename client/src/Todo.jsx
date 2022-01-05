import React from "react";
import Header from "./pages/todo/Header";
import TodoInput from "./pages/todo/TodoInput";

const Todo = () => {
  const checkUser = localStorage.getItem("auth");

  return (
    <>
      <Header />
      {checkUser && <TodoInput />}
      {!checkUser && (
        <div className="heading-secondary no-user">
          You don't have access to these route
        </div>
      )}
    </>
  );
};

export default Todo;
