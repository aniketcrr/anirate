import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { login as storeLogin } from "./../store/authSlice";
import authService from "./../appwrite/auth";
import { Input, Button } from "./index";
import LoginTab from "./LoginTab";

function Login() {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const guestLogin = async () => {
        try {
            const session = await authService.login({
                email: "guest@anirate.com",
                password: "guest1234",
            });

            if (session) {
                dispatch(storeLogin(session));
                navigate("/");
            }
        } catch (error) {
            console.log(error);
            setError("Guest login failed.");
        }
    };


    const onSubmit = async (data) => {
        setError("");
        try {
            const session = await authService.login({ ...data });
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(storeLogin(userData));
                    navigate("/");
                }
            }
        } catch (err) {
            setError(err?.message || "Login failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background-dark p-4">
            <div className="w-full max-w-md">

                <div className="rounded-xl bg-card-dark shadow-xl shadow-black/20">
                    <LoginTab />
                    <div className="p-6 sm:p-8">
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
                                <p className="pt-1 text-base text-slate-400">Log in to continue your journey.</p>
                            </div>

                            {error && <p className="text-sm text-red-400">{error}</p>}

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div className="flex flex-col">
                                    <Input
                                        label="Email : "
                                        placeholder="enter your email"
                                        className="form-input h-11 w-full rounded-lg border border-white/10 bg-white/10 p-3 text-base text-white placeholder-slate-400 focus:border-primary focus:outline-0 focus:ring-2 focus:ring-primary/40"
                                        type="email"
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: "Enter a valid email",
                                            },
                                        })}
                                    />
                                    {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
                                </div>

                                <div className="flex flex-col">
                                    <Input
                                        label="Password :"
                                        type="password"
                                        placeholder="enter your password"
                                        className="form-input h-11 w-full rounded-lg border border-white/10 bg-white/10 p-3 pr-10 text-base text-white placeholder-slate-400 focus:border-primary focus:outline-0 focus:ring-2 focus:ring-primary/40"
                                        {...register("password", { required: "Password is required" })}
                                    />
                                    {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password.message}</p>}
                                </div>

                                <div>
                                    <Button
                                        className="flex h-11 w-full items-center justify-center rounded-lg bg-primary px-6 text-base font-bold text-white shadow-lg shadow-primary/20 transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-card-dark disabled:opacity-60"
                                        type="submit"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? "Logging in..." : "Log In"}
                                    </Button>

                                    <button
                                        type="button"
                                        onClick={guestLogin}
                                        className="w-full mt-3 px-6 py-2 rounded-lg bg-white/10 text-white font-semibold hover:bg-white/20 transition"
                                    >
                                        Login as Guest
                                    </button>


                                </div>
                            </form>

                            <p className="text-center text-sm text-slate-400">
                                Don't have an account?{" "}
                                <Link
                                    to="/signup"
                                    className="font-medium text-primary hover:underline"
                                >
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
