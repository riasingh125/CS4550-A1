import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { quizzes as defaultQuizzes } from "../../../Database";

export interface Quiz {
  _id: string;
  title: string;
  course: string;
  published: boolean;
  description?: string;
  quizType:
    | "Graded Quiz"
    | "Practice Quiz"
    | "Graded Survey"
    | "Ungraded Survey";
  assignmentGroup: "Quizzes" | "Exams" | "Assignments" | "Project";
  shuffleAnswers: boolean;
  timeLimit: number;
  multipleAttempts: boolean;
  howManyAttempts: number;
  showCorrectAnswers: string;
  accessCode: string;
  oneQuestionAtATime: boolean;
  webcamRequired: boolean;
  lockQuestionsAfterAnswering: boolean;

  dueDate?: string;
  availableDate?: string;
  untilDate?: string;

  points: number;
  questions: Array<{
    _id: string;
    type: "MCQ" | "TF" | "FIB";
    title: string;
    points: number;
  }>;
}

interface QuizzesState {
  quizzes: Quiz[];
}

const initialState: QuizzesState = {
  quizzes: defaultQuizzes.map((q) => ({
    quizType: "Graded Quiz" as const,
    assignmentGroup: "Quizzes" as const,
    shuffleAnswers: true,
    timeLimit: 20,
    multipleAttempts: false,
    howManyAttempts: 1,
    showCorrectAnswers: "After submission",
    accessCode: "",
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    ...q,
  })) as Quiz[],
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    addQuiz: (state, { payload }) => {
      const newQuiz: Quiz = {
        _id: uuidv4(),
        title: payload.title || "Untitled Quiz",
        description: "Instructions for quiz",
        course: payload.course,
        published: false,
        quizType: "Graded Quiz",
        assignmentGroup: "Quizzes",
        shuffleAnswers: true,
        timeLimit: 20,
        multipleAttempts: false,
        howManyAttempts: 1,
        showCorrectAnswers: "After submission",
        accessCode: "",
        oneQuestionAtATime: true,
        webcamRequired: false,
        lockQuestionsAfterAnswering: false,
        dueDate: "",
        availableDate: "",
        untilDate: "",
        points: 0,
        questions: [],
      };
      state.quizzes.push(newQuiz);
    },

    deleteQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.filter((q) => q._id !== quizId);
    },

    updateQuiz: (state, { payload: updatedQuiz }) => {
      state.quizzes = state.quizzes.map((q) =>
        q._id === updatedQuiz._id ? updatedQuiz : q
      );
    },

    togglePublishQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.map((q) =>
        q._id === quizId ? { ...q, published: !q.published } : q
      );
    },

    setQuizzes: (state, { payload }) => {
      state.quizzes = payload;
    },

    updateQuizQuestions: (state, { payload: { quizId, questions } }) => {
      state.quizzes = state.quizzes.map((quiz) =>
        quiz._id === quizId ? { ...quiz, questions } : quiz
      );
    },
  },
});

export const {
  addQuiz,
  deleteQuiz,
  updateQuiz,
  updateQuizQuestions,
  togglePublishQuiz,
  setQuizzes,
} = quizzesSlice.actions;

export default quizzesSlice.reducer;
