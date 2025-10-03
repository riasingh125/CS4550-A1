"use client";

import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";

export default function Modules() {
  return (
    <div id="wd-modules-page" className="p-3">
      {/* Top Controls */}
      <ModulesControls />
      <br />
      <br />

      {/* Module List */}
      <ListGroup id="wd-modules" className="rounded-0">

        {/* Module 1 */}
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          {/* Module Title */}
          <div className="wd-title p-3 ps-2 bg-secondary text-white fw-bold">
            <BsGripVertical className="me-2 fs-3" />
            Week 1, Lecture 1 - Course Introduction, Syllabus, Agenda
            <ModuleControlButtons />
          </div>

          {/* Lessons */}
          <ListGroup className="wd-lessons rounded-0">

            {/* Lesson: Learning Objectives */}
            <ListGroupItem className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              LEARNING OBJECTIVES
              <LessonControlButtons />
            </ListGroupItem>
            <ListGroup className="wd-content rounded-0">
              <ListGroupItem className="wd-content-item p-3 ps-5">
                <BsGripVertical className="me-2 fs-3" />
                Introduction to the course <LessonControlButtons />
              </ListGroupItem>
              <ListGroupItem className="wd-content-item p-3 ps-5">
                <BsGripVertical className="me-2 fs-3" />
                Learn what is Web Development <LessonControlButtons />
              </ListGroupItem>
            </ListGroup>

            {/* Lesson: Reading */}
            <ListGroupItem className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              READING
              <LessonControlButtons />
            </ListGroupItem>
            <ListGroup className="wd-content rounded-0">
              <ListGroupItem className="wd-content-item p-3 ps-5">
                <BsGripVertical className="me-2 fs-3" />
                Full Stack Developer - Chapter 1 - Introduction <LessonControlButtons />
              </ListGroupItem>
              <ListGroupItem className="wd-content-item p-3 ps-5">
                <BsGripVertical className="me-2 fs-3" />
                Full Stack Developer - Chapter 2 - Creating User <LessonControlButtons />
              </ListGroupItem>
            </ListGroup>

            {/* Lesson: Slides */}
            <ListGroupItem className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              SLIDES
              <LessonControlButtons />
            </ListGroupItem>
            <ListGroup className="wd-content rounded-0">
              <ListGroupItem className="wd-content-item p-3 ps-5">
                <BsGripVertical className="me-2 fs-3" />
                Introduction to Web Development <LessonControlButtons />
              </ListGroupItem>
              <ListGroupItem className="wd-content-item p-3 ps-5">
                <BsGripVertical className="me-2 fs-3" />
                Creating an HTTP server with Node.js <LessonControlButtons />
              </ListGroupItem>
              <ListGroupItem className="wd-content-item p-3 ps-5">
                <BsGripVertical className="me-2 fs-3" />
                Creating a React Application <LessonControlButtons />
              </ListGroupItem>
            </ListGroup>
          </ListGroup>
        </ListGroupItem>

        {/* Module 2 */}
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary text-white fw-bold">
            <BsGripVertical className="me-2 fs-3" />
            Week 1, Lecture 2 - Formatting User Interfaces with HTML
            <ModuleControlButtons />
          </div>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
