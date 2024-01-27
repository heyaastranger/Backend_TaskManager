const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
const ToDoList = require("./models/ToDoList");
const port = 3000;

const app = express();

// app.use(
//     cors({
//       origin: "http://localhost:3000",
//       methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//       credentials: true,
//       optionsSuccessStatus: 204, // Respond with 204 No Content for OPTIONS requests
//     })
//   );
app.use(cors());
app.use(bodyParser.json());
dotenv.config();

// Handle fetching all tasks
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await ToDoList.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Handle marking a task as complete
app.put("/tasks/:id", async (req, res) => {
  const taskId = req.params.id;

  try {
    const updatedTask = await ToDoList.findByIdAndUpdate(
      taskId,
      { completed: true },
      { new: true }
    );
    res.json({ message: "Task marked as complete", task: updatedTask });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.use("/task", async (req, res, next) => {
  const { task } = req.body;

  if (task) {
    try {
      const newToDoList = new ToDoList({
        task,
      });

      await newToDoList.save();
      res.status(201).json({
        message: "Task added successfully",
      });
    } catch (error) {
      console.error("Error adding task:", error);
      res
        .status(500)
        .json({ Message: "Something went wrong while adding the task" });
    }
  } else {
    res.status(400).json({ Message: "Task is required" });
  }
});

app.use("/", async (req, res, next) => {
  res.json({ message: "This is the backend" });
});
mongoose
  .connect(
    `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASSWORD}@cluster0.hsil95h.mongodb.net/BACKEND-TASKMANAGER`
  )
  .then(() => {
    console.log("Connection Successful");
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log("Connection Failed", error);
  });
