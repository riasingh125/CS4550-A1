// src/app/(Kambaz)/Courses/[cid]/Quizzes/QuizzesClient.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import * as client from "./client";
import { Dropdown } from "react-bootstrap";
import { FaPlus, FaEllipsisV } from "react-icons/fa";

export interface Quiz {
  _id: string;
  title: string;
  published: boolean;
  points: number;
  dueDate?: string;
  availableDate?: string;
  untilDate?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  questions?: any[];
}

interface QuizzesClientProps {
  cid: string;
  quizzes: Quiz[];
}

export default function QuizzesClient({ cid, quizzes }: QuizzesClientProps) {
  const router = useRouter();
  const [list, setList] = useState<Quiz[]>(quizzes ?? []);

  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  ) as { currentUser: { role?: string } | null };

  const role = currentUser?.role;
  const isFacultyOrAdmin = role === "FACULTY" || role === "ADMIN";

  const handleAddQuiz = async () => {
    const quiz = await client.createQuiz(cid);
    router.push(`/Courses/${cid}/Quizzes/${quiz._id}`);
  };

  const handleDelete = async (qid: string) => {
    await client.deleteQuiz(qid);
    setList(list.filter((q) => q._id !== qid));
  };

  const togglePublish = async (quiz: Quiz) => {
    const updated = quiz.published
      ? await client.unpublishQuiz(quiz._id)
      : await client.publishQuiz(quiz._id);
    setList(list.map((q) => (q._id === quiz._id ? updated : q)));
  };

  const availabilityText = (quiz: Quiz) => {
    const now = new Date();
    const start = quiz.availableDate ? new Date(quiz.availableDate) : null;
    const end = quiz.untilDate ? new Date(quiz.untilDate) : null;
    if (!start || !end) return "No availability set";
    if (now < start) return `Not available until ${start.toLocaleString()}`;
    if (now > end) return "Closed";
    return "Available";
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between">
        <h2>Quizzes</h2>
        {isFacultyOrAdmin && (
          <button className="btn btn-danger" onClick={handleAddQuiz}>
            <FaPlus className="me-2" /> Quiz
          </button>
        )}
      </div>

      {(!list || list.length === 0) && (
        <p className="text-muted mt-3">
          No quizzes yet. Click <b>+ Quiz</b>.
        </p>
      )}

      <ul className="list-group mt-3">
        {list.map((quiz: Quiz) => (
          <li
            key={quiz._id}
            className="list-group-item d-flex justify-content-between"
          >
            <div
              style={{ cursor: "pointer" }}
              onClick={() =>
                router.push(`/Courses/${cid}/Quizzes/${quiz._id}`)
              }
            >
              <h5>{quiz.published ? "✅" : "🚫"} {quiz.title}</h5>
              <div className="text-muted small">
                <div>{availabilityText(quiz)}</div>
                <div>Due: {quiz.dueDate || "None"}</div>
                <div>Points: {quiz.points ?? 0}</div>
                <div>Questions: {quiz.questions?.length ?? 0}</div>
              </div>
            </div>

            {isFacultyOrAdmin && (
              <Dropdown align="end">
                <Dropdown.Toggle variant="light">
                  <FaEllipsisV />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() =>
                      router.push(`/Courses/${cid}/Quizzes/${quiz._id}`)
                    }
                  >
                    Edit
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleDelete(quiz._id)}>
                    Delete
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => togglePublish(quiz)}>
                    {quiz.published ? "Unpublish" : "Publish"}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
