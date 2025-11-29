"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { getQuizzes, createQuiz, deleteQuiz, togglePublish } from "./client";
import Link from "next/link";
import { FaEllipsisV, FaTrash, FaCheck, FaBan, FaEdit } from "react-icons/fa";
import type { Quiz } from "./reducer";

export default function QuizzesClient() {
  const params = useParams();
  const cid = Array.isArray(params.cid) ? params.cid[0] : params.cid ?? "";
  const router = useRouter();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  ) as { currentUser: { role?: string } | null };

  const role = currentUser?.role;
  const isFacultyOrAdmin = role === "FACULTY" || role === "ADMIN"; //should we add TA to this?
  const isStudent = role === "STUDENT";

  useEffect(() => {
    if (cid) {
      getQuizzes(cid).then((fetchedQuizzes) => {
        if (isStudent) {
          setQuizzes(fetchedQuizzes.filter((q: Quiz) => q.published));
        } else {
          setQuizzes(fetchedQuizzes);
        }
      });
    }
  }, [cid, isStudent]);

  const handleAdd = async () => {
    if (!isFacultyOrAdmin) return;
    const quiz = await createQuiz(cid);
    router.push(`/Courses/${cid}/Quizzes/${quiz._id}`);
  };

  const handleDelete = async (qid: string) => {
    if (!isFacultyOrAdmin) return;
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      await deleteQuiz(qid);
      setQuizzes(quizzes.filter((q) => q._id !== qid));
    }
  };

  const handleTogglePublish = async (quiz: Quiz) => {
    if (!isFacultyOrAdmin) return;
    const updated = await togglePublish(quiz);
    setQuizzes(quizzes.map((q) => (q._id === quiz._id ? updated : q)));
  };

  const formatAvailability = (quiz: Quiz) => {
    const now = new Date();
    const available = quiz.availableDate ? new Date(quiz.availableDate) : null;
    const until = quiz.untilDate ? new Date(quiz.untilDate) : null;

    if (!available || !until) return "Not available until ...";
    if (now < available) return `Not available until ${available.toLocaleDateString()}`;
    if (now > until) return "Closed";
    return "Available";
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Quizzes</h3>
        {isFacultyOrAdmin && (
          <button className="btn btn-success" onClick={handleAdd}>
            + Quiz
          </button>
        )}
      </div>

      {quizzes.length === 0 ? (
        <div className="text-center text-muted mt-5">
          <p>No quizzes yet.</p>
          {isFacultyOrAdmin && (
            <p>
              Click <strong>+ Quiz</strong> to create your first quiz.
            </p>
          )}
        </div>
      ) : (
        <ul className="list-group">
          {quizzes.map((quiz) => (
            <li
              key={quiz._id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div className="flex-grow-1">
                <div className="d-flex align-items-center gap-2 mb-1">
                  {isFacultyOrAdmin && (
                    <button
                      className="btn btn-sm p-0 border-0"
                      onClick={() => handleTogglePublish(quiz)}
                      title={quiz.published ? "Unpublish" : "Publish"}
                    >
                      {quiz.published ? (
                        <span style={{ fontSize: "1.2em" }}>✅</span>
                      ) : (
                        <span style={{ fontSize: "1.2em" }}>🚫</span>
                      )}
                    </button>
                  )}
                  <Link
                    href={`/Courses/${cid}/Quizzes/${quiz._id}`}
                    className="text-decoration-none fw-bold"
                  >
                    {quiz.title}
                  </Link>
                </div>
                <div className="small text-muted">
                  <span className="me-3">
                    <strong>Availability:</strong> {formatAvailability(quiz)}
                  </span>
                  <span className="me-3">
                    <strong>Due:</strong>{" "}
                    {quiz.dueDate
                      ? new Date(quiz.dueDate).toLocaleDateString()
                      : "TBA"}
                  </span>
                  <span className="me-3">
                    <strong>Points:</strong> {quiz.points}
                  </span>
                  <span className="me-3">
                    <strong>Questions:</strong> {quiz.questions?.length ?? 0}
                  </span>
                  {isStudent && (
                    <span>
                      <strong>Score:</strong> --
                    </span>
                  )}
                </div>
              </div>

              {isFacultyOrAdmin && (
                <div className="position-relative">
                  <button
                    className="btn btn-sm btn-light"
                    onClick={() =>
                      setActiveMenu(activeMenu === quiz._id ? null : quiz._id)
                    }
                  >
                    <FaEllipsisV />
                  </button>

                  {activeMenu === quiz._id && (
                    <div
                      className="dropdown-menu show position-absolute end-0"
                      style={{ zIndex: 1050 }}
                    >
                      <button
                        className="dropdown-item d-flex align-items-center gap-2"
                        onClick={() => {
                          router.push(`/Courses/${cid}/Quizzes/${quiz._id}`);
                          setActiveMenu(null);
                        }}
                      >
                        <FaEdit /> Edit
                      </button>
                      <button
                        className="dropdown-item d-flex align-items-center gap-2"
                        onClick={() => {
                          handleDelete(quiz._id);
                          setActiveMenu(null);
                        }}
                      >
                        <FaTrash /> Delete
                      </button>
                      <button
                        className="dropdown-item d-flex align-items-center gap-2"
                        onClick={() => {
                          handleTogglePublish(quiz);
                          setActiveMenu(null);
                        }}
                      >
                        {quiz.published ? (
                          <>
                            <FaBan /> Unpublish
                          </>
                        ) : (
                          <>
                            <FaCheck /> Publish
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}