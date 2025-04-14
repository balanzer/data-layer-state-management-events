import { createSlice } from "@reduxjs/toolkit";
import { Logger } from "../../logger/log";

interface Task {
  id: number;
  task: string;
  completed: boolean;
}

let id: number = 1000;

const logger = new Logger("tasks-slice");

const taskSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    // action: function
    addTask: (state: any, action) => {
      state.push({
        id: id++,
        task: action.payload.task,
        completed: false,
      });
    },
    removeTask: (state, action) => {
      const index = state.findIndex(
        (task: Task) => task.id === action.payload.id
      );
      state.splice(index, 1);
    },
    completedTask: (state, action) => {
      const index = state.findIndex((task: Task) => {
        task.id === action.payload.id;
        task.completed === true;
      });
    },
  },
});

export const { addTask, removeTask, completedTask } = taskSlice.actions;
export default taskSlice.reducer;
