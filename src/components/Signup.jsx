import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { useForm } from 'react-hook-form'
import { Input, Button } from "./index"
import LoginTab from './LoginTab'

function Signup() {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const create = async (data) => {
        try {
            const userData = await authService.createAccount({ ...data });

            if (userData) {
                const session = await authService.getCurrentUser();
                if (session) {
                    dispatch(login(session));
                    navigate("/");
                }
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background-dark p-6">
            <div className="w-full max-w-md space-y-6">
                <LoginTab />

                <div className="p-6 sm:p-8">
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-2xl font-bold leading-tight tracking-tight text-white">Create an Account</h1>
                            <p className="pt-1 text-base font-normal leading-normal text-slate-400">Join AniRate to start your journey.</p>
                        </div>


                        {error && (
                            <div className="rounded-md bg-red-600/10 border border-red-600/20 px-4 py-2 text-red-300">
                                {error}
                            </div>
                        )}


                        <form onSubmit={handleSubmit(create)} className="space-y-4">

                            <div className="flex flex-col">
                                <label className="pb-2 text-sm font-medium leading-normal text-slate-300">Full Name</label>
                                <Input
                                    className="form-input h-11 w-full rounded-lg border border-white/10 bg-white/10 p-3 text-base text-white placeholder-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/40"
                                    type="text"
                                    placeholder="e.g., AnimeFan123"
                                    {...register("name", { required: true })}
                                />
                            </div>


                            <div className="flex flex-col">
                                <label className="pb-2 text-sm font-medium leading-normal text-slate-300">Email Address</label>
                                <Input
                                    className="form-input h-11 w-full rounded-lg border border-white/10 bg-white/10 p-3 text-base text-white placeholder-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/40"
                                    type="email"
                                    placeholder="you@example.com"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Enter a valid email",
                                        },
                                    })}
                                />
                            </div>


                            <div className="flex flex-col">
                                <label className="pb-2 text-sm font-medium leading-normal text-slate-300">Password</label>
                                <div className="relative">
                                    <Input
                                        className="form-input h-11 w-full rounded-lg border border-white/10 bg-white/10 p-3 pr-10 text-base text-white placeholder-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/40"
                                        type="password"
                                        placeholder="••••••••"
                                        {...register("password", { required: true })}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                                    >
                                    </button>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="flex h-11 w-full items-center justify-center rounded-lg bg-primary px-6 text-base font-bold text-white shadow-lg shadow-primary/20 transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "creating..." : "Create account"}
                            </Button>

                        </form>

                        <p className="text-center text-sm text-slate-400">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="font-medium text-primary hover:underline"
                            >
                                Log in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Signup;
