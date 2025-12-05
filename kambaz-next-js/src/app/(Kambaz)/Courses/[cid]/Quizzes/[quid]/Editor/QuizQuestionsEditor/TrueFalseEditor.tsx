/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";

export default function TrueFalseEditor({
  quizquestion,
  onUpdate,
}: {
  quizquestion: any;
  onUpdate: (updatedQuestion: any) => void;
}) {
  const [title, setTitle] = useState(quizquestion.title || "");
  const [points, setPoints] = useState(quizquestion.points || 0);
  const [question, setQuestion] = useState(quizquestion.question || "");
  const [isTrue, setIsTrue] = useState(quizquestion.answers[0] === "True");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    onUpdate({ ...quizquestion, title: newTitle });
  };

  const handlePointsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPoints = Number(e.target.value);
    setPoints(newPoints);
    onUpdate({ ...quizquestion, points: newPoints });
  };

  const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newQuestion = e.target.value;
    setQuestion(newQuestion);
    onUpdate({ ...quizquestion, question: newQuestion });
  };

  const handleAnswerChange = (value: boolean) => {
    setIsTrue(value);
    onUpdate({ ...quizquestion, answers: [value ? "True" : "False"] });
  };

  return (
    <div className="true-false-editor">
      <div className="form-group">
        <label>Title</label>
        <input type="text" value={title} onChange={handleTitleChange} />
      </div>
      <div className="form-group">
        <label>Points</label>
        <input type="number" value={points} onChange={handlePointsChange} />
      </div>
      <div className="form-group">
        <label>Question</label>
        <textarea value={question} onChange={handleQuestionChange} />
      </div>
      <div className="form-group">
        <label>Answer</label>
        <div>
          <input
            type="radio"
            name="trueFalse"
            checked={isTrue}
            onChange={() => handleAnswerChange(true)}
          />
          True
        </div>
        <div>
          <input
            type="radio"
            name="trueFalse"
            checked={!isTrue}
            onChange={() => handleAnswerChange(false)}
          />
          False
        </div>
      </div>
    </div>
  );
}
