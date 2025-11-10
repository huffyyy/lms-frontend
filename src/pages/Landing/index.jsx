import React from "react";
import { Link } from "react-router-dom";
import { Play, Video, Users } from "lucide-react";
import Navbar from "../../components/Navbar";

export default function LandingPage() {
  const features = [
    {
      icon: <Video className="w-6 h-6 text-indigo-500" />,
      title: "Expert-Led Courses",
      desc: "Learn from professionals with years of real-world experience and proven track records."
    },
    {
      icon: <Play className="w-6 h-6 text-indigo-500" />,
      title: "Hands-On Learning",
      desc: "Practice what you learn through real projects and guided lessons to sharpen your skills."
    },
    {
      icon: <Users className="w-6 h-6 text-indigo-500" />,
      title: "Community Support",
      desc: "Join a vibrant network of learners and grow together through collaboration."
    }
  ];

  return (
    <>
      <header className="w-full fixed top-0 left-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Navbar />
          <Link to="/manager/sign-up">
            <div className="flex items-center justify-center gap-2 rounded-[16px] border px-6 py-3 transition-all duration-300 bg-[#ffffff] border-[#1E40AF] hover:bg-[#f5f5f5dc] hover:border-[#1E40AF]">
              <span className="font-semibold text-[#1E40AF] whitespace-nowrap ">My Dashboard</span>
            </div>
          </Link>
        </div>
      </header>

      <section className="pt-28 pb-20 text-center bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            Master New Skills with <span className="text-[#1E40AF]">Expert Guidance</span>
          </h1>
          <p className="text-gray-500 mt-6 text-lg">
            Join thousands of learners worldwide. Access premium courses, earn certifications, and accelerate your career growth.
          </p>

          <Link
            to="/manager/sign-up"
            className="inline-block mt-10 px-8 py-4 bg-[#1E40AF] hover:bg-[#1e40af94] text-white font-semibold rounded-xl shadow-md transition-all">
            Get Started Now
          </Link>
        </div>
      </section>

      <section className="py-16 bg-gray-50 text-center">
        <div className="flex flex-wrap justify-center gap-10">
          <div>
            <h3 className="text-4xl font-bold text-[#1E40AF]">50k+</h3>
            <p className="text-gray-500 mt-1">Active Students</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-[#1E40AF]">500+</h3>
            <p className="text-gray-500 mt-1">Courses</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-[#1E40AF]">95%</h3>
            <p className="text-gray-500 mt-1">Satisfaction</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Platform</h2>
          <p className="text-gray-500 mb-12">Everything you need to succeed in your learning journey</p>

          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-50 mb-6 group-hover:bg-indigo-100 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-10 bg-gray-50 border-t border-gray-200 text-center">
        <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Learnify. All rights reserved.</p>
      </footer>
    </>
  );
}
