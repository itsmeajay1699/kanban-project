"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";

const TaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  status: z.string().min(1),
  priority: z.string().min(1),
  deadline: z.string().optional(),
  createdBy: z.string().optional(),
});

const Header = () => {
  const [openModal, setOpenModal] = React.useState(false);

  const { data: session } = useSession();
  //   console.log(session?.user._id);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof TaskSchema>>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "",
      priority: "",
      deadline: undefined,
    },
  });

  const onSubmit = async (data: z.infer<typeof TaskSchema>) => {
    try {
      console.log(data);

      if (session?.user?._id) {
        data.createdBy = session?.user._id;
      }
      const res = await fetch("/api/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const task = await res.json();
      console.log(task);
      console.log(task);
      setOpenModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <header className="flex justify-between items-center py-4">
        <h1 className="text-2xl font-bold">Task Board</h1>
        <button
          onClick={() => setOpenModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Add Task
        </button>
      </header>
      {openModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg auth-container">
            <div className="relative flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">Add Task</h1>
              <button onClick={() => setOpenModal(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} action="">
              <div className="grid space-y-6 ">
                <div>
                  <input
                    type="text"
                    id="title"
                    placeholder="Title"
                    {...register("title")}
                    className="w-full p-2 mt-1 border border-[#333] rounded-md bg-gray-100 border-none"
                  />
                  {errors.title && (
                    <span className="text-red-500">{errors.title.message}</span>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    id="description"
                    placeholder="Description"
                    {...register("description")}
                    className="w-full p-2 mt-1 border border-[#333] rounded-md bg-gray-100 border-none"
                  />
                  {errors.description && (
                    <span className="text-red-500">
                      {errors.description.message}
                    </span>
                  )}
                </div>

                <div>
                  <select
                    {...register("status")}
                    className="w-full p-2 mt-1 border border-[#333] rounded-md bg-gray-100 border-none"
                  >
                    <option value="todo">Todo</option>
                    <option value="in_progress">In Progress</option>
                    <option value="in_review">In Review</option>
                    <option value="completed">Completed</option>
                  </select>
                  {errors.status && (
                    <span className="text-red-500">
                      {errors.status.message}
                    </span>
                  )}
                </div>
                <div>
                  <select
                    {...register("priority")}
                    className="w-full p-2 mt-1 border border-[#333] rounded-md bg-gray-100 border-none"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                  {errors.priority && (
                    <span className="text-red-500">
                      {errors.priority.message}
                    </span>
                  )}
                </div>
                <div>
                  <input
                    type="date"
                    id="deadline"
                    {...register("deadline")}
                    className="w-full p-2 mt-1 border border-[#333] rounded-md bg-gray-100 border-none"
                  />
                  {errors.deadline && (
                    <span className="text-red-500">
                      {errors.deadline.message}
                    </span>
                  )}
                </div>
                <div className="flex gap-5">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
                  >
                    Add Task
                  </button>
                  <button
                    onClick={() => {
                      setOpenModal(false);
                      reset();
                    }}
                    className="bg-red-500 text-white px-4 py-2 rounded-md mt-2"
                  >
                    Close
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
