/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import * as client from "../../../client";
import { Quiz } from "../../../reducer";

export default function QuizDetailsEditorClient({
  cid,
  quiz,
}: {
  cid: string;
  quiz: Quiz;
}) {
  const router = useRouter();

  if (!quiz) {
    return <div>Quiz not found.</div>;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [form, setForm] = useState({
    title: quiz.title || "",
    description: quiz.description || "",
    quizType: quiz.quizType || "Graded Quiz",
    points: quiz.points ?? 0,
    assignmentGroup: quiz.assignmentGroup || "Quizzes",
    shuffleAnswers: quiz.shuffleAnswers ?? true,
    timeLimit: quiz.timeLimit ?? 20,
    multipleAttempts: quiz.multipleAttempts ?? false,
    howManyAttempts: quiz.howManyAttempts ?? 1,
    showCorrectAnswers: quiz.showCorrectAnswers || "After submission",
    accessCode: quiz.accessCode || "",
    oneQuestionAtATime: quiz.oneQuestionAtATime ?? true,
    webcamRequired: quiz.webcamRequired ?? false,
    lockQuestionsAfterAnswering: quiz.lockQuestionsAfterAnswering ?? false,
    dueDate: quiz.dueDate || "",
    availableDate: quiz.availableDate || "",
    untilDate: quiz.untilDate || "",
  });

  const update = (field: keyof typeof form, value: any) => {
    setForm({ ...form, [field]: value });
  };

  const saveQuiz = async () => {
    await client.updateQuiz(quiz._id, form);
    router.push(`/Courses/${cid}/Quizzes/${quiz._id}`);
  };

  const saveAndPublishQuiz = async () => {
    await client.updateQuiz(quiz._id, {
      ...form,
      published: true,
    });

    router.push(`/Courses/${cid}/Quizzes`);
  };
  return (
    <div className="container mt-4">
      <h2>Edit Quiz Details</h2>

      <div className="quiz-details">
        <div className="form-group">
          <label>Quiz Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            rows={5}
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Quiz Type</label>
          <select
            value={form.quizType}
            onChange={(e) => update("quizType", e.target.value)}
          >
            <option value="Graded Quiz">Graded Quiz</option>
            <option value="Practice Quiz">Practice Quiz</option>
            <option value="Graded Survey">Graded Survey</option>
            <option value="Ungraded Survey">Ungraded Survey</option>
          </select>
        </div>

        <div className="form-group">
          <label>Points</label>
          <input
            type="number"
            value={form.points}
            onChange={(e) => update("points", Number(e.target.value))}
          />
        </div>

        <div className="form-group">
          <label>Assignment Group</label>
          <select
            value={form.assignmentGroup}
            onChange={(e) => update("assignmentGroup", e.target.value)}
          >
            <option value="Quizzes">Quizzes</option>
            <option value="Exams">Exams</option>
            <option value="Assignments">Assignments</option>
            <option value="Project">Project</option>
          </select>
        </div>

        <div className="form-group">
          <label>Shuffle Answers</label>
          <input
            type="checkbox"
            checked={form.shuffleAnswers}
            onChange={(e) => update("shuffleAnswers", e.target.checked)}
          />
        </div>

        <div className="form-group">
          <label>Time Limit</label>
          <input
            type="number"
            value={form.timeLimit}
            onChange={(e) => update("timeLimit", Number(e.target.value))}
          />
        </div>

        <div className="form-group">
          <label>Allow Multiple Attempts</label>
          <input
            type="checkbox"
            checked={form.multipleAttempts}
            onChange={(e) => {
              const checked = e.target.checked;
              if (!checked) {
                setForm({
                  ...form,
                  multipleAttempts: false,
                  howManyAttempts: 1,
                });
              } else {
                setForm({
                  ...form,
                  multipleAttempts: true,
                });
              }
            }}
          />
        </div>

        {form.multipleAttempts && (
          <div className="form-group">
            <label>How Many Attempts</label>
            <input
              type="number"
              min={1}
              value={form.howManyAttempts}
              onChange={(e) =>
                update("howManyAttempts", Number(e.target.value))
              }
            />
          </div>
        )}

        <div className="form-group">
          <label>Show Correct Answers</label>
          <input
            type="text"
            value={form.showCorrectAnswers}
            onChange={(e) => update("showCorrectAnswers", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Access Code</label>
          <input
            type="text"
            value={form.accessCode}
            onChange={(e) => update("accessCode", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>One Question at a Time</label>
          <input
            type="checkbox"
            checked={form.oneQuestionAtATime}
            onChange={(e) => update("oneQuestionAtATime", e.target.checked)}
          />
        </div>

        <div className="form-group">
          <label>Webcam Required</label>
          <input
            type="checkbox"
            checked={form.webcamRequired}
            onChange={(e) => update("webcamRequired", e.target.checked)}
          />
        </div>

        <div className="form-group">
          <label>Lock Questions After Answering</label>
          <input
            type="checkbox"
            checked={form.lockQuestionsAfterAnswering}
            onChange={(e) =>
              update("lockQuestionsAfterAnswering", e.target.checked)
            }
          />
        </div>

        <div className="form-group">
          <label>Due Date</label>
          <input
            type="date"
            value={form.dueDate}
            onChange={(e) => update("dueDate", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Available Date</label>
          <input
            type="date"
            value={form.availableDate}
            onChange={(e) => update("availableDate", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Until Date</label>
          <input
            type="date"
            value={form.untilDate}
            onChange={(e) => update("untilDate", e.target.value)}
          />
        </div>

        <div className="form-group">
          <button
            className="cancel-button"
            onClick={() => router.push(`/Courses/${cid}/Quizzes`)}
          >
            Cancel
          </button>
          <button className="save-button" onClick={saveQuiz}>
            Save
          </button>
          <button
            className="publish-button"
            onClick={saveAndPublishQuiz}
            style={{ marginLeft: "10px", backgroundColor: "green", color: "white" }}
          >
            Save & Publish
          </button>
        </div>
      </div>
    </div>
  );
}
