"use client";
import React, { Dispatch, SetStateAction } from "react";
import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormSchema, LoginFormType } from "@/types";
import { signIn } from "next-auth/react";
const LoginForm = ({
  setShowLogin,
}: {
  setShowLogin: Dispatch<SetStateAction<boolean>>;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormType) => {
    try {
      signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
    } catch (err) {
      console.log(err);
    }
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
                type="email"
                id="email"
                placeholder="Your email"
                {...register("email")}
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
                  id="password"
                  placeholder="Password"
                  {...register("password")}
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
            Don&apos;t have an account?{" "}
            <span
              onClick={() => setShowLogin(false)}
              className="text-blue-500 cursor-pointer"
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
