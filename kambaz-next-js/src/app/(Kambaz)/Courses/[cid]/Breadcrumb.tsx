"use client";
import React from "react";
import { usePathname } from "next/navigation";

export default function Breadcrumb({
  course,
}: {
  course: { _id: string; name: string } | undefined;
}) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean); 

  let section = segments[segments.length - 1];
  if (section === "Table") {
    section = "People";
  }

  const formattedSection =
    section.charAt(0).toUpperCase() + section.slice(1).toLowerCase();

  return (
    <span className="text-secondary">
      {course ? (
        <>
          {course.name}
          {section && section !== course._id ? ` › ${formattedSection}` : ""}
        </>
      ) : (
        "Course"
      )}
    </span>
  );
}
