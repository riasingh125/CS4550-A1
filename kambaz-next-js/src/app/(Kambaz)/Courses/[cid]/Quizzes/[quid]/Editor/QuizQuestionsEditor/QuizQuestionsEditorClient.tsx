
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import "./QuizQuestionsEditor.css";
import { Quiz } from "../../../reducer";
import * as client from "../../../client";
import FillInTheBlankEditor from "./FillInTheBlankEditor";
import MultipleChoiceEditor from "./MultipleChoiceEditor";
import TrueFalseEditor from "./TrueFalseEditor";

interface Question {
  _id: string;
  type: "FIB" | "MCQ" | "TF";
  title: string;
  points: number;
  question: string;
  answers: string[];
}

export default function QuizQuestionsEditorClient({
  cid,
  quiz,
}: {
  cid: string;
  quiz: Quiz;
}) {
  const [questions, setQuestions] = useState<Question[]>(
    (quiz.questions as Question[])?.map((q) => ({
      ...q,
      question: q.question || "",
      answers: q.answers || [],
    })) || []
  );
  const [newQuestionType, setNewQuestionType] =
    useState<Question["type"]>("MCQ");

  const addQuestion = () => {
    const newQuestion: Question = {
      _id: uuidv4(),
      type: newQuestionType,
      title: "New Question",
      points: 0,
      question: "",
      answers:
        newQuestionType === "MCQ"
          ? ["Option 1", "Option 2"]
          : newQuestionType === "TF"
          ? ["True", "False"]
          : [],
    };
    setQuestions([...questions, newQuestion]);
  };

  const saveQuiz = async () => {
    try {
      const payload = {
        _id: quiz._id, // Quiz ID
        course: quiz.course, // Course ID
        title: quiz.title, // Quiz title
        published: quiz.published,
        quizType: quiz.quizType,
        assignmentGroup: quiz.assignmentGroup,
        shuffleAnswers: quiz.shuffleAnswers,
        timeLimit: quiz.timeLimit,
        multipleAttempts: quiz.multipleAttempts,
        howManyAttempts: quiz.howManyAttempts,
        showCorrectAnswers: quiz.showCorrectAnswers,
        accessCode: quiz.accessCode,
        oneQuestionAtATime: quiz.oneQuestionAtATime,
        webcamRequired: quiz.webcamRequired,
        lockQuestionsAfterAnswering: quiz.lockQuestionsAfterAnswering,
        dueDate: quiz.dueDate,
        availableDate: quiz.availableDate,
        untilDate: quiz.untilDate,
        points: questions.reduce((sum, q) => sum + q.points, 0), // Calculate total points
        questions, // Updated questions array
        description: quiz.description,
      };

      console.log("Payload being sent:", payload); // Log the payload for debugging
      await client.updateQuiz(quiz._id, payload); // Send the payload to the backend
      alert("Quiz saved successfully!");
    } catch (error) {
      console.error("Failed to save quiz:", error);
    }
  };

  const cancelChanges = () => {
    setQuestions(
      (quiz.questions as Question[])?.map((q) => ({
        ...q,
        question: q.question || "",
        answers: q.answers || [],
      })) || []
    );
  };

  const updateQuestion = (updatedQuestion: Question) => {
    const updatedQuestions = questions.map((q) =>
      q._id === updatedQuestion._id ? updatedQuestion : q
    );
    setQuestions(updatedQuestions);
  };

  const renderEditor = (question: Question) => {
    return (
      <div>
        <div className="form-group">
          <label>Question Type:</label>
          <select
            value={question.type}
            onChange={(e) => {
              const updatedQuestions = questions.map((q) =>
                q._id === question._id
                  ? { ...q, type: e.target.value as Question["type"] }
                  : q
              );
              setQuestions(updatedQuestions);
            }}
          >
            <option value="MCQ">Multiple Choice</option>
            <option value="TF">True/False</option>
            <option value="FIB">Fill in the Blank</option>
          </select>
        </div>
        {question.type === "FIB" && (
          <FillInTheBlankEditor
            quizquestion={question}
            onUpdate={updateQuestion}
          />
        )}
        {question.type === "MCQ" && (
          <MultipleChoiceEditor
            quizquestion={question}
            onUpdate={updateQuestion}
          />
        )}
        {question.type === "TF" && (
          <TrueFalseEditor quizquestion={question} onUpdate={updateQuestion} />
        )}
      </div>
    );
  };

  return (
    <div className="quiz-editor">
      <div className="questions-list">
        {questions.map((question) => (
          <div key={question._id} className="question-item">
            {renderEditor(question)}
          </div>
        ))}
      </div>
      <div className="actions">
        <button className="add-question-button" onClick={addQuestion}>
          + Add New Question
        </button>
        <button className="save-quiz-button" onClick={saveQuiz}>
          Save Quiz
        </button>
        {/* <button className="save-and-quiz-button" onClick={saveQuiz}>
          Save Quiz
        </button> */}
        <button className="cancel-changes-button" onClick={cancelChanges}>
          Cancel Changes
        </button>
      </div>
    </div>
  );
}
