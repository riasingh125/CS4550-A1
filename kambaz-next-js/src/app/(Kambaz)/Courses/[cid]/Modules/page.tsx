"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { addModule, editModule, updateModule, deleteModule } from "./reducer";

interface Lesson {
  _id: string;
  name: string;
  description: string;
  module: string;
}

interface Module {
  _id: string;
  name: string;
  description?: string;
  course: string;
  lessons?: Lesson[];
  editing?: boolean;
}

export default function Modules() {
  const { cid } = useParams<{ cid: string }>();
  const dispatch = useDispatch();
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: RootState) => state.modulesReducer);

  // Filter modules for this course
  const courseModules = modules.filter((module: Module) => module.course === cid);

  return (
    <div id="wd-modules-page" className="p-3">
      {/* Top Controls */}
      <ModulesControls
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={() => {
          if (moduleName.trim()) {
            dispatch(addModule({ name: moduleName, course: cid }));
            setModuleName("");
          }
        }}
      />
      <br />
      <br />

      {/* Module List */}
      <ListGroup id="wd-modules" className="rounded-0">
        {courseModules.map((module: Module) => (
          <ListGroupItem
            key={module._id}
            className="wd-module p-0 mb-5 fs-5 border-gray"
          >
            {/* Module Title */}
            <div className="wd-title p-3 ps-2 bg-secondary text-white fw-bold">
              <BsGripVertical className="me-2 fs-3" />

              {/* Module Name / Edit Field */}
              {!module.editing && module.name}
              {module.editing && (
                <FormControl
                  className="w-50 d-inline-block"
                  onChange={(e) =>
                    dispatch(updateModule({ ...module, name: e.target.value }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      dispatch(updateModule({ ...module, editing: false }));
                    }
                  }}
                  defaultValue={module.name}
                />
              )}

              {/* Module Action Buttons */}
              <ModuleControlButtons
                moduleId={module._id}
                deleteModule={(moduleId) => dispatch(deleteModule(moduleId))}
                editModule={(moduleId) => dispatch(editModule(moduleId))}
              />
            </div>

            {/* Lessons Section (if any) */}
            {module.lessons && module.lessons.length > 0 && (
              <ListGroup className="wd-lessons rounded-0">
                {module.lessons.map((lesson: Lesson) => (
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
