"use client";

import { useParams } from "next/navigation";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import * as db from "../../../Database";

// Define the TypeScript interfaces
interface Lesson {
  _id: string;
  name: string;
  description: string;
  module: string;
}

interface Module {
  _id: string;
  name: string;
  description: string;
  course: string;
  lessons?: Lesson[];
}

export default function Modules() {
  const { cid } = useParams<{ cid: string }>();
  const modules: Module[] = db.modules;

  // Filter modules for this course
  const courseModules = modules.filter((module) => module.course === cid);

  return (
    <div id="wd-modules-page" className="p-3">
      {/* Top Controls */}
      <ModulesControls />
      <br />
      <br />

      {/* Module List */}
      <ListGroup id="wd-modules" className="rounded-0">
        {courseModules.map((module) => (
          <ListGroupItem
            key={module._id}
            className="wd-module p-0 mb-5 fs-5 border-gray"
          >
            {/* Module Title */}
            <div className="wd-title p-3 ps-2 bg-secondary text-white fw-bold">
              <BsGripVertical className="me-2 fs-3" />
              {module.name}
              <ModuleControlButtons />
            </div>

            {/* Lessons Section (if any) */}
            {module.lessons && module.lessons.length > 0 && (
              <ListGroup className="wd-lessons rounded-0">
                {module.lessons.map((lesson) => (
                  <ListGroupItem
                    key={lesson._id}
                    className="wd-lesson p-3 ps-1"
                  >
                    <BsGripVertical className="me-2 fs-3" />
                    {lesson.name}
                    <LessonControlButtons />
                  </ListGroupItem>
                ))}
              </ListGroup>
            )}
          </ListGroupItem>
        ))}

        {/* No modules message */}
        {courseModules.length === 0 && (
          <ListGroupItem className="text-muted">
            No modules available for this course.
          </ListGroupItem>
        )}
      </ListGroup>
    </div>
  );
}
