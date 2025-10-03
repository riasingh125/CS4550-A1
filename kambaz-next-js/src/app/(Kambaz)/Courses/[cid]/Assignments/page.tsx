import Link from "next/link";
import { FaSearch, FaPlus } from "react-icons/fa";
import { BsGripVertical, BsThreeDotsVertical } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { Button, Form, InputGroup } from "react-bootstrap";
import InputGroupText from "react-bootstrap/InputGroupText";

export default function Assignments() {
  return (
    <div id="wd-assignments" className="p-3">
      {/* Search and Action Buttons */}
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

      {/* Assignments Header */}
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

        {/* Assignment List */}
        <ul id="wd-assignment-list" className="list-group mt-0" style={{ borderLeft: "4px solid green" }}>
          <li className="wd-assignment-list-item list-group-item d-flex align-items-start">
            <BsGripVertical className="me-2 fs-4 mt-1" />
            <FaRegEdit className="me-3 fs-4 mt-1 text-success" />
            <div className="flex-grow-1">
              <Link
                href="/Courses/1234/Assignments/123"
                className="wd-assignment-link text-decoration-none text-dark fw-bold"
              >
                A1 - ENV + HTML
              </Link>
              <div className="small text-muted">
                <span className="text-danger">Multiple Modules</span> | <strong>Not available until</strong> May 6 at 12:00am |
              </div>
              <div className="small text-muted">
                <strong>Due</strong> May 13 at 11:59pm | 100 pts
              </div>
            </div>
            <BsThreeDotsVertical className="ms-2" />
          </li>

          <li className="wd-assignment-list-item list-group-item d-flex align-items-start">
            <BsGripVertical className="me-2 fs-4 mt-1" />
            <FaRegEdit className="me-3 fs-4 mt-1 text-success" />
            <div className="flex-grow-1">
              <Link
                href="/Courses/1234/Assignments/124"
                className="wd-assignment-link text-decoration-none text-dark fw-bold"
              >
                A2 - CSS + BOOTSTRAP
              </Link>
              <div className="small text-muted">
                <span className="text-danger">Multiple Modules</span> | <strong>Not available until</strong> May 13 at 12:00am |
              </div>
              <div className="small text-muted">
                <strong>Due</strong> May 20 at 11:59pm | 100 pts
              </div>
            </div>
            <BsThreeDotsVertical className="ms-2" />
          </li>

          <li className="wd-assignment-list-item list-group-item d-flex align-items-start">
            <BsGripVertical className="me-2 fs-4 mt-1" />
            <FaRegEdit className="me-3 fs-4 mt-1 text-success" />
            <div className="flex-grow-1">
              <Link
                href="/Courses/1234/Assignments/125"
                className="wd-assignment-link text-decoration-none text-dark fw-bold"
              >
                A3 - JAVASCRIPT + REACT
              </Link>
              <div className="small text-muted">
                <span className="text-danger">Multiple Modules</span> | <strong>Not available until</strong> May 20 at 12:00am |
              </div>
              <div className="small text-muted">
                <strong>Due</strong> May 27 at 11:59pm | 100 pts
              </div>
            </div>
            <BsThreeDotsVertical className="ms-2" />
          </li>
        </ul>
      </div>
    </div>
  );
}