import { createSlice } from "@reduxjs/toolkit";
import { Logger } from "../../logger/log";
import { DataAppEvents } from "../../data/events/data-events";
interface Task {
  id: number;
  taskName: string;
  taskDesc: string;
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
        taskName: action.payload.taskName,
        taskDesc: action.payload.taskDesc,
        completed: false,
      });
      DataAppEvents.addDataEvent("data:task:new");
    },
    removeTask: (state, action) => {
      const index = state.findIndex(
        (task: Task) => task.id === action.payload.id
      );

      if (index !== -1) {
        state.splice(index, 1);
        DataAppEvents.addDataEvent("data:task:delete");
      }
    },
    completedTask: (state, action) => {
      const index = state.findIndex(
        (task: Task) => task.id === action.payload.id
      );

      //logger.info("completedTask index : ", index);
      if (index !== -1) {
        state[index].completed = true;
        DataAppEvents.addDataEvent("data:task:update");
      }
    },
  },
});

export const { addTask, removeTask, completedTask } = taskSlice.actions;
export default taskSlice.reducer;
