import Link from "next/link";
import { Form, Button, Row, Col } from "react-bootstrap";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor" className="p-3">
      <Form>
        {/* Assignment Name */}
        <div className="mb-3">
          <Form.Label htmlFor="wd-name">Assignment Name</Form.Label>
          <Form.Control
            id="wd-name"
            type="text"
            defaultValue="A1 - ENV + HTML"
          />
        </div>

        {/* Description */}
        <div className="mb-3">
          <Form.Control
            id="wd-description"
            as="textarea"
            rows={6}
            defaultValue={`The assignment is available online

Submit a link to the landing page of your Web application running on Netlify.

The landing page should include the following:
• Your full name and section
• Links to each of the lab assignments
• Link to the Kanbaz application
• Links to all relevant source code repositories

The Kanbaz application should include a link to navigate back to the landing page.`}
          />
        </div>

        {/* Points */}
        <Row className="mb-3">
          <Form.Label column sm={3} htmlFor="wd-points" className="text-end">
            Points
          </Form.Label>
          <Col sm={9}>
            <Form.Control id="wd-points" type="number" defaultValue={100} />
          </Col>
        </Row>

        {/* Assignment Group */}
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

        {/* Display Grade as */}
        <Row className="mb-3">
          <Form.Label column sm={3} htmlFor="wd-display-grade-as" className="text-end">
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

        {/* Submission Type */}
        <Row className="mb-3">
          <Form.Label column sm={3} htmlFor="wd-submission-type" className="text-end">
            Submission Type
          </Form.Label>
          <Col sm={9}>
            <div className="border rounded p-3">
              <Form.Select id="wd-submission-type" defaultValue="Online" className="mb-3">
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

        {/* Assign */}
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
                type="datetime-local"
                defaultValue="2024-05-13T23:59"
                className="mb-3"
              />

              <Row>
                <Col>
                  <Form.Label htmlFor="wd-available-from" className="fw-bold">
                    Available from
                  </Form.Label>
                  <Form.Control
                    id="wd-available-from"
                    type="datetime-local"
                    defaultValue="2024-05-06T00:00"
                  />
                </Col>
                <Col>
                  <Form.Label htmlFor="wd-available-until" className="fw-bold">
                    Until
                  </Form.Label>
                  <Form.Control
                    id="wd-available-until"
                    type="datetime-local"
                    defaultValue="2024-05-20T23:59"
                  />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        {/* Action Buttons */}
        <hr />
        <div className="d-flex justify-content-end">
          <Link href="/Courses/1234/Assignments">
            <Button variant="secondary" className="me-2">
              Cancel
            </Button>
          </Link>
          <Button variant="danger">Save</Button>
        </div>
      </Form>
    </div>
  );
}