const express = require("express");
require("express-async-errors");
const app = express();
const { connectDB } = require("./db/connect");
require("dotenv").config();
const auth = require("./routes/auth");
const tasks = require("./routes/tasks");
const notFound = require("./middleware/not_found");
const errorHandler = require("./middleware/error_handler");
const authenticateUser = require("./middleware/authentication");

///middleware
app.use(express.json());
app.use("/api/v1/auth/", auth);
app.use("/api/v1/obsy/", authenticateUser, tasks);
app.use(notFound);
app.use(errorHandler);

const port = 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server running on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();





//Designed ports

//app.get('/api/v1/tasks') =get all tasks
//app.post('api/v1/tasks') = create a new task
//app.get('api/v1/tasks/:id') = get a single task
//app.delete('api/v1/tasks/:id') = delete a single task
//app.patch('api/v1/tasks/:id') = update a single task
