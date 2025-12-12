import { v4 as uuidv4 } from "uuid";

export default function AssignmentsDao(db) {
  function findAssignmentsForCourse(courseId) {
    return db.assignments.filter(a => a.course === courseId);
  }

  function findAssignmentById(assignmentId) {
    return db.assignments.find(a => a._id === assignmentId);
  }

  function createAssignment(courseId, assignment) {
    const newAssignment = { ...assignment, _id: uuidv4(), course: courseId };
    db.assignments.push(newAssignment);  
    return newAssignment;
  }

  function updateAssignment(assignmentId, updates) {
    const index = db.assignments.findIndex(a => a._id === assignmentId);
    if (index < 0) return null;

    db.assignments[index] = { ...db.assignments[index], ...updates }; 
    return db.assignments[index];
  }

  function deleteAssignment(assignmentId) {
    db.assignments = db.assignments.filter(a => a._id !== assignmentId);
    return { status: "ok" };
  }

  return {
    findAssignmentsForCourse,
    findAssignmentById,
    createAssignment,
    updateAssignment,
    deleteAssignment,
  };
}
