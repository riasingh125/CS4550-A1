import axios from "axios";

const SERVER = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000";

export const enroll = async (userId: string, courseId: string) => {
  const response = await axios.post(`${SERVER}/api/users/${userId}/courses/${courseId}/enroll`);
  return response.data;
};

export const unenroll = async (userId: string, courseId: string) => {
  const response = await axios.delete(`${SERVER}/api/users/${userId}/courses/${courseId}/unenroll`);
  return response.data;
};

export const findEnrollmentsByUser = async (userId: string) => {
  const response = await axios.get(`${SERVER}/api/users/${userId}/enrollments`);
  return response.data;
};
