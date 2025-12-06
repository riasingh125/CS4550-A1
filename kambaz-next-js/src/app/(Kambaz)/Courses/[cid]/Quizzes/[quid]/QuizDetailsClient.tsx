"use client";

import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { useRouter } from "next/navigation";
import { Quiz } from "../reducer";

export default function QuizDetailsClient({
  cid,
  quiz,
}: {
  cid: string;
  quiz: Quiz;
}) {
  const router = useRouter();

  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  ) as { currentUser: { role?: string } | null };

  const role = currentUser?.role;
  const isFacultyOrAdmin = role === "FACULTY" || role === "ADMIN";
  const isStudent = role === "STUDENT";

  if (!quiz) {
    return <div className="container mt-4">Quiz not found.</div>;
  }

  const questionCount = quiz.questions?.length ?? 0;
  const points = quiz.points ?? 0;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>{quiz.title}</h2>
        <button
          className="btn btn-secondary"
          onClick={() => router.push(`/Courses/${cid}/Quizzes`)}
        >
          Back to Quizzes
        </button>
      </div>

      <div className="text-muted mb-3">
        {quiz.published ? "✅ Published" : "🚫 Unpublished"}
      </div>

      <div className="card">
        <div className="card-body">
          <h5 className="card-title mb-4">Quiz Summary</h5>

          <table className="table table-borderless">
            <tbody>
              <tr>
                <td className="fw-bold" style={{ width: "40%" }}>
                  Quiz Type:
                </td>
                <td>{quiz.quizType || "Graded Quiz"}</td>
              </tr>

              <tr>
                <td className="fw-bold">Points:</td>
                <td>{points}</td>
              </tr>

              <tr>
                <td className="fw-bold">Assignment Group:</td>
                <td>{quiz.assignmentGroup || "Quizzes"}</td>
              </tr>

              <tr>
                <td className="fw-bold">Shuffle Answers:</td>
                <td>{quiz.shuffleAnswers !== false ? "Yes" : "No"}</td>
              </tr>

              <tr>
                <td className="fw-bold">Time Limit:</td>
                <td>{quiz.timeLimit || 20} Minutes</td>
              </tr>

              <tr>
                <td className="fw-bold">Multiple Attempts:</td>
                <td>{quiz.multipleAttempts ? "Yes" : "No"}</td>
              </tr>

              <tr>
                <td className="fw-bold">How Many Attempts:</td>
                <td>{quiz.howManyAttempts || 1}</td>
              </tr>

              <tr>
                <td className="fw-bold">Show Correct Answers:</td>
                <td>{quiz.showCorrectAnswers || "After submission"}</td>
              </tr>

              <tr>
                <td className="fw-bold">Access Code:</td>
                <td>{quiz.accessCode || "(none)"}</td>
              </tr>

              <tr>
                <td className="fw-bold">One Question at a Time:</td>
                <td>{quiz.oneQuestionAtATime !== false ? "Yes" : "No"}</td>
              </tr>

              <tr>
                <td className="fw-bold">Webcam Required:</td>
                <td>{quiz.webcamRequired ? "Yes" : "No"}</td>
              </tr>

              <tr>
                <td className="fw-bold">Lock Questions After Answering:</td>
                <td>{quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</td>
              </tr>
            </tbody>
          </table>

          <hr className="my-4" />

          <h6 className="mb-3">Dates</h6>
          <table className="table table-borderless">
            <tbody>
              <tr>
                <td className="fw-bold" style={{ width: "40%" }}>
                  Due Date:
                </td>
                <td>
                  {quiz.dueDate
                    ? new Date(quiz.dueDate).toLocaleString()
                    : "None"}
                </td>
              </tr>

              <tr>
                <td className="fw-bold">Available From:</td>
                <td>
                  {quiz.availableDate
                    ? new Date(quiz.availableDate).toLocaleString()
                    : "None"}
                </td>
              </tr>

              <tr>
                <td className="fw-bold">Until:</td>
                <td>
                  {quiz.untilDate
                    ? new Date(quiz.untilDate).toLocaleString()
                    : "None"}
                </td>
              </tr>
            </tbody>
          </table>

          <hr className="my-4" />

          <p>
            <strong>Number of Questions:</strong> {questionCount}
          </p>

          <div className="mt-4 d-flex gap-2">
            {isFacultyOrAdmin && (
              <>
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    router.push(
                      `/Courses/${cid}/Quizzes/${quiz._id}/Editor/QuizDetailsEditor`
                    )
                  }
                >
                  Edit
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() =>
                    router.push(`/Courses/${cid}/Quizzes/${quiz._id}/Preview`)
                  }
                >
                  Preview
                </button>
              </>
            )}

            {isStudent && quiz.published && (
              <button
                className="btn btn-success"
                onClick={() => {
                  alert("Start quiz functionality not implemented yet.");
                }}
              >
                Start Quiz
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
