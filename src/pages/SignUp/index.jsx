import React from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { signUpSchema } from "../../utils/zodSchema";
import { useForm } from "react-hook-form";
import Pricing from "./pricing";

export default function signUpPage() {
  const [dataSignUp, setDataSignUp] = React.useState(null);
  const [mode, setMode] = React.useState("AUTH");
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(signUpSchema)
  });

  const onSubmit = (data) => {
    console.log(data);
    setDataSignUp(data);
    setMode("PRICING");
  };

  return (
    <>
      {mode === "AUTH" ? (
        <div className="relative flex flex-col flex-1 p-[10px]">
          <div className="absolute w-[calc(100%-20px)] min-h-[calc(100vh-20px)] h-[calc(100%-20px)] bg-[#fff] -z-10 rounded-[20px]"></div>
          <nav className="flex items-center justify-between p-8 border-b border-black/25 py-4">
            <Navbar />

            <div className="flex items-center space-x-4">
              <Link to="/manager/sign-in">
                <div className="flex items-center justify-center gap-2 rounded-[16px] border px-6 py-3 transition-all duration-300 bg-[#ffffff] border-[#1E40AF] hover:bg-[#f5f5f5dc] hover:border-[#1E40AF]">
                  <span className="font-semibold text-[#1E40AF] whitespace-nowrap ">My Dashboard</span>
                </div>
              </Link>

              {/* <Link to="#">
                <div className="flex items-center justify-center gap-2 rounded-full border px-6 py-3 transition-all duration-300 bg-[#1E40AF] border-[#1E3A8A] hover:bg-[#1D4ED8] hover:border-[#1E40AF] ">
                  <span className="font-semibold text-white whitespace-nowrap">Sign In</span>
                </div>
              </Link> */}
            </div>
          </nav>

          <div className="flex items-start justify-start gap-[109px] mt-5">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col w-[500px] h-fit rounded-[20px] ml-55 border mt-5 border-[#1E40AF] p-[30px] gap-[30px] bg-[#1E40AF]">
              <div>
                <h2 className="font-bold text-[26px] leading-[39px] text-white">Crete Account</h2>
                <p className="text-white/60">Sign up as a Student or Manager based on your role.</p>
              </div>
              <hr className="border-white/60" />
              <div className="flex flex-col gap-2">
                <span className="text-[#fff]">Full Name</span>
                <div className="flex items-center gap-3 w-full rounded-[16px]  p-[14px_20px]  bg-[#728DE5]">
                  <img src="/assets/images/icons/user-white.svg" className="w-6 h-6 flex shrink-0" alt="icon" />
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="appearance-none outline-none !bg-transparent w-full font-semibold text-white placeholder:font-normal placeholder:text-white/60"
                    placeholder="Write your complete name"
                    {...register("name")}
                  />
                </div>
              </div>
              {errors.name?.message && <p className="text-red-500 text-xs -mt-5">{errors.name?.message}</p>}

              <div className="flex flex-col gap-2">
                <span className="text-white">Email Addres</span>
                <div className="flex items-center gap-3 w-full rounded-[16px]  p-[14px_20px]  bg-[#728DE5]">
                  <img src="/assets/images/icons/email-white.svg" className="w-6 h-6 flex shrink-0" alt="icon" />
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="appearance-none outline-none !bg-transparent w-full font-semibold text-white placeholder:font-normal placeholder:text-white/60"
                    placeholder="Write your email address"
                    {...register("email")}
                  />
                </div>
              </div>
              {errors.email?.message && <p className="text-red-500 text-xs -mt-5">{errors.email?.message}</p>}
              <div className="flex flex-col gap-2">
                <span className="text-white">Password</span>
                <div className="flex items-center gap-3 w-full rounded-[16px]  p-[14px_20px]  bg-[#728DE5]">
                  <img src="/assets/images/icons/key-white.svg" className="w-6 h-6 flex shrink-0" alt="icon" />
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="appearance-none outline-none !bg-transparent w-full font-semibold text-white placeholder:font-normal placeholder:text-white/60"
                    placeholder="Type your secure password"
                    {...register("password")}
                  />
                </div>
              </div>
              {errors.password?.message && <p className="text-red-500 text-xs -mt-5">{errors.password?.message}</p>}
              <hr className="border-[#262A56]" />
              <button
                type="submit"
                className="w-full rounded-[16px] border p-[14px_20px] text-center font-semibold text-[#1E40AF] bg-white ">
                Create Account
              </button>
              <div className="text-white/60">
                Already have an account?{" "}
                <Link to="/manager/sign-in" className="text-white hover:underline">
                  <span>Sign In</span>
                </Link>
              </div>
            </form>
            <div className="flex flex-col gap-[10px]">
              <h1 className="font-extrabold text-[46px] leading-[69px] text-black">
                Start Your Learning
                <span className="text-[#1E40AF]"> Journey Today!</span>
              </h1>

              <p className="text-lg leading-[26px] text-black/40 mt-[-15px] mb-12">
                Transform your career with expert-led courses and industry-recognized certifications.
              </p>
              <div className="flex flex-col gap-5 h-fit">
                <div className="flex items-center gap-3 text-white border-2 border-[#1E40AF] p-6 rounded-[12px]">
                  <img
                    src="/assets/images/icons/check-white.svg"
                    className="w-16 h-16 p-1 shrink-0 mr-4 bg-[#1E40AF] rounded-[6px]"
                    alt="icon"
                  />
                  <div className="flex flex-col p-2">
                    <h1 className="text-3xl font-semibold gap-3 text-[#1E40AF]">Premium Content</h1>
                    <h4 className="text-[14px] text-[#1E40AF]">Access 500+ courses from industry experts</h4>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-white border-2 border-[#1E40AF] p-6 rounded-[12px]">
                  <img
                    src="/assets/images/icons/data-white.svg"
                    className="w-16 h-16 p-1 shrink-0 mr-4 bg-[#1E40AF] rounded-[6px]"
                    alt="icon"
                  />
                  <div className="flex flex-col p-2">
                    <h1 className="text-3xl font-semibold gap-3 text-[#1E40AF]">Track Progress</h1>
                    <h4 className="text-[14px] text-[#1E40AF]">Monitor your growth with detailded analytics</h4>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-white border-2 border-[#1E40AF] p-6 rounded-[12px]">
                  <img
                    src="/assets/images/icons/certificate-white.svg"
                    className="w-16 h-16 p-1 shrink-0 mr-4 bg-[#1E40AF] rounded-[6px]"
                    alt="icon"
                  />
                  <div className="flex flex-col p-2">
                    <h1 className="text-3xl font-semibold gap-3 text-[#1E40AF]">Get Certified</h1>
                    <h4 className="text-[14px] text-[#1E40AF]">Earn recognized certificates upon completion</h4>
                  </div>
                </div>
              </div>
              <div className="flex flex-col mt-12 gap-1">
                <div className="flex gap-6 text-[#1E40AF] text-4xl font-extrabold">
                  <h1>50k+</h1>
                  <h1>500+</h1>
                  <h1>95%</h1>
                </div>
                <div className="flex text-black/50 text-sm gap-8 ">
                  <h1>Acitve Student</h1>
                  <h1>courses</h1>
                  <h1>Sastifaction</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Pricing data={dataSignUp} />
      )}
    </>
  );
}
