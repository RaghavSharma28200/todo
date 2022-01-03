const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const mongoose = require("mongoose");
const app = require("./app");

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected Sucessfully");
  })
  .catch((err) => {
    console.log(err);
  });

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`App Running on port ${port}`);
});
