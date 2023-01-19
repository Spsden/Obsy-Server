const express = require("express");
const app = express();

//middleware
app.use(express.json())

const tasks = require('./routes/tasks')

const port = 3000;


app.use('/api/v1/obsy/',tasks)
app.listen(port, console.log(`server running on port ${port}`));






///Designed ports

//app.get('/api/v1/tasks') =get all tasks
//app.post('api/v1/tasks') = create a new task
//app.get('api/v1/tasks/:id') = get a single task
//app.delete('api/v1/tasks/:id') = delete a single task
//app.patch('api/v1/tasks/:id') = update a single task

//
