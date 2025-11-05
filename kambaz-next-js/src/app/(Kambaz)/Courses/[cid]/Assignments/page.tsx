"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button, Form, InputGroup, ListGroup, Modal } from "react-bootstrap";
import { FaSearch, FaPlus, FaRegEdit, FaTrash } from "react-icons/fa";
import { BsGripVertical, BsThreeDotsVertical } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../../store";
import { useState } from "react";
import { deleteAssignment } from "../Assignments/reducer";

export default function Assignments() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { cid } = useParams<{ cid: string }>();
  const { assignments } = useSelector(
    (state: RootState) => state.assignmentsReducer
  ) as { assignments: Assignment[] };

  interface Assignment {
    _id: string;
    title: string;
    course: string;
    dueDate?: string;
    points?: number;
    description?: string;
  }

  // Filter assignments for this course
  const courseAssignments = assignments.filter((a) => a.course === cid);

  // State for delete confirmation dialog
  const [showDelete, setShowDelete] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);

  const handleDeleteClick = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setShowDelete(true);
  };

  const confirmDelete = () => {
    if (selectedAssignment) {
      dispatch(deleteAssignment(selectedAssignment._id));
    }
    setShowDelete(false);
    setSelectedAssignment(null);
  };

  const cancelDelete = () => {
    setShowDelete(false);
    setSelectedAssignment(null);
  };

  return (
    <div id="wd-assignments" className="p-3">
      {/* Header controls */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <InputGroup style={{ width: "300px" }}>
          <InputGroup.Text className="bg-white">
            <FaSearch />
          </InputGroup.Text>
          <Form.Control type="text" placeholder="Search for Assignments" />
        </InputGroup>

        <div>
          <Button variant="secondary" className="me-2">
            <FaPlus className="me-1" /> Group
          </Button>
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
            <ListGroup.Item key={a._id} className="d-flex align-items-start justify-content-between">
              <div className="d-flex align-items-start">
                <BsGripVertical className="me-2 fs-4 mt-1" />
                <FaRegEdit className="me-3 fs-4 mt-1 text-success" />
                <div>
                  <Link
                    href={`/Courses/${cid}/Assignments/${a._id}`}
                    className="text-decoration-none text-dark fw-bold"
                  >
                    {a.title}
                  </Link>
                  <div className="small text-muted mb-1">
                    <strong>Due</strong> {a.dueDate ?? "TBA"} | {a.points ?? 100} pts
                  </div>
                  {a.description && (
                    <div className="text-muted small" style={{ whiteSpace: "pre-wrap" }}>
                      {a.description}
                    </div>
                  )}
                </div>
              </div>

              {/* 🗑️ Delete button */}
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => handleDeleteClick(a)}
              >
                <FaTrash />
              </Button>
            </ListGroup.Item>
          ))}

          {courseAssignments.length === 0 && (
            <ListGroup.Item className="text-muted">
              No assignments available for this course.
            </ListGroup.Item>
          )}
        </ListGroup>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal show={showDelete} onHide={cancelDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to remove{" "}
          <strong>{selectedAssignment?.title}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
