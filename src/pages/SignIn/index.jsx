import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { useForm } from "react-hook-form";
import { signInSchema } from "../../utils/zodSchema";
import { useMutation } from "@tanstack/react-query";
import { postSignIn } from "../../services/authServices";
import { STRORAGE_KEY } from "../../utils/const";
import secureLocalStorage from "react-secure-storage";
import PropTypes from "prop-types";

export default function SignInPage(type = "manager") {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(signInSchema)
  });

  const { isLoading, mutateAsync } = useMutation({
    mutationFn: (data) => postSignIn(data)
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await mutateAsync(data);

      secureLocalStorage.setItem(STRORAGE_KEY, response.data);

      if (response.data.role === "manager") {
        navigate("/manager");
      } else {
        navigate("/student");
      }
    } catch (error) {
      console.log(error);
    }
    console.log(data);
  };
  return (
    <div className="relative flex flex-col flex-1 p-[10px]">
      <div className="absolute w-[calc(100%-20px)] min-h-[calc(100vh-20px)] h-[calc(100%-20px)] bg-[#fff] -z-10 rounded-[20px]" />

      <nav className="flex items-center justify-between p-8 border-b border-black/25 py-4">
        <Navbar />
        <div className="flex items-center space-x-4">
          <Link to="/manager/sign-up">
            <div className="flex items-center justify-center gap-2 rounded-[16px] border px-6 py-3 transition-all duration-300 bg-[#ffffff] border-[#1E40AF] hover:bg-[#f5f5f5dc] hover:border-[#1E40AF]">
              <span className="font-semibold text-[#1E40AF] whitespace-nowrap">My Dashboard</span>
            </div>
          </Link>
          {type === "manager" && (
            <Link to="/manager/sign-up">
              <div className="flex items-center gap-3 w-fit rounded-full border p-[14px_20px] transition-all duration-300 hover:bg-[#662FFF] hover:border-[#8661EE] hover:shadow-[-10px_-6px_10px_0_#7F33FF_inset] bg-[#662FFF] border-[#8661EE] shadow-[-10px_-6px_10px_0_#7F33FF_inset]">
                <span className="font-semibold text-white">Sign Up</span>
              </div>
            </Link>
          )}
        </div>
      </nav>

      <div className="flex flex-row justify-center items-center gap-[450px] mt-10">
        <div className="flex flex-col gap-4 text-left">
          <h1 className="font-extrabold text-[46px] leading-[69px] text-black">
            Good to see you <span className="text-[#1E40AF]">again!</span>
          </h1>
          <p className="text-lg leading-[26px] text-black/40 mt-[-15px] mb-12">
            Log in to continue your lessons and unlock new achievements.
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-[500px] h-fit rounded-[20px] border border-[#1E40AF] p-[30px] gap-[30px] bg-[#1E40AF]">
          <div>
            <h1 className="font-bold text-[26px] leading-[39px] text-white">Login</h1>
            <p className="text-white/60">Log in based on your role : student or manager</p>
          </div>
          <hr className="border-white/60" />

          <div className="flex flex-col gap-2">
            <span className="text-white">Email Address</span>
            <div className="flex items-center gap-3 w-full rounded-[16px] p-[14px_20px] bg-[#728DE5]">
              <img src="/assets/images/icons/email-white.svg" className="w-6 h-6 shrink-0" alt="icon" />
              <input
                type="email"
                name="email"
                id="email"
                className="appearance-none outline-none !bg-transparent w-full font-semibold text-white placeholder:font-normal placeholder:text-white/60"
                placeholder="Write your email address"
                {...register("email")}
              />
            </div>
            {errors.email?.message && <p className="text-red-500 text-xs">{errors.email?.message}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-white">Password</span>
            <div className="flex items-center gap-3 w-full rounded-[16px] p-[14px_20px] bg-[#728DE5]">
              <img src="/assets/images/icons/key-white.svg" className="w-6 h-6 shrink-0" alt="icon" />
              <input
                type="password"
                name="password"
                id="password"
                className="appearance-none outline-none !bg-transparent w-full font-semibold text-white placeholder:font-normal placeholder:text-white/60"
                placeholder="Type your secure password"
                {...register("password")}
              />
            </div>
            {errors.password?.message && <p className="text-red-500 text-xs">{errors.password?.message}</p>}
            <div className="flex justify-end mt-[10px]">
              <Link to="#" className="text-sm leading-[21px] text-white hover:underline">
                Forgot Password
              </Link>
            </div>
          </div>

          <hr className="border-[#262A56]" />
          <button
            disabled={isLoading}
            type="submit"
            className="w-full rounded-[16px] border p-[14px_20px] text-center font-semibold text-[#1E40AF] bg-white">
            Sign In to {type === "manager" ? "Manager" : ""}
          </button>
        </form>
      </div>
    </div>
  );
}

SignInPage.propTypes = {
  type: PropTypes.string
};
