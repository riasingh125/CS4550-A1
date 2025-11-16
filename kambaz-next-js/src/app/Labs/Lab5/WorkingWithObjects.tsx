"use client";
import React, { useState } from "react";
import { FormControl } from "react-bootstrap";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });

  const [module, setModule] = useState({
    id: "M1",
    name: "React Module",
    description: "Learn React fundamentals",
    course: "CS4550",
  });

  const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`;
  const MODULE_API_URL = `${HTTP_SERVER}/lab5/module`;

  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>

      <h4>Retrieving Assignment</h4>
      <a className="btn btn-primary" href={`${ASSIGNMENT_API_URL}`} id="wd-retrieve-assignments">
        Get Assignment
      </a>
      <hr />

      <h4>Retrieving Assignment Title</h4>
      <a className="btn btn-primary" href={`${ASSIGNMENT_API_URL}/title`} id="wd-retrieve-assignment-title">
        Get Title
      </a>
      <hr />

      <h4>Modifying Assignment Title</h4>
      <FormControl
        className="w-75"
        defaultValue={assignment.title}
        onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
        id="wd-assignment-title"
      />
      <a
        className="btn btn-primary float-end"
        href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}
        id="wd-update-assignment-title"
      >
        Update Title
      </a>
      <hr />

      <h4>Update Assignment Score</h4>
      <FormControl
        type="number"
        className="w-75"
        defaultValue={assignment.score}
        onChange={(e) => setAssignment({ ...assignment, score: Number(e.target.value) })}
      />
      <a
        className="btn btn-success float-end"
        href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}
        id="wd-update-assignment-score"
      >
        Update Score
      </a>
      <hr />

      <h4>Update Assignment Completed</h4>
      <input
        type="checkbox"
        checked={assignment.completed}
        onChange={(e) => setAssignment({ ...assignment, completed: e.target.checked })}
        id="wd-assignment-completed"
      />
      <a
        className="btn btn-success float-end"
        href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}
        id="wd-update-assignment-completed"
      >
        Update Completed
      </a>
      <hr />

      <h4>Retrieving Module</h4>
      <a className="btn btn-info" href={`${MODULE_API_URL}`} id="wd-retrieve-module">
        Get Module
      </a>
      <hr />

      <h4>Retrieving Module Name</h4>
      <a className="btn btn-info" href={`${MODULE_API_URL}/name`} id="wd-retrieve-module-name">
        Get Module Name
      </a>
      <hr />

      <h4>Update Module Name</h4>
      <FormControl
        className="w-75"
        defaultValue={module.name}
        onChange={(e) => setModule({ ...module, name: e.target.value })}
        id="wd-module-name"
      />
      <a
        className="btn btn-warning float-end"
        href={`${MODULE_API_URL}/name/${module.name}`}
        id="wd-update-module-name"
      >
        Update Module Name
      </a>
      <hr />

      <h4>Update Module Description</h4>
      <FormControl
        className="w-75"
        defaultValue={module.description}
        onChange={(e) => setModule({ ...module, description: e.target.value })}
        id="wd-module-description"
      />
      <a
        className="btn btn-warning float-end"
        href={`${MODULE_API_URL}/description/${module.description}`}
        id="wd-update-module-description"
      >
        Update Module Description
      </a>
      <hr />
    </div>
  );
}
