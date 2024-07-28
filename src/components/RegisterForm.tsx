"use client";
import React, { Dispatch, SetStateAction } from "react";
import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";
import { useState } from "react";
import { RegisterFormSchema, RegisterFormType } from "@/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
const RegisterForm = ({
  setShowLogin,
}: {
  setShowLogin: Dispatch<SetStateAction<boolean>>;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormType>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterFormType) => {
    const user = await fetch("/login/api", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const response = await user.json();
    console.log(response);
  };
  return (
    <div className="w-full flex flex-col items-center">
      <div className="auth-container p-10 bg-white shadow-md rounded-2xl">
        <h1 className="font text-[40px] min-w-fit font-semibold">
          Welcome to <span className="text-[var(--bg-work)]">Workflo</span>!
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} action="">
          <div className="grid gap-5">
            <div>
              <input
                type="text"
                {...register("name")}
                id="name"
                placeholder="Your name"
                className="w-full p-2 mt-1 border border-[#333] rounded-md bg-gray-100 border-none"
              />
              {errors.name && (
                <span className="text-red-500">{errors.name.message}</span>
              )}
            </div>

            <div>
              <input
                type="email"
                {...register("email")}
                id="email"
                placeholder="Your email"
                className="w-full p-2 mt-1 border border-[#333] rounded-md bg-gray-100 border-none"
              />
              {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
              )}
            </div>
            <div className="relative">
              <div>
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  id="password"
                  placeholder="Password"
                  className="w-full p-2 mt-1 border border-[#333] rounded-md bg-gray-100 border-none"
                />

                {errors.password && (
                  <span className="text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-[50%] transform -translate-y-1/2"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <button
              type="submit"
              className="w-full p-2 mt-1 login-gradient text-white rounded-md"
            >
              Login
            </button>
          </div>
        </form>

        <div className="mt-5">
          <p>
            Already have an account?{" "}
            <span
              onClick={() => setShowLogin(true)}
              className="text-blue-500 cursor-pointer"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
