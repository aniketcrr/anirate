import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function LoginTab() {
  const location = useLocation();
  const navigate = useNavigate();

  const isLogin = location.pathname === "/login";
  const isSignup = location.pathname === "/signup";

  return (
    <div className="border-b border-white/10">
      <div className="flex">

        {/* Log In Button */}
        <button
          type="button"
          onClick={() => navigate("/login")}
          className={`relative flex-1 py-4 text-center transition-colors ${
            isLogin ? "text-white" : "text-slate-400 hover:text-white"
          }`}
        >
          <p className="text-sm font-bold">Log In</p>

          {isLogin && (
            <div className="absolute inset-x-4 bottom-0 h-1 rounded-full bg-primary"></div>
          )}
        </button>

        {/* Sign Up Button */}
        <button
          type="button"
          onClick={() => navigate("/signup")}
          className={`relative flex-1 py-4 text-center transition-colors ${
            isSignup ? "text-white" : "text-slate-400 hover:text-white"
          }`}
        >
          <p className="text-sm font-bold">Sign Up</p>

          {isSignup && (
            <div className="absolute inset-x-4 bottom-0 h-1 rounded-full bg-primary"></div>
          )}
        </button>

      </div>
    </div>
  );
}

export default LoginTab;
