import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Students from "../pages/Manager/home/students";
import Courses from "../pages/Manager/home/courses";
import { Outlet, useMatch } from "react-router-dom";

export default function LayoutDashboard({ isAdmin = true }) {
  const isManagerPreviewPage = useMatch("/manager/courses/:id/preview");
  const isStudentPreviewPage = useMatch("/student/detail-course/:id");

  const isPreviewPage = isManagerPreviewPage || isStudentPreviewPage;

  return (
    <>
      {isPreviewPage ? (
        <Outlet />
      ) : (
        <div className="flex min-h-screen">
          <Sidebar isAdmin={isAdmin} />
          <main className="flex flex-col flex-1 gap-[30px] p-[30px] ml-[290px]">
            <Header />
            <Outlet />
          </main>
        </div>
      )}
    </>
  );
}
