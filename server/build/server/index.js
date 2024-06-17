"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 8080;
let corsOptions = {
    origin: "*",
    credential: true,
};
app.use(express_1.default.json());
app.use((0, cors_1.default)(corsOptions));
let todos = [];
let id = 1;
app.get("/", (req, res) => {
    res.send("Hello, world");
});
app.get("/todos", (req, res) => {
    res.json(todos);
});
app.post("/todos", (req, res) => {
    const newTodo = {
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
