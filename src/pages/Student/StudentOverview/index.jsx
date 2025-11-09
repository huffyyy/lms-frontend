import React from "react";
import CardCourse from "./CardCourse";
import { useLoaderData } from "react-router-dom";

export default function StudentPage() {
  const courses = useLoaderData();

  console.log(courses);

  return (
    <section id="LatestCourse" className="flex flex-col rounded-[30px] p-[30px] gap-[30px] bg-[#F8FAFB]">
      <h2 className="font-extrabold text-[22px] leading-[33px]">Latest Courses</h2>
      {courses?.map((item) => (
        <CardCourse key={item._id} category={item.category.name} title={item.name} id={item._id} imageUrl={item.thumbnail_url} />
      ))}
    </section>
  );
}
