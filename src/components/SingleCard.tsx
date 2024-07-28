import React from "react";
import { useDrag } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { saveCurrentDraggedTask, TaskType } from "@/redux/taskSlice";
const SingleCard = ({
  key,
  task,
}: {
  key: number | string;
  task: TaskType;
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: "task",
    item: { name: "Implement User Authentication" },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const ref = React.useRef<HTMLDivElement>(null);

  drag(ref);
  const dispatch = useDispatch();

  return (
    <div
      ref={ref}
      key={key}
      className="p-4 bg-[#F9F9F9] rounded-md border-2 border-gray-300 grid space-y-2"
      style={{
        cursor: "pointer",
        visibility: isDragging ? "hidden" : "visible",
      }}
      onDragStart={() => {
        dispatch(saveCurrentDraggedTask(task));
      }}
    >
      <h3 className="text-lg font-bold">{task.title}</h3>
      <p className="text-gray-700">{task.description.slice(0, 100)}...</p>
      <div className="flex justify-between">
        <Type taskPriority={task.priority} />
        <span className="text-2xl">🔥</span>
      </div>
    </div>
  );
};

export default SingleCard;

const Type = ({ taskPriority }: { taskPriority: string }) => {
  // low medium high

  let color = "bg-green-500";
  if (taskPriority === "medium") {
    color = "bg-yellow-500";
  } else if (taskPriority === "high") {
    color = "bg-red-500";
  } else if (taskPriority === "low") {
    color = "bg-green-500";
  }

  return (
    <div className={`px-4 py-2 min-w-fit  rounded-md ${color} text-white`}>
      {taskPriority}
    </div>
  );
};
