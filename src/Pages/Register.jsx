import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLoading } from "../context/LoadingOverlaycontext"; // استدعاء الكونتكست

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const userNameRef = useRef(null);

  const { showLoading, hideLoading } = useLoading(); // جلب الدوال
  const navigate = useNavigate();

  useEffect(() => {
    userNameRef.current.focus();
  }, []);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!userName || !password || !email) {
      toast.error("⚠ Please fill all fields");
      return;
    }

    try {
      showLoading(); // تشغيل اللودينج

      // نخزن بيانات المستخدم في localStorage
      localStorage.setItem(
        "registeredUser",
        JSON.stringify({ userName, email, password })
      );

      toast.success("✅ Sign Up successful! Please login.");

      // نوجهه لصفحة تسجيل الدخول
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      toast.error("❌ Something went wrong!");
    } finally {
      hideLoading(); // إخفاء اللودينج
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <form
        onSubmit={handleSignUp}
        className="bg-blue-500 shadow-lg rounded-2xl px-8 py-10 w-full max-w-md flex flex-col gap-5"
      >
        <h2 className="text-2xl font-bold text-center text-white mb-4">
          Register User
        </h2>

        <input
          ref={userNameRef}
          type="text"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg text-black bg-amber-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          className="bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
          disabled={!userName || !password || !email} // يمنع الضغط لو ناقص داتا
        >
          Sign Up
        </button>

        <p className="text-sm text-gray-900 text-center">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-black cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
