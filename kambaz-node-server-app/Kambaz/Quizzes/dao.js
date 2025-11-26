import { v4 as uuidv4 } from "uuid";

export default function QuizzesDao(db) {
  function findQuizzesForCourse(courseId) {
    return db.quizzes.filter(q => q.course === courseId);
  }

  function findQuizById(quizId) {
    return db.quizzes.find(q => q._id === quizId);
  }

  function createQuiz(courseId, quiz) {
    const newQuiz = {
      _id: uuidv4(),
      course: courseId,
      title: quiz.title ?? "New Quiz",
      published: false,
      
      quizType: quiz.quizType ?? "Graded Quiz",
      assignmentGroup: quiz.assignmentGroup ?? "Quizzes",
      shuffleAnswers: quiz.shuffleAnswers ?? true,
      timeLimit: quiz.timeLimit ?? 20,
      multipleAttempts: quiz.multipleAttempts ?? false,
      howManyAttempts: quiz.howManyAttempts ?? 1,
      showCorrectAnswers: quiz.showCorrectAnswers ?? "After submission",
      accessCode: quiz.accessCode ?? "",
      oneQuestionAtATime: quiz.oneQuestionAtATime ?? true,
      webcamRequired: quiz.webcamRequired ?? false,
      lockQuestionsAfterAnswering: quiz.lockQuestionsAfterAnswering ?? false,
      
      dueDate: quiz.dueDate ?? "",
      availableDate: quiz.availableDate ?? "",
      untilDate: quiz.untilDate ?? "",
      
      points: quiz.points ?? 0,
      questions: quiz.questions ?? []
    };

    db.quizzes.push(newQuiz);
    return newQuiz;
  }

  function updateQuiz(quizId, updates) {
    const index = db.quizzes.findIndex(q => q._id === quizId);
    if (index < 0) return null;

    db.quizzes[index] = { ...db.quizzes[index], ...updates };
    
    if (updates.questions) {
      db.quizzes[index].points = updates.questions.reduce(
        (sum, q) => sum + (q.points || 0), 
        0
      );
    }
    
    return db.quizzes[index];
  }

  function deleteQuiz(quizId) {
    const initialLength = db.quizzes.length;
    db.quizzes = db.quizzes.filter(q => q._id !== quizId);
    
    if (db.quizzes.length < initialLength) {
      return { status: "ok", deleted: true };
    }
    return { status: "error", message: "Quiz not found" };
  }

  function publishQuiz(quizId, value) {
    const index = db.quizzes.findIndex(q => q._id === quizId);
    if (index < 0) return null;

    db.quizzes[index].published = value;
    return db.quizzes[index];
  }

  return {
    findQuizzesForCourse,
    findQuizById,
    createQuiz,
    updateQuiz,
    deleteQuiz,
    publishQuiz,
  };
}