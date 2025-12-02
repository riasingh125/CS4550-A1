/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { addAssignment, updateAssignment, setAssignments } from "../reducer";
import * as client from "../client";
import { RootState } from "@/app/(Kambaz)/store";

export default function AssignmentEditor() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { cid, aid } = useParams<{ cid: string; aid: string }>();

  const isNew = aid === "new";

  const currentUser = useSelector(
    (state: RootState) => state.accountReducer.currentUser as { role: string } | null
  );
  const isFaculty =
    currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const [assignment, setAssignment] = useState<any>({
    title: "",
    description: "",
    points: 100,
    dueDate: "",
    availableDate: "",
    availableUntil: "",
  });

  useEffect(() => {
    const load = async () => {
      if (!isNew) {
        const data = await client.findAssignmentById(aid);
        setAssignment(data);
      }
    };
    load();
  }, [aid]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (isNew) {
      const newA = await client.createAssignment(cid!, assignment);
      dispatch(addAssignment(newA));
    } else {
      const updated = await client.updateAssignment(aid, assignment);
      dispatch(updateAssignment(updated));
    }

    const refreshed = await client.findAssignmentsForCourse(cid!);
    dispatch(setAssignments(refreshed));

    router.push(`/Courses/${cid}/Assignments`);
  };

  if (!isFaculty) {
    router.push(`/Courses/${cid}/Assignments`);
    return null;
  }

  return (
    <div className="p-3">
      <Form onSubmit={handleSubmit}>
        {/* Title */}
        <Form.Group className="mb-3">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control
            value={assignment.title}
            onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
            required
          />
        </Form.Group>

        {/* Description */}
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            value={assignment.description}
            onChange={(e) =>
              setAssignment({ ...assignment, description: e.target.value })
            }
          />
        </Form.Group>

        {/* Points */}
        <Form.Group className="mb-3">
          <Form.Label>Points</Form.Label>
          <Form.Control
            type="number"
            value={assignment.points}
            onChange={(e) => setAssignment({ ...assignment, points: +e.target.value })}
          />
        </Form.Group>

        {/* Dates */}
        <Row className="mb-3">
          <Col>
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              value={assignment.dueDate}
              onChange={(e) => setAssignment({ ...assignment, dueDate: e.target.value })}
            />
          </Col>

          <Col>
            <Form.Label>Available From</Form.Label>
            <Form.Control
              type="date"
              value={assignment.availableDate}
              onChange={(e) => setAssignment({ ...assignment, availableDate: e.target.value })}
            />
          </Col>

          <Col>
            <Form.Label>Until</Form.Label>
            <Form.Control
              type="date"
              value={assignment.availableUntil}
              onChange={(e) => setAssignment({ ...assignment, availableUntil: e.target.value })}
            />
          </Col>
        </Row>

        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" variant="danger">
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}
