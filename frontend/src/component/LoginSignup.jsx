import { useState } from "react";
import api from "../api";

export default function LoginSignup({ open, mode, close, setMode }) {
  const isSignup = mode === "signup";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isSignup) {
        const res = await api.post("/api/user/register", {
          name,
          email,
          password: pass,
        });

        if (res.data.success) {
          setMode("login");
          setName("");
          setPass("");
        } else {
          setError(res.data.message);
        }
      } else {
        const res = await api.post("/api/user/login", {
          email,
          password: pass,
        });

        if (res.data.success) {
          localStorage.setItem("token", res.data.data);

          // 🔥 ADD THIS LINE
          window.dispatchEvent(new Event("authChange"));

          close();
        }
        else {
          setError(res.data.message);
        }
      }
    } catch {
      setError("Server error, try again");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[999]">
      <div
        className="
          bg-white dark:bg-[#0E1116]
          w-[90%] max-w-sm
          rounded-2xl p-6
          relative shadow-xl
          transition-colors
        "
      >
        {/* CLOSE */}
        <button
          onClick={close}
          className="absolute top-3 right-4 text-xl text-gray-600 dark:text-gray-400"
        >
          ✕
        </button>

        {/* TITLE */}
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          {isSignup ? "Create Account" : "Login"}
        </h2>

        {/* ERROR */}
        {error && (
          <p className="text-sm text-red-500 mb-2">{error}</p>
        )}

        {/* FORM */}
        <form className="space-y-3" onSubmit={handleSubmit}>
          {isSignup && (
            <input
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="
                w-full px-3 py-2 rounded-lg border
                bg-white dark:bg-[#0E1116]
                text-gray-900 dark:text-white
                border-gray-300 dark:border-gray-600
                focus:outline-none focus:ring-2 focus:ring-orange-500
              "
            />
          )}

          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              w-full px-3 py-2 rounded-lg border
              bg-white dark:bg-[#0E1116]
              text-gray-900 dark:text-white
              border-gray-300 dark:border-gray-600
              focus:outline-none focus:ring-2 focus:ring-orange-500
            "
          />

          <input
            type="password"
            placeholder="Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="
              w-full px-3 py-2 rounded-lg border
              bg-white dark:bg-[#0E1116]
              text-gray-900 dark:text-white
              border-gray-300 dark:border-gray-600
              focus:outline-none focus:ring-2 focus:ring-orange-500
            "
          />

          <button
            type="submit"
            className="
              w-full bg-orange-500 text-white
              py-2 rounded-lg font-semibold
              hover:bg-orange-600 transition
            "
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        {/* TOGGLE */}
        <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
          {isSignup ? "Already have an account? " : "New here? "}
          <button
            onClick={() => setMode(isSignup ? "login" : "signup")}
            className="text-orange-500 font-semibold"
          >
            {isSignup ? "Login" : "Create account"}
          </button>
        </p>
      </div>
    </div>
  );
}