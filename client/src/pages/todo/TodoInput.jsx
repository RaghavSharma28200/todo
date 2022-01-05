import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import TodoList from "./TodoList";
import axios from "axios";

const TodoInput = () => {
  const [task, setTask] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const url = "https://todo-raghav.herokuapp.com/api/v1/users/me";
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth"))}`,
      },
    };

    axios.get(url, config).then((res) => {
      setTask(res.data.data.user.tasks);
    });
  }, []);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleTaskClick = async (e) => {
    const url1 = "https://todo-raghav.herokuapp.com/api/v1/tasks/";
    const url2 = "https://todo-raghav.herokuapp.com/api/v1/users/me";
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth"))}`,
      },
    };
    const data = {
      task: input,
    };
    await axios.post(url1, data, config);

    axios.get(url2, config).then((res) => {
      setTask(res.data.data.user.tasks);
      setTask(res.data.data.user.tasks);
    });
  };

  const style = {
    borderRadius: "0%",
    bgcolor: "#5cdb95",
  };
  return (
    <div className="Card txt-ctr br-0">
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
      >
        <input
          className="form__input"
          id="password"
          type="text"
          value={input}
          onChange={handleInputChange}
        />
        <Button sx={style} onClick={handleTaskClick}>
          Add
        </Button>
      </ButtonGroup>
      {task
        .map((items) => {
          return (
            <TodoList
              key={items._id}
              id={items._id}
              task={items.task}
              createdAt={items.createdAt}
              setTask={setTask}
            />
          );
        })
        .reverse()}
    </div>
  );
};

export default TodoInput;
