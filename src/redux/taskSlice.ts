import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs/promises";
import { z } from "zod";

export type TaskType = {
  id: string;
  title: string;
  description: string;
  status: string; // todo, in_progress, in_review, completed
  priority: string;
  // createdAt: z.ZodDate;
  // updatedAt: z.ZodDate;
};

export type TaskBoardState = {
  todo: TaskType[];
  in_progress: TaskType[];
  in_review: TaskType[];
  completed: TaskType[];
  current: TaskType | {};
};

const initialState: TaskBoardState = {
  todo: [
    {
      id: "1",
      title: "Implement User Authentication",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates molestias, quod, doloribus, doloremque quae quas magni quos nemo voluptatibus quibusdam quia?",
      status: "todo",
      priority: "high",
      // createdAt: z.date().parse(new Date().toISOString()),
      // updatedAt: z.date().parse(new Date().toISOString()),
    },
    {
      id: "2",
      title: "Implement User Authentication",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates molestias, quod, doloribus, doloremque quae quas magni quos nemo voluptatibus quibusdam quia?",
      status: "todo",
      priority: "high",
      // created_at: new Date().toISOString(),
      // updated_at: new Date().toISOString(),
    },
  ],
  // change information for in_progress
  in_progress: [
    {
      id: "2",
      title: "In Progress User Authentication",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates molestias, quod, doloribus, doloremque quae quas magni quos nemo voluptatibus quibusdam quia?",
      status: "in_progress",
      priority: "high",
      // created_at: new Date().toISOString(),
      // updated_at: new Date().toISOString(),
    },
  ],
  in_review: [
    {
      id: "3",
      title: "Under Review User Authentication",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates molestias, quod, doloribus, doloremque quae quas magni quos nemo voluptatibus quibusdam quia?",
      status: "in_review",
      priority: "high",
      // created_at: new Date().toISOString(),
      // updated_at: new Date().toISOString(),
    },
  ],
  completed: [
    {
      id: "4",
      title: "Completed User Authentication",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates molestias, quod, doloribus, doloremque quae quas magni quos nemo voluptatibus quibusdam quia?",
      status: "completed",
      priority: "high",
      // created_at: new Date().toISOString(),
      // updated_at: new Date().toISOString(),
    },
  ],
  current: {},
};

export const taskBoardSlice = createSlice({
  name: "taskBoard",
  initialState,
  reducers: {
    saveCurrentDraggedTask(
      state: TaskBoardState,
      action: PayloadAction<TaskType>
    ) {
      state.current = action.payload;
    },
    saveItemToColumn(
      state: TaskBoardState,
      action: PayloadAction<{
        task: TaskType;
        fromColumn: keyof TaskBoardState | null;
        toColumn: keyof TaskBoardState | null;
      }>
    ) {
      const { task, fromColumn, toColumn } = action.payload;
      if (fromColumn === toColumn) return;

      if (fromColumn && Array.isArray(state[fromColumn])) {
        state[fromColumn] = state[fromColumn].filter(
          (item) => item.id !== task.id
        );
      }

      if (toColumn && Array.isArray(state[toColumn])) {
        (state[toColumn] as TaskType[]).push(task);
      }

      // if (fromColumn) {
      //   state[toColumn as keyof TaskBoardState] = removeItemFromColumn(
      //     state,
      //     fromColumn as keyof TaskBoardState,
      //     task
      //   );
      // }

      // console.log(state[toColumn as keyof TaskBoardState]);

      // if (toColumn && Array.isArray(state[toColumn as keyof TaskBoardState])) {
      //   (state[toColumn as keyof TaskBoardState] as TaskType[]).push(task);
      //   console.log(state[toColumn as keyof TaskBoardState]);
      // }
    },
    removeTask(
      state,
      action: PayloadAction<{
        fromColumn: keyof TaskBoardState;
        task: TaskType;
      }>
    ) {
      const { fromColumn, task } = action.payload;
      state[fromColumn] = removeItemFromColumn(state, fromColumn, task);
    },

    saveBoard(state, action: PayloadAction<TaskBoardState>) {
      const payload = action.payload;
      state.todo = payload?.todo;
      state.in_progress = payload?.in_progress;
      state.in_review = payload?.in_review;
      state.completed = payload?.completed;
    },
  },
});

function removeItemFromColumn(
  state: TaskBoardState,
  fromColumn: keyof TaskBoardState,
  task: TaskType
): TaskType[] {
  // Check if the column is an array
  const column = state[fromColumn];

  if (!Array.isArray(column)) return [];

  return column.filter((item) => item.id !== task.id);
}

export const {
  saveCurrentDraggedTask,
  saveItemToColumn,
  saveBoard,
  removeTask,
} = taskBoardSlice.actions;

export default taskBoardSlice.reducer;
