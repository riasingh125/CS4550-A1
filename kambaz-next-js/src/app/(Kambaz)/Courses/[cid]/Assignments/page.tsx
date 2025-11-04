"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button, Form, InputGroup, ListGroup, InputGroupText } from "react-bootstrap";
import { FaSearch, FaPlus, FaRegEdit } from "react-icons/fa";
import { BsGripVertical, BsThreeDotsVertical } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store";

export default function Assignments() {
  const router = useRouter();
  const { cid } = useParams<{ cid: string }>();
  const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);

  const courseAssignments = assignments.filter((a) => a.course === cid);

  return (
    <div id="wd-assignments" className="p-3">
      {/* Header controls */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <InputGroup style={{ width: "300px" }}>
          <InputGroupText className="bg-white">
            <FaSearch />
          </InputGroupText>
          <Form.Control type="text" placeholder="Search for Assignments" />
        </InputGroup>

        <div>
          <Button variant="secondary" className="me-2">
            <FaPlus className="me-1" /> Group
          </Button>
          {/* ✅ Navigates to AssignmentEditor */}
          <Button
            variant="danger"
            id="wd-add-assignment"
            onClick={() => router.push(`/Courses/${cid}/Assignments/new`)}
          >
            <FaPlus className="me-1" /> Assignment
          </Button>
        </div>
      </div>

      {/* Assignments List */}
      <div className="border rounded mb-3">
        <div className="d-flex justify-content-between align-items-center p-3">
          <div>
            <BsGripVertical className="me-2 fs-4" />
            <IoMdArrowDropdown className="me-2" />
            <strong>ASSIGNMENTS</strong>
          </div>
          <div>
            <span className="border rounded px-2 py-1 me-2">40% of Total</span>
            <FaPlus className="me-3" />
            <BsThreeDotsVertical />
          </div>
        </div>

        <ListGroup className="mt-0" style={{ borderLeft: "4px solid green" }}>
          {courseAssignments.map((a) => (
            <ListGroup.Item key={a._id} className="d-flex align-items-start">
              <BsGripVertical className="me-2 fs-4 mt-1" />
              <FaRegEdit className="me-3 fs-4 mt-1 text-success" />
              <div className="flex-grow-1">
                <Link
                  href={`/Courses/${cid}/Assignments/${a._id}`}
                  className="text-decoration-none text-dark fw-bold"
                >
                  {a.title}
                </Link>
                <div className="small text-muted">
                  <strong>Due</strong> {a.dueDate ?? "TBA"} | {a.points ?? 100} pts
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
