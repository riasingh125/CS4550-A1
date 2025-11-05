"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addAssignment, updateAssignment } from "../../Assignments/reducer";
import type { RootState } from "../../../../store";

export default function AssignmentEditor() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { cid, aid } = useParams<{ cid: string; aid: string }>();
  const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);

  const existing = assignments.find((a) => a._id === aid && a.course === cid);
  const isNew = aid === "new";

  // ⚙️ When user submits the form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const assignmentData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      points: Number(formData.get("points")),
      dueDate: formData.get("dueDate") as string,
      availableDate: formData.get("availableDate") as string,
      availableUntil: formData.get("availableUntil") as string,
      course: cid!,
    };

    if (isNew) {
      dispatch(addAssignment(assignmentData));
    } else {
      dispatch(updateAssignment({ ...existing, ...assignmentData }));
    }

    router.push(`/Courses/${cid}/Assignments`);
  };

  // ⚠️ Invalid ID handling
  if (!existing && !isNew) {
    return (
      <div className="p-3 text-danger">
        <h4>Assignment not found</h4>
        <p>
          No assignment with ID <strong>{aid}</strong> exists for course{" "}
          <strong>{cid}</strong>.
        </p>
        <Link href={`/Courses/${cid}/Assignments`}>
          <Button variant="secondary">Back to Assignments</Button>
        </Link>
      </div>
    );
  }

  // 🧱 Fallback for new assignment (empty defaults)
  const assignment = existing || {
    title: "",
    description: "",
    points: 100,
    dueDate: "",
    availableDate: "",
    availableUntil: "",
  };

  return (
    <div id="wd-assignments-editor" className="p-3">
      <Form onSubmit={handleSubmit}>
        {/* 📝 Title */}
        <Form.Group className="mb-3">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control
            name="title"
            type="text"
            defaultValue={assignment.title}
            required
          />
        </Form.Group>

        {/* 📄 Description */}
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="description"
            as="textarea"
            rows={5}
            defaultValue={assignment.description}
          />
        </Form.Group>

        {/* 💯 Points */}
        <Form.Group className="mb-3">
          <Form.Label>Points</Form.Label>
          <Form.Control
            name="points"
            type="number"
            defaultValue={assignment.points}
          />
        </Form.Group>

        {/* 📅 Dates */}
        <Row className="mb-3">
          <Col>
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              name="dueDate"
              type="date"
              defaultValue={assignment.dueDate}
            />
          </Col>
          <Col>
            <Form.Label>Available From</Form.Label>
            <Form.Control
              name="availableDate"
              type="date"
              defaultValue={assignment.availableDate}
            />
          </Col>
          <Col>
            <Form.Label>Until</Form.Label>
            <Form.Control
              name="availableUntil"
              type="date"
              defaultValue={assignment.availableUntil}
            />
          </Col>
        </Row>

        <hr />
        {/* ✅ Buttons */}
        <div className="d-flex justify-content-end">
          <Button
            variant="secondary"
            className="me-2"
            onClick={() => router.push(`/Courses/${cid}/Assignments`)}
          >
            Cancel
          </Button>
          <Button variant="danger" type="submit">
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}
