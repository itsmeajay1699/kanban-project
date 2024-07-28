/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { LegacyRef, useEffect, useRef } from "react";
import Task from "./Task";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { TaskType, TaskBoardState } from "@/redux/taskSlice";
import { RootState } from "@/redux/store";
import { saveItemToColumn } from "@/redux/taskSlice";
import { set } from "mongoose";

const Column = ({
  key,
  label,
  emoji,
  ident,
}: {
  key: string;
  label: string;
  emoji: string;
  ident: string;
}) => {
  const allData = useSelector((state: RootState) => state.taskBoard);
  const [columnData, setColumnData] = React.useState<TaskType[] | []>([]);
  const current = useSelector((state: RootState) => state.taskBoard.current);
  const taskBoard = useSelector((state: RootState) => state.taskBoard);
  const dispatch = useDispatch();
  useEffect(() => {
    if (Array.isArray(taskBoard[ident as keyof TaskBoardState])) {
      setColumnData(taskBoard[ident as keyof TaskBoardState] as TaskType[]);
    }
  }, [taskBoard]);

  const [{ isOver }, drop] = useDrop(
    {
      accept: "task",
      drop: () => {
        let key = ident;
        const updatedTask = { ...current, status: key };

        dispatch(
          saveItemToColumn({
            task: updatedTask as TaskType,
            fromColumn: (current as TaskType)?.status as keyof TaskBoardState,
            toColumn: key as keyof TaskBoardState,
          })
        );
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    },
    [allData.current]
  );
  const ref = useRef<HTMLDivElement>(null);
  drop(ref);
  return (
    <div
      ref={ref as LegacyRef<HTMLDivElement>}
      className={`board-column m-auto w-full bg-white ${isOver ? "bg-gray-100" : ""}`}
      key={key}
    >
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">{label}</h2>
        <span className="text-3xl">{emoji}</span>
      </div>
      <Task
        // column={label as keyof TaskBoardState}
        columnData={columnData}
      />
    </div>
  );
};

export default Column;
