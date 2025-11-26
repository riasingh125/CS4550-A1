import QuizzesDao from "./dao.js";

export default function QuizzesRoutes(app, db) {
  const dao = QuizzesDao(db);

  // CREATE quiz for a course
  app.post("/api/courses/:cid/quizzes", (req, res) => {
    try {
      console.log("Creating quiz for course:", req.params.cid, "with data:", req.body);
      const quiz = dao.createQuiz(req.params.cid, req.body);
      res.json(quiz);
    } catch (error) {
      console.error("Error creating quiz:", error);
      res.status(500).json({ error: "Failed to create quiz" });
    }
  });

  // READ all quizzes for a course
  app.get("/api/courses/:cid/quizzes", (req, res) => {
    try {
      const quizzes = dao.findQuizzesForCourse(req.params.cid);
      res.json(quizzes);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
      res.status(500).json({ error: "Failed to fetch quizzes" });
    }
  });

  // READ single quiz by ID
  app.get("/api/quizzes/:qid", (req, res) => {
    try {
      const quiz = dao.findQuizById(req.params.qid);
      if (!quiz) {
        return res.status(404).json({ error: "Quiz not found" });
      }
      res.json(quiz);
    } catch (error) {
      console.error("Error fetching quiz:", error);
      res.status(500).json({ error: "Failed to fetch quiz" });
    }
  });

  // UPDATE quiz
  app.put("/api/quizzes/:qid", (req, res) => {
    try {
      const updated = dao.updateQuiz(req.params.qid, req.body);
      if (!updated) {
        return res.status(404).json({ error: "Quiz not found" });
      }
      res.json(updated);
    } catch (error) {
      console.error("Error updating quiz:", error);
      res.status(500).json({ error: "Failed to update quiz" });
    }
  });

  // DELETE quiz
  app.delete("/api/quizzes/:qid", (req, res) => {
    try {
      const result = dao.deleteQuiz(req.params.qid);
      res.json(result);
    } catch (error) {
      console.error("Error deleting quiz:", error);
      res.status(500).json({ error: "Failed to delete quiz" });
    }
  });

  // PUBLISH/UNPUBLISH quiz
  app.put("/api/quizzes/:qid/publish", (req, res) => {
    try {
      const { published } = req.body;
      const updated = dao.publishQuiz(req.params.qid, published);
      if (!updated) {
        return res.status(404).json({ error: "Quiz not found" });
      }
      res.json(updated);
    } catch (error) {
      console.error("Error updating publish status:", error);
      res.status(500).json({ error: "Failed to update publish status" });
    }
  });
}