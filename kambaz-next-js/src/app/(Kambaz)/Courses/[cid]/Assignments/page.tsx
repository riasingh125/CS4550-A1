/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button, Form, InputGroup, ListGroup, Modal } from "react-bootstrap";
import { FaSearch, FaPlus, FaRegEdit, FaTrash } from "react-icons/fa";
import { BsGripVertical, BsThreeDotsVertical } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store";

import { setAssignments, deleteAssignment as deleteRedux } from "./reducer";
import * as client from "./client";

export default function Assignments() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { cid } = useParams<{ cid: string }>();

  const { assignments } = useSelector(
    (state: RootState) => state.assignmentsReducer
  );

  useEffect(() => {
    const load = async () => {
      const data = await client.findAssignmentsForCourse(cid!);
      dispatch(setAssignments(data));
    };
    load();
  }, [cid]);

  const [showDelete, setShowDelete] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  const confirmDelete = async () => {
    await client.deleteAssignment(selected._id);
    dispatch(deleteRedux(selected._id));
    setShowDelete(false);
  };

  const courseAssignments = assignments.filter((a) => a.course === cid);

  return (
    <div id="wd-assignments" className="p-3">
      {/* TOP CONTROLS */}
      <div className="d-flex justify-content-between mb-3">
        <InputGroup style={{ width: 300 }}>
          <InputGroup.Text><FaSearch /></InputGroup.Text>
          <Form.Control placeholder="Search" />
        </InputGroup>

        <Button
          variant="danger"
          onClick={() => router.push(`/Courses/${cid}/Assignments/new`)}
        >
          <FaPlus /> Assignment
        </Button>
      </div>

      {/* LIST */}
      <div className="border rounded">
        <div className="d-flex justify-content-between p-3">
          <div>
            <BsGripVertical className="me-2" />
            <IoMdArrowDropdown className="me-2" />
            <strong>ASSIGNMENTS</strong>
          </div>
          <BsThreeDotsVertical />
        </div>

        <ListGroup>
          {courseAssignments.map((a) => (
            <ListGroup.Item key={a._id} className="d-flex justify-content-between">
              <div className="d-flex">
                <BsGripVertical className="me-2" />
                <FaRegEdit className="text-success me-3" />
                <div>
                  <Link href={`/Courses/${cid}/Assignments/${a._id}`}>{a.title}</Link>
                  <div className="small text-muted">
                    Due {a.dueDate ?? "TBA"} | {a.points ?? 100} pts
                  </div>
                </div>
              </div>
              <Button variant="outline-danger" size="sm" onClick={() => { setSelected(a); setShowDelete(true); }}>
                <FaTrash />
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>

      <Modal show={showDelete} onHide={() => setShowDelete(false)} centered>
        <Modal.Header closeButton><Modal.Title>Delete Assignment</Modal.Title></Modal.Header>
        <Modal.Body>
          Are you sure you want to delete <strong>{selected?.title}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowDelete(false)}>Cancel</Button>
          <Button variant="danger" onClick={confirmDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
