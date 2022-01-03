const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRoute");
const taskRouter = require("./routes/taskRoute");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Cant't find ${req.originalUrl} on this server `, 404));
});

app.use(globalErrorHandler);

module.exports = app;
