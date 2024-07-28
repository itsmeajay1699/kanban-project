import React from "react";
import SingleCard from "./SingleCard";
import { TaskType } from "@/redux/taskSlice";

const Task = ({ columnData }: { columnData: TaskType[] }) => {
  return (
    <div className="grid gap-2 mt-4">
      {columnData.length > 0 ? (
        columnData.map((task) => {
          return <SingleCard key={task.id} task={task} />;
        })
      ) : (
        <h1 className="text-center text-gray-500 text-md font-semibold">
          No tasks in this column. Click the + button to add a new task to this
          column.
        </h1>
      )}
    </div>
  );
};

export default Task;
