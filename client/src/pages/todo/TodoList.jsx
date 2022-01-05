import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import axios from "axios";
import UpdateTodo from "./UpdateTodo";

const TodoList = ({ task, createdAt, id, setTask }) => {
  const date = new Date(createdAt).toLocaleString("en-us", {
    month: "2-digit",
    year: "numeric",
    day: "2-digit",
  });

  const handleDelete = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete these task"
    );

    if (confirm) {
      const config = {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth"))}`,
        },
      };
      const res = await axios.delete(
        `https://todo-raghav.herokuapp.com/api/v1/tasks/${id}`,
        config
      );
      window.location.replace("/todo");
      if (res.data.status === "success") {
        window.location.replace("/todo");
      }
    }
    return;
  };

  return (
    <div className="task-list">
      {task}
      <div className="options">
        <span className="d-ib date">{date}</span>
        <span className="d-ib icons">
          <UpdateTodo id={id} />
          <DeleteIcon onClick={handleDelete} />
        </span>
      </div>
    </div>
  );
};

export default TodoList;
