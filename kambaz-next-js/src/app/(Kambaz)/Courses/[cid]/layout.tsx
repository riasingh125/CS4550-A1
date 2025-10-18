import { ReactNode } from "react";
import { FaAlignJustify } from "react-icons/fa6";
import CourseNavigation from "./Navigation";
import { courses } from "../../Database";
import Breadcrumb from "./Breadcrumb";


export default async function CoursesLayout(
  { children, params }: Readonly<{ children: ReactNode; params: Promise<{ cid: string }> }>
) {
  const { cid } = await params;
  const course = courses.find((course) => course._id === cid);

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course ? course.name : `Course ${cid}`}
      </h2>
      <Breadcrumb course={course} />
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CourseNavigation />
        </div>
        <div className="flex-fill">
          {children}
        </div>
      </div>
    </div>
  );
}
