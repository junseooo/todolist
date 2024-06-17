import express from "express";
import cors from "cors";
import { ITodo } from "../interface";

const app = express();
const port = 8080;

let corsOptions = {
  origin: "*",
  credential: true,
};

app.use(express.json());
app.use(cors(corsOptions));

let todos: ITodo[] = [];
let id = 1;

app.get("/", (req, res) => {
  res.send("Hello, world");
})

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.post("/todos", (req, res) => {
  const newTodo: ITodo = {
    id: id++,
    text: req.body.title,
    completed: false,
  };
  todos.push(newTodo);
  res.json(newTodo);
});

app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  todos = todos.filter((todo) => todo.id !== parseInt(id));
  res.json({ message: 'Todo deleted' }); // 응답 추가
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
