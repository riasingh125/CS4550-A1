import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../../Database";
import { v4 as uuidv4 } from "uuid";

export interface Assignment {
  _id: string;
  title: string;
  description?: string;
  dueDate?: string;
  availableDate?: string;
  availableUntil?: string;
  points?: number;
  course: string;
}

interface AssignmentsState {
  assignments: Assignment[];
}

const initialState: AssignmentsState = {
  assignments: assignments,
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, { payload: assignment }) => {
      const newAssignment: Assignment = {
        _id: uuidv4(),
        title: assignment.title || "Untitled Assignment",
        description: assignment.description || "No description provided",
        dueDate: assignment.dueDate || "TBA",
        availableDate: assignment.availableDate || "TBA",
        availableUntil: assignment.availableUntil || "TBA",
        points: assignment.points || 100,
        course: assignment.course,
      };
      state.assignments = [...state.assignments, newAssignment];
    },

    deleteAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.filter((a) => a._id !== assignmentId);
    },

    updateAssignment: (state, { payload: updatedAssignment }) => {
      state.assignments = state.assignments.map((a) =>
        a._id === updatedAssignment._id ? updatedAssignment : a
      );
    },

    setAssignments: (state, { payload }) => {
      state.assignments = payload;
    },
  },
});

export const { addAssignment, deleteAssignment, updateAssignment, setAssignments } =
  assignmentsSlice.actions;

export default assignmentsSlice.reducer;
