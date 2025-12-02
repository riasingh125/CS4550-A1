/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export const findAssignmentsForCourse = async (courseId: string) => {
  const { data } = await axios.get(`${SERVER}/api/courses/${courseId}/assignments`);
  return data;
};

export const findAssignmentById = async (aid: string) => {
  const { data } = await axios.get(`${SERVER}/api/assignments/${aid}`);
  return data;
};

export const createAssignment = async (courseId: string, assignment: any) => {
  const { data } = await axios.post(`${SERVER}/api/courses/${courseId}/assignments`, assignment);
  return data;
};

export const updateAssignment = async (aid: string, assignment: any) => {
  const { data } = await axios.put(`${SERVER}/api/assignments/${aid}`, assignment);
  return data;
};

export const deleteAssignment = async (aid: string) => {
  const { data } = await axios.delete(`${SERVER}/api/assignments/${aid}`);
  return data;
};
