import React, { useState } from "react";
import Header from "../../../components/Header";
import ContentText from "./content-text";
import ContentVideo from "./content-video";
import { Link, useLoaderData, useParams, useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

export default function ManageCoursePreviewPage({ isAdmin = true }) {
  const course = useLoaderData();
  const { id } = useParams();
  const location = useLocation();

  const [activeContent, setActiveContent] = useState(course?.details?.[0]);

  const handleChangeContent = (content) => {
    setActiveContent(content);
  };

  const handleNextContent = (content) => {
    const currIndex = course?.details?.findIndex((val) => val._id === content._id);
    if (currIndex < course?.details?.length - 1) {
      handleChangeContent(course.details[currIndex + 1]);
    }
  };

  const isActive = (item) => activeContent?._id === item._id;

  return (
    <div className="flex min-h-screen">
      <aside className="sidebar-container fixed h-[calc(100vh-20px)] w-full max-w-[330px] my-[10px] ml-[10px] bg-[#1E40AF] overflow-hidden flex flex-1 rounded-[20px]">
        <div className="scroll-container flex w-full overflow-y-scroll hide-scrollbar">
          <nav className="flex flex-col w-full h-fit p-[30px] gap-[30px] z-10">
            <Link to={isAdmin ? `/manager/courses/${id}` : "/student"} className="font-semibold text-white hover:underline">
              <span>Back to Dashboard</span>
            </Link>

            <h2 className="font-bold text-xl leading-[34px] text-white">{course?.name}</h2>

            <ul className="flex flex-col gap-4">
              {course?.details?.map((item) => (
                <li key={item._id}>
                  <button type="button" className="w-full text-left" onClick={() => handleChangeContent(item)}>
                    <div
                      className={`
                        flex items-center gap-3 w-full rounded-[16px] border p-[14px_20px]
                        transition-all duration-300 border-white
                        ${isActive(item) ? "bg-white text-[#1E40AF]" : "bg-[#1E40AF] text-white hover:bg-[#ffffff1a]"}
                      `}>
                      <img
                        src={`/assets/images/icons/3dcube-${isActive(item) ? "blue" : "white"}.svg`}
                        className="w-6 h-6"
                        alt="icon"
                      />
                      {item.title}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      <main className="flex flex-col flex-1 gap-[30px] p-[30px] ml-[340px]">
        <Header type={isAdmin ? "manager" : "student"} />
        <div className="relative flex flex-col gap-[26px]">
          {activeContent?.type === "text" ? (
            <ContentText content={activeContent} handleNext={handleNextContent} />
          ) : (
            <ContentVideo content={activeContent} handleNext={handleNextContent} />
          )}
        </div>
      </main>
    </div>
  );
}
