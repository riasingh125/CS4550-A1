/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";

import * as client from "../Courses/client";
import * as enrollClient from "../Enrollments/client";

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

import {
  addNewCourse,
  deleteCourse,
  updateCourse,
  setCourses,
} from "../Courses/reducer";
import {
  enrollIntoCourse,
  unenrollFromCourse,
  } from "../Courses/client";
  
import { enroll, unenroll } from "../Enrollments/reducer";

export default function Dashboard() {
  const dispatch = useDispatch();

  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  ) as { currentUser: { _id: string } | null };

  const userRole = (currentUser as any)?.role;
  const isStudent = userRole === "STUDENT";
  const isFaculty = userRole === "FACULTY";
  const isAdmin = userRole === "ADMIN";
  const isFacultyOrAdmin = isFaculty || isAdmin;

  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>([]);

  const [course, setCourse] = useState({
    _id: "",
    name: "",
    description: "",
  });

  const [showAllCourses, setShowAllCourses] = useState(false);

  const fetchEnrollments = async () => {
    if (!currentUser) return;
    
    try {
      const userEnrollments = await enrollClient.findEnrollmentsByUser(currentUser._id);
      
      const courseIds = userEnrollments.map((e: any) => e.course);
      setEnrolledCourseIds(courseIds);
      
    } catch (error) {
      console.error("Failed to fetch enrollments:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const courses = showAllCourses
        ? await client.fetchAllCourses()
        : await client.findMyCourses();
      
      dispatch(setCourses(courses));
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchCourses();
      fetchEnrollments();
    }
  }, [currentUser, showAllCourses]);

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

  const onUpdateCourse = async () => {
    await client.updateCourse(course);
    dispatch(
      setCourses(
        courses.map((c) => {
          if (c._id === course._id) {
            return course;
          } else {
            return c;
          }
        })
      )
    );
  };

  const onAddNewCourse = async () => {
    try {
      if (!currentUser) {
        alert("You must be signed in to create a course.");
        return;
      }

      const newCourse = await client.createCourse(course);
      dispatch(setCourses([...courses, newCourse]));
    } catch (error: any) {
      console.error("Error creating course:", error.response?.data);
      alert(error.response?.data?.message || "Error creating course.");
    }
  };

  const onDeleteCourse = async (courseId: string) => {
    const status = await client.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((course) => course._id !== courseId)));
  };

  const isUserEnrolled = (courseId: string) => {
    const enrolled = enrolledCourseIds.includes(courseId);
    return enrolled;
  };


  const handleEnrollToggle = async (courseId: string) => {

    
    if (!currentUser) return;
    
    const enrolled = isUserEnrolled(courseId);
    console.log("Currently enrolled?", enrolled);
    
    try {
      if (enrolled) {
        console.log("Unenrolling...");
        await unenrollFromCourse(currentUser._id, courseId);

        setEnrolledCourseIds(prev => prev.filter(id => id !== courseId));
      } else {
        console.log("Enrolling...");
        await enrollIntoCourse(currentUser._id, courseId);

        setEnrolledCourseIds(prev => [...prev, courseId]);
      }

      await fetchCourses();
      
    } catch (error) {
      console.error("Error in handleEnrollToggle:", error);

      await fetchEnrollments();
    }
  };

    const visibleCourses = courses;
        
  return (
    <div id="wd-dashboard">
      <div className="d-flex justify-content-between align-items-center">
        <h1 id="wd-dashboard-title">Dashboard</h1>
        <Button
          variant="info"
          onClick={() => setShowAllCourses(!showAllCourses)}
        >
          {showAllCourses ? "Show Enrolled Only" : "Show All Courses"}
        </Button>
      </div>

      <hr />

      {isFacultyOrAdmin && (
  <>
    <h5>
      New Course
      <button
        onClick={onAddNewCourse}
        className="btn btn-primary float-end"
        id="wd-add-new-course-click"
      >
        Add
      </button>
    </h5>

    <button
      onClick={onUpdateCourse}
      className="btn btn-secondary float-end"
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
  </>
)}


      <h2 id="wd-dashboard-published">
        {visibleCourses.length > 0
          ? `My Courses (${visibleCourses.length})`
          : "You are not enrolled in any courses yet"}
      </h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {visibleCourses.map((course) => (
            <Col
              key={course._id}
              className="wd-dashboard-course"
              style={{ width: "300px" }}
            >
              <Card>
                <Link
                  href={isUserEnrolled(course._id)
                    ? `/Courses/${course._id}/Home`
                    : "/Dashboard"}
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

                    {/* STUDENT View */}
{isStudent && (
  <>
    {isUserEnrolled(course._id) ? (
      <Button
        variant="danger"
        onClick={(e) => {
          e.preventDefault();
          handleEnrollToggle(course._id);
        }}
      >
        Unenroll
      </Button>
    ) : (
      <Button
        variant="success"
        onClick={(e) => {
          e.preventDefault();
          handleEnrollToggle(course._id);
        }}
      >
        Enroll
      </Button>
    )}

    <Button
      variant="primary"
      className="me-2"
      onClick={(e) => {
        e.preventDefault();
        if (isUserEnrolled(course._id)) {
          window.location.href = `/Courses/${course._id}/Home`;
        } else {
          alert("You must enroll to access the course.");
        }
      }}
    >
      Go
    </Button>
  </>
)}

{/* FACULTY / ADMIN View */}
{isFacultyOrAdmin && (
  <>
    <Button
      variant="primary"
      className="me-2"
      onClick={(e) => {
        e.preventDefault();
        window.location.href = `/Courses/${course._id}/Home`;
      }}
    >
      Go
    </Button>

    <button
      className="btn btn-danger"
      onClick={(e) => {
        e.preventDefault();
        onDeleteCourse(course._id);
      }}
    >
      Delete
    </button>

    <button
      className="btn btn-warning me-2 float-end"
      onClick={(e) => {
        e.preventDefault();
        handleEdit(course);
      }}
    >
      Edit
    </button>
  </>
)}

                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
