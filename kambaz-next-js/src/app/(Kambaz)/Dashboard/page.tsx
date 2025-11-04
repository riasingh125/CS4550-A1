"use client";
import { useState } from "react";
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
import Image from "next/image"; 

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state: RootState) => state.accountReducer) as { currentUser: { _id: string } | null };
  const { enrollments } = db;

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

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

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

      <h2 id="wd-dashboard-published">
        Published Courses ({courses.length})
      </h2>
      <hr />

      
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
        {courses .map((course) => (
            <Col
              key={course._id}
              className="wd-dashboard-course"
              style={{ width: "300px" }}
            >
              <Card>
                <Link
                  href={`/Courses/${course._id}/Home`}
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
                    <Button variant="primary">Go</Button>
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
          ))}
        </Row>
      </div>
    </div>
  );
}
