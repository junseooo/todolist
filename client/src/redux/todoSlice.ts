import { ITodo } from '../../../interface';
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface TodosState {
  [date: string]: ITodo[];
}

const initialState: TodosState = {};

const todoSlice = createSlice({
  name: "todos",
  initialState: initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<{ date: string; text: string }>) => {
      const { date, text } = action.payload;
      const newTodo: ITodo = {
        id: Date.now(),
        text,
        completed: false,
      };
      if (!state[date]) {
        state[date] = [];
      }
      state[date].push(newTodo);
    },
    toggleTodo: (state, action: PayloadAction<{ date: string; id: number }>) => {
      const { date, id } = action.payload;
      const todos = state[date];
      const todo = todos.find((todo) => todo.id === id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action: PayloadAction<{ date: string; id: number }>) => {
      const { date, id } = action.payload;
      const todos = state[date];
      state[date] = state[date].filter((todo) => todo.id !== id);
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
