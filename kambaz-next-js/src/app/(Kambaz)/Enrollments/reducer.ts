import { createSlice } from "@reduxjs/toolkit";
import * as db from "../Database";

export interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

interface EnrollmentState {
  enrollments: Enrollment[];
}

const initialState: EnrollmentState = {
  enrollments: db.enrollments,
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enroll: (state, { payload }) => {
      const newEnrollment: Enrollment = {
        _id: Math.random().toString(36).substring(2, 9),
        user: payload.user,
        course: payload.course,
      };
      state.enrollments.push(newEnrollment);
    },
    unenroll: (state, { payload }) => {
      state.enrollments = state.enrollments.filter(
        (e) => !(e.user === payload.user && e.course === payload.course)
      );
    },
  },
});

export const { enroll, unenroll } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
