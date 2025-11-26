import axios from "axios";
import { Quiz } from "./reducer";

const BASE = process.env.NEXT_PUBLIC_HTTP_SERVER;

export const findQuizById = async (qid: string): Promise<Quiz> => {
  const response = await axios.get(`${BASE}/api/quizzes/${qid}`, {
    withCredentials: true,
  });
  return response.data;
};

export const findQuizzesForCourse = async (cid: string): Promise<Quiz[]> => {
  const response = await axios.get(`${BASE}/api/courses/${cid}/quizzes`, {
    withCredentials: true,
  });
  return response.data;
};

export const createQuiz = async (cid: string): Promise<Quiz> => {
  const response = await axios.post(
    `${BASE}/api/courses/${cid}/quizzes`,
    {
      title: "New Quiz",
      published: false,
      points: 0,
      questions: [],
    },
    { withCredentials: true }
  );
  return response.data;
};

export const deleteQuiz = async (qid: string): Promise<void> => {
  await axios.delete(`${BASE}/api/quizzes/${qid}`, {
    withCredentials: true,
  });
};

export const publishQuiz = async (qid: string): Promise<Quiz> => {
  const response = await axios.put(
    `${BASE}/api/quizzes/${qid}/publish`,
    { published: true },
    { withCredentials: true }
  );
  return response.data;
};

export const unpublishQuiz = async (qid: string): Promise<Quiz> => {
  const response = await axios.put(
    `${BASE}/api/quizzes/${qid}/publish`,
    { published: false },
    { withCredentials: true }
  );
  return response.data;
};

export const togglePublish = async (quiz: Quiz): Promise<Quiz> => {
  const updated = quiz.published
    ? await unpublishQuiz(quiz._id)
    : await publishQuiz(quiz._id);
  return updated;
};

export const getQuizzes = async (cid: string): Promise<Quiz[]> => {
  const quizzes = await findQuizzesForCourse(cid);
  return quizzes;
};