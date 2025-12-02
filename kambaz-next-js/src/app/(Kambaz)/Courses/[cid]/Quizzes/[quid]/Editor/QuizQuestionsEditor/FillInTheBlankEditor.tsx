"use client";
import React, { useState } from "react";

export default function FillInTheBlankEditor({
  quizquestion,
  onUpdate,
}: {
  quizquestion: any;
  onUpdate: (updatedQuestion: any) => void;
}) {
  const [title, setTitle] = useState(quizquestion.title || "");
  const [points, setPoints] = useState(quizquestion.points || 0);
  const [question, setQuestion] = useState(quizquestion.question || "");
  const [answers, setAnswers] = useState<string[]>(
    quizquestion.answers || [""]
  );

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

  const handleAnswerChange = (index: number, value: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
    onUpdate({ ...quizquestion, answers: updatedAnswers });
  };

  const addAnswer = () => {
    const newAnswers = [...answers, ""];
    setAnswers(newAnswers);
    onUpdate({ ...quizquestion, answers: newAnswers });
  };

  const removeAnswer = (index: number) => {
    const updatedAnswers = answers.filter((_, i) => i !== index);
    setAnswers(updatedAnswers);
    onUpdate({ ...quizquestion, answers: updatedAnswers });
  };

  return (
    <div className="fill-in-the-blank-editor">
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
        <label>Answers</label>
        {answers.map((answer, index) => (
          <div key={index} className="answer-item">
            <input
              type="text"
              value={answer}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
            />
            <button onClick={() => removeAnswer(index)}>Remove</button>
          </div>
        ))}
        <button onClick={addAnswer}>Add Answer</button>
      </div>
    </div>
  );
}
