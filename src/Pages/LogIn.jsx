import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { toast } from "react-toastify";


const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useUser(); // دالة login من UserContext
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // نقرأ المستخدم اللي اتسجل في SignUp
    const storedUser = JSON.parse(localStorage.getItem("registeredUser"));

    if (!storedUser) {
      alert("No registered user found. Please sign up first.");
      return;
    }

    // نتحقق من البيانات
    if (
      storedUser.userName === userName &&
      storedUser.password === password
    ) {
        login(storedUser)

        
        toast.success("Login successful 🎉");
      navigate("/"); // نرجعه للصفحة الرئيسية
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <form
        onSubmit={handleLogin}
        className="bg-blue-500 shadow-lg rounded-2xl px-8 py-10 w-full max-w-md flex flex-col gap-5"
      >
        <h2 className="text-2xl font-bold text-center text-white mb-4">
          Login
        </h2>

        <input
          type="text"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg text-black bg-amber-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg text-black bg-amber-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Login
        </button>

        <p className="text-sm text-gray-900 text-center">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-black cursor-pointer hover:underline"
          >
            Sign in
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
