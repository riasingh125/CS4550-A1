import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app, db) {
  const dao = EnrollmentsDao(db);

  app.post("/api/users/:uid/courses/:cid/enroll", (req, res) => {
    const { uid, cid } = req.params;
    const enrollment = dao.enrollUserInCourse(uid, cid);
    res.json(enrollment);
  });

  app.delete("/api/users/:uid/courses/:cid/unenroll", (req, res) => {
    const { uid, cid } = req.params;
    const result = dao.unenrollUserFromCourse(uid, cid);
    res.json(result);
  });

  app.get("/api/users/:uid/enrollments", (req, res) => {
    const { uid } = req.params;
    const enrollments = dao.findEnrollmentsByUser(uid);
    res.json(enrollments);
  });
}
