"use client";

import { useState } from "react";
import { Quiz } from "../reducer";

export default function QuizPreviewClient({ quiz }: { quiz: Quiz }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [score, setScore] = useState<number | null>(null);

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = () => {
    let calculatedScore = 0;
    quiz.questions.forEach(
      (question: { _id: string; points: number; correctAnswer: string }) => {
        if (answers[question._id] === question.correctAnswer) {
          calculatedScore += question.points;
        }
      }
    );
    setScore(calculatedScore);
  };

  const navigateQuestion = (index: number) => {
    if (index >= 0 && index < quiz.questions.length) {
      setCurrentQuestionIndex(index);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Quiz Preview: {quiz.title}</h2>

      <div>
        <div className="card mb-4">
          <div className="card-body">
            <h5>{currentQuestion.title}</h5>
            {currentQuestion.question && <p>{currentQuestion.question}</p>}
            {currentQuestion.type === "FIB" && (
              <input
                type="text"
                placeholder="Your answer"
                onChange={(e) =>
                  handleAnswerChange(currentQuestion._id, e.target.value)
                }
              />
            )}
            {currentQuestion.type === "MCQ" &&
              Array.isArray(currentQuestion.answers) &&
              currentQuestion.answers.map((option: string) => (
                <div key={option}>
                  <label>
                    <input
                      type="radio"
                      name={currentQuestion._id}
                      value={option}
                      onChange={() =>
                        handleAnswerChange(currentQuestion._id, option)
                      }
                    />
                    <span style={{ marginLeft: "5px" }}>{option}</span>
                  </label>
                </div>
              ))}
            {currentQuestion.type === "TF" && (
              <div>
                <label>
                  <input
                    type="radio"
                    name={currentQuestion._id}
                    value="True"
                    onChange={() =>
                      handleAnswerChange(currentQuestion._id, "True")
                    }
                  />
                  <span style={{ marginLeft: "5px" }}>True</span>
                </label>
                <span style={{ marginLeft: "5px" }}></span>
                <label>
                  <input
                    type="radio"
                    name={currentQuestion._id}
                    value="False"
                    onChange={() =>
                      handleAnswerChange(currentQuestion._id, "False")
                    }
                  />
                  <span style={{ marginLeft: "5px" }}>False</span>
                </label>
              </div>
            )}
          </div>
        </div>

        <div className="d-flex justify-content-between mb-4">
          <button
            className="btn btn-secondary"
            onClick={() => navigateQuestion(currentQuestionIndex - 1)}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => navigateQuestion(currentQuestionIndex + 1)}
            disabled={currentQuestionIndex === quiz.questions.length - 1}
          >
            Next
          </button>
        </div>

        <button className="btn btn-primary" onClick={handleSubmit}>
          Submit Quiz
        </button>

        <div className="mt-4">
          <h6>Questions</h6>
          <ul className="list-unstyled">
            {quiz.questions.map(
              (question: { _id: string; title: string }, index: number) => (
                <li key={question._id}>
                  <button
                    className={`btn btn-link ${
                      index === currentQuestionIndex ? "fw-bold" : ""
                    }`}
                    onClick={() => navigateQuestion(index)}
                  >
                    Question {index + 1}
                  </button>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
