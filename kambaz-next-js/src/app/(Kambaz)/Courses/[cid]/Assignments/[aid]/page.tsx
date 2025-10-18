"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Form, Button, Row, Col } from "react-bootstrap";
import * as db from "../../../../Database"; // imports assignments.json

interface Assignment {
  _id: string;
  title: string;
  course: string;
  description?: string;
  dueDate?: string;
  availableDate?: string;
  points?: number;
}

export default function AssignmentEditor() {
  const { cid, aid } = useParams<{ cid: string; aid: string }>();

  const assignments: Assignment[] = db.assignments;

  const assignment = assignments.find(
    (a) => a._id === aid && a.course === cid
  );

  if (!assignment) {
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

  return (
    <div id="wd-assignments-editor" className="p-3">
      <Form>
        <div className="mb-3">
          <Form.Label htmlFor="wd-name">Assignment Name</Form.Label>
          <Form.Control
            id="wd-name"
            type="text"
            defaultValue={assignment.title}
          />
        </div>

        <div className="mb-3">
          <Form.Control
            id="wd-description"
            as="textarea"
            rows={6}
            defaultValue={
              assignment.description ??
              `This assignment is part of course ${cid}. Please follow all submission requirements.`
            }
          />
        </div>

        <Row className="mb-3">
          <Form.Label column sm={3} htmlFor="wd-points" className="text-end">
            Points
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              id="wd-points"
              type="number"
              defaultValue={assignment.points ?? 100}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Label column sm={3} htmlFor="wd-group" className="text-end">
            Assignment Group
          </Form.Label>
          <Col sm={9}>
            <Form.Select id="wd-group" defaultValue="ASSIGNMENTS">
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              <option value="QUIZZES">QUIZZES</option>
              <option value="EXAMS">EXAMS</option>
              <option value="PROJECT">PROJECT</option>
            </Form.Select>
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Label
            column
            sm={3}
            htmlFor="wd-display-grade-as"
            className="text-end"
          >
            Display Grade as
          </Form.Label>
          <Col sm={9}>
            <Form.Select id="wd-display-grade-as" defaultValue="Percentage">
              <option>Percentage</option>
              <option>Points</option>
              <option>Complete/Incomplete</option>
              <option>Letter Grade</option>
            </Form.Select>
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Label
            column
            sm={3}
            htmlFor="wd-submission-type"
            className="text-end"
          >
            Submission Type
          </Form.Label>
          <Col sm={9}>
            <div className="border rounded p-3">
              <Form.Select
                id="wd-submission-type"
                defaultValue="Online"
                className="mb-3"
              >
                <option>Online</option>
                <option>On Paper</option>
                <option>No Submission</option>
              </Form.Select>

              <div>
                <Form.Label className="fw-bold">Online Entry Options</Form.Label>
                <Form.Check
                  type="checkbox"
                  id="wd-text-entry"
                  label="Text Entry"
                  className="mb-2"
                />
                <Form.Check
                  type="checkbox"
                  id="wd-website-url"
                  label="Website URL"
                  className="mb-2"
                  defaultChecked
                />
                <Form.Check
                  type="checkbox"
                  id="wd-media-recordings"
                  label="Media Recordings"
                  className="mb-2"
                />
                <Form.Check
                  type="checkbox"
                  id="wd-student-annotation"
                  label="Student Annotation"
                  className="mb-2"
                />
                <Form.Check
                  type="checkbox"
                  id="wd-file-upload"
                  label="File Uploads"
                />
              </div>
            </div>
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Label column sm={3} className="text-end">
            Assign
          </Form.Label>
          <Col sm={9}>
            <div className="border rounded p-3">
              <Form.Label htmlFor="wd-assign-to" className="fw-bold">
                Assign to
              </Form.Label>
              <Form.Control
                id="wd-assign-to"
                type="text"
                defaultValue="Everyone"
                className="mb-3"
              />

              <Form.Label htmlFor="wd-due-date" className="fw-bold">
                Due
              </Form.Label>
              <Form.Control
                id="wd-due-date"
                type="text"
                defaultValue={assignment.dueDate ?? "TBA"}
                className="mb-3"
              />

              <Row>
                <Col>
                  <Form.Label
                    htmlFor="wd-available-from"
                    className="fw-bold"
                  >
                    Available from
                  </Form.Label>
                  <Form.Control
                    id="wd-available-from"
                    type="text"
                    defaultValue={assignment.availableDate ?? "TBA"}
                  />
                </Col>
                <Col>
                  <Form.Label htmlFor="wd-available-until" className="fw-bold">
                    Until
                  </Form.Label>
                  <Form.Control
                    id="wd-available-until"
                    type="text"
                    defaultValue="TBA"
                  />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        <hr />
        <div className="d-flex justify-content-end">
          <Link href={`/Courses/${cid}/Assignments`}>
            <Button variant="secondary" className="me-2">
              Cancel
            </Button>
          </Link>
          <Link href={`/Courses/${cid}/Assignments`}>
            <Button variant="danger">Save</Button>
          </Link>
        </div>
      </Form>
    </div>
  );
}
