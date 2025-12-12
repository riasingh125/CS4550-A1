// Kambaz/Assignments/routes.js
import AssignmentsDao from "./dao.js";

export default function AssignmentRoutes(app, db) {
  const dao = AssignmentsDao(db);

  // CREATE
  app.post("/api/courses/:cid/assignments", (req, res) => {
    const newAssignment = dao.createAssignment({
      ...req.body,
      course: req.params.cid,
    });
    res.json(newAssignment);
  });

  // READ - all assignments for course
  app.get("/api/courses/:cid/assignments", (req, res) => {
    const assignments = dao.findAssignmentsForCourse(req.params.cid);
    res.json(assignments);
  });

  // READ - one assignment
  app.get("/api/assignments/:aid", (req, res) => {
    const assignment = dao.findAssignmentById(req.params.aid);
    res.json(assignment);
  });

  // UPDATE
  app.put("/api/assignments/:aid", (req, res) => {
    const updated = dao.updateAssignment(req.params.aid, req.body);
    res.json(updated);
  });

  // DELETE
  app.delete("/api/assignments/:aid", (req, res) => {
    const result = dao.deleteAssignment(req.params.aid);
    res.json(result);
  });
}
