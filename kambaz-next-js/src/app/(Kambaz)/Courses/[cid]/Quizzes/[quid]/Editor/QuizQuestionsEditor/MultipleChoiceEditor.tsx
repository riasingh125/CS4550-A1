/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";

export default function MultipleChoiceEditor({
  quizquestion,
  onUpdate,
}: {
  quizquestion: any;
  onUpdate: (updatedQuestion: any) => void;
}) {
  const [title, setTitle] = useState(quizquestion.title || "");
  const [points, setPoints] = useState(quizquestion.points || 0);
  const [question, setQuestion] = useState(quizquestion.question || "");
  const [choices, setChoices] = useState<
    { text: string; isCorrect: boolean }[]
  >(
    (quizquestion.answers || []).map((answer: string, index: number) => ({
      text: answer,
      isCorrect: index === 0,
    })) || []
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

  const handleChoiceChange = (index: number, value: string) => {
    const updatedChoices = [...choices];
    updatedChoices[index].text = value;
    setChoices(updatedChoices);
    onUpdate({ ...quizquestion, answers: updatedChoices.map((c) => c.text) });
  };

  const handleCorrectChoiceChange = (index: number) => {
    const updatedChoices = choices.map((choice, i) => ({
      ...choice,
      isCorrect: i === index,
    }));
    setChoices(updatedChoices);
    onUpdate({ ...quizquestion, answers: updatedChoices.map((c) => c.text) });
  };

  const addChoice = () => {
    const newChoices = [...choices, { text: "", isCorrect: false }];
    setChoices(newChoices);
    onUpdate({ ...quizquestion, answers: newChoices.map((c) => c.text) });
  };

  const removeChoice = (index: number) => {
    const updatedChoices = choices.filter((_, i) => i !== index);
    setChoices(updatedChoices);
    onUpdate({ ...quizquestion, answers: updatedChoices.map((c) => c.text) });
  };

  return (
    <div className="multiple-choice-editor">
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
        <label>Choices</label>
        {choices.map((choice, index) => (
          <div
            key={index}
            className="choice-item"
            style={{ display: "flex", alignItems: "center", gap: "10px" }} // Align items horizontally
          >
            <input
              type="text"
              value={choice.text}
              onChange={(e) => handleChoiceChange(index, e.target.value)}
              style={{ flex: "1", padding: "5px" }} // Make input fields flexible and add padding
              placeholder="Enter choice text here..."
            />
            <input
              type="radio"
              name="correctChoice"
              checked={choice.isCorrect}
              onChange={() => handleCorrectChoiceChange(index)}
            />
            <button
              onClick={() => removeChoice(index)}
              style={{ padding: "5px 10px" }} // Style the button for better appearance
            >
              Remove
            </button>
          </div>
        ))}
        <button
          onClick={addChoice}
          style={{ marginTop: "10px", padding: "5px 10px" }} // Add spacing and padding to the button
        >
          Add Choice
        </button>
      </div>
    </div>
  );
}
