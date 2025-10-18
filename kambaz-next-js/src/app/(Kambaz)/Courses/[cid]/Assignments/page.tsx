"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Button, Form, InputGroup, ListGroup } from "react-bootstrap";
import InputGroupText from "react-bootstrap/InputGroupText";
import { FaSearch, FaPlus, FaRegEdit } from "react-icons/fa";
import { BsGripVertical, BsThreeDotsVertical } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import * as db from "../../../Database"; // imports assignments.json

// ✅ Define types
interface Assignment {
  _id: string;
  title: string;
  course: string;
  dueDate?: string;
  availableDate?: string;
  points?: number;
}

export default function Assignments() {
  const { cid } = useParams<{ cid: string }>();
  const assignments: Assignment[] = db.assignments;

  const courseAssignments = assignments.filter((a) => a.course === cid);

  return (
    <div id="wd-assignments" className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <InputGroup style={{ width: "300px" }}>
          <InputGroupText className="bg-white">
            <FaSearch />
          </InputGroupText>
          <Form.Control
            type="text"
            placeholder="Search for Assignments"
            id="wd-search-assignment"
          />
        </InputGroup>

        <div>
          <Button variant="secondary" className="me-2" id="wd-add-assignment-group">
            <FaPlus className="me-1" /> Group
          </Button>
          <Button variant="danger" id="wd-add-assignment">
            <FaPlus className="me-1" /> Assignment
          </Button>
        </div>
      </div>

      <div className="border rounded mb-3">
        <div className="d-flex justify-content-between align-items-center p-3">
          <div>
            <BsGripVertical className="me-2 fs-4" />
            <IoMdArrowDropdown className="me-2" />
            <strong id="wd-assignments-title">ASSIGNMENTS</strong>
          </div>
          <div>
            <span className="border rounded px-2 py-1 me-2">40% of Total</span>
            <FaPlus className="me-3" />
            <BsThreeDotsVertical />
          </div>
        </div>

        <ListGroup
          id="wd-assignment-list"
          className="mt-0"
          style={{ borderLeft: "4px solid green" }}
        >
          {courseAssignments.map((assignment) => (
            <ListGroup.Item
              key={assignment._id}
              className="wd-assignment-list-item d-flex align-items-start"
            >
              <BsGripVertical className="me-2 fs-4 mt-1" />
              <FaRegEdit className="me-3 fs-4 mt-1 text-success" />
              <div className="flex-grow-1">
                <Link
                  href={`/Courses/${cid}/Assignments/${assignment._id}`}
                  className="wd-assignment-link text-decoration-none text-dark fw-bold"
                >
                  {assignment.title}
                </Link>
                <div className="small text-muted">
                  <span className="text-danger">Multiple Modules</span>{" "}
                  | <strong>Not available until</strong>{" "}
                  {assignment.availableDate ?? "TBA"} |
                </div>
                <div className="small text-muted">
                  <strong>Due</strong> {assignment.dueDate ?? "TBA"} |{" "}
                  {assignment.points ?? 100} pts
                </div>
              </div>
              <BsThreeDotsVertical className="ms-2" />
            </ListGroup.Item>
          ))}

          {courseAssignments.length === 0 && (
            <ListGroup.Item className="text-muted">
              No assignments available for this course.
            </ListGroup.Item>
          )}
        </ListGroup>
      </div>
    </div>
  );
}
