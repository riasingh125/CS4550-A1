"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import * as db from "../Database";
import { RootState } from "../store";
import {
  CardImg,
  CardText,
  CardTitle,
  Row,
  Col,
  CardBody,
  Button,
  Card,
  FormControl,
} from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewCourse,
  deleteCourse,
  updateCourse,
} from "../Courses/reducer";
import { enroll, unenroll } from "../Enrollments/reducer"; // ✅ new import
import Image from "next/image"; 

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const dispatch = useDispatch();

  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  ) as { currentUser: { _id: string } | null };

  // ✅ use Redux enrollments (not db)
  const { enrollments } = useSelector(
    (state: RootState) => state.enrollmentsReducer
  ) as { enrollments: { _id: string; user: string; course: string }[] };

  const [showAllCourses, setShowAllCourses] = useState(false);

  const [course, setCourse] = useState({
    _id: "",
    name: "",
    description: "",
  });

  const handleAdd = () => {
    const newCourse = { ...course, _id: uuidv4() };
    dispatch(addNewCourse(newCourse));
    setCourse({ _id: "", name: "", description: "" });
  };

  const handleUpdate = () => {
    dispatch(updateCourse(course));
    setCourse({ _id: "", name: "", description: "" });
  };

  const handleEdit = (selectedCourse: typeof course) => {
    setCourse(selectedCourse);
  };

  const handleDelete = (courseId: string) => {
    dispatch(deleteCourse(courseId));
  };

  // ✅ Enrollment logic
  const isEnrolled = (courseId: string) =>
    enrollments.some(
      (e) => e.user === currentUser?._id && e.course === courseId
    );

  const toggleEnrollment = (courseId: string, enrolled: boolean) => {
    if (!currentUser) return;
    if (enrolled)
      dispatch(unenroll({ user: currentUser._id, course: courseId }));
    else dispatch(enroll({ user: currentUser._id, course: courseId }));
  };

  // ✅ Filter based on toggle
  const visibleCourses = showAllCourses
    ? courses
    : courses.filter((c) => isEnrolled(c._id));

  // ✅ Optional auto-switch if no enrollments
  useEffect(() => {
    if (!showAllCourses && visibleCourses.length === 0) {
      setShowAllCourses(true);
    }
  }, [visibleCourses]);

  return (
    <div id="wd-dashboard">
      {/* ✅ Top bar with Enrollments toggle */}
      <div className="d-flex justify-content-between align-items-center">
        <h1 id="wd-dashboard-title">Dashboard</h1>
        <Button
          variant="primary"
          onClick={() => setShowAllCourses(!showAllCourses)}
        >
          {showAllCourses ? "My Enrollments" : "All Courses"}
        </Button>
      </div>

      <hr />

      {/* === Existing Faculty Controls (unchanged) === */}
      <h5>
        New Course
        <button
          className="btn btn-primary float-end"
          id="wd-add-new-course-click"
          onClick={handleAdd}
        >
          Add
        </button>
      </h5>

      <button
        className="btn btn-warning float-end me-2"
        onClick={handleUpdate}
        id="wd-update-course-click"
      >
        Update
      </button>

      <br />
      <FormControl
        value={course.name}
        className="mb-2"
        placeholder="Course Name"
        onChange={(e) => setCourse({ ...course, name: e.target.value })}
      />
      <FormControl
        as="textarea"
        rows={3}
        value={course.description}
        placeholder="Course Description"
        onChange={(e) =>
          setCourse({ ...course, description: e.target.value })
        }
      />
      <hr />

      {/* ✅ Change heading dynamically */}
      <h2 id="wd-dashboard-published">
        {showAllCourses
          ? `All Courses (${visibleCourses.length})`
          : visibleCourses.length > 0
          ? `My Courses (${visibleCourses.length})`
          : "You are not enrolled in any courses yet"}
      </h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {visibleCourses.map((course) => {
            const enrolled = isEnrolled(course._id);
            return (
              <Col
                key={course._id}
                className="wd-dashboard-course"
                style={{ width: "300px" }}
              >
                <Card>
                  {/* Protect route: disable Go if not enrolled */}
                  <Link
                    href={
                      enrolled
                        ? `/Courses/${course._id}/Home`
                        : "/Dashboard"
                    }
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
                    <CardImg
                      src="/images/reactjs.png"
                      variant="top"
                      width="100%"
                      height={160}
                    />
                    <CardBody className="card-body">
                      <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        {course.name}
                      </CardTitle>
                      <CardText
                        className="wd-dashboard-course-description overflow-hidden"
                        style={{ height: "100px" }}
                      >
                        {course.description}
                      </CardText>
                      {/* ✅ Enroll / Unenroll buttons */}
                      {currentUser && (
                        <Button
                          variant={enrolled ? "danger" : "success"}
                          onClick={(event) => {
                            event.preventDefault();
                            toggleEnrollment(course._id, enrolled);
                          }}
                        >
                          {enrolled ? "Unenroll" : "Enroll"}
                        </Button>
                      )}
                      {/* === Existing Faculty Buttons (unchanged) === */}
                      <Button variant="primary" className="ms-2">
                        Go
                      </Button>
                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          handleDelete(course._id);
                        }}
                        className="btn btn-danger float-end"
                        id="wd-delete-course-click"
                      >
                        Delete
                      </button>
                      <button
                        id="wd-edit-course-click"
                        onClick={(event) => {
                          event.preventDefault();
                          handleEdit(course);
                        }}
                        className="btn btn-warning me-2 float-end"
                      >
                        Edit
                      </button>
                    </CardBody>
                  </Link>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}
