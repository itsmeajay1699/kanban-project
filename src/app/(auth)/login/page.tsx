"use client";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
const Login = () => {
  const [showLogin, setShowLogin] = useState(true);
  const { data: session } = useSession();

  return (
    <div className="min-h-screen login-gradient2">
      <div className="relative text-center pt-20">
        {showLogin ? (
          <LoginForm setShowLogin={setShowLogin} />
        ) : (
          <RegisterForm setShowLogin={setShowLogin} />
        )}
      </div>
    </div>
  );
};

export default Login;
