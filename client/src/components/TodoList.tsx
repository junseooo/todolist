import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { toggleTodo, deleteTodo, addTodo } from "../redux/todoSlice";

const TodoList = () => {
  const params = useParams<{ date?: string }>();
  const { date } = params;

  const todos = useSelector((state: RootState) => (date ? state.todos[date] || [] : []));
  const dispatch = useDispatch<AppDispatch>();
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = () => {
    if (date && newTodo.trim()) {
      dispatch(addTodo({
        date,
        text: newTodo.trim(),
      }));
      setNewTodo("");
    }
  };

  return (
    <div>
      <h1>Todo List for {date}</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Enter todo..."
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch(toggleTodo({ date: date ?? '', id: todo.id }))}
            />
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.text}
            </span>
            <button onClick={() => dispatch(deleteTodo({ date: date ?? '', id: todo.id }))}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
